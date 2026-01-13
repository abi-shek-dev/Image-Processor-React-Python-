import { FiSettings, FiDownload } from 'react-icons/fi';

export const SettingsCard = ({ format, setFormat, isCompressOn, setIsCompressOn, onConvert, loading, disabled }) => (
  <div className="bg-[#1e293b] border border-slate-800 rounded-3xl p-6 shadow-xl">
    <div className="flex items-center gap-3 mb-6">
      <FiSettings className="text-violet-400" />
      <h2 className="font-semibold text-white">Conversion Settings</h2>
    </div>

    <div className="space-y-5">
      <div>
        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">Target Format</label>
        <select 
          value={format} 
          onChange={(e) => setFormat(e.target.value)}
          className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white outline-none focus:ring-2 focus:ring-violet-600 transition-all cursor-pointer"
        >
          {['PNG', 'JPEG', 'WEBP', 'BMP', 'TIFF'].map(f => (
            <option key={f} value={f}>{f}</option>
          ))}
        </select>
      </div>

      <div className="flex items-center justify-between p-4 bg-slate-900/50 rounded-2xl border border-slate-800">
        <div>
          <p className="text-sm font-medium text-slate-200">Lossless Compression</p>
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Reduce size, keep quality</p>
        </div>
        <button 
          onClick={() => setIsCompressOn(!isCompressOn)}
          className={`w-12 h-6 flex items-center rounded-full p-1 transition-all duration-300 ${isCompressOn ? 'bg-violet-600' : 'bg-slate-700'}`}
        >
          <div className={`bg-white w-4 h-4 rounded-full shadow-lg transform transition-transform duration-300 ${isCompressOn ? 'translate-x-6' : 'translate-x-0'}`} />
        </button>
      </div>

      <button 
        onClick={onConvert}
        disabled={disabled || loading}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white transition-all shadow-lg shadow-violet-900/20 
          ${disabled || loading ? 'bg-slate-700 cursor-not-allowed opacity-50' : 'bg-violet-600 hover:bg-violet-500 active:scale-95'}`}
      >
        {loading ? 'Processing...' : <><FiDownload /> Convert & Download</>}
      </button>
    </div>
  </div>
);