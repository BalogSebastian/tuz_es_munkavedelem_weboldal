'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { SparklesIcon } from '@heroicons/react/24/solid';
// ÚJ: Ikon importálása
import { FaArrowTrendDown } from 'react-icons/fa6';

// --- SZÍNPALETTA (Változatlan) ---
const accentColor = {
  base: '#03BABE',
  bg: 'bg-[#03BABE]',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  focusRingOffset: 'focus:ring-offset-slate-900',
  textGradient: 'from-cyan-300 to-sky-400',
};

// --- Animációs variánsok (Változatlan) ---
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

// TÖRÖLVE: Az AnimatedDecorativeArrow komponens el lett távolítva

const CallToActionSection: React.FC = () => {
  const [backgroundElementStyles, setBackgroundElementStyles] = useState<BackgroundElementStyle[]>([]);

  useEffect(() => {
    const styles: BackgroundElementStyle[] = [...Array(3)].map((_, i) => ({
      width: `${300 + Math.random() * 400}px`,
      height: `${300 + Math.random() * 400}px`,
      backgroundColor: i % 2 === 0 ? 'rgba(3, 186, 190, 0.07)' : 'rgba(14, 116, 144, 0.07)',
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
    }));
    setBackgroundElementStyles(styles);
  }, []);


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
      <section className="bg-slate-900 py-24 sm:py-32 px-4 sm:px-6 lg:px-8 relative font-['Poppins',_sans-serif] overflow-hidden">
        <div className="absolute inset-0 cta-grid-pattern z-0"></div>

        {backgroundElementStyles.map((style, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full filter blur-3xl"
              style={style}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0.2, 0], scale: [0.7, 1.2, 0.7] }}
              transition={{
                  duration: 20 + Math.random() * 15,
                  repeat: Infinity,
                  repeatType: 'mirror',
                  delay: i * 5,
                  ease: 'easeInOut'
              }}
            />
        ))}
        
        <motion.div
            className="relative max-w-7xl mx-auto"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
        >
            {/* BAL OLDALI NYÍL: Módosítva */}
            <motion.div
              className="absolute -top-20 left-0 w-24 h-24 hidden xl:block text-red-500"
              variants={itemVariants}
            >
              <FaArrowTrendDown className="w-full h-full transform -scale-x-100" />
            </motion.div>

            {/* JOBB OLDALI NYÍL: Módosítva */}
            <motion.div
              className="absolute bottom-0 right-0 w-24 h-24 hidden xl:block text-red-500"
              variants={itemVariants}
            >
              <FaArrowTrendDown className="w-full h-full" />
            </motion.div>

            <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-10">
                <motion.h2 
                    className={`text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${accentColor.textGradient} mb-6 tracking-tight`}
                    variants={itemVariants}
                >
                    Készen állsz a biztonságra?
                </motion.h2>
                <motion.p 
                    className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed"
                    variants={itemVariants}
                >
                    Tedd meg az első lépést, és tudd biztonságban minden értékedet, előzd meg az esetleges tüzet, és a baleseteket!
                </motion.p>
                
                <motion.div variants={itemVariants}>
                    <motion.button
                        type="button"
                        className={`
                            inline-flex items-center gap-3 ${accentColor.bg} text-white
                            font-bold py-4 px-10 rounded-xl text-lg sm:text-xl 
                            transition-shadow duration-300 ease-in-out 
                            focus:outline-none focus:ring-4 ${accentColor.ring} ${accentColor.focusRingOffset}
                        `}
                        animate={{
                            boxShadow: [
                                "0 0 15px rgba(3, 186, 190, 0.3)",
                                "0 0 25px rgba(3, 186, 190, 0.5)",
                                "0 0 15px rgba(3, 186, 190, 0.3)",
                            ]
                        }}
                        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                        whileHover={{ scale: 1.05, y: -4, boxShadow: '0 0 30px rgba(3, 186, 190, 0.6)' }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <SparklesIcon className="w-6 h-6" />
                        Ingyenes Konzultáció szakemberrel
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
      </section>
    </>
  );
};

export default CallToActionSection;