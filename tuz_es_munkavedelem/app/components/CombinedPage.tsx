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
      <div className="h-full bg-slate-800/50 backdrop-blur-md rounded-2xl flex flex-col border border-slate-700 overflow-hidden relative shadow-2xl transition-all duration-300 group-hover:bg-slate-700/60 p-8"> {/* Visszaállítva p-8-ra */}
        <div className="relative z-10 flex flex-col flex-grow">
          <div className="flex-grow mb-6"> {/* Visszaállítva mb-6-ra */}
            <p className="text-base italic text-slate-300 leading-relaxed"> {/* Betűméret növelve */}
              "{testimonial.quote}"
            </p>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <div>
              <p className="font-semibold text-base text-white">{testimonial.name}</p>
              <p className="text-xs text-slate-400">{testimonial.company}</p>
            </div>
            <div className="flex-shrink-0">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className={`w-5 h-5 inline-block ${i < testimonial.rating ? testimonialAccentColor.starActive : 'text-slate-500'}`} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CombinedPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const combinedTestimonials = [...testimonials, ...testimonials, ...testimonials, ...testimonials, ...testimonials];

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
        .animate-scroll-fast {
          animation: scroll-fast 30s linear infinite;
        }
        .pause-on-hover:hover .animate-scroll-fast {
          animation-play-state: paused;
        }
        @keyframes scroll-fast {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-12.5% * 4)); /* 4 x 1/8 = 50% */
          }
        }
      `}</style>

      {/* Navbar */}
      <div className="fixed top-0 left-0 right-0 bg-slate-950/70 backdrop-blur-lg py-3 px-4 sm:px-6 flex items-center justify-between text-sm shadow-xl z-50 border-b border-slate-700">
        <div className="flex items-center gap-1">
          <div className="font-bold text-lg tracking-wider relative top-[5px]">
            <span className='text-white'>Munkavédelmi</span>
            <span className="text-cyan-400">Szaki</span>
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
    className={`bg-cyan-400 hover:bg-cyan-600 text-white
      font-bold py-2.5 px-5 rounded-lg text-sm
      transition-all duration-300 ease-in-out
      focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500`}
>
    Ajánlatkérés
</button>
        </div>
      </div>

      {/* Header Hero */}
      <div className="flex-grow flex flex-col items-center justify-center text-center relative px-4">
        <div className="max-w-8xl relative z-10 flex flex-col items-center">
          <div className="flex flex-col items-center">
            <div className="mb-1 mt-4 z-20">
            </div>
            {/* Hozzáadott rész */}
            <div className="flex flex-col items-center">
              <Image src="/munkavedelmiszakiLOGO.png" alt="Munkavédelmi Szaki Logó" width={120} height={100} />
              <h2 className="text-3xl md:text-5xl font-black text-white mb-2 z-10">
              Elkészítjük a megfelelő Tűzvédelmi, Munkavédelmi, HACCP dokumentációkat, hogy téged ne büntessenek meg.
              </h2>
            </div>
            {/* Vége a hozzáadott résznek */}
            <h1
              className="text-5xl sm:text-7xl md:text-6xl text-slate-300 mb-8 leading-tight tracking-tighter z-10"
            >
              A büntetés értéke 10 millió forintig terjedhet!
            </h1>
            <div>
              <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" passHref className="inline-flex">
                <button
                  className={`inline-flex items-center gap-3 ${RED_ACCENT_COLOR.bg} ${RED_ACCENT_COLOR.hoverBg} ${RED_ACCENT_COLOR.textOnAccent}
                    font-bold py-8 px-12 rounded-xl text-3xl shadow-lg cta-glow-red transition-all duration-300 ease-in-out
                    focus:outline-none focus-visible:ring-2 ${RED_ACCENT_COLOR.ring} focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900`}
                >
                  Foglalj egy ingyenes konzultációt!
                </button>
              </Link>
            </div>
            <div className="mt-2 mb-0 text-lg font-bold text-white text-center">
              <span className="text-yellow-400">★ ★ ★ ★ ★</span>
              <span className="ml-2">Több mint 150 elégedett partner</span>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <section className="relative overflow-hidden py-4 flex-shrink-0">
        <BlueprintCorner className="absolute top-0 left-0 text-cyan-400/10 hidden md:block" />
        <BlueprintCorner className="absolute bottom-0 right-0 text-cyan-400/10 transform rotate-180 hidden md:block" />
        <div className="relative z-10">
          <div className="max-w-full mx-auto overflow-hidden relative pause-on-hover">
            <div className="flex animate-scroll-fast gap-6">
              {combinedTestimonials.map((testimonial, index) => (
                <div key={`${testimonial.id}-${index}`} className="flex-shrink-0 w-[350px]">
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