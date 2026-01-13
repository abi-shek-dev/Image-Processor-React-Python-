import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

// Component Imports
import { Navbar } from './components/Navbar';
import { UploadCard } from './components/UploadCard';
import { QuickActions } from './components/QuickActions';
import { PreviewArea } from './components/PreviewArea';
import { Toast } from './components/Toast';
import { DropZoneOverlay } from './components/DropZoneOverlay';
import { ConfirmationModal } from './components/ConfirmationModal';
import { ProgressLoader } from './components/ProgressLoader';
import { HowItWorks } from './components/HowItWorks';
import { Footer } from './components/Footer';

// Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
const MAX_FILE_SIZE = 10 * 1024 * 1024; 

function App() {
  // --- Core State ---
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [format, setFormat] = useState('PNG');
  const [isCompressOn, setIsCompressOn] = useState(false);
  
  // --- Loading & Sequential Progress State ---
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [serverStatus, setServerStatus] = useState('checking');
  
  // --- UI & Interaction State ---
  const [isDragging, setIsDragging] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [lastDownloadUrl, setLastDownloadUrl] = useState(null);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // --- Ping Backend on Load (Wake up Render Free Tier) ---
  useEffect(() => {
    const pingServer = async () => {
      try {
        // Requires @app.route('/health') in app.py
        await axios.get(`${API_BASE_URL}/health`);
        setServerStatus('online');
      } catch (err) {
        setServerStatus('offline');
      }
    };
    pingServer();
  }, []);

  // --- Global Drag and Drop Handlers ---
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.types.includes('Files')) setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.relatedTarget === null) setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setFiles(prev => [...prev, ...imageFiles]);
      triggerToast(`Added ${imageFiles.length} image(s) to queue`, 'success');
    }
  }, []);

  useEffect(() => {
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);
    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, [handleDragOver, handleDragLeave, handleDrop]);

  // --- Queue Management ---
  useEffect(() => {
    setLastDownloadUrl(null);
    if (files.length === 0) {
      setPreviews([]);
      return;
    }
    const selectedPreviews = files.slice(0, 4).map(file => URL.createObjectURL(file));
    setPreviews(selectedPreviews);
    return () => selectedPreviews.forEach(url => URL.revokeObjectURL(url));
  }, [files]);

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
    triggerToast("Image removed", "success");
  };

  const confirmClearAll = () => {
    setFiles([]);
    setIsClearModalOpen(false);
    triggerToast("Queue cleared successfully", "success");
  };

  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // --- Conversion Logic ---
  const handleBatchConvert = async () => {
    if (files.length === 0) return;

    // Size Validation
    const oversizedFile = files.find(f => f.size > MAX_FILE_SIZE);
    if (oversizedFile) return triggerToast(`"${oversizedFile.name}" exceeds 10MB`, 'error');
    
    setLoading(true);
    setProgress(0);
    setIsProcessing(false);

    const formData = new FormData();
    files.forEach(file => formData.append('images', file));
    formData.append('format', format);
    formData.append('compress', isCompressOn);

    try {
      const response = await axios.post(`${API_BASE_URL}/convert`, formData, {
        responseType: 'blob',
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percent);
          if (percent === 100) setIsProcessing(true); 
        }
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const isZip = files.length > 1;
      const downloadName = isZip 
        ? `PixelShift_Batch_${Date.now()}.zip` 
        : `${files[0].name.split('.')[0]}.${format.toLowerCase()}`;
      
      setLastDownloadUrl({ url, filename: downloadName });

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', downloadName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      triggerToast(`${files.length} image(s) processed!`, 'success');
    } catch (err) {
      triggerToast("Conversion failed. Check backend connection.", 'error');
    } finally {
      setLoading(false);
      setProgress(0);
      setIsProcessing(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white selection:bg-emerald-100">
      
      <DropZoneOverlay isDragging={isDragging} />
      
      {loading && (
        <ProgressLoader progress={progress} isProcessing={isProcessing} fileCount={files.length} />
      )}

      <ConfirmationModal 
        isOpen={isClearModalOpen}
        onConfirm={confirmClearAll}
        onCancel={() => setIsClearModalOpen(false)}
      />

      {/* Content Wrapper ensures Footer stays at bottom */}
      <div className="flex-grow p-4 md:p-8">
        <Navbar serverStatus={serverStatus} />

        <main className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
            {/* Left Sidebar */}
            <div className="lg:col-span-3 space-y-6">
              <UploadCard 
                files={files} 
                setFiles={setFiles} 
                onClearRequest={() => setIsClearModalOpen(true)} 
              />
              
              <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6 shadow-sm">
                <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Quality Control</h3>
                <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-sm font-semibold text-slate-700">Compress</p>
                  <button 
                    onClick={() => setIsCompressOn(!isCompressOn)}
                    className={`w-11 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${isCompressOn ? 'bg-emerald-500 shadow-md shadow-emerald-200' : 'bg-slate-300'}`}
                  >
                    <div className={`bg-white w-4 h-4 rounded-full shadow transform transition-transform duration-300 ${isCompressOn ? 'translate-x-5' : 'translate-x-0'}`} />
                  </button>
                </div>
              </div>
            </div>

            {/* Main Preview Area */}
            <div className="lg:col-span-6">
              <PreviewArea 
                previews={previews} 
                fileCount={files.length} 
                lastDownloadUrl={lastDownloadUrl}
                onRemove={removeFile}
              />
            </div>

            {/* Quick Action Sidebar */}
            <div className="lg:col-span-3">
              <QuickActions 
                currentFormat={format} 
                setFormat={setFormat} 
                onConvert={handleBatchConvert} 
                loading={loading}
                disabled={files.length === 0}
              />
            </div>
          </div>

          <HowItWorks />
        </main>
      </div>

      <Footer />

      {toast.show && (
        <Toast 
          message={toast.message} 
          type={toast.type}
          onClose={() => setToast({ ...toast, show: false })} 
        />
      )}
    </div>
  );
}

export default App;