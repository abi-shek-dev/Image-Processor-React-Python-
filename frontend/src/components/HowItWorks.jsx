import React from 'react';
import { FiUploadCloud, FiCpu, FiShield, FiCheck } from 'react-icons/fi';

export const HowItWorks = () => {
  const steps = [
    {
      icon: <FiUploadCloud className="text-emerald-500" />,
      title: "Secure Upload",
      description: "Your files are transmitted via an encrypted multi-part stream to our PixelShift engine."
    },
    {
      icon: <FiCpu className="text-emerald-500" />,
      title: "Pillow Processing",
      description: "Our backend uses Python's Pillow library to handle transparency and color mode conversion (RGBA to RGB)."
    },
    {
      icon: <FiShield className="text-emerald-500" />,
      title: "Smart Compression",
      description: "Lossless optimization removes metadata while Quality 85 compression ensures perfect visual fidelity at lower sizes."
    },
    {
      icon: <FiCheck className="text-emerald-500" />,
      title: "Instant Download",
      description: "Images are packaged into high-speed ZIP archives for batch retrieval or sent directly for single files."
    }
  ];

  return (
    <section className="mt-20 py-16 border-t border-slate-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">The PixelShift Workflow</h2>
          <p className="text-slate-500 mt-2 font-medium">Professional grade image transformation in four simple steps.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group p-8 bg-slate-50 rounded-[2rem] border border-slate-100 hover:bg-white hover:border-emerald-200 hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
              <div className="w-14 h-14 bg-white border border-slate-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:bg-emerald-50 group-hover:border-emerald-100 transition-colors">
                <div className="text-2xl">{step.icon}</div>
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">{step.title}</h3>
              <p className="text-[13px] leading-relaxed text-slate-500 font-medium">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};