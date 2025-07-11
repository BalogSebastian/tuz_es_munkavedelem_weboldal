// app/components/DownloadableDocsSection.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
    motion,
    useMotionValue,
    useTransform,
    useSpring
} from 'framer-motion';
import {
    DocumentArrowDownIcon,
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    ArrowRightIcon,
    CheckCircleIcon
} from '@heroicons/react/24/solid';

// --- EGYSÉGESÍTETT CIÁN SZÍNSÉMA ---
const accentColor = {
  baseHex: '#03BABE',
  bg: 'bg-[#03BABE]',
  text: 'text-[#03BABE]',
  textOnAccent: 'text-white',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  borderFocus: 'focus:border-cyan-500',
  iconDefault: 'text-gray-400',
  successText: 'text-green-600',
  successBg: 'bg-green-50',
};

// --- A KÉRT DEKORATÍV NYÍL KOMPONENS ---
const AnimatedDecorativeArrow: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <motion.svg
            viewBox="0 0 100 100" fill="none" className={className}
            initial="hidden" whileInView="visible"
            viewport={{ once: true, amount: 0.5 }} >
            <motion.path
                d="M20 20C48.33 22.17 73.33 45.17 80 80" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
                variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: "circOut", delay: 0.5 } } }} />
            <motion.path
                d="M70 73L80 80L87 70" stroke="currentColor" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round"
                variants={{ hidden: { pathLength: 0, opacity: 0 }, visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, ease: "circOut", delay: 1.2 } } }} />
        </motion.svg>
    );
};

// CSAK AZ ELSŐ HÁROM DOKUMENTUM MARAD
const downloadableDocs = [
  { id: 1, title: "Kávézó Nyitás feltételei", description: "Töltse le részletes útmutatónkat a sikeres kávézó indításához szükséges összes tűz- és munkavédelmi teendőről.", fileName: "kavezo_nyitas_feltetelei.pdf" },
  { id: 2, title: "Mire van szüksége egy irodának?", description: "Ismerje meg az irodák alapvető szükségleteit, a kötelező jelölésektől az ergonomikus munkaállomásokig.", fileName: "irodai_szuksegletek_lista.pdf" },
  { id: 3, title: "Általános Munkavédelmi Kisokos", description: "Egy praktikus összefoglaló a legfontosabb tudnivalókról, amit minden vállalkozónak és munkavállalónak ismernie kell.", fileName: "altalanos_munkavedelmi_kisokos.pdf" },
];

interface FormDataState { name: string; email: string; phone: string; }

const DownloadCard: React.FC<{ doc: any; formData: any; submitted: boolean; handleChange: any; handleSubmit: any; }> = ({ doc, formData, submitted, handleChange, handleSubmit }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => { if (!cardRef.current) return; const rect = cardRef.current.getBoundingClientRect(); mouseX.set(event.clientX - rect.left); mouseY.set(event.clientY - rect.top); };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const cardEntranceVariants = { hidden: { opacity: 0, y: 50, scale: 0.92, rotateX: -10 }, visible: { opacity: 1, y: 0, scale: 1, rotateX: 0, transition: { duration: 0.7, ease: [0.25, 0.85, 0.45, 1] } }, };

  return (
    <motion.div
      ref={cardRef} className="bg-white rounded-2xl shadow-xl border border-gray-200/70 relative overflow-hidden"
      variants={cardEntranceVariants} style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}
      whileHover={{ y: -8, scale:1.02, boxShadow: "0 25px 40px -15px rgba(0,0,0,0.12)" }}
      transition={{type: "spring", stiffness:300, damping: 20}} >
      <motion.div
        className="absolute top-0 left-0 w-full h-full pointer-events-none rounded-2xl"
        style={{ background: useTransform( [mouseX, mouseY], ([newX, newY]) => `radial-gradient(400px at ${newX}px ${newY}px, rgba(255, 255, 255, 0.3), transparent 80%)` ), }} />
      <motion.div
        className="relative w-full h-full" style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: submitted ? -180 : 0 }} transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }} >
        <div className="p-6 sm:p-8 flex flex-col" style={{ backfaceVisibility: 'hidden' }}>
            <div className="flex-grow">
                <div className="w-fit mx-auto mb-5">
                    <DocumentArrowDownIcon className={`w-12 h-12 sm:w-14 sm:h-14 ${accentColor.text}`} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 text-center">{doc.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-center text-sm line-clamp-3">{doc.description}</p>
                <form onSubmit={(e) => handleSubmit(doc.id, e)} className="space-y-4">
                    {(['name', 'email', 'phone'] as Array<keyof FormDataState>).map(fieldName => (
                    <div key={fieldName} className="relative group">
                        <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:${accentColor.text}`}>
                            {fieldName === 'name' && <UserIcon className={`h-5 w-5 ${accentColor.iconDefault} group-focus-within:${accentColor.text}`} />}
                            {fieldName === 'email' && <EnvelopeIcon className={`h-5 w-5 ${accentColor.iconDefault} group-focus-within:${accentColor.text}`} />}
                            {fieldName === 'phone' && <PhoneIcon className={`h-5 w-5 ${accentColor.iconDefault} group-focus-within:${accentColor.text}`} />}
                        </div>
                        <input type={fieldName === 'email' ? 'email' : fieldName === 'phone' ? 'tel' : 'text'} name={fieldName} id={`${fieldName}-${doc.id}`} value={formData[fieldName]} onChange={(e) => handleChange(doc.id, e)} className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none ${accentColor.ring} ${accentColor.borderFocus} sm:text-sm transition-all duration-200 hover:shadow-md focus:shadow-md`} placeholder={fieldName === 'name' ? 'Teljes Név' : fieldName === 'email' ? 'Email cím' : 'Telefonszám (opcionális)'} required={fieldName !== 'phone'} />
                    </div>
                    ))}
                    <div className="pt-2">
                    <motion.button type="submit" className={`w-full flex items-center justify-center px-6 py-3.5 border border-transparent rounded-lg shadow-lg text-base font-semibold ${accentColor.textOnAccent} ${accentColor.bg} ${accentColor.hoverBg} focus:outline-none focus:ring-2 focus:ring-offset-2 ${accentColor.ring} transition-all duration-200 ease-in-out`} whileHover={{ scale: 1.03, y: -2, boxShadow: `0 10px 20px -5px ${accentColor.baseHex}55`}} whileTap={{ scale: 0.98 }} >
                        Letöltés és Adatlap Küldése
                        <motion.span initial={{x:0}} whileHover={{x:4}} transition={{type:'spring', stiffness:300, damping:15}}> <ArrowRightIcon className="ml-3 h-5 w-5" /> </motion.span>
                    </motion.button>
                    </div>
                </form>
            </div>
        </div>
        <div className={`absolute top-0 left-0 w-full h-full p-6 sm:p-8 flex flex-col justify-center items-center text-center rounded-2xl ${accentColor.successBg} border border-green-200`} style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} >
            <CheckCircleIcon className={`w-20 h-20 ${accentColor.successText} mx-auto mb-4`} />
            <h4 className={`text-xl sm:text-2xl font-bold ${accentColor.successText} mb-2`}>Küldés Sikeres!</h4>
            <p className="text-gray-700 text-sm">Köszönjük! A kért dokumentumot hamarosan elküldjük a megadott email címre.</p>
        </div>
      </motion.div>
    </motion.div>
  );
}

const DownloadableDocsSection: React.FC = () => {
  // Frissítjük a useState inicializálást, hogy csak a 3 dokumentum adatait tartalmazza
  const [formData, setFormDataState] = useState<Record<number, FormDataState>>({
    1: { name: '', email: '', phone: '' },
    2: { name: '', email: '', phone: '' },
    3: { name: '', email: '', phone: '' },
  });
  const [submitted, setSubmittedState] = useState<Record<number, boolean>>({
    1: false,
    2: false,
    3: false,
  });

  const handleFormChange = (docId: number, e: React.ChangeEvent<HTMLInputElement>) => {setFormDataState(prev => ({ ...prev, [docId]: { ...prev[docId], [e.target.name]: e.target.value }}));};
  const handleFormSubmit = (docId: number, e: React.FormEvent<HTMLFormElement>) => {e.preventDefault(); console.log(`Adatok:`, formData[docId]); setSubmittedState(prev => ({ ...prev, [docId]: true }));};

  return (
    <>
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
        .bg-grid-pattern { background-color: #f8fafc; background-image: linear-gradient(rgba(3, 186, 190, 0.07) 1px, transparent 1px), linear-gradient(to right, rgba(3, 186, 190, 0.07) 1px, transparent 1px); background-size: 3rem 3rem; }
    `}</style>
    <section className="py-24 lg:py-32 bg-grid-pattern font-['Poppins',_sans-serif] relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">

        {/* JAVÍTOTT FEJLÉC, A REFERENCIA ALAPJÁN */}
        <div className="flex justify-center items-start gap-8 lg:gap-12">
            {/* BAL OLDALI NYÍL: Mostantól feleakkora */}
            <div className="flex-1 hidden xl:flex justify-end mt-10">
                <AnimatedDecorativeArrow className="w-30 h-30 text-blue-500 transform -scale-x-100" /> {/* w-30 h-30 helyett w-24 h-24 vagy w-20 h-20 */}
            </div>

            {/* KÖZÉPRE IGAZÍTOTT TARTALOM */}
            <motion.div
              className="w-full max-w-3xl shrink-0 text-center mb-16 lg:mb-20"
              initial={{opacity:0, y:-30}}
              whileInView={{opacity:1, y:0}}
              viewport={{once:true, amount:0.5}}
              transition={{duration:0.7, ease:"easeOut"}}
            >
              <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-5 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-[#03BABE] to-teal-500">
                Töltse Le Hasznos Anyagainkat!
              </h2>
              <p className="text-xl text-slate-700 leading-relaxed max-w-xl mx-auto">
                Adja meg adatait, és férjen hozzá <span className={`font-semibold ${accentColor.text}`}>exkluzív útmutatóinkhoz</span>, amelyek segítenek megfelelni az előírásoknak.
              </p>
            </motion.div>

            {/* JOBB OLDALI NYÍL: Mostantól feleakkora */}
            <div className="flex-1 hidden xl:flex justify-start mt-10">
                <AnimatedDecorativeArrow className="w-30 h-30 text-blue-500 " /> {/* w-30 h-30 helyett w-24 h-24 vagy w-20 h-20 */}
            </div>
        </div>


        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.2 } } }}
        >
          {downloadableDocs.map((doc) => (
            <DownloadCard
              key={doc.id}
              doc={doc}
              formData={formData[doc.id]}
              submitted={submitted[doc.id]}
              handleChange={handleFormChange}
              handleSubmit={handleFormSubmit}
            />
          ))}
        </motion.div>
      </div>
    </section>
    </>
  );
};

export default DownloadableDocsSection;