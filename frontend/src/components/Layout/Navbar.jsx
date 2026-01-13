import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Features', href: '#' },
  { name: 'Pricing', href: '#' },
  { name: 'Contact', href: '#' },
];

export default function Navbar() {
  const [activeTab, setActiveTab] = useState('Home');

  return (
    <nav className="w-full h-20 border-b border-white/5 bg-bg-primary/80 backdrop-blur-md fixed top-0 z-50 font-sans">
      <div className="max-w-[1440px] mx-auto h-full px-6 md:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-accent-green rounded-lg flex items-center justify-center font-black text-bg-primary text-lg italic skew-x-[-10deg]">
            X
          </div>
          <span className="text-xl font-black tracking-tighter uppercase italic text-white">
            Xe54z
          </span>
        </div>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setActiveTab(link.name)}
              className={`relative text-xs font-bold uppercase tracking-widest transition-colors py-2 ${
                activeTab === link.name ? 'text-accent-green' : 'text-text-secondary hover:text-white'
              }`}
            >
              {link.name}
              {activeTab === link.name && (
                <motion.div
                  layoutId="underline"
                  className="absolute bottom-0 left-0 right-0 h-[2px] bg-accent-green"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Register Button */}
        <button className="group flex items-center gap-2 px-6 py-2.5 bg-accent-green text-bg-primary rounded-lg text-xs font-black uppercase tracking-widest hover:bg-accent-green/90 transition-all shadow-lg shadow-accent-green/20">
          Register <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </nav>
  );
}