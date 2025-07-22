// components/sections/Folyamatunk.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { 
    ArrowLeftIcon, 
    CalendarDaysIcon,
    ChatBubbleLeftRightIcon,
    DocumentCheckIcon,
    WrenchScrewdriverIcon,
    CreditCardIcon,
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

const processSteps = [
  {
    step: 1,
    icon: ChatBubbleLeftRightIcon,
    title: "Konzultáció és Igényfelmérés",
    description: "Minden sikeres partnerség egy alapos beszélgetéssel kezdődik. Egy díjmentes konzultáció során megismerjük vállalkozását, feltérképezzük az egyedi igényeket és a potenciális kockázatokat, hogy pontosan értsük, miben segíthetünk."
  },
  {
    step: 2,
    icon: DocumentCheckIcon,
    title: "Szerződéskötés és Tervezés",
    description: "Az egyeztetettek alapján egy átlátható, minden részletre kiterjedő árajánlatot és szerződéstervezetet készítünk. Itt rögzítjük a vállalt szolgáltatásokat, a határidőket és a garanciákat. Nincsenek rejtett költségek."
  },
  {
    step: 3,
    icon: WrenchScrewdriverIcon,
    title: "A Munka Kivitelezése",
    description: "Szakértő csapatunk precízen és a megbeszélt ütemezés szerint elvégzi a szerződésben foglalt feladatokat, legyen szó dokumentáció készítéséről, helyszíni bejárásról vagy oktatásról. A folyamatról folyamatosan tájékoztatjuk."
  },
  {
    step: 4,
    icon: CreditCardIcon,
    title: "Átadás, Fizetés és Utánkövetés",
    description: "A munka sikeres teljesítése és átadása után történik a díjazás. A kapcsolatunk itt nem ér véget; igény esetén további támogatást és utánkövetést biztosítunk, hogy a biztonság hosszú távon is fenntartható legyen."
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
            className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-lg border border-slate-200/80"
        >
            <Icon className={`w-10 h-10 mb-4 ${accentColor.text}`} />
            <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
            <p className="text-slate-600 text-lg leading-relaxed">{description}</p>
        </motion.div>
    </motion.div>
);

const Folyamatunk = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif] overflow-hidden">
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
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4">
                Az Ön Nyugalma, <span className={accentColor.text}>Lépésről Lépésre</span>.
              </h1>
              <p className="text-2xl text-slate-600 leading-snug">
                Egy átlátható és kiszámítható folyamat, amely a kapcsolatfelvételtől a hosszú távú partnerségig végigkíséri Önt a biztonságos működés felé vezető úton.
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

            <motion.section variants={itemVariants} className="w-full mt-28">
                <div className="text-center">
                    <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 mb-12">
                        Miért Működik Ez a Folyamat?
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center p-6">
                            <CheckBadgeIcon className={`w-12 h-12 mx-auto mb-4 ${accentColor.text}`} />
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Átláthatóság</h3>
                            <p className="text-slate-600">Minden lépésről tudni fog. Nincsenek rejtett költségek vagy meglepetések, csak tiszta, érthető kommunikáció.</p>
                        </div>
                        <div className="text-center p-6">
                            <CheckBadgeIcon className={`w-12 h-12 mx-auto mb-4 ${accentColor.text}`} />
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Hatékonyság</h3>
                            <p className="text-slate-600">A letisztult folyamatunknak köszönhetően időt és energiát spórolunk Önnek, hogy a vállalkozásával foglalkozhasson.</p>
                        </div>
                        <div className="text-center p-6">
                            <CheckBadgeIcon className={`w-12 h-12 mx-auto mb-4 ${accentColor.text}`} />
                            <h3 className="text-2xl font-bold text-slate-800 mb-2">Partnerség</h3>
                            <p className="text-slate-600">Nem csak egy szolgáltatást nyújtunk, hanem egy hosszú távú, megbízható partnerséget, amire mindig számíthat.</p>
                        </div>
                    </div>
                </div>
            </motion.section>

            <motion.footer variants={itemVariants} className="w-full mt-24 text-center border-t border-slate-200 pt-16">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">Indítsuk el a közös munkát!</h3>
              <p className="text-slate-600 text-lg mb-8">Az első lépés egy ingyenes konzultáció. Vegye fel velünk a kapcsolatot még ma!</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/">
                  <motion.div
                    className="w-full sm:w-auto text-center font-semibold py-3 px-8 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeftIcon className="w-5 h-5 inline-block mr-2" />
                    Vissza a főoldalra
                  </motion.div>
                </Link>
                <Link href="https://calendly.com/">
                  <motion.div
                    className={`w-full sm:w-auto text-center font-bold py-3 px-8 rounded-xl bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo} text-white shadow-lg shadow-cyan-500/30 cursor-pointer`}
                    whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 30px -10px rgba(3, 186, 190, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CalendarDaysIcon className="w-5 h-5 inline-block mr-2" />
                    Időpontfoglalás
                  </motion.div>
                </Link>
              </div>
            </motion.footer>
        </div>
      </motion.div>
    </div>
  );
};

export default Folyamatunk;