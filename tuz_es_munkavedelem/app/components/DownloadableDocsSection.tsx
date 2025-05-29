// app/components/DownloadableDocsSection.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
    motion, 
    useMotionValue, 
    useTransform, 
    useSpring, 
    MotionProps, // <<< JAVÍTÁS: Szükséges típus importálása
    Transition  // <<< JAVÍTÁS: Szükséges típus importálása
} from 'framer-motion';
import { 
    DocumentArrowDownIcon, 
    UserIcon, 
    EnvelopeIcon, 
    PhoneIcon, 
    ArrowRightIcon,
    CheckCircleIcon 
} from '@heroicons/react/24/solid';

const accentColor = {
  baseHex: '#DD520F',
  bg: 'bg-[#DD520F]',
  text: 'text-[#DD520F]', 
  textOnAccent: 'text-white',
  hoverBg: 'hover:bg-orange-700',
  ring: 'focus:ring-orange-500',
  borderFocus: 'focus:border-orange-500', 
  iconDefault: 'text-gray-400', 
  successText: 'text-green-600', 
  successBg: 'bg-green-50',
};

const downloadableDocs = [
  { id: 1, title: "Kávézó Nyitás feltételei", description: "Töltse le részletes útmutatónkat...", fileName: "kavezo_nyitas_feltetelei.pdf" },
  { id: 2, title: "Mire van szüksége egy irodának?", description: "Ismerje meg az irodák alapvető tűz- és munkavédelmi szükségleteit...", fileName: "irodai_szuksegletek_lista.pdf" },
  { id: 3, title: "Általános Munkavédelmi Kisokos", description: "Egy praktikus összefoglaló a legfontosabb munkavédelmi tudnivalókról...", fileName: "altalanos_munkavedelmi_kisokos.pdf" },
  { id: 4, title: "Tűzvédelmi Szabályzat Alapok", description: "Ismerje meg, milyen alapvető elemekből kell állnia egy tűzvédelmi szabályzatnak...", fileName: "tuzvedelmi_szabalyzat_alapok.pdf" },
];

interface FormDataState { name: string; email: string; phone: string; }

interface DownloadCardProps {
  doc: typeof downloadableDocs[0];
  formData: FormDataState;
  submitted: boolean;
  handleChange: (docId: number, e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (docId: number, e: React.FormEvent<HTMLFormElement>) => void;
}

const DownloadCard: React.FC<DownloadCardProps> = ({ doc, formData, submitted, handleChange, handleSubmit }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    mouseX.set((event.clientX - rect.left - rect.width / 2) / (rect.width / 2));
    mouseY.set((event.clientY - rect.top - rect.height / 2) / (rect.height / 2));
  };
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

  const tiltIntensity = 5;
  const rotateX = useSpring(useTransform(mouseY, [-1, 1], [tiltIntensity, -tiltIntensity]), { stiffness: 250, damping: 30, mass: 0.7 });
  const rotateY = useSpring(useTransform(mouseX, [-1, 1], [-tiltIntensity, tiltIntensity]), { stiffness: 250, damping: 30, mass: 0.7 });
  
  const cardEntranceVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.92, rotateX: -10 },
    visible: { opacity: 1, y: 0, scale: 1, rotateX: 0, transition: { duration: 0.7, ease: [0.25, 0.85, 0.45, 1] } },
  };
  
  const iconDownloadAnimation = {
    animate: { y: [0, -4, 0, 2, 0], transition: { duration: 2, ease: "easeInOut", repeat: Infinity, delay: 0 } }
  };

  return (
    <motion.div
      ref={cardRef}
      className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-200/70 flex flex-col relative overflow-hidden"
      variants={cardEntranceVariants}
      style={{ perspective: '1200px' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ y: -6, scale:1.02, boxShadow: "0 20px 30px -10px rgba(0,0,0,0.1)" }}
      transition={{type: "spring", stiffness:300, damping: 20}}
    >
      <motion.div className="w-full h-full" style={{transformStyle: "preserve-3d", rotateX, rotateY}}>
        <div className="flex-grow">
            <motion.div {...iconDownloadAnimation} className="w-fit mx-auto mb-5">
                <DocumentArrowDownIcon className={`w-12 h-12 sm:w-14 sm:h-14 ${accentColor.text}`} />
            </motion.div>
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-3 text-center">{doc.title}</h3>
            <p className="text-gray-600 leading-relaxed mb-6 text-center text-sm line-clamp-4">{doc.description}</p>

            {submitted ? (
            <motion.div 
                className={`text-center py-6 px-4 rounded-lg ${accentColor.successBg} border border-green-200`}
                initial={{opacity:0, y:10, scale:0.9}}
                animate={{opacity:1, y:0, scale:1}}
                transition={{duration:0.5, ease:"backOut", delay: 0.1}}
            >
                <motion.div initial={{scale:0, opacity:0}} animate={{scale:1, opacity:1}} transition={{type:"spring", stiffness:200, damping:10, delay:0.2}}>
                    <CheckCircleIcon className={`w-16 h-16 ${accentColor.successText} mx-auto mb-3`} /> 
                </motion.div>
                <h4 className={`text-lg sm:text-xl font-semibold ${accentColor.successText} mb-2`}>Köszönjük az adatait!</h4>
                <p className="text-gray-700 text-sm">A letöltési linket hamarosan elküldjük Önnek, vagy a letöltés automatikusan elindul.</p>
                <p className="text-xs text-gray-500 mt-2">(Ez egy minta üzenet.)</p>
            </motion.div>
            ) : (
            <form onSubmit={(e) => handleSubmit(doc.id, e)} className="space-y-4 sm:space-y-5">
                {(['name', 'email', 'phone'] as Array<keyof FormDataState>).map(fieldName => (
                <div key={fieldName}>
                    <label htmlFor={`${fieldName}-${doc.id}`} className="sr-only">
                    {fieldName === 'name' ? 'Név' : fieldName === 'email' ? 'Email cím' : 'Telefonszám'}
                    </label>
                    <div className="relative group">
                    <div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors duration-200 group-focus-within:${accentColor.text}`}>
                        {fieldName === 'name' && <UserIcon className={`h-5 w-5 ${accentColor.iconDefault} group-focus-within:${accentColor.text}`} aria-hidden="true" />}
                        {fieldName === 'email' && <EnvelopeIcon className={`h-5 w-5 ${accentColor.iconDefault} group-focus-within:${accentColor.text}`} aria-hidden="true" />}
                        {fieldName === 'phone' && <PhoneIcon className={`h-5 w-5 ${accentColor.iconDefault} group-focus-within:${accentColor.text}`} aria-hidden="true" />}
                    </div>
                    <input
                        type={fieldName === 'email' ? 'email' : fieldName === 'phone' ? 'tel' : 'text'}
                        name={fieldName}
                        id={`${fieldName}-${doc.id}`}
                        value={formData[fieldName]}
                        onChange={(e) => handleChange(doc.id, e)}
                        className={`block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 
                                    focus:outline-none ${accentColor.ring} ${accentColor.borderFocus} 
                                    sm:text-sm transition-all duration-200 hover:shadow-md focus:shadow-md focus:scale-[1.01]`}
                        placeholder={fieldName === 'name' ? 'Teljes Név' : fieldName === 'email' ? 'Email cím' : 'Telefonszám (opcionális)'}
                        required={fieldName !== 'phone'}
                    />
                    </div>
                </div>
                ))}
                <div className="pt-3">
                <motion.button
                    type="submit"
                    className={`w-full flex items-center justify-center px-6 py-3.5 border border-transparent rounded-lg shadow-lg 
                                text-base font-semibold ${accentColor.textOnAccent} ${accentColor.bg} ${accentColor.hoverBg} 
                                focus:outline-none focus:ring-2 focus:ring-offset-2 ${accentColor.ring} 
                                transition-all duration-200 ease-in-out`}
                    whileHover={{ scale: 1.03, y: -2, boxShadow: `0 10px 20px -5px ${accentColor.baseHex}55`}}
                    whileTap={{ scale: 0.98 }}
                >
                    Letöltés és Adatlap Küldése
                    <motion.span initial={{x:0}} animate={{x:0}} whileHover={{x:4}} transition={{type:'spring', stiffness:300, damping:15}}>
                        <ArrowRightIcon className="ml-3 h-5 w-5" />
                    </motion.span>
                </motion.button>
                </div>
            </form>
            )}
        </div>
      </motion.div>
    </motion.div>
  );
}

// JAVÍTÁS: BgBlobConfig interfész pontosabb típusokkal
interface BgBlobConfig {
    key: string;
    className: string; 
    initial: MotionProps['initial']; // Framer Motion saját típusa
    animate: MotionProps['animate']; // Framer Motion saját típusa
    transition: Transition;         // Framer Motion saját típusa
    // A style prop-ot most már az initial tartalmazza a randomizált értékekkel
}

const DownloadableDocsSection: React.FC = () => {
  const [formData, setFormDataState] = useState<Record<number, FormDataState>>({1: { name: '', email: '', phone: '' },2: { name: '', email: '', phone: '' },3: { name: '', email: '', phone: '' },4: { name: '', email: '', phone: '' },});
  const [submitted, setSubmittedState] = useState<Record<number, boolean>>({1: false,2: false,3: false,4: false,});
  const [isClient, setIsClient] = useState(false);
  const [bgBlobConfigs, setBgBlobConfigs] = useState<BgBlobConfig[]>([]);

  useEffect(() => {
    setIsClient(true); 
    const configs: BgBlobConfig[] = [...Array(2)].map((_, i) => {
        const initialX = `${Math.random() * 50 - 25}vw`;
        const initialY = `${Math.random() * 50 - 25}vh`;
        const initialScale = 0.6 + Math.random() * 0.2;
        
        return {
            key: `bg-blob-${i}`,
            className: "absolute filter blur-3xl", // Opacity-t az initial kezeli
            initial: {
                width: `${300 + Math.random() * 200}px`,
                height: `${300 + Math.random() * 200}px`,
                top: `${Math.random() * 90 - 10}%`,
                left: `${Math.random() * 90 - 10}%`,
                backgroundColor: i % 2 === 0 ? 'rgba(221, 82, 15, 0.04)' : 'rgba(129, 140, 248, 0.025)',
                borderRadius: `${Math.random()*20+30}% ${Math.random()*20+50}% ${Math.random()*20+40}% ${Math.random()*20+30}% / ${Math.random()*20+30}% ${Math.random()*20+40}% ${Math.random()*20+50}% ${Math.random()*20+40}%`,
                x: initialX,
                y: initialY,
                scale: initialScale,
                opacity: 0, // Kezdetben láthatatlan
            },
            animate: { 
                x: [initialX, `${Math.random() * 50 - 25}vw`, `${Math.random() * 50 - 25}vw`, initialX],
                y: [initialY, `${Math.random() * 50 - 25}vh`, `${Math.random() * 50 - 25}vh`, initialY],
                scale: [initialScale, initialScale + 0.1 + Math.random()*0.15, initialScale],
                rotate: [0, Math.random() * 15 - 7.5, 0, -(Math.random() * 15 - 7.5), 0],
                opacity: [0, 0.05 + Math.random() * 0.05, 0.08 + Math.random() * 0.08, 0.05 + Math.random() * 0.05, 0], // Kulcsframek az opacitáshoz
            },
            transition: {
                duration: 28 + Math.random() * 18,
                repeat: Infinity,
                repeatType: "mirror" as const,
                ease: "easeInOut",
                delay: i * (1.5 + Math.random() * 1.5),
            }
        };
    });
    setBgBlobConfigs(configs);
  }, []);


  const handleFormChange = (docId: number, e: React.ChangeEvent<HTMLInputElement>) => {setFormDataState(prev => ({ ...prev, [docId]: { ...prev[docId], [e.target.name]: e.target.value }}));};
  const handleFormSubmit = (docId: number, e: React.FormEvent<HTMLFormElement>) => {e.preventDefault(); console.log(`Adatok:`, formData[docId]); setSubmittedState(prev => ({ ...prev, [docId]: true }));};

  return (
    <section className="py-20 lg:py-28 bg-slate-100 relative overflow-hidden">
        {isClient && bgBlobConfigs.map(config => (
            <motion.div
              key={config.key}
              className={config.className}
              initial={config.initial}
              animate={config.animate}
              transition={config.transition}
            />
        ))}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center max-w-3xl mx-auto mb-16 lg:mb-20"
          initial={{opacity:0, y:-30}}
          whileInView={{opacity:1, y:0}}
          viewport={{once:true, amount:0.3}}
          transition={{duration:0.7, ease:"easeOut", delay:0.1}}
        >
          <h2 
            className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-5 sm:mb-6 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 via-[#DD520F] to-orange-600"
          >
            Töltse Le Hasznos Anyagainkat!
          </h2>
          <motion.p 
            className="text-xl text-gray-700 leading-relaxed"
            initial={{opacity:0, y:20}}
            whileInView={{opacity:1, y:0}}
            viewport={{once:true, amount:0.3}}
            transition={{duration:0.7, delay:0.25, ease:"easeOut"}}
          >
            Adja meg adatait, és férjen hozzá <span className="font-semibold text-[#DD520F]">exkluzív útmutatóinkhoz</span>, amelyek segítenek megfelelni az előírásoknak.
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
        >
          {downloadableDocs.map((doc) => (
            <DownloadCard 
              key={doc.id}
              doc={doc}
              formData={formData[doc.id]}
              submitted={submitted[doc.id]}
              handleChange={handleFormChange}
              handleSubmit={handleFormSubmit}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadableDocsSection;