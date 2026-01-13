import React, { useState, useEffect } from 'react';
import { convertImage } from './services/api';
import { Navbar } from './components/Navbar';
import { UploadCard } from './components/UploadCard';
import { SettingsCard } from './components/SettingsCard';
import { PreviewArea } from './components/PreviewArea';

function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [format, setFormat] = useState('PNG');
  const [isCompressOn, setIsCompressOn] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!file) return setPreview(null);
    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    return () => URL.revokeObjectURL(objectUrl);
  }, [file]);

  const handleDownload = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const response = await convertImage(file, format, isCompressOn);
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
      alert("Conversion failed!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 font-sans p-6 md:p-12">
      <Navbar />

      <main className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
          <UploadCard file={file} onFileChange={setFile} />
          <SettingsCard 
            format={format} 
            setFormat={setFormat} 
            isCompressOn={isCompressOn} 
            setIsCompressOn={setIsCompressOn} 
            onConvert={handleDownload} 
            loading={loading}
            disabled={!file}
          />
        </div>

        <div className="lg:col-span-8">
          <PreviewArea preview={preview} />
        </div>
      </main>
    </div>
  );
}

export default App;