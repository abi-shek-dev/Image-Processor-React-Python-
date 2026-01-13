import { FiUpload, FiCheckCircle } from 'react-icons/fi';

export const UploadCard = ({ file, onFileChange }) => (
  <div className="bg-[#1e293b] border border-slate-800 rounded-3xl p-6 shadow-xl">
    <div className="flex items-center gap-3 mb-6">
      <FiUpload className="text-violet-400" />
      <h2 className="font-semibold text-white">Upload Reference</h2>
    </div>
    
    <label className="group relative flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-700 hover:border-violet-500 bg-slate-900/50 rounded-2xl transition-all cursor-pointer overflow-hidden">
      <input type="file" className="hidden" onChange={(e) => onFileChange(e.target.files[0])} accept="image/*" />
      <div className="z-10 text-center p-4">
        <div className="bg-violet-600 group-hover:bg-violet-500 text-white px-5 py-2 rounded-xl font-medium transition-colors mb-3 inline-block">
          Select Image
        </div>
        <p className="text-xs text-slate-500">JPG, PNG, WEBP, BMP supported</p>
      </div>
    </label>
    {file && (
      <p className="text-xs text-violet-400 mt-3 flex items-center gap-1">
        <FiCheckCircle /> Selected: {file.name}
      </p>
    )}
  </div>
);