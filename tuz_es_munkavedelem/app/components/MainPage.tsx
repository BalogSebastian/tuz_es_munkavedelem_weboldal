'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  CalendarDaysIcon,
  XMarkIcon,
  CheckCircleIcon,
  PhoneIcon,
  EnvelopeIcon,
  UserIcon,
  FireIcon
} from '@heroicons/react/24/outline';
import {
    FireIcon as FireIconSolid,
    CalendarDaysIcon as CalendarDaysIconSolid,
    SparklesIcon, // Hozzáadva
} from '@heroicons/react/24/solid';
import { FaHelmetSafety } from 'react-icons/fa6';
import { IoArrowUndoSharp, IoArrowRedo, IoArrowRedoSharp } from 'react-icons/io5';
import { HiDocument } from 'react-icons/hi';
import Link from 'next/link';

// --- STÍLUS KONSTANSOK ---
const accentColor = {
  base: '#03BABE', bg: 'bg-[#03BABE]', text: 'text-[#03BABE]', hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500', shadow: 'shadow-cyan-500/40',
};

const RED_ACCENT_COLOR = {
    baseHex: '#DC2626', bg: 'bg-red-600', hoverBg: 'hover:bg-red-700', ring: 'focus-visible:ring-red-500', textOnAccent: 'text-white', shadow: 'shadow-red-500/40', hoverShadow: 'hover:shadow-red-400/60',
};

const ANIMATION_VARIANTS = {
    item: { hidden: { opacity: 0, y: 25, filter: 'blur(10px)' }, visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { type: 'spring', stiffness: 100, damping: 20 }, }, },
};

const introSectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const introItemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const iconCardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.3 } },
};


// --- ServicesModal TELJES KÓDJA ---
const ServicesModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
    const servicesList = [
        { id: 'tuzvedelem', text: 'Tűzvédelem' },
        { id: 'munkavedelem', text: 'Munkavédelem' },
        { id: 'haccp', text: 'HACCP' },
        { id: 'erintesvedelem', text: 'Érintésvédelem (VBF)' },
        { id: 'oktatas', text: 'Oktatás' },
    ];
    const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleCheckboxChange = (serviceId: string) => {
        setSelectedServices(prev => prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await fetch('/api/save-consultation', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, services: selectedServices.map(id => servicesList.find(s => s.id === id)?.text) }),
            });
            setIsSubmitted(true);
            setTimeout(() => {
                onClose();
                setIsSubmitted(false);
                setFormData({ name: '', email: '', phone: '' });
                setSelectedServices([]);
            }, 3000);
        } catch (error) {
            console.error('Submission error:', error);
            alert('Hiba történt a kérés elküldésekor. Kérjük, próbálja újra.');
        } finally {
            setIsLoading(false);
        }
    };

    const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    const modalVariants = { hidden: { opacity: 0, y: 50, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25, delay: 0.1 } }, exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } } };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div className="fixed inset-0 flex items-center justify-center p-3 sm:p-4 z-50 modal-grid-bg" variants={backdropVariants} initial="hidden" animate="visible" exit="hidden" onClick={onClose}>
                    <motion.div className="bg-white rounded-xl sm:rounded-2xl shadow-2xl w-full max-w-sm sm:max-w-2xl mx-auto p-4 sm:p-8 relative max-h-[90vh] overflow-y-auto" variants={modalVariants} exit="exit" onClick={(e) => e.stopPropagation()}>
                        <button onClick={onClose} className="absolute top-3 sm:top-4 right-3 sm:right-4 text-gray-400 hover:text-gray-600 transition-colors"><XMarkIcon className="w-6 h-6 sm:w-8 sm:h-8" /></button>
                        {!isSubmitted ? (
                            <form onSubmit={handleSubmit}>
                                <h2 className={`text-xl sm:text-3xl font-black text-center mb-4 sm:mb-6`}>Miben <span className={accentColor.text}>Segíthetünk</span>?</h2>
                                <p className="text-center text-slate-600 text-sm sm:text-base mb-6 sm:mb-8 max-w-lg mx-auto px-2">Az alábbi szolgáltatásokkal állunk rendelkezésére. Kérjük, válassza ki az Önt érdeklő területeket és adja meg elérhetőségeit.</p>
                                <div className="space-y-3 sm:space-y-4 mb-4 sm:mb-6">
                                    <div className="relative group"><div className={`absolute inset-y-0 left-0 pl-3 sm:pl-3.5 flex items-center pointer-events-none`}><UserIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-cyan-500" /></div><input type="text" name="name" value={formData.name} onChange={handleFormChange} className="block w-full text-gray-500 pl-9 sm:pl-10 text-black pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base" placeholder="Teljes Név*" required /></div>
                                    <div className="relative group"><div className={`absolute inset-y-0 left-0 pl-3 sm:pl-3.5 flex items-center pointer-events-none`}><EnvelopeIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-cyan-500" /></div><input type="email" name="email" value={formData.email} onChange={handleFormChange} className="block w-full text-gray-500 pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base" placeholder="Email cím*" required /></div>
                                    <div className="relative group"><div className={`absolute inset-y-0 left-0 pl-3 sm:pl-3.5 flex items-center pointer-events-none`}><PhoneIcon className="h-4 w-4 sm:h-5 sm:w-5 text-gray-400 group-focus-within:text-cyan-500" /></div><input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} className="block w-full text-gray-500 pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500 text-sm sm:text-base" placeholder="Telefonszám" /></div>
                                </div>
                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 sm:gap-x-8 gap-y-3 sm:gap-y-4 mb-6 sm:mb-10">
                                    {servicesList.map((service, index) => (
                                        <motion.li key={service.id} className="flex items-start gap-2 sm:gap-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 + index * 0.05 } }}>
                                            <input type="checkbox" id={`service-${service.id}`} checked={selectedServices.includes(service.id)} onChange={() => handleCheckboxChange(service.id)} className={`form-checkbox h-5 w-5 sm:h-6 sm:w-6 rounded border-gray-300 text-cyan-500 shadow-sm focus:ring-cyan-500 cursor-pointer flex-shrink-0 mt-0.5`} />
                                            <label htmlFor={`service-${service.id}`} className="text-slate-700 cursor-pointer flex-1 text-sm sm:text-base leading-tight">{service.text}</label>
                                        </motion.li>
                                    ))}
                                </ul>
                                <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}>
                                    <button
                                        type="submit"
                                        disabled={isLoading}
                                        className={`inline-flex items-center justify-center gap-2 sm:gap-3 w-full sm:w-auto ${RED_ACCENT_COLOR.bg} ${RED_ACCENT_COLOR.textOnAccent} font-bold py-3 px-6 sm:px-8 rounded-xl text-base sm:text-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 ${RED_ACCENT_COLOR.ring} focus:ring-offset-2 disabled:bg-red-400 cta-button`}
                                    >
                                        <CalendarDaysIconSolid className="w-5 h-5 sm:w-6 sm:h-6 flex-shrink-0" />
                                        <span>{isLoading ? 'Küldés...' : 'Időpontfoglalás'}</span>
                                    </button>
                                </motion.div>
                            </form>
                        ) : (
                             <motion.div className="text-center py-4 sm:py-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><CheckCircleIcon className={`w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-3 sm:mb-4 ${accentColor.text}`} /><h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">Köszönjük a kérését!</h3><p className="text-slate-600 text-sm sm:text-base px-4">Hamarosan felvesszük Önnel a kapcsolatot a megadott elérhetőségeken.</p></motion.div>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// --- FŐ KOMPONENS ---
const MainPage: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const introSectionRef = useRef<HTMLElement>(null);

    return (
        <>
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
              .gradient-text { background: linear-gradient(to right, #06b6d4, #2dd4bf); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-fill-color: transparent; }
              .modal-grid-bg { background-color: #1a202c; background-image: linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px); background-size: 4rem 4rem; }
              .cta-button {
                transition: all 0.3s ease-in-out;
                box-shadow: 0 0 20px ${RED_ACCENT_COLOR.baseHex}40;
              }
              
              /* Desktop és tablet hover effektek */
              @media (min-width: 768px) {
                .cta-button:hover {
                    transform: scale(1.02);
                    box-shadow: 0 0 20px ${RED_ACCENT_COLOR.baseHex}60, 0 0 30px ${RED_ACCENT_COLOR.baseHex}40;
                }
                .cta-button:active {
                    transform: scale(0.98);
                }
              }
              
              /* Mobilon egyszerűbb animációk */
              @media (max-width: 767px) {
                .cta-button:active {
                    transform: scale(0.95);
                }
                .mobile-hide-arrows {
                    display: none !important;
                }
                /* Kártyák hover effekt mobilon egyszerűbb */
                .service-card:hover {
                    transform: translateY(-2px) scale(1.01) !important;
                }
              }
            `}</style>

            <div style={{ backgroundColor: '#ffffff', backgroundImage: `linear-gradient(rgba(3, 186, 190, 0.15) 1px, transparent 1px), linear-gradient(to right, rgba(3, 186, 190, 0.15) 1px, transparent 1px)`, backgroundSize: '4rem 4rem' }} className="font-['Poppins',_sans-serif] min-h-screen relative">
                {/* Nyilak elrejtése mobilon */}
                <div className="absolute top-0 left-0 w-full h-[100px] pointer-events-none z-10">
                    <div className="mobile-hide-arrows absolute w-20 sm:w-36 h-20 sm:h-36 text-cyan-500" style={{ top: '10px', left: '10%', transform: 'translateY(-50%) rotate(205deg)' }}>
                        <IoArrowUndoSharp className="w-full h-full" />
                    </div>
                </div>
                
                <div className="mobile-hide-arrows absolute w-20 sm:w-36 h-20 sm:h-36 text-cyan-500 pointer-events-none z-20" style={{ top: '85%', right: '10%', transform: 'translateY(-50%) rotate(150deg)' }}>
                    <IoArrowRedoSharp className="w-full h-full" />
                </div>

                <motion.section ref={introSectionRef} id="bemutatkozas" className="py-16 sm:py-24 lg:py-32 px-3 sm:px-4 sm:px-6 lg:px-8" variants={introSectionVariants} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }}>
                    <div className="max-w-6xl mx-auto flex flex-col items-center">
                        <motion.h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-normal leading-tight mb-8 sm:mb-12 text-center px-2" variants={introItemVariants}>
                            Ezt a három alapvető dolgot ismerned kell ahhoz, <span className='text-cyan-400'>hogy biztonságban tudd a vállalkozásodat!</span>
                        </motion.h2>
                        <motion.p variants={introItemVariants} className="text-center text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mb-12 sm:mb-16 leading-relaxed px-4">
                            Fontos tudni, hogy minden vállalkozásra más-más előírás vonatkozik, ezért nem egyszerű ezeknek megfelelni. Segítünk abban, hogy neked mire is kell figyelmet fordítani.
                        </motion.p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10 lg:gap-16 w-full">
                            <motion.div variants={introItemVariants} whileHover={{ y: -8, scale: 1.03 }} className="service-card relative bg-white/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200/80 transition-all duration-300 hover:shadow-2xl">
                                <motion.div className="absolute w-16 h-16 sm:w-24 sm:h-24 -top-6 sm:-top-9 -right-6 sm:-right-9" animate={{ y: [-4, 4, -4], rotate: [-3, 3, -3], }} transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}>
                                    <FireIconSolid className="w-full h-full text-red-500 drop-shadow-lg" />
                                </motion.div>
                                <motion.div variants={iconCardVariants} className="flex items-center gap-3 sm:gap-5 mb-4 sm:mb-5">
                                    <div className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br from-red-400 to-red-600`}>
                                        <FireIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Tűzvédelem</h3>
                                </motion.div>
                                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                                    Többről van szó mint a tűzoltó készülék meglétéről. A Tűzvédelem egy proaktív stratégia, ami a probléma megelőzésére, és gyors reagálására szolgál. <strong>Fontos:</strong> Kötelező, ha rendelkezel bármilyen telephellyel!
                                </p>
                            </motion.div>
                            <motion.div variants={introItemVariants} whileHover={{ y: -8, scale: 1.03 }} className="service-card relative bg-white/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200/80 transition-all duration-300 hover:shadow-2xl">
                                <motion.div className="absolute w-16 h-16 sm:w-24 sm:h-24 -top-6 sm:-top-9 -right-6 sm:-right-9" animate={{ y: [-4, 4, -4], rotate: [-3, 3, -3], }} transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}>
                                    <FaHelmetSafety className="w-full h-full text-yellow-500 drop-shadow-lg" />
                                </motion.div>
                                <motion.div variants={iconCardVariants} className="flex items-center gap-3 sm:gap-5 mb-4 sm:mb-5">
                                    <div className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500`}>
                                        <FaHelmetSafety className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800">Munkavédelem</h3>
                                </motion.div>
                                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                                    Munkaadóként felelősséggel tartozol a kollégák iránt, és ezt a hatóságok is így gondolják.<br /><span className="font-bold">Fontos:</span> A "legveszélytelenebb" munkahelyeken is elvárják az alapvető munkavédelmi előírások betartását, hiszen az emberi élet érték.
                                </p>
                            </motion.div>
                            <motion.div variants={introItemVariants} whileHover={{ y: -8, scale: 1.03 }} className="service-card relative bg-white/50 backdrop-blur-sm p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200/80 transition-all duration-300 hover:shadow-2xl md:col-span-2 lg:col-span-1">
                                <motion.div className="absolute w-16 h-16 sm:w-24 sm:h-24 -top-6 sm:-top-9 -right-6 sm:-right-9" animate={{ y: [-4, 4, -4], rotate: [-3, 3, -3], }} transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}>
                                    <HiDocument className="w-full h-full text-blue-500 drop-shadow-lg" />
                                </motion.div>
                                <motion.div variants={iconCardVariants} className="flex items-center gap-3 sm:gap-5 mb-4 sm:mb-5">
                                    <div className={`p-3 sm:p-4 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500`}>
                                        <HiDocument className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                                    </div>
                                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800">HACCP</h3>
                                </motion.div>
                                <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                                    A HACCP az élelmiszer biztonság alapköve. Minden esetben ki kell dolgozni ha valaki élelmiszerrel foglalkozik, és természetesen e-szerint kell eljárni a későbbiekben. <strong>Fontos:</strong> nem üzemelhetsz HACCP rendszer nélkül, különben bármikor bezárathatják az egységedet!
                                </p>
                            </motion.div>
                        </div>
                        <motion.div className="text-center mt-12 sm:mt-16 p-4 sm:p-8 w-full max-w-lg" variants={introItemVariants}>
                            <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" target="_blank" rel="noopener noreferrer">
                                <button
                                    className={`
                                        inline-flex items-center justify-center gap-2 sm:gap-3 w-full
                                        ${RED_ACCENT_COLOR.bg} ${RED_ACCENT_COLOR.textOnAccent}
                                        font-bold py-4 px-6 sm:py-8 sm:px-12 rounded-xl text-lg sm:text-3xl
                                        shadow-lg ${RED_ACCENT_COLOR.shadow} ${RED_ACCENT_COLOR.hoverShadow}
                                        transition-all duration-300 ease-in-out
                                        focus:outline-none focus:ring-4 ${RED_ACCENT_COLOR.ring} focus:ring-offset-2 focus:ring-offset-slate-50
                                        cta-button
                                    `}
                                >
                                    <span className="text-center leading-tight">Foglalj egy ingyenes konzultációt!</span>
                                </button>
                            </Link>
                        </motion.div>
                    </div>
                </motion.section>
            </div>
            <ServicesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default MainPage;