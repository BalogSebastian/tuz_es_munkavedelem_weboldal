'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

// A kiemelő szín beállításai
const accentColor = {
  text: 'text-[#03BABE]',
  bg: 'bg-[#03BABE]',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
};

const ImpresszumPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Háttér rácsozat */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(3, 186, 190, 0.1) 1px, transparent 1px), linear-gradient(to right, rgba(3, 186, 190, 0.1) 1px, transparent 1px)`,
        backgroundSize: '3rem 3rem',
      }}></div>

      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 sm:p-10 relative z-10 border border-slate-100"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Vissza gomb */}
        <motion.button
          onClick={() => router.back()}
          className={`inline-flex items-center justify-center p-3 rounded-full ${accentColor.bg} text-white shadow-md ${accentColor.hoverBg} transition-all duration-300 mb-8`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </motion.button>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8 text-center">
          Impres<span className={accentColor.text}>szum</span>
        </h1>
        
        <div className="space-y-8">
          {/* Üzemeltető adatai */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3 border-b pb-2">Üzemeltető</h2>
            <ul className="list-none space-y-2 text-slate-700 mt-4">
              <li><strong>Cégnév:</strong> Trident Shield Kft.</li>
              <li><strong>Székhely:</strong> 4485 Nagyhalász, Jókai utca 18.</li>
              <li><strong>Cégjegyzékszám:</strong> 15 09 093902</li>
              <li><strong>Adószám:</strong> 32873537-1-15</li>
              <li><strong>Képviselő:</strong> Németh János</li>
            </ul>
          </div>

          {/* Kapcsolat */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3 border-b pb-2">Kapcsolat</h2>
            <ul className="list-none space-y-2 text-slate-700 mt-4">
              <li><strong>Telefon:</strong> +36/302722571</li>
              <li><strong>E-mail:</strong> info.setter.job@gmail.com</li>
            </ul>
          </div>

          {/* Tárhelyszolgáltató */}
          <div>
            <h2 className="text-2xl font-bold text-slate-800 mb-3 border-b pb-2">Tárhelyszolgáltató</h2>
            <ul className="list-none space-y-2 text-slate-700 mt-4">
              <li><strong>Cégnév:</strong> <span className="text-slate-500">[Cégnév]</span></li>
              <li><strong>Székhely:</strong> <span className="text-slate-500">[Cím]</span></li>
              <li><strong>E-mail:</strong> <span className="text-slate-500">[support@...]</span></li>
            </ul>
          </div>
        </div>

        {/* Figyelmeztető szövegek */}
        <div className="mt-12 space-y-6">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4">
            <p className="text-amber-800">
              Mindemellett az adott tárhelyszolgáltató nevét, székhelyét, telephelyét, e-mail címét is meg kell jelölni.
            </p>
          </div>
          <div className="bg-red-50 border-l-4 border-red-400 p-4">
            <p className="text-red-800">
              Ha a közölt adatok nem felelnek meg a valóságnak vagy hiányosak, a fogyasztóvédelmi hatóság eljárást indíthat a honlap üzemeltetőjével szemben, és bírságot is szabhat ki rá. Ennek összege 15 ezer forinttól akár 500 millió forintig is terjedhet, függően attól, hogy az adott cég vagy vállalkozás milyen minősítésben működik.
            </p>
          </div>
        </div>

      </motion.div>
    </div>
  );
};

export default ImpresszumPage;