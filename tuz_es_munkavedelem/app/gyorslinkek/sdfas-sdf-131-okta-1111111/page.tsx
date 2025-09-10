'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  AcademicCapIcon,
  ShieldCheckIcon,
  ExclamationTriangleIcon,
  BookOpenIcon,
  ScaleIcon,
  UserGroupIcon,
  CheckBadgeIcon,
  DocumentTextIcon,
  SparklesIcon,
  CalendarDaysIcon,
  MapPinIcon,
  ComputerDesktopIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// Színséma az oldalhoz
const accentColor = {
  text: 'text-cyan-500',
  bg: 'bg-cyan-500',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  gradientFrom: 'from-cyan-500',
  gradientTo: 'to-teal-400',
  lightBg: 'bg-cyan-50',
  lightBorder: 'border-cyan-200',
  darkText: 'text-slate-800',
  lightText: 'text-slate-600'
};

// Animációs variánsok
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
};

// Egyedi kártya komponensek
const InfoCard = ({ icon: Icon, title, content }: { icon: React.ElementType; title: string; content: string }) => (
  <motion.div variants={itemVariants} className="flex items-start gap-5 p-6 bg-white rounded-xl shadow-lg border border-slate-100 group transition-all duration-300 hover:border-cyan-200 hover:shadow-xl">
    <div className={`p-3 rounded-full ${accentColor.lightBg} ${accentColor.text} flex-shrink-0`}>
      <Icon className="w-7 h-7" />
    </div>
    <div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{content}</p>
    </div>
  </motion.div>
);

const BenefitCard = ({ icon: Icon, title, content }: { icon: React.ElementType; title: string; content: React.ReactNode }) => (
    <motion.div variants={itemVariants} className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-md border border-slate-200/80 text-center flex flex-col items-center h-full">
      <div className={`p-4 rounded-full ${accentColor.bg} text-white mb-4 shadow-md`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed text-center flex-grow">{content}</p>
    </motion.div>
  );


const MunkavedelmiOktatasPage = () => {
  const router = useRouter();
  const strongClass = "font-bold text-slate-900";

  return (
    <motion.div
      className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(3, 186, 190, 0.08) 1px, transparent 1px), linear-gradient(to right, rgba(3, 186, 190, 0.08) 1px, transparent 1px)`,
        backgroundSize: '3.5rem 3.5rem',
      }}></div>

      <motion.div
        className="max-w-6xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 sm:p-10 relative z-10 border border-slate-200"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >

        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 text-center"
          variants={itemVariants}
        >
          Munkavédelmi <span className={accentColor.text}>Oktatás</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-12 text-center max-w-4xl mx-auto"
          variants={itemVariants}
        >
          A <strong>munkavédelmi oktatás</strong> célja a munkavállalók felkészítése a biztonságos munkavégzésre, és a balesetek, foglalkozási megbetegedések megelőzésére. A munkáltató köteles gondoskodni arról, hogy minden munkavállaló (beleértve a diálkmunkásokat, alkalmi munkavállalókat és a táv dolgozókat is) a munkába álláskor és rendszeresen részesüljön munkavédelmi oktatásban.
        </motion.p>

        <motion.section className="mb-16" variants={sectionVariants}>
            <motion.h2 className="text-3xl font-bold text-slate-900 mb-8 text-center" variants={itemVariants}>
                Miből épül fel egy munkavédelmi oktatás?
            </motion.h2>
            <motion.p className="text-center text-slate-600 max-w-3xl mx-auto mb-10" variants={itemVariants}>
                Szakmailag felépített munkavédelmi oktatásunk az alábbi elemekre fókuszál:
            </motion.p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InfoCard icon={BookOpenIcon} title="Általános szabályok" content="A munkavédelemről szóló alapvető jogszabályok, a munkáltató és a munkavállaló jogainak és kötelezettségeinek ismertetése." />
                <InfoCard icon={ExclamationTriangleIcon} title="Egyedi kockázatok" content="A cégre és a munkakörre vonatkozó specifikus veszélyforrások (pl. gépek, vegyi anyagok, ergonómiai terhelés) és a megelőző intézkedések részletes bemutatása." />
                <InfoCard icon={ShieldCheckIcon} title="Védőeszközök használata" content="A kötelező egyéni védőeszközök (PPE) helyes használatának, karbantartásának és tárolásának bemutatása." />
                <InfoCard icon={SparklesIcon} title="Balesetkezelés" content="A teendők ismertetése munkahelyi baleset vagy vészhelyzet esetén, a bejelentési kötelezettségek és a mentési eljárások áttekintése." />
            </div>
        </motion.section>

        <motion.section className="mb-16" variants={sectionVariants}>
            <motion.h2 className="text-3xl font-bold text-slate-900 mb-8 text-center" variants={itemVariants}>
                Mi ennek a jogi kötelezettsége?
            </motion.h2>
            <div className="bg-red-50 border-l-4 border-red-500 p-8 rounded-r-lg text-red-900 shadow-md">
                <motion.p className="mb-4" variants={itemVariants}>
                    A munkavédelmi oktatás kötelezettségét a <strong className={strongClass}>munkavédelemről szóló 1993. évi XCIII. törvény</strong> és a 6/2024. (II. 8.) NGM rendelet szabályozza. A törvény meghatározza, hogy az oktatást a munkába lépéskor, munkakör vagy technológia megváltozásakor, valamint baleset után kell elvégezni. A jogszabály azt is előírja, hogy az oktatásnak naprakésznek, hatékonynak és ellenőrizhetőnek kell lennie.
                </motion.p>
                <motion.h4 className="font-bold text-lg mb-3" variants={itemVariants}>Az elmaradás vagy hiányos dokumentálás komoly büntetéseket vonhat maga után:</motion.h4>
                <ul className="list-disc list-inside space-y-2">
                    <motion.li variants={itemVariants}><strong className={strongClass}>Hatósági bírság:</strong> A munkavédelmi hatóság jelentős bírságot szabhat ki az elmaradt vagy szabálytalanul megtartott munkavédelmi oktatás miatt.</motion.li>
                    <motion.li variants={itemVariants}><strong className={strongClass}>Felelősség növekedése:</strong> Munkahelyi baleset esetén, ha bebizonyosodik, hogy a munkavállaló nem kapott megfelelő munkavédelmi oktatást, a cég jogi és anyagi felelőssége nagy mértékben növekedhet.</motion.li>
                    <motion.li variants={itemVariants}><strong className={strongClass}>Személyi sérülések:</strong> A legfontosabb következmény, hogy a felkészületlen dolgozók veszélybe sodorhatják önmagukat és másokat.</motion.li>
                </ul>
            </div>
        </motion.section>
        
        <motion.section className="mb-16" variants={sectionVariants}>
            <motion.h2 className="text-3xl font-bold text-slate-900 mb-10 text-center" variants={itemVariants}>
                Mi felkészültek vagyunk erre:
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <BenefitCard icon={AcademicCapIcon} title="Szakmailag felkészült oktatók" content="Tapasztalt munkavédelmi szakembereink garantálják a színvonalas és érthető oktatást, a legújabb jogszabályi ismeretek átadásával." />
                <BenefitCard icon={ComputerDesktopIcon} title="Helyszíni, vagy online képzés" content={<>Igény szerint a helyszínen tartott, <strong className={strongClass}>interaktív képzéseket</strong> tartunk, amelyek a valós környezetben a leginkább hatékonyak.</>} />
                <BenefitCard icon={SparklesIcon} title="Cégére szabott tematika" content={<>A tananyagot a <strong className={strongClass}>vállalkozásod profiljához</strong> és a munkakörök specifikus kockázataihoz igazítjuk, hogy a képzés releváns és hasznos legyen.</>} />
                <BenefitCard icon={DocumentTextIcon} title="Teljeskörű dokumentáció" content={<><strong className={strongClass}>Teljeskörű</strong> dokumentációt biztosítunk: elkészítjük és átadjuk a hatóságok számára is <strong className={strongClass}>elfogadható</strong> oktatási jegyzőkönyveket és igazolásokat.</>} />
            </div>
        </motion.section>

        <motion.div
          className="text-center mt-12 mb-8"
          variants={itemVariants}
        >
          <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" target="_blank" rel="noopener noreferrer">
            <button
              className={`inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-8 px-12 rounded-xl text-3xl shadow-lg cta-glow-red transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900`}
            >
              Foglalj egy ingyenes konzultációt!
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default MunkavedelmiOktatasPage;