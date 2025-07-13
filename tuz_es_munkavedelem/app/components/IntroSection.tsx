'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    FireIcon,
    ShieldCheckIcon as ShieldIconOutline,
    XMarkIcon,
    CheckCircleIcon,
    CalendarDaysIcon
} from '@heroicons/react/24/solid';
import { ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';


// --- Színpaletta és animációs variánsok ---
const accentColor = {
  base: '#03BABE',
  bg: 'bg-[#03BABE]',
  text: 'text-[#03BABE]',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  shadow: 'shadow-cyan-500/40',
  hoverShadow: 'hover:shadow-cyan-400/60',
};
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(5px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }
  },
};
const iconCardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }
  },
};

// ÚJ: Modális ablak komponens
const ServicesModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
    const servicesList = [
        "Teljes körű tűzvédelmi szolgáltatás",
        "Munkavédelmi feladatok ellátása",
        "Kockázatértékelés készítése",
        "HACCP rendszer kiépítése és felügyelete",
        "Érintésvédelmi felülvizsgálat",
        "Tűz- és munkavédelmi oktatások",
        "Munkabalesetek kivizsgálása",
        "Emelőgép- és egyéb gépvizsgálatok"
    ];

    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 },
    };

    const modalVariants = {
        hidden: { opacity: 0, y: 50, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25, delay: 0.1 } },
        exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50"
                    variants={backdropVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    onClick={onClose}
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto p-8 relative"
                        variants={modalVariants}
                        exit="exit"
                        onClick={(e) => e.stopPropagation()} // Megakadályozza a bezárást, ha a modalra kattintunk
                    >
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors">
                            <XMarkIcon className="w-8 h-8" />
                        </button>

                        <h2 className={`text-3xl font-black text-center mb-6`}>
                            Miben <span className={accentColor.text}>Segíthetünk</span>?
                        </h2>
                        <p className="text-center text-slate-600 mb-8 max-w-lg mx-auto">
                            Az alábbi szolgáltatásokkal állunk rendelkezésére, hogy vállalkozása biztonságos és a jogszabályoknak megfelelő legyen.
                        </p>

                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                            {servicesList.map((service, index) => (
                                <motion.li
                                    key={index}
                                    className="flex items-start gap-3"
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0, transition: { delay: 0.2 + index * 0.05 } }}
                                >
                                    <CheckCircleIcon className={`w-6 h-6 mt-0.5 shrink-0 ${accentColor.text}`} />
                                    <span className="text-slate-700">{service}</span>
                                </motion.li>
                            ))}
                        </ul>

                        <motion.div
                           className="text-center"
                           initial={{ opacity: 0, y: 20 }}
                           animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}
                        >
                           <Link href="https://calendly.com/" target="_blank" rel="noopener noreferrer">
                                <motion.button
                                    className={`inline-flex items-center gap-3 ${accentColor.bg} text-white font-bold py-4 px-10 rounded-xl text-lg transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-4 ${accentColor.ring} focus:ring-offset-2`}
                                    whileHover={{ scale: 1.05, y: -4, boxShadow: '0 10px 20px -5px rgba(3, 186, 190, 0.5)' }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <CalendarDaysIcon className="w-6 h-6" />
                                    Időpontot Foglalok
                                </motion.button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


const IntroSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
        .bg-grid-pattern {
            background-color: #f8fafc;
            background-image:
                linear-gradient(rgba(3, 186, 190, 0.07) 1px, transparent 1px),
                linear-gradient(to right, rgba(3, 186, 190, 0.07) 1px, transparent 1px);
            background-size: 3rem 3rem;
        }
      `}</style>
      <motion.section
        id="bemutatkozas"
        className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 font-['Poppins',_sans-serif] bg-grid-pattern"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-6xl mx-auto flex flex-col items-center">
          <motion.h2
            className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-16 text-center"
            variants={itemVariants}
          >
            A Professzionális <span className={accentColor.text}>Biztonság</span> Alapjai
          </motion.h2>

          <motion.p variants={itemVariants} className="text-center text-lg lg:text-xl text-slate-600 max-w-3xl mb-16 leading-relaxed">
            Üdvözöljük! Célunk, hogy ne csak a jogszabályi útvesztőkben nyújtsunk biztos támaszt, hanem valódi értéket teremtsünk vállalkozása számára. Egy jól megtervezett tűz- és munkavédelmi rendszer a nyugodt, biztonságos és hatékony működésnek.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 w-full">

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-200/80 transition-all duration-300 hover:shadow-2xl"
            >
              <motion.div
                  className="absolute w-24 h-24 -top-8 -right-8"
                  animate={{ y: [-4, 4, -4], rotate: [-3, 3, -3], }}
                  transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              >
                  <FireIcon className="w-full h-full text-red-500 drop-shadow-lg" />
              </motion.div>

              <motion.div variants={iconCardVariants} className="flex items-center gap-5 mb-5">
                <div className={`p-4 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500`}>
                  <FireIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Tűzvédelem</h3>
              </motion.div>
              <p className="text-slate-600 leading-relaxed">
                Több mint tűzoltó készülékek megléte; ez egy proaktív stratégia, ami a megelőzésre, a gyors reagálásra és a károk minimalizálására épül. A megfelelő eszközöktől a munkatársak felkészítéséig minden részlet számít.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-200/80 transition-all duration-300 hover:shadow-2xl"
            >
              <motion.div
                  className="absolute w-24 h-24 -top-8 -right-8"
                  animate={{ y: [-4, 4, -4], rotate: [-3, 3, -3], }}
                  transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              >
                  <FireIcon className="w-full h-full text-red-500 drop-shadow-lg" />
              </motion.div>

              <motion.div variants={iconCardVariants} className="flex items-center gap-5 mb-5">
                <div className={`p-4 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500`}>
                  <ShieldIconOutline className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Munkavédelem</h3>
              </motion.div>
              <p className="text-slate-600 leading-relaxed">
                A legértékesebb erőforrás, az ember védelmét helyezi előtérbe. A kockázatok precíz felmérésével és tudatos munkakultúrával nemcsak a baleseteket előzzük meg, de növeljük a termelékenységet is.
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-200/80 transition-all duration-300 hover:shadow-2xl"
            >
              <motion.div
                  className="absolute w-24 h-24 -top-8 -right-8"
                  animate={{ y: [-4, 4, -4], rotate: [-3, 3, -3], }}
                  transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
              >
                  <FireIcon className="w-full h-full text-red-500 drop-shadow-lg" />
              </motion.div>

              <motion.div variants={iconCardVariants} className="flex items-center gap-5 mb-5">
                <div className={`p-4 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500`}>
                  <ClipboardDocumentCheckIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">HACCP Rendszer</h3>
              </motion.div>
              <p className="text-slate-600 leading-relaxed">
                Az élelmiszer-biztonság alapja. Segít a higiéniai és élelmiszer-kezelési kockázatok azonosításában és ellenőrzésében, garantálva a fogyasztók egészségének védelmét és a jogszabályi megfelelést.
              </p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="text-center mt-20">
            <p className="mb-6 text-lg text-slate-600">
              Fedezze fel, hogyan alakíthatjuk ki közösen az Ön vállalkozásának stabil alapját!
            </p>
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.98 }}>
                {/* MÓDOSÍTVA: Link helyett gomb, ami nyitja a modalt */}
                <button
                onClick={() => setIsModalOpen(true)}
                className={`
                    inline-block ${accentColor.bg} ${accentColor.hoverBg} text-white
                    font-bold py-4 px-10 rounded-xl text-lg
                    shadow-lg ${accentColor.shadow} ${accentColor.hoverShadow}
                    transition-all duration-300 ease-in-out
                    focus:outline-none focus:ring-4 ${accentColor.ring}
                `}
                >
                Szolgáltatásaink Megtekintése
                </button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* ÚJ: A modális ablak renderelése */}
      <ServicesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default IntroSection;