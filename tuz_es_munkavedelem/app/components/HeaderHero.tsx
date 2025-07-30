'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRightIcon,
    FireIcon,
    DocumentCheckIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import Image from 'next/image';

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
    const todoListText = "Eddig megvan: Ügyfél értékelések áthelyezése, Készen áll a biztonságra? - áthelyezése, Főbb szolgáltatások (4 kocka), Eredményeink módosítása, Anyagaink letöltése (3db kell), Kérdőív szélesebbre húzása, Pajzs Matrica csere, Készen áll a következő lépésre nem kell, Question1 elkészítése, PajzsMatrica , TűzésMunkavédelmiSzaki oldalnév.";

    return (
        <>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
                .cta-glow {
                  box-shadow: 0 0 15px ${ACCENT_COLOR.baseHex}40, 0 0 30px ${ACCENT_COLOR.baseHex}30, inset 0 0 10px ${ACCENT_COLOR.baseHex}20;
                }
                .bg-star-noise::before {
                  content: '';
                  position: absolute;
                  top: 0; left: 0; right: 0; bottom: 0;
                  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"%3E%3Crect fill="%230f172a" width="800" height="800"/%3E%3Cg fill-opacity="0.15"%3E%3Ccircle fill="%2303BABE" cx="400" cy="400" r="100"/%3E%3Ccircle fill="%231e293b" cx="400" cy="400" r="30"/%3E%3Ccircle fill="%23e2e8f0" cx="100" cy="100" r="5"/%3E%3Ccircle fill="%23e2e8f0" cx="700" cy="100" r="5"/%3E%3Ccircle fill="%23e2e8f0" cx="100" cy="700" r="5"/%3E%3Ccircle fill="%23e2e8f0" cx="700" cy="700" r="5"/%3E%3Ccircle fill="%23e2e8f0" cx="250" cy="250" r="2"/%3E%3Ccircle fill="%23e2e8f0" cx="550" cy="250" r="2"/%3E%3Ccircle fill="%23e2e8f0" cx="250" cy="550" r="2"/%3E%3Ccircle fill="%23e2e8f0" cx="550" cy="550" r="2"/%3E%3C/g%3E%3C/svg%3E');
                  background-size: 400px;
                  opacity: 0.2;
                  z-index: -1;
                }
                .cta-glow-red {
                    box-shadow: 0 0 15px ${RED_ACCENT_COLOR.baseHex}40, 0 0 30px ${RED_ACCENT_COLOR.baseHex}30, inset 0 0 10px ${RED_ACCENT_COLOR.baseHex}20;
                }
                `}
            </style>
            <div className="min-h-screen w-screen flex flex-col text-white antialiased relative overflow-hidden bg-slate-900 font-['Poppins',_sans-serif] bg-star-noise pt-[60px]">
                {/* Navbar módosítások */}
                <div className="fixed top-0 left-0 right-0 bg-slate-950/70 backdrop-blur-lg py-3 px-4 sm:px-6 flex items-center justify-between text-sm shadow-xl z-50 border-b border-slate-700">
                    <div className="flex items-center gap-2">
                        {/* MunkavédelmiSzaki szöveg igazítása */}
                        <div className="font-bold text-lg tracking-wider relative top-[2px]">
                            <span className={ACCENT_COLOR.textLight}>Munkavédelmi</span><span className="text-white"></span><span className={ACCENT_COLOR.textLight}></span><span className="text-white">Szaki</span>
                        </div>
                        <img
                            src="/munkavedelmiszakiLOGO.png"
                            alt="Munkavédelmi Szaki Logó"
                            className="h-10 w-auto"
                        />
                    </div>
                    <div className="hidden md:flex items-center gap-6 font-medium text-slate-300">
                        <a href="mailto:markjani@janimark.hu" className="hover:text-cyan-300 transition-colors duration-300">info@tuz-munkavedelmiszaki.hu</a>
                        <a href="tel:+36209791719" className="hover:text-cyan-300 transition-colors duration-300 whitespace-nowrap">+36302722571</a>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            href="https://calendly.com/"
                            className={`
                            ${ACCENT_COLOR.bg} ${ACCENT_COLOR.hoverBg} ${ACCENT_COLOR.textOnAccent}
                            font-bold py-2.5 px-5 rounded-lg text-sm
                            transition-all duration-300 ease-in-out
                            focus:outline-none focus-visible:ring-2 ${ACCENT_COLOR.ring}
                            `}
                        >
                            Ajánlatkérés
                        </Link>
                    </motion.div>
                </div>

                <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 text-center relative">
                    <div className="max-w-5xl relative z-10 flex flex-col items-center">
                        
                        <motion.div
                          className="flex flex-col items-center"
                          variants={ANIMATION_VARIANTS.container}
                          initial="hidden"
                          animate="visible"
                        >
                          {/* Logó a fő cím felett, nagyobb méretben és elválasztva */}
                          <motion.div variants={ANIMATION_VARIANTS.item} className="mb-8 z-20"> {/* Módosítva: pozitív margó */}
                              <Image
                                  src="/munkavedelmiszakiLOGO.png"
                                  alt="Munkavédelmi Szaki Logó"
                                  width={300}
                                  height={300}
                                  className="mx-auto"
                              />
                          </motion.div>

                          <motion.h2
                              className="text-3xl md:text-4xl text-slate-300 mb-2 z-10"
                              variants={ANIMATION_VARIANTS.item}
                          >
                              Nem tudod hogyan tovább?
                          </motion.h2>

                          <motion.h1
                              className="text-5xl sm:text-7xl md:text-8xl font-black mb-8 leading-tight tracking-tighter text-white z-10"
                              variants={ANIMATION_VARIANTS.item}
                          >
                              Nyugalom, mi tudjuk.
                          </motion.h1>

                          <motion.p
                              className="text-lg md:text-xl mb-12 text-slate-300 max-w-3xl font-medium z-10"
                              variants={ANIMATION_VARIANTS.item}
                          >
                              Segítünk kijutni a jogszabályi útvesztőből, és átláthatóvá tenni a Tűz, Munkavédelem, vagy akár a HACCP kérdéseit!
                          </motion.p>

                          <motion.div
                              variants={ANIMATION_VARIANTS.item}
                          >
                              <motion.button
                                  whileHover={{ scale: 1.03, y: -4 }}
                                  whileTap={{ scale: 0.98, y: 0 }}
                                  className={`inline-flex items-center gap-3 ${RED_ACCENT_COLOR.bg} ${RED_ACCENT_COLOR.textOnAccent} font-bold py-8 px-12 rounded-xl text-3xl shadow-lg cta-glow-red transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 ${RED_ACCENT_COLOR.ring} focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900`}
                              >
                                  Gyere és beszéljük át!
                              </motion.button>
                          </motion.div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderHero;