import React, { useState, useEffect } from 'react';
import { convertImage } from './services/api';
import { FiUpload, FiSettings, FiDownload, FiCheckCircle, FiImage } from 'react-icons/fi';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [format, setFormat] = useState('PNG');
  const [isCompressOn, setIsCompressOn] = useState(false);
  const [loading, setLoading] = useState(false);

  // Handle Image Preview
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleDownload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const response = await convertImage(file, format, isCompressOn);
      
      // Filename Logic: Strip old extension, add new one
      const originalName = file.name.split('.').slice(0, -1).join('.');
      const downloadName = `${originalName}.${format.toLowerCase()}`;
      
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', downloadName);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      console.error(err);
      alert("Conversion failed. Please try a different image.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans p-6 md:p-12">
      {/* Navbar / Logo Area */}
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 mb-12">
        <div className="p-3 bg-violet-600 rounded-2xl shadow-lg shadow-violet-600/20">
          <FiImage className="text-white text-2xl" />
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">PixelShift <span className="text-violet-500 text-sm font-medium border border-violet-500/30 px-2 py-0.5 rounded-full ml-2">PRO</span></h1>
      </div>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column: Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* 1. Upload Section */}
          <div className="bg-[#1e293b] border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <FiUpload className="text-violet-400" />
              <h2 className="font-semibold text-white">Upload Reference</h2>
            </div>
            
            <label className="group relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-700 hover:border-violet-500 bg-slate-900/50 rounded-2xl transition-all cursor-pointer overflow-hidden">
              <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
              <div className="z-10 text-center p-4">
                <div className="bg-violet-600 group-hover:bg-violet-500 text-white px-5 py-2 rounded-xl font-medium transition-colors mb-3 inline-block">
                  Select Image
                </div>
                <p className="text-xs text-slate-500">JPG, PNG, WEBP, BMP supported</p>
              </div>
            </label>
            {file && (
              <p className="text-xs text-violet-400 mt-3 flex items-center gap-1">
                <FiCheckCircle /> Selected: {file.name}
              </p>
            )}
          </div>

          {/* 2. Controls Section */}
          <div className="bg-[#1e293b] border border-slate-800 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <FiSettings className="text-violet-400" />
              <h2 className="font-semibold text-white">Conversion Settings</h2>
            </div>

            <div className="space-y-5">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Target Format</label>
                <select 
                  value={format} 
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-violet-600 transition-all cursor-pointer"
                >
                  {['PNG', 'JPEG', 'WEBP', 'BMP', 'TIFF'].map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>

              {/* Compression Toggle */}
              <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
                <div>
                  <p className="text-sm font-medium text-slate-200">Lossless Compression</p>
                  <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Reduce size, keep quality</p>
                </div>
                <button 
                  onClick={() => setIsCompressOn(!isCompressOn)}
                  className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${isCompressOn ? 'bg-violet-600' : 'bg-slate-700'}`}
                >
                  <div className={`bg-white w-4 h-4 rounded-full shadow-lg transform transition-transform duration-300 ${isCompressOn ? 'translate-x-6' : 'translate-x-0'}`} />
                </button>
              </div>

              <button 
                onClick={handleDownload}
                disabled={!file || loading}
                className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white transition-all shadow-lg shadow-violet-900/20 
                  ${!file || loading ? 'bg-slate-700 cursor-not-allowed opacity-50' : 'bg-violet-600 hover:bg-violet-500 active:scale-95'}`}
              >
                {loading ? 'Processing...' : <><FiDownload /> Convert & Download</>}
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Preview Area */}
        <div className="lg:col-span-8">
          <div className="bg-[#1e293b] border border-slate-800 rounded-[2rem] p-6 h-full min-h-[550px] flex items-center justify-center relative overflow-hidden shadow-2xl">
            {preview ? (
              <div className="relative z-10 w-full h-full flex items-center justify-center">
                <img src={preview} alt="Preview" className="max-h-[500px] max-w-full rounded-xl object-contain shadow-2xl border border-slate-700/50" />
              </div>
            ) : (
              <div className="text-center z-10">
                <div className="w-24 h-24 bg-slate-900/50 border border-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
                  <FiImage className="text-slate-700 text-4xl" />
                </div>
                <h3 className="text-xl font-semibold text-slate-400">Preview Area</h3>
                <p className="text-slate-600 text-sm mt-2">Upload an image to see it here</p>
              </div>
            )}
            
            {/* Background Grid Pattern */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
              style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;