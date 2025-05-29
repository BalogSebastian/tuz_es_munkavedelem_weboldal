// components/sections/CallToActionSection.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react'; // useState, useEffect hozzáadva
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

const accentColor = {
  bg: 'bg-[#DD520F]',
  textOnAccent: 'text-white',
  hoverBg: 'hover:bg-orange-700',
  ring: 'focus:ring-orange-500',
  focusRingOffset: 'focus:ring-offset-gray-900',
};

const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 } 
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { type: 'spring', stiffness: 100, damping: 15, duration: 0.6 } 
  },
};

// Típus a háttérelemek stílusához
interface BackgroundElementStyle extends React.CSSProperties {}

const CallToActionSection: React.FC = () => {
  // JAVÍTÁS: Állapot a háttérelemek stílusainak tárolására
  const [backgroundElementStyles, setBackgroundElementStyles] = useState<BackgroundElementStyle[]>([]);

  // JAVÍTÁS: useEffect a stílusok kliensoldali generálásához
  useEffect(() => {
    const styles: BackgroundElementStyle[] = [...Array(3)].map((_, i) => ({
      width: `${200 + Math.random() * 300}px`,
      height: `${200 + Math.random() * 300}px`,
      backgroundColor: i % 2 === 0 ? 'rgba(221, 82, 15, 0.03)' : 'rgba(56, 189, 248, 0.03)', // Ez maradhat, mert nem Math.random alapú
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
    setBackgroundElementStyles(styles);
  }, []); // Üres függőségi lista: csak mount után fut le egyszer a kliensen


  return (
    <section className="bg-gray-900 py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Finom, absztrakt háttér animációk */}
      {/* JAVÍTÁS: Renderelés a kliensoldalon generált stílusokkal */}
      {backgroundElementStyles.length > 0 && backgroundElementStyles.map((style, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full filter blur-3xl" // Alap stílusok
          style={style} // Dinamikus, véletlenszerű stílusok
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: [0, 0.05, 0.08, 0], scale: [0.7, 1, 1.1, 0.7] }} // Opacity animáció finomítva
          transition={{
            duration: 15 + Math.random() * 10, // Ez az animáció definíciója, itt maradhat a Math.random
            repeat: Infinity,
            repeatType: 'mirror',
            delay: i * 3,
            ease: 'easeInOut'
          }}
        />
      ))}

      <motion.div 
        className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-10"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight"
          variants={itemVariants}
        >
          Készen áll a Változásra?
        </motion.h2>
        <motion.p 
          className="text-lg sm:text-xl text-slate-300 max-w-xl mx-auto mb-10 lg:mb-12 leading-relaxed"
          variants={itemVariants}
        >
          Tegye meg az első lépést egy biztonságosabb és szabálykonformebb munkakörnyezet felé. Kérjen díjmentes konzultációt még ma!
        </motion.p>
        
        <motion.button
          type="button"
          variants={itemVariants}
          whileHover={{ scale: 1.05, y: -2 }}
          whileTap={{ scale: 0.98 }}
          className={`
            ${accentColor.bg} ${accentColor.hoverBg} ${accentColor.textOnAccent}
            font-semibold py-4 px-10 rounded-lg text-lg sm:text-xl 
            shadow-xl hover:shadow-2xl 
            transition-all duration-300 ease-in-out 
            focus:outline-none focus:ring-2 ${accentColor.ring} ${accentColor.focusRingOffset} focus:ring-opacity-75 
            transform 
          `}
        >
          Ajánlatkérés / Konzultáció
          {/* <ArrowRightIcon className="ml-3 h-5 w-5" /> Opcionális ikon */}
        </motion.button>
      </motion.div>
    </section>
  );
};

export default CallToActionSection;