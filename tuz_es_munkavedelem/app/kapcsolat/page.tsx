'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
        <div className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif]">
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
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative flex flex-col items-center justify-center"
                variants={pageVariants}
                initial="initial"
                animate="in"
            >
                <motion.header variants={itemVariants} className="text-center max-w-4xl mx-auto mb-20">
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4">
                        Lépj velünk <span className={accentColor.text}>kapcsolatba!</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-snug max-w-2xl mx-auto">
                        Kérdésed van, vagy csak szeretnél konzultálni? Keress minket bátran!
                    </p>
                </motion.header>
                <div className="flex flex-col lg:flex-row items-center justify-center gap-16 w-full max-w-7xl">
                    <main className="flex-grow">
                        <motion.div variants={itemVariants}>
                            <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-200 space-y-6 flex flex-col items-center justify-center min-h-[600px]">
                                <h2 className="text-3xl font-bold text-slate-800 mb-4">Foglalj időpontot egy ingyenes konzultációra!</h2>
                                <iframe 
                                    src="https://app.minup.io/embed/munkavedelmiszaki/service/46358?canStartPayment=true" 
                                    style={{ width: '750px', height: '590px' }} 
                                    frameBorder="0"
                                ></iframe>
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
                            </div>
                        </motion.div>
                        <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-200 mt-8">
                            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><ClockIcon className="w-7 h-7 mr-3 text-cyan-500" />Telefonos elérhetőség</h3>
                            <ul className="space-y-2 text-slate-600">
                                <li className="flex justify-between items-center p-2 rounded-md">
                                    <span>Hétköznap</span>
                                    <span>08:00 - 20:00</span>
                                </li>
                                <li className="flex justify-between items-center p-2 rounded-md">
                                    <span>Hétvégén</span>
                                    <span>10:00 - 18:00</span>
                                </li>
                            </ul>
                        </motion.div>
                        <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-200 space-y-4 mt-8">
                            <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><BuildingOfficeIcon className="w-7 h-7 mr-3 text-cyan-500" />Cégadatok</h3>
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-cyan-100 transition-colors"><PhoneIcon className="w-6 h-6 text-slate-500 group-hover:text-cyan-600 transition-colors" /></div>
                                <div>
                                    <p className="font-bold text-slate-800">Telefonszám</p>
                                    <p className="text-slate-600 group-hover:text-cyan-600 transition-colors">+36/302722571</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 group">
                                <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-cyan-100 transition-colors"><EnvelopeIcon className="w-6 h-6 text-slate-500 group-hover:text-cyan-600 transition-colors" /></div>
                                <div>
                                    <p className="font-bold text-slate-800">E-mail cím</p>
                                    <p className="text-slate-600 group-hover:text-cyan-600 transition-colors">iroda@tuz-munkavedelmiszaki.hu</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-slate-100 rounded-lg"><BuildingOfficeIcon className="w-6 h-6 text-slate-500" /></div>
                                <div>
                                    <p className="font-bold text-slate-800">Cégnév</p>
                                    <p className="text-slate-600 text-sm">Trident Shield Group Kft.</p>
                                </div>
                            </div>
                        </motion.div>
                    </main>
                </div>
            </motion.div>
        </div>
    );
};

export default Kapcsolat;