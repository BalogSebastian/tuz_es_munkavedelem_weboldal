'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  BoltIcon, // Fő ikon
  ArrowPathIcon, // Rendszeres ellenőrzés
  BuildingOffice2Icon, // Vállalkozások
  EyeIcon, // Szemrevételezés
  BeakerIcon, // Mérések
  DocumentCheckIcon, // Minősítő irat
  ExclamationTriangleIcon, // Veszély
  BanknotesIcon, // Bírság
  ShieldExclamationIcon, // Biztosítás
  MagnifyingGlassIcon, // Hibafeltárás
  WrenchScrewdriverIcon, // Javítás
  LightBulbIcon, // Tanácsadás
  CalendarDaysIcon, // Időszakos ellenőrzés / Konzultáció
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// A dizájn és a színséma változatlan marad a kérésnek megfelelően.
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

// Ez a komponens a képeken "két oszlop, ikonokkal" részként jelölt elemekhez tökéletes.
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

// Ez a komponens a részletesebb, listaelem-szerű tartalmakhoz ideális.
const ServiceDetailCard = ({ icon: Icon, title, content }: { icon: React.ElementType, title: string, content: string }) => (
    <motion.div variants={itemVariants} className="flex items-start gap-4 p-5 bg-white/70 backdrop-blur-md rounded-xl shadow border border-slate-100 h-full">
        <div className={`p-3 rounded-full bg-cyan-100 ${accentColor.text} flex-shrink-0 mt-1`}>
            <Icon className="w-6 h-6" />
        </div>
        <div>
            <h3 className="text-xl font-bold text-slate-800 mb-1">{title}</h3>
            <p className="text-slate-600 leading-relaxed">{content}</p>
        </div>
    </motion.div>
);

const VillamosBiztonsagiFelulvizsgalatPage: React.FC = () => {
  const router = useRouter();

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

        {/* 1. KÉP TARTALMA: Főcím és bevezető */}
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 text-center"
          variants={itemVariants}
        >
          Villamos Biztonsági <span className={accentColor.text}>Felülvizsgálat</span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-12 text-center max-w-4xl mx-auto"
          variants={itemVariants}
        >
          A villamos biztonsági felülvizsgálat (VBF), vagy köznyelvben <strong className="font-extrabold text-slate-800">érintésvédelmi felülvizsgálat</strong>, egy kötelezően elvégzendő, szisztematikus ellenőrzés. Célja a villamos berendezések, gépek és hálózatok hibáinak felderítése, hogy <strong className="font-extrabold text-slate-800">megelőzzük az áramütéses baleseteket és a tűzeseteket</strong>. Ez a folyamat nem csupán egy jogi előírás, hanem a legfontosabb eszköz a vagyonvédelemre és a munkatársak biztonságára.
        </motion.p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 max-w-4xl mx-auto">
            <FeatureCard
                icon={ArrowPathIcon}
                title="Rendszeres Ellenőrzés és Megelőzés"
                description="Azonosítjuk a veszélyeket a villamos hálózatban és a berendezésekben, így időben elkerülhetők a zárlatok, túlmelegedések és áramütéses balesetek."
            />
            <FeatureCard
                icon={BuildingOffice2Icon}
                title="Minden Vállalkozásnak Kötelező"
                description="Legyen szó irodaházról, üzlethelyiségről, gyártócsarnokról, vagy bármilyen, villamos energiát használó helyről, a rendszeres VBF elvégzése jogszabályi kötelezettség."
            />
        </div>

        {/* 2. KÉP TARTALMA: A felülvizsgálat lépései */}
        <motion.h2
          className="text-3xl font-bold text-slate-900 mb-8 text-center"
          variants={itemVariants}
        >
          Miből épül fel egy Villamos Biztonsági Felülvizsgálat?
        </motion.h2>

        <motion.p
            className="text-slate-700 leading-relaxed mb-10 max-w-4xl mx-auto text-center"
            variants={itemVariants}
        >
            Egy teljes körű VBF a következő lépésekből áll:
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            <ServiceDetailCard
                icon={EyeIcon}
                title="Szemrevételezés"
                content="Vizsgáljuk a villamos hálózat és berendezések látható állapotát, ellenőrizzük a sérüléseket és a szabályos telepítést."
            />
            <ServiceDetailCard
                icon={BeakerIcon}
                title="Mérések elvégzése"
                content="Speciális, kalibrált műszerekkel elvégezzük az érintésvédelemre, a szigetelési ellenállásra és más elektromos paraméterekre vonatkozó méréseket."
            />
            <ServiceDetailCard
                icon={DocumentCheckIcon}
                title="Minősítő irat kiállítása"
                content="A vizsgálatról részletes jegyzőkönyvet készítünk, amely tartalmazza a felülvizsgálat eredményeit és a szükséges intézkedéseket. Ez a dokumentum igazolja a hatósági ellenőrzések során is a megfelelőséget."
            />
        </div>

        {/* 3. KÉP TARTALMA: Jogi kötelezettségek */}
         <motion.h2
          className="text-3xl font-bold text-slate-900 mb-8 text-center"
          variants={itemVariants}
        >
          Mi ennek a jogi kötelezettsége?
        </motion.h2>

        <motion.p
          className="text-slate-700 leading-relaxed mb-10 max-w-4xl mx-auto"
          variants={itemVariants}
        >
          A felülvizsgálat elvégzését a <strong className="font-extrabold text-slate-800">40/2017. (XII. 4.) NGM rendelet</strong> és a <strong className="font-extrabold text-slate-800">2016. évi CLXXXIX. törvény</strong> a villamos energiáról írja elő. A felülvizsgálat gyakorisága a munkahelyi környezettől és a berendezések típusától függ, de elmulasztása súlyos következményekkel jár:
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
            <ServiceDetailCard
                icon={BanknotesIcon}
                title="Pénzbírság"
                content="A munkavédelmi hatóság bírságot szabhat ki, ha a felülvizsgálati jegyzőkönyv hiányzik vagy nem naprakész."
            />
            <ServiceDetailCard
                icon={ExclamationTriangleIcon}
                title="Tűz- és balesetveszély"
                content="A fel nem tárt hibák áramütéshez vagy elektromos tűzesethez vezethetnek, ami súlyos személyi sérülést vagy anyagi kárt okozhat."
            />
            <ServiceDetailCard
                icon={ShieldExclamationIcon}
                title="Biztosítási fedezet hiánya"
                content="Káresemény (pl. tűz) esetén a biztosító megtagadhatja a kártérítést, ha a megfelelő jegyzőkönyvek nem állnak rendelkezésre."
            />
        </div>

        {/* 4. KÉP TARTALMA: "Így csináljuk mi" */}
        <motion.h2
          className="text-3xl font-bold text-slate-900 mb-8 text-center"
          variants={itemVariants}
        >
          Így csináljuk mi:
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
            <ServiceDetailCard
                icon={BoltIcon}
                title="Villamos Biztonsági Felülvizsgálat"
                content="Szakértőink elvégzik a teljes körű vizsgálatot az érintésvédelemre és a hálózat biztonságára vonatkozóan, kiállítva a jogszabályoknak megfelelő minősítő iratot."
            />
            <ServiceDetailCard
                icon={MagnifyingGlassIcon}
                title="Hibafeltárás és Javítási Javaslat"
                content="A felülvizsgálat során feltárjuk a hibákat és javaslatot teszünk azok szakszerű javítására, megelőzve ezzel a komolyabb problémákat."
            />
            <ServiceDetailCard
                icon={LightBulbIcon}
                title="Szaktanácsadás és Dokumentáció"
                content="Azonnal átadjuk a hatósági ellenőrzéseken is érvényes dokumentációt, és tanácsot adunk a villamos biztonsággal kapcsolatos kérdésekben."
            />
            <ServiceDetailCard
                icon={CalendarDaysIcon}
                title="Időszakos ellenőrzések"
                content="Gondoskodunk a jogszabályban előírt gyakoriságú időszakos felülvizsgálatokról, hogy a rendszere mindig biztonságos és naprakész legyen."
            />
        </div>

        {/* 5. KÉP TARTALMA: Call to Action */}
        <motion.div
          className="text-center mt-12 mb-8"
          variants={itemVariants}
        >
          <Link 
            href="https://app.minup.io/book/munkavedelmiszaki/service/46358" 
            target="_blank" 
            rel="noopener noreferrer"
          >
            <button
              className={`inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-8 px-12 rounded-xl text-3xl shadow-lg cta-glow-red transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900`}
            >
              Foglalj egy ingyenes konzultációt!
            </button>
          </Link>
        </motion.div>

        <motion.footer
          className="border-t border-slate-200 pt-8 mt-12 text-center"
          variants={itemVariants}
        >
        </motion.footer>
      </motion.div>
    </motion.div>
  );
};

export default VillamosBiztonsagiFelulvizsgalatPage;