// components/sections/ServiceHighlightCards.tsx
'use client';

import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  ShieldCheckIcon,
  AcademicCapIcon,
  ExclamationTriangleIcon,
  BoltIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';

// --- ÚJ: PIROS PAJZS IKON AZ INTRO SECTION-BŐL ---
const RedShieldIcon = ({ className }: { className?: string }) => {
  return (
    <motion.div
        className={className}
        initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
        whileInView={{ 
            opacity: 1, 
            scale: 1, 
            rotate: -15,
            transition: { type: 'spring', stiffness: 100, damping: 15, delay: 0.3 }
        }}
        viewport={{ once: true }}
        animate={{ // Folyamatos lebegés
            y: [-4, 4, -4],
            rotate: [-15, -10, -15],
        }}
        transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut'
        }}
    >
        <svg viewBox="0 0 100 125" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_101_2)">
                <path d="M50 0L95 20V55C95 85 50 110 50 110C50 110 5 85 5 55V20L50 0Z" fill="#E53E3E"/>
                <path d="M50 0L5 20V55C5 85 50 110 50 110V0Z" fill="#C53030"/>
                <path d="M25 55L45 75L75 45" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <filter id="filter0_d_101_2" x="0" y="0" width="100" height="125" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="5"/>
                    <feGaussianBlur stdDeviation="5"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.7729167 0 0 0 0 0.1875 0 0 0 0 0.1875 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_101_2"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_101_2" result="shape"/>
                </filter>
            </defs>
        </svg>
    </motion.div>
  );
};


const accentColor = {
  base: '#03BABE',
  bg: 'bg-[#03BABE]',
  text: 'text-[#03BABE]',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  shadow: 'shadow-cyan-500/40',
  hoverShadow: 'hover:shadow-cyan-400/60',
  focusRingOffset: 'focus:ring-offset-slate-100',
};

const servicesData = [ 
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
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const cardItemVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.85, rotateX: -45 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    transition: {
      duration: 0.7,
      ease: [0.165, 0.84, 0.44, 1],
    },
  },
};

interface ServiceCardProps {
  service: typeof servicesData[0];
}

const FlippableServiceCard: React.FC<ServiceCardProps> = ({ service }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    mouseY.set((event.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const tiltIntensity = 8;
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [tiltIntensity, -tiltIntensity]), { stiffness: 250, damping: 25 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-tiltIntensity, tiltIntensity]), { stiffness: 250, damping: 25 });


  return (
    <motion.div
      ref={cardRef}
      className="relative w-full h-[320px] sm:h-[340px] md:h-[360px] cursor-pointer group"
      style={{ perspective: '1000px' }}
      onClick={() => setIsFlipped(!isFlipped)}
      variants={cardItemVariants}
      whileHover={{ y: -10, scale: 1.05 }}
      transition={{ type: 'spring', stiffness: 300, damping: 15 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ 
            transformStyle: 'preserve-3d',
            rotateX,
            rotateY,
        }}
        animate={{ rotateY: isFlipped ? (rotateY.get() + 180) : rotateY.get() }}
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
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
        .custom-scroll::-webkit-scrollbar {
            width: 5px;
        }
        .custom-scroll::-webkit-scrollbar-track {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb {
            background: rgba(255, 255, 255, 0.3);
            border-radius: 10px;
        }
        .custom-scroll::-webkit-scrollbar-thumb:hover {
            background: rgba(255, 255, 255, 0.5);
        }
      `}</style>
      <section className="py-16 lg:py-24 bg-slate-100 font-['Poppins',_sans-serif] overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- MÓDOSÍTOTT CÍMSOR KONTÉNER --- */}
          <div className="relative text-center mb-16 lg:mb-20">
            <RedShieldIcon className="absolute -top-12 right-4 lg:right-20 w-32 h-32 opacity-20 -z-0 hidden lg:block" />
            <h2 className="relative z-10 text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-4">
              Főbb <span className={accentColor.text}>Szolgáltatásaink</span>
            </h2>
            <p className="relative z-10 text-xl text-slate-600 max-w-3xl mx-auto">Ismerje meg, hogyan járulhatunk hozzá vállalkozása biztonságos és szabályos működéséhez.</p>
          </div>

          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10"
            variants={cardListVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {servicesData.map((service) => (
              <FlippableServiceCard key={service.id} service={service} />
            ))}
          </motion.div>

          <div className="text-center mt-16 lg:mt-20">
            <motion.button
              whileHover={{ scale: 1.05, y: -5, boxShadow: '0 10px 20px -5px rgba(3, 186, 190, 0.4)' }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className={`
                ${accentColor.bg} text-white
                font-bold py-4 px-10 rounded-xl text-lg sm:text-xl 
                shadow-lg ${accentColor.shadow} ${accentColor.hoverShadow}
                transition-all duration-300 ease-in-out 
                focus:outline-none focus:ring-4 ${accentColor.ring} ${accentColor.focusRingOffset}
              `}
            >
              Ajánlatot Kérek
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ServiceHighlightCards;