'use client';

import React from 'react';
import Link from 'next/link';
import { SparklesIcon } from '@heroicons/react/24/solid';

const accentColor = {
  bg: 'bg-[#03BABE]',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  focusRingOffset: 'focus:ring-offset-slate-900',
  textGradient: 'from-cyan-300 to-sky-400',
};

const CallToActionSection: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');

        .cta-grid-pattern {
            background-image: linear-gradient(rgba(203, 213, 225, 0.05) 1px, transparent 1px),
                              linear-gradient(to right, rgba(203, 213, 225, 0.05) 1px, transparent 1px);
            background-size: 4rem 4rem;
        }
      `}</style>

      {/* A section relatív, a negatív margót és z-indexet eltávolítottuk */}
      <section className="bg-slate-900 pb-20 sm:pb-32 relative font-['Poppins',_sans-serif]">

        {/* --- HOZZÁADVA: FELSŐ FEHÉR HULLÁM --- */}
        {/* Ez a hullám a szekció tetején helyezkedik el, és fehér kitöltést kap. */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="relative block w-full h-[80px] sm:h-[120px]"
            >
                <path
                    d="M-0.00,49.98 C149.99,150.00 249.20,-49.98 500.00,49.98 C749.20,150.00 850.00,-50.00 1200.00,49.98 L1200.00,0.00 L-0.00,0.00 Z"
                    fill="#ffffff"
                ></path>
            </svg>
        </div>

        <div className="absolute inset-0 cta-grid-pattern z-0"></div>

        {/* A felső padding megmaradt, hogy a tartalom a hullám alá kerüljön */}
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-40">
            <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-10">
                <h2
                    className={`text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${accentColor.textGradient} mb-6 tracking-tight`}
                >
                    Készen állsz a biztonságra?
                </h2>
                <p
                    className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed"
                >
                    Tedd meg az első lépést, és tudd biztonságban minden értékedet, előzd meg az esetleges tüzet, és a baleseteket!
                </p>

                <div>
                    <Link
                        href="/kapcsolat"
                        className={`
                            inline-flex items-center gap-3 ${accentColor.bg} text-white
                            font-bold py-4 px-10 rounded-xl text-lg sm:text-xl
                            transition-shadow duration-300 ease-in-out
                            focus:outline-none focus:ring-4 ${accentColor.ring} ${accentColor.focusRingOffset}
                        `}
                    >
                        <SparklesIcon className="w-6 h-6" />
                        Ingyenes Konzultáció szakemberrel
                    </Link>
                </div>
            </div>
        </div>

        {/* Az alsó sötét hullám megmarad a következő szekcióhoz való átmenethez */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="relative block w-full h-[80px] sm:h-[120px]"
            >
                <path
                    d="M-0.00,49.98 C149.99,150.00 349.20,-49.98 500.00,49.98 C749.20,150.00 850.00,-50.00 1200.00,49.98 L1200.00,120.00 L-0.00,120.00 Z"
                    fill="#0f172a"
                ></path>
            </svg>
        </div>
      </section>
    </>
  );
};

export default CallToActionSection;