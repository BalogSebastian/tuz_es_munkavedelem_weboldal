// components/QuoteRequestModal.tsx
'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    XMarkIcon, 
    ArrowRightIcon, 
    PaperAirplaneIcon, 
    CheckCircleIcon,
    ChevronLeftIcon
} from '@heroicons/react/24/solid';

// --- SZÍNSÉMA (az oldal stílusához igazodva) ---
const accentColor = {
  bg: 'bg-[#03BABE]',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  text: 'text-[#03BABE]',
};

// --- SZOLGÁLTATÁSOK LISTÁJA ---
const servicesList = [
    { type: 'Teljeskörű', name: 'Teljes Munkavédelmi Szolgáltatás' },
    { type: 'Teljeskörű', name: 'Teljes Tűzvédelmi Szolgáltatás' },
    { type: 'Teljeskörű', name: 'Teljes HACCP rendszer szolgáltatás' },
    { type: 'Teljeskörű', name: 'Teljes Tűz- Munkavédelmi és HACCP szolgáltatás' },
    { type: 'Részfeladat', name: 'Munkahelyi kockázatértékelés' },
    { type: 'Részfeladat', name: 'Kémia kockázatértékelés' },
    { type: 'Részfeladat', name: 'Biológiai kockázatértékelés' },
    { type: 'Részfeladat', name: 'Egyéni védőeszköz juttatási rend kialakítása' },
    { type: 'Részfeladat', name: 'Munkavédelmi oktatás' },
    { type: 'Részfeladat', name: 'Munkaköri orvosi vizsgálatok rendje kialakítása' },
    { type: 'Részfeladat', name: 'Tűzvédelmi Oktatás' },
    { type: 'Részfeladat', name: 'Tűzvédelmi szabályzat' },
    { type: 'Részfeladat', name: 'Tűzriadó terv' },
    { type: 'Részfeladat', name: 'Menekülési tervrajz' },
    { type: 'Részfeladat', name: 'Kiürítés számítás' },
    { type: 'Részfeladat', name: 'HACCP' },
    { type: 'Részfeladat', name: 'HACCP oktatás' },
    { type: 'Részfeladat', name: 'Emelőgép felülvizsgálat' },
    { type: 'Részfeladat', name: 'Gépek üzembe helyezése' },
    { type: 'Részfeladat', name: 'Környezetvédelem' },
    { type: 'Részfeladat', name: 'Villamos biztonsági Felülvizsgálat' },
    { type: 'Részfeladat', name: 'Baleset kivizsgálása' },
    { type: 'Részfeladat', name: 'Oktatási tematika és tananyag készítés' },
];

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { y: "100vh", opacity: 0, scale: 0.8 },
  visible: { y: 0, opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 100, damping: 20 } },
  exit: { y: "100vh", opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
};

const stepVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? '100%' : '-100%', opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 200, damping: 25 } },
    exit: (direction: number) => ({ x: direction < 0 ? '100%' : '-100%', opacity: 0, transition: { duration: 0.2 } }),
};

export const QuoteRequestModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
    const [step, setStep] = useState(1);
    const [direction, setDirection] = useState(1);
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const [formData, setFormData] = useState({
        name: '', email: '', phone: '',
        employeeCount: '', activity: '', premiseCount: '',
        premiseSize: '', premiseLocation: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleNextStep = () => {
        if (selectedServices.length === 0) {
            setError('Kérjük, válasszon legalább egy szolgáltatást!');
            setTimeout(() => setError(''), 3000);
            return;
        }
        setDirection(1);
        setStep(2);
        setError('');
    };

    const handlePrevStep = () => {
        setDirection(-1);
        setStep(1);
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleCheckboxChange = (serviceName: string) => {
        setSelectedServices(prev =>
            prev.includes(serviceName)
                ? prev.filter(s => s !== serviceName)
                : [...prev, serviceName]
        );
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        const payload = { ...formData, services: selectedServices };
        
        try {
            const response = await fetch('/api/save-offer-request', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            if (!response.ok) {
                throw new Error('Hiba a küldés során. Próbálja újra!');
            }
            
            setIsSubmitted(true);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleClose = () => {
        // Reset state after exit animation
        setTimeout(() => {
            setStep(1);
            setSelectedServices([]);
            setFormData({ name: '', email: '', phone: '', employeeCount: '', activity: '', premiseCount: '', premiseSize: '', premiseLocation: '' });
            setIsSubmitted(false);
            setIsLoading(false);
            setError('');
        }, 300);
        onClose();
    };


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 font-['Poppins',_sans-serif]"
                    variants={backdropVariants} initial="hidden" animate="visible" exit="hidden"
                    onClick={handleClose}
                >
                    <motion.div
                        className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl h-[90vh] flex flex-col relative overflow-hidden"
                        variants={modalVariants}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button onClick={handleClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition z-20"><XMarkIcon className="w-8 h-8" /></button>
                        
                        <AnimatePresence initial={false} custom={direction}>
                            {isSubmitted ? (
                                <motion.div key="success" className="flex flex-col items-center justify-center text-center h-full p-8" initial={{ opacity: 0, scale: 0.8}} animate={{ opacity: 1, scale: 1}} transition={{duration: 0.5, ease: 'easeOut'}}>
                                    <CheckCircleIcon className={`w-24 h-24 ${accentColor.text} mb-6`} />
                                    <h2 className="text-3xl font-bold text-slate-800 mb-3">Sikeres ajánlatkérés!</h2>
                                    <p className="text-slate-600 max-w-md">Köszönjük! Hamarosan felvesszük Önnel a kapcsolatot a megadott elérhetőségeken a személyre szabott ajánlattal.</p>
                                </motion.div>
                            ) : (
                                <motion.div key={step} custom={direction} variants={stepVariants} initial="enter" animate="center" exit="exit" className="absolute w-full h-full flex flex-col">
                                    {step === 1 && (
                                        <div className="flex-grow overflow-y-auto p-8 sm:p-12">
                                            <h2 className={`text-3xl font-black text-center mb-10`}>Mire szeretnél <span className={accentColor.text}>ajánlatot</span> kapni?</h2>
                                            {/* Teljeskörű szolgáltatások */}
                                            <div className="mb-8">
                                                <h3 className="font-bold text-lg text-slate-700 mb-4 border-b pb-2">Teljeskörű szolgáltatások</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                                    {servicesList.filter(s => s.type === 'Teljeskörű').map(service => (
                                                        <label key={service.name} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-slate-50 transition">
                                                            <input type="checkbox" checked={selectedServices.includes(service.name)} onChange={() => handleCheckboxChange(service.name)} className={`h-5 w-5 rounded border-gray-300 ${accentColor.ring} ${accentColor.text}`} />
                                                            <span className="text-slate-700">{service.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            {/* Részfeladatok */}
                                            <div>
                                                <h3 className="font-bold text-lg text-slate-700 mb-4 border-b pb-2">Részfeladatok</h3>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                                                    {servicesList.filter(s => s.type === 'Részfeladat').map(service => (
                                                         <label key={service.name} className="flex items-center space-x-3 cursor-pointer p-3 rounded-lg hover:bg-slate-50 transition">
                                                            <input type="checkbox" checked={selectedServices.includes(service.name)} onChange={() => handleCheckboxChange(service.name)} className={`h-5 w-5 rounded border-gray-300 ${accentColor.ring} ${accentColor.text}`} />
                                                            <span className="text-slate-700">{service.name}</span>
                                                        </label>
                                                    ))}
                                                </div>
                                            </div>
                                            {error && <p className="text-red-500 text-center mt-6 font-semibold">{error}</p>}
                                            <div className="text-center mt-10">
                                                <button onClick={handleNextStep} className={`inline-flex items-center gap-2 ${accentColor.bg} ${accentColor.hoverBg} text-white font-bold py-3 px-8 rounded-lg text-lg transition shadow-lg`}>
                                                    Tovább az adatokhoz <ArrowRightIcon className="w-5 h-5"/>
                                                </button>
                                            </div>
                                        </div>
                                    )}

                                    {step === 2 && (
                                        <form onSubmit={handleSubmit} className="flex-grow overflow-y-auto p-8 sm:p-12">
                                            <h2 className={`text-3xl font-black text-center mb-8`}>Szinte <span className={accentColor.text}>készen</span> vagyunk!</h2>
                                            <p className="text-center text-slate-500 mb-8 -mt-4 max-w-2xl mx-auto">Kérjük, adja meg a következő adatokat a pontos árajánlat elkészítéséhez.</p>
                                            
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
                                                {/* Technikai adatok */}
                                                <input type="text" name="employeeCount" placeholder="Alkalmazottak száma" value={formData.employeeCount} onChange={handleFormChange} className="p-3 border rounded-lg focus:ring-2 focus:outline-none" />
                                                <input type="text" name="activity" placeholder="Tevékenység" value={formData.activity} onChange={handleFormChange} className="p-3 border rounded-lg focus:ring-2 focus:outline-none" />
                                                <input type="text" name="premiseCount" placeholder="Telephely(ek) száma" value={formData.premiseCount} onChange={handleFormChange} className="p-3 border rounded-lg focus:ring-2 focus:outline-none" />
                                                <input type="text" name="premiseSize" placeholder="Telephely(ek) mérete (pl. 150m²)" value={formData.premiseSize} onChange={handleFormChange} className="p-3 border rounded-lg focus:ring-2 focus:outline-none" />
                                                <textarea name="premiseLocation" placeholder="Telephely(ek) lokációja (város, cím)" value={formData.premiseLocation} onChange={handleFormChange} className="p-3 border rounded-lg md:col-span-2 focus:ring-2 focus:outline-none" rows={2}></textarea>
                                                
                                                {/* Elérhetőségek */}
                                                <div className="md:col-span-2 border-t my-4"></div>
                                                <input type="text" name="name" placeholder="Név*" value={formData.name} onChange={handleFormChange} required className="p-3 border rounded-lg focus:ring-2 focus:outline-none" />
                                                <input type="email" name="email" placeholder="Email cím*" value={formData.email} onChange={handleFormChange} required className="p-3 border rounded-lg focus:ring-2 focus:outline-none" />
                                                <input type="tel" name="phone" placeholder="Telefonszám" value={formData.phone} onChange={handleFormChange} className="p-3 border rounded-lg focus:ring-2 focus:outline-none" />
                                            </div>
                                            
                                            {error && <p className="text-red-500 text-center mt-6 font-semibold">{error}</p>}

                                            <div className="flex items-center justify-center gap-4 mt-10">
                                                <button type="button" onClick={handlePrevStep} className="inline-flex items-center gap-2 bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-6 rounded-lg text-lg transition">
                                                    <ChevronLeftIcon className="w-5 h-5"/> Vissza
                                                </button>
                                                <button type="submit" disabled={isLoading} className={`inline-flex items-center gap-2 ${accentColor.bg} ${accentColor.hoverBg} text-white font-bold py-3 px-8 rounded-lg text-lg transition shadow-lg disabled:bg-cyan-300`}>
                                                    {isLoading ? 'Küldés...' : 'Ajánlatkérés elküldése'} <PaperAirplaneIcon className="w-5 h-5"/>
                                                </button>
                                            </div>
                                        </form>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};