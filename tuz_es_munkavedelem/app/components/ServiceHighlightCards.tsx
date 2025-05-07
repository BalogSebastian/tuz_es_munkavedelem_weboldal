"use client"; // Interaktivitás miatt szükséges

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ShieldCheckIcon,      // Ezt megtartjuk egyelőre, de lehet, hogy nem kell az új listához
  AcademicCapIcon,
  ExclamationTriangleIcon,
  BoltIcon,                     // ÚJ: Érintésvédelemhez
  ClipboardDocumentCheckIcon  // ÚJ: HACCP-hez
} from '@heroicons/react/24/outline';

// Frissített szolgáltatások az új tartalommal, árakkal és hátoldali szöveggel
const servicesData = [
  {
    id: 1,
    title: "Kockázatértékelés",
    description: "Veszélyek azonosítása, kockázatok elemzése, megelőzési intézkedések kidolgozása.",
    icon: ExclamationTriangleIcon,
    colorName: "red",
    gradientClasses: "from-red-500 to-rose-500",
    textColor: "text-red-700",
    backSideText: "Teljes körű munkahelyi kockázatértékelés készítése a jogszabályi előírásoknak megfelelően, javaslatokkal a kockázatok csökkentésére.",
    price: "Egyedi árajánlat",
  },
  {
    id: 2,
    title: "Érintésvédelem",
    description: "Elektromos rendszerek és berendezések biztonsági felülvizsgálata, jegyzőkönyvvel.",
    icon: BoltIcon,
    colorName: "blue",
    gradientClasses: "from-blue-500 to-cyan-500",
    textColor: "text-blue-700",
    backSideText: "Szabványossági felülvizsgálat, érintésvédelmi mérések elvégzése és dokumentálása minősítő irattal.",
    price: "12.000 Ft-tól",
  },
  {
    id: 3,
    title: "Tűz- és Balesetvédelmi Oktatás",
    description: "Interaktív elméleti és gyakorlati képzések a biztonságos munkavégzésért.",
    icon: AcademicCapIcon,
    colorName: "yellow",
    gradientClasses: "from-amber-400 to-orange-500",
    textColor: "text-amber-700",
    backSideText: "A munkakörhöz és munkahelyhez igazított tematika, hatékony ismeretátadás, dokumentált oktatás.",
    price: "20.000 Ft/csoporttól",
  },
  {
    id: 4,
    title: "HACCP Rendszer",
    description: "Élelmiszerbiztonsági (HACCP) rendszer kidolgozása, bevezetése és felülvizsgálata.",
    icon: ClipboardDocumentCheckIcon,
    colorName: "green",
    gradientClasses: "from-green-500 to-emerald-500",
    textColor: "text-green-700",
    backSideText: "Teljes körű HACCP dokumentáció elkészítése, helyszíni tanácsadás és belső auditok elvégzése.",
    price: "Egyedi árajánlat",
  },
];

// Animációs variánsok a kártyák kezdeti megjelenéséhez (megtartva az eredetiből)
const cardListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15, // Kártyák egymás után jelennek meg
      ease: "easeOut",
    },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};


// Külön komponens egy átforduló kártyához
interface ServiceCardProps {
  service: typeof servicesData[0];
}

const FlippableServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="relative w-full h-[320px] cursor-pointer group" // Fix magasság, hogy az átfordulás jól nézzen ki
      style={{ perspective: '1200px' }} // Perspektíva a 3D hatáshoz
      onClick={() => setIsFlipped(!isFlipped)}
      variants={cardItemVariants} // Egyedi kártya animáció a listából
      whileHover={{ y: -8, scale: 1.03 }} // Eredeti hover animáció megtartva
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
    >
      {/* Belső konténer az átforduláshoz */}
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
      >
        {/* Kártya Előlapja */}
        <div
          className="absolute w-full h-full bg-white rounded-2xl shadow-xl p-8 pt-16 text-center flex flex-col"
          style={{ backfaceVisibility: 'hidden' }} // Előlap elrejtése átforduláskor
        >
          <div className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-full inline-flex items-center justify-center bg-gradient-to-br ${service.gradientClasses} shadow-lg ring-4 ring-white group-hover:scale-110 transition-transform duration-300 ease-out`}>
            <service.icon className="w-10 h-10 text-white" aria-hidden="true" />
          </div>
          <h3 className={`text-2xl font-semibold ${service.textColor} mb-3 mt-2`}>{service.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-4">{service.description}</p>
          <div className="mt-auto text-xs text-gray-500 group-hover:text-gray-700 transition-colors">
            Kattints a részletekért és árért!
          </div>
        </div>

        {/* Kártya Hátlapja */}
        <div
          className={`absolute w-full h-full rounded-2xl shadow-xl p-6 sm:p-8 text-white flex flex-col justify-center items-center text-center bg-gradient-to-br ${service.gradientClasses}`} // Hátlap is kapjon gradientet
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }} // Hátlap alapból elforgatva és rejtve
        >
          <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
          <p className="text-base mb-6 leading-relaxed px-2 flex-grow custom-scroll overflow-y-auto max-h-[180px]"> {/* Scroll, ha hosszú a szöveg */}
            {service.backSideText}
          </p>
          <p className={`text-xl font-black ${service.textColor} bg-white px-4 py-2 rounded-md shadow-md mt-auto`}>
            {service.price}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};


const ServiceHighlightCards: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-slate-100"> {/* Kicsit módosított háttér */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">Főbb Szolgáltatásaink</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Ismerje meg, hogyan járulhatunk hozzá vállalkozása biztonságos és szabályos működéséhez.</p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
          variants={cardListVariants}
          initial="hidden"
          whileInView="visible" // Animáció indítása görgetésre
          viewport={{ once: true, amount: 0.1 }} // Egyszer fusson le, 10% láthatóságnál
        >
          {servicesData.map((service) => (
            <FlippableServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        {/* Új Gomb a kártyák alatt */}
        <div className="text-center mt-16 lg:mt-20">
          <button
            type="button"
            // A narancssárga szín a HeaderHero-ból (#DD520F) vagy a tailwind.config.ts-ben definiált 'brand-orange'
            className="bg-[#DD520F] hover:bg-orange-700 text-white font-semibold py-4 px-10 rounded-lg text-lg sm:text-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 transform hover:scale-105"
          >
            Megkérdezem mire van szükségem!
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlightCards;