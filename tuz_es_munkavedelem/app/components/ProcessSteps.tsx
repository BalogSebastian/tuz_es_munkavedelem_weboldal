// components/sections/ProcessSteps.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ChatBubbleLeftRightIcon,
    MagnifyingGlassIcon,
    DocumentCheckIcon,
    PresentationChartBarIcon,
    ArrowPathIcon,
    ClipboardDocumentListIcon,
    CheckBadgeIcon,
    ArrowRightIcon
} from '@heroicons/react/24/outline';

const steps = [
  { step: 1, icon: ChatBubbleLeftRightIcon, title: "Konzultáció és Igényfelmérés", description: "Megbeszéljük vállalkozása specifikus igényeit és a jogszabályi követelményeket." },
  { step: 2, icon: MagnifyingGlassIcon, title: "Helyszíni Bejárás / Audit", description: "Felmérjük a jelenlegi állapotot, azonosítjuk a kockázatokat és a potenciális hiányosságokat." },
  { step: 3, icon: DocumentCheckIcon, title: "Dokumentáció Készítése", description: "Elkészítjük a szükséges szabályzatokat, értékeléseket és terveket az Ön cégére szabva." },
  { step: 4, icon: PresentationChartBarIcon, title: "Oktatás és Képzés", description: "Gyakorlatias oktatást tartunk munkavállalóinak a biztonságos munkavégzésről." },
  { step: 5, icon: ClipboardDocumentListIcon, title: "Szabályzatok Bevezetése", description: "Segítünk az új eljárások és dokumentumok gyakorlati alkalmazásában és kommunikációjában." },
  { step: 6, icon: CheckBadgeIcon, title: "Hatósági Ellenőrzésre Felkészítés", description: "Támogatást nyújtunk a hatósági ellenőrzésekre való felkészülésben és azok során." },
  { step: 7, icon: ArrowPathIcon, title: "Éves Felülvizsgálat és Fejlesztés", description: "Segítünk a jogszabályi változások követésében és a rendszer folyamatos fejlesztésében." },
];

// Belépő animációs variánsok JAVÍTOTT easinggel
const cardEntranceVariants = {
  hiddenLeft: { opacity: 0, x: -80 },
  hiddenRight: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
        duration: 0.7,
        // *** JAVÍTÁS: Érvénytelen tömb helyett beépített easing név ***
        ease: "easeOut"
        // Vagy egy másik valid opció: ease: [0.22, 1, 0.36, 1] // easeOutQuint
    }
  }
};

const iconContainerVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut", delay: 0.2 } }
}

const ProcessSteps: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50 to-white relative overflow-hidden"> {/* Overflow hidden vissza a biztonság kedvéért */}
        {/* Háttér animációk */}
        <motion.div
            className="absolute top-10 left-[-15%] w-72 h-72 bg-red-100 rounded-full filter blur-3xl opacity-25"
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        <motion.div
             className="absolute bottom-10 right-[-15%] w-80 h-80 bg-blue-100 rounded-full filter blur-3xl opacity-25"
             animate={{ scale: [1, 1.05, 1], rotate: [0, -15, 0] }}
             transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 2 }}
        />
      <div className="container mx-auto px-6 relative z-10">
        {/* Fejléc */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">Együttműködésünk Folyamata</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Átlátható lépések a sikeres és biztonságos munkakörnyezetért.</p>
        </div>
        <div className="relative max-w-xl mx-auto lg:max-w-4xl">
          {/* Központi vonal */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-1 bg-gradient-to-b from-red-200 via-blue-200 to-red-200 rounded-full transform -translate-x-1/2 opacity-60"></div>

          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                className={`lg:flex items-center relative ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
                initial={index % 2 === 0 ? 'hiddenRight' : 'hiddenLeft'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={cardEntranceVariants} // Most már a JAVÍTOTT variánst használja
              >
                {/* Ikon és Pont Szekció */}
                <div className={`w-full lg:w-1/2 flex mb-8 lg:mb-0 ${index % 2 === 0 ? 'lg:justify-start lg:pl-[calc(50%+3rem)]' : 'lg:justify-end lg:pr-[calc(50%+3rem)]'}`}>
                  <motion.div
                    className="relative inline-block"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.1 + index * 0.05 }}
                    variants={iconContainerVariants}
                  >
                    <div className={`hidden lg:block absolute top-1/2 ${index % 2 === 0 ? 'left-[-5.75rem]' : 'right-[-5.75rem]'} transform -translate-y-1/2 w-5 h-5 bg-white border-2 border-red-500 rounded-full z-10 shadow-md`}></div>
                    <div className="bg-gradient-to-br from-white to-slate-100 p-6 rounded-full inline-flex items-center justify-center shadow-xl border border-gray-100 ring-8 ring-white/50">
                       <span className={`absolute -top-3 ${index % 2 === 0 ? '-right-3' : '-left-3'} bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-20 ring-4 ring-white`}>
                          {step.step}
                       </span>
                       <step.icon className="w-14 h-14 text-red-600" aria-hidden="true" />
                    </div>
                  </motion.div>
                </div>

                {/* Szöveges Tartalom Szekció */}
                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-10' : 'lg:pl-10'}`}>
                  {/* Nincs már itt belső motion.div */}
                  <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition-shadow duration-300">
                    <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-center mt-16 lg:mt-24">
          <button
            type="button"
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-semibold rounded-lg shadow-lg text-[#F5EDED] bg-[#6482AD] hover:bg-[#7FA1C3] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#7FA1C3] focus:ring-offset-[#F5EDED] transition-all duration-150 ease-in-out transform hover:scale-105"
          >
            Kezdjük el a közös munkát!
            <ArrowRightIcon className="ml-3 -mr-1 h-6 w-6" aria-hidden="true" />
          </button>
        </div>
    </section>
  );
};

export default ProcessSteps;
