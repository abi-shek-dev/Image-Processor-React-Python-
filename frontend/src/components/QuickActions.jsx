import React from 'react';
import { FiZap, FiArrowRight } from 'react-icons/fi';

export const QuickActions = ({ currentFormat, setFormat, onConvert, loading, disabled }) => {
  const actions = [
    { label: 'Convert to PNG', value: 'PNG', desc: 'Best for transparency' },
    { label: 'Convert to JPEG', value: 'JPEG', desc: 'Best for photographs' },
    { label: 'Convert to WEBP', value: 'WEBP', desc: 'Next-gen web format' },
    { label: 'Convert to BMP', value: 'BMP', desc: 'Windows Bitmap' },
    { label: 'Convert to TIFF', value: 'TIFF', desc: 'High-quality print' },
  ];

  return (
    <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 shadow-sm h-full flex flex-col">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600">
          <FiZap />
        </div>
        <h2 className="font-bold text-slate-800">Quick Actions</h2>
      </div>

      <div className="space-y-3 flex-grow">
        {actions.map((action) => (
          <button
            key={action.value}
            disabled={disabled}
            onClick={() => setFormat(action.value)}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left group
              ${currentFormat === action.value 
                ? 'bg-white border-emerald-500 shadow-md ring-1 ring-emerald-500' 
                : 'bg-white border-slate-200 hover:border-emerald-300'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div>
              <p className={`text-sm font-bold ${currentFormat === action.value ? 'text-emerald-600' : 'text-slate-700'}`}>
                {action.label}
              </p>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-tight">{action.desc}</p>
            </div>
            <FiArrowRight className={`transition-transform group-hover:translate-x-1 ${currentFormat === action.value ? 'text-emerald-500' : 'text-slate-300'}`} />
          </button>
        ))}
      </div>

      {/* Action Button */}
      <div className="mt-8">
        <button
          onClick={onConvert}
          disabled={disabled || loading}
          className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg 
            ${disabled || loading 
              ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' 
              : 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 active:scale-[0.98] shadow-emerald-200'}`}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              <span>Processing...</span>
            </div>
          ) : 'Run Conversion'}
        </button>
      </div>
    </div>
  );
};