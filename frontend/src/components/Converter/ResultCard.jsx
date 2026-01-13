import React from 'react';
import { Download } from 'lucide-react';

export default function ResultCard({ result, onReset }) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-10 shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-500">
      <div className="flex items-center justify-between mb-10 pb-10 border-b border-slate-100">
        <div>
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Original</p>
          <p className="text-3xl font-bold">{result.originalSize}MB</p>
        </div>
        <div className="px-4 py-1.5 bg-green-50 text-green-600 text-[11px] font-bold rounded-full">
          -{result.savings}% GAIN
        </div>
        <div className="text-right">
          <p className="text-[10px] font-bold text-green-600 uppercase tracking-widest mb-2">Optimized</p>
          <p className="text-3xl font-bold text-green-600">{result.newSize}MB</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <a 
          href={result.url} 
          download={`${result.name}.webp`}
          className="w-full py-5 bg-slate-900 text-white text-center font-bold text-xs uppercase tracking-[0.2em] rounded-xl hover:bg-slate-800 transition-colors flex justify-center items-center gap-2"
        >
          <Download className="w-4 h-4" /> Export WebP
        </a>
        <button 
          onClick={onReset}
          className="text-[10px] font-bold text-slate-300 hover:text-slate-900 transition-colors uppercase tracking-[0.3em] mt-2"
        >
          Discard & Reset
        </button>
      </div>
    </div>
  );
}