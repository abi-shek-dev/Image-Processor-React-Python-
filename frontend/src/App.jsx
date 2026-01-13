import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Navbar } from './components/Navbar';
import { UploadCard } from './components/UploadCard';
import { QuickActions } from './components/QuickActions';
import { PreviewArea } from './components/PreviewArea';
import { Toast } from './components/Toast';
import { DropZoneOverlay } from './components/DropZoneOverlay';
import { ConfirmationModal } from './components/ConfirmationModal';

// 10MB limit per image to ensure server stability
const MAX_FILE_SIZE = 10 * 1024 * 1024; 

function App() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [format, setFormat] = useState('PNG');
  const [isCompressOn, setIsCompressOn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [lastDownloadUrl, setLastDownloadUrl] = useState(null);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });

  // --- Global Drag and Drop Event Listeners ---
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.dataTransfer.types.includes('Files')) {
      setIsDragging(true); //
    }
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.relatedTarget === null) {
      setIsDragging(false); //
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const droppedFiles = Array.from(e.dataTransfer.files);
    const imageFiles = droppedFiles.filter(file => file.type.startsWith('image/'));
    
    if (imageFiles.length > 0) {
      setFiles(prev => [...prev, ...imageFiles]);
      triggerToast(`Added ${imageFiles.length} images to queue`, 'success');
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

  // --- Queue and Preview Management ---
  useEffect(() => {
    setLastDownloadUrl(null); // Clear old download links when queue changes

    if (files.length === 0) {
      setPreviews([]);
      return;
    }

    const selectedPreviews = files.slice(0, 4).map(file => URL.createObjectURL(file));
    setPreviews(selectedPreviews);

    return () => selectedPreviews.forEach(url => URL.revokeObjectURL(url)); // Prevent memory leaks
  }, [files]);

  const removeFile = (index) => {
    setFiles((prev) => prev.filter((_, i) => i !== index)); //
    triggerToast("File removed", "success");
  };

  const confirmClearAll = () => {
    setFiles([]);
    setIsClearModalOpen(false);
    triggerToast("Queue cleared", "success");
  };

  const triggerToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
  };

  // --- Backend Communication ---
  const handleBatchConvert = async () => {
    if (files.length === 0) return;

    const oversizedFile = files.find(f => f.size > MAX_FILE_SIZE); //
    if (oversizedFile) {
      return triggerToast(`"${oversizedFile.name}" is over 10MB limit.`, 'error');
    }
    
    setLoading(true);
    const formData = new FormData();
    files.forEach((file) => formData.append('images', file)); // Matches app.py key
    formData.append('format', format);
    formData.append('compress', isCompressOn);

    try {
      const response = await axios.post('http://localhost:5000/convert', formData, {
        responseType: 'blob', // Required for binary image/zip data
      });

      const isZip = files.length > 1;
      const downloadName = isZip 
        ? `PixelShift_Batch_${Date.now()}.zip` 
        : `${files[0].name.split('.')[0]}.${format.toLowerCase()}`;

      const url = window.URL.createObjectURL(new Blob([response.data]));
      setLastDownloadUrl({ url, filename: downloadName }); // Store for re-download

      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', downloadName);
      document.body.appendChild(link);
      link.click();
      link.remove();

      triggerToast(`Successfully processed ${files.length} images!`, 'success');
    } catch (err) {
      const msg = err.response ? `Error: ${err.response.status}` : "Backend connection failed.";
      triggerToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans p-4 md:p-8 relative selection:bg-emerald-100">
      <DropZoneOverlay isDragging={isDragging} />
      <Navbar />

      <main className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 relative z-10">
        <div className="lg:col-span-3 space-y-6">
          <UploadCard 
            files={files} 
            setFiles={setFiles} 
            onClearRequest={() => setIsClearModalOpen(true)} 
          />
          <div className="bg-slate-50 border border-slate-200 rounded-[2rem] p-6 shadow-sm">
            <h3 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">Settings</h3>
            <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <p className="text-sm font-semibold text-slate-700">Compress</p>
              <button 
                onClick={() => setIsCompressOn(!isCompressOn)}
                className={`w-11 h-6 flex items-center rounded-full p-1 transition-all ${isCompressOn ? 'bg-emerald-500 shadow-md' : 'bg-slate-300'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-sm transform transition-transform ${isCompressOn ? 'translate-x-5' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-6">
          <PreviewArea 
            previews={previews} 
            fileCount={files.length} 
            lastDownloadUrl={lastDownloadUrl}
            onRemove={removeFile}
          />
        </div>

        <div className="lg:col-span-3">
          <QuickActions 
            currentFormat={format} 
            setFormat={setFormat} 
            onConvert={handleBatchConvert} 
            loading={loading}
            disabled={files.length === 0}
          />
        </div>
      </main>

      <ConfirmationModal 
        isOpen={isClearModalOpen}
        onConfirm={confirmClearAll}
        onCancel={() => setIsClearModalOpen(false)}
      />

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