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
    CheckBadgeIcon,
    SparklesIcon,
    AcademicCapIcon,
    ScaleIcon,
    PhoneIcon,
    BuildingStorefrontIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const accentColor = {
  text: 'text-cyan-500',
  gradientFrom: 'from-cyan-500',
  gradientTo: 'to-teal-400',
  bg: 'bg-cyan-500',
  ring: 'focus:ring-cyan-500',
  base: '#06b6d4',
};

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.15 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 50, filter: 'blur(5px)' },
  in: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 1, ease: [0.22, 1, 0.36, 1] } },
};

const FounderCard = ({ name, role, imgSrc, children }: { name: string, role: string, imgSrc: string, children: React.ReactNode }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
    };

    const tiltIntensity = 3;
    const rotateX = useSpring(useTransform(mouseY, [0, 400], [tiltIntensity, -tiltIntensity]), { stiffness: 400, damping: 40 });
    const rotateY = useSpring(useTransform(mouseX, [0, 350], [-tiltIntensity, tiltIntensity]), { stiffness: 400, damping: 40 });

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => { mouseX.set(175); mouseY.set(200); }}
            style={{ perspective: "2000px" }}
            variants={itemVariants}
            className="group relative w-full max-w-4xl"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-slate-200 shadow-2xl flex flex-col md:flex-row items-center gap-8"
            >
                <motion.div style={{ transform: "translateZ(40px)" }} className="flex-shrink-0 text-center">
                    <img 
                        src={imgSrc} 
                        alt={name} 
                        className="w-40 h-40 rounded-full object-cover shadow-lg border-4 border-slate-300 group-hover:border-cyan-400 transition-colors duration-300" 
                        onError={(e) => e.currentTarget.src = `https://placehold.co/200x200/e2e8f0/334155?text=${name.split(' ')[0][0]}`} 
                    />
                </motion.div>
                <motion.div style={{ transform: "translateZ(20px)" }} className="flex-grow text-center md:text-left">
                    <h3 className="text-3xl font-bold text-slate-800">{name}</h3>
                    <p className={`${accentColor.text} font-semibold text-lg mb-4`}>{role}</p>
                    <div className="text-slate-600 leading-relaxed text-lg">
                        {children}
                    </div>
                </motion.div>
                <motion.div
                    className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"
                    style={{ background: useTransform([mouseX, mouseY], ([newX, newY]) => `radial-gradient(800px at ${newX}px ${newY}px, rgba(3, 186, 190, 0.15), transparent 80%)`) }}
                />
            </motion.div>
        </motion.div>
    );
};

const ProcessStep = ({ number, title, children }: { number: string, title: string, children: React.ReactNode }) => (
    <motion.div 
        variants={itemVariants}
        className="relative pl-16"
    >
        <div className="absolute left-0 top-0 flex items-center justify-center w-12 h-12 rounded-full bg-slate-800 text-white font-bold text-xl shadow-lg">
            {number}
        </div>
        <div className="absolute left-[23px] top-14 h-full w-0.5 bg-slate-300"></div>
        <h3 className="text-2xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 text-lg leading-relaxed">{children}</p>
    </motion.div>
);

const StatCard = ({ value, label }: { value: string, label: string }) => (
    <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/80 text-center">
        <p className={`text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo}`}>{value}</p>
        <p className="text-slate-600 font-semibold mt-1">{label}</p>
    </motion.div>
);

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
    const locations = [
        { x: 85.3, y: 47.5 },
        { x: 47.6, y: 47.0 },
        { x: 55.4, y: 20.2 },
        { x: 34.0, y: 50.5 },
        { x: 39.6, y: 11.0 },
        { x: 67.9, y: 64.2 },
        { x: 41.5, y: 31.8 },
        { x: 34.0, y: 20.0 },
        { x: 88.2, y: 58.5 },
        { x: 52.0, y: 31.0 },
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
                            cy={loc.y}
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

const Bemutatkozas = () => {
    return (
        <div className="min-h-screen bg-slate-50 text-slate-800 font-['Poppins',_sans-serif] overflow-hidden">
             <motion.div 
                className="absolute inset-0 z-0"
                animate={{ 
                    background: [
                        "radial-gradient(circle at 10% 20%, rgba(3, 186, 190, 0.08), transparent 40%)",
                        "radial-gradient(circle at 90% 80%, rgba(3, 186, 190, 0.08), transparent 40%)",
                        "radial-gradient(circle at 50% 50%, rgba(3, 186, 190, 0.08), transparent 40%)",
                        "radial-gradient(circle at 10% 20%, rgba(3, 186, 190, 0.08), transparent 40%)",
                    ]
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />

            <motion.div
                className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-40 relative z-10"
                variants={pageVariants}
                initial="initial"
                animate="in"
            >
                <div className="max-w-5xl mx-auto flex flex-col items-center text-center space-y-28 md:space-y-36">
                    
                    <motion.header variants={itemVariants} className="flex flex-col items-center">
                        <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
                            {"A Biztonság Mesterei.".split(" ").map((word, i) => (
                                <motion.span 
                                    key={i}
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1, ease: "easeOut", duration: 0.8 }}
                                    className={`inline-block mr-4 ${word.includes('.') ? accentColor.text : 'text-slate-900'}`}
                                >
                                    {word}
                                </motion.span>
                            ))}
                        </h1>
                        <motion.p 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8, duration: 1 }}
                            className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed"
                        >
                           Küldetésünk, hogy a komplex tűz- és munkavédelmi előírások útvesztőjéből egyenes út vezessen a nyugodt, biztonságos és szabályos működéshez.
                        </motion.p>
                        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl">
                            <StatCard value="100+" label="Elégedett Partner" />
                            <StatCard value="10+" label="Év Tapasztalat" />
                            <StatCard value="0 Ft" label="Bírság Ügyfeleinknél" />
                        </div>
                    </motion.header>

                    <section className="w-full flex flex-col items-center space-y-12">
                        <FounderCard name="Németh János" role="A Gyakorlati Megvalósító | Tűzvédelmi Specialista" imgSrc="https://placehold.co/200x200/e2e8f0/334155?text=NJ">
                            <p>
                                János a terepen van otthon. Legyen szó egy ipari csarnok tűzvédelmi bejárásáról vagy egy irodaház kiürítési tervének gyakorlati teszteléséről, ő az, aki a papíron lévő terveket a valóságban is működővé teszi. Pontosan tudja, mi az, ami egy éles helyzetben számít.
                            </p>
                        </FounderCard>
                    </section>
                    
                    <section className="w-full">
                        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 mb-16">
                            Miben Különbözünk a Többiektől?
                        </motion.h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                            <motion.div variants={itemVariants} className="flex items-start gap-4">
                                <div className="p-3 bg-cyan-100 rounded-xl"><ScaleIcon className="w-7 h-7 text-cyan-600"/></div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800">Teljeskörű Hatósági Ügyintézés</h3>
                                    <p className="text-slate-600">Levesszük a válláról a bürokrácia terhét. Kommunikálunk a hatóságokkal, elkészítjük és benyújtjuk a szükséges dokumentumokat.</p>
                                </div>
                            </motion.div>
                             <motion.div variants={itemVariants} className="flex items-start gap-4">
                                <div className="p-3 bg-cyan-100 rounded-xl"><AcademicCapIcon className="w-7 h-7 text-cyan-600"/></div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800">Gyakorlatias Oktatás</h3>
                                    <p className="text-slate-600">Nálunk nincs unalmas diashow. Interaktív, a valós munkahelyi szituációkra épülő képzéseinket a munkatársai is élvezni fogják.</p>
                                </div>
                            </motion.div>
                             <motion.div variants={itemVariants} className="flex items-start gap-4">
                                <div className="p-3 bg-cyan-100 rounded-xl"><UsersIcon className="w-7 h-7 text-cyan-600"/></div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800">Személyes Partneri Viszony</h3>
                                    <p className="text-slate-600">Nem csak egy szolgáltató vagyunk. Ismerjük az ügyfeleinket, és hosszú távú, bizalmi kapcsolatot építünk velük.</p>
                                </div>
                            </motion.div>
                             <motion.div variants={itemVariants} className="flex items-start gap-4">
                                <div className="p-3 bg-cyan-100 rounded-xl"><SparklesIcon className="w-7 h-7 text-cyan-600"/></div>
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800">Proaktív Szemlélet</h3>
                                    <p className="text-slate-600">Nem csak a tüzet oltjuk, hanem a kockázatokat előzzük meg. Folyamatosan figyeljük a változásokat és javaslatokat teszünk a biztonság növelésére.</p>
                                </div>
                            </motion.div>
                        </div>
                    </section>

                    <section className="w-full">
                        <motion.h2 variants={itemVariants} className="text-4xl md:text-5xl font-bold tracking-tight text-slate-800 mb-16">
                            A Folyamatunk: Út a Nyugodt Működéshez
                        </motion.h2>
                        <div className="flex flex-col gap-12 max-w-2xl mx-auto">
                            <ProcessStep number="1" title="Kapcsolatfelvétel és Igényfelmérés">
                                Egy díjmentes konzultáció során megismerjük vállalkozását, feltérképezzük az egyedi igényeket és a potenciális kockázatokat.
                            </ProcessStep>
                            <ProcessStep number="2" title="Helyszíni Audit és Tervezés">
                                Szakértőink alapos helyszíni bejárást végeznek, majd egy személyre szabott, mindenre kiterjedő cselekvési tervet készítenek.
                            </ProcessStep>
                            <ProcessStep number="3" title="Megvalósítás és Oktatás">
                                Elkészítjük a szükséges dokumentációt, telepítjük a védelmi eszközöket és gyakorlatias oktatást tartunk a munkatársaknak.
                            </ProcessStep>
                            <ProcessStep number="4" title="Folyamatos Támogatás">
                                A közös munka itt nem ér véget. Folyamatosan rendelkezésre állunk, elvégezzük az időszakos felülvizsgálatokat és segítünk minden felmerülő kérdésben.
                            </ProcessStep>
                        </div>
                    </section>

                    <motion.footer variants={itemVariants} className="w-full border-t border-slate-300 pt-16">
                        <h3 className="text-3xl font-bold text-slate-800 mb-2">Készen áll a biztonságosabb működésre?</h3>
                        <p className="text-slate-600 text-lg mb-8">Vegye fel velünk a kapcsolatot egy ingyenes konzultációért!</p>
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
                            <Link href="/#szolgaltatasok">
                                <motion.div
                                    className={`w-full sm:w-auto text-center font-bold py-3 px-8 rounded-xl bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo} text-white shadow-lg shadow-cyan-500/30 cursor-pointer`}
                                    whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 30px -10px rgba(3, 186, 190, 0.5)' }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <BuildingStorefrontIcon className="w-5 h-5 inline-block mr-2" />
                                    Szolgáltatásaink
                                </motion.div>
                            </Link>
                        </div>
                    </motion.footer>

                </div>
            </motion.div>
        </div>
    );
};

export default Bemutatkozas;