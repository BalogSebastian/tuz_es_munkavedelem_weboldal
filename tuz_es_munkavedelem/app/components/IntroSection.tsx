// app/components/IntroSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FireIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'; // FireIcon hozzáadva
import Link from 'next/link'; // Link a CTA gombhoz

// Brand színek a konzisztencia érdekében
const accentColor = {
  bg: 'bg-[#DD520F]',
  textOnLight: 'text-[#DD520F]',
  textOnAccent: 'text-white',
  hoverBg: 'hover:bg-orange-700',
  ring: 'focus:ring-orange-500',
};

// Animációs variánsok
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2, delayChildren: 0.1 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const iconVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut", delay: 0.3 } },
};


const IntroSection: React.FC = () => {
  return (
    <motion.section 
      id="bemutatkozas" 
      className="bg-slate-50 py-20 lg:py-28 px-4 sm:px-6 lg:px-8" // Háttér és padding frissítve
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.h2 
          className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-10 lg:mb-12 text-center" // Stílus és margó frissítve
          variants={itemVariants}
        >
          A Tűz- és Munkavédelem Esszenciája
        </motion.h2>
        
        <div className="text-lg text-gray-700 space-y-8 leading-relaxed"> {/* Sorköz és bekezdések közötti térköz növelve */}
          
          <motion.p variants={itemVariants}>
            Üdvözöljük! Célunk, hogy ne csak a jogszabályi útvesztőkben nyújtsunk biztos támaszt, hanem valódi értéket teremtsünk vállalkozása számára. Egy jól megtervezett tűz- és munkavédelmi rendszer alapja a nyugodt, biztonságos és hatékony működésnek.
          </motion.p>

          <motion.div className="flex items-start space-x-4" variants={itemVariants}>
            <motion.div variants={iconVariants} className="flex-shrink-0">
              <FireIcon className={`w-10 h-10 ${accentColor.textOnLight} mt-1`} />
            </motion.div>
            <p>
              A <strong>tűzvédelem</strong> több mint tűzoltó készülékek megléte; ez egy proaktív stratégia, ami a megelőzésre, a gyors reagálásra és a károk minimalizálására épül. A megfelelő eszközöktől és menekülési útvonalaktól kezdve a munkatársak felkészítéséig minden részlet számít.
            </p>
          </motion.div>

          <motion.div className="flex items-start space-x-4" variants={itemVariants}>
            <motion.div variants={iconVariants} className="flex-shrink-0">
              <ShieldCheckIcon className={`w-10 h-10 ${accentColor.textOnLight} mt-1`} />
            </motion.div>
            <p>
              A <strong>munkavédelem</strong> pedig a legértékesebb erőforrás, az ember védelmét helyezi előtérbe. A munkahelyi kockázatok precíz felmérésével, egyénre szabott védőintézkedésekkel és tudatos munkakultúrával nemcsak a baleseteket előzzük meg, de hozzájárulunk a munkatársak jóllétéhez és vállalkozása termelékenységének növeléséhez is.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="text-center pt-6">
            <p className="mb-6 text-gray-700">
              Fedezze fel, hogyan alakíthatjuk ki közösen azt a biztonságos és szabálykonform környezetet, ami vállalkozása stabil alapját képezi!
            </p>
            <Link 
              href="/#szolgaltatasok" // Példa link, a szolgáltatások szekcióra mutatna az oldalon belül
              className={`
                inline-block ${accentColor.bg} ${accentColor.hoverBg} ${accentColor.textOnAccent} 
                font-semibold py-3 px-8 rounded-lg text-base 
                shadow-md hover:shadow-lg 
                transition-all duration-300 ease-in-out 
                focus:outline-none focus:ring-2 ${accentColor.ring} focus:ring-opacity-75 
                transform hover:scale-105 active:scale-95
              `}
            >
              Szolgáltatásaink Megtekintése
            </Link>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default IntroSection;