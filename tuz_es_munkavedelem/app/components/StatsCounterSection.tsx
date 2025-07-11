// components/sections/StatsCounterSection.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/24/outline'; // Csak a szükséges ikonok maradnak

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


const stats = [
  { value: 150, label: "Elégedett Ügyfél", suffix: "+", icon: UserGroupIcon },
  { value: 150, label: "Elkerült Büntetés", suffix: "%", icon: ShieldCheckIcon }, // Módosított érték
];

function AnimatedCounter({ value, isInView }: { value: number; isInView: boolean }) {
    const [displayValue, setDisplayValue] = useState(0);
    useEffect(() => {
        if (isInView) {
            const controls = animate(0, value, {
                duration: 2.0, ease: "easeOut",
                onUpdate(latest) { setDisplayValue(Math.round(latest)); }
            });
            return () => controls.stop();
        }
    }, [isInView, value]);
    return <>{displayValue}</>;
}

const IconShineEffect: React.FC<{ delay: number, isParentInView: boolean }> = ({ delay, isParentInView }) => {
    if (!isParentInView) return null;
    return (
        <motion.div
            className="absolute inset-0 w-full h-full overflow-hidden rounded-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }}
            transition={{ duration: 0.8, ease: "easeInOut", delay: delay + 0.4 }}
        >
            <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent"
                initial={{ x: "-150%", width: "50%" }}
                animate={{ x: "150%" }}
                transition={{ duration: 0.6, ease: "linear" }}
            />
        </motion.div>
    );
};

interface BackgroundElementStyle extends React.CSSProperties {}

const StatsCounterSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });
  
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
      <section ref={sectionRef} className="py-24 sm:py-32 font-['Poppins',_sans-serif] bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 cta-grid-pattern z-0"></div>
        {backgroundElementStyles.map((style, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full filter blur-3xl"
              style={style}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: [0, 1, 0.2, 0], scale: [0.7, 1.2, 0.7] }}
              transition={{ duration: 20 + Math.random() * 15, repeat: Infinity, repeatType: 'mirror', delay: i * 5, ease: 'easeInOut' }}
            />
        ))}

        {/* BAL OLDALI NYÍL: Befelé mutat, kicsi */}
        <AnimatedDecorativeArrow className="absolute top-1/3 -translate-y-1/2 left-4 md:left-8 lg:left-12 w-32 h-32 text-red-500 hidden lg:block transform -scale-x-100" />

        {/* JOBB OLDALI NYÍL: Befelé mutat, kicsi */}
        <AnimatedDecorativeArrow className="absolute bottom-1/4 translate-y-1/2 right-4 md:right-8 lg:right-12 w-32 h-32 text-red-500 hidden lg:block" />

        <div className="container mx-auto px-6 relative z-10">
           <div className="text-center mb-16 lg:mb-20">
              <motion.h2 
                  className="text-4xl lg:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-400 mb-4"
                  initial={{ opacity:0, y: 20 }}
                  animate={isInView ? { opacity:1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
              >
                  Eredményeink Számokban
              </motion.h2>
              <motion.p 
                  className="text-lg text-slate-300 max-w-2xl mx-auto"
                  initial={{ opacity:0, y: 20 }}
                  animate={isInView ? { opacity:1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: 0.25, ease: 'easeOut' }}
              >
                  Büszkék vagyunk arra, amit ügyfeleinkkel közösen elértünk.
              </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-16 sm:gap-y-12 gap-x-8 text-center justify-center">
            {stats.map((stat, index) => (
              <motion.div
                  key={index}
                  className="flex flex-col items-center"
                  initial={{ opacity: 0, y: 50 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, delay: index * 0.15 + 0.4, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ scale: 1.08, y: -8, transition: { type: "spring", stiffness: 300, damping:10 } }}
              >
                   <motion.div 
                      className="relative mb-5 p-4 bg-white/10 rounded-full ring-2 ring-white/20 shadow-lg"
                      initial={{scale:0}}
                      animate={isInView ? {scale:1} : {}}
                      transition={{type:'spring', stiffness:260, damping:20, delay: index * 0.15 + 0.6}}
                   >
                      <stat.icon className="w-10 h-10 text-cyan-400" />
                      <IconShineEffect delay={index * 0.15 + 1} isParentInView={isInView} />
                   </motion.div>
                  
                  {/* Itt módosítva a méret lg:text-7xl-re */}
                  <div className="text-5xl lg:text-7xl font-extrabold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                      <AnimatedCounter value={stat.value} isInView={isInView} />
                      {stat.suffix}
                  </div>
                  {/* Itt módosítva a méret lg:text-xl-re */}
                  <div className="text-base lg:text-xl font-medium text-slate-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* Büntetés figyelmeztetés */}
          <motion.div
            className="mt-20 p-8 sm:p-10 bg-gradient-to-br from-red-600 to-red-800 rounded-3xl shadow-2xl border-2 border-red-500 text-center relative overflow-hidden"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 1.0, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.02, boxShadow: '0 0 40px rgba(239, 68, 68, 0.8)' }}
          >
            <div className="absolute inset-0 bg-white/5 opacity-20 transform -skew-y-12 scale-150"></div>
            <p className="text-white text-2xl sm:text-3xl lg:text-4xl font-black leading-tight relative z-10">
              Egyetlen büntetés megközelítőleg
            </p>
            <p className="text-white text-4xl sm:text-5xl lg:text-6xl font-black mt-2 relative z-10">
              <span className="text-yellow-300 drop-shadow-lg">2 000 000 Ft</span> is lehet!
            </p>
            <p className="text-red-200 text-base sm:text-lg mt-4 relative z-10">
              Ne kockáztasson – legyen felkészült!
            </p>
          </motion.div>

        </div>
      </section>
    </>
  );
};

export default StatsCounterSection;