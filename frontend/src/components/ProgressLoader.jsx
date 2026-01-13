import React from 'react';

export const ProgressLoader = ({ progress, isProcessing, fileCount }) => {
  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
      {/* Backdrop with blur */}
      <div className="absolute inset-0 bg-white/80 backdrop-blur-md animate-in fade-in duration-300" />
      
      {/* Loader Card */}
      <div className="relative w-full max-w-md bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-2xl shadow-emerald-100/50 flex flex-col items-center">
        
        {/* Circular Progress Indicator */}
        <div className="relative w-24 h-24 mb-8">
          <div className="absolute inset-0 border-4 border-slate-100 rounded-full" />
          <div 
            className="absolute inset-0 border-4 border-emerald-500 rounded-full border-t-transparent animate-spin"
            style={{ animationDuration: '1.5s' }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xl font-black text-slate-800">{progress}%</span>
          </div>
        </div>

        <h2 className="text-2xl font-bold text-slate-900 mb-2 text-center">
          {isProcessing ? 'Optimizing Assets...' : 'Uploading Images...'}
        </h2>
        
        <p className="text-sm text-slate-500 mb-8 text-center px-4">
          {isProcessing 
            ? `PixelShift is converting ${fileCount} files to high quality.` 
            : `Transmitting ${fileCount} images to the engine.`}
        </p>

        {/* Visual Progress Bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-emerald-500 transition-all duration-300 ease-out shadow-[0_0_12px_rgba(16,185,129,0.4)]"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        <div className="mt-4 flex justify-between w-full text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>{isProcessing ? 'Server Processing' : 'Network Transfer'}</span>
          <span>{progress}% Complete</span>
        </div>
      </div>
    </div>
  );
};