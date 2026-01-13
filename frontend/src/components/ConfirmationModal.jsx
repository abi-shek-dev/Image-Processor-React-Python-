import React from 'react';
import { FiAlertTriangle, FiX } from 'react-icons/fi';

export const ConfirmationModal = ({ isOpen, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
        onClick={onCancel}
      />
      
      {/* Modal Card */}
      <div className="relative bg-white border border-slate-200 w-full max-w-md rounded-[2.5rem] p-8 shadow-2xl animate-in zoom-in-95 duration-200">
        <button 
          onClick={onCancel}
          className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <FiX size={20} />
        </button>

        <div className="flex flex-col items-center text-center">
          <div className="p-4 bg-red-50 text-red-500 rounded-2xl mb-6">
            <FiAlertTriangle size={32} />
          </div>
          
          <h2 className="text-xl font-bold text-slate-900 mb-2">Clear Conversion Queue?</h2>
          <p className="text-sm text-slate-500 mb-8 px-4">
            This will remove all uploaded images from the list. This action cannot be undone.
          </p>

          <div className="flex gap-3 w-full">
            <button
              onClick={onCancel}
              className="flex-1 py-3 px-6 rounded-2xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 py-3 px-6 rounded-2xl bg-emerald-600 hover:bg-emerald-500 font-bold text-white shadow-lg shadow-emerald-200 transition-all"
            >
              Clear All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};