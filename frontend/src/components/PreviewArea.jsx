import React from 'react';
import { FiImage, FiDownloadCloud, FiX } from 'react-icons/fi';

export const PreviewArea = ({ previews, fileCount, lastDownloadUrl, onRemove }) => {
  if (!previews || previews.length === 0) {
    return (
      <div className="bg-slate-50 border border-slate-200 rounded-[2.5rem] p-6 h-full min-h-[550px] flex items-center justify-center relative overflow-hidden">
        <div className="text-center z-10">
          <div className="w-20 h-20 bg-white border border-slate-200 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
            <FiImage className="text-slate-300 text-3xl" />
          </div>
          <h3 className="text-lg font-semibold text-slate-800">Preview Area</h3>
          <p className="text-slate-500 text-sm mt-1">Upload images to get started</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-[2.5rem] p-8 h-full min-h-[550px] flex flex-col relative shadow-xl shadow-slate-200/50">
      
      {/* Success State Header */}
      {lastDownloadUrl && (
        <div className="w-full mb-6 flex justify-between items-center animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-2 text-emerald-600">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Conversion Ready</span>
          </div>
          <a 
            href={lastDownloadUrl.url} 
            download={lastDownloadUrl.filename}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl text-emerald-700 text-xs font-bold transition-all shadow-sm"
          >
            <FiDownloadCloud /> Download All
          </a>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col items-center justify-center">
        {previews.length === 1 ? (
          <div className="relative group">
            <img 
              src={previews[0]} 
              alt="Preview" 
              className="max-h-[380px] w-auto rounded-2xl object-contain shadow-lg border border-slate-100" 
            />
            {/* Delete button for single view */}
            <button 
              onClick={() => onRemove(0)}
              className="absolute -top-3 -right-3 p-2 bg-white border border-slate-200 text-slate-400 hover:text-red-500 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all"
            >
              <FiX size={16} />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
            {previews.map((url, index) => (
              <div key={index} className="relative group aspect-video bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
                <img src={url} alt={`Preview ${index}`} className="w-full h-full object-cover" />
                
                {/* Individual Delete Button */}
                <button 
                  onClick={() => onRemove(index)}
                  className="absolute top-2 right-2 p-1.5 bg-white/90 backdrop-blur-sm text-slate-500 hover:text-red-500 rounded-lg shadow-md opacity-0 group-hover:opacity-100 transition-all z-20"
                >
                  <FiX size={14} />
                </button>

                {index === 3 && fileCount > 4 && (
                  <div className="absolute inset-0 bg-emerald-500/90 flex items-center justify-center backdrop-blur-sm text-white font-bold text-xl pointer-events-none">
                    +{fileCount - 4} more
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 bg-emerald-50 border border-emerald-100 px-6 py-2 rounded-full shadow-sm">
          <p className="text-emerald-600 text-[11px] font-bold uppercase tracking-widest text-center">
            {fileCount} {fileCount === 1 ? 'Image' : 'Images'} Selected
          </p>
        </div>
      </div>
    </div>
  );
};