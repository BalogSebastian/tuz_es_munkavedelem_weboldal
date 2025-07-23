'use client';

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  FireIcon, // Fő ikon a tűzvédelemhez
  DocumentMagnifyingGlassIcon, // Felmérés, szabályzat
  SparklesIcon, // Megoldások, szakértelem
  LightBulbIcon, // Tanácsadás
  ClipboardDocumentCheckIcon, // Dokumentáció
  BellAlertIcon, // Riasztás, Tűzriadó
  ExclamationTriangleIcon, // Veszélyek
  BuildingOfficeIcon, // Létesítmények
  CalendarDaysIcon, // Konzultáció
  TruckIcon, // Eszközök, Kiszállás
  UserGroupIcon // Oktatás
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// Egyedi színséma ehhez az oldalhoz (sötét, élénk piros, szürke)
const customAccentColor = {
  primary: 'text-red-600',
  primaryBg: 'bg-red-600',
  primaryHoverBg: 'hover:bg-red-700',
  primaryRing: 'focus:ring-red-500',
  secondary: 'text-gray-400',
  darkBg: 'bg-gray-900',
  lightText: 'text-gray-200',
  cardBg: 'bg-gray-800',
  cardBorder: 'border-gray-700',
  contrastBg: 'bg-white',
  contrastText: 'text-gray-900',
};

// Animációs variánsok
const pageVariants = {
  initial: { opacity: 0, scale: 0.98 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, scale: 0.95, transition: { duration: 0.5, ease: "easeIn" } }
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.15
    }
  }
};

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
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

const DetailCard = ({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string }) => (
  <motion.div
    variants={itemVariants}
    className={`${customAccentColor.cardBg} ${customAccentColor.lightText} rounded-xl p-6 shadow-lg ${customAccentColor.cardBorder} border flex flex-col`}
  >
    <div className={`${customAccentColor.primaryBg} p-3 rounded-full w-fit mb-4`}>
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-xl font-bold mb-2">{title}</h3>
    <p className="text-gray-300 leading-relaxed text-sm flex-grow">{content}</p>
  </motion.div>
);

const TuzvedelemPage: React.FC = () => {
  const router = useRouter();
  const contentRef = useRef(null);

  return (
    <motion.div
      className={`min-h-screen ${customAccentColor.darkBg} font-['Poppins',_sans-serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8`}
      initial="initial"
      animate="animate"
      exit="exit"
      variants={pageVariants}
    >
      {/* Háttér mintázat és lebegő elemek */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.08) 1px, transparent 1px), linear-gradient(to right, rgba(239, 68, 68, 0.08) 1px, transparent 1px)`,
        backgroundSize: '4rem 4rem',
      }}></div>
      <motion.div
        className="absolute top-1/4 left-1/4 w-64 h-64 bg-red-500/10 rounded-full filter blur-3xl animate-blob"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1.2, rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, repeatType: 'mirror' }}
      ></motion.div>
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-orange-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1.1, rotate: -360 }}
        transition={{ duration: 35, repeat: Infinity, repeatType: 'mirror' }}
      ></motion.div>
      <motion.div
        className="absolute top-1/2 left-1/2 w-48 h-48 bg-yellow-500/10 rounded-full filter blur-3xl animate-blob animation-delay-4000"
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 0.1, scale: 1.3, rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, repeatType: 'mirror' }}
      ></motion.div>

      <motion.div
        ref={contentRef}
        className={`max-w-6xl mx-auto ${customAccentColor.cardBg} rounded-xl shadow-2xl p-8 sm:p-10 relative z-10 ${customAccentColor.cardBorder} border`}
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.button
          onClick={() => router.back()}
          className={`inline-flex items-center justify-center p-3 rounded-full ${customAccentColor.primaryBg} text-white shadow-md ${customAccentColor.primaryHoverBg} transition-all duration-300 mb-8`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          variants={itemVariants}
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </motion.button>

        <motion.h1
          className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold ${customAccentColor.lightText} mb-6 text-center`}
          variants={itemVariants}
        >
          Komplex <span className={customAccentColor.primary}>Tűzvédelmi</span> Megoldások Vállalkozása Számára
        </motion.h1>

        <motion.p
          className={`${customAccentColor.lightText} text-lg sm:text-xl leading-relaxed mb-12 text-center max-w-4xl mx-auto`}
          variants={itemVariants}
        >
          A **tűzvédelem** nem pusztán szabályok összessége, hanem egy átfogó, életmentő stratégia, amely a jogszabályi megfelelésen túl, az Ön értékeinek és munkatársai biztonságának védelmét szolgálja. Egyetlen gyufa is elegendő lehet egy katasztrófához – mi segítünk, hogy felkészült legyen.
        </motion.p>

        {/* Célok szekció */}
        <motion.section className="mb-16" variants={sectionVariants}>
          <motion.h2 className={`text-3xl font-bold ${customAccentColor.primary} mb-8 text-center`} variants={itemVariants}>
            Miért Elengedhetetlen a Tűzvédelem?
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <DetailCard
              icon={ExclamationTriangleIcon}
              title="Kockázatok Minimalizálása"
              content="A tűzveszély azonosítása és hatékony kezelése kulcsfontosságú az anyagi károk és az emberi sérülések elkerülésében."
            />
            <DetailCard
              icon={BuildingOfficeIcon}
              title="Vállalati Folyamatosság"
              content="Egy tűzeset hosszú távon megbéníthatja a cég működését. A megfelelő tűzvédelem biztosítja a gyors helyreállítást."
            />
            <DetailCard
              icon={BellAlertIcon}
              title="Vészhelyzeti Készültség"
              content="A jól kidolgozott Tűzriadó Terv és a rendszeres gyakorlatok életeket menthetnek egy valós krízishelyzetben."
            />
            <DetailCard
              icon={UserGroupIcon}
              title="Munkavállalói Biztonság"
              content="A dolgozók életének és testi épségének védelme a munkáltató alapvető erkölcsi és jogi kötelessége."
            />
            <DetailCard
              icon={LightBulbIcon}
              title="Nyugodt Működés"
              content="A tudat, hogy vállalkozása tűzvédelmi szempontból felkészült, hozzájárul a stresszmentes és hatékony munkavégzéshez."
            />
          </div>
        </motion.section>

        {/* Jogszabályi háttér és büntetések szekció */}
        <motion.section className="mb-16" variants={sectionVariants}>
          <motion.h2 className={`text-3xl font-bold ${customAccentColor.primary} mb-8 text-center`} variants={itemVariants}>
            Jogszabályi Előírások és Lehetséges Szankciók
          </motion.h2>

          <motion.div variants={itemVariants} className="bg-gray-700/60 p-8 rounded-xl shadow-inner border border-gray-600 mb-8">
            <motion.p className={`${customAccentColor.lightText} text-lg leading-relaxed mb-4`}>
              A tűz elleni védekezésről, a műszaki mentésről és a tűzoltóságról szóló **1996. évi XXXI. törvény** és a hozzá kapcsolódó **Országos Tűzvédelmi Szabályzat (OTSZ)** (54/2014. (XII. 5.) BM rendelet) részletesen szabályozza a tűzvédelmi kötelezettségeket Magyarországon. Ezen előírások betartása nem opcionális, hanem minden érintett vállalkozás számára kötelező.
            </motion.p>
            <motion.p className={`${customAccentColor.lightText} text-lg leading-relaxed`}>
              A tűzvédelmi hatóság (katasztrófavédelem) rendszeres ellenőrzéseket végez, és súlyos szankciókat alkalmazhat a hiányosságok esetén. A bírságok mértéke a feltárt szabálytalanság súlyosságától és ismétlődésétől függően **akár 100 000 Ft-tól több millió forintig** is terjedhet. Súlyos tűzeset vagy emberi sérülés esetén pedig büntetőjogi felelősségre vonás is felmerülhet. A szigorú szabályozás célja a megelőzés és az életvédelem.
            </motion.p>
          </motion.div>

          <motion.div variants={itemVariants} className={`p-6 rounded-xl ${customAccentColor.contrastBg} shadow-md border border-gray-200 text-center`}>
            <p className={`${customAccentColor.contrastText} text-xl font-bold mb-2`}>
              Tudta, hogy a tűzvédelmi bírságok rendkívül magasak lehetnek?
            </p>
            <p className="text-gray-700">
              Egyetlen apró hiányosság is milliós nagyságrendű büntetést vonhat maga után. Ne kockáztasson!
            </p>
          </motion.div>
        </motion.section>

        {/* Átfogó tűzvédelmi szolgáltatásaink szekció */}
        <motion.section className="mb-16" variants={sectionVariants}>
          <motion.h2 className={`text-3xl font-bold ${customAccentColor.primary} mb-8 text-center`} variants={itemVariants}>
            Átfogó Tűzvédelmi Szolgáltatásaink
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <DetailCard
              icon={ClipboardDocumentCheckIcon}
              title="Tűzvédelmi Szabályzat és Dokumentáció Készítése"
              content="Elkészítjük, naprakészen tartjuk és auditáljuk vállalkozása teljes tűzvédelmi dokumentációját: Tűzvédelmi Szabályzat, Tűzriadó Terv, Tűzveszélyességi Osztályba Sorolás, Robbanásvédelmi Dokumentáció, stb. Minden, ami a jogszabályoknak való megfeleléshez szükséges."
            />
            <DetailCard
              icon={UserGroupIcon}
              title="Tűzvédelmi Oktatás és Gyakorlatok"
              content="Gyakorlatias, interaktív tűzvédelmi oktatásokat tartunk munkatársainak (munkába álláskori, ismétlődő, rendkívüli). A tűzriadó tervek gyakorlati próbáit is megszervezzük, hogy mindenki tudja a dolgát vészhelyzet esetén."
            />
            <DetailCard
              icon={TruckIcon}
              title="Tűzoltó Eszközök Felülvizsgálata és Karbantartása"
              content="Rendszeresen felülvizsgáljuk és karbantartjuk tűzoltó készülékeit, fali tűzcsapjait, tűzjelző- és oltóberendezéseit. Gondoskodunk a jogszabályban előírt matricázásról és a szükséges minősítések beszerzéséről."
            />
            <DetailCard
              icon={BuildingOfficeIcon}
              title="Helyszíni Szemlék és Auditok"
              content="Alapos helyszíni bejárásokkal és ellenőrzésekkel felmérjük a meglévő rendszereket, azonosítjuk a hiányosságokat és javaslatokat teszünk a biztonság növelésére. Felkészítjük cégét a hatósági ellenőrzésekre."
            />
            <DetailCard
              icon={LightBulbIcon}
              title="Szakértői Tanácsadás és Képviselet"
              content="Folyamatos szakmai támogatást nyújtunk, válaszolunk a felmerülő kérdésekre, és képviseljük Önt a tűzvédelmi hatóságokkal (katasztrófavédelemmel) szemben. Proaktívan figyeljük a jogszabályi változásokat."
            />
            <DetailCard
              icon={SparklesIcon}
              title="Egyedi Tűzvédelmi Megoldások"
              content="Akár új létesítmény tervezéséről, átalakításáról, különleges kockázatú tevékenységről vagy specifikus probléma megoldásáról van szó, személyre szabott tűzvédelmi megoldásokat dolgozunk ki Önnek."
            />
          </div>
        </motion.section>

        {/* Hogyan dolgozunk szekció */}
        <motion.section className="mb-16" variants={sectionVariants}>
          <motion.h2 className={`text-3xl font-bold ${customAccentColor.primary} mb-8 text-center`} variants={itemVariants}>
            Tűzvédelem: Folyamatunk az Ön Nyugalmáért
          </motion.h2>

          <motion.div variants={itemVariants} className="bg-white/5 backdrop-blur-md p-8 rounded-xl shadow-lg border border-gray-700/80">
            <ol className="list-decimal list-inside space-y-6 text-gray-200 text-lg">
              <motion.li variants={itemVariants}>
                <span className="font-bold text-white">Előzetes Felmérés és Konzultáció:</span> Egy ingyenes helyszíni szemle és megbeszélés során feltárjuk vállalkozása tűzvédelmi helyzetét, azonosítjuk a kritikus pontokat és felmérjük az egyedi igényeket.
              </motion.li>
              <motion.li variants={itemVariants}>
                <span className="font-bold text-white">Árajánlat és Szerződéskötés:</span> Az igényfelmérés alapján részletes, átlátható árajánlatot készítünk. Amennyiben elfogadja, szerződést kötünk a vállalt szolgáltatásokról és határidőkről.
              </motion.li>
              <motion.li variants={itemVariants}>
                <span className="font-bold text-white">Dokumentáció és Rendszer Kidolgozása:</span> Elkészítjük vagy aktualizáljuk a szükséges tűzvédelmi dokumentációkat (szabályzatok, tervek), és kialakítjuk a jogszabályoknak megfelelő tűzvédelmi rendszert.
              </motion.li>
              <motion.li variants={itemVariants}>
                <span className="font-bold text-white">Oktatás és Bevezetés:</span> Oktatásokat tartunk a munkatársaknak, és segítjük a tűzvédelmi intézkedések gyakorlati bevezetését a mindennapi működésbe.
              </motion.li>
              <motion.li variants={itemVariants}>
                <span className="font-bold text-white">Folyamatos Karbantartás és Utánkövetés:</span> Rendszeres felülvizsgálatokkal és karbantartással biztosítjuk a tűzvédelmi rendszer folyamatos megfelelőségét. Bármikor állunk rendelkezésére kérdések és tanácsadás esetén.
              </motion.li>
            </ol>
          </motion.div>
        </motion.section>

        {/* CTA */}
        <motion.div
          className={`text-center mt-12 mb-8 p-6 rounded-xl ${customAccentColor.primaryBg} shadow-2xl border-2 border-red-500`}
          variants={itemVariants}
        >
          <h3 className={`text-2xl font-bold text-white mb-3`}>Tegye biztonságba vállalkozását a tűz ellen!</h3>
          <p className={`text-lg text-white max-w-2xl mx-auto`}>
            Ne várja meg az ellenőrzést vagy egy esetleges tűzesetet. Kérjen díjmentes konzultációt szakértőinktől még ma, és aludjon nyugodtan!
          </p>
          <motion.div variants={itemVariants} className="mt-8">
            <Link href="https://calendly.com/" target="_blank" rel="noopener noreferrer">
              <motion.button
                className={`inline-flex items-center justify-center font-bold py-4 px-10 rounded-xl text-lg sm:text-xl text-white ${customAccentColor.primaryHoverBg} transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 ${customAccentColor.primaryRing} focus:ring-offset-2 focus:ring-offset-gray-900`}
                whileHover={{ scale: 1.05, y: -4, boxShadow: '0 10px 20px -5px rgba(239, 68, 68, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                <CalendarDaysIcon className="w-6 h-6 mr-3" />
                Ingyenes Konzultáció Foglalása
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        <motion.footer
          className={`border-t ${customAccentColor.cardBorder} pt-8 mt-12 text-center`}
          variants={itemVariants}
        >
          <p className={`${customAccentColor.secondary} text-sm`}>
            A tűzvédelem nem teher, hanem befektetés a jövőbe.
          </p>
        </motion.footer>
      </motion.div>
    </motion.div>
  );
};

export default TuzvedelemPage;