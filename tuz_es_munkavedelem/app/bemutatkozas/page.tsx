'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import {
  UsersIcon,
  ScaleIcon,
  CheckBadgeIcon,
  CalendarDaysIcon,
  BuildingStorefrontIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// Színséma az oldalhoz
const accentColor = {
  text: 'text-cyan-500',
  bg: 'bg-cyan-500',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  gradientFrom: 'from-cyan-500',
  gradientTo: 'to-teal-400',
  lightBg: 'bg-cyan-50',
  lightBorder: 'border-cyan-200',
  darkText: 'text-slate-800',
  lightText: 'text-slate-600'
};

// Animációs variánsok
const pageVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 12 } }
};

// Egyedi kártya komponens a "Miért mi?" szekcióhoz
const InfoCard = ({ icon: Icon, title, content }: { icon: React.ElementType; title: string; content: string }) => (
  <motion.div variants={itemVariants} className="flex items-start gap-5 p-6 bg-white rounded-xl shadow-lg border border-slate-100 group transition-all duration-300 hover:border-cyan-200 hover:shadow-xl">
    <div className={`p-3 rounded-full ${accentColor.lightBg} ${accentColor.text} flex-shrink-0`}>
      <Icon className="w-7 h-7" />
    </div>
    <div>
      <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
      <p className="text-slate-600 leading-relaxed">{content}</p>
    </div>
  </motion.div>
);

// Az új, egyedi FounderCard a "Németh János" szekcióhoz
const FounderCard = ({ name, role, children }: { name: string, role: string, children: React.ReactNode }) => {
    const cardRef = React.useRef<HTMLDivElement>(null);
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
            className="group relative w-full max-w-4xl mx-auto"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="bg-white/60 backdrop-blur-lg rounded-3xl p-8 border border-slate-200 shadow-2xl flex flex-col items-center gap-8"
            >
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

const Bemutatkozas = () => {
  const strongClass = "font-bold text-slate-900";

  return (
    <motion.div
      className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8"
      initial="initial"
      animate="animate"
      variants={pageVariants}
    >
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(3, 186, 190, 0.08) 1px, transparent 1px), linear-gradient(to right, rgba(3, 186, 190, 0.08) 1px, transparent 1px)`,
        backgroundSize: '3.5rem 3.5rem',
      }}></div>

      <motion.div
        className="max-w-6xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 sm:p-10 relative z-10 border border-slate-200"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <motion.h1
          className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-6 text-center"
          variants={itemVariants}
        >
          A <span className={accentColor.text}>Biztonság</span> Mesterei.
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-slate-700 leading-relaxed mb-8 text-center max-w-4xl mx-auto"
          variants={itemVariants}
        >
          Célunk, hogy a lehető legnagyobb szakértelmet biztosítsuk, a jogszabályok útvesztőjében, átlátható, és precíz munkavégzéssel. Itt soha nem ügyfélszolgálatot, hanem szakembert fogsz kapni, a céged számára, mert mi a személyes kapcsolatokban hiszünk.
        </motion.p>
        
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full max-w-3xl mx-auto text-center mb-16">
            <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/80">
                <p className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo}`}>100+</p>
                <p className="text-slate-600 font-semibold mt-1">elégedett partner</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/80">
                <p className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo}`}>0 Ft</p>
                <p className="text-slate-600 font-semibold mt-1">bírság</p>
            </motion.div>
            <motion.div variants={itemVariants} className="bg-white/70 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/80">
                <p className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo}`}>10 fős</p>
                <p className="text-slate-600 font-semibold mt-1">szakmai csapat!</p>
            </motion.div>
        </div>

        <motion.section className="mb-16" variants={sectionVariants}>
             <FounderCard name="Németh János" role="A MunkavédelmiSzakí ügyvezetője">
                 "Sziasztok! Azért hoztam létre a <strong>MunkavédelmiSzakí</strong>-t, hogy egy <strong>átlátható képet</strong> tudjunk adni a <strong>Tűz- és Munkavédelmi előírásokról</strong>. Fontosnak tartom, hogy megfelelő képviselete legyen minden vállalkozásnak ebben a szakmában is. Szeretném ha az ügyfelek nem csak egy “papírt” kapnának, hanem valódi szolgáltatást, ami valóban védi őket, mert személyre szabottan készül a munka."
             </FounderCard>
        </motion.section>
        
        <motion.section className="mb-16" variants={sectionVariants}>
            <motion.h2 className="text-3xl font-bold text-slate-900 mb-8 text-center" variants={itemVariants}>
                Miért mi?
            </motion.h2>
            <div className="grid grid-cols-1 gap-8 max-w-4xl mx-auto">
                <InfoCard 
                    icon={UsersIcon} 
                    title="Teljes körű ügyintézés" 
                    content="Folyamatosan figyelve a jogszabályokat, és kommunikálva a hatóságokkal, nem neked kell utána járnod ezeknek a dolgoknak." 
                />
                 <InfoCard 
                    icon={ScaleIcon} 
                    title="Személyes viszony" 
                    content="Itt mindenki egy szakembert kap, és folyamatosan vele lehetsz kapcsolatban." 
                />
                 <InfoCard 
                    icon={CheckBadgeIcon} 
                    title="Folyamatos odafigyelés" 
                    content="Mi folyamatosan nyomon követjük az előírt érvényességi időket, a törvényi módosításokat, és erről azonnali tájékoztatást kapsz!" 
                />
            </div>
        </motion.section>

        <motion.div
          className="text-center mt-12 mb-8 p-8 bg-gradient-to-r from-cyan-100 to-teal-50 rounded-2xl shadow-inner border border-cyan-200"
          variants={itemVariants}
        >
          <h3 className="text-2xl font-bold text-slate-800 mb-3">Készen áll a <strong className={strongClass}>biztonságosabb</strong> működésre?</h3>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Vegye fel velünk a kapcsolatot egy ingyenes konzultációért!
          </p>
          <motion.div variants={itemVariants} className="mt-8">
            <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" target="_blank" rel="noopener noreferrer">
              <motion.button
                className={`inline-flex items-center justify-center font-bold py-4 px-10 rounded-xl text-lg sm:text-xl text-white bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo} shadow-lg shadow-cyan-500/30 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 ${accentColor.ring} focus:ring-offset-2`}
                whileHover={{ scale: 1.05, y: -4, boxShadow: '0 10px 20px -5px rgba(3, 186, 190, 0.5)' }}
                whileTap={{ scale: 0.98 }}
              >
                <CalendarDaysIcon className="w-6 h-6 mr-3" />
                Lefoglalom a konzultációmat!
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default Bemutatkozas;