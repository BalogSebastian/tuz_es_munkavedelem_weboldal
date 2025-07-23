'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useRef } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  ClipboardDocumentCheckIcon, // Fő ikon a HACCP-hez
  BuildingStorefrontIcon, // Élelmiszeripari egységek
  ScaleIcon, // Jogszabályokhoz
  ChartPieIcon, // Elemzés, kritikus pontok
  AcademicCapIcon, // Oktatás
  LightBulbIcon, // Tanácsadás
  CalendarDaysIcon, // Konzultáció
  AdjustmentsHorizontalIcon, // Felülvizsgálat
  PuzzlePieceIcon // Rendszer elemei
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

const HaccpPage: React.FC = () => {
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
          Biztonságos Élelmiszer: A <span className={accentColor.text}>HACCP Rendszer</span> Jelentősége
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-12 text-center max-w-4xl mx-auto"
          variants={itemVariants}
        >
          A **HACCP (Hazard Analysis and Critical Control Points)** rendszer az élelmiszer-biztonság alapköve, melynek célja az élelmiszer-előállítás és -forgalmazás során felmerülő veszélyek azonosítása, értékelése és ellenőrzése. Ez nem csupán egy tanúsítvány, hanem egy **dinamikus rendszer**, amely garantálja a fogyasztók egészségének védelmét és vállalkozása jogszabályi megfelelését.
        </motion.p>

        {/* HACCP alappillérek */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <FeatureCard
                icon={ChartPieIcon}
                title="Veszélyelemzés és Kockázatkezelés"
                description="Rendszeres, proaktív elemzés az élelmiszerlánc minden pontján a lehetséges szennyeződések elkerülésére."
            />
            <FeatureCard
                icon={BuildingStorefrontIcon}
                title="Minden Élelmiszeripari Egységnek"
                description="Legyen szó étteremről, boltról vagy gyárról, a HACCP kötelező az élelmiszerrel foglalkozó vállalkozásoknak."
            />
        </div>

        <motion.h2
          className="text-3xl font-bold text-slate-900 mb-8 text-center"
          variants={itemVariants}
        >
          Jogszabályi Kötelezettségek és Előírások
        </motion.h2>

        <motion.p
          className="text-slate-700 leading-relaxed mb-6 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          Az Európai Unióban az élelmiszer-higiéniáról szóló **852/2004/EK rendelet** (és a kapcsolódó magyar jogszabályok, mint például az élelmiszerláncról és hatósági felügyeletről szóló **2008. évi XLVI. törvény**) írja elő minden élelmiszer-ipari szereplő számára a HACCP rendszer kiépítését és működtetését. Ez a kötelezettség a teljes élelmiszerláncra kiterjed, az alapanyag-beszerzéstől a feldolgozáson át a végső termék forgalmazásáig.
        </motion.p>
        
        {/* Itt van a változás: A bekezdés és a lista szétválasztása */}
        <motion.div
          className="text-slate-700 leading-relaxed mb-6 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          A Nemzeti Élelmiszerlánc-biztonsági Hivatal (NÉBIH) és a járási kormányhivatalok rendszeresen ellenőrzik a HACCP rendszer meglétét és hatékonyságát. A hiányosságok vagy a nem megfelelő működtetés súlyos következményekkel járhat:
          <ul className="list-disc list-inside mt-4 pl-4">
              <li>**Jelentős bírságok:** A jogszabályi előírások be nem tartása esetén a hatóságok akár több millió forintos bírságot is kiszabhatnak.</li>
              <li>**Tevékenység felfüggesztése/bezárása:** Súlyos élelmiszer-biztonsági kockázat esetén az egység működését ideiglenesen vagy véglegesen is felfüggeszthetik.</li>
              <li>**Hírnévromlás:** Az élelmiszer-botrányok komoly bizalomvesztést okozhatnak a fogyasztók körében, hosszú távon károsítva a vállalkozás üzletmenetét.</li>
          </ul>
        </motion.div>
        {/* Vége a változásnak */}

        <motion.p
          className="text-slate-700 leading-relaxed mb-12 max-w-4xl mx-auto font-semibold"
          variants={itemVariants}
        >
          A HACCP rendszer kiépítése és folyamatos fenntartása tehát nem csak jogi elvárás, hanem kulcsfontosságú befektetés a vállalat stabilitásába és a fogyasztói elégedettségbe.
        </motion.p>

        <motion.h2
          className="text-3xl font-bold text-slate-900 mb-8 text-center"
          variants={itemVariants}
        >
          Komplex HACCP Szolgáltatásaink
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            <ServiceDetailCard
                icon={ClipboardDocumentCheckIcon}
                title="HACCP Rendszer Kiépítése és Dokumentáció"
                content="Teljes körű HACCP kézikönyvet és a szükséges dokumentációkat készítjük el az Ön vállalkozásának profiljához igazítva. Ez magában foglalja a veszélyelemzést, a kritikus ellenőrzési pontok (CCP-k) meghatározását és a korrekciós intézkedéseket."
            />
            <ServiceDetailCard
                icon={AcademicCapIcon}
                title="Higiéniai és HACCP Oktatások"
                content="Munkatársainak célzott higiéniai és élelmiszer-biztonsági oktatásokat tartunk, hogy mindenki tisztában legyen a HACCP rendszer elveivel és a saját feladataival. A tudás a biztonság alapja."
            />
            <ServiceDetailCard
                icon={AdjustmentsHorizontalIcon}
                title="Rendszeres Felülvizsgálat és Auditok"
                content="Évente legalább egyszer kötelező felülvizsgálni a HACCP rendszert. Mi gondoskodunk erről, valamint belső auditokat végzünk, hogy a rendszer mindig naprakész és hatékony maradjon, felkészítve Önt a hatósági ellenőrzésekre."
            />
            <ServiceDetailCard
                icon={LightBulbIcon}
                title="Szakértői Tanácsadás és Támogatás"
                content="Folyamatos szakmai támogatást nyújtunk minden felmerülő élelmiszer-biztonsági kérdésben. Segítünk új termékek bevezetésekor, technológiai változások esetén, vagy bármilyen jogszabályi bizonytalanság tisztázásában."
            />
            <ServiceDetailCard
                icon={PuzzlePieceIcon}
                title="Nyomon Követhetőség és Adatkezelés"
                content="Segítünk kialakítani a hatékony nyomon követhetőségi rendszert, ami kulcsfontosságú az esetleges problémák gyors azonosításában és kezelésében az élelmiszerláncban."
            />
            <ServiceDetailCard
                icon={BuildingStorefrontIcon}
                title="Létesítmény Higiéniai Tervezése"
                content="Tanácsadás új élelmiszer-ipari egységek tervezésénél vagy meglévők átalakításánál, figyelembe véve a higiéniai elvárásokat és a HACCP alapelveit a legoptimálisabb munkavégzés érdekében."
            />
        </div>

        <motion.div
          className="text-center mt-12 mb-8 p-6 bg-gradient-to-r from-cyan-100 to-teal-50 rounded-xl shadow-inner border border-cyan-200"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Garantálja az élelmiszer-biztonságot vállalkozásában!</h3>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Keressen minket egy díjmentes konzultációért, ahol részletesen átbeszéljük az Ön egyedi igényeit és a HACCP rendszer kiépítésének lépéseit.
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
            HACCP rendszer – a bizalom alapja az élelmiszeriparban.
          </p>
        </motion.footer>
      </motion.div>
    </motion.div>
  );
};

export default HaccpPage;