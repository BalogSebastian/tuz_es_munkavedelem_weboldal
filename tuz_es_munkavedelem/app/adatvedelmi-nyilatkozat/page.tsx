// app/adatvedelmi-nyilatkozat/page.tsx
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

const PrivacyPolicyPage: React.FC = () => {
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
          Adatvédelmi <span className={accentColor.text}>Nyilatkozat</span>
        </h1>
        
        <p className="text-slate-700 leading-relaxed mb-4">
          Cégünk, a JaniMark Kft. (a továbbiakban: "Adatkezelő") elkötelezett az Ön személyes adatainak védelme iránt. Jelen Adatvédelmi Nyilatkozat célja, hogy tájékoztassuk Önt arról, hogyan gyűjtjük, használjuk, tároljuk és védjük az Ön adatait a weboldalunk és szolgáltatásaink használata során.
        </p>
        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">1. Adatgyűjtés és Felhasználás</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Weboldalunk látogatása során automatikusan gyűjtünk bizonyos adatokat (pl. IP-cím, böngésző típusa, látogatott oldalak). Ezen adatok statisztikai célokat szolgálnak, segítve minket szolgáltatásaink fejlesztésében.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Amennyiben Ön kapcsolatba lép velünk (pl. űrlapon keresztül, e-mailben, telefonon), gyűjthetünk személyes adatokat, mint név, e-mail cím, telefonszám, cégadatok. Ezeket az adatokat kizárólag a megkeresés megválaszolására, az ajánlatkérés feldolgozására, vagy az Ön által igényelt szolgáltatás nyújtására használjuk fel.
        </p>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">2. Adatkezelés Jogi Alapja</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az adatkezelés jogalapja az Ön hozzájárulása, a szerződés teljesítése, jogi kötelezettség teljesítése, vagy jogos érdekünk érvényesítése (GDPR 6. cikk (1) bekezdés).
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">3. Adatbiztonság</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Megteszünk minden ésszerű technikai és szervezeti intézkedést, hogy megvédjük az Ön adatait az illetéktelen hozzáféréstől, módosítástól, nyilvánosságra hozataltól vagy megsemmisítéstől.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">4. Az Ön Jogai</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Önnek joga van az adatokhoz való hozzáféréshez, azok helyesbítéséhez, törléséhez, az adatkezelés korlátozásához, az adathordozhatósághoz, és tiltakozáshoz az adatkezelés ellen. Joga van továbbá panaszt benyújtani a felügyeleti hatósághoz (NAIH).
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">5. Kapcsolat</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Amennyiben kérdése vagy kérése van az adatkezeléssel kapcsolatban, kérjük, vegye fel velünk a kapcsolatot az info@markjani.hu e-mail címen.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Jelen nyilatkozatot 2025. július 22. napján frissítettük.
        </p>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;