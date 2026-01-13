import React from 'react';
import { FiUpload, FiCheckCircle, FiX } from 'react-icons/fi';

export const UploadCard = ({ files, setFiles }) => {
  
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  const clearFiles = () => setFiles([]);

  return (
    <div className="bg-[#1e293b] border border-slate-800 rounded-3xl p-6 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-violet-600/20 rounded-lg text-violet-400">
            <FiUpload />
          </div>
          <h2 className="font-semibold text-white text-sm">Upload Images</h2>
        </div>
        {files.length > 0 && (
          <button 
            onClick={clearFiles}
            className="text-[10px] font-bold text-slate-500 hover:text-red-400 uppercase tracking-tighter transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      
      <label className="group relative flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-700 hover:border-violet-500 bg-slate-900/50 rounded-2xl transition-all cursor-pointer overflow-hidden">
        <input 
          type="file" 
          multiple 
          className="hidden" 
          onChange={handleFileChange} 
          accept="image/*" 
        />
        <div className="z-10 text-center p-4">
          <div className="bg-violet-600 group-hover:bg-violet-500 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all mb-2 inline-block shadow-lg shadow-violet-900/20">
            Select Files
          </div>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">
            Drop images or click to browse
          </p>
        </div>
      </label>

      {/* File Status List */}
      <div className="mt-4 space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
        {files.length > 0 ? (
          files.slice(0, 3).map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-slate-900/30 rounded-lg border border-slate-800/50">
              <span className="text-[11px] text-slate-400 truncate w-40">{file.name}</span>
              <FiCheckCircle className="text-emerald-500 text-xs" />
            </div>
          ))
        ) : (
          <p className="text-[11px] text-slate-600 text-center italic">No files in queue</p>
        )}
        {files.length > 3 && (
          <p className="text-[10px] text-center text-violet-400 font-bold">
            + {files.length - 3} more files selected
          </p>
        )}
      </div>
    </div>
  );
};