'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  ShieldCheckIcon, // Fő ikon a munkavédelemhez
  DocumentTextIcon, // Szabályzatokhoz
  UsersIcon, // Oktatáshoz
  ExclamationTriangleIcon, // Balesetekhez
  ScaleIcon, // Jogszabályokhoz
  HeartIcon, // Egészség
  LightBulbIcon, // Tanácsadás
  CalendarDaysIcon, // Konzultáció
  ChartBarIcon // Elemzés
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const accentColor = {
  text: 'text-[#03BABE]',
  bg: 'bg-[#03BABE]',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  focusRingOffset: 'focus:ring-offset-white',
  gradientFrom: 'from-cyan-500',
  gradientTo: 'to-teal-400',
};

const pageVariants = {
  initial: { opacity: 0, y: 50 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  exit: { opacity: 0, y: 20, transition: { duration: 0.3, ease: "easeIn" } }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const FeatureCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/80 text-center flex flex-col items-center"
  >
    <div className={`p-4 rounded-full ${accentColor.bg} text-white mb-4`}>
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-center">{description}</p>
  </motion.div>
);

const ServiceDetailCard = ({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string }) => (
    <motion.div variants={itemVariants} className="flex items-start gap-4 p-5 bg-white/70 backdrop-blur-md rounded-xl shadow border border-slate-100">
        <div className={`p-3 rounded-full bg-cyan-100 ${accentColor.text} flex-shrink-0`}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{content}</p>
        </div>
    </motion.div>
);

const MunkavedelemPage: React.FC = () => {
  const router = useRouter();
  const sectionRef = useRef(null);

  return (
    <motion.div
      className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(3, 186, 190, 0.1) 1px, transparent 1px), linear-gradient(to right, rgba(3, 186, 190, 0.1) 1px, transparent 1px)`,
        backgroundSize: '3rem 3rem',
      }}></div>

      <motion.div
        className="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8 sm:p-10 relative z-10 border border-slate-100"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.button
          onClick={() => router.back()}
          className={`inline-flex items-center justify-center p-3 rounded-full ${accentColor.bg} text-white shadow-md ${accentColor.hoverBg} transition-all duration-300 mb-8`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          variants={itemVariants}
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </motion.button>

        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 text-center"
          variants={itemVariants}
        >
          Komplex <span className={accentColor.text}>Munkavédelem</span> az Ön Vállalkozásáért
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-12 text-center max-w-4xl mx-auto"
          variants={itemVariants}
        >
          A **munkavédelem** nem pusztán jogi kötelezettség, hanem a felelős vállalatirányítás és a **fenntartható működés elengedhetetlen része**. Egy jól működő munkavédelmi rendszer védi a munkavállalókat, minimalizálja a balesetek kockázatát, és hozzájárul a vállalat hírnevének és gazdasági stabilitásának megőrzéséhez. Mi a biztonságot helyezzük előtérbe, hogy Ön a növekedésre fókuszálhasson.
        </motion.p>

        {/* Munkavédelmi alappillérek */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            <FeatureCard
                icon={ShieldCheckIcon}
                title="Biztonság Mindenekelőtt"
                description="Megelőző intézkedésekkel és folyamatos ellenőrzéssel gondoskodunk a biztonságos munkakörnyezetről."
            />
            <FeatureCard
                icon={ScaleIcon}
                title="100% Jogszabályi Megfelelés"
                description="Naprakész tudással biztosítjuk, hogy vállalkozása minden hatályos előírásnak megfeleljen."
            />
            <FeatureCard
                icon={HeartIcon}
                title="Munkavállalói Jólét"
                description="A dolgozók egészségének és biztonságának védelme hozzájárul a termelékenységhez és elégedettséghez."
            />
            <FeatureCard
                icon={ChartBarIcon}
                title="Hatékonyság és Profit"
                description="A megelőzött balesetek és bírságok hosszú távon jelentős költségmegtakarítást eredményeznek."
            />
        </div>

        <motion.h2
          className="text-3xl font-bold text-slate-900 mb-8 text-center"
          variants={itemVariants}
        >
          A Munkavédelem Jelentősége és Kötelezettségei
        </motion.h2>

        <motion.p
          className="text-slate-700 leading-relaxed mb-6 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          Magyarországon a **munkavédelemről szóló 1993. évi XCIII. törvény** (Mvt.) és annak végrehajtási rendeletei szabják meg a munkáltatók feladatait és kötelezettségeit. Ezen jogszabályok értelmében minden szervezett munkavégzést folytató vállalatnak, már **egyetlen munkavállaló esetén is**, kötelező betartania a munkavédelmi előírásokat. Ez nem csupán formális elvárás, hanem alapvető felelősség, amelynek célja a munkavállalók életének és egészségének megóvása.
        </motion.p>
        <motion.p
          className="text-slate-700 leading-relaxed mb-6 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          A jogszabályi előírásoknak való megfelelés elmulasztása súlyos következményekkel járhat. A **munkavédelmi hatóság (ITM)** rendszeresen végez ellenőrzéseket, és a feltárt hiányosságokért **akár több millió forintos bírságot** is kiszabhat. Ezen felül egy munkabaleset, vagy foglalkozási megbetegedés esetén a munkáltató anyagi és büntetőjogi felelősséggel is tartozhat. A megelőzés tehát nem csak erkölcsi, de gazdasági szempontból is a legelőnyösebb megoldás.
        </motion.p>
        <motion.p
          className="text-slate-700 leading-relaxed mb-12 max-w-4xl mx-auto font-semibold"
          variants={itemVariants}
        >
          Ne feledje: A munkavédelembe fektetett idő és energia mindig megtérül!
        </motion.p>

        <motion.h2
          className="text-3xl font-bold text-slate-900 mb-8 text-center"
          variants={itemVariants}
        >
          Átfogó Munkavédelmi Szolgáltatásaink
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            <ServiceDetailCard
                icon={DocumentTextIcon}
                title="Munkavédelmi Szabályzat és Kockázatértékelés"
                content="Teljes körű munkavédelmi szabályzatok, egyéni védőeszköz juttatási rendek és munkahelyi kockázatértékelések kidolgozása és aktualizálása a hatályos jogszabályok szerint. Ez az alapja minden további munkavédelmi intézkedésnek."
            />
            <ServiceDetailCard
                icon={UsersIcon}
                title="Munkavédelmi Oktatások Lebonyolítása"
                content="Gyakorlatias, interaktív oktatásokat tartunk munkába lépéskor, időszakonként (legalább évente), valamint rendkívüli események (pl. technológiaváltás, baleset) után. Az oktatások tematikáját az Ön cégének profiljához és a munkakörök specifikumaihoz igazítjuk."
            />
            <ServiceDetailCard
                icon={ExclamationTriangleIcon}
                title="Munkabalesetek Kivizsgálása és Jelentése"
                content="Teljes körű támogatást nyújtunk a munkabalesetek szakszerű kivizsgálásában, a jegyzőkönyvek elkészítésében, a hatóságok felé történő jelentésekben és a megelőző intézkedések kidolgozásában. Segítünk a hasonló esetek elkerülésében."
            />
            <ServiceDetailCard
                icon={ScaleIcon}
                title="Hatósági Képviselet és Tanácsadás"
                content="Képviseljük Önt a munkavédelmi hatósági ellenőrzések során, szakmai támogatást nyújtunk, és segítünk a hiányosságok pótlásában. Folyamatosan tájékoztatjuk a jogszabályi változásokról és azok cégen belüli alkalmazásáról."
            />
            <ServiceDetailCard
                icon={LightBulbIcon}
                title="Személyes Tanácsadás és Auditok"
                content="Rendszeres helyszíni bejárások, belső auditok és személyre szabott tanácsadás a felmerülő kérdésekben. Proaktív megközelítéssel segítjük a munkavédelmi kultúra fejlesztését a vállalatán belül."
            />
        </div>

        <motion.div
          className="text-center mt-12 mb-8 p-6 bg-gradient-to-r from-cyan-100 to-teal-50 rounded-xl shadow-inner border border-cyan-200"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Tegye biztonságossá vállalkozását még ma!</h3>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Keressen minket egy díjmentes konzultációért, ahol felmérjük az Önre vonatkozó aktuális munkavédelmi kötelezettségeket, és személyre szabott megoldásokat kínálunk.
          </p>
          <motion.div variants={itemVariants} className="mt-8">
            <Link href="https://calendly.com/" target="_blank" rel="noopener noreferrer">
              <motion.button
                className={`inline-flex items-center justify-center font-bold py-4 px-10 rounded-xl text-lg sm:text-xl text-white bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo} shadow-lg shadow-cyan-500/30 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 ${accentColor.ring} focus:ring-offset-2`}
                whileHover={{ scale: 1.05, y: -4, boxShadow: '0 10px 20px -5px rgba(3, 186, 190, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                <CalendarDaysIcon className="w-6 h-6 mr-3" />
                Ingyenes Konzultáció Foglalása
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.footer
          className="border-t border-slate-200 pt-8 mt-12 text-center"
          variants={itemVariants}
        >
          <p className="text-slate-600 text-sm">
            Munkavédelem – befektetés a jövőbe, nem költség.
          </p>
        </motion.footer>
      </motion.div>
    </motion.div>
  );
};

export default MunkavedelemPage;