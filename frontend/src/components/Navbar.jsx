import { FiImage } from 'react-icons/fi';

export const Navbar = () => (
  <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 mb-12">
    <div className="p-3 bg-emerald-500 rounded-2xl shadow-lg shadow-emerald-500/40">
      <FiImage className="text-white text-2xl" />
    </div>
    <h1 className="text-3xl font-bold text-black tracking-tight">
      Xe54z | PixelShift <span className="text-emerald-400 text-xs font-bold border border-emerald-500/30 px-2 py-0.5 rounded-full ml-2">PRO</span>
    </h1>
  </div>
);