'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  CalendarDaysIcon,
  ArrowLeftIcon,
  ShieldExclamationIcon, // Kockázatértékeléshez illő ikon
  DocumentMagnifyingGlassIcon,
  ChartBarIcon,
  LightBulbIcon,
  CheckBadgeIcon,
  AcademicCapIcon // Oktatáshoz
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

const ProcessStepCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
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

const BenefitCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
    <motion.div variants={itemVariants} className="flex items-start gap-4 p-5 bg-white/70 backdrop-blur-md rounded-xl shadow border border-slate-100">
        <div className={`p-3 rounded-full ${accentColor.bg} text-white flex-shrink-0`}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">{title}</h3>
            <p className="text-slate-600">{description}</p>
        </div>
    </motion.div>
);


const KockazatErtekelesPage: React.FC = () => {
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
          Munkavédelmi <span className={accentColor.text}>Kockázatértékelés</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-12 text-center max-w-3xl mx-auto"
          variants={itemVariants}
        >
          A munkavédelmi kockázatértékelés nem csupán egy jogszabályi kötelezettség, hanem a **biztonságos és hatékony munkakörnyezet alapköve**. Segít azonosítani a potenciális veszélyeket, mielőtt azok balesetté válnának.
        </motion.p>

        {/* Bevezető rész az ikonokkal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <ProcessStepCard
                icon={DocumentMagnifyingGlassIcon}
                title="Veszélyek Azonosítása"
                description="Részletes felmérés a munkahelyen előforduló összes fizikai, kémiai, biológiai és ergonómiai veszélyforrás azonosítására."
            />
            <ProcessStepCard
                icon={ChartBarIcon}
                title="Kockázatok Értékelése"
                description="A feltárt veszélyek súlyosságának és bekövetkezési valószínűségének elemzése, számszerűsítése."
            />
            <ProcessStepCard
                icon={LightBulbIcon}
                title="Megelőző Intézkedések"
                description="Konkrét, megvalósítható javaslatok kidolgozása a kockázatok csökkentésére vagy megszüntetésére."
            />
        </div>

        <motion.h2
          className="text-3xl font-bold text-slate-900 mb-8 text-center"
          variants={itemVariants}
        >
          Miért Kötelező a Kockázatértékelés?
        </motion.h2>

        <motion.p
          className="text-slate-700 leading-relaxed mb-6 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          A **munkavédelemről szóló 1993. évi XCIII. törvény** egyértelműen kimondja, hogy minden munkáltató köteles elvégezni a kockázatértékelést, függetlenül attól, hogy hány munkavállalót foglalkoztat. Ez az alapvető dokumentum szolgál a munkahelyi biztonsági intézkedések kidolgozásának kiindulópontjául. Hiánya vagy elavult állapota súlyos bírságokat vonhat maga után, amelyek akár a több millió forintot is elérhetik.
        </motion.p>
        <motion.p
          className="text-slate-700 leading-relaxed mb-12 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          A kockázatértékelést a cég működésének, technológiájának, eszközparkjának és a munkavállalók számának változása esetén **soron kívül felül kell vizsgálni és aktualizálni**. Ezen felül jogszabályi előírás szerint **legalább háromévente** kötelező az ismételt felülvizsgálat.
        </motion.p>

        <motion.h2
          className="text-3xl font-bold text-slate-900 mb-8 text-center"
          variants={itemVariants}
        >
          Miben segítünk Önnek?
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            <BenefitCard
                icon={CheckBadgeIcon}
                title="Jogszabályi Megfelelés"
                description="Garantáljuk, hogy kockázatértékelése teljes mértékben megfelel a hatályos magyar és EU-s előírásoknak."
            />
            <BenefitCard
                icon={AcademicCapIcon}
                title="Szakértői Tapasztalat"
                description="Több éves tapasztalattal rendelkezünk különböző iparágakban, így specifikus, gyakorlatias megoldásokat kínálunk."
            />
            <BenefitCard
                icon={ShieldExclamationIcon}
                title="Reális Kockázatelemzés"
                description="Nem csak a kötelező elemeket vesszük figyelembe, hanem a reális munkahelyi körülményekre szabjuk az elemzést."
            />
            <BenefitCard
                icon={DocumentMagnifyingGlassIcon}
                title="Átfogó Dokumentáció"
                description="Részletes, könnyen érthető dokumentációt készítünk, amely az alapja lehet a további munkavédelmi intézkedéseknek."
            />
        </div>

        <motion.div
          className="text-center mt-12 mb-8 p-6 bg-gradient-to-r from-cyan-100 to-teal-50 rounded-xl shadow-inner border border-cyan-200"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Ne kockáztassa vállalkozását!</h3>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Vegye fel velünk a kapcsolatot még ma egy díjmentes konzultációért, és tegye biztonságossá munkahelyét a hatósági bírságok elkerülése mellett!
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
            Kérdése van? Keressen minket bizalommal!
          </p>
        </motion.footer>
      </motion.div>
    </motion.div>
  );
};

export default KockazatErtekelesPage;