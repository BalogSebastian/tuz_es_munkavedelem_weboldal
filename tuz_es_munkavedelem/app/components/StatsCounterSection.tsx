// components/sections/StatsCounterSection.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
// Ikonok importálása (példák, cseréld le relevánsakra)
import { UserGroupIcon, AcademicCapIcon, CheckBadgeIcon } from '@heroicons/react/24/outline';

// Statisztika adatok kibővítve ikonnal
const stats = [
  { value: 150, label: "Elégedett Ügyfél", suffix: "+", icon: UserGroupIcon },
  { value: 500, label: "Elvégzett Oktatás", suffix: "+", icon: AcademicCapIcon },
  { value: 98, label: "Sikeres Audit", suffix: "%", icon: CheckBadgeIcon },
];

// Külön komponens az animált számhoz
function AnimatedCounter({ value, isInView }: { value: number; isInView: boolean }) {
    const [displayValue, setDisplayValue] = useState(0);

    useEffect(() => {
        // Csak akkor indítjuk az animációt, ha a komponens láthatóvá válik
        if (isInView) {
            const controls = animate(0, value, {
                duration: 2.0, // Animáció hossza (másodperc)
                ease: "easeOut", // Lassuló animáció
                onUpdate(latest) {
                    // Frissítjük a megjelenített értéket az animáció minden lépésénél
                    setDisplayValue(Math.round(latest));
                }
            });
            // Tisztító függvény: leállítja az animációt, ha a komponens eltűnik a képernyőről, mielőtt befejeződne
            return () => controls.stop();
        }
    }, [isInView, value]); // Az effekt újra lefut, ha a value vagy isInView változik

    return <>{displayValue}</>; // Visszaadja a folyamatosan frissülő számot
}


const StatsCounterSection: React.FC = () => {
  const ref = useRef(null); // Referencia a szekcióhoz a láthatóság figyeléséhez
  // Figyeli, hogy a szekció (ref) látható-e a képernyőn
  // once: true -> az animáció csak egyszer fusson le
  // amount: 0.4 -> akkor induljon, ha legalább 40%-a látható
  const isInView = useInView(ref, { once: true, amount: 0.4 });

  return (
    // Új, sötétebb háttér, több padding
    <section ref={ref} className="py-20 lg:py-28 bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white relative overflow-hidden">
       {/* Finom háttér elemek */}
       <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-500/30 via-transparent to-transparent"></div>
       <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-blue-500/30 via-transparent to-transparent"></div>

      <div className="container mx-auto px-6 relative z-10">
         {/* Opcionális: Alcím a szekcióhoz */}
         <div className="text-center mb-12 lg:mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-white to-blue-400 mb-3">
                Eredményeink Számokban
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">Büszkék vagyunk arra, amit ügyfeleinkkel közösen elértünk.</p>
        </div>

        {/* Statisztikák rácsban */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-12 md:gap-x-8 text-center">
          {stats.map((stat, index) => (
            <motion.div
                key={index}
                className="flex flex-col items-center"
                // Belépő animáció minden egyes statisztika blokkra
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.15, ease: "easeOut" }} // Eltolt késleltetés
            >
                {/* Ikon */}
                 <div className="mb-4 p-4 bg-white/10 rounded-full ring-2 ring-white/20">
                    <stat.icon className="w-10 h-10 text-red-400" />
                 </div>
                {/* Animált Számláló */}
                <div className="text-5xl lg:text-7xl font-extrabold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
                    {/* Az AnimatedCounter komponens használata */}
                    <AnimatedCounter value={stat.value} isInView={isInView} />
                    {stat.suffix}
                </div>
                {/* Címke */}
                <div className="text-base lg:text-lg font-medium text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounterSection;
