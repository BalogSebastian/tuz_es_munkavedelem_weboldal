'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
    DocumentArrowDownIcon,
    UserIcon,
    EnvelopeIcon,
    PhoneIcon,
    ArrowRightIcon,
    CheckCircleIcon,
    ChevronLeftIcon,
    ChevronRightIcon
} from '@heroicons/react/24/solid';
import { IoArrowUndoSharp, IoArrowRedo } from 'react-icons/io5';

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

// --- DOKUMENTUM LISTA (10 ELEM) ---
const downloadableDocs = [
    { id: 1, title: "Kávézó Nyitás Feltételei", description: "Útmutató a sikeres kávézó indításához szükséges összes tűz- és munkavédelmi teendőről.", fileName: "kavezo_nyitas_feltetelei.pdf" },
    { id: 2, title: "Mire van szüksége egy irodának?", description: "Ismerje meg az irodák alapvető szükségleteit, a kötelező jelölésektől az ergonomikus munkaállomásokig.", fileName: "irodai_szuksegletek_lista.pdf" },
    { id: 3, title: "Általános Munkavédelmi Kisokos", description: "Praktikus összefoglaló, amit minden vállalkozónak és munkavállalónak ismernie kell.", fileName: "altalanos_munkavédelmi_kisokos.pdf" },
    { id: 4, title: "Építkezési Munkavédelem", description: "Ellenőrző lista az építkezéseken betartandó legfontosabb munkavédelmi szabályokról.", fileName: "epitkezesi_ellenorzo_lista.pdf" },
    { id: 5, title: "HACCP Útmutató Vendéglátóhelyeknek", description: "Részletes útmutató az élelmiszer-biztonsági rendszer (HACCP) kiépítéséhez.", fileName: "vendeglatos_haccp_utmutato.pdf" },
    { id: 6, title: "Veszélyes Anyagok Kezelése", description: "Információs anyag a veszélyes anyagok tárolásának és kezelésének szabályairól.", fileName: "veszelyes_anyagok_kezelesi_utmutato.pdf" },
    { id: 7, title: "Tűzvédelmi Szabályzat Minta", description: "Letölthető és személyre szabható tűzvédelmi szabályzat minta kisebb vállalkozások számára.", fileName: "tuzvedelmi_szabalyzat_minta.pdf" },
    { id: 8, title: "Munkabalesetek Kivizsgálása", description: "Lépésről lépésre útmutató a munkabalesetek szakszerű kivizsgálásához és dokumentálásához.", fileName: "munkabaleset_kivizsgalasi_protokoll.pdf" },
    { id: 9, title: "Raktárak Munkavédelme", description: "Gyakorlati tanácsok és előírások a biztonságos raktári munkavégzéshez.", fileName: "raktari_munkavedelem_kisokos.pdf" },
    { id: 10, title: "Elsősegélynyújtás a Munkahelyen", description: "Azonnali teendők és alapvető elsősegélynyújtási ismeretek munkahelyi vészhelyzetek esetére.", fileName: "elsosegelynyujtas_munkahelyen.pdf" }
];

interface FormDataState { name: string; email: string; phone: string; }

const DownloadCard: React.FC<{ doc: any; formData: any; submitted: boolean; handleChange: any; handleSubmit: any; }> = ({ doc, formData, submitted, handleChange, handleSubmit }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200/70 relative overflow-hidden h-full">
      <div className="relative w-full h-full">
        <div className="p-6 sm:p-8 flex flex-col h-full">
            <div className="flex-grow flex flex-col">
                <div className="w-fit mx-auto mb-5">
                    <DocumentArrowDownIcon className={`w-12 h-12 sm:w-14 sm:h-14 ${accentColor.text}`} />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 text-center">{doc.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-6 text-center text-sm line-clamp-3 flex-grow">{doc.description}</p>
                <form onSubmit={(e) => handleSubmit(doc.id, e)} className="space-y-4 mt-auto">
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
                    <button type="submit" className={`w-full flex items-center justify-center px-6 py-3.5 border border-transparent rounded-lg shadow-lg text-base font-semibold ${accentColor.textOnAccent} ${accentColor.bg} ${accentColor.hoverBg} focus:outline-none focus:ring-2 focus:ring-offset-2 ${accentColor.ring} transition-all duration-200 ease-in-out`}>
                        Letöltés és Adatlap Küldése
                        <span> <ArrowRightIcon className="ml-3 h-5 w-5" /> </span>
                    </button>
                    </div>
                </form>
            </div>
        </div>
        <div className={`absolute top-0 left-0 w-full h-full p-6 sm:p-8 flex flex-col justify-center items-center text-center rounded-2xl ${accentColor.successBg} border border-green-200 ${submitted ? '' : 'hidden'}`} >
            <CheckCircleIcon className={`w-20 h-20 ${accentColor.successText} mx-auto mb-4`} />
            <h4 className={`text-xl sm:text-2xl font-bold ${accentColor.successText} mb-2`}>Küldés Sikeres!</h4>
            <p className="text-gray-700 text-sm">Köszönjük! A kért dokumentumot hamarosan elküldjük a megadott email címre.</p>
        </div>
      </div>
    </div>
  );
}

const DownloadableDocsSection: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const [formData, setFormDataState] = useState<Record<number, FormDataState>>(() =>
      downloadableDocs.reduce((acc, doc) => {
        acc[doc.id] = { name: '', email: '', phone: '' };
        return acc;
      }, {} as Record<number, FormDataState>)
    );

    const [submitted, setSubmittedState] = useState<Record<number, boolean>>(() =>
      downloadableDocs.reduce((acc, doc) => {
        acc[doc.id] = false;
        return acc;
      }, {} as Record<number, boolean>)
    );
    
    const handleFormChange = (docId: number, e: React.ChangeEvent<HTMLInputElement>) => {
        setFormDataState(prev => ({ ...prev, [docId]: { ...prev[docId], [e.target.name]: e.target.value } }));
    };

    const handleFormSubmit = (docId: number, e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(`Adatok:`, formData[docId]);
        setSubmittedState(prev => ({ ...prev, [docId]: true }));
    };

    const checkScrollButtons = useCallback(() => {
        const container = scrollContainerRef.current;
        if (container) {
            const { scrollLeft, scrollWidth, clientWidth } = container;
            const buffer = 5;
            setCanScrollLeft(scrollLeft > buffer);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - buffer);
        }
    }, []);
    
    useEffect(() => {
        const container = scrollContainerRef.current;
        checkScrollButtons();
        container?.addEventListener('scroll', checkScrollButtons);
        window.addEventListener('resize', checkScrollButtons);
        return () => {
            container?.removeEventListener('scroll', checkScrollButtons);
            window.removeEventListener('resize', checkScrollButtons);
        };
    }, [checkScrollButtons]);

    const scroll = (direction: 'left' | 'right') => {
      const container = scrollContainerRef.current;
      if (container) {
          const containerWidth = container.clientWidth;
          const isSmallScreen = window.innerWidth < 640;
          const scrollAmount = isSmallScreen ? containerWidth : containerWidth / 2;

          container.scrollBy({
              left: direction === 'left' ? -scrollAmount : scrollAmount,
              behavior: 'smooth'
          });
      }
    };

    return (
        <>
        <style>{`
            @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
            .scrollbar-hide::-webkit-scrollbar { display: none; }
            .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            .cta-grid-pattern {
                background-image: linear-gradient(rgba(3, 186, 190, 0.15) 1px, transparent 1px),
                                  linear-gradient(to right, rgba(3, 186, 190, 0.15) 1px, transparent 1px);
                background-size: 3rem 3rem;
            }
        `}</style>
        <section
            className="pt-24 lg:pt-32 pb-24 lg:pb-32 font-['Poppins',_sans-serif] relative bg-white overflow-hidden cta-grid-pattern"
        >
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
                {/* --- MÓDOSÍTÁS: A SÖTÉT HULLÁM ÚJ FORMÁJA --- */}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="relative block w-full h-[100px] sm:h-[150px]"
                >
                    <path
                        d="M0 0.52C534.61 5.92 642.14 17.51 770.83 50.45 889.04 79.52 1012.75 120 1200 120L1200 0 0 0Z"
                        fill="#0f172a"
                    ></path>
                </svg>
            </div>

            <div className="absolute top-0 left-0 w-full h-[150px] pointer-events-none z-20">
                <div
                    className="absolute w-36 h-36 text-cyan-500"
                    style={{ top: '100px', left: '10%', transform: 'translateY(-50%) rotate(205deg)' }}
                >
                    <IoArrowUndoSharp className="w-full h-full" />
                </div>
                <div
                    className="absolute w-36 h-36 text-cyan-400"
                    style={{ top: '180%', right: '10%', transform: 'translateY(-50%) rotate(150deg)' }}
                >
                    <IoArrowRedo className="w-full h-full" />
                </div>
            </div>
            
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex justify-center items-start gap-8 lg:gap-12">
                    <div
                    className="w-full max-w-3xl shrink-0 text-center mb-16 lg:mb-20"
                    >
                    <h2 className="text-4xl lg:text-5xl font-black tracking-tight mb-5 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-[#03BABE] to-teal-500">
                    <span>Töltsd le</span> <span className='text-black'>a számodra</span>  leghasznosabb <span className='text-black'>anyagunkat!</span>
                    </h2>
                    <p className="text-2xl text-slate-700 leading-relaxed max-w-xl mx-auto">
                    Add meg az elérhetőségedet, hogy a <span className='text-cyan-500'>szakemberünk fel tudjon hívni</span>, és tudjon tanácsot adni<span className='text-cyan-500'> a te konkrét helyzetedre!</span> 
                    </p>
                    </div>
                </div>
                <div className="relative max-w-5xl mx-auto">
                    <div ref={scrollContainerRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                            {downloadableDocs.map(doc => (
                                <div key={doc.id} className="flex-shrink-0 w-full sm:w-1/2 p-3 sm:p-4 snap-start">
                                    <DownloadCard
                                        doc={doc}
                                        formData={formData[doc.id]}
                                        submitted={submitted[doc.id]}
                                        handleChange={handleFormChange}
                                        handleSubmit={handleFormSubmit}
                                    />
                                </div>
                            ))}
                    </div>
                    
                    <div className="absolute top-1/2 -translate-y-1/2 -left-4 md:-left-8 hidden sm:flex">
                        <button
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            className="p-3 bg-white/70 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Előző"
                        >
                            <ChevronLeftIcon className="w-6 h-6 text-slate-700"/>
                        </button>
                    </div>
                    <div className="absolute top-1/2 -translate-y-1/2 -right-4 md:-right-8 hidden sm:flex">
                        <button
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            className="p-3 bg-white/70 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 disabled:opacity-30 disabled:cursor-not-allowed"
                            aria-label="Következő"
                        >
                            <ChevronRightIcon className="w-6 h-6 text-slate-700"/>
                        </button>
                    </div>
                </div>
            </div>

            {/* --- HOZZÁADVA: ÚJ, NAGYOBB FEHÉR HULLÁM AZ ALJÁRA --- */}
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                    className="relative block w-full h-[60px] sm:h-[90px]"
                >
                    <path
                        d="M-0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 C749.20,150.00 850.00,-50.00 1200.00,49.98 L1200.00,120.00 L-0.00,120.00 Z"
                        fill="#ffffff"
                    ></path>
                </svg>
            </div>
        </section>
        </>
    );
};

export default DownloadableDocsSection;