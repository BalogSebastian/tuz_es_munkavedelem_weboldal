'use client';

import React, { useEffect, useRef, useState } from 'react';
import { UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { IoArrowUndoSharp, IoArrowRedo } from 'react-icons/io5';

// --- Natív Intersection Observer Hook ---
const useInViewObserver = (ref: React.RefObject<HTMLElement | null>, options: IntersectionObserverInit) => {
    const [isInView, setIsInView] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target); 
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return isInView;
};

// --- ÁTALAKÍTVA: Nincs Animáció, Azonnali Érték megjelenítése ---
function StaticCounter({ value, isInView }: { value: number; isInView: boolean }) {
    // Az isInView állapotot használjuk a feltételes megjelenítésre
    return <>{isInView ? value : 0}</>;
}

// --- CSS-alapú Csillogás Animáció ---
const IconShineEffect: React.FC<{ delay: number, isParentInView: boolean }> = ({ delay, isParentInView }) => {
    if (!isParentInView) return null;
    return (
        <div
            className="absolute inset-0 w-full h-full overflow-hidden rounded-full"
            style={{ animationDelay: `${delay}s` }}
        >
            <div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent shine-animation"
            />
        </div>
    );
};


const stats = [
  { value: 150, label: "Elégedett Ügyfél", suffix: "", icon: UserGroupIcon },
  { value: 150, label: "Elkerült Büntetés", suffix: "", icon: ShieldCheckIcon },
];

interface BackgroundElementStyle extends React.CSSProperties {}

const StatsCounterSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement | null>(null); 
  const isInView = useInViewObserver(sectionRef, { threshold: 0.3 }); 
  
  const [backgroundElementStyles, setBackgroundElementStyles] = useState<BackgroundElementStyle[]>([]);
  
  useEffect(() => {
    const styles: BackgroundElementStyle[] = [...Array(3)].map((_, i) => ({
      width: `${300 + Math.random() * 400}px`,
      height: `${300 + Math.random() * 400}px`,
      backgroundColor: i % 2 === 0 ? 'rgba(3, 186, 190, 0.07)' : 'rgba(14, 116, 144, 0.07)',
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      animationDuration: `${20 + Math.random() * 15}s`,
      animationDelay: `-${Math.random() * 10}s`,
    }));
    setBackgroundElementStyles(styles);
  }, []);


  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
        
        /* Teljesítmény-optimalizált CSS */
        .cta-grid-pattern {
            background-image: linear-gradient(rgba(203, 213, 225, 0.05) 1px, transparent 1px),
                              linear-gradient(to right, rgba(203, 213, 225, 0.05) 1px, transparent 1px);
            background-size: 4rem 4rem;
        }

        /* 1. Háttér mozgás animáció */
        @keyframes subtle-move {
            0% { transform: translate(0, 0) scale(0.7); opacity: 0; }
            33% { transform: translate(5%, 10%) scale(1.2); opacity: 1; }
            66% { transform: translate(-5%, -10%) scale(0.9); opacity: 0.5; }
            100% { transform: translate(0, 0) scale(0.7); opacity: 0; }
        }
        .background-blob {
            animation-name: subtle-move;
            animation-iteration-count: infinite;
            animation-timing-function: ease-in-out;
            animation-direction: alternate;
            filter: blur(3rem);
        }

        /* 2. Fejlécek animációja */
        .fade-in-up {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.7s ease-out, transform 0.7s ease-out;
        }
        .fade-in-up.visible {
            opacity: 1;
            transform: translateY(0);
        }

        /* 3. Statisztika kártyák és ikonok animációja */
        .stat-card {
            opacity: 0;
            transform: translateY(50px);
            transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), scale 0.3s, box-shadow 0.3s;
        }
        .stat-card.visible {
             opacity: 1;
             transform: translateY(0);
        }
        .stat-card:hover {
            transform: scale(1.08) translateY(-8px);
        }
        .stat-icon-wrapper {
            transform: scale(0);
            transition: transform 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .stat-icon-wrapper.visible {
            transform: scale(1);
        }

        /* 4. Csillogás animáció */
        @keyframes shine {
            0% { opacity: 0; transform: translateX(-150%); }
            10% { opacity: 0.7; }
            50% { opacity: 0; transform: translateX(150%); }
            100% { opacity: 0; }
        }
        .shine-animation {
            animation-name: shine;
            animation-duration: 0.6s;
            animation-timing-function: linear;
            animation-iteration-count: 1;
            animation-fill-mode: forwards;
        }
        /* A szülő div a késleltetésért felel: */
        .stat-icon-wrapper > div:last-child {
            animation-delay: var(--delay, 0s); 
            opacity: 0;
        }

        /* 5. CTA kártya */
        .cta-card {
            opacity: 0;
            transform: scale(0.8);
            transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s;
        }
        .cta-card.visible {
            opacity: 1;
            transform: scale(1);
        }
        .cta-card:hover {
            transform: scale(1.02);
            box-shadow: 0 0 40px rgba(239, 68, 68, 0.8);
        }

      `}</style>
      <section ref={sectionRef} className="pt-24 sm:pt-32 pb-24 sm:pb-32 font-['Poppins',_sans-serif] bg-slate-900 text-white relative overflow-hidden">
        
        {/* Hullám Felül */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1440 160"
              preserveAspectRatio="none"
              className="relative block w-full h-[120px] sm:h-[150px]"
          >
              <path 
                 d="M0,32 C120,80 240,112 360,112 C480,112 600,80 720,64 C840,48 960,80 1080,96 C1200,112 1320,96 1440,80 L1440,0 L0,0 L0,32 Z" 
                 fill="#ffffff"
              ></path>
          </svg>
        </div>

        {/* Dekoratív Nyilak */}
        <div className="absolute top-0 left-0 w-full h-[100px] pointer-events-none z-10">
            <div
                className="absolute w-36 h-36 text-cyan-500" 
                style={{ top: '100px', left: '10%', transform: 'translateY(-50%) rotate(205deg)' }} 
            >
                <IoArrowUndoSharp className="w-full h-full" />
            </div>
        </div>
        <div className="absolute w-36 h-36 text-cyan-500 pointer-events-none z-20" 
            style={{ 
                top: '50%', 
                right: '15%', 
                transform: 'translateY(-50%) rotate(150deg)'
            }}
        >
            <IoArrowRedo className="w-full h-full" />
        </div>

        {/* Háttér Mintázat és Blur Elemetk */}
        <div className="absolute inset-0 cta-grid-pattern z-0"></div>
        {backgroundElementStyles.map((style, i) => (
            <div
              key={i}
              className="absolute rounded-full background-blob"
              style={style}
            />
        ))}
        
        <div className="container mx-auto px-6 relative z-10">
           <div className="text-center mb-16 lg:mb-20">
              {/* Fejléc Animáció (CSS) */}
              <h2 
                  className={`text-4xl lg:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-400 mb-4 fade-in-up ${isInView ? 'visible' : ''}`}
                  style={{ transitionDelay: '0.1s' }}
              >
                  Eredményeink <span className='text-white'>számokban:</span>
              </h2>
              {/* Bevezető Szöveg Animáció (CSS) */}
              <p 
                  className={`text-lg text-slate-300 max-w-2xl mx-auto fade-in-up ${isInView ? 'visible' : ''}`}
                  style={{ transitionDelay: '0.25s' }}
              >
                  Fontos számunkra, hogy az ügyfeleink ne stresszeljenek egy ellenőrzés során.
              </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-16 sm:gap-y-12 gap-x-8 text-center">
              {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`flex flex-col items-center stat-card ${isInView ? 'visible' : ''}`}
                    style={{ transitionDelay: `${index * 0.15 + 0.4}s` }}
                >
                     {/* Ikon Animáció (CSS) */}
                     <div 
                        className={`relative mb-5 p-4 bg-white/10 rounded-full ring-2 ring-white/20 shadow-lg stat-icon-wrapper ${isInView ? 'visible' : ''}`}
                        style={{ transitionDelay: `${index * 0.15 + 0.6}s` }}
                     >
                        <stat.icon className="w-10 h-10 text-cyan-400" />
                        <IconShineEffect delay={index * 0.15 + 1.2} isParentInView={isInView} />
                     </div>
                    
                    <div className="text-5xl lg:text-7xl font-extrabold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                        {/* STATIKUS MEGJELENÍTÉS */}
                        <StaticCounter value={stat.value} isInView={isInView} />
                        {stat.suffix}
                    </div>
                    <div className="text-base lg:text-xl font-medium text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Kártya Animáció (CSS) */}
          <div
            className={`mt-20 p-8 sm:p-10 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl shadow-2xl border-2 border-red-500 text-center relative overflow-hidden cta-card ${isInView ? 'visible' : ''}`}
            style={{ transitionDelay: '1.0s' }}
          >
            <div className="absolute inset-0 bg-white/5 opacity-20 transform -skew-y-12 scale-150"></div>
            <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-black leading-tight relative z-10">
              Egyetlen büntetés megközelítőleg
            </p>
            <p className="text-white text-4xl sm:text-5xl lg:text-6xl font-black mt-2 relative z-10">
              <span className="text-yellow-300 drop-shadow-lg">2 000 000 Ft</span> is lehet!
            </p>
            <p className="text-red-200 text-base sm:text-lg mt-4 relative z-10">
            Ne kockáztass - légy felkészült!
            </p>
          </div>

        </div>
        {/* Sötét Hullám Alul */}
        <div 
          className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] z-20"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="relative block w-full h-[60px] sm:h-[100px] transform rotate-180"
            >
                <path d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.3-37.5 74.18-4.82 148.64 16.54 221.58 35.85 72.94 19.31 148.8 31.54 223.32 23.33 74.52-8.21 146.43-39.22 215.1-66.21L1200 0H0z" fill="#0f172a"></path>
            </svg>
        </div>
      </section>
    </>
  );
};

export default StatsCounterSection;