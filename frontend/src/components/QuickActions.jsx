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
    <div className="bg-[#1e293b] border border-slate-800 rounded-3xl p-6 shadow-xl h-full">
      <div className="flex items-center gap-3 mb-6">
        <FiZap className="text-amber-400" />
        <h2 className="font-semibold text-white">Quick Actions</h2>
      </div>

      <div className="space-y-3">
        {actions.map((action) => (
          <button
            key={action.value}
            disabled={disabled}
            onClick={() => setFormat(action.value)}
            className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all text-left group
              ${currentFormat === action.value 
                ? 'bg-violet-600/20 border-violet-500 ring-1 ring-violet-500' 
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-600'
              } ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
          >
            <div>
              <p className={`text-sm font-bold ${currentFormat === action.value ? 'text-violet-400' : 'text-slate-200'}`}>
                {action.label}
              </p>
              <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tight">{action.desc}</p>
            </div>
            <FiArrowRight className={`transition-transform group-hover:translate-x-1 ${currentFormat === action.value ? 'text-violet-400' : 'text-slate-600'}`} />
          </button>
        ))}
      </div>

      {/* Primary Action Trigger */}
      <div className="mt-8">
        <button
          onClick={onConvert}
          disabled={disabled || loading}
          className={`w-full py-4 rounded-2xl font-bold text-white transition-all shadow-lg 
            ${disabled || loading 
              ? 'bg-slate-700 cursor-not-allowed' 
              : 'bg-gradient-to-r from-violet-600 to-indigo-600 hover:scale-[1.02] active:scale-95 shadow-violet-900/20'}`}
        >
          {loading ? 'Processing...' : 'Run Conversion'}
        </button>
      </div>
    </div>
  );
};