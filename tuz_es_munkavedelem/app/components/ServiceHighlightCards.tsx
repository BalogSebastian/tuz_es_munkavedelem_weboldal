// ServiceHighlightCards
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ExclamationTriangleIcon,
  BoltIcon as BoltIconOutline,
  ClipboardDocumentCheckIcon,
} from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid'; // Hozzáadva
import { FaHelmetSafety } from 'react-icons/fa6';


// --- CTA KONSTANSOK ---
const RED_ACCENT_COLOR = {
    baseHex: '#DC2626',
    bg: 'bg-red-600',
    textOnAccent: 'text-white',
    ring: 'focus-visible:ring-red-500',
    shadow: 'shadow-red-500/40',       // Hozzáadva
    hoverShadow: 'hover:shadow-red-400/60', // Hozzáadva
};

// --- EGYÉB SZÍNEK ÉS STÍLUSOK ---
const accentColor = {
  text: 'text-[#03BABE]',
};

// --- SZOLGÁLTATÁSI ADATOK ---
const servicesData = [
  // 1. VILLAMOSBIZTONSÁG
  {
    id: 4,
    title: "Villamosbiztonság",
    description: "Elvégezzük a méréseket a telephelyeden, és a jogszabálynak megfelelő jegyzőkönyvet készítünk róla, majd dokumentálunk számodra minden veszélyforrást, amivel megelőzheted az esetleges tűzeseteket.",
    icon: BoltIconOutline,
    gradientClasses: "from-blue-400 to-indigo-500",
    textColor: "text-blue-700",
    backSideText: "Helyszíni mérések elvégzése, dokumentálása, jegyzőkönyv elkészítése.",
    price: "40.000 Ft-tól"
  },
  // 2. TŰZVÉDELEM
  {
    id: 1,
    title: "Tűzvédelem",
    description: "Kidolgozzuk a telephelyre vonatkozó tűzvédelmi szabályokat, és elkészítjük a megfelelő menekülési útvonalat. Ezután egy oktatást készítünk a céged alkalmazottai számára.",
    icon: ExclamationTriangleIcon,
    gradientClasses: "from-red-500 to-rose-500",
    textColor: "text-red-700",
    backSideText: "Teljes tűzvédelmi szabályzat készítése a munkavállalók oktatásával.",
    price: "20.000 Ft-tól"
  },
  // 3. MUNKAVÉDELEM
  {
    id: 2,
    title: "Munkavédelem",
    description: "Megcsináljuk a munkahelyi kockázatok kezelésére vonatkozó szabályrendszert, illetve a cég teljes munkavédelmi szabályzatát, amiről oktatást készítünk a cég tevékenységére szabottan.",
    icon: FaHelmetSafety,
    gradientClasses: "from-amber-400 to-yellow-500",
    textColor: "text-amber-700",
    backSideText: "Teljes körű munkavédelmi kockázatértékelés készítése, szabályzattal és a munkavállalók oktatásával.",
    price: "30.000 Ft-tól"
  },
  // 4. HACCP
  {
    id: 3,
    title: "HACCP",
    description: "Kidolgozzuk a higiéniai előírásoknak megfelelő kézikönyvet, segítünk kialakítani a megfelelő munkaterületet, és megtanítunk minden munkavállalót a jogszabály szerinti helyes munkavégzésre.",
    icon: ClipboardDocumentCheckIcon,
    gradientClasses: "from-blue-500 to-cyan-500",
    textColor: "text-blue-700",
    backSideText: "Teljes jegyzőkönyv kidolgozása és bevezetése mérési naplókkal, és oktatással.",
    price: "15.000 Ft-tól"
  },
];

interface ServiceCardProps {
  service: typeof servicesData[0];
}

const FlippableServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const cardShadowClass = `shadow-xl border border-slate-100`;

  return (
    <div
      className="relative w-full h-[320px] sm:h-[340px] md:h-[360px] cursor-pointer group"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 ease-in-out`}
        style={{
            transformStyle: 'preserve-3d',
            transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <div
          className={`absolute w-full h-full bg-white rounded-2xl p-6 sm:p-8 pt-16 text-center flex flex-col ${cardShadowClass}`}
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <style>{`
        /* Optimalizált stílusok */
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
        .cta-button {
            transition: all 0.3s ease-in-out;
            box-shadow: 0 0 20px ${RED_ACCENT_COLOR.baseHex}40;
        }
        .cta-button:hover {
            transform: scale(1.02);
            box-shadow: 0 0 20px ${RED_ACCENT_COLOR.baseHex}60, 0 0 30px ${RED_ACCENT_COLOR.baseHex}40;
        }
        .cta-button:active {
            transform: scale(0.98);
        }
        .grid-pattern-light {
            background-image: linear-gradient(rgba(3, 186, 190, 0.15) 1px, transparent 1px),
                              linear-gradient(to right, rgba(3, 186, 190, 0.15) 1px, transparent 1px);
            background-size: 4rem 4rem;
        }
      `}</style>

      <div className="relative font-['Poppins',_sans-serif]">
        <section className="py-16 lg:py-24 bg-white font-['Poppins',_sans-serif] pt-28 sm:pt-40 relative grid-pattern-light">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative text-center mb-16 lg:mb-20">
            <h2 className="relative z-10 text-4xl lg:text-5xl font-black text-slate-900 tracking-normal mb-4">
                Főbb <span className='text-cyan-400'>szolgáltatásaink:</span>
              </h2>
              <p className="relative z-10 text-xl text-slate-600 max-w-3xl mx-auto">Jó helyen jársz! Itt mindent egy helyen megtalálsz!</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
              {servicesData.map((service) => (
                <FlippableServiceCard key={service.id} service={service} />
              ))}
            </div>

            {/* --- MÓDOSÍTOTT CTA SZEKCIÓ --- */}
            <div className="text-center mt-16 lg:mt-20 p-8">
              <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" target="_blank" rel="noopener noreferrer">
                <button
                    className={`
                        inline-flex items-center gap-3
                        ${RED_ACCENT_COLOR.bg} ${RED_ACCENT_COLOR.textOnAccent}
                        font-bold py-8 px-12 rounded-xl text-3xl
                        shadow-lg ${RED_ACCENT_COLOR.shadow} ${RED_ACCENT_COLOR.hoverShadow}
                        transition-all duration-300 ease-in-out
                        focus:outline-none focus:ring-4 ${RED_ACCENT_COLOR.ring} focus:ring-offset-2 focus:ring-offset-slate-50
                        cta-button
                    `}
                >
                    Foglalj egy ingyenes konzultációt!
                </button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default ServiceHighlightCards;