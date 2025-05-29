// components/sections/StatsCounterSection.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate, useMotionValue, useTransform } from 'framer-motion'; // Hook-ok hozzáadva
import { UserGroupIcon, AcademicCapIcon, CheckBadgeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

const stats = [
  { value: 150, label: "Elégedett Ügyfél", suffix: "+", icon: UserGroupIcon },
  { value: 500, label: "Elvégzett Oktatás", suffix: "+", icon: AcademicCapIcon },
  { value: 98, label: "Sikeres Audit", suffix: "%", icon: CheckBadgeIcon },
  { value: 100, label: "Elkerült Büntetés", suffix: "%", icon: ShieldCheckIcon },
];

function AnimatedCounter({ value, isInView }: { value: number; isInView: boolean }) {
    const [displayValue, setDisplayValue] = useState(0);
    useEffect(() => {
        if (isInView) {
            const controls = animate(0, value, {
                duration: 2.0, // Lehetne kicsit rövidebb a pörgősebb érzetért, pl. 1.5s
                ease: "easeOut",
                onUpdate(latest) { setDisplayValue(Math.round(latest)); }
            });
            return () => controls.stop();
        }
    }, [isInView, value]);
    return <>{displayValue}</>;
}

// ÚJ: Shine effekt komponens az ikonokhoz
const IconShineEffect: React.FC<{ delay: number, isParentInView: boolean }> = ({ delay, isParentInView }) => {
    if (!isParentInView) return null; // Csak akkor rendereljük, ha a szülő látható

    return (
        <motion.div
            className="absolute inset-0 w-full h-full overflow-hidden rounded-full" // Kör alakú maszk
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.7, 0] }} // Felvillan, majd eltűnik
            transition={{ 
                duration: 0.8, 
                ease: "easeInOut", 
                delay: delay + 0.4 // Késleltetés a kártya beúszása után
            }}
        >
            <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent"
                initial={{ x: "-150%", width: "50%" }} // Keskenyebb fénycsík
                animate={{ x: "150%" }}
                transition={{ 
                    duration: 0.6, 
                    ease: "linear",
                }}
            />
        </motion.div>
    );
};


const StatsCounterSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null); // Ref a teljes szekcióhoz
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 }); // Kisebb amount, hogy hamarabb induljon

  // Parallaxhez az egérmozgás figyelése
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
        if (sectionRef.current) {
            const rect = sectionRef.current.getBoundingClientRect();
            // Egér pozíciója a szekció közepéhez képest normalizálva (-0.5 to 0.5)
            mouseX.set((event.clientX - rect.left) / rect.width - 0.5);
            mouseY.set((event.clientY - rect.top) / rect.height - 0.5);
        }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Transzformációk a háttérelemekhez
  const bgParallaxFactor = 15; // Mennyire mozduljanak el a háttérelemek
  const bg1X = useTransform(mouseX, [-0.5, 0.5], [bgParallaxFactor, -bgParallaxFactor]);
  const bg1Y = useTransform(mouseY, [-0.5, 0.5], [bgParallaxFactor, -bgParallaxFactor]);
  const bg2X = useTransform(mouseX, [-0.5, 0.5], [-bgParallaxFactor, bgParallaxFactor]); // Ellentétes irány
  const bg2Y = useTransform(mouseY, [-0.5, 0.5], [-bgParallaxFactor, bgParallaxFactor]);


  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white relative overflow-hidden">
       {/* MÓDOSÍTOTT: Finom háttér elemek parallaxszal */}
       <motion.div
            className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-orange-500/20 via-transparent to-transparent" // Brand narancs finoman
            style={{ x: bg1X, y: bg1Y }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />
       <motion.div
            className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-sky-500/20 via-transparent to-transparent" // Kék marad, de lehetne más is
            style={{ x: bg2X, y: bg2Y }}
            transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        />

      <div className="container mx-auto px-6 relative z-10">
         <div className="text-center mb-12 lg:mb-16">
            <motion.h2 
                className="text-3xl lg:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-white to-sky-400 mb-3" // Színvilág frissítve
                initial={{ opacity:0, y: -20 }}
                animate={isInView ? { opacity:1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
            >
                Eredményeink Számokban
            </motion.h2>
            <motion.p 
                className="text-lg text-gray-300 max-w-2xl mx-auto"
                initial={{ opacity:0, y: -20 }}
                animate={isInView ? { opacity:1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.25 }}
            >
                Büszkék vagyunk arra, amit ügyfeleinkkel közösen elértünk.
            </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 sm:gap-y-12 gap-x-8 text-center"> {/* Növelt y-gap */}
          {stats.map((stat, index) => (
            <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 60, scale:0.9 }} // Kicsit több effekt a beúszáshoz
                animate={isInView ? { opacity: 1, y: 0, scale:1 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 + 0.4, ease: "easeOut" }} // Késleltetés és hosszabb duration
                // MÓDOSÍTOTT: Hover effektus a blokkokra
                whileHover={{ scale: 1.08, y: -8, transition: { type: "spring", stiffness: 300, damping:10 } }}
            >
                 <motion.div 
                    className="relative mb-5 p-4 bg-white/10 rounded-full ring-2 ring-white/20 shadow-lg" // Kicsit több árnyék
                    initial={{scale:0}}
                    animate={isInView ? {scale:1} : {}}
                    transition={{type:'spring', stiffness:260, damping:20, delay: index * 0.2 + 0.6}}
                 >
                    <stat.icon className="w-10 h-10 text-orange-400" /> {/* Szín frissítve a brandhez közelebb */}
                    {/* ÚJ: Fénycsóva effektus */}
                    <IconShineEffect delay={index * 0.2 + 0.8} isParentInView={isInView} />
                 </motion.div>
                
                <div className="text-5xl lg:text-7xl font-extrabold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                    <AnimatedCounter value={stat.value} isInView={isInView} />
                    {stat.suffix}
                </div>
                <div className="text-base lg:text-lg font-medium text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounterSection;