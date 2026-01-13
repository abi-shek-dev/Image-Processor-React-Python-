import { FiImage } from 'react-icons/fi';

export const Navbar = () => (
  <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 mb-12">
    <div className="p-3 bg-violet-600 rounded-2xl shadow-lg shadow-violet-600/20">
      <FiImage className="text-white text-2xl" />
    </div>
    <h1 className="text-3xl font-bold text-white tracking-tight">
      PixelShift <span className="text-violet-500 text-sm font-medium border border-violet-500/30 px-2 py-0.5 rounded-full ml-2">PRO</span>
    </h1>
  </div>
);