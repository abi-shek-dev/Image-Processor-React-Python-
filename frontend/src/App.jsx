import React, { useState, useEffect } from 'react';
import { convertImage } from './services/api';
import { FiUpload, FiSettings, FiInfo, FiDownload } from 'react-icons/fi';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [format, setFormat] = useState('PNG');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) return setPreview(null);
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const handleConvert = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const response = await convertImage(file, format);
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `converted-${Date.now()}.${format.toLowerCase()}`);
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (err) {
      alert("Error converting image");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans p-4 md:p-10">
      {/* Header */}
      <header className="text-center mb-12">
        <div className="inline-block p-3 bg-violet-600/20 rounded-2xl mb-4">
          <div className="w-10 h-10 bg-violet-600 rounded-xl flex items-center justify-center shadow-lg shadow-violet-600/20">
            <FiSettings className="text-white text-xl" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-white mb-2">PixelConvert Pro</h1>
        <p className="text-slate-400 max-w-lg mx-auto">
          Professional grade image conversion. Upload any image, customize your output format, and convert instantly.
        </p>
      </header>

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Controls */}
        <div className="lg:col-span-4 space-y-6">
          {/* Upload Card */}
          <section className="bg-[#1e293b] border border-slate-700/50 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-violet-600/20 rounded-lg text-violet-400"><FiUpload /></div>
              <h2 className="font-semibold text-white">Upload Reference</h2>
            </div>
            <label className="group block w-full border-2 border-dashed border-slate-700 hover:border-violet-500 bg-slate-800/50 rounded-2xl p-8 transition-all cursor-pointer text-center">
              <input type="file" className="hidden" onChange={(e) => setFile(e.target.files[0])} accept="image/*" />
              <div className="bg-violet-600 group-hover:bg-violet-500 px-4 py-2 rounded-lg text-white font-medium inline-block transition-colors mb-2">
                Select Image
              </div>
              <p className="text-xs text-slate-500">Supports JPG, PNG, WEBP, BMP</p>
            </label>
          </section>

          {/* Settings Card */}
          <section className="bg-[#1e293b] border border-slate-700/50 rounded-3xl p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-violet-600/20 rounded-lg text-violet-400"><FiSettings /></div>
              <h2 className="font-semibold text-white">Conversion Settings</h2>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-500 uppercase block mb-2">Target Format</label>
                <select 
                  value={format} 
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-violet-600 outline-none"
                >
                  {['PNG', 'JPEG', 'WEBP', 'BMP', 'TIFF'].map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>

              <button 
                onClick={handleConvert}
                disabled={!file || loading}
                className="w-full bg-violet-600 hover:bg-violet-500 disabled:bg-slate-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-violet-600/20 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
              >
                {loading ? 'Processing...' : <><FiDownload /> Convert & Download</>}
              </button>
            </div>
          </section>
        </div>

        {/* Right Column: Preview Area */}
        <div className="lg:col-span-8">
          <div className="bg-[#1e293b] border border-slate-700/50 rounded-3xl p-4 h-full min-h-[500px] flex items-center justify-center relative overflow-hidden shadow-2xl">
            {preview ? (
              <img src={preview} alt="Preview" className="max-h-full max-w-full rounded-lg object-contain z-10" />
            ) : (
              <div className="text-center">
                <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center mx-auto mb-4 border border-slate-700">
                  <FiUpload className="text-slate-500 text-2xl" />
                </div>
                <p className="text-slate-500">No image selected</p>
              </div>
            )}
            {/* Background Mesh Effect */}
            <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#4f46e5 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
          </div>
        </div>
      </main>

      {/* Footer Info Cards */}
      <footer className="max-w-6xl mx-auto mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { title: "Any-to-Any", desc: "Convert between all major image formats instantly." },
          { title: "Privacy First", desc: "Images are processed in memory and never stored." },
          { title: "High Quality", desc: "Lossless conversion options for pro-level results." }
        ].map((item, i) => (
          <div key={i} className="bg-slate-800/30 border border-slate-800 p-6 rounded-2xl">
            <h3 className="text-violet-400 font-bold mb-2">{item.title}</h3>
            <p className="text-sm text-slate-500">{item.desc}</p>
          </div>
        ))}
      </footer>
    </div>
  );
}

export default App;