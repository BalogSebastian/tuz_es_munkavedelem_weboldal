// components/sections/ServiceHighlightCards.tsx
'use client';

import React, { useState, useRef } from 'react'; // useRef hozzáadva a 3D tilt-hez
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'; // További hook-ok importálva
import {
  ShieldCheckIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  BoltIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

const accentColor = {
  bg: 'bg-[#DD520F]',
  textOnAccent: 'text-white',
  hoverBg: 'hover:bg-orange-700',
  ring: 'focus:ring-orange-500',
  focusRingOpacity: 'focus:ring-opacity-75',
};

const servicesData = [ /* ... Az adatok változatlanok, ahogy az előző kódban ... */ 
  { id: 1, title: "Kockázatértékelés", description: "Veszélyek azonosítása, kockázatok elemzése, megelőzési intézkedések kidolgozása.", icon: ExclamationTriangleIcon, colorName: "red", gradientClasses: "from-red-500 to-rose-500", textColor: "text-red-700", backSideText: "Teljes körű munkahelyi kockázatértékelés készítése a jogszabályi előírásoknak megfelelően, javaslatokkal a kockázatok csökkentésére.", price: "Egyedi árajánlat" },
  { id: 2, title: "Érintésvédelem", description: "Elektromos rendszerek és berendezések biztonsági felülvizsgálata, jegyzőkönyvvel.", icon: BoltIcon, colorName: "blue", gradientClasses: "from-blue-500 to-cyan-500", textColor: "text-blue-700", backSideText: "Szabványossági felülvizsgálat, érintésvédelmi mérések elvégzése és dokumentálása minősítő irattal.", price: "12.000 Ft-tól" },
  { id: 3, title: "Tűz- és Balesetvédelmi Oktatás", description: "Interaktív elméleti és gyakorlati képzések a biztonságos munkavégzésért.", icon: AcademicCapIcon, colorName: "yellow", gradientClasses: "from-amber-400 to-orange-500", textColor: "text-amber-700", backSideText: "A munkakörhöz és munkahelyhez igazított tematika, hatékony ismeretátadás, dokumentált oktatás.", price: "20.000 Ft/csoporttól" },
  { id: 4, title: "HACCP Rendszer", description: "Élelmiszerbiztonsági (HACCP) rendszer kidolgozása, bevezetése és felülvizsgálata.", icon: ClipboardDocumentCheckIcon, colorName: "green", gradientClasses: "from-green-500 to-emerald-500", textColor: "text-green-700", backSideText: "Teljes körű HACCP dokumentáció elkészítése, helyszíni tanácsadás és belső auditok elvégzése.", price: "Egyedi árajánlat" },
  { id: 5, title: "Munkavédelem", description: "Átfogó munkavédelmi szolgáltatások, szabályzatoktól a helyszíni bejárásig.", icon: ShieldCheckIcon, colorName: "cyan", gradientClasses: "from-cyan-500 to-sky-500", textColor: "text-cyan-700", backSideText: "Munkavédelmi szabályzatok elkészítése, munkabalesetek kivizsgálása, megelőzési stratégiák és tanácsadás.", price: "Egyedi árajánlat" },
  { id: 6, title: "HACCP Oktatás", description: "Célzott képzés az élelmiszerbiztonsági előírások gyakorlati alkalmazásáról.", icon: AcademicCapIcon, colorName: "purple", gradientClasses: "from-purple-500 to-fuchsia-500", textColor: "text-purple-700", backSideText: "A HACCP rendszer alapelveinek és a helyes higiéniai gyakorlatnak (GHP) az oktatása, dokumentált képzés.", price: "18.000 Ft/csoporttól" },
  { id: 7, title: "Munkahelyi Szabályzat", description: "Egyedi munkahelyi szabályzatok (pl. dohányzási, IT) elkészítése.", icon: DocumentTextIcon, colorName: "indigo", gradientClasses: "from-indigo-500 to-violet-500", textColor: "text-indigo-700", backSideText: "Vállalatra szabott belső szabályzatok kidolgozása a jogi megfelelőség és a hatékony működés érdekében.", price: "Egyedi árajánlat" },
  { id: 8, title: "Környezetvédelem", description: "Környezetvédelmi tanácsadás, hulladékgazdálkodási tervek készítése.", icon: GlobeAltIcon, colorName: "lime", gradientClasses: "from-lime-400 to-green-500", textColor: "text-lime-700", backSideText: "Környezetvédelmi megbízotti feladatok ellátása, hatósági ügyintézés, környezetvédelmi auditok.", price: "Egyedi árajánlat" },
];

const cardListVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 }, // Kisebb stagger a gyorsabb, de lépcsőzetes megjelenésért
  },
};

// MÓDOSÍTOTT KÁRTYA BELÉPŐ ANIMÁCIÓ
const cardItemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.85, rotateX: -45 }, // Kezdeti dőlés és kisebb skála
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.7, // Kicsit hosszabb az összetettebb animációhoz
      ease: [0.165, 0.84, 0.44, 1], // "easeOutQuart" - elegáns, gyorsuló majd lassuló
    },
  },
};

interface ServiceCardProps {
  service: typeof servicesData[0];
}

const FlippableServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null); // Ref a kártya elemhez

  // Egérmozgás figyelése a 3D tilt effekthez
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    // Egér pozíciója a kártya közepéhez képest (-0.5 to 0.5 tartományban)
    mouseX.set((event.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    mouseY.set((event.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Transzformációk az egérmozgás alapján
  const tiltIntensity = 8; // Dőlés mértéke (fokban)
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [tiltIntensity, -tiltIntensity]), { stiffness: 250, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-tiltIntensity, tiltIntensity]), { stiffness: 250, damping: 25 });


  return (
    <motion.div
      ref={cardRef} // Ref hozzáadása
      className="relative w-full h-[320px] sm:h-[340px] md:h-[360px] cursor-pointer group"
      style={{ perspective: '1000px' }} // Csökkentett perspektíva a finomabb hatáshoz
      onClick={() => setIsFlipped(!isFlipped)}
      variants={cardItemVariants}
      whileHover={{ y: -10, scale: 1.05 }} // Alap hover emelkedés és skálázódás
      transition={{ type: 'spring', stiffness: 300, damping: 15 }} // A whileHover-hez tartozó transition
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div // Ez a div kapja a 3D dőlést
        className="relative w-full h-full"
        style={{ 
            transformStyle: 'preserve-3d',
            rotateX, // Alkalmazzuk a dinamikus dőlést
            rotateY,
        }}
        animate={{ rotateY: isFlipped ? (rotateY.get() + 180) : rotateY.get() }} // A flip animáció most hozzáadódik az egér dőléséhez
        transition={{ duration: 0.7, ease: [0.34, 1.56, 0.64, 1] }}
      >
        {/* Kártya Előlapja */}
        <div
          className="absolute w-full h-full bg-white rounded-2xl shadow-xl p-6 sm:p-8 pt-16 text-center flex flex-col border border-slate-100"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <motion.div 
            className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-5 rounded-full inline-flex items-center justify-center bg-gradient-to-br ${service.gradientClasses} shadow-lg ring-4 ring-white transition-all duration-300 ease-out group-hover:ring-slate-100`}
            animate={{ scale: [1, 1.04, 1], boxShadow: ["0px 4px 12px rgba(0,0,0,0.12)", "0px 7px 18px rgba(0,0,0,0.18)", "0px 4px 12px rgba(0,0,0,0.12)"]}}
            transition={{ scale: { duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }, boxShadow: { duration: 2, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" } }}
          >
            <service.icon className="w-10 h-10 text-white" aria-hidden="true" />
          </motion.div>
          <h3 className={`text-2xl font-semibold ${service.textColor} mb-3 mt-4`}>{service.title}</h3>
          <p className="text-gray-600 text-sm leading-relaxed flex-grow mb-4 line-clamp-3 sm:line-clamp-4">
            {service.description}
          </p>
          <motion.div 
            className="mt-auto text-xs text-gray-500 group-hover:text-gray-800 transition-colors flex items-center justify-center group-hover:font-medium"
            animate={{ opacity: isFlipped ? 0 : 1 }}
            transition={{duration: 0.2}}
          >
            Kattints a részletekért
            <motion.span className="ml-1.5 transition-transform duration-200 group-hover:translate-x-1">➔</motion.span>
          </motion.div>
        </div>

        {/* Kártya Hátlapja */}
        <div
          className={`absolute w-full h-full rounded-2xl shadow-xl p-6 sm:p-8 text-white flex flex-col justify-center items-center text-center bg-gradient-to-br ${service.gradientClasses}`}
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          <h4 className="text-2xl font-bold mb-4">{service.title}</h4>
          <p className="text-base mb-6 leading-relaxed px-2 flex-grow custom-scroll overflow-y-auto max-h-[160px] sm:max-h-[180px]">
            {service.backSideText}
          </p>
          <p className={`text-xl font-black ${service.textColor} bg-white/90 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md mt-auto`}>
            {service.price}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ServiceHighlightCards: React.FC = () => {
  return (
    <section className="py-16 lg:py-24 bg-slate-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">Főbb Szolgáltatásaink</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">Ismerje meg, hogyan járulhatunk hozzá vállalkozása biztonságos és szabályos működéséhez.</p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
          variants={cardListVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.05 }} // Kicsit hamarabb induljon
        >
          {servicesData.map((service) => (
            <FlippableServiceCard key={service.id} service={service} />
          ))}
        </motion.div>

        <div className="text-center mt-16 lg:mt-20">
          <button
            type="button"
            className={`
              ${accentColor.bg} ${accentColor.hoverBg} ${accentColor.textOnAccent} 
              font-semibold py-4 px-10 rounded-lg text-lg sm:text-xl 
              shadow-lg hover:shadow-xl 
              transition-all duration-300 ease-in-out 
              focus:outline-none focus:ring-2 ${accentColor.ring} ${accentColor.focusRingOpacity} 
              transform hover:scale-105 active:scale-95
            `}
          >
            Megkérdezem mire van szükségem!
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceHighlightCards;