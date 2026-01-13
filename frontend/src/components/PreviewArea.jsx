import { FiImage } from 'react-icons/fi';

export const PreviewArea = ({ preview }) => (
  <div className="bg-[#1e293b] border border-slate-800 rounded-[2rem] p-6 h-full min-h-[550px] flex items-center justify-center relative overflow-hidden shadow-2xl">
    {preview ? (
      <div className="relative z-10 w-full h-full flex items-center justify-center">
        <img src={preview} alt="Preview" className="max-h-[500px] max-w-full rounded-xl object-contain shadow-2xl border border-slate-700/50" />
      </div>
    ) : (
      <div className="text-center z-10">
        <div className="w-24 h-24 bg-slate-900/50 border border-slate-800 rounded-3xl flex items-center justify-center mx-auto mb-6">
          <FiImage className="text-slate-700 text-4xl" />
        </div>
        <h3 className="text-xl font-semibold text-slate-400">Preview Area</h3>
        <p className="text-slate-600 text-sm mt-2">Upload an image to see it here</p>
      </div>
    )}
    <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
      style={{ backgroundImage: 'radial-gradient(#ffffff 1px, transparent 1px)', backgroundSize: '32px 32px' }}>
    </div>
  </div>
);