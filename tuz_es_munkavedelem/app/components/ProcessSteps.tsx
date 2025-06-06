// components/sections/ProcessSteps.tsx
'use client';

import React, { useRef, useEffect } from 'react';
import { motion, useSpring, useTransform, useMotionValue, animate } from 'framer-motion';
import {
    ChatBubbleLeftRightIcon,
    DocumentCheckIcon,
    WrenchScrewdriverIcon,
    CreditCardIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

// --- DEKORATÍV SVG KOMPONENSEK ---
const BlueprintCorner: React.FC<{ className?: string, delay?: number }> = ({ className, delay = 0.5 }) => {
    return (
        <motion.svg
            className={className} width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut", delay }} viewport={{ once: true, amount: 0.5 }} >
            <path d="M150 0H0V150" stroke="currentColor" strokeWidth="2"/>
            <path d="M120 0H0V120" stroke="currentColor" strokeWidth="1"/>
            <path d="M90 0H0V90" stroke="currentColor" strokeWidth="0.5"/>
            <circle cx="0" cy="0" r="5" fill="currentColor"/>
        </motion.svg>
    );
};

const SchematicCrosshair: React.FC<{ className?: string, delay?: number }> = ({ className, delay = 0.6 }) => {
    return (
        <motion.svg
            className={className} width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"
            initial={{ opacity: 0, rotate: -90 }} whileInView={{ opacity: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay }} viewport={{ once: true, amount: 0.5 }} >
            <circle cx="40" cy="40" r="39" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"/>
            <path d="M40 0V80" stroke="currentColor" strokeWidth="1"/>
            <path d="M0 40H80" stroke="currentColor" strokeWidth="1"/>
        </motion.svg>
    );
}

const DesignedExclamationMark: React.FC<{ className?: string, delay?: number }> = ({ className, delay = 0.4 }) => {
    return (
        <motion.div
            className={className}
            initial={{ opacity: 0, scale: 0.5}}
            whileInView={{ opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 150, damping: 15, delay }}}
            viewport={{ once: true, amount: 0.5 }}
            animate={{ y: [-4, 4, -4], rotate: [-5, 5, -5] }}
            transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut'}}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-300 to-yellow-400 rounded-full blur-md opacity-70"></div>
            <div className="relative flex items-center justify-center w-full h-full bg-gradient-to-br from-amber-400 to-yellow-500 rounded-full shadow-lg ring-4 ring-white/50">
                <ExclamationTriangleIcon className="w-[55%] h-[55%] text-white drop-shadow-md"/>
            </div>
        </motion.div>
    );
};


interface AnimatedNumberProps { to: number; className?: string; }
const AnimatedNumber: React.FC<AnimatedNumberProps> = ({ to, className }) => {
    const nodeRef = useRef<HTMLSpanElement>(null);
    useEffect(() => {
        const node = nodeRef.current; if (!node) return;
        const controls = animate(0, to, { duration: 1.2, ease: "circOut", onUpdate(value) { node.textContent = value.toFixed(0); } });
        return () => controls.stop();
    }, [to]);
    return <span ref={nodeRef} className={className} />;
};

const accentColor = { base: '#03BABE', bg: 'bg-[#03BABE]', text: 'text-[#03BABE]', hoverBg: 'hover:bg-cyan-600', ring: 'focus:ring-cyan-500', shadow: 'shadow-cyan-500/40', hoverShadow: 'hover:shadow-cyan-400/60', focusRingOffset: 'focus:ring-offset-slate-50' };
const steps = [ { step: 1, icon: ChatBubbleLeftRightIcon, title: "Konzultáció és Igényfelmérés", description: "Részletesen átbeszéljük vállalkozása specifikus igényeit, céljait és a vonatkozó jogszabályi követelményeket." }, { step: 2, icon: DocumentCheckIcon, title: "Szerződéskötés", description: "Az egyeztetettek alapján elkészítjük a hivatalos megállapodást, mely rögzíti a vállalt szolgáltatásokat és feltételeket." }, { step: 3, icon: WrenchScrewdriverIcon, title: "A Munka Kivitelezése", description: "Szakértő csapatunk precízen és a megbeszélt ütemezés szerint elvégzi a szerződésben foglalt feladatokat." }, { step: 4, icon: CreditCardIcon, title: "Fizetés és Utánkövetés", description: "A munka sikeres teljesítése és átadása után történik a díjazás. Igény esetén további támogatást és utánkövetést biztosítunk." } ];
const cardEntranceVariants = { hiddenLeft: { opacity: 0, x: -80 }, hiddenRight: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } } };
const iconContainerVariants = { hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut", delay: 0.2 } } };
const TiltCard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const cardRef = useRef<HTMLDivElement>(null); const mouseX = useMotionValue(0); const mouseY = useMotionValue(0);
    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => { if (!cardRef.current) return; const rect = cardRef.current.getBoundingClientRect(); mouseX.set(event.clientX - rect.left - rect.width / 2); mouseY.set(event.clientY - rect.top - rect.height / 2); };
    const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };
    const tiltIntensity = 5; const springConfig = { stiffness: 200, damping: 25, mass: 0.7 };
    const rotateX = useSpring(useTransform(mouseY, [-100, 100], [tiltIntensity, -tiltIntensity]), springConfig); const rotateY = useSpring(useTransform(mouseX, [-150, 150], [-tiltIntensity, tiltIntensity]), springConfig);
    return ( <motion.div ref={cardRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} style={{ perspective: "1000px" }}> <motion.div style={{ rotateX, rotateY }} className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 transform-style-3d h-full"> {children} </motion.div> </motion.div> );
};


const ProcessSteps: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
        .bg-grid-pattern { background-color: #f8fafc; background-image: linear-gradient(rgba(3, 186, 190, 0.07) 1px, transparent 1px), linear-gradient(to right, rgba(3, 186, 190, 0.07) 1px, transparent 1px); background-size: 3rem 3rem; }
        .transform-style-3d { transform-style: preserve-3d; }
      `}</style>
      <section className="py-20 lg:py-28 font-['Poppins',_sans-serif] bg-grid-pattern relative overflow-hidden">
        {/* Minden abszolút pozícionált elem a fő szekción belül van a megbízhatóságért */}
        <BlueprintCorner className="absolute top-0 left-0 text-cyan-900/10 hidden md:block" delay={0.2} />
        <BlueprintCorner className="absolute bottom-0 right-0 text-cyan-900/10 transform rotate-180 hidden md:block" delay={0.3} />
        
        {/* ÚJ, ROBUSTUS POZÍCIÓK A FELKIÁLTÓJELEKNEK */}
        <DesignedExclamationMark className="absolute top-[8%] left-[10%] w-20 h-20 transform -rotate-12 hidden xl:block" delay={0.4} />
        <DesignedExclamationMark className="absolute top-[40%] right-[8%] w-16 h-16 transform rotate-12 hidden xl:block" delay={0.8} />
        <DesignedExclamationMark className="absolute bottom-[15%] left-[20%] w-14 h-14 transform rotate-6 hidden xl:block" delay={1.0} />

        <div className="container mx-auto px-6 relative z-10">
          <div className="relative text-center mb-16 lg:mb-20">
            <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
              Együttműködésünk <span className={accentColor.text}>Folyamata</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">Átlátható lépések a sikeres és biztonságos munkakörnyezetért.</p>
          </div>
          <div className="relative max-w-xl mx-auto lg:max-w-4xl">
            <motion.div 
                className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-1 bg-gradient-to-b from-cyan-200 via-cyan-300 to-cyan-200 rounded-full transform -translate-x-1/2"
                style={{ transformOrigin: 'top' }}
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true, amount: 0.2, margin: "-100px" }}
                transition={{ duration: 1.5, ease: 'easeOut' }}
            />

            <div className="space-y-20">
              {steps.map((step, index) => (
                <motion.div
                  key={step.step}
                  className={`lg:flex items-center relative ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
                  initial={index % 2 === 0 ? 'hiddenRight' : 'hiddenLeft'}
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.25 }}
                  variants={cardEntranceVariants}
                >
                  <div className={`w-full lg:w-1/2 flex mb-8 lg:mb-0 ${index % 2 === 0 ? 'lg:justify-start lg:pl-[calc(50%+3rem)]' : 'lg:justify-end lg:pr-[calc(50%+3rem)]'}`}>
                    <motion.div
                      className="relative inline-block"
                      initial="hidden" whileInView="visible"
                      viewport={{ once: true, amount: 0.6 }}
                      variants={iconContainerVariants}
                    >
                      <motion.div 
                           className="hidden lg:block absolute top-1/2 w-5 h-5 bg-white rounded-full z-10"
                           style={{ borderColor: accentColor.base, borderWidth: '2px', left: index % 2 === 0 ? 'auto' : 'calc(100% + 2rem)', right: index % 2 === 0 ? 'calc(100% + 2rem)' : 'auto' }}
                           animate={{ scale: [1, 1.6, 1], boxShadow: [ '0 0 0px rgba(3, 186, 190, 0)', '0 0 25px rgba(3, 186, 190, 0.4)', '0 0 0px rgba(3, 186, 190, 0)' ] }}
                           transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut', delay: 1 + index * 0.2 }}
                      />
                      <div className="bg-gradient-to-br from-white to-slate-100 p-6 rounded-full inline-flex items-center justify-center shadow-xl border border-gray-100 ring-8 ring-white/50">
                         <div className={`absolute -top-3 ${index % 2 === 0 ? '-right-3' : '-left-3'} ${accentColor.bg} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-20 ring-4 ring-white`}>
                           <AnimatedNumber to={step.step} />
                         </div>
                         <step.icon className={`w-14 h-14 ${accentColor.text}`} aria-hidden="true" />
                      </div>
                    </motion.div>
                  </div>

                  <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-10' : 'lg:pl-10'}`}>
                    <TiltCard>
                      <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 leading-relaxed">{step.description}</p>
                    </TiltCard>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16 lg:mt-20 px-4">
              <p className="text-lg md:text-xl text-slate-700 font-medium max-w-xl mx-auto">
                  Igen jól látod, nálunk csak a munka befejezése után kell fizetni!
              </p>
          </div>

          <div className="text-center mt-10 lg:mt-12">
            <motion.button
                whileHover={{ scale: 1.05, y: -5, boxShadow: `0 10px 20px -5px ${accentColor.base}60` }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className={`
                    ${accentColor.bg} ${accentColor.hoverBg} text-white
                    font-bold py-4 px-10 rounded-xl text-lg sm:text-xl 
                    shadow-lg ${accentColor.shadow} ${accentColor.hoverShadow}
                    transition-all duration-300 ease-in-out 
                    focus:outline-none focus:ring-4 ${accentColor.ring} ${accentColor.focusRingOffset}
                `}
            >
              Ingyenes konzultációt foglalok
            </motion.button>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProcessSteps;