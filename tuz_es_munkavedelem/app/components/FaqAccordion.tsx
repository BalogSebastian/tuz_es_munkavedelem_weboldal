// components/sections/FaqAccordion.tsx
'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Link from 'next/link'

// Placeholder GYIK adatok - Cseréld le a sajátjaidra!
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
    // --- Szekció új háttérrel ---
    <section className="py-16 lg:py-24 bg-gradient-to-br from-red-50 via-slate-50 to-blue-50">
      <div className="container mx-auto px-6">
        {/* --- Fejléc változatlan --- */}
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl lg:text-4xl font-semibold text-gray-800 mb-3">Gyakran Ismételt Kérdések</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">Válaszok a leggyakoribb munka- és tűzvédelemmel kapcsolatos kérdésekre.</p>
        </div>

        {/* --- Accordion elemek új stílussal --- */}
        <div className="max-w-3xl mx-auto space-y-5"> {/* Enyhén növelt térköz */}
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                // Kártya stílusa: Lekerekítés, árnyék, finom keret nyitott állapotban
                className={`rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out border ${isOpen ? 'bg-white border-red-200 ring-1 ring-red-100' : 'bg-white border-transparent'}`}
              >
                {/* Kérdés - Gombként működik */}
                <button
                  onClick={() => toggleItem(index)}
                  // Styling: Nagyobb padding, group class a hover effekthez
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-1 group"
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                >
                  {/* Kérdés szövege: Szín változik nyitott állapotban */}
                  <span className={`text-lg font-semibold transition-colors duration-200 ${isOpen ? 'text-red-700' : 'text-gray-800 group-hover:text-red-600'}`}>
                    {item.question}
                  </span>
                  {/* Ikon: Forog és színt vált */}
                  <span className="ml-4 flex-shrink-0 p-1 bg-gray-100 group-hover:bg-red-100 rounded-full">
                    <ChevronDownIcon
                      className={`w-5 h-6 transition-transform duration-300 ease-in-out ${isOpen ? 'transform rotate-180 text-red-600' : 'text-gray-400 group-hover:text-red-500'}`}
                    />
                  </span>
                </button>

                {/* Válasz - Feltételesen megjelenő, animált */}
                {/* Javított animáció: opacity és max-height */}
                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  {/* Padding a válasznak, sötétebb szövegszín */}
                  <div className="px-6 pb-6 pt-0 text-gray-700 leading-relaxed prose prose-sm max-w-none">
                    {/* A 'prose' osztály segít a bekezdések, listák stb. alap formázásában */}
                    <p>{item.answer}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Opcionális: További segítség link/gomb */}
        <div className="text-center mt-12">
            <p className="text-gray-600 mb-4">Nem találta a választ? Vegye fel velünk a kapcsolatot!</p>
            <Link href="/kapcsolat" className="inline-block bg-red-600 hover:bg-red-700 text-white font-medium py-2.5 px-6 rounded-lg transition duration-200 shadow hover:shadow-md">
                Kapcsolatfelvétel
            </Link>
        </div>

      </div>
    </section>
  );
};

export default FaqAccordion;
