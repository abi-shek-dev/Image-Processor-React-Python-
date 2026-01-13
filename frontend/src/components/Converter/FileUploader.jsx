import React from 'react';
import { Upload, RefreshCw } from 'lucide-react';

export default function FileUploader({ onUpload, loading }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) onUpload(file);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-2 shadow-sm">
      <div className="border border-dashed border-slate-200 rounded-xl p-20 text-center group hover:bg-slate-50 transition-colors relative">
        <input 
          type="file" 
          className="absolute inset-0 opacity-0 cursor-pointer" 
          accept="image/png" 
          onChange={handleFileChange}
          disabled={loading}
        />
        <Upload className="w-12 h-12 mx-auto mb-6 text-slate-200 group-hover:text-green-500 transition-colors" />
        <p className="text-sm font-bold text-slate-900 tracking-tight uppercase">
          {loading ? "Processing..." : "Select PNG Source"}
        </p>
      </div>
      
      <div className="w-full mt-2 py-5 bg-slate-50 text-slate-400 font-bold text-[10px] uppercase tracking-[0.3em] rounded-xl flex justify-center items-center">
        {loading ? <RefreshCw className="animate-spin w-4 h-4" /> : "Engine Standby"}
      </div>
    </div>
  );
}