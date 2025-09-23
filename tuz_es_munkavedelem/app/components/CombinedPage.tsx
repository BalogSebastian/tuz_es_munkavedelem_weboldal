'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import OfferModal from './OfferModal';

// --- STÍLUS KONSTANSOK ---
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
  baseHex: '#DC2626',
  baseRgb: '220, 38, 38',
  bg: 'bg-red-600',
  hoverBg: 'hover:bg-red-700',
  ring: 'focus-visible:ring-red-500',
  textOnAccent: 'text-white',
};

const testimonialAccentColor = {
  starActive: 'text-yellow-400',
  quoteMark: 'text-cyan-200/10',
  primaryText: 'text-cyan-400',
};

const BlueprintCorner: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    className={className}
    width="150"
    height="150"
    viewBox="0 0 150 150"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
  </svg>
);

const testimonials = [
  { id: 1, name: 'Szabó György', company: 'Egyéni Vállalkozó', quote: 'Gyors és korrekt munkavégzés.', rating: 5 },
  { id: 2, name: 'Gémes Péter', company: 'Apagyi Görögkatólikus egyház', quote: 'Az Apagyi templom tűzvédelmére kértem fel a MunkavédelmiSzaki-t, a munka gördülékenyen ment, számomra kiváló partner.', rating: 5 },
  { id: 3, name: 'Nagy Mária', company: 'Falatozó Bisztró', quote: 'Online konzultáltunk, rendkívül kedvesek voltak, majd a HACCP teljes dokumentáció is gyorsan kész lett.', rating: 5 },
  { id: 4, name: 'Kiss Imre', company: 'Kiss 2000 Bt.', quote: 'Korrekt ár érték arány, mindig egy szakember veszi fel a telefont, aki ért is hozzá.', rating: 5 },
  { id: 5, name: 'Nagy Árpád', company: 'Leveleki Egyház', quote: 'Érintésvédelmi vizsgálatra volt szükségünk sürgősen, 3 nap múlva már a jegyzőkönyvet is megkaptam.', rating: 5 },
  { id: 6, name: 'Nagy Kincső', company: 'Nails by: Kincső', quote: 'Üzletnyitás után segítettek mindenben amire szükségem volt, szuper csapat.', rating: 5 },
  { id: 7, name: 'Gaál Marcell', company: '', quote: 'Üzletnyitás előtt állok, teljeskörű tájékoztatást kaptam tőlük, és készségesen segítettek bármilyen kérdésem is volt.', rating: 5 },
];

const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0] }> = ({ testimonial }) => {
  return (
    <div className="h-full group">
      <div className="h-full bg-slate-800/50 backdrop-blur-md rounded-2xl flex flex-col border border-slate-700 overflow-hidden relative shadow-2xl transition-all duration-300 group-hover:bg-slate-700/60 p-4 sm:p-6 md:p-8">
        <div className="relative z-10 flex flex-col flex-grow">
          <div className="flex-grow mb-4 sm:mb-6">
            <p className="text-sm sm:text-base italic text-slate-300 leading-relaxed">
              "{testimonial.quote}"
            </p>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mt-auto">
            <div>
              <p className="font-semibold text-sm sm:text-base text-white">{testimonial.name}</p>
              <p className="text-xs text-slate-400">{testimonial.company}</p>
            </div>
            <div className="flex-shrink-0">
              {[...Array(5)].map((_, i) => (
                <StarIcon
                  key={i}
                  className={`w-4 sm:w-5 h-4 sm:h-5 inline-block ${
                    i < testimonial.rating ? testimonialAccentColor.starActive : 'text-slate-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Mobil testimonials marquee
const MobileTestimonials: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let scrollAmount = 0;
    const speed = 0.4; // px/frame
    const resetAt = container.scrollWidth / 2; // fél lista után reset

    const step = () => {
      scrollAmount += speed;
      if (scrollAmount >= resetAt) {
        scrollAmount = 0;
        container.scrollLeft = 0;
      }
      container.scrollLeft = scrollAmount;
      requestAnimationFrame(step);
    };

    step();
  }, []);

  return (
    <div className="md:hidden max-w-full mx-auto overflow-hidden relative">
      <div
        ref={containerRef}
        className="flex gap-3"
        style={{ overflowX: 'hidden' }}
      >
        {testimonials.concat(testimonials).map((testimonial, index) => (
          <div
            key={`mobile-${testimonial.id}-${index}`}
            className="flex-shrink-0 w-[280px] sm:w-[320px]"
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>
    </div>
  );
};

const CombinedPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const combinedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials];

  const [emailText, setEmailText] = useState('iroda@tuz-munkavedelmiszaki.hu');

  const handleCopyToClipboard = () => {
    const email = 'iroda@tuz-munkavedelmiszaki.hu';
    navigator.clipboard.writeText(email).then(() => {
      setEmailText('Email cím másolva!');
      setTimeout(() => {
        setEmailText(email);
      }, 2000);
    }).catch(err => {
      console.error('Hiba a másolás során: ', err);
      setEmailText('Sikertelen másolás');
      setTimeout(() => {
        setEmailText(email);
      }, 2000);
    });
  };

  return (
    <div className="min-h-screen w-screen flex flex-col text-white antialiased relative overflow-hidden bg-slate-900 font-['Poppins',_sans-serif] cta-grid-pattern pt-[60px] pb-12 sm:pb-16 md:pb-24">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
        .cta-glow {
          box-shadow: 0 0 15px ${ACCENT_COLOR.baseHex}40, 0 0 30px ${ACCENT_COLOR.baseHex}30, inset 0 0 10px ${ACCENT_COLOR.baseHex}20;
        }
        .cta-glow-red {
          box-shadow: 0 0 30px ${RED_ACCENT_COLOR.baseHex}80, 0 0 60px ${RED_ACCENT_COLOR.baseHex}60, inset 0 0 20px ${RED_ACCENT_COLOR.baseHex}40;
        }
        .cta-grid-pattern {
          background-image: linear-gradient(rgba(203, 213, 225, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(203, 213, 225, 0.05) 1px, transparent 1px);
          background-size: 4rem 4rem;
        }
        
        /* Desktop animáció */
        @media (min-width: 768px) {
          .animate-scroll-fast {
            animation: scroll-fast 20s linear infinite;
            will-change: transform;
          }
          .pause-on-hover:hover .animate-scroll-fast {
            animation-play-state: paused;
          }
        }
        
        @keyframes scroll-fast {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-12.5% * 4)); }
        }
        
        /* Mobil navbar contact infó */
        @media (max-width: 767px) {
          .mobile-contact-info {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.5rem;
            margin-top: 0.5rem;
            padding-top: 0.5rem;
            border-top: 1px solid rgba(148, 163, 184, 0.2);
          }
        }
      `}</style>

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-slate-950/70 backdrop-blur-lg py-2 sm:py-3 px-3 sm:px-4 md:px-6 shadow-xl z-50 border-b border-slate-700">
        {/* Desktop navbar */}
        <div className="hidden md:flex items-center justify-between text-sm">
          <div className="flex items-center gap-1">
            <div className="font-bold text-lg tracking-wider relative top-[5px]">
              <span className='text-white'>Munkavédelmi</span>
              <span className="text-cyan-400">Szaki</span>
            </div>
            <Image src="/munkavedelmiszakiLOGO.png" alt="Munkavédelmi Szaki Logó" width={32} height={32} className="h-8 w-auto" />
          </div>
          <div className="flex items-center mr-30 gap-6 font-medium text-slate-300">
            <button onClick={handleCopyToClipboard} className="hover:text-cyan-300 transition-colors duration-300 cursor-pointer">
              {emailText}
            </button>
            <a href="tel:+36302722571" className="hover:text-cyan-300 transition-colors duration-300 whitespace-nowrap">
              +36 30 272 2571
            </a>
          </div>
          <div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-cyan-400 hover:bg-cyan-600 text-white font-bold py-2.5 px-5 rounded-lg text-sm transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500"
            >
              Ajánlatkérés
            </button>
          </div>
        </div>
        
        {/* Mobil navbar */}
        <div className="md:hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <div className="font-bold text-sm sm:text-base tracking-wider">
                <span className='text-white'>Munkavédelmi</span>
                <span className="text-cyan-400">Szaki</span>
              </div>
              <Image src="/munkavedelmiszakiLOGO.png" alt="Logo" width={24} height={24} className="h-6 w-auto" />
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-cyan-400 hover:bg-cyan-600 text-white font-bold py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm transition-all duration-300"
            >
              Ajánlatkérés
            </button>
          </div>
          <div className="mobile-contact-info">
            <button 
              onClick={handleCopyToClipboard} 
              className="text-xs text-slate-300 hover:text-cyan-300 transition-colors"
            >
              {emailText}
            </button>
            <a 
              href="tel:+36302722571" 
              className="text-xs text-slate-300 hover:text-cyan-300 transition-colors"
            >
              +36 30 272 2571
            </a>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div className="flex-grow flex flex-col items-center justify-center text-center relative px-4 py-8 sm:py-12 md:py-0">
        <div className="max-w-8xl relative z-10 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <h2 className="text-2xl sm:text-3xl md:text-6xl font-black text-white mb-4 sm:mb-2 z-10 mt-7 leading-tight sm:leading-snug md:leading-snug px-2">
              Elkészítjük a megfelelő Tűzvédelmi, Munkavédelmi, HACCP dokumentációkat, hogy téged ne büntessenek meg.
            </h2>
            <h1 className="text-xl sm:text-2xl md:text-3xl text-white mb-6 sm:mb-8 leading-tight tracking-tighter z-10 px-2">
              Teljes jegyzőkönyv készítés, hogy <span className='text-cyan-400 font-black'>TE</span> elkerüld a többmilliós forintos bírságokat!
            </h1>
            
            {/* CTA */}
            <div className="w-full px-4 sm:px-0">
              <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" passHref className="inline-flex w-full sm:w-auto">
                <button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 sm:gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-4 sm:py-6 md:py-8 px-6 sm:px-8 md:px-12 rounded-xl text-base sm:text-xl md:text-3xl shadow-lg cta-glow-red transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900">
                  Foglalj egy ingyenes konzultációt!
                </button>
              </Link>
            </div>
            
            {/* Rating */}
            <div className="mt-4 sm:mt-2 mb-0 text-sm sm:text-base md:text-lg font-bold text-white text-center">
              <span className="text-yellow-400">★ ★ ★ ★ ★</span>
              <span className="ml-2 block sm:inline">Több mint 150 elégedett partner</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <section className="relative overflow-hidden py-4 flex-shrink-0">
        <BlueprintCorner className="absolute top-0 left-0 text-cyan-400/10 hidden md:block" />
        <BlueprintCorner className="absolute bottom-0 right-0 text-cyan-400/10 transform rotate-180 hidden md:block" />
        <div className="relative z-10">
          {/* Desktop */}
          <div className="hidden md:block max-w-full mx-auto overflow-hidden relative pause-on-hover">
            <div className="flex animate-scroll-fast gap-6 will-change-transform">
              {combinedTestimonials.map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`} className="flex-shrink-0 w-[350px]">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
          
          {/* Mobil - marquee loop */}
          <MobileTestimonials />
        </div>
      </section>

      <OfferModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default CombinedPage;
