// components/sections/FaqAccordion.tsx
'use client';

import React, { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// Brand színek
const accentColor = {
  base: '#DD520F',
  bg: 'bg-[#DD520F]',
  textLight: 'text-white',
  textDark: 'text-orange-700',
  hoverBg: 'hover:bg-orange-700',
  ring: 'focus-visible:ring-orange-500',
  borderLightOpen: 'border-orange-400',
  ringLightOpen: 'ring-orange-200',
  textHover: 'group-hover:text-orange-600',
  iconOpen: 'text-orange-600',
  iconHover: 'group-hover:text-orange-500',
  iconBgHover: 'group-hover:bg-orange-100',
  questionBgHover: 'group-hover:bg-slate-50',
};

const faqItems = [
  { question: "Milyen gyakran kell munkavédelmi oktatást tartani?", answer: "A munkavédelmi oktatást munkába álláskor, munkahely vagy munkakör megváltozásakor, valamint legalább évente ismétlődően meg kell tartani. Bizonyos esetekben (pl. technológia változás) soron kívüli oktatás is szükséges lehet." },
  { question: "Kötelező minden vállalkozásnak tűzvédelmi szabályzatot készíteni?", answer: "Nem minden esetben. Tűzvédelmi szabályzatot kell készíteni, ha a munkavállalók létszáma meghaladja az 5 főt, vagy ha 50 főnél több személy befogadására alkalmas létesítményt üzemeltetnek, illetve fokozottan tűz- vagy robbanásveszélyes besorolású anyagot használnak." },
  { question: "Mi az a kockázatértékelés és miért fontos?", answer: "A kockázatértékelés egy olyan folyamat, amely során felmérjük a munkahelyen előforduló potenciális veszélyeket és értékeljük az azokból adódó kockázatokat. Célja a munkabalesetek és egészségkárosodások megelőzése, valamint a szükséges védőintézkedések meghatározása. Minden munkáltatónak kötelező elvégeznie." },
  { question: "Mennyi idő alatt készül el egy munkavédelmi szabályzat?", answer: "Ez nagyban függ a vállalkozás méretétől, tevékenységétől és a meglévő dokumentáció állapotától. Egy alapos felmérés után tudunk pontosabb időbecslést adni, de általában néhány naptól 1-2 hétig terjedhet." },
  { question: "Milyen szankciókra számíthatok, ha nem felelek meg az előírásoknak?", answer: "A hatóságok a hiányosságok súlyosságától függően figyelmeztetéstől kezdve a tevékenység felfüggesztésén át a jelentős összegű bírság kiszabásáig terjedő szankciókat alkalmazhatnak. A megelőzés mindig költséghatékonyabb." },
];

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const faqItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const answerVariants = {
  hidden: { opacity: 0, height: 0, y: -10, transition: { duration: 0.3, ease: "easeOut" } },
  visible: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.4, ease: "easeIn" } },
};

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <motion.section 
      className="py-16 lg:py-24 bg-gradient-to-br from-red-50 via-slate-50 to-blue-50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-6">
        <motion.div 
          className="text-center mb-12 lg:mb-16"
          variants={faqItemVariants}
        >
          <h2 className={`text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4`}>Gyakran Ismételt Kérdések</h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto`}>Válaszok a leggyakoribb munka- és tűzvédelemmel kapcsolatos kérdésekre.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index}
                variants={faqItemVariants}
                className={`rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out border overflow-hidden ${isOpen ? `bg-white ${accentColor.borderLightOpen} ring-2 ${accentColor.ringLightOpen}` : 'bg-white border-transparent'}`}
              >
                <motion.button
                  onClick={() => toggleItem(index)}
                  className={`w-full flex justify-between items-center p-5 sm:p-6 text-left focus:outline-none ${accentColor.ring} focus-visible:ring-offset-1 group ${accentColor.questionBgHover} transition-colors duration-150`}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className={`text-md sm:text-lg font-semibold transition-colors duration-200 ${isOpen ? accentColor.textDark : `text-gray-800 ${accentColor.textHover}`}`}>
                    {item.question}
                  </span>
                  <motion.span
                    className={`ml-4 flex-shrink-0 p-1.5 bg-slate-100 ${accentColor.iconBgHover} rounded-full shadow-sm group-hover:shadow-md transition-all duration-200`}
                    whileHover={{scale:1.1}}
                  >
                    <ChevronDownIcon
                      className={`w-5 h-5 transition-transform duration-300 ease-in-out ${isOpen ? `transform rotate-180 ${accentColor.iconOpen}` : `text-gray-500 ${accentColor.iconHover}`}`}
                    />
                  </motion.span>
                </motion.button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${index}`}
                      key="content"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={answerVariants}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-2 text-gray-700 leading-relaxed prose prose-sm max-w-none">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div> 
            );
          })}
        </div>

        <motion.div 
            className="text-center mt-16 lg:mt-20"
            variants={faqItemVariants}
        >
            <p className="text-lg text-gray-600 mb-6">Nem találta a választ? Vegye fel velünk a kapcsolatot!</p>
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
        </motion.div>
      </div>
    </motion.section>
  );
};

export default FaqAccordion;