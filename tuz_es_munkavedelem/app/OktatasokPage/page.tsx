'use client';

import React from 'react';
import { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  AcademicCapIcon, // Fő ikon az oktatáshoz
  UserGroupIcon, // Csoportos oktatás, munkavállalók
  SparklesIcon, // Interaktív, élvezetes
  LightBulbIcon, // Új tudás, megértés
  CheckBadgeIcon, // Megfelelés, hitelesség
  DocumentTextIcon, // Dokumentáció, jegyzőkönyvek
  CalendarDaysIcon, // Időpontfoglalás
  ClockIcon, // Időszakos oktatások
  BookOpenIcon, // Tudásbázis, tananyag
  PresentationChartBarIcon, // Új ikon a szemléltetéshez

  ExclamationTriangleIcon, // Rendkívüli oktatáshoz
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// Finomított színséma az oktatások oldalhoz, de hű marad az alapszínekhez
const accentColor = {
  text: 'text-[#03BABE]',
  bg: 'bg-[#03BABE]',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  focusRingOffset: 'focus:ring-offset-white',
  gradientFrom: 'from-cyan-500',
  gradientTo: 'to-teal-400',
  lightBg: 'bg-cyan-50', // Új: világosabb háttérszín
  lightBorder: 'border-cyan-200', // Új: világosabb keret
};

// Animációs variánsok
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

const SkillHighlightCard = ({ icon: Icon, title, description }: { icon: React.ElementType, title: string, description: string }) => (
  <motion.div
    variants={itemVariants}
    className={`p-6 rounded-2xl shadow-lg border ${accentColor.lightBorder} ${accentColor.lightBg} text-center flex flex-col items-center group`}
    whileHover={{ y: -8, boxShadow: '0 15px 30px -5px rgba(3, 186, 190, 0.2), 0 5px 10px -2px rgba(3, 186, 190, 0.1)' }}
  >
    <div className={`p-4 rounded-full ${accentColor.bg} text-white mb-4 transition-colors group-hover:bg-cyan-700`}>
      <Icon className="w-8 h-8" />
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-cyan-700 transition-colors">{title}</h3>
    <p className="text-slate-600 leading-relaxed text-center">{description}</p>
  </motion.div>
);

// ServiceDetailCard komponens definíciója
const ServiceDetailCard = ({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string }) => (
    <motion.div variants={itemVariants} className="flex items-start gap-4 p-5 bg-white rounded-xl shadow border border-slate-100 group">
        <div className="p-3 rounded-full bg-cyan-50 text-cyan-600 flex-shrink-0 transition-colors group-hover:bg-cyan-100 group-hover:text-cyan-800">
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-cyan-700 transition-colors">{title}</h3>
            <p className="text-slate-600 leading-relaxed text-sm">{content}</p>
        </div>
    </motion.div>
);

// TrainingTypeCard komponens definíciója
const TrainingTypeCard = ({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string }) => (
    <motion.div variants={itemVariants} className="flex items-start gap-4 p-5 bg-white rounded-xl shadow border border-slate-100 group">
        <div className="p-3 rounded-full bg-cyan-50 text-cyan-600 flex-shrink-0 transition-colors group-hover:bg-cyan-100 group-hover:text-cyan-800">
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-xl font-bold text-slate-800 mb-1 group-hover:text-cyan-700 transition-colors">{title}</h3>
            <p className="text-slate-600 leading-relaxed text-sm">{content}</p>
        </div>
    </motion.div>
);


const OktatasokPage: React.FC = () => {
  const router = useRouter();
  const sectionRef = useRef(null); // Ref a viewport figyeléshez

  return (
    <motion.div
      className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8"
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Háttér mintázat (finomabb árnyalattal) */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(3, 186, 190, 0.08) 1px, transparent 1px), linear-gradient(to right, rgba(3, 186, 190, 0.08) 1px, transparent 1px)`,
        backgroundSize: '3.5rem 3.5rem',
      }}></div>
      
      {/* Lebegő, pulzáló körök a háttérben - új, dinamikusabb design elem */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-48 h-48 bg-cyan-400/10 rounded-full filter blur-3xl"
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
        transition={{ duration: 25, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
      ></motion.div>
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-teal-400/10 rounded-full filter blur-3xl"
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.2, 1] }}
        transition={{ duration: 30, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 5 }}
      ></motion.div>
      <motion.div
        className="absolute top-1/2 right-1/2 w-40 h-40 bg-sky-400/10 rounded-full filter blur-3xl"
        animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.05, 1] }}
        transition={{ duration: 20, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut', delay: 10 }}
      ></motion.div>


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
          Élvezetes és Életmentő <span className={accentColor.text}>Oktatások</span> Vállalkozása Számára
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-12 text-center max-w-4xl mx-auto"
          variants={itemVariants}
        >
          Az oktatás több, mint kötelező formalitás; ez egy befektetés munkatársai biztonságába és a vállalat jövőjébe. Mi nem csupán prezentációkat tartunk, hanem **interaktív, gyakorlatias képzéseket**, amelyek valóban felkészítik kollégáit a valós élethelyzetekre.
        </motion.p>

        {/* Új szekció: Az Oktatások Lényege */}
        <motion.section className="mb-16" variants={sectionVariants}>
          <motion.h2 className={`text-3xl font-bold text-slate-900 mb-8 text-center`} variants={itemVariants}>
            Az Oktatások Lényege: Tudásból Gyakorlat
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <SkillHighlightCard
                icon={AcademicCapIcon}
                title="Személyre Szabott Tananyag"
                description="Minden oktatást az Ön cégének profiljához, a munkakörök specifikusaihoz és a valós kockázatokhoz igazítunk, így nincs felesleges információ."
            />
            <SkillHighlightCard
                icon={PresentationChartBarIcon} // Új ikon!
                title="Interaktív Mód"
                description="Előadásaink során párbeszédet kezdeményezünk, esettanulmányokat vizsgálunk, és gyakorlati feladatokkal tesszük érdekessé a tanulást."
            />
            <SkillHighlightCard
                icon={CheckBadgeIcon}
                title="Hitelesség és Megfelelés"
                description="Oktatásaink nemcsak hatékonyak, de teljes mértékben megfelelnek a hatályos jogszabályi előírásoknak, így Ön is biztonságban érezheti magát."
            />
          </div>
        </motion.section>

        <motion.h2
          className="text-3xl font-bold text-slate-900 mb-8 text-center"
          variants={itemVariants}
        >
          Milyen Típusú Oktatásokat Nyújtunk?
        </motion.h2>

        <motion.p
          className="text-slate-700 leading-relaxed mb-6 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          A magyar jogszabályok többféle oktatási típust írnak elő, melyeket a munkáltató köteles biztosítani a munkavállalók számára. Ezek hiánya vagy nem megfelelő dokumentálása súlyos bírságokkal járhat egy hatósági ellenőrzés során. Mi segítünk eligazodni ebben a bonyolult rendszerben, és gondoskodunk arról, hogy minden kötelezettségének eleget tegyen, és munkatársai a legmagasabb szintű képzést kapják.
        </motion.p>
        
        {/* Oktatási típusok részletes listája - kibővítve és kártyákkal */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 mb-16">
            <TrainingTypeCard
                icon={UserGroupIcon}
                title="Munkába álláskori Oktatás"
                content="Minden új munkavállaló számára kötelező, még a munkavégzés megkezdése előtt. Ismerteti a munkahely sajátosságait, a munkakör veszélyeit és a szükséges védőintézkedéseket."
            />
            <TrainingTypeCard
                icon={ClockIcon}
                title="Időszakos (Ismétlődő) Oktatás"
                content="A jogszabályban (általában 1-3 évente) vagy a belső szabályzatban meghatározott időközönként kötelező megismételni. Frissíti a munkavállalók tudását, és tájékoztatja őket az esetleges változásokról."
            />
            <TrainingTypeCard
                icon={ExclamationTriangleIcon} // Új ikon a Rendkívülihez
                title="Rendkívüli Oktatás"
                content="Munkabaleset, foglalkozási megbetegedés, technológiai változás, új gép üzembe helyezése, vagy jogszabályi változás esetén szükséges. Célja a közvetlen veszélyekre való felkészítés."
            />
            <TrainingTypeCard
                icon={SparklesIcon} // Maradhat tűzvédelemhez is, ha más FireIcon van feljebb.
                title="Tűzvédelmi Oktatás"
                content="A Tűzvédelmi Szabályzat készítésére kötelezett cégeknek kell biztosítaniuk, általában évente. Kiterjed a tűzoltó készülékek használatára, a tűzriadó tervre és az általános tűzmegelőzési szabályokra."
            />
            <TrainingTypeCard
                icon={LightBulbIcon} // HACCP-hez is passzol
                title="HACCP Higiéniai Oktatás"
                content="Élelmiszerrel foglalkozó vállalkozásoknál kötelező, magában foglalja a személyi higiéniát, a keresztszennyeződés elkerülését, az élelmiszerek biztonságos kezelését és tárolását."
            />
            <TrainingTypeCard
                icon={CheckBadgeIcon} // Megfeleléshez
                title="Egyéni Védőeszköz (EVE) Használati Oktatás"
                content="Az egyéni védőeszközök helyes kiválasztásáról, használatáról, karbantartásáról és tárolásáról szóló átfogó képzés, a maximális védelem érdekében."
            />
        </div>

        <motion.h2
          className="text-3xl font-bold text-slate-900 mb-8 text-center"
          variants={itemVariants}
        >
          Amit Mi Kínálunk: Komplex Oktatási Szolgáltatásaink
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            <ServiceDetailCard
                icon={BookOpenIcon}
                title="Személyre Szabott Tananyagfejlesztés"
                content="Azonosítjuk az Ön cégére jellemző kockázatokat és munkaköröket, majd ehhez igazítva dolgozzuk ki az oktatási tematikát, előadásokat és segédanyagokat."
            />
            <ServiceDetailCard
                icon={UserGroupIcon}
                title="Rugalmas Oktatásmegvalósítás"
                content="Vállaljuk az oktatások lebonyolítását az Ön telephelyén, vagy modern online platformokon keresztül, az Ön ütemtervéhez igazodva. A fókusz a megértésen és az interakción van."
            />
            <ServiceDetailCard
                icon={DocumentTextIcon}
                title="Hivatalos Dokumentáció és Jegyzőkönyvek"
                content="Minden elvégzett oktatásról részletes, jogszabályoknak megfelelő jegyzőkönyvet állítunk ki, amely tartalmazza a résztvevők listáját, az oktatás témáját és a sikeres vizsgákat."
            />
            <ServiceDetailCard
                icon={CalendarDaysIcon}
                title="Automata Emlékeztető Szolgáltatás"
                content="Előre jelezzük az esedékes oktatások dátumait, így biztosítva, hogy soha ne maradjon le egyetlen kötelező képzésről sem, elkerülve a bírságokat."
            />
            <ServiceDetailCard
                icon={CheckBadgeIcon}
                title="Tudásfelmérés és Vizsgáztatás"
                content="Az oktatás végén tesztek és szóbeli vizsgák segítségével győződünk meg arról, hogy a résztvevők elsajátították a szükséges ismereteket, melyet hivatalosan is dokumentálunk."
            />
            <ServiceDetailCard
                icon={LightBulbIcon}
                title="Folyamatos Szakértői Támogatás"
                content="Nem csak az oktatással, de a későbbi felmerülő kérdésekkel, problémákkal kapcsolatban is állunk rendelkezésére. Tanácsadással segítjük az oktatási eredmények integrálását a napi gyakorlatba."
            />
        </div>

        <motion.div
          className="text-center mt-12 mb-8 p-6 bg-gradient-to-r from-cyan-100 to-teal-50 rounded-xl shadow-inner border border-cyan-200"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Tegye munkatársait képessé a biztonságos munkavégzésre!</h3>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Keressen minket egy díjmentes konzultációért, és tervezzük meg együtt az Ön vállalkozásához illő, leghatékonyabb oktatási programot!
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
            Tudatos munkavédelem – a tudás a legjobb védelem.
          </p>
        </motion.footer>
      </motion.div>
    </motion.div>
  );
};

export default OktatasokPage;