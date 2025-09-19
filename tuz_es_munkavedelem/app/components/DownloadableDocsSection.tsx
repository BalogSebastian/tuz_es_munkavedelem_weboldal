// DownloadableDocsSection - Mobilra optimalizált verzió
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
import { IoArrowRedo, IoArrowRedoSharp } from "react-icons/io5";

// --- SZÍNSÉMA ---
const accentColor = {
  baseHex: '#03BABE',
  bg: 'bg-[#03BABE]',
  text: 'text-cyan-400',
  textOnAccent: 'text-white',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  borderFocus: 'focus:border-cyan-500',
  iconDefault: 'text-cyan-400',
  successText: 'text-green-600',
  successBg: 'bg-green-50',
};

// --- DOKUMENTUMOK ---
const downloadableDocs = [
    { id: 1, title: "Kávézó Nyitás Feltételei", description: "Útmutató a sikeres kávézó indításához szükséges összes tűz- és munkavédelmi teendőről.", fileName: "kavezo_nyitas_feltetelei.pdf" },
    { id: 2, title: "Mire van szüksége egy irodának?", description: "Ismerje meg az irodák alapvető szükségleteit, a kötelező jelölésektől az ergonomikus munkaállomásokig.", fileName: "irodai_szuksegletek_lista.pdf" },
    { id: 3, title: "Általános Munkavédelmi Kisokos", description: "Praktikus összefoglaló, amit minden vállalkozónak és munkavállalónak ismernie kell.", fileName: "altalanos_munkavedelmi_kisokos.pdf" },
    { id: 4, title: "Építkezési Munkavédelem", description: "Ellenőrző lista az építkezéseken betartandó legfontosabb munkavédelmi szabályokról.", fileName: "epitkezesi_ellenorzo_lista.pdf" },
    { id: 5, title: "HACCP Útmutató Vendéglátóhelyeknek", description: "Részletes útmutató az élelmiszer-biztonsági rendszer (HACCP) kiépítéséhez.", fileName: "vendeglatos_haccp_utmutato.pdf" },
];

// --- TÍPUSOK ---
interface FormDataState { name: string; email: string; phone: string; }
interface DocState {
    formData: FormDataState;
    isSubmitted: boolean;
    isLoading: boolean;
    error: string | null;
}

interface DownloadCardProps {
    doc: typeof downloadableDocs[0];
    initialState: DocState;
    onDownloadSubmit: (doc: typeof downloadableDocs[0], formData: FormDataState) => Promise<void>;
}

// --- LETÖLTŐ KÁRTYA KOMPONENS (Optimalizált, Lokális Állapotkezelés) ---
const DownloadCard: React.FC<DownloadCardProps> = ({ doc, initialState, onDownloadSubmit }) => {
    const [state, setState] = useState(initialState);
    const { formData, isSubmitted, isLoading, error } = state;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setState(prev => ({
            ...prev,
            formData: { ...prev.formData, [name]: value }
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!formData.name || !formData.email) {
            setState(prev => ({ ...prev, error: "A név és az email mező kitöltése kötelező.", isLoading: false }));
            return;
        }

        setState(prev => ({ ...prev, isLoading: true, error: null }));

        try {
            await onDownloadSubmit(doc, formData);
            setState(prev => ({ ...prev, isSubmitted: true, isLoading: false }));

        } catch (err: any) {
            console.error("Submit error:", err);
            setState(prev => ({ ...prev, isLoading: false, error: err.message || 'Ismeretlen hiba történt.' }));
        }
    };

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-200/70 relative overflow-hidden h-full">
      <div className="relative w-full h-full">
        <div className={`p-4 sm:p-6 sm:p-8 flex flex-col h-full transition-opacity duration-300 ${isSubmitted ? 'opacity-0' : 'opacity-100'}`}>
            <div className="flex-grow flex flex-col">
                <div className="w-fit mx-auto mb-4 sm:mb-5">
                    <DocumentArrowDownIcon className={`w-10 h-10 sm:w-12 sm:h-12 sm:w-14 sm:h-14 text-cyan-400`} />
                </div>
                <h3 className="text-lg sm:text-xl sm:text-2xl font-bold text-slate-800 mb-2 sm:mb-3 text-center leading-tight">{doc.title}</h3>
                <p className="text-slate-600 leading-relaxed mb-4 sm:mb-6 text-center text-xs sm:text-sm line-clamp-3 flex-grow">{doc.description}</p>
                <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4 mt-auto">
                    {(['name', 'email', 'phone'] as Array<keyof FormDataState>).map(fieldName => (
                    <div key={fieldName} className="relative group">
                        <div className={`absolute inset-y-0 left-0 pl-3 sm:pl-3.5 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:text-cyan-400`}>
                            {fieldName === 'name' && <UserIcon className={`h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 group-focus-within:text-cyan-400`} />}
                            {fieldName === 'email' && <EnvelopeIcon className={`h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 group-focus-within:text-cyan-400`} />}
                            {fieldName === 'phone' && <PhoneIcon className={`h-4 w-4 sm:h-5 sm:w-5 text-cyan-400 group-focus-within:text-cyan-400`} />}
                        </div>
                        <input
                            type={fieldName === 'email' ? 'email' : fieldName === 'phone' ? 'tel' : 'text'}
                            name={fieldName}
                            id={`${fieldName}-${doc.id}`}
                            value={formData[fieldName]}
                            onChange={handleChange}
                            className={`block w-full pl-9 sm:pl-10 pr-3 py-2.5 sm:py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 text-sm sm:text-sm transition-all duration-200 hover:shadow-md focus:shadow-md`}
                            placeholder={fieldName === 'name' ? 'Teljes Név*' : fieldName === 'email' ? 'Email cím*' : 'Telefonszám'}
                            required={fieldName !== 'phone'}
                        />
                    </div>
                    ))}
                    {error && <p className="text-red-500 text-xs text-center -mb-2">{error}</p>}
                    <div className="pt-1 sm:pt-2">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full flex items-center justify-center px-4 sm:px-6 py-3 sm:py-3.5 border border-transparent rounded-lg shadow-lg text-sm sm:text-base font-semibold text-white bg-cyan-400 hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 transition-all duration-200 ease-in-out disabled:bg-cyan-300 disabled:cursor-not-allowed`}
                        >
                            <span className="text-center leading-tight">
                                {isLoading ? 'Mentés és letöltés...' : 'Letöltés és Adatlap Küldése'}
                            </span>
                            {!isLoading && <ArrowRightIcon className="ml-2 sm:ml-3 h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" />}
                        </button>
                    </div>
                </form>
            </div>
        </div>
        <div className={`absolute top-0 left-0 w-full h-full p-4 sm:p-6 sm:p-8 flex flex-col justify-center items-center text-center rounded-2xl bg-green-50 border border-green-200 transition-opacity duration-300 ${isSubmitted ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} >
            <CheckCircleIcon className={`w-16 h-16 sm:w-20 sm:h-20 text-green-600 mx-auto mb-3 sm:mb-4`} />
            <h4 className={`text-lg sm:text-xl sm:text-2xl font-bold text-green-600 mb-2`}>Sikeres Letöltés!</h4>
            <p className="text-gray-700 text-sm">Köszönjük! A letöltés automatikusan elindult.</p>
        </div>
      </div>
    </div>
  );
}

// --- FŐ KOMPONENS ---
const DownloadableDocsSection: React.FC = () => {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const initialFormData = { name: '', email: '', phone: '' };

    const handleDownloadSubmit = useCallback(async (doc: typeof downloadableDocs[0], formData: FormDataState) => {
        const { title, fileName } = doc;

        try {
            const response = await fetch('/api/save-lead', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, documentTitle: title, fileName }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Hiba történt a szerveren.');
            }

            const link = document.createElement('a');
            link.href = `/documents/${fileName}`;
            link.setAttribute('download', fileName);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

        } catch (error: any) {
            throw new Error(error.message || 'Hiba történt a küldés során.');
        }
    }, []);

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
        if (!container) return;
        checkScrollButtons();
        container.addEventListener('scroll', checkScrollButtons);
        window.addEventListener('resize', checkScrollButtons);
        return () => {
            container.removeEventListener('scroll', checkScrollButtons);
            window.removeEventListener('resize', checkScrollButtons);
        };
    }, [checkScrollButtons]);

    const scroll = (direction: 'left' | 'right') => {
      const container = scrollContainerRef.current;
      if (container) {
          const containerWidth = container.clientWidth;
          const isSmallScreen = window.innerWidth < 640;
          const scrollAmount = isSmallScreen ? containerWidth : containerWidth / 2;
          container.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
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
                background-size: 4rem 4rem;
                background-attachment: fixed;
                background-position: 0  170px;
            }
            
            /* Nyilak elrejtése mobilon */
            @media (max-width: 767px) {
                .mobile-hide-arrows {
                    display: none !important;
                }
            }
        `}</style>
        <section
            className="pt-8 sm:pt-24 lg:pt-32 pb-16 sm:pb-24 lg:pb-32 font-['Poppins',_sans-serif] relative bg-white cta-grid-pattern"
        >
            {/* A NYÍL ITT VAN, ÉS A FELETTE LÉVŐ SZEKCIÓRA MUTAT - Mobilon elrejtve */}
            <div className="mobile-hide-arrows absolute w-20 sm:w-36 h-20 sm:h-36 text-cyan-500 pointer-events-none z-20"
                style={{
                    top: '1%',
                    right: '10%',
                    transform: 'translateY(-50%) rotate(160deg)'
                }}
            >
                <IoArrowRedoSharp className="w-full h-full" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                <div className="flex justify-center items-start gap-8 lg:gap-12">
                    <div
                    className="w-full max-w-3xl shrink-0 text-center mb-12 sm:mb-16 lg:mb-20"
                    >
                    <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4 sm:mb-5 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-500 via-[#03BABE] to-teal-500 px-2">
                        <span className='text-cyan-400'>Töltsd le</span> <span className='text-black'>a számodra</span> <span className='text-cyan-400'>leghasznosabb</span> <span className='text-black'>anyagunkat!</span>
                    </h2>
                    <p className="text-base sm:text-2xl text-slate-700 leading-relaxed max-w-xl mx-auto px-4">
                    Ezek az az anyagok jól jöhetnek ha még több információra van szükséged, hogy többet tudj meg, és elkerüld a büntetést.
                    </p>
                    </div>
                </div>
                <div className="relative max-w-5xl mx-auto">
                    <div ref={scrollContainerRef} className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                            {downloadableDocs.map(doc => (
                                <div key={doc.id} className="flex-shrink-0 w-full sm:w-1/2 p-2 sm:p-3 sm:p-4 snap-start">
                                    <DownloadCard
                                        doc={doc}
                                        initialState={{ formData: initialFormData, isSubmitted: false, isLoading: false, error: null }}
                                        onDownloadSubmit={handleDownloadSubmit}
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
        </section>
        </>
    );
};

export default DownloadableDocsSection;