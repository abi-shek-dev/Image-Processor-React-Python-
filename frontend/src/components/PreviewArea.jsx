import React from 'react';
import { FiImage } from 'react-icons/fi';

export const PreviewArea = ({ previews, fileCount }) => {
  // If no files are selected
  if (!previews || previews.length === 0) {
    return (
      <div className="bg-[#1e293b] border border-slate-800 rounded-[2rem] p-6 h-full min-h-[550px] flex items-center justify-center relative overflow-hidden shadow-2xl">
        <div className="text-center z-10">
          <div className="w-24 h-24 bg-slate-900/50 border border-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <FiImage className="text-slate-700 text-4xl" />
          </div>
          <h3 className="text-xl font-semibold text-slate-400">Preview Area</h3>
          <p className="text-slate-600 text-sm mt-2">Upload images to see them here</p>
        </div>
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#1e293b] border border-slate-800 rounded-[2rem] p-6 h-full min-h-[550px] relative shadow-2xl overflow-hidden">
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
        
        {/* Case 1: Single Image Preview */}
        {previews.length === 1 ? (
          <img 
            src={previews[0]} 
            alt="Preview" 
            className="max-h-[500px] max-w-full rounded-xl object-contain shadow-2xl border border-slate-700/50" 
          />
        ) : (
          /* Case 2: Multi-Image Grid (Batch) */
          <div className="grid grid-cols-2 gap-4 w-full max-w-2xl">
            {previews.map((url, index) => (
              <div key={index} className="relative group aspect-video bg-slate-900 rounded-xl overflow-hidden border border-slate-700">
                <img 
                  src={url} 
                  alt={`Preview ${index}`} 
                  className="w-full h-full object-cover transition-transform group-hover:scale-105" 
                />
                {/* Overlay for the 4th image if there are more */}
                {index === 3 && fileCount > 4 && (
                  <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                    <span className="text-white font-bold text-xl">+{fileCount - 4} more</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Batch Status Tag */}
        <div className="mt-6 bg-violet-600/20 border border-violet-500/30 px-4 py-1.5 rounded-full">
            <p className="text-violet-400 text-xs font-bold uppercase tracking-widest">
                {fileCount} {fileCount === 1 ? 'Image' : 'Images'} Ready for Conversion
            </p>
        </div>
      </div>

      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
      </div>
    </div>
  );
};