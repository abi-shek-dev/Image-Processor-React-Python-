import React, { useEffect } from 'react';
import { FiCheckCircle, FiAlertCircle, FiX } from 'react-icons/fi';

export const Toast = ({ message, type = 'success', onClose, duration = 4000 }) => {
  // Automatically trigger the onClose function after the specified duration
  useEffect(() => {
    const timer = setTimeout(onClose, duration);
    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const isSuccess = type === 'success';

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className={`bg-white border ${isSuccess ? 'border-emerald-100 shadow-emerald-200/40' : 'border-red-100 shadow-red-200/40'} shadow-2xl rounded-2xl p-4 flex items-center gap-4 min-w-[320px] relative overflow-hidden`}>
        
        {/* Type-based Icon */}
        <div className={`${isSuccess ? 'bg-emerald-500' : 'bg-red-500'} text-white p-2 rounded-xl shadow-lg`}>
          {isSuccess ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
        </div>

        {/* Text Content */}
        <div className="flex-grow">
          <p className="text-sm font-bold text-slate-800">
            {isSuccess ? 'Success!' : 'System Error'}
          </p>
          <p className="text-[11px] text-slate-500 font-medium leading-tight">{message}</p>
        </div>

        {/* Close Button */}
        <button onClick={onClose} className="text-slate-300 hover:text-slate-500 transition-colors">
          <FiX size={18} />
        </button>

        {/* Animated Progress Bar */}
        <div 
          className={`absolute bottom-0 left-0 h-1 ${isSuccess ? 'bg-emerald-500' : 'bg-red-500'} transition-all linear`}
          style={{ 
            width: '100%', 
            animation: `shrink ${duration}ms linear forwards` 
          }}
        />
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}} />
    </div>
  );
};