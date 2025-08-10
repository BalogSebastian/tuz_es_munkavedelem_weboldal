'use client';

import React, { useState } from 'react';
import { ChevronDownIcon, ExclamationCircleIcon, SparklesIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';

// --- FŐ KOMPONENS ---
const accentColor = {
  text: 'text-[#03BABE]', textDark: 'text-cyan-800', hoverBg: 'hover:bg-cyan-600', ring: 'focus-visible:ring-cyan-500',
  borderLightOpen: 'border-cyan-400', ringLightOpen: 'ring-cyan-500/20', textHover: 'group-hover:text-cyan-600',
  iconOpen: 'text-cyan-600', iconHover: 'group-hover:text-cyan-500', iconBgHover: 'group-hover:bg-cyan-100/60',
  questionBgHover: 'group-hover:bg-slate-50/50',
};

const faqItems = [
    { question: "Milyen gyakran kell munkavédelmi oktatást tartani?", answer: "A munkavédelmi oktatást munkába álláskor, munkahely vagy munkakör megváltozásakor, valamint legalább évente ismétlődően meg kell tartani. Bizonyos esetekben (pl. technológia változás) soron kívüli oktatás is szükséges lehet.", isImportant: true },
    { question: "Kötelező minden vállalkozásnak tűzvédelmi szabályzatot készíteni?", answer: "Nem minden esetben. Tűzvédelmi szabályzatot kell készíteni, ha a munkavállalók létszáma meghaladja az 5 főt, vagy ha 50 főnél több személy befogadására alkalmas létesítményt üzemeltetnek, illetve fokozottan tűz- vagy robbanásveszélyes besorolású anyagot használnak." },
    { question: "Mi az a kockázatértékelés és miért fontos?", answer: "A kockázatértékelés egy olyan folyamat, amely során felmérjük a munkahelyen előforduló potenciális veszélyeket és értékeljük az azokból adódó kockázatokat. Célja a munkabalesetek és egészségkárosodások megelőzése, valamint a szükséges védőintézkedések meghatározása. Minden munkáltatónak kötelező elvégeznie.", isImportant: true },
    { question: "Mennyi idő alatt készül el egy munkavédelmi szabályzat?", answer: "Ez nagyban függ a vállalkozás méretétől, tevékenységétől és a meglévő dokumentáció állapotától. Egy alapos felmérés után tudunk pontosabb időbecslést adni, de általában néhány naptól 1-2 hétig terjedhet." },
    { question: "Milyen szankciókra számíthatok, ha nem felelek meg az előírásoknak?", answer: "A hatóságok a hiányosságok súlyosságától függően figyelmeztetéstől kezdve a tevékenység felfüggesztésén át a jelentős összegű bírság kiszabásáig terjedő szankciókat alkalmazhatnak. A megelőzés mindig költséghatékonyabb." },
];

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleItem = (index: number) => { setOpenIndex(openIndex === index ? null : index); };

  return (
    <>
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
    `}</style>
    <section
      className="py-24 lg:py-32 font-['Poppins',_sans-serif] relative"
      style={{
        backgroundColor: '#ffffff',
        backgroundImage: `linear-gradient(rgba(3, 186, 190, 0.15) 1px, transparent 1px), linear-gradient(to right, rgba(3, 186, 190, 0.15) 1px, transparent 1px)`,
        backgroundSize: '3.5rem 3.5rem',
      }}
    >
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-[0] z-10">
          <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1200 120"
              preserveAspectRatio="none"
              className="relative block w-full h-[100px] sm:h-[150px]"
          >
              <defs>
                  <pattern id="gridPatternDarkFaq" patternUnits="userSpaceOnUse" width="64" height="64">
                      <rect width="64" height="64" fill="#0f172a" />
                      <path d="M 64 0 L 0 0 0 64" fill="none" stroke="rgba(203, 213, 225, 0.05)" strokeWidth="1" />
                  </pattern>
              </defs>
              <path
                  d="M-0.00,49.98 C149.99,150.00 249.20,-49.98 500.00,49.98 C749.20,150.00 850.00,-50.00 1200.00,49.98 L1200.00,0.00 L-0.00,0.00 Z"
                  fill="url(#gridPatternDarkFaq)"
              ></path>
          </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className={`text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4`}>
            Gyakran Ismételt <span className={accentColor.text}>Kérdések</span>
          </h2>
          <p className={`text-xl text-slate-600 max-w-3xl mx-auto`}>Válaszok a leggyakoribb munka- és tűzvédelemmel kapcsolatos kérdésekre.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-5">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border overflow-hidden backdrop-blur-md
                            ${isOpen ? `bg-white/80 ${accentColor.borderLightOpen} ring-4 ${accentColor.ringLightOpen}` : 'bg-white/60 border-transparent'}`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className={`w-full flex justify-between items-center p-5 sm:p-6 text-left focus:outline-none ${accentColor.ring} focus-visible:ring-offset-2 group ${accentColor.questionBgHover} transition-colors duration-150`}
                  aria-expanded={isOpen}
                >
                  <span className={`flex items-center text-md sm:text-lg font-semibold transition-colors duration-200 ${isOpen ? accentColor.textDark : `text-slate-800 ${accentColor.textHover}`}`}>
                    {item.isImportant && (
                        <span className="mr-3">
                            <ExclamationCircleIcon className="w-6 h-6 text-red-500/80" />
                        </span>
                    )}
                    {item.question}
                  </span>
                  <div
                    className={`ml-4 flex-shrink-0 p-2 ${isOpen ? 'bg-cyan-100/80' : 'bg-slate-100/80'} ${accentColor.iconBgHover} rounded-full shadow-sm group-hover:shadow-md transition-all duration-200`}
                  >
                    <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ease-in-out ${isOpen ? `transform rotate-180 ${accentColor.iconOpen}` : `text-gray-500 ${accentColor.iconHover}`}`} />
                  </div>
                </button>
                  {isOpen && (
                    <div key="content" className="overflow-hidden">
                      <div className="px-6 pb-6 pt-2 text-slate-700 leading-relaxed prose prose-cyan max-w-none">
                        <p>{item.answer}</p>
                      </div>
                    </div>
                  )}
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16 lg:mt-20">
            <p className="text-lg text-slate-600 mb-6">Nem találta a választ? Vegye fel velünk a kapcsolatot!</p>
            <div>
                <Link href="/kapcsolat"
                    className={`inline-flex items-center bg-[#03BABE] hover:bg-cyan-600 text-white font-semibold py-4 px-10 rounded-xl text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 ${accentColor.ring} focus:ring-offset-2`}
                >
                    <SparklesIcon className="w-6 h-6 mr-2" />
                    Kapcsolatfelvétel
                </Link>
            </div>
        </div>
      </div>
    </section>
    </>
  );
};

export default FaqAccordion;