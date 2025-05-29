// app/components/FreeConsultationCtaSection.tsx
'use client';

import React, { useState, useEffect } from 'react'; // useState, useEffect hozzáadva
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// Brand színek
const accentColor = {
  baseHex: '#DD520F',
  bg: 'bg-[#DD520F]',
  textOnAccent: 'text-white',
  hoverBg: 'hover:bg-orange-700', // Sötétebb narancs hoverre
  ring: 'focus:ring-orange-500',
  focusRingOffsetDark: 'focus:ring-offset-gray-900', // Sötét háttérhez igazított offset
};

// Típus a háttérelemek konfigurációjához
interface AnimatedBackgroundElementConfig {
  key: string;
  className: string;
  initial: Record<string, any>;
  animate: Record<string, any>;
  transition: Record<string, any>;
  style?: React.CSSProperties; // Opcionális közvetlen stílusok (pl. backgroundColor)
}

const FreeConsultationCtaSection: React.FC = () => {
  const [bgElements, setBgElements] = useState<AnimatedBackgroundElementConfig[]>([]);

  useEffect(() => {
    const elements: AnimatedBackgroundElementConfig[] = [...Array(3)].map((_, i) => {
      const size = 150 + Math.random() * 250; // Méret 150px és 400px között
      const duration = 20 + Math.random() * 20; // Időtartam 20s és 40s között
      return {
        key: `cta-bg-el-${i}`,
        className: "absolute rounded-full filter blur-3xl", // blur-3xl a nagyon lágy hatásért
        initial: { 
          opacity: 0, 
          scale: 0.5 + Math.random() * 0.3,
          x: `${Math.random() * 100 - 50}vw`, // Szélesebb tartományban indulhatnak
          y: `${Math.random() * 100 - 50}vh`,
        },
        animate: {
          opacity: [0, 0.03 + Math.random() * 0.05, 0.02 + Math.random() * 0.03, 0], // Nagyon alacsony opacitás
          scale: [0.7, 1 + Math.random() * 0.2, 0.8 + Math.random() * 0.1, 0.7],
          x: [`${Math.random() * 80 - 40}vw`, `${Math.random() * 80 - 40}vw`],
          y: [`${Math.random() * 80 - 40}vh`, `${Math.random() * 80 - 40}vh`],
          rotate: [0, Math.random() * 180 - 90, Math.random() * 180 - 90, 0],
        },
        style: { // A backgroundColor itt kerül beállításra, hogy a random ne okozzon hydration hibát
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: i % 2 === 0 ? `rgba(221, 82, 15, ${0.02 + Math.random() * 0.02})` : `rgba(56, 189, 248, ${0.01 + Math.random()*0.02})`, // Nagyon halvány narancs és kék
            top: `${Math.random() * 100}%`, // Kezdeti random top/left a style-ban
            left: `${Math.random() * 100}%`,
        },
        transition: {
          duration: duration,
          repeat: Infinity,
          repeatType: 'mirror' as const,
          ease: 'easeInOut',
          delay: Math.random() * 5,
        },
      };
    });
    setBgElements(elements);
  }, []);


  const sectionContentVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.25, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 15, duration: 0.7 },
    },
  };

  return (
    <section className="bg-gradient-to-r from-slate-800 via-gray-900 to-black py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Animált háttérelemek - csak kliensoldalon jelennek meg */}
      {bgElements.length > 0 && bgElements.map(el => (
        <motion.div
          key={el.key}
          className={el.className}
          style={el.style} // Itt adjuk át a kliensoldalon generált random stílusokat
          initial={el.initial}
          animate={el.animate}
          transition={el.transition}
        />
      ))}

      <motion.div 
        className="max-w-4xl mx-auto text-center relative z-10"
        variants={sectionContentVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight" // Kicsit erősebb font-weight
          variants={itemVariants}
        >
          Készen Áll a Következő Lépésre?
        </motion.h2>
        <motion.p 
          className="text-lg sm:text-xl text-slate-300 mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants}
        >
          Vegye fel velünk a kapcsolatot egy díjmentes konzultációért, ahol személyre szabott tanácsokkal segítjük vállalkozása tűz- és munkavédelmi kihívásaiban. Nincsenek kötelezettségek, csak tiszta, szakértői útmutatás.
        </motion.p>
        <motion.button
          type="button"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -3, boxShadow: `0 10px 20px -5px ${accentColor.baseHex || '#DD520F'}40` }} // Brand narancs árnyék
          whileTap={{ scale: 0.97 }}
          className={`
            inline-flex items-center justify-center 
            ${accentColor.bg} ${accentColor.hoverBg} ${accentColor.textOnAccent} 
            font-semibold py-4 px-10 rounded-lg text-lg sm:text-xl 
            shadow-xl hover:shadow-2xl 
            transition-all duration-300 ease-in-out 
            focus:outline-none focus:ring-2 ${accentColor.ring} ${accentColor.focusRingOffsetDark} focus:ring-opacity-75 
            transform 
          `}
        >
          Ingyenes Konzultáció
          <motion.span 
            initial={{ x: 0 }} 
            whileHover={{ x: 4 }} 
            transition={{type: 'spring', stiffness: 300, damping: 15}}
          >
            <ArrowRightIcon className="ml-3 -mr-1 h-6 w-6" aria-hidden="true" />
          </motion.span>
        </motion.button>
      </motion.div>
    </section>
  );
};

// Ha nincs, akkor a #DD520F default értéket használja a kódban.
// Az accentColor definíciója így nézne ki pl.:
// const accentColor = {
//   baseHex: '#DD520F', // Ezt kell hozzáadni
//   bg: 'bg-[#DD520F]',
//   textOnAccent: 'text-white',
//   hoverBg: 'hover:bg-orange-700',
//   ring: 'focus:ring-orange-500',
//   focusRingOffsetDark: 'focus:ring-offset-gray-900',
// };

export default FreeConsultationCtaSection;