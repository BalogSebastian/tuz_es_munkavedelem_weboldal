'use client';

import { motion, AnimatePresence } from 'framer-motion';
import React from 'react';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

// Egyedi, többrétegű pajzs ikon a jobb vizuális élményért
const CustomShieldIcon = () => (
    <svg width="100%" height="100%" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="shieldGradient" x1="64" y1="0" x2="64" y2="128" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22d3ee"/>
                <stop offset="1" stopColor="#06b6d4"/>
            </linearGradient>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
                <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                </feMerge>
            </filter>
        </defs>
        <g filter="url(#glow)">
            <path d="M64 0L12.8 25.6V64C12.8 100.096 44.8 125.44 64 128C83.2 125.44 115.2 100.096 115.2 64V25.6L64 0Z" fill="url(#shieldGradient)" fillOpacity="0.3"/>
            <path d="M64 5.12L17.92 28.16V64C17.92 96.512 46.976 120.576 64 122.88C81.024 120.576 110.08 96.512 110.08 64V28.16L64 5.12Z" stroke="#67e8f9" strokeWidth="2"/>
            <motion.path
                d="M44.8 64L57.6 76.8L83.2 51.2"
                stroke="white"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.5, ease: 'easeOut' }}
            />
        </g>
    </svg>
);


export default function ExitIntentPopup({ isOpen, onAccept, onClose }: ExitIntentPopupProps) {

  // Animációs variánsok a lépcsőzetes megjelenéshez
  const modalVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 25,
        staggerChildren: 0.1, // Gyerek elemek késleltetése
        delayChildren: 0.2,
      },
    },
    exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring' } },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-[999] p-4"
          onClick={onClose}
        >
          {/* A sugárzó háttérfény */}
          <div className="absolute inset-0 -z-10 overflow-hidden">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse"></div>
          </div>

          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative font-['Poppins',_sans-serif] bg-slate-800/50 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-2xl w-full max-w-4xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            style={{
              // Belső, sugárzó fény effektus
              backgroundImage: 'radial-gradient(circle at center, rgba(3, 186, 190, 0.2), transparent 60%)',
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3">
              {/* Bal oldali ikon szekció */}
              <motion.div
                variants={itemVariants}
                className="hidden md:flex items-center justify-center p-8 bg-white/5 border-r border-white/10"
              >
                 <CustomShieldIcon />
              </motion.div>
              
              {/* Jobb oldali tartalom szekció */}
              <div className="md:col-span-2 p-8 sm:p-10 text-center md:text-left">
                <motion.h2 variants={itemVariants} className="text-3xl lg:text-4xl font-black text-white mb-3">
                  Elfogadsz egy sütit?
                </motion.h2>
                <motion.p variants={itemVariants} className="text-slate-300 mb-6 text-base lg:text-lg leading-relaxed">
                  Kedves olvasó, az oldal sütiket használ a jobb felhasználói élmény érdekében. A böngészés folytatásával elfogadod a sütik használatát.
                </motion.p>
                <motion.p variants={itemVariants} className="text-xs text-slate-400 mb-8">
                  részletek az adatkezelési tájékoztatóban
                </motion.p>
                <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                  <button
                    onClick={onAccept}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-400 to-sky-500 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-300 ease-in-out shadow-lg hover:shadow-cyan-400/50 hover:scale-105 focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-300 animate-pulse-slow"
                  >
                    Elfogadom
                  </button>
                  <button
                    onClick={onClose}
                    className="w-full sm:w-auto text-slate-300 font-medium py-3 px-8 rounded-xl hover:bg-white/10 hover:text-white transition-colors"
                  >
                    Nem, most nem
                  </button>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}