import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from './components/Navbar';
import { UploadCard } from './components/UploadCard';
import { QuickActions } from './components/QuickActions';
import { PreviewArea } from './components/PreviewArea';

function App() {
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [format, setFormat] = useState('PNG');
  const [isCompressOn, setIsCompressOn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Multi-Image Previews
  useEffect(() => {
    if (files.length === 0) {
      setPreviews([]);
      return;
    }

    // Generate preview URLs for the first 4 images to avoid lag
    const selectedPreviews = files.slice(0, 4).map(file => URL.createObjectURL(file));
    setPreviews(selectedPreviews);

    // Cleanup URLs to prevent memory leaks
    return () => selectedPreviews.forEach(url => URL.revokeObjectURL(url));
  }, [files]);

  const handleBatchConvert = async () => {
    if (files.length === 0) return alert("Please upload images first!");
    
    setLoading(true);
    const formData = new FormData();
    
    // Append all files to the 'images' key for the backend list
    files.forEach((file) => {
      formData.append('images', file);
    });
    
    formData.append('format', format);
    formData.append('compress', isCompressOn);

    try {
      const response = await axios.post('http://localhost:5000/convert', formData, {
        responseType: 'blob', // Essential for binary data (images/zips)
      });

      // Handle naming: Zip for multiple, original name for single
      const isZip = files.length > 1;
      const downloadName = isZip 
        ? `PixelShift_Batch_${Date.now()}.zip` 
        : `${files[0].name.split('.')[0]}.${format.toLowerCase()}`;

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', downloadName);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error("Batch conversion failed", err);
      alert("Conversion failed. Check backend connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans p-4 md:p-8">
      <Navbar />

      <main className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Upload & Global Config */}
        <div className="lg:col-span-3 space-y-6">
          <UploadCard files={files} setFiles={setFiles} />
          
          <div className="bg-[#1e293b] border border-slate-800 rounded-3xl p-6 shadow-xl">
            <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Global Optimization</h3>
            <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
              <div>
                <p className="text-sm font-medium text-slate-200">Lossless Compression</p>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Small size, High quality</p>
              </div>
              <button 
                onClick={() => setIsCompressOn(!isCompressOn)}
                className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${isCompressOn ? 'bg-violet-600' : 'bg-slate-700'}`}
              >
                <div className={`bg-white w-4 h-4 rounded-full shadow-lg transform transition-transform duration-300 ${isCompressOn ? 'translate-x-6' : 'translate-x-0'}`} />
              </button>
            </div>
          </div>
        </div>

        {/* Center: Dynamic Preview Grid */}
        <div className="lg:col-span-6">
          <PreviewArea previews={previews} fileCount={files.length} />
        </div>

        {/* Right: Quick Action Sidebar */}
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
    </div>
  );
}

export default App;