'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  ShieldCheckIcon,
  BeakerIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentListIcon,
  ScaleIcon,
  DocumentMagnifyingGlassIcon,
  AcademicCapIcon,
  LightBulbIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// Sötét témájú, felturbózott színséma
const accentColor = {
  text: 'text-cyan-400',
  bg: 'bg-cyan-500',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  gradientFrom: 'from-cyan-400',
  gradientTo: 'to-teal-400',
  glow: 'shadow-cyan-500/30',
  pageBg: 'bg-slate-900',
  containerBg: 'bg-slate-800/50',
  containerBorder: 'border-slate-700',
  cardBg: 'bg-slate-800',
  headingText: 'text-white',
  bodyText: 'text-slate-300',
  subtleText: 'text-slate-400',
  warningBg: 'bg-red-900/30',
  warningBorder: 'border-red-500/50',
  warningText: 'text-red-300'
};

// Animációs variánsok
const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.4, 0, 0.2, 1] } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: "easeOut" } }
};

// Kártya komponensek sötét témára szabva
const PillarCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
    <motion.div
      variants={itemVariants}
      className={`${accentColor.cardBg} backdrop-blur-sm p-8 rounded-2xl shadow-lg border ${accentColor.containerBorder} text-center flex flex-col items-center h-full transition-all duration-300 hover:border-cyan-500/50 hover:-translate-y-1`}
    >
      <div className={`p-4 rounded-full bg-gradient-to-br ${accentColor.gradientFrom} ${accentColor.gradientTo} text-white mb-5 shadow-lg ${accentColor.glow}`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className={`text-xl font-bold ${accentColor.headingText} mb-2`}>{title}</h3>
      <p className={`${accentColor.subtleText} leading-relaxed text-center flex-grow`}>{description}</p>
    </motion.div>
  );

const ServiceCard = ({ icon: Icon, title, content }: { icon: React.ElementType; title: string; content: string }) => (
    <motion.div
      variants={itemVariants}
      className={`${accentColor.cardBg} p-6 rounded-2xl shadow-lg border ${accentColor.containerBorder} transition-all duration-300 hover:shadow-2xl hover:border-cyan-500/50 hover:-translate-y-1 h-full`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-xl bg-cyan-500/10 ${accentColor.text} flex-shrink-0`}>
          <Icon className="w-7 h-7" />
        </div>
        <h3 className={`text-xl font-bold ${accentColor.headingText}`}>{title}</h3>
      </div>
      <p className={`${accentColor.bodyText} leading-relaxed`}>{content}</p>
    </motion.div>
  );

const HaccpPage = () => {
  const router = useRouter();

  return (
    <motion.div
      className={`min-h-screen ${accentColor.pageBg} font-['Poppins',_sans-serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8`}
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(203, 213, 225, 0.03) 1px, transparent 1px), linear-gradient(to right, rgba(203, 213, 225, 0.03) 1px, transparent 1px)`,
        backgroundSize: '3.5rem 3.5rem',
      }}></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"
          animate={{ y: [0, 20, 0], x: [0, -15, 0] }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear", repeatType: 'mirror' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl"
          animate={{ y: [0, -25, 0], x: [0, 10, 0] }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear", repeatType: 'mirror', delay: 5 }}
        />
      </div>

      <motion.div
        className={`max-w-6xl mx-auto ${accentColor.containerBg} backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 relative z-10 border ${accentColor.containerBorder}`}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.button
          onClick={() => router.back()}
          className={`inline-flex items-center justify-center p-3 rounded-full ${accentColor.bg} text-white shadow-lg ${accentColor.glow} ${accentColor.hoverBg} transition-all duration-300 mb-8`}
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          variants={itemVariants}
          aria-label="Vissza az előző oldalra"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </motion.button>

        <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.h1
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-teal-300 mb-4 tracking-tight"
              variants={itemVariants}
            >
              HACCP
            </motion.h1>
            <motion.h2 className="text-2xl font-bold text-white mb-6" variants={itemVariants}>Mi az a HACCP?</motion.h2>
            <motion.p
              className="text-lg text-slate-300 leading-relaxed max-w-4xl mx-auto"
              variants={itemVariants}
            >
              A HACCP (Hazard Analysis and Critical Control Points) egy nemzetközileg elfogadott, dinamikus élelmiszerbiztonsági rendszer, amelynek célja a fogyasztók egészségének védelme. Lényege a veszélyek elemzése és a kritikus ellenőrző pontok meghatározása az élelmiszer-előállítás és -forgalmazás teljes folyamatában. Ez a rendszer segít azonosítani, értékelni és kezelni az élelmiszerbiztonságot fenyegető biológiai, kémiai és fizikai kockázatokat, még a problémák felmerülése előtt. A HACCP bevezetése nem csupán jogszabályi kötelezettség, hanem a fogyasztók bizalmának alapja.
            </motion.p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <PillarCard icon={BeakerIcon} title="Veszélyelemzés és Kockázatkezelés" description="Rendszeres, proaktív elemzés a lehetséges szennyeződések, fertőzések és egyéb élelmiszerbiztonsági kockázatok elkerülésére a teljes termelési láncban." />
            <PillarCard icon={BuildingStorefrontIcon} title="Minden Élelmiszeripari Egységnek Kötelező" description="Legyen szó étteremről, boltról vagy gyárról, a HACCP-rendszer bevezetése és fenntartása kötelező minden élelmiszerrel foglalkozó vállalkozás számára." />
        </div>

        <motion.section className="mb-20" variants={sectionVariants}>
            <motion.h2 className="text-3xl font-bold text-white mb-10 text-center" variants={itemVariants}>
                Miből épül fel a HACCP?
            </motion.h2>
            <div className={`${accentColor.cardBg} p-8 rounded-2xl shadow-xl border ${accentColor.containerBorder}`}>
                <motion.p className="text-slate-300 mb-6" variants={itemVariants}>A HACCP-rendszer 7 alapelvre épül, amelyek a következők:</motion.p>
                <ol className="list-decimal list-inside space-y-4 text-slate-300">
                    <motion.li variants={itemVariants}><strong className="font-semibold text-white">Veszélyelemzés:</strong> A potenciális élelmiszerbiztonsági veszélyek azonosítása és értékelése.</motion.li>
                    <motion.li variants={itemVariants}><strong className="font-semibold text-white">Kritikus ellenőrző pontok (CCP-k) meghatározása:</strong> Azoknak a pontoknak a kijelölése a folyamatban, ahol a veszélyek kontrollálhatók.</motion.li>
                    <motion.li variants={itemVariants}><strong className="font-semibold text-white">Kritikus határértékek megállapítása:</strong> A CCP-khez tartozó elfogadható paraméterek (pl. hőmérséklet, idő) meghatározása.</motion.li>
                    <motion.li variants={itemVariants}><strong className="font-semibold text-white">Ellenőrzési eljárások kidolgozása:</strong> A CCP-k rendszeres felügyeletének módjának leírása.</motion.li>
                    <motion.li variants={itemVariants}><strong className="font-semibold text-white">Helyesbítő tevékenységek megfogalmazása:</strong> A cselekvési terv a kritikus határértékek túllépése esetén.</motion.li>
                    <motion.li variants={itemVariants}><strong className="font-semibold text-white">Igazoló eljárások bevezetése:</strong> A rendszer hatékonyságának igazolása (pl. auditok).</motion.li>
                    <motion.li variants={itemVariants}><strong className="font-semibold text-white">Dokumentáció készítése:</strong> A teljes rendszer dokumentálása és nyilvántartások vezetése.</motion.li>
                </ol>
            </div>
        </motion.section>

        <motion.section className="mb-20" variants={sectionVariants}>
            <motion.h2 className="text-3xl font-bold text-white mb-8 text-center" variants={itemVariants}>
                Mi ennek a jogi kötelezettsége?
            </motion.h2>
            <div className={`${accentColor.warningBg} border-l-8 ${accentColor.warningBorder} p-8 rounded-xl ${accentColor.warningText} shadow-xl relative overflow-hidden`}>
                <ExclamationTriangleIcon className="absolute -right-8 -bottom-8 w-40 h-40 text-red-500/10" />
                <motion.p className="mb-6 text-lg text-red-200" variants={itemVariants}>
                    A HACCP-rendszer működtetése az Európai Unióban a <strong>852/2004/EK rendeleten</strong> alapul, amelynek előírásait a magyar jog is átültette. A Nemzeti Élelmiszerlánc-biztonsági Hivatal (Nébih) rendszeresen ellenőrzi a vállalkozásokat a HACCP-rendszer meglétét és hatékony működését illetően.
                </motion.p>
                <motion.h4 className="font-bold text-xl text-white mb-4" variants={itemVariants}>A hiányosságok súlyos következményekkel járhatnak:</motion.h4>
                <ul className="space-y-3 text-red-200">
                    <motion.li variants={itemVariants} className="flex items-start gap-3"><CheckBadgeIcon className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" /><span><strong>Magas bírságok:</strong> A Nébih több százezer forintos, akár milliós nagyságrendű bírságot is kiszabhat.</span></motion.li>
                    <motion.li variants={itemVariants} className="flex items-start gap-3"><CheckBadgeIcon className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" /><span><strong>Működés felfüggesztése/bezárása:</strong> Súlyos kockázat esetén a hatóság ideiglenesen vagy véglegesen is bezárathatja a vállalkozást.</span></motion.li>
                    <motion.li variants={itemVariants} className="flex items-start gap-3"><CheckBadgeIcon className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" /><span><strong>Fogyasztói bizalom elvesztése:</strong> Az élelmiszer-botrányok komoly bizalmatlanságot okozhatnak, ami hosszú távon károsítja a cég hírnevét.</span></motion.li>
                </ul>
            </div>
        </motion.section>
        
        <motion.section className="mb-20" variants={sectionVariants}>
            <motion.h2 className="text-3xl font-bold text-white mb-12 text-center" variants={itemVariants}>
                Komplex HACCP Szolgáltatásaink
            </motion.h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ServiceCard icon={ClipboardDocumentListIcon} title="HACCP Rendszer kiépítése" content="Teljes körű HACCP kézikönyvet és a szükséges dokumentációt készítünk, amely az Ön vállalkozásának profiljához igazodik, felkészítve Önt a hatósági ellenőrzésekre." />
                <ServiceCard icon={DocumentMagnifyingGlassIcon} title="Rendszeres Felülvizsgálat és Audit" content="Gondoskodunk a jogszabályban előírt éves felülvizsgálatokról és belső auditokról, hogy a rendszere mindig naprakész és hatékony legyen." />
                <ServiceCard icon={AcademicCapIcon} title="Higiéniai és HACCP Oktatás" content="Célzott, gyakorlatias oktatásokat tartunk munkatársainak, hogy tisztában legyenek a HACCP-rendszer elveivel és saját feladataikkal." />
                <ServiceCard icon={LightBulbIcon} title="Szakértői Tanácsadás és Támogatás" content="Folyamatos szakmai támogatást nyújtunk minden felmerülő élelmiszer-biztonsági kérdésben, segítünk a jogszabályi bizonytalanságok tisztázásában." />
            </div>
        </motion.section>

        <motion.div
          className="text-center mt-12 mb-8 p-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-3xl shadow-2xl relative overflow-hidden"
          variants={itemVariants}
        >
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
          <motion.h3 className="text-3xl font-bold text-white mb-4 drop-shadow-md" variants={itemVariants}>Garantálja az élelmiszer-biztonságot vállalkozásában!</motion.h3>
          <motion.p className="text-lg text-cyan-100 max-w-2xl mx-auto drop-shadow" variants={itemVariants}>
            Ne bízza a véletlenre az élelmiszer-biztonságot! Keressen minket egy díjmentes konzultációért, ahol részletesen átbeszéljük az Ön egyedi igényeit és a HACCP-rendszer kiépítésének lépéseit.
          </motion.p>
          <motion.div variants={itemVariants} className="mt-8">
            <Link href="https://calendly.com/" target="_blank" rel="noopener noreferrer">
              <motion.button
                className={`inline-flex items-center justify-center font-bold py-4 px-10 rounded-xl text-lg sm:text-xl text-cyan-600 bg-white shadow-2xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white/50`}
                whileHover={{ scale: 1.05, y: -4, boxShadow: '0 10px 20px -5px rgba(255, 255, 255, 0.4)' }}
                whileTap={{ scale: 0.98 }}
              >
                <CalendarDaysIcon className="w-6 h-6 mr-3" />
                Ingyenes Konzultációt Foglalok
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default HaccpPage;