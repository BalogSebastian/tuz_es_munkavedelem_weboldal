// components/sections/FaqAccordion.tsx
'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Hozzáadva az animációkhoz, ha szükséges (bár a jelenlegi CSS transitionökkel működik)

// Brand színek a konzisztencia érdekében
const accentColor = {
  base: '#DD520F', // Hex a közvetlen stílusokhoz
  bg: 'bg-[#DD520F]',
  textLight: 'text-white', // Szöveg a sötét brand színen
  textDark: 'text-orange-700', // Sötétebb narancs szöveghez világosabb alapon
  hoverBg: 'hover:bg-orange-700', // Sötétebb narancs hoverhez
  ring: 'focus-visible:ring-orange-500',
  borderLight: 'border-orange-300', // Világosabb narancs kerethez
  ringLight: 'ring-orange-200',     // Nagyon világos narancs ringhez
  textHover: 'group-hover:text-orange-600',
  iconOpen: 'text-orange-600',
  iconHover: 'group-hover:text-orange-500',
  iconBgHover: 'group-hover:bg-orange-100',
};

const faqItems = [
  { question: "Milyen gyakran kell munkavédelmi oktatást tartani?", answer: "A munkavédelmi oktatást munkába álláskor, munkahely vagy munkakör megváltozásakor, valamint legalább évente ismétlődően meg kell tartani. Bizonyos esetekben (pl. technológia változás) soron kívüli oktatás is szükséges lehet." },
  { question: "Kötelező minden vállalkozásnak tűzvédelmi szabályzatot készíteni?", answer: "Nem minden esetben. Tűzvédelmi szabályzatot kell készíteni, ha a munkavállalók létszáma meghaladja az 5 főt, vagy ha 50 főnél több személy befogadására alkalmas létesítményt üzemeltetnek, illetve fokozottan tűz- vagy robbanásveszélyes besorolású anyagot használnak." },
  { question: "Mi az a kockázatértékelés és miért fontos?", answer: "A kockázatértékelés egy olyan folyamat, amely során felmérjük a munkahelyen előforduló potenciális veszélyeket és értékeljük az azokból adódó kockázatokat. Célja a munkabalesetek és egészségkárosodások megelőzése, valamint a szükséges védőintézkedések meghatározása. Minden munkáltatónak kötelező elvégeznie." },
  { question: "Mennyi idő alatt készül el egy munkavédelmi szabályzat?", answer: "Ez nagyban függ a vállalkozás méretétől, tevékenységétől és a meglévő dokumentáció állapotától. Egy alapos felmérés után tudunk pontosabb időbecslést adni, de általában néhány naptól 1-2 hétig terjedhet." },
  { question: "Milyen szankciókra számíthatok, ha nem felelek meg az előírásoknak?", answer: "A hatóságok a hiányosságok súlyosságától függően figyelmeztetéstől kezdve a tevékenység felfüggesztésén át a jelentős összegű bírság kiszabásáig terjedő szankciókat alkalmazhatnak. A megelőzés mindig költséghatékonyabb." },
];

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-red-50 via-slate-50 to-blue-50"> {/* Háttér meghagyva */}
      <div className="container mx-auto px-6">
        <div className="text-center mb-12 lg:mb-16">
          {/* MÓDOSÍTVA: Fejléc stílusa */}
          <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4`}>Gyakran Ismételt Kérdések</h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto`}>Válaszok a leggyakoribb munka- és tűzvédelemmel kapcsolatos kérdésekre.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-5">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                // MÓDOSÍTVA: Nyitott állapot stílusa a brand színekkel
                className={`rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border ${isOpen ? `bg-white ${accentColor.borderLight} ring-1 ${accentColor.ringLight}` : 'bg-white border-transparent'}`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  // MÓDOSÍTVA: Fókusz stílus a brand színnel
                  className={`w-full flex justify-between items-center p-6 text-left focus:outline-none focus-visible:ring-2 ${accentColor.ring} focus-visible:ring-offset-1 group`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  {/* MÓDOSÍTVA: Kérdés szövegének színei */}
                  <span className={`text-lg font-semibold transition-colors duration-200 ${isOpen ? accentColor.textDark : `text-gray-800 ${accentColor.textHover}`}`}>
                    {item.question}
                  </span>
                  {/* MÓDOSÍTVA: Ikon háttere és színe */}
                  <span className={`ml-4 flex-shrink-0 p-1 bg-gray-100 ${accentColor.iconBgHover} rounded-full`}>
                    <ChevronDownIcon
                      className={`w-5 h-6 transition-transform duration-300 ease-in-out ${isOpen ? `transform rotate-180 ${accentColor.iconOpen}` : `text-gray-400 ${accentColor.iconHover}`}`}
                    />
                  </span>
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="px-6 pb-6 pt-0 text-gray-700 leading-relaxed prose prose-sm max-w-none">
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16 lg:mt-20"> {/* Növelt térköz a gomb előtt */}
            <p className="text-lg text-gray-600 mb-6">Nem találta a választ? Vegye fel velünk a kapcsolatot!</p> {/* Nagyobb betűméret és térköz */}
            {/* MÓDOSÍTVA: Kapcsolat gomb stílusa a brand CTA stílushoz igazítva */}
            <Link href="/kapcsolat" 
                  className={`
                    inline-block ${accentColor.bg} ${accentColor.hoverBg} ${accentColor.textLight} 
                    font-semibold py-3 px-8 rounded-lg text-base 
                    shadow-md hover:shadow-lg 
                    transition-all duration-300 ease-in-out 
                    focus:outline-none focus:ring-2 ${accentColor.ring} focus:ring-opacity-75 
                    transform hover:scale-105 active:scale-95
                  `}
            >
                Kapcsolatfelvétel
            </Link>
        </div>

      </div>
    </section>
  );
};

export default FaqAccordion;