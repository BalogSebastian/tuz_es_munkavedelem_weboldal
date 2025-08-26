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
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch('/api/save-contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Hiba történt az üzenet mentésekor.');
            }
            
            setIsSubmitted(true);
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({ name: '', email: '', phone: '', message: '' });
            }, 5000);

        } catch (err: any) {
            console.error('API Error:', err);
            setError(err.message || 'Ismeretlen hiba történt.');
        } finally {
            setIsLoading(false);
        }
    };

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
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative"
                variants={pageVariants}
                initial="initial"
                animate="in"
            >
                <motion.header variants={itemVariants} className="text-center max-w-4xl mx-auto mb-20">
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4">
                        Lépj velünk <span className={accentColor.text}>kapcsolatba!</span>
                    </h1>
                    <p className="text-xl text-slate-600 leading-snug max-w-2xl mx-auto">
                        Kérdésed van, vagy csak szeretnél konzultálni? Keress minket bátran, segítünk mindenben!
                    </p>
                </motion.header>
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
                    <main className="lg:col-span-3">
                        <motion.div variants={itemVariants}>
                            <AnimatePresence mode="wait">
                                {isSubmitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-200 h-full flex flex-col justify-center items-center text-center min-h-[600px]"
                                    >
                                        <CheckCircleIcon className="w-20 h-20 text-green-500 mb-4" />
                                        <h3 className="text-3xl font-bold text-slate-800">Üzenet elküldve!</h3>
                                        <p className="text-slate-600 text-lg mt-2">Köszönjük a megkeresésed! Hamarosan felvesszük veled a kapcsolatot.</p>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        onSubmit={handleSubmit}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-200 space-y-6"
                                    >
                                        <h2 className="text-3xl font-bold text-slate-800 mb-4">Írj üzenetet, ha kérdésed van!</h2>
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">Neved</label>
                                            <input type="text" name="name" id="name" required onChange={handleFormChange} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all text-slate-800" />
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1">E-mail címed</label>
                                            <input type="email" name="email" id="email" required onChange={handleFormChange} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all text-slate-800" />
                                        </div>
                                        <div>
                                            <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-1">Telefonszám (opcionális)</label>
                                            <input type="tel" name="phone" id="phone" onChange={handleFormChange} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all text-slate-800" />
                                        </div>
                                        <div>
                                            <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-1">Üzenet</label>
                                            <textarea name="message" id="message" rows={4} required onChange={handleFormChange} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all text-slate-800"></textarea>
                                        </div>
                                        {error && (
                                            <motion.p 
                                                className="text-red-500 text-sm text-center"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >{error}</motion.p>
                                        )}
                                        <motion.button
                                            type="submit"
                                            disabled={isLoading}
                                            className={`w-full font-bold py-4 px-8 rounded-xl text-lg text-white bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo} shadow-lg shadow-cyan-500/30 disabled:opacity-50 disabled:cursor-not-allowed`}
                                            whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 30px -10px rgba(3, 186, 190, 0.5)' }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            <PaperAirplaneIcon className="w-6 h-6 inline-block mr-2" />
                                            {isLoading ? 'Küldés...' : 'Üzenet küldése'}
                                        </motion.button>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </main>
                    <aside className="lg:col-span-2 space-y-8">
                        <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-200">
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
                        <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-200 space-y-4">
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
                    </aside>
                </div>
                <motion.footer variants={itemVariants} className="max-w-4xl mx-auto mt-24 text-center border-t border-slate-200 pt-16">
                    <h3 className="text-3xl font-bold text-slate-800 mb-4">Készen állsz a biztonságosabb működésre?</h3>
                    <p className="text-slate-600 text-lg mb-8">Az első lépés egy ingyenes konzultáció. Keress minket még ma!</p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link href="/">
                            <motion.div
                                className="w-full sm:w-auto text-center font-semibold py-3 px-8 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ArrowLeftIcon className="w-5 h-5 inline-block mr-2" />
                                Vissza a főoldalra
                            </motion.div>
                        </Link>
                        <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358">
                            <motion.div
                                className={`w-full sm:w-auto text-center font-bold py-3 px-8 rounded-xl bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo} text-white shadow-lg shadow-cyan-500/30 cursor-pointer`}
                                whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 30px -10px rgba(3, 186, 190, 0.5)' }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <SparklesIcon className="w-5 h-5 inline-block mr-2" />
                                Konzultációt kérek
                            </motion.div>
                        </Link>
                    </div>
                </motion.footer>
            </motion.div>
        </div>
    );
};

export default Kapcsolat;