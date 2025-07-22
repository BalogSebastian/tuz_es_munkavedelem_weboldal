// app/aszf/page.tsx
'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const accentColor = {
  text: 'text-[#03BABE]',
  bg: 'bg-[#03BABE]',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  focusRingOffset: 'focus:ring-offset-white',
};

const AszfPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
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
        <motion.button
          onClick={() => router.back()}
          className={`inline-flex items-center justify-center p-3 rounded-full ${accentColor.bg} text-white shadow-md ${accentColor.hoverBg} transition-all duration-300 mb-8`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </motion.button>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 text-center">
          Általános Szerződési <span className={accentColor.text}>Feltételek</span> (ÁSZF)
        </h1>
        
        <p className="text-slate-700 leading-relaxed mb-4">
          Jelen Általános Szerződési Feltételek (a továbbiakban: ÁSZF) tartalmazza a JaniMark Kft. (székhely: 4031 Debrecen, István út 140., adószám: [Cég adószáma], cégjegyzékszám: [Cégjegyzékszám], a továbbiakban: Szolgáltató) által nyújtott szolgáltatások igénybevételének feltételeit.
        </p>
        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">1. Szolgáltatások Tárgya</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Szolgáltató tűz- és munkavédelmi szaktanácsadást, dokumentációk elkészítését, oktatásokat és egyéb kapcsolódó szolgáltatásokat nyújt megrendelői (a továbbiakban: Megrendelő) részére. A konkrét szolgáltatások és azok díjazása egyedi szerződésben vagy ajánlatban kerül rögzítésre.
        </p>
        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">2. Megrendelés és Szerződéskötés</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Megrendelő a Szolgáltatótól írásban (e-mailben) vagy személyes egyeztetés során kérhet ajánlatot. Az ajánlat elfogadása és a felek közötti megállapodás aláírása (vagy írásos visszaigazolása) jelenti a szerződés létrejöttét.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">3. Díjazás és Fizetési Feltételek</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          A szolgáltatások díja az egyedi ajánlatban vagy szerződésben rögzített összeg. A fizetési feltételek (előleg, részletfizetés, határidők) szintén az egyedi megállapodás részét képezik. Fizetési késedelem esetén a Szolgáltató a mindenkori jogszabályoknak megfelelő késedelmi kamatot számíthat fel.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">4. Felelősségvállalás</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Szolgáltató a tőle elvárható gondossággal jár el a szolgáltatások nyújtása során. Felelőssége a szakmai hibákból eredő közvetlen károkra korlátozódik, a következményi károkért nem vállal felelősséget.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">5. Adatkezelés</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Szolgáltató a Megrendelők személyes adatait az Adatvédelmi Nyilatkozatában foglaltak szerint kezeli, szigorúan betartva a vonatkozó jogszabályokat (különösen a GDPR-t).
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">6. Jogviták Rendezése</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          A felek igyekeznek a felmerülő vitás kérdéseket békés úton rendezni. Ennek sikertelensége esetén a Budapesti Bíróságok joghatóságát kötik ki.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Jelen ÁSZF 2025. július 22. napján lép hatályba.
        </p>
      </motion.div>
    </div>
  );
};

export default AszfPage;