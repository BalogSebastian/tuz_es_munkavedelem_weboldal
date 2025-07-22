// components/sections/Eredmenyek.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useInView, animate, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { 
    ArrowLeftIcon, 
    CalendarDaysIcon,
    ShieldCheckIcon,
    UsersIcon,
    CurrencyPoundIcon,
    BuildingOfficeIcon,
    CheckBadgeIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const accentColor = {
    text: 'text-cyan-500',
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-teal-400',
    bg: 'bg-cyan-500',
    ring: 'focus:ring-cyan-500',
    base: '#06b6d4', // Ez a hiányzó sor
  };

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.15 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 50, filter: 'blur(5px)' },
  in: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

interface AnimatedCounterProps {
  from?: number;
  to: number;
  className?: string;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({ from = 0, to, prefix = '', suffix = '' }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const isInView = useInView(nodeRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView && nodeRef.current) {
      const node = nodeRef.current;
      const controls = animate(from, to, {
        duration: 2.5,
        ease: 'easeOut',
        onUpdate(value) {
          node.textContent = prefix + Math.round(value).toLocaleString('hu-HU') + suffix;
        },
      });
      return () => controls.stop();
    }
  }, [from, to, isInView, prefix, suffix]);

  return <span ref={nodeRef} />;
};

const MetricCard = ({ icon: Icon, value, unit, label }: { icon: React.ElementType, value: number, unit: string, label: string }) => (
    <motion.div 
        variants={itemVariants}
        whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}
        className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-200/80 text-center"
    >
        <Icon className={`w-12 h-12 mx-auto mb-4 ${accentColor.text}`} />
        <div className="text-5xl font-black text-slate-800">
            <AnimatedCounter to={value} />
            <span className={accentColor.text}>{unit}</span>
        </div>
        <p className="text-slate-600 font-semibold mt-2">{label}</p>
    </motion.div>
);

const HungaryMap = () => {
    // JAVÍTÁS: A koordináták most már számok, nem stringek.
    const locations = [
        { x: 85.3, y: 47.5 }, // Debrecen
        { x: 47.6, y: 47.0 }, // Budapest
        { x: 55.4, y: 20.2 }, // Szeged
        { x: 34.0, y: 50.5 }, // Győr
        { x: 39.6, y: 11.0 }, // Pécs
        { x: 67.9, y: 64.2 }, // Miskolc
        { x: 41.5, y: 31.8 }, // Székesfehérvár
        { x: 34.0, y: 20.0 }, // Kaposvár
        { x: 88.2, y: 58.5 }, // Nyíregyháza
        { x: 52.0, y: 31.0 }, // Kecskemét
    ];

    return (
        <motion.div variants={itemVariants} className="relative w-full max-w-4xl mx-auto aspect-[16/9] bg-white/70 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-slate-200/80">
            <svg viewBox="0 0 100 60" className="w-full h-full">
                <motion.path
                    d="M9.6,30.4L1.2,29.2L1.2,27.6L8.4,26L9.6,23.6L12,22.8L14.4,23.6L16.8,22.8L18,20.4L22.8,18.8L26.4,18.8L28.8,17.2L32.4,17.2L34.8,18.8L38.4,18.8L40.8,20.4L44.4,20.4L46.8,22L49.2,22L51.6,23.6L54,23.6L56.4,25.2L58.8,25.2L61.2,26.8L63.6,26.8L66,28.4L68.4,28.4L70.8,30L73.2,30L75.6,31.6L78,31.6L80.4,33.2L82.8,33.2L85.2,34.8L87.6,34.8L90,36.4L92.4,36.4L94.8,38L94.8,39.6L92.4,41.2L90,41.2L87.6,42.8L85.2,42.8L82.8,44.4L80.4,44.4L78,46L75.6,46L73.2,47.6L70.8,47.6L68.4,49.2L66,49.2L63.6,50.8L61.2,50.8L58.8,52.4L56.4,52.4L54,54L51.6,54L49.2,55.6L46.8,55.6L44.4,57.2L42,57.2L39.6,58.8L37.2,58.8L34.8,60.4L32.4,60.4L30,62L27.6,62L25.2,63.6L22.8,63.6L20.4,65.2L18,65.2L15.6,66.8L13.2,66.8L10.8,68.4L8.4,68.4L6,70L3.6,70L1.2,71.6L1.2,73.2L0,74.8L0,30.4L9.6,30.4Z"
                    transform="scale(1, 0.8) translate(0, -15)"
                    fill="#e2e8f0"
                    stroke="#cbd5e1"
                    strokeWidth="0.2"
                />
                <g>
                    {locations.map((loc, i) => (
                        <motion.circle
                            key={i}
                            cx={loc.x}
                            cy={loc.y} // JAVÍTÁS: Nincs többé aritmetikai művelet stringen
                            r="0.8"
                            fill={accentColor.base}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0, 1, 0], scale: [0, 2, 0] }}
                            transition={{ duration: 2.5, delay: 0.5 + i * 0.2, repeat: Infinity, repeatDelay: 3 }}
                        />
                    ))}
                </g>
            </svg>
        </motion.div>
    );
};

const CaseStudyCard = ({ title, description, result }: { title: string, description: string, result: string }) => (
    <motion.div
        variants={itemVariants}
        whileHover={{ y: -8, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)' }}
        className="bg-white/70 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-slate-200/80 text-left h-full"
    >
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 mb-4">{description}</p>
        <div className="mt-auto pt-4 border-t border-slate-200">
            <span className={`font-bold ${accentColor.text}`}>{result}</span>
        </div>
    </motion.div>
);

const Eredmenyek = () => {
  return (
    <div className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif] overflow-hidden">
      <motion.div 
          className="absolute inset-0 z-0"
          animate={{ 
              background: [
                  "radial-gradient(circle at 10% 20%, rgba(3, 186, 190, 0.07), transparent 40%)",
                  "radial-gradient(circle at 90% 80%, rgba(3, 186, 190, 0.07), transparent 40%)",
                  "radial-gradient(circle at 50% 50%, rgba(3, 186, 190, 0.07), transparent 40%)",
                  "radial-gradient(circle at 10% 20%, rgba(3, 186, 190, 0.07), transparent 40%)",
              ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative"
        variants={pageVariants}
        initial="initial"
        animate="in"
      >
        <div className="max-w-5xl mx-auto flex flex-col items-center text-center">
            <motion.header variants={itemVariants} className="mb-24">
              <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4">
                Az Eredmények <span className={accentColor.text}>Magukért Beszélnek</span>.
              </h1>
              <p className="text-2xl text-slate-600 leading-snug">
                Nem csak ígérünk, hanem szállítjuk a mérhető eredményeket. Számokban és sikertörténetekben mutatjuk be, miért bízik bennünk több száz partner országszerte.
              </p>
            </motion.header>

            <section className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24">
                <MetricCard icon={BuildingOfficeIcon} value={450} unit="+" label="Elégedett Partner" />
                <MetricCard icon={CurrencyPoundIcon} value={150} unit="M Ft+" label="Megelőzött Bírság" />
                <MetricCard icon={UsersIcon} value={12000} unit="+" label="Képzett Munkavállaló" />
            </section>

            <motion.section variants={itemVariants} className="w-full mb-24">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 mb-12">
                    Átalakulás: Előtte és Utána
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0 bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/80 overflow-hidden">
                    <div className="p-8 sm:p-12 text-left">
                        <h3 className="text-3xl font-bold text-red-600 mb-4">Előtte: Bizonytalanság</h3>
                        <ul className="space-y-3 text-lg text-slate-600">
                            <li className="flex items-start gap-3"><span className="text-red-500 font-bold mt-1">✗</span>Hiányos, elavult dokumentáció</li>
                            <li className="flex items-start gap-3"><span className="text-red-500 font-bold mt-1">✗</span>Rendszertelen, formális oktatások</li>
                            <li className="flex items-start gap-3"><span className="text-red-500 font-bold mt-1">✗</span>Félelem a hatósági ellenőrzéstől</li>
                            <li className="flex items-start gap-3"><span className="text-red-500 font-bold mt-1">✗</span>Magas kockázat a bírságokra</li>
                        </ul>
                    </div>
                     <div className="p-8 sm:p-12 text-left bg-green-50/50 border-t md:border-t-0 md:border-l border-slate-200/80">
                        <h3 className="text-3xl font-bold text-green-600 mb-4">Utána: Biztonság</h3>
                        <ul className="space-y-3 text-lg text-slate-700">
                            <li className="flex items-start gap-3"><span className="text-green-500 font-bold mt-1">✓</span>Naprakész, mindenre kiterjedő szabályzatok</li>
                            <li className="flex items-start gap-3"><span className="text-green-500 font-bold mt-1">✓</span>Gyakorlatias, hatékony képzések</li>
                            <li className="flex items-start gap-3"><span className="text-green-500 font-bold mt-1">✓</span>Magabiztosság és 100%-os megfelelés</li>
                            <li className="flex items-start gap-3"><span className="text-green-500 font-bold mt-1">✓</span>Minimalizált kockázatok, védett munkatársak</li>
                        </ul>
                    </div>
                </div>
            </motion.section>
            
            <motion.section variants={itemVariants} className="w-full mb-24">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 mb-12">
                    Országos Jelenlét
                </h2>
                <HungaryMap />
            </motion.section>

            <motion.section variants={itemVariants} className="w-full">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 mb-12">
                    Esettanulmányok
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <CaseStudyCard 
                        title="Gyártóüzem Kockázatértékelése"
                        description="Egy közepes méretű gyártóüzemnél a teljes kockázatértékelés elvégzése során 12 súlyos, azonnali beavatkozást igénylő hiányosságot tártunk fel. Javaslataink bevezetése után a potenciális bírság mértéke több millió forinttal csökkent, és a munkahelyi balesetek száma 80%-kal esett vissza az első évben."
                        result="Eredmény: ~8M Ft megtakarítás, 80% baleset-csökkenés"
                    />
                    <CaseStudyCard 
                        title="Étterem HACCP Rendszere"
                        description="Egy új étterem nyitásánál segítettünk a teljes HACCP rendszer kiépítésében. A hatósági ellenőrzés során a NÉBIH ellenőrei a rendszert 'példaértékűnek' minősítették, és az étterem azonnal megkapta a működési engedélyt, elkerülve a csúszásból adódó bevételkiesést."
                        result="Eredmény: Zökkenőmentes nyitás, 'példaértékű' minősítés"
                    />
                </div>
            </motion.section>

            <motion.footer variants={itemVariants} className="w-full mt-24 text-center border-t border-slate-200 pt-16">
              <h3 className="text-3xl font-bold text-slate-800 mb-4">Legyen Ön a Következő Sikertörténetünk!</h3>
              <p className="text-slate-600 text-lg mb-8">Csatlakozzon a több száz elégedett partnerünkhöz, és tegye vállalkozását biztonságosabbá és hatékonyabbá.</p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/">
                  <motion.div
                    className="w-full sm:w-auto text-center font-semibold py-3 px-8 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ArrowLeftIcon className="w-5 h-5 inline-block mr-2" />
                    Vissza a főoldalra
                  </motion.div>
                </Link>
                <Link href="https://calendly.com/">
                  <motion.div
                    className={`w-full sm:w-auto text-center font-bold py-3 px-8 rounded-xl bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo} text-white shadow-lg shadow-cyan-500/30 cursor-pointer`}
                    whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 30px -10px rgba(3, 186, 190, 0.5)' }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <CalendarDaysIcon className="w-5 h-5 inline-block mr-2" />
                    Konzultációt Kérek
                  </motion.div>
                </Link>
              </div>
            </motion.footer>
        </div>
      </motion.div>
    </div>
  );
};

export default Eredmenyek;