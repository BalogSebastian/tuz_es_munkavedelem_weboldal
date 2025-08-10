'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheckIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  BoltIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  GlobeAltIcon,
  XMarkIcon,
  CheckCircleIcon,
  PhoneIcon,
  FireIcon as FireIconSolid
} from '@heroicons/react/24/outline'; // Megtartjuk az outline ikonokat
import { SparklesIcon } from '@heroicons/react/24/solid';
import { IoArrowUndoSharp, IoArrowRedo } from "react-icons/io5";

const FireFlameIcon = ({ className }: { className?: string }) => {
    return (
        <div className={className}>
            <FireIconSolid className="w-full h-full text-[#E53E3E]" />
        </div>
    );
};


const accentColor = {
  base: '#03BABE',
  bg: 'bg-[#03BABE]',
  text: 'text-[#03BABE]',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  shadow: 'shadow-cyan-500/40',
  hoverShadow: 'hover:shadow-cyan-400/60',
  focusRingOffset: 'focus:ring-offset-slate-100',
};

const servicesData = [
  { id: 1, title: "Tűzvédelem ", description: "Teljes szabályzatok kidolgozása, elektromos rendszerek biztonsági vizsgálata.", icon: ExclamationTriangleIcon, colorName: "red", gradientClasses: "from-red-500 to-rose-500", textColor: "text-red-700", backSideText: "Teljes körű munkahelyi kockázatértékelés készítése a jogszabályi előírásoknak megfelelően, javaslatokkal a kockázatok csökkentésére.", price: "Egyedi árajánlat" },
  { id: 2, title: "Munkavédelem", description: " Munkavédelemi kockázatok kezelése és elemzése, szabályzatok és a megelőzési intézkedések kidolgozása.", icon: BoltIcon, colorName: "blue", gradientClasses: "from-blue-500 to-cyan-500", textColor: "text-blue-700", backSideText: "Szabványossági felülvizsgálat, érintésvédelmi mérések elvégzése és dokumentálása minősítő irattal.", price: "12.000 Ft-tól" },
  { id: 3, title: "HACCP", description: "Higiéniai előírások kidolgozása, bevezetése, és folyamatos felügyelete.", icon: ClipboardDocumentCheckIcon, colorName: "yellow", gradientClasses: "from-amber-400 to-orange-500", textColor: "text-amber-700", backSideText: "A munkakörhöz és munkahelyhez igazított tematika, hatékony ismeretátadás, dokumentált oktatás.", price: "20.000 Ft/csoporttól" },
  { id: 4, title: "Oktatások", description: "Interaktív elméleti képzések, a biztonságért és a nyugalomért.", icon: AcademicCapIcon, colorName: "green", gradientClasses: "from-green-500 to-emerald-500", textColor: "text-green-700", backSideText: "Teljes körű HACCP dokumentáció elkészítése, helyszíni tanácsadás és belső auditok elvégzése.", price: "Egyedi árajánlat" },
];

interface ServiceCardProps {
  service: typeof servicesData[0];
}

const FlippableServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-full h-[320px] sm:h-[340px] md:h-[360px] cursor-pointer group"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="relative w-full h-full"
        style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
            transition: 'transform 0.7s ease-in-out',
        }}
      >
        {/* Kártya Előlapja */}
        <div
          className="absolute w-full h-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 pt-16 text-center flex flex-col border border-slate-100"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-full inline-flex items-center justify-center bg-gradient-to-br ${service.gradientClasses} shadow-lg ring-4 ring-white transition-all duration-300 ease-out group-hover:ring-slate-100`}
          >
            <service.icon className="w-10 h-10 text-white" aria-hidden="true" />
          </div>
          <h3 className={`text-2xl font-semibold ${service.textColor} mb-3 mt-4`}>{service.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-4 line-clamp-3 sm:line-clamp-4">
            {service.description}
          </p>
          <div
            className="mt-auto text-xs text-gray-500 group-hover:text-gray-800 transition-colors flex items-center justify-center group-hover:font-medium"
          >
            Kattints a részletekért
            <span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1">➔</span>
          </div>
        </div>

        {/* Kártya Hátlapja */}
        <div
          className={`absolute w-full h-full rounded-2xl shadow-xl p-6 sm:p-8 text-white flex flex-col justify-center items-center text-center bg-gradient-to-br ${service.gradientClasses}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
          <p className="text-base mb-6 leading-relaxed px-2 flex-grow custom-scroll overflow-y-auto max-h-[160px] sm:max-h-[180px]">
            {service.backSideText}
          </p>
          <p className={`text-xl font-black ${service.textColor} bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md mt-auto`}>
            {service.price}
          </p>
        </div>
      </div>
    </div>
  );
};

const ServiceHighlightCards: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
        .custom-scroll::-webkit-scrollbar {
            width: 5px;
        }
        .custom-scroll::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
        }
      `}</style>

      <div className="relative font-['Poppins',_sans-serif]">
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
            className="relative block w-full h-[60px] sm:h-[100px]"
          >
            <defs>
              <pattern id="gridPatternWave" x="0" y="0" width="48" height="48" patternUnits="userSpaceOnUse">
                <rect x="0" y="0" width="48" height="48" fill="#ffffff" />
                <path d="M0 0.5L48 0.5" stroke="rgba(3, 186, 190, 0.15)" strokeWidth="1" />
                <path d="M0.5 0L0.5 48" stroke="rgba(3, 186, 190, 0.15)" strokeWidth="1" />
              </pattern>
            </defs>
            <path d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.3-37.5 74.18-4.82 148.64 16.54 221.58 35.85 72.94 19.31 148.8 31.54 223.32 23.33 74.52-8.21 146.43-39.22 215.1-66.21L1200 0H0z" fill="url(#gridPatternWave)"></path>
          </svg>
        </div>
        
        <div className="absolute top-0 left-0 w-full h-[100px] pointer-events-none z-10">
            <div
                className="absolute w-36 h-36 text-cyan-500" 
                style={{ top: '60px', left: '10%', transform: 'translateY(-50%) rotate(205deg)' }} 
            >
                <IoArrowUndoSharp className="w-full h-full" />
            </div>
        </div>

        <section className="py-16 lg:py-24 bg-white font-['Poppins',_sans-serif] overflow-hidden pt-28 sm:pt-40">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative text-center mb-16 lg:mb-20">
              <FireFlameIcon className="absolute -top-12 right-4 lg:right-20 w-32 h-32  -z-0 hidden lg:block" />
              <h2 className="relative z-10 text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-4">
                Főbb <span className={accentColor.text}>szolgáltatásaink:</span>
              </h2>
              <p className="relative z-10 text-xl text-slate-600 max-w-3xl mx-auto">Jó helyen jársz! Itt mindent egy helyen megtalálsz!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {servicesData.map((service) => (
                <FlippableServiceCard key={service.id} service={service} />
              ))}
            </div>

            <div className="text-center mt-16 lg:mt-20">
              <Link href="/szolgaltatasok"
                className={`
                  inline-flex items-center
                  ${accentColor.bg} text-white
                  font-bold py-4 px-10 rounded-xl text-lg sm:text-xl
                  shadow-lg ${accentColor.shadow} ${accentColor.hoverShadow}
                  transition-all duration-300 ease-in-out
                  focus:outline-none focus:ring-4 ${accentColor.ring} ${accentColor.focusRingOffset}
                `}
              >
                <SparklesIcon className="w-6 h-6 mr-2" />
                Szolgáltatásaink Megtekintése
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceHighlightCards;