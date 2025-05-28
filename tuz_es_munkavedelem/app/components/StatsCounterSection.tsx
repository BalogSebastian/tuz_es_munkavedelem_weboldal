// components/sections/StatsCounterSection.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
// Ikonok importálása, kiegészítve a ShieldCheckIcon-nal
import { UserGroupIcon, AcademicCapIcon, CheckBadgeIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';

// Statisztika adatok kibővítve az új elemmel
const stats = [
  { value: 150, label: "Elégedett Ügyfél", suffix: "+", icon: UserGroupIcon },
  { value: 500, label: "Elvégzett Oktatás", suffix: "+", icon: AcademicCapIcon },
  { value: 98, label: "Sikeres Audit", suffix: "%", icon: CheckBadgeIcon },
  { value: 100, label: "Elkerült Büntetés", suffix: "%", icon: ShieldCheckIcon }, // ÚJ STATISZTIKA
];

// Külön komponens az animált számhoz (változatlan)
function AnimatedCounter({ value, isInView }: { value: number; isInView: boolean }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        if (isInView) {
            const controls = animate(0, value, {
                duration: 2.0,
                ease: "easeOut",
                onUpdate(latest) {
                    setDisplayValue(Math.round(latest));
                }
            });
            return () => controls.stop();
        }
    }, [isInView, value]);

    return <>{displayValue}</>;
}


const StatsCounterSection: React.FC = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    <section ref={ref} className="py-20 lg:py-28 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white relative overflow-hidden">
       {/* Finom háttér elemek (változatlan) */}
       <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500/30 via-transparent to-transparent"></div>
       <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-500/30 via-transparent to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
         {/* Alcím a szekcióhoz (változatlan) */}
         <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-400 mb-3">
                Eredményeink Számokban
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">Büszkék vagyunk arra, amit ügyfeleinkkel közösen elértünk.</p>
        </div>

        {/* Statisztikák rácsban - MÓDOSÍTOTT GRID ELRENDEZÉS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 text-center">
          {stats.map((stat, index) => ( // Most már 4 elemet fog megjeleníteni
            <motion.div
                key={index}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }}
            >
                {/* Ikon (stílus változatlan) */}
                 <div className="mb-4 p-4 bg-white/10 rounded-full ring-2 ring-white/20">
                    <stat.icon className="w-10 h-10 text-red-400" /> {/* Megmaradt a text-red-400 az ikonokhoz */}
                 </div>
                {/* Animált Számláló (stílus változatlan) */}
                <div className="text-5xl lg:text-7xl font-extrabold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                    <AnimatedCounter value={stat.value} isInView={isInView} />
                    {stat.suffix}
                </div>
                {/* Címke (stílus változatlan) */}
                <div className="text-base lg:text-lg font-medium text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounterSection;