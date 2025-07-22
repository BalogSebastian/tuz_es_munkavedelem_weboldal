// components/sections/Kapcsolat.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeftIcon, 
    PhoneIcon,
    EnvelopeIcon,
    MapPinIcon,
    ClockIcon,
    PaperAirplaneIcon,
    CheckCircleIcon,
    BuildingOfficeIcon,
    CalendarDaysIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

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

const servicesOfInterest = [
    "Tűzvédelem",
    "Munkavédelem",
    "HACCP Rendszer",
    "Kockázatértékelés",
    "Oktatások",
    "Általános Érdeklődés"
];

const businessHours = [
    { day: 'Hétfő', hours: '08:00 - 16:00' },
    { day: 'Kedd', hours: '08:00 - 16:00' },
    { day: 'Szerda', hours: '08:00 - 16:00' },
    { day: 'Csütörtök', hours: '08:00 - 16:00' },
    { day: 'Péntek', hours: '08:00 - 14:00' },
    { day: 'Szombat-Vasárnap', hours: 'Zárva' },
];

const Kapcsolat = () => {
    const [formData, setFormData] = useState({ name: '', email: '', phone: '', service: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const mapRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!mapRef.current) return;
        const rect = mapRef.current.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
    };

    const tiltIntensity = 5;
    const rotateX = useSpring(useTransform(mouseY, [0, 300], [tiltIntensity, -tiltIntensity]), { stiffness: 300, damping: 30 });
    const rotateY = useSpring(useTransform(mouseX, [0, 300], [-tiltIntensity, tiltIntensity]), { stiffness: 300, damping: 30 });

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Form data submitted:", formData);
        setIsSubmitted(true);
    };

    const currentDayIndex = (new Date().getDay() + 6) % 7; // Hétfő = 0, Vasárnap = 6

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
            Lépjünk <span className={accentColor.text}>Kapcsolatba</span>.
          </h1>
          <p className="text-2xl text-slate-600 leading-snug">
            Készen állunk, hogy segítsünk. Válassza az Önnek legkényelmesebb kapcsolatfelvételi módot, és tegye meg az első lépést a biztonságosabb működés felé.
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
                      <h3 className="text-3xl font-bold text-slate-800">Üzenet Elküldve!</h3>
                      <p className="text-slate-600 text-lg mt-2">Köszönjük megkeresését! Hamarosan felvesszük Önnel a kapcsolatot.</p>
                      <button onClick={() => setIsSubmitted(false)} className="mt-6 font-semibold text-cyan-600 hover:underline">Új üzenet írása</button>
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
                      <h2 className="text-3xl font-bold text-slate-800 mb-4">Írjon nekünk üzenetet</h2>
                      <div>
                          <label htmlFor="name" className="block text-sm font-bold text-slate-700 mb-1">Név</label>
                          <input type="text" name="name" id="name" required onChange={handleFormChange} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all" />
                      </div>
                      <div>
                          <label htmlFor="email" className="block text-sm font-bold text-slate-700 mb-1">Email Cím</label>
                          <input type="email" name="email" id="email" required onChange={handleFormChange} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all" />
                      </div>
                      <div>
                          <label htmlFor="phone" className="block text-sm font-bold text-slate-700 mb-1">Telefonszám (Opcionális)</label>
                          <input type="tel" name="phone" id="phone" onChange={handleFormChange} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all" />
                      </div>
                      <div>
                          <label htmlFor="service" className="block text-sm font-bold text-slate-700 mb-1">Milyen szolgáltatás érdekli?</label>
                          <select name="service" id="service" required onChange={handleFormChange} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all bg-white">
                              <option value="" disabled selected>Válasszon...</option>
                              {servicesOfInterest.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                      </div>
                      <div>
                          <label htmlFor="message" className="block text-sm font-bold text-slate-700 mb-1">Üzenet</label>
                          <textarea name="message" id="message" rows={4} required onChange={handleFormChange} className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all"></textarea>
                      </div>
                      <motion.button 
                          type="submit"
                          className={`w-full font-bold py-4 px-8 rounded-xl text-lg text-white bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo} shadow-lg shadow-cyan-500/30`}
                          whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 30px -10px rgba(3, 186, 190, 0.5)' }}
                          whileTap={{ scale: 0.95 }}
                      >
                          <PaperAirplaneIcon className="w-6 h-6 inline-block mr-2" />
                          Üzenet Küldése
                      </motion.button>
                  </motion.form>
              )}
              </AnimatePresence>
            </motion.div>
          </main>

          <aside className="lg:col-span-2 space-y-8">
            <motion.div 
                ref={mapRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={() => { mouseX.set(200); mouseY.set(200); }}
                style={{ perspective: "1500px" }}
                variants={itemVariants}
                className="relative"
            >
                <motion.div
                    style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                    className="bg-slate-200 rounded-2xl h-64 w-full overflow-hidden border border-slate-300"
                >
                    <div className="absolute inset-0 bg-cover bg-center opacity-50" style={{ backgroundImage: "url('https://raw.githubusercontent.com/react-ui-kit/dribbble2react/master/map.png')" }}></div>
                    <a href="https://www.google.com/maps/search/?api=1&query=Debrecen, István út 140" target="_blank" rel="noopener noreferrer" className="absolute inset-0 bg-black/10 hover:bg-black/30 transition-colors flex items-center justify-center">
                        <motion.div 
                            style={{ transform: "translateZ(40px)" }}
                            className="text-center text-white"
                        >
                            <MapPinIcon className="w-12 h-12 mx-auto text-white drop-shadow-lg" />
                            <p className="font-bold mt-2">Térkép Megnyitása</p>
                            <p className="text-sm">4031 Debrecen, István út 140.</p>
                        </motion.div>
                    </a>
                </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-200">
                <h3 className="text-2xl font-bold text-slate-800 mb-4 flex items-center"><ClockIcon className="w-7 h-7 mr-3 text-cyan-500" />Nyitvatartás</h3>
                <ul className="space-y-2">
                    {businessHours.map((item, index) => (
                        <li key={item.day} className={`flex justify-between items-center p-2 rounded-md transition-colors ${index === currentDayIndex ? `${accentColor.bg} text-white font-bold shadow-sm` : 'text-slate-600'}`}>
                            <span>{item.day}</span>
                            <span>{item.hours}</span>
                        </li>
                    ))}
                </ul>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-200 space-y-4">
                <a href="tel:+36209791719" className="flex items-center gap-4 group">
                    <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-cyan-100 transition-colors"><PhoneIcon className="w-6 h-6 text-slate-500 group-hover:text-cyan-600 transition-colors" /></div>
                    <div>
                        <p className="font-bold text-slate-800">Telefonszám</p>
                        <p className="text-slate-600 group-hover:text-cyan-600 transition-colors">+36 20 979 17 19</p>
                    </div>
                </a>
                 <a href="mailto:info@markjani.hu" className="flex items-center gap-4 group">
                    <div className="p-3 bg-slate-100 rounded-lg group-hover:bg-cyan-100 transition-colors"><EnvelopeIcon className="w-6 h-6 text-slate-500 group-hover:text-cyan-600 transition-colors" /></div>
                    <div>
                        <p className="font-bold text-slate-800">Email Cím</p>
                        <p className="text-slate-600 group-hover:text-cyan-600 transition-colors">info@markjani.hu</p>
                    </div>
                </a>
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-100 rounded-lg"><BuildingOfficeIcon className="w-6 h-6 text-slate-500" /></div>
                    <div>
                        <p className="font-bold text-slate-800">Cégadatok</p>
                        <p className="text-slate-600 text-sm">JaniMark Kft. | Adószám: XXXXXXXX-X-XX</p>
                    </div>
                </div>
            </motion.div>
          </aside>
        </div>

        <motion.footer variants={itemVariants} className="max-w-4xl mx-auto mt-24 text-center border-t border-slate-200 pt-16">
          <h3 className="text-3xl font-bold text-slate-800 mb-4">Készen áll a biztonságosabb működésre?</h3>
          <p className="text-slate-600 text-lg mb-8">Az első lépés egy ingyenes konzultáció. Vegye fel velünk a kapcsolatot még ma!</p>
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
            <Link href="https://calendly.com/">
              <motion.div
                className={`w-full sm:w-auto text-center font-bold py-3 px-8 rounded-xl bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo} text-white shadow-lg shadow-cyan-500/30 cursor-pointer`}
                whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 30px -10px rgba(3, 186, 190, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <CalendarDaysIcon className="w-5 h-5 inline-block mr-2" />
                Időpontfoglalás
              </motion.div>
            </Link>
          </div>
        </motion.footer>
      </motion.div>
    </div>
  );
};

export default Kapcsolat;