'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheckIcon, SparklesIcon } from '@heroicons/react/24/solid';

interface ExitIntentPopupProps {
  isOpen: boolean;
  onClose: () => void;
  onAccept: () => void;
}

export default function ExitIntentPopup({ isOpen, onAccept, onClose }: ExitIntentPopupProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center z-[999] p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="relative bg-white font['Poppins',_sans-serif] rounded-2xl shadow-2xl w-full max-w-lg text-center p-8 border-t-4 border-cyan-400"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-cyan-400 p-4 rounded-full ring-4 ring-white shadow-lg">
              <SparklesIcon className="w-12 h-12 text-white" />
            </div>
            <h2 className="text-3xl font-black text-slate-800 mt-8 mb-4">Mielőtt elmész...</h2>
            <p className="text-slate-600 mb-6 text-lg leading-relaxed">
              Szeretnénk biztosítani, hogy a jövőben is a legjobb és legbiztonságosabb élményt nyújthassuk. Kérjük, fogadd el az adatkezelési feltételeket, hogy segíts nekünk ebben!
            </p>
            <p className="text-xs text-slate-400 mb-8">
              Az "Elfogadom" gombra kattintva hozzájárulsz, hogy anonimizált technikai adatokat (pl. IP cím, böngésző típusa) rögzítsünk biztonsági és statisztikai célokból. Részletek az <a href="/adattaj" target="_blank" className="underline hover:text-cyan-500">Adatkezelési Tájékoztatóban</a>.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onAccept}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-cyan-500 text-white font-bold py-3 px-8 rounded-xl text-lg transition-all duration-300 ease-in-out hover:bg-cyan-600 hover:scale-105 hover:shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
              >
                <ShieldCheckIcon className="w-6 h-6" />
                Elfogadom és Hozzájárulok
              </button>
              <button
                onClick={onClose}
                className="w-full sm:w-auto text-slate-500 font-medium py-3 px-8 rounded-xl hover:bg-slate-100 transition-colors"
              >
                Nem, köszönöm
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}