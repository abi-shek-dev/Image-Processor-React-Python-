import React from 'react';
import { FiUpload, FiCheckCircle } from 'react-icons/fi';

export const UploadCard = ({ files, setFiles, onClearRequest }) => {
  
  const handleFileChange = (e) => {
    const selectedFiles = Array.from(e.target.files);
    // Append new files to existing queue
    setFiles((prev) => [...prev, ...selectedFiles]);
  };

  return (
    <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <FiUpload />
          </div>
          <h2 className="font-bold text-slate-800 text-sm">Upload Images</h2>
        </div>
        {files.length > 0 && (
          <button 
            onClick={onClearRequest} // Triggers the modal in App.jsx
            className="text-[10px] font-bold text-slate-400 hover:text-red-500 uppercase tracking-tighter transition-colors"
          >
            Clear All
          </button>
        )}
      </div>
      
      {/* Dashed drop/select zone */}
      <label className="group relative flex flex-col items-center justify-center w-full h-44 border-2 border-dashed border-slate-100 hover:border-emerald-500/50 bg-slate-50 hover:bg-white rounded-2xl transition-all cursor-pointer overflow-hidden">
        <input 
          type="file" 
          multiple 
          className="hidden" 
          onChange={handleFileChange} 
          accept="image/*" 
        />
        <div className="z-10 text-center p-4">
          <div className="bg-emerald-600 group-hover:bg-emerald-500 text-white px-5 py-2 rounded-xl text-sm font-bold transition-all mb-2 inline-block shadow-md shadow-emerald-200">
            Select Files
          </div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">
            Drop images or click to browse
          </p>
        </div>
      </label>

      {/* Mini-list of currently selected files */}
      <div className="mt-4 space-y-2 max-h-32 overflow-y-auto custom-scrollbar">
        {files.length > 0 ? (
          files.slice(0, 3).map((file, index) => (
            <div key={index} className="flex items-center justify-between p-2 bg-white rounded-xl border border-slate-100">
              <span className="text-[11px] text-slate-600 font-medium truncate w-40">{file.name}</span>
              <FiCheckCircle className="text-emerald-500 text-xs" />
            </div>
          ))
        ) : (
          <p className="text-[11px] text-slate-400 text-center italic py-2">No files in queue</p>
        )}
        {files.length > 3 && (
          <p className="text-[10px] text-center text-emerald-600 font-bold mt-2">
            + {files.length - 3} more files selected
          </p>
        )}
      </div>
    </div>
  );
};