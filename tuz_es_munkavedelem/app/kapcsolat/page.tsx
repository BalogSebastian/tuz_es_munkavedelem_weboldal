'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ArrowLeftIcon,
    PhoneIcon,
    EnvelopeIcon,
    ClockIcon,
    PaperAirplaneIcon,
    CheckCircleIcon,
    BuildingOfficeIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { SparklesIcon } from '@heroicons/react/24/solid';

const accentColor = {
  text: 'text-cyan-500',
  gradientFrom: 'from-cyan-500',
  gradientTo: 'to-teal-400',
  bg: 'bg-cyan-500',
  ring: 'focus:ring-cyan-500',
};

const ACCENT_COLOR_RED = {
    baseHex: '#DC2626',
    bg: 'bg-red-600',
    textOnAccent: 'text-white',
    ring: 'focus-visible:ring-red-500',
    shadow: 'shadow-red-500/40',
    hoverShadow: 'hover:shadow-red-400/60',
};

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 40 },
  in: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const Kapcsolat = () => {
    return (
        <div className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif] overflow-hidden">
            <motion.div
                className="absolute inset-0 z-0"
                animate={{
                    background: [
                        "radial-gradient(circle at 10% 20%, rgba(3, 186, 190, 0.07), transparent 40%)",
                        "radial-gradient(circle at 90% 80%, rgba(3, 186, 190, 0.07), transparent 40%)",
                        "radial-gradient(circle at 50% 50%, rgba(3, 186, 190, 0.07), transparent 40%)",
                        "radial-gradient(circle at 10% 20%, rgba(3, 186, 190, 0.07), transparent 40%)",
                    ]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 relative flex flex-col items-center justify-center"
                variants={pageVariants}
                initial="initial"
                animate="in"
            >
                <motion.header variants={itemVariants} className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
                    <h1 className="text-4xl md:text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter mb-4">
                        Lépj velünk <span className={accentColor.text}>kapcsolatba!</span>
                    </h1>
                    <p className="text-lg sm:text-xl text-slate-600 leading-snug max-w-2xl mx-auto">
                        Kérdésed van, vagy csak szeretnél konzultálni? Keress minket bátran!
                    </p>
                </motion.header>
                
                <div className="w-full max-w-7xl flex flex-col lg:flex-row items-start justify-center gap-8 lg:gap-16">
                    <main className="flex-grow w-full">
                        <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200 space-y-6">
                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-4 text-center">
                                Foglalj időpontot egy ingyenes konzultációra!
                            </h2>
                            <div className="w-full flex justify-center">
                                <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" target="_blank" rel="noopener noreferrer">
                                  <button
                                      className={`
                                          inline-flex items-center justify-center gap-2
                                          ${ACCENT_COLOR_RED.bg} ${ACCENT_COLOR_RED.textOnAccent}
                                          font-bold py-8 px-10 sm:py-6 sm:px-10 lg:py-8 lg:px-12 rounded-xl text-2xl sm:text-xl lg:text-3xl
                                          shadow-lg ${ACCENT_COLOR_RED.shadow} ${ACCENT_COLOR_RED.hoverShadow}
                                          transition-all duration-300 ease-in-out
                                          focus:outline-none focus:ring-4 ${ACCENT_COLOR_RED.ring} focus:ring-offset-2 focus:ring-offset-slate-50
                                          cta-button
                                      `}
                                  >
                                      <span className="hidden sm:inline">Foglalj egy ingyenes konzultációt!</span>
                                      <span className="sm:hidden text-center leading-tight text-2xl">Ingyenes<br/>Konzultáció</span>
                                  </button>
                                </Link>
                            </div>
                            <div className="relative w-full h-[600px] mt-8">
                                <iframe 
                                    src="https://app.minup.io/embed/munkavedelmiszaki/service/46358?canStartPayment=true" 
                                    className="absolute top-0 left-0 w-full h-full" 
                                    frameBorder="0"
                                ></iframe>
                            </div>
                            <script 
                                type="text/javascript" 
                                dangerouslySetInnerHTML={{
                                    __html: `
                                        window.addEventListener("message", (event) => {
                                            if (event.origin !== "https://app.minup.io") return;
                                            const data = event.data;
                                            if (data.type === "redirect_to_payment") {
                                                window.location.href = data.url;
                                            }
                                        });
                                    `,
                                }}
                            />
                        </motion.div>
                        
                        <div className="flex flex-col sm:flex-row gap-6 mt-8 w-full">
                            <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200 flex-grow">
                                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><ClockIcon className="w-7 h-7 mr-3 text-cyan-500" />Telefonos elérhetőség</h3>
                                <ul className="space-y-2 text-slate-600 text-sm">
                                    <li className="flex justify-between items-center p-2 rounded-md bg-slate-50">
                                        <span>Hétköznap</span>
                                        <span className="font-semibold">08:00 - 20:00</span>
                                    </li>
                                    <li className="flex justify-between items-center p-2 rounded-md bg-slate-50">
                                        <span>Hétvégén</span>
                                        <span className="font-semibold">10:00 - 18:00</span>
                                    </li>
                                </ul>
                            </motion.div>
                            
                            <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200 flex-grow">
                                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><BuildingOfficeIcon className="w-7 h-7 mr-3 text-cyan-500" />Cégadatok</h3>
                                <ul className="space-y-4">
                                    <li>
                                        <div className="flex items-center gap-4 group">
                                            <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-cyan-100 transition-colors"><PhoneIcon className="w-6 h-6 text-slate-500 group-hover:text-cyan-600 transition-colors" /></div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">Telefonszám</p>
                                                <p className="text-slate-600 text-sm group-hover:text-cyan-600 transition-colors">+36/302722571</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center gap-4 group">
                                            <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-cyan-100 transition-colors"><EnvelopeIcon className="w-6 h-6 text-slate-500 group-hover:text-cyan-600 transition-colors" /></div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">E-mail cím</p>
                                                <p className="text-slate-600 text-sm group-hover:text-cyan-600 transition-colors">iroda@tuz-munkavedelmiszaki.hu</p>
                                            </div>
                                        </div>
                                    </li>
                                    <li>
                                        <div className="flex items-center gap-4">
                                            <div className="p-3 bg-slate-100 rounded-lg"><BuildingOfficeIcon className="w-6 h-6 text-slate-500" /></div>
                                            <div>
                                                <p className="font-bold text-slate-800 text-sm">Cégnév</p>
                                                <p className="text-slate-600 text-sm">Trident Shield Group Kft.</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </motion.div>
                        </div>
                    </main>
                </div>
            </motion.div>
        </div>
    );
};

export default Kapcsolat;