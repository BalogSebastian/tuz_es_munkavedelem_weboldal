'use client';

import React from 'react';
import Link from 'next/link';
import { SparklesIcon } from '@heroicons/react/24/solid';
import { IoArrowRedo } from 'react-icons/io5';

// --- SZÍNPALETTA (Változatlan) ---
const accentColor = {
  base: '#03BABE',
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
      <section className="bg-slate-900 pt-24 sm:pt-32 pb-24 sm:pb-32 px-4 sm:px-6 lg:px-8 relative font-['Poppins',_sans-serif] overflow-hidden">
        
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="relative block w-full h-[100px] sm:h-[150px]"
            >
                {/* A hullám SVG görbéjét (path) cseréltük egy letisztultabbra */}
                <path
    d="M0,0 V40 C200,120,500,0,720,50 C940,100,1200,20,1200,90 V0 Z"
    fill="#ffffff"
></path>
            </svg>
        </div>

        <div className="absolute top-0 left-0 w-full h-[150px] pointer-events-none z-20">
            <div
                className="absolute w-36 h-36 text-cyan-400"
                style={{ top: '50%', right: '15%', transform: 'translateY(-50%) rotate(150deg)' }}
            >
                <IoArrowRedo className="w-full h-full" />
            </div>
        </div>
        
        <div className="absolute inset-0 cta-grid-pattern z-0"></div>
        
        <div className="relative max-w-7xl mx-auto">
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
      </section>
    </>
  );
};

export default CallToActionSection;
