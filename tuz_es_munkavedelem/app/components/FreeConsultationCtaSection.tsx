// app/components/FreeConsultationCtaSection.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// --- A MEGFELELŐ, ÍVES NYÍL IKON ---
const AnimatedDecorativeArrow: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <motion.svg
            viewBox="0 0 100 100" fill="none" className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
        >
            <motion.path
                d="M20 20C48.33 22.17 73.33 45.17 80 80" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
                variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: "circOut", delay: 0.5 } }
                }} />
            <motion.path
                d="M70 73L80 80L87 70" stroke="currentColor" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round"
                variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, ease: "circOut", delay: 1.2 } }
                }} />
        </motion.svg>
    );
};

// --- EGYSÉGESÍTETT CIÁN SZÍNSÉMA ---
const accentColor = {
  baseHex: '#03BABE',
  bg: 'bg-[#03BABE]',
  textOnAccent: 'text-white',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  focusRingOffsetDark: 'focus:ring-offset-gray-900',
};

interface AnimatedBackgroundElementConfig {
  key: string;
  className: string;
  initial: Record<string, any>;
  animate: Record<string, any>;
  transition: Record<string, any>;
  style?: React.CSSProperties;
}

const FreeConsultationCtaSection: React.FC = () => {
  const [bgElements, setBgElements] = useState<AnimatedBackgroundElementConfig[]>([]);

  useEffect(() => {
    const elements: AnimatedBackgroundElementConfig[] = [...Array(3)].map((_, i) => {
      const size = 150 + Math.random() * 250;
      const duration = 20 + Math.random() * 20;
      return {
        key: `cta-bg-el-${i}`,
        className: "absolute rounded-full filter blur-3xl",
        initial: { opacity: 0, scale: 0.5 + Math.random() * 0.3, x: `${Math.random() * 100 - 50}vw`, y: `${Math.random() * 100 - 50}vh` },
        animate: {
          opacity: [0, 0.03 + Math.random() * 0.05, 0.02 + Math.random() * 0.03, 0],
          scale: [0.7, 1 + Math.random() * 0.2, 0.8 + Math.random() * 0.1, 0.7],
          x: [`${Math.random() * 80 - 40}vw`, `${Math.random() * 80 - 40}vw`],
          y: [`${Math.random() * 80 - 40}vh`, `${Math.random() * 80 - 40}vh`],
          rotate: [0, Math.random() * 180 - 90, Math.random() * 180 - 90, 0],
        },
        style: {
            width: `${size}px`, height: `${size}px`,
            backgroundColor: i % 2 === 0 ? `rgba(3, 186, 190, ${0.02 + Math.random() * 0.02})` : `rgba(14, 116, 144, ${0.01 + Math.random()*0.02})`,
            top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
        },
        transition: { duration: duration, repeat: Infinity, repeatType: 'mirror' as const, ease: 'easeInOut', delay: Math.random() * 5 },
      };
    });
    setBgElements(elements);
  }, []);

  const sectionContentVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.25, delayChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15, duration: 0.7 } },
  };

  return (
    <>
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
        .cta-grid-pattern {
            background-image: linear-gradient(rgba(203, 213, 225, 0.05) 1px, transparent 1px),
                              linear-gradient(to right, rgba(203, 213, 225, 0.05) 1px, transparent 1px);
            background-size: 4rem 4rem;
        }
      `}</style>
    <section className="bg-slate-900 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-['Poppins',_sans-serif] cta-grid-pattern">
      {bgElements.length > 0 && bgElements.map(el => ( <motion.div key={el.key} className={el.className} style={el.style} initial={el.initial} animate={el.animate} transition={el.transition} /> ))}
      
      {/* JAVÍTOTT NYÍL: SOKKAL BELJEBB HELYEZVE */}
      <AnimatedDecorativeArrow className="absolute top-1/2 -translate-y-1/2 left-16 md:left-24 lg:left-48 w- h-60 text-red-500 transform -scale-x-100 hidden lg:block" />

      <motion.div 
        className="max-w-4xl mx-auto text-center relative z-10"
        variants={sectionContentVariants} initial="hidden"
        whileInView="visible" viewport={{ once: true, amount: 0.3 }}
      >
        <motion.h2 
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tight"
          variants={itemVariants} >
          Készen Áll a Következő Lépésre?
        </motion.h2>
        <motion.p 
          className="text-lg sm:text-xl text-slate-300 mb-10 lg:mb-12 max-w-2xl mx-auto leading-relaxed"
          variants={itemVariants} >
          Vegye fel velünk a kapcsolatot egy díjmentes konzultációért, ahol személyre szabott tanácsokkal segítjük vállalkozása tűz- és munkavédelmi kihívásaiban. Nincsenek kötelezettségek, csak tiszta, szakértői útmutatás.
        </motion.p>
        <motion.button
          type="button" variants={itemVariants}
          whileHover={{ scale: 1.05, y: -3, boxShadow: `0 10px 20px -5px ${accentColor.baseHex}40` }}
          whileTap={{ scale: 0.97 }}
          className={`inline-flex items-center justify-center ${accentColor.bg} ${accentColor.hoverBg} ${accentColor.textOnAccent} font-semibold py-4 px-10 rounded-lg text-lg sm:text-xl shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 ${accentColor.ring} ${accentColor.focusRingOffsetDark} focus:ring-opacity-75 transform`}
        >
          Ingyenes Konzultáció
          <motion.span 
            initial={{ x: 0 }} whileHover={{ x: 4 }} 
            transition={{type: 'spring', stiffness: 300, damping: 15}}
          >
            <ArrowRightIcon className="ml-3 -mr-1 h-6 w-6" aria-hidden="true" />
          </motion.span>
        </motion.button>
      </motion.div>
    </section>
    </>
  );
};

export default FreeConsultationCtaSection;