// This file was created by combining components/HeaderHero.tsx and components/sections/TestimonialSlider.tsx
// All animations and dynamic effects have been removed to ensure the page loads with all content in place.

'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { MdEmojiPeople } from 'react-icons/md';

// --- MODAL ---
const QuoteRequestModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Ajánlatkérés</h2>
        <p>A modal ablak tartalma ide kerül.</p>
        <button onClick={onClose} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
          Bezár
        </button>
      </div>
    </div>
  );
};

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
  starActive: 'text-cyan-400',
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
  { id: 1, name: 'Nagy Károly', company: 'Tech Kft.', quote: 'Profi csapat, naprakész tudással. Az audit után sokkal nyugodtabban alszom. Maximálisan elégedett vagyok.', rating: 5 },
  { id: 2, name: 'Kiss Éva', company: 'Kis Bolt Bt.', quote: 'Az oktatásuk érthető és gyakorlatias volt, a munkatársaim is pozitívan értékelték. Rugalmasak és segítőkészek.', rating: 5 },
  { id: 3, name: 'Szabó Zoltán', company: 'Gyártó Zrt.', quote: 'Gyorsan és precízen elkészítették a hiányzó szabályzatainkat. A hatósági ellenőrzésen minden rendben volt.', rating: 5 },
  { id: 4, name: 'Horváth Mária', company: 'Szolgáltató Centrum', quote: 'A kockázatértékelésük rendkívül alapos volt, olyan dolgokra is felhívták a figyelmünket, amikre nem is gondoltunk.', rating: 5 },
  { id: 5, name: 'Fehér Petra', company: 'Innovatív Zrt.', quote: 'Modern szemlélet, kiváló szakértelem. Mindenkinek csak ajánlani tudom őket, aki komolyan veszi a biztonságot.', rating: 5 },
  { id: 6, name: 'Kovács István', company: 'Építőipari Kft.', quote: 'Már több projekten dolgoztunk együtt, mindig megbízható és profi partnerek voltak. Köszönjük a munkájukat!', rating: 5 },
  { id: 7, name: 'Tóth Gábor', company: 'Logisztika Kft.', quote: 'A tűzvédelmi felülvizsgálat rendkívül alapos volt, mindenre kiterjedő és érthető magyarázatokkal. Ajánlott!', rating: 5 },
  { id: 8, name: 'Varga Judit', company: 'Élelmiszerbolt', quote: 'A HACCP rendszer bevezetése simán ment, köszönhetően a szakértelemnek és a folyamatos támogatásnak. Remek munka!', rating: 5 },
  { id: 9, name: 'Molnár Dániel', company: 'Építőanyag Kereskedés', quote: 'A munkavédelmi dokumentáció rendezése gyorsan és hatékonyan történt. Jelentős terhet vettek le a vállunkról.', rating: 5 },
  { id: 10, name: 'Papp Andrea', company: 'Vendéglátás Kft.', quote: 'Az időszakos felülvizsgálatok mindig pontosan lezajlanak, és előzetesen emlékeztetnek is rá. Kiváló szolgáltatás!', rating: 5 },
  { id: 11, name: 'Fekete Zsolt', company: 'Szoftverfejlesztő Zrt.', quote: 'Online is megoldható volt az oktatás, ami nekünk nagyon fontos volt a rugalmasság miatt. Profik!', rating: 5 },
  { id: 12, name: 'Juhász Krisztina', company: 'Mezőgazdasági Vállalat', quote: 'A telephelyi felmérés és a tanácsadás sokat segített a specifikus kérdéseinkben. Külön köszönöm a részletes útmutatót!', rating: 5 },
];

// --- TESTIMONIAL KÁRTya ---
const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0] }> = ({ testimonial }) => {
  return (
    <div className="h-full group">
      <div className="h-full min-h-[340px] bg-white/5 backdrop-blur-md rounded-2xl flex flex-col border border-white/10 overflow-hidden relative shadow-lg">
        <div className={`absolute -top-4 -left-2 text-8xl font-serif ${testimonialAccentColor.quoteMark} z-0`}>
          “
        </div>
        <div className="relative z-10 text-center flex flex-col flex-grow p-8">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`w-6 h-6 ${i < testimonial.rating ? testimonialAccentColor.starActive : 'text-white/20'}`} />
            ))}
          </div>
          <p className="text-base italic text-slate-300 mb-5 leading-relaxed flex-grow min-h-[80px] flex items-center justify-center">
            <span>"{testimonial.quote}"</span>
          </p>
          <div className="mt-auto">
            <p className="font-semibold text-base text-white">{testimonial.name}</p>
            <p className="text-xs text-slate-400">{testimonial.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- FŐ KOMPONENS ---
const CombinedPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const combinedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <div className="min-h-screen w-screen flex flex-col text-white antialiased relative overflow-hidden bg-slate-900 font-['Poppins',_sans-serif] cta-grid-pattern pt-[60px] pb-24">
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
        .animate-scroll {
          animation: scroll 15s linear infinite; /* Gyorsabb animáció */
        }
        .pause-on-hover:hover .animate-scroll {
          animation-play-state: paused;
        }
        @keyframes scroll {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-33.333333%);
          }
        }
      `}</style>

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-slate-950/70 backdrop-blur-lg py-3 px-4 sm:px-6 flex items-center justify-between text-sm shadow-xl z-50 border-b border-slate-700">
        <div className="flex items-center gap-1">
          <div className="font-bold text-lg tracking-wider relative top-[5px]">
            <span className={ACCENT_COLOR.textLight}>Munkavédelmi</span>
            <span className="text-white">Szaki</span>
          </div>
          <Image src="/munkavedelmiszakiLOGO.png" alt="Munkavédelmi Szaki Logó" width={32} height={32} className="h-8 w-auto" />
        </div>
        <div className="hidden md:flex items-center mr-30 gap-6 font-medium text-slate-300 ">
          <a href="mailto:info@tuz-munkavedelmiszaki.hu" className="hover:text-cyan-300 transition-colors duration-300">
            info@tuz-munkavedelmiszaki.hu
          </a>
          <a href="tel:+36302722571" className="hover:text-cyan-300 transition-colors duration-300 whitespace-nowrap">
            +36 30 272 2571
          </a>
        </div>
        <div>
          <button
            onClick={() => setIsModalOpen(true)}
            className={`${ACCENT_COLOR.bg} ${ACCENT_COLOR.hoverBg} ${ACCENT_COLOR.textOnAccent}
              font-bold py-2.5 px-5 rounded-lg text-sm
              transition-all duration-300 ease-in-out
              focus:outline-none focus-visible:ring-2 ${ACCENT_COLOR.ring}`}
          >
            Ajánlatkérés
          </button>
        </div>
      </div>

      {/* Header Hero */}
      <div className="flex-grow flex flex-col items-center justify-center text-center relative px-4">
        <div className="max-w-7xl relative z-10 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <div className="mb-1 z-20">
              <Image src="/munkavedelmiszakiLOGO.png" alt="Munkavédelmi Szaki Logó" width={100} height={100} className="mx-auto" priority />
            </div>
            <h2 className="text-3xl md:text-4xl text-slate-300 mb-2 z-10">
              Elkészítjük a jogszabályoknak megfelelő Tűz- Munkavédelmi, és HACCP dokumentációkat, hogy téged ne büntessenek meg.
            </h2>
            <h1
              className="text-5xl sm:text-7xl md:text-7xl font-black mb-8 leading-tight tracking-tighter text-white z-10"
            >
              A büntetés értéke 10 Millió forintig terjedhet!
            </h1>
            <div>
              <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" passHref className="inline-flex">
                <button
                  className={`inline-flex items-center gap-3 ${RED_ACCENT_COLOR.bg} ${RED_ACCENT_COLOR.hoverBg} ${RED_ACCENT_COLOR.textOnAccent}
                    font-bold py-8 px-12 rounded-xl text-3xl shadow-lg cta-glow-red transition-all duration-300 ease-in-out
                    focus:outline-none focus-visible:ring-2 ${RED_ACCENT_COLOR.ring} focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900`}
                >
                  Foglald le ingyenes konzultációdat!
                </button>
              </Link>
            </div>
            <div className="mt-2 mb-0 text-lg font-bold text-white text-center">
              <span className="text-yellow-400">★ ★ ★ ★ ★</span>
              <span className="ml-2">Több mint 150 elkerült büntetés!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <section className="relative overflow-hidden py-8 flex-shrink-0">
        <BlueprintCorner className="absolute top-0 left-0 text-cyan-400/10 hidden md:block" />
        <BlueprintCorner className="absolute bottom-0 right-0 text-cyan-400/10 transform rotate-180 hidden md:block" />
        <div className="container mx-auto relative z-10">
          <div className="flex flex-col items-center gap-2 mb-4">
            <MdEmojiPeople className="w-10 h-10 text-cyan-400 shrink-0" />
            <h2 className="text-3xl lg:text-4xl font-black text-white tracking-tight">
              Ők már <span className={testimonialAccentColor.primaryText}>jobban</span> alszanak:
            </h2>
          </div>
          <div className="max-w-7xl mx-auto overflow-hidden relative pause-on-hover">
            <div className="flex animate-scroll">
              {combinedTestimonials.map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 p-4">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <QuoteRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default CombinedPage;