// components/HeaderHero.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { QuoteRequestModal } from './QuoteRequestModal'; // Az új modal importálása

// --- STÍLUS ÉS KONFIGURÁCIÓS KONSTANSOK ---
const ACCENT_COLOR = {
    baseHex: '#03BABE',
    baseRgb: '3, 186, 190',
    bg: 'bg-[#03BABE]',
    hoverBg: 'hover:bg-cyan-600',
    ring: 'focus-visible:ring-cyan-500',
    textOnAccent: 'text-white',
    textDark: 'text-cyan-800',
    textLight: 'text-cyan-300',
};

const RED_ACCENT_COLOR = {
    baseHex: '#DC2626', // Tailwind red-600
    baseRgb: '220, 38, 38',
    bg: 'bg-red-600',
    hoverBg: 'hover:bg-red-700',
    ring: 'focus-visible:ring-red-500',
    textOnAccent: 'text-white',
};

const ANIMATION_VARIANTS = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.5 },
        },
    },
    item: {
        hidden: { opacity: 0, y: 25, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { type: 'spring', stiffness: 100, damping: 20 },
        },
    },
};

// --- FŐ KOMPONENS ---
const HeaderHero = () => {
    // State a modal ablak nyitásához/zárásához
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
                .cta-glow {
                  box-shadow: 0 0 15px ${ACCENT_COLOR.baseHex}40, 0 0 30px ${ACCENT_COLOR.baseHex}30, inset 0 0 10px ${ACCENT_COLOR.baseHex}20;
                }
                .cta-glow-red {
                    /* Sokat megemelt glowing effektus */
                    box-shadow: 0 0 30px ${RED_ACCENT_COLOR.baseHex}80, 0 0 60px ${RED_ACCENT_COLOR.baseHex}60, inset 0 0 20px ${RED_ACCENT_COLOR.baseHex}40;
                }
                .cta-grid-pattern { 
                  background-image: linear-gradient(rgba(203, 213, 225, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(203, 213, 225, 0.05) 1px, transparent 1px); 
                  background-size: 4rem 4rem; 
                }
                `}
            </style>

            <div className="min-h-screen w-screen flex flex-col text-white antialiased relative overflow-hidden bg-slate-900 font-['Poppins',_sans-serif] cta-grid-pattern pt-[60px]">
                {/* Navbar */}
                <div className="fixed top-0 left-0 right-0 bg-slate-950/70 backdrop-blur-lg py-3 px-4 sm:px-6 flex items-center justify-around text-sm shadow-xl z-50 border-b border-slate-700">
                    <div className="flex items-center gap-1">
                        <div className="font-bold text-lg tracking-wider relative top-[5px]">
                            <span className={ACCENT_COLOR.textLight}>Munkavédelmi</span><span className="text-white">Szaki</span>
                        </div>
                        {/* A logo méretének csökkentése a navbarban */}
                        <Image
                            src="/munkavedelmiszakiLOGO.png"
                            alt="Munkavédelmi Szaki Logó"
                            width={32}
                            height={32}
                            className="h-8 w-auto"
                        />
                    </div>
                    {/* E-mail és telefonszám elhelyezése */}
                    <div className="hidden md:flex items-center gap-6 font-medium text-slate-300">
                        <a href="mailto:info@tuz-munkavedelmiszaki.hu" className="hover:text-cyan-300 transition-colors duration-300">info@tuz-munkavedelmiszaki.hu</a>
                        <a href="tel:+36302722571" className="hover:text-cyan-300 transition-colors duration-300 whitespace-nowrap">+36 30 272 2571</a>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className={`
                            ${ACCENT_COLOR.bg} ${ACCENT_COLOR.hoverBg} ${ACCENT_COLOR.textOnAccent}
                            font-bold py-2.5 px-5 rounded-lg text-sm
                            transition-all duration-300 ease-in-out
                            focus:outline-none focus-visible:ring-2 ${ACCENT_COLOR.ring}
                            `}
                        >
                            Ajánlatkérés
                        </button>
                    </motion.div>
                </div>

                {/* Fő tartalom */}
                <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 text-center relative">
                    <div className="max-w-5xl relative z-10 flex flex-col items-center">
                        
                        <motion.div
                          className="flex flex-col items-center"
                          variants={ANIMATION_VARIANTS.container}
                          initial="hidden"
                          animate="visible"
                        >
                          <motion.div variants={ANIMATION_VARIANTS.item} className="mb-2 z-20">
                              {/* A középső logó méretének csökkentése */}
                              <Image
                                  src="/munkavedelmiszakiLOGO.png"
                                  alt="Munkavédelmi Szaki Logó"
                                  width={150}
                                  height={150}
                                  className="mx-auto"
                                  priority
                              />
                          </motion.div>

                          <motion.h2
                              className="text-3xl md:text-4xl text-slate-300 mb-2 z-10"
                              variants={ANIMATION_VARIANTS.item}
                          >
                              {/* Új copy szöveg */}
                              Elkészítjük a jogszabályoknak megfelelő Tűz- Munkavédelmi, és HACCP dokumentációkat, hogy téged ne büntessenek meg.
                          </motion.h2>

                          <motion.h1
                              className="text-5xl sm:text-7xl md:text-7xl font-black mb-8 leading-tight tracking-tighter text-white z-10"
                              variants={ANIMATION_VARIANTS.item}
                          >
                              {/* Új copy szöveg */}
                              A büntetés értéke 10 Millió forintig terjedhet!
                          </motion.h1>

                          <motion.p
                              className="text-lg md:text-xl mb-12 text-slate-300 max-w-3xl font-medium z-10"
                              variants={ANIMATION_VARIANTS.item}
                          >
                              {/* Meglévő copy szöveg megtartása */}
                              Segítünk kijutni a jogszabályi útvesztőből, és átláthatóvá tenni a Tűz, Munkavédelem, vagy akár a HACCP kérdéseit!
                          </motion.p>

                          <motion.div
                              variants={ANIMATION_VARIANTS.item}
                          >
                              {/* Új CTA gomb, erősebb glowing effekttel */}
                              <Link 
                                href="https://app.minup.io/book/munkavedelmiszaki/service/46358"
                                passHref
                                className="inline-flex"
                              >
                                <motion.button
                                    whileHover={{ scale: 1.05, boxShadow: `0 0 45px ${RED_ACCENT_COLOR.baseHex}80, 0 0 90px ${RED_ACCENT_COLOR.baseHex}60, inset 0 0 30px ${RED_ACCENT_COLOR.baseHex}40` }}
                                    whileTap={{ scale: 0.98, boxShadow: `0 0 15px ${RED_ACCENT_COLOR.baseHex}40, 0 0 30px ${RED_ACCENT_COLOR.baseHex}30, inset 0 0 10px ${RED_ACCENT_COLOR.baseHex}20` }}
                                    className={`inline-flex items-center gap-3 ${RED_ACCENT_COLOR.bg} ${RED_ACCENT_COLOR.textOnAccent} font-bold py-8 px-12 rounded-xl text-3xl shadow-lg cta-glow-red transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 ${RED_ACCENT_COLOR.ring} focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900`}
                                >
                                    Foglald le ingyenes konzultációdat!
                                </motion.button>
                              </Link>
                          </motion.div>
                           
                          {/* Új szöveg a CTA gomb alá */}
                          <motion.div
                              variants={ANIMATION_VARIANTS.item}
                              className="mt-8 text-lg font-bold text-white text-center"
                          >
                              <span className="text-yellow-400">★ ★ ★ ★ ★</span>
                              <span className="ml-2">Több mint 150 elkerült büntetés!</span>
                          </motion.div>

                        </motion.div>
                    </div>
                </div>
            </div>
            
            {/* Az új modal ablak renderelése */}
            <QuoteRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default HeaderHero;