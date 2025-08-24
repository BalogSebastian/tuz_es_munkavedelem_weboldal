'use client';

import React from 'react';
import {
    ChatBubbleLeftRightIcon,
    DocumentCheckIcon,
    WrenchScrewdriverIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';
import { FaArrowTrendDown } from 'react-icons/fa6';
import { SparklesIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

// --- DEKORATÍV SVG KOMPONENSEK ---
const BlueprintCorner: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            className={className} width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M150 0H0V150" stroke="currentColor" strokeWidth="2"/>
            <path d="M120 0H0V120" stroke="currentColor" strokeWidth="1"/>
            <path d="M90 0H0V90" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="0" cy="0" r="5" fill="currentColor"/>
        </svg>
    );
};

const accentColor = { base: '#03BABE', bg: 'bg-[#03BABE]', text: 'text-[#03BABE]', hoverBg: 'hover:bg-cyan-600', ring: 'focus:ring-cyan-500', shadow: 'shadow-cyan-500/40', hoverShadow: 'hover:shadow-cyan-400/60', focusRingOffset: 'focus:ring-offset-slate-50' };

// --- JAVÍTOTT LÉPÉSEK (A kért tartalommal) ---
const steps = [ 
    { 
        step: 1, 
        icon: ChatBubbleLeftRightIcon, 
        title: "Konzultáció és Igényfelmérés", 
        description: "Részletesen átbeszéljük vállalkozás specifikus igényeit, céljait és a vonatkozó jogszabályi követelményeket." 
    }, 
    { 
        step: 2, 
        icon: DocumentCheckIcon, 
        title: "Szerződéskötés", 
        description: "Az egyeztetettek alapján mi elkészítjük a hivatalos megállapodást, amely rögzíti a vállalt szolgáltatásokat és feltételeket." 
    }, 
    { 
        step: 3, 
        icon: WrenchScrewdriverIcon, 
        title: "A Munka Kivitelezése", 
        description: "Szakértő csapatunk precízen és a megbeszélt ütemezés szerint elvégzi a szerződésben foglalt feladatokat." 
    }, 
    { 
        step: 4, 
        icon: CreditCardIcon, 
        title: "Fizetés és Utánkövetés", 
        description: "A munka sikeres teljesítése és átadása után történik a díjazás. A későbbiekben pedig minden jogszabály módosításról informálunk, és minden határidőről értesítünk." 
    } 
];

const ProcessSteps: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
      `}</style>
      <section
        className="pt-20 lg:pt-28 pb-32 lg:pb-40 font-['Poppins',_sans-serif] relative z-20 overflow-hidden"
        style={{
            backgroundColor: '#ffffff',
            backgroundImage: `linear-gradient(rgba(3, 186, 190, 0.15) 1px, transparent 1px), linear-gradient(to right, rgba(3, 186, 190, 0.15) 1px, transparent 1px)`,
            backgroundSize: '3rem 3rem',
        }}
    >
        <BlueprintCorner className="absolute top-0 left-0 text-cyan-900/10 hidden md:block" />
        <BlueprintCorner className="absolute bottom-0 right-0 text-cyan-900/10 transform rotate-180 hidden md:block" />


        <div className="container mx-auto px-6 relative z-10">
          <div className="relative text-center mb-16 lg:mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Együttműködésünk <span className={accentColor.text}>Folyamata</span>
            </h2>
            {/* JAVÍTOTT: Két bekezdés helyett egy tömör leírás */}
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Átlátható közös munkát biztosítunk, ahol a munka befejezése után is folyamatosan kapcsolatban maradunk, és kezeljük az ügyeket, ellentétben azokkal, akik eltűnnek.
            </p>
          </div>
          <div className="relative max-w-xl mx-auto lg:max-w-4xl">
            <div
                className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-1 bg-gradient-to-b from-cyan-200 via-cyan-300 to-cyan-200 rounded-full transform -translate-x-1/2"
                style={{ transformOrigin: 'top' }}
            />

            <div className="space-y-20">
              {steps.map((step, index) => (
                <div
                  key={step.step}
                  className={`lg:flex items-center relative ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
                >
                  <div className={`w-full lg:w-1/2 flex mb-8 lg:mb-0 ${index % 2 === 0 ? 'lg:justify-start lg:pl-[calc(50%+3rem)]' : 'lg:justify-end lg:pr-[calc(50%+3rem)]'}`}>
                    <div className="relative inline-block">
                      <div
                           className="hidden lg:block absolute top-1/2 w-5 h-5 bg-white rounded-full z-10"
                           style={{ borderColor: accentColor.base, borderWidth: '2px', left: index % 2 === 0 ? 'auto' : 'calc(100% + 2rem)', right: index % 2 === 0 ? 'calc(100% + 2rem)' : 'auto' }}
                      />
                      <div className="bg-gradient-to-br from-white to-slate-100 p-6 rounded-full inline-flex items-center justify-center shadow-xl border border-gray-100 ring-8 ring-white/50">
                         <div className={`absolute -top-3 ${index % 2 === 0 ? '-right-3' : '-left-3'} ${accentColor.bg} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-20 ring-4 ring-white`}>
                           <span>{step.step}</span>
                         </div>
                         <step.icon className={`w-14 h-14 ${accentColor.text}`} aria-hidden="true" />
                      </div>
                    </div>
                  </div>

                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-10' : 'lg:pl-10'}`}>
                    <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 h-full">
                      <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16 lg:mt-20 px-4">
              <p className="text-lg md:text-xl text-slate-700 font-medium max-w-xl mx-auto">
              Igen jól látod, nálunk csak a munka befejezése után kell fizetni!
              </p>
          </div>

        <div className="text-center mt-10 lg:mt-12">
            <Link
                href="/kapcsolat"
                className={`
                    inline-flex items-center
                    ${accentColor.bg} ${accentColor.hoverBg} text-white
                    font-bold py-4 px-10 rounded-xl text-lg sm:text-xl
                    shadow-lg ${accentColor.shadow} ${accentColor.hoverShadow}
                    transition-all duration-300 ease-in-out
                    focus:outline-none focus:ring-4 ${accentColor.ring} focus:ring-offset-2 ${accentColor.focusRingOffset}
                `}
            >
              <SparklesIcon className="w-6 h-6 mr-2" />
              Ingyenes konzultációt foglalok
            </Link>
        </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 1200 120"
                preserveAspectRatio="none"
                className="relative block w-full h-[80px] sm:h-[120px]"
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

export default ProcessSteps;