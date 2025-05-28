// components/sections/ProcessSteps.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
    ChatBubbleLeftRightIcon,
    DocumentCheckIcon,
    // A következő kettő újonnan importált ikon
    WrenchScrewdriverIcon,
    CreditCardIcon,
    // ArrowRightIcon itt nem szükséges az új gombhoz, de ha mégis, visszatehető
} from '@heroicons/react/24/outline';

// Az új, 4 lépéses folyamat
const steps = [
  { 
    step: 1, 
    icon: ChatBubbleLeftRightIcon, 
    title: "Konzultáció és Igényfelmérés", 
    description: "Részletesen átbeszéljük vállalkozása specifikus igényeit, céljait és a vonatkozó jogszabályi követelményeket." 
  },
  { 
    step: 2, 
    icon: DocumentCheckIcon, 
    title: "Szerződéskötés", 
    description: "Az egyeztetettek alapján elkészítjük a hivatalos megállapodást, mely rögzíti a vállalt szolgáltatásokat és feltételeket." 
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
    description: "A munka sikeres teljesítése és átadása után történik a díjazás. Igény esetén további támogatást és utánkövetést biztosítunk." 
  },
];

const cardEntranceVariants = {
  hiddenLeft: { opacity: 0, x: -80 },
  hiddenRight: { opacity: 0, x: 80 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
        duration: 0.7,
        ease: "easeOut" 
    }
  }
};

const iconContainerVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut", delay: 0.2 } }
}

// A brand narancssárga szín a konzisztencia érdekében
const brandOrange = '#DD520F';

const ProcessSteps: React.FC = () => {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-slate-50 to-slate-100 relative overflow-hidden"> {/* Háttér enyhén módosítva slate-100-ra alul */}
        {/* Háttér animációk (változatlan) */}
        <motion.div
            className="absolute top-10 left-[-15%] w-72 h-72 bg-orange-100 rounded-full filter blur-3xl opacity-20" // Enyhén narancsosítva
            animate={{ scale: [1, 1.1, 1], rotate: [0, 10, 0] }}
            transition={{ duration: 15, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' }}
        />
        <motion.div
             className="absolute bottom-10 right-[-15%] w-80 h-80 bg-sky-100 rounded-full filter blur-3xl opacity-20" // Enyhén kékesítve
             animate={{ scale: [1, 1.05, 1], rotate: [0, -15, 0] }}
             transition={{ duration: 18, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut', delay: 2 }}
        />
      <div className="container mx-auto px-6 relative z-10">
        {/* Fejléc (változatlan) */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">Együttműködésünk Folyamata</h2> {/* Méret ServiceHighlightCards-hoz igazítva */}
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Átlátható lépések a sikeres és biztonságos munkakörnyezetért.</p> {/* Méret ServiceHighlightCards-hoz igazítva */}
        </div>
        <div className="relative max-w-xl mx-auto lg:max-w-4xl">
          {/* Központi vonal - STÍLUS FRISSÍTVE */}
          <div className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-1 bg-gradient-to-b from-orange-200 via-orange-300 to-orange-200 rounded-full transform -translate-x-1/2 opacity-75"
            style={{ backgroundColor: brandOrange }} // Fallback, ha a gradient nem elég erős
          ></div>

          <div className="space-y-20">
            {steps.map((step, index) => (
              <motion.div
                key={step.step}
                className={`lg:flex items-center relative ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
                initial={index % 2 === 0 ? 'hiddenRight' : 'hiddenLeft'}
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
                variants={cardEntranceVariants}
              >
                {/* Ikon és Pont Szekció - STÍLUS FRISSÍTVE */}
                <div className={`w-full lg:w-1/2 flex mb-8 lg:mb-0 ${index % 2 === 0 ? 'lg:justify-start lg:pl-[calc(50%+3rem)]' : 'lg:justify-end lg:pr-[calc(50%+3rem)]'}`}>
                  <motion.div
                    className="relative inline-block"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.6 }}
                    transition={{ delay: 0.1 + index * 0.05 }} // Enyhe késleltetés, hogy ne egyszerre jöjjenek
                    variants={iconContainerVariants}
                  >
                    <div className={`hidden lg:block absolute top-1/2 ${index % 2 === 0 ? 'left-[-5.75rem]' : 'right-[-5.75rem]'} transform -translate-y-1/2 w-5 h-5 bg-white rounded-full z-10 shadow-md`}
                         style={{ borderColor: brandOrange, borderWidth: '2px' }} // Pont színe
                    ></div>
                    <div className="bg-gradient-to-br from-white to-slate-100 p-6 rounded-full inline-flex items-center justify-center shadow-xl border border-gray-100 ring-8 ring-white/50">
                       <span className={`absolute -top-3 ${index % 2 === 0 ? '-right-3' : '-left-3'} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-20 ring-4 ring-white`}
                             style={{ backgroundColor: brandOrange }} // Lépésszám háttérszíne
                       >
                          {step.step}
                       </span>
                       <step.icon className="w-14 h-14" style={{ color: brandOrange }} aria-hidden="true" /> {/* Ikon színe */}
                    </div>
                  </motion.div>
                </div>

                {/* Szöveges Tartalom Szekció (stílusa lényegében maradt, illeszkedik) */}
                <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-10' : 'lg:pl-10'}`}>
                  <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300"> {/* Enyhe hover effekt a shadow-ra */}
                    <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ÚJ SZÖVEG A LÉPÉSEK ALATT */}
        <div className="text-center mt-16 lg:mt-20 px-4">
            <p className="text-lg md:text-xl text-gray-700 font-medium max-w-xl mx-auto">
                Igen jól látod, nálunk csak a munka befejezése után kell fizetni!
            </p>
        </div>

        {/* ÚJ CTA GOMB */}
        <div className="text-center mt-10 lg:mt-12">
          <button
            type="button"
            className={`
              bg-[#DD520F] hover:bg-orange-700 text-white 
              font-semibold py-4 px-10 rounded-lg text-lg sm:text-xl 
              shadow-md hover:shadow-lg 
              transition-all duration-300 ease-in-out 
              focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 
              transform hover:scale-105 active:scale-95
            `}
          >
            Ingyenes konzultációt foglalok
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProcessSteps;