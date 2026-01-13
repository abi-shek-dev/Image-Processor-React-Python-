import React from 'react';
import { FiUploadCloud } from 'react-icons/fi';

export const DropZoneOverlay = ({ isDragging }) => {
  // Only render when the user is actively dragging files over the window
  if (!isDragging) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-emerald-500/10 backdrop-blur-[2px] flex items-center justify-center p-8 pointer-events-none animate-in fade-in duration-200">
      <div className="w-full h-full border-4 border-dashed border-emerald-500/50 rounded-[3rem] flex flex-col items-center justify-center bg-white/80 shadow-2xl shadow-emerald-200/50">
        
        {/* Animated Icon */}
        <div className="p-6 bg-emerald-500 text-white rounded-3xl shadow-xl shadow-emerald-200 animate-bounce">
          <FiUploadCloud size={48} />
        </div>

        <h2 className="mt-6 text-3xl font-bold text-slate-900">Drop to Upload</h2>
        <p className="mt-2 text-slate-500 font-medium text-center px-4">
          Release your images anywhere to add them to the conversion queue
        </p>
      </div>
    </div>
  );
};