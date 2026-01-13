import React from 'react';
import { FiGithub, FiInstagram, FiLinkedin } from 'react-icons/fi';

export const Footer = () => {
  return (
    <footer className="w-full mt-20 py-8 px-6 bg-white border-t border-slate-800/50">
      <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left Side: Developer Credits */}
        <div className="flex items-center gap-2">
          <p className="text-sm text-black/50 font-medium">
            Developed by <span className="text-emerald-500 font-bold">Abishek M</span>
          </p>
        </div>

        {/* Center: Copyright */}
        <div className="text-sm text-black/50 font-medium">
          Copyright <span className="text-emerald-500">©</span> 2025
        </div>

        {/* Right Side: Social Links */}
        <div className="flex items-center gap-6">
          <a 
            href="https://github.com/abi-shek-dev" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black/50 hover:text-emerald-500 transition-colors duration-300"
          >
            <FiGithub size={20} />
          </a>
          <a 
            href="https://instagram.com/abishek.xe" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black/50 hover:text-emerald-500 transition-colors duration-300"
          >
            <FiInstagram size={20} />
          </a>
          <a 
            href="https://linkedin.com/in/xe54z" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-black/50 hover:text-emerald-500 transition-colors duration-300"
          >
            <FiLinkedin size={20} />
          </a>
        </div>

      </div>
    </footer>
  );
};