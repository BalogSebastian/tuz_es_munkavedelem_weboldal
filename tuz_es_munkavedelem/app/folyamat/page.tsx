'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    ChatBubbleLeftRightIcon,
    DocumentCheckIcon,
    WrenchScrewdriverIcon,
    CheckBadgeIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const accentColor = {
  text: 'text-cyan-500',
  gradientFrom: 'from-cyan-500',
  gradientTo: 'to-teal-400',
  bg: 'bg-cyan-500',
  ring: 'focus:ring-cyan-500',
};

// A gomb stílusdefiníciói, a kérésed alapján beillesztve
const ACCENT_COLOR_RED = {
    baseHex: '#DC2626',
    bg: 'bg-red-600',
    textOnAccent: 'text-white',
    ring: 'focus-visible:ring-red-500',
    shadow: 'shadow-red-500/40',
    hoverShadow: 'hover:shadow-red-400/60',
};

const processSteps = [
  {
    step: 1,
    icon: ChatBubbleLeftRightIcon,
    title: "Konzultáció és Igényfelmérés",
    description: "Minden sikeres partnerség egy alapos beszélgetéssel kezdődik. Egy díjmentes konzultáció során megismerjük vállalkozását, feltérképezzük az egyedi igényeket és a potenciális kockázatokat, hogy pontosan értsük, mire van szükséged."
  },
  {
    step: 2,
    icon: DocumentCheckIcon,
    title: "Szerződéskötés és Tervezés",
    description: "Az egyeztetettek alapján egy átlátható, minden részletre kiterjedő árajánlatot és szerződéstervezetet készítünk. Itt rögzítjük a vállalt szolgáltatásokat, a határidőket és a garanciákat, lásd nincsenek rejtett költségek. Első a bizalom!"
  },
  {
    step: 3,
    icon: WrenchScrewdriverIcon,
    title: "A Munka Kivitelezése",
    description: "Szakértő csapatunk precízen és a megbeszélt ütemezés szerint elvégzi a szerződésben foglalt feladatokat, legyen szó dokumentáció készítéséről, helyszíni bejárásról, felülvizsgálatról vagy oktatásról."
  },
  {
    step: 4,
    icon: CheckBadgeIcon,
    title: "Átadás és utánkövetés",
    description: "A munka sikeres teljesítése és átadása után történik a díjazás. A kapcsolatunk itt nem ér véget, ugyanis folyamatosan informálunk a későbbiekben az esetleges jogszály módosításokról, illetve a rád vonatkozó módosításokról."
  }
];

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.15 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 50 },
  in: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const ProcessStepCard = ({ step, icon: Icon, title, description, isLast }: { step: number, icon: React.ElementType, title: string, description: string, isLast: boolean }) => (
    <motion.div 
        variants={itemVariants}
        className="relative pl-16"
    >
        {!isLast && (
            <div className="absolute left-[23px] top-14 h-full w-0.5 bg-slate-200"></div>
        )}
        <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-white font-bold text-xl shadow-lg ring-4 ring-slate-50">
            {step}
        </div>
        <motion.div 
            whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}
            className="bg-white/70 backdrop-blur-md p-10 rounded-2xl shadow-lg border border-slate-200/80"
        >
            <Icon className={`w-10 h-10 mb-4 ${accentColor.text}`} />
            <h2 className="text-3xl font-bold text-slate-800 mb-2">{title}</h2>
            <p className="text-slate-600 text-lg leading-relaxed">{description}</p>
        </motion.div>
    </motion.div>
);

const Folyamatunk = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif] overflow-hidden">
        {/* A gomb stílusai, a kérésed alapján beillesztve */}
        <style>{`
            .cta-button {
                transition: all 0.3s ease-in-out;
                box-shadow: 0 0 20px ${ACCENT_COLOR_RED.baseHex}40;
            }
            .cta-button:hover {
                transform: scale(1.02);
                box-shadow: 0 0 20px ${ACCENT_COLOR_RED.baseHex}60, 0 0 30px ${ACCENT_COLOR_RED.baseHex}40;
            }
            .cta-button:active {
                transform: scale(0.98);
            }
        `}</style>
      
      <motion.div 
          className="absolute inset-0 z-0"
          animate={{ 
              background: [
                  "radial-gradient(circle at 10% 20%, rgba(3, 186, 190, 0.07), transparent 40%)",
                  "radial-gradient(circle at 90% 80%, rgba(3, 186, 190, 0.07), transparent 40%)",
                  "radial-gradient(circle at 50% 50%, rgba(3, 186, 190, 0.07), transparent 40%)",
                  "radial-gradient(circle at 10% 20%, rgba(3, 186, 190, 0.07), transparent 40%)",
              ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative"
        variants={pageVariants}
        initial="initial"
        animate="in"
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
            <motion.header variants={itemVariants} className="mb-20">
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-normal mb-4 leading-tight">
 Nézd meg hogyan történik a munka <span className={accentColor.text}>lépésről, lépésre:</span>
</h1>
              <p className="text-2xl text-slate-600 leading-snug">
                A legfontosabb az átláthatóság, ezt vagyunk hivatottak biztosítani, és folyamatosan tájékoztatni téged, anélkül hogy ezt kérned kellene.
              </p>
            </motion.header>

            <main className="w-full max-w-2xl">
                <div className="flex flex-col gap-12">
                    {processSteps.map((step, index) => (
                        <ProcessStepCard 
                            key={step.step}
                            step={step.step}
                            icon={step.icon}
                            title={step.title}
                            description={step.description}
                            isLast={index === processSteps.length - 1}
                        />
                    ))}
                </div>
            </main>

            <motion.footer variants={itemVariants} className="w-full mt-24 text-center border-t border-slate-200 pt-16">
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Mennyit kell neked ezzel foglalkoznod?</h3>
              <p className="text-slate-600 text-lg mb-8">A konzultáción átláthatóan elmondjuk a munka menetét, és lépéseit, majd a végén kézhez kapod a jegyzőkönyveket. Önállóak vagyunk, te koncentrálhatsz az egyéb dolgaidra.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                
                <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" target="_blank" rel="noopener noreferrer">
                  {/* --- MÓDOSÍTOTT CTA GOMB --- */}
                  <button
                    className={`
                        inline-flex items-center gap-3
                        ${ACCENT_COLOR_RED.bg} ${ACCENT_COLOR_RED.textOnAccent}
                        font-bold py-8 px-12 rounded-xl text-3xl
                        shadow-lg ${ACCENT_COLOR_RED.shadow} ${ACCENT_COLOR_RED.hoverShadow}
                        transition-all duration-300 ease-in-out
                        focus:outline-none focus:ring-4 ${ACCENT_COLOR_RED.ring} focus:ring-offset-2 focus:ring-offset-slate-50
                        cta-button
                    `}
                  >
                    Foglalj egy ingyenes konzultációt!
                  </button>
                </Link>
              </div>
            </motion.footer>
        </div>
      </motion.div>
    </div>
  );
};

export default Folyamatunk;