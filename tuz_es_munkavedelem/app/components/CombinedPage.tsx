// This file was created by combining components/HeaderHero.tsx and components/sections/TestimonialSlider.tsx
// All styling and functionality have been preserved as requested.

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView, useAnimationControls, useMotionValue, useTransform, useSpring } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/24/solid';
import { MdEmojiPeople } from 'react-icons/md';

// Assuming this component exists in another file and needs to be imported or copied here.
// I am including a placeholder for it, assuming the user will provide it later if needed.
const QuoteRequestModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full">
        <h2 className="text-2xl font-bold mb-4">Ajánlatkérés</h2>
        <p>A modal ablak tartalma ide kerül.</p>
        <button onClick={onClose} className="mt-6 px-4 py-2 bg-blue-500 text-white rounded">
          Bezár
        </button>
      </div>
    </div>
  );
};

// --- STÍLUS ÉS KONFIGURÁCIÓS KONSTANSOK ---
const ACCENT_COLOR = {
    baseHex: '#03BABE',
    baseRgb: '3, 186, 190',
    bg: 'bg-[#03BABE]',
    hoverBg: 'hover:bg-cyan-600',
    ring: 'focus-visible:ring-cyan-500',
    textOnAccent: 'text-white',
    textDark: 'text-cyan-800',
    textLight: 'text-cyan-300',
};

const RED_ACCENT_COLOR = {
    baseHex: '#DC2626', // Tailwind red-600
    baseRgb: '220, 38, 38',
    bg: 'bg-red-600',
    hoverBg: 'hover:bg-red-700',
    ring: 'focus-visible:ring-red-500',
    textOnAccent: 'text-white',
};

const ANIMATION_VARIANTS = {
    container: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.5 },
        },
    },
    item: {
        hidden: { opacity: 0, y: 25, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { type: 'spring', stiffness: 100, damping: 20 },
        },
    },
};

const testimonialAccentColor = {
  starActive: 'text-cyan-400',
  quoteMark: 'text-cyan-200/10',
  primaryText: 'text-cyan-400',
};

const BlueprintCorner: React.FC<{ className?: string }> = ({ className }) => (
    <motion.svg className={className} width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} viewport={{ once: true }} > <path d="M150 0H0V150" stroke="currentColor" strokeWidth="2"/><path d="M120 0H0V120" stroke="currentColor" strokeWidth="1"/><path d="M90 0H0V90" stroke="currentColor" strokeWidth="0.5"/><circle cx="0" cy="0" r="5" fill="currentColor"/> </motion.svg>
);

const testimonials = [
    { id: 1, name: "Nagy Károly", company: "Tech Kft.", quote: "Profi csapat, naprakész tudással. Az audit után sokkal nyugodtabban alszom. Maximálisan elégedett vagyok.", rating: 5 },
    { id: 2, name: "Kiss Éva", company: "Kis Bolt Bt.", quote: "Az oktatásuk érthető és gyakorlatias volt, a munkatársaim is pozitívan értékelték. Rugalmasak és segítőkészek.", rating: 5 },
    { id: 3, name: "Szabó Zoltán", company: "Gyártó Zrt.", quote: "Gyorsan és precízen elkészítették a hiányzó szabályzatainkat. A hatósági ellenőrzésen minden rendben volt.", rating: 5 },
    { id: 4, name: "Horváth Mária", company: "Szolgáltató Centrum", quote: "A kockázatértékelésük rendkívül alapos volt, olyan dolgokra is felhívták a figyelmünket, amikre nem is gondoltunk.", rating: 5 },
    { id: 5, name: "Fehér Petra", company: "Innovatív Zrt.", quote: "Modern szemlélet, kiváló szakértelem. Mindenkinek csak ajánlani tudom őket, aki komolyan veszi a biztonságot.", rating: 5 },
    { id: 6, name: "Kovács István", company: "Építőipari Kft.", quote: "Már több projekten dolgoztunk együtt, mindig megbízható és profi partnerek voltak. Köszönjük a munkájukat!", rating: 5 },
    { id: 7, name: "Tóth Gábor", company: "Logisztika Kft.", quote: "A tűzvédelmi felülvizsgálat rendkívül alapos volt, mindenre kiterjedő és érthető magyarázatokkal. Ajánlott!", rating: 5 },
    { id: 8, name: "Varga Judit", company: "Élelmiszerbolt", quote: "A HACCP rendszer bevezetése simán ment, köszönhetően a szakértelemnek és a folyamatos támogatásnak. Remek munka!", rating: 5 },
    { id: 9, name: "Molnár Dániel", company: "Építőanyag Kereskedés", quote: "A munkavédelmi dokumentáció rendezése gyorsan és hatékonyan történt. Jelentős terhet vettek le a vállunkról.", rating: 5 },
    { id: 10, name: "Papp Andrea", company: "Vendéglátás Kft.", quote: "Az időszakos felülvizsgálatok mindig pontosan lezajlanak, és előzetesen emlékeztetnek is rá. Kiváló szolgáltatás!", rating: 5 },
    { id: 11, name: "Fekete Zsolt", company: "Szoftverfejlesztő Zrt.", quote: "Online is megoldható volt az oktatás, ami nekünk nagyon fontos volt a rugalmasság miatt. Profik!", rating: 5 },
    { id: 12, name: "Juhász Krisztina", company: "Mezőgazdasági Vállalat", quote: "A telephelyi felmérés és a tanácsadás sokat segített a specifikus kérdéseinkben. Külön köszönöm a részletes útmutatót!", rating: 5 },
];

const TestimonialCard: React.FC<{ testimonial: typeof testimonials[0] }> = ({ testimonial }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        mouseX.set(event.clientX - rect.left);
        mouseY.set(event.clientY - rect.top);
    };
    const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0); };

    const tiltIntensity = 4;
    const rotateX = useSpring(useTransform(mouseY, [0, 300], [tiltIntensity, -tiltIntensity]), { stiffness: 250, damping: 25 });
    const rotateY = useSpring(useTransform(mouseX, [0, 300], [-tiltIntensity, tiltIntensity]), { stiffness: 250, damping: 25 });

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{ perspective: "1000px" }}
            className="h-full group"
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="h-full bg-white/5 backdrop-blur-md rounded-2xl p-8 flex flex-col justify-between border border-white/10 overflow-hidden relative shadow-lg"
            >
                <motion.div
                    className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ background: useTransform([mouseX, mouseY], ([newX, newY]) => `radial-gradient(600px at ${newX}px ${newY}px, rgba(3, 186, 190, 0.15), transparent 80%)`) }}
                />
                <motion.div
                    className={`absolute -top-4 -left-2 text-8xl font-serif ${testimonialAccentColor.quoteMark} z-0 transition-transform duration-300 group-hover:scale-110`}
                >“</motion.div>
                <div className="relative z-10 text-center flex flex-col flex-grow">
                    <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className={`w-6 h-6 ${i < testimonial.rating ? testimonialAccentColor.starActive : 'text-white/20'}`} />
                        ))}
                    </div>
                    <p className="text-base italic text-slate-300 mb-5 leading-relaxed flex-grow min-h-[120px] flex items-center justify-center">
                    <span>"{testimonial.quote}"</span>
                    </p>
                    <div className="mt-auto">
                        <p className="font-semibold text-base text-white">{testimonial.name}</p>
                        <p className="text-xs text-slate-400">{testimonial.company}</p>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

// --- FŐ KOMPONENS ---
const CombinedPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showTestimonials, setShowTestimonials] = useState(false);

    // Animációs állapotok és referenciák
    const sliderRef = useRef<HTMLDivElement>(null);
    const controls = useAnimationControls();
    
    // Testimonialok másolása a végtelen görgetéshez
    const combinedTestimonials = [...testimonials, ...testimonials, ...testimonials];

    const animationDuration = combinedTestimonials.length * 0.75;

    useEffect(() => {
        // A fejléc animációjának befejezése után késleltetve jelenik meg a testimonial szekció
        const timer = setTimeout(() => {
            setShowTestimonials(true);
        }, 1500); // 1.5 másodperces késleltetés, ami a fejléc animációjának időtartamához igazodik

        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if(showTestimonials && sliderRef.current) {
            const totalWidthPercentage = 100 * (testimonials.length / (combinedTestimonials.length));

            controls.start({
                x: [`0%`, `-${totalWidthPercentage}%`],
                transition: { ease: "linear", duration: animationDuration, repeat: Infinity }
            });
        }
    }, [showTestimonials, controls, testimonials.length, combinedTestimonials.length, animationDuration]);

    const handleHoverStart = () => {
        if (showTestimonials) {
            controls.stop();
        }
    };

    const handleHoverEnd = () => {
        if (showTestimonials) {
            controls.start({
                x: [`0%`, `-${100 * (testimonials.length / (combinedTestimonials.length))}%`],
                transition: { ease: "linear", duration: animationDuration, repeat: Infinity }
            });
        }
    };

    return (
        // A teljes oldal hátterét itt állítjuk be, hogy egységes legyen.
        <div className="min-h-screen w-screen flex flex-col text-white antialiased relative overflow-hidden bg-slate-900 font-['Poppins',_sans-serif] cta-grid-pattern pt-[60px]">
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
                .cta-glow {
                  box-shadow: 0 0 15px ${ACCENT_COLOR.baseHex}40, 0 0 30px ${ACCENT_COLOR.baseHex}30, inset 0 0 10px ${ACCENT_COLOR.baseHex}20;
                }
                .cta-glow-red {
                    box-shadow: 0 0 30px ${RED_ACCENT_COLOR.baseHex}80, 0 0 60px ${RED_ACCENT_COLOR.baseHex}60, inset 0 0 20px ${RED_ACCENT_COLOR.baseHex}40;
                }
                .cta-grid-pattern {
                  background-image: linear-gradient(rgba(203, 213, 225, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(203, 213, 225, 0.05) 1px, transparent 1px);
                  background-size: 4rem 4rem;
                }
                `}
            </style>

            {/* Navbar */}
            <div className="fixed top-0 left-0 right-0 bg-slate-950/70 backdrop-blur-lg py-3 px-4 sm:px-6 flex items-center justify-between text-sm shadow-xl z-50 border-b border-slate-700">
                <div className="flex items-center gap-1">
                    <div className="font-bold text-lg tracking-wider relative top-[5px]">
                        <span className={ACCENT_COLOR.textLight}>Munkavédelmi</span><span className="text-white">Szaki</span>
                    </div>
                    <Image
                        src="/munkavedelmiszakiLOGO.png"
                        alt="Munkavédelmi Szaki Logó"
                        width={32}
                        height={32}
                        className="h-8 w-auto"
                    />
                </div>
                <div className="hidden md:flex items-center mr-30 gap-6 font-medium text-slate-300 ">
                    <a href="mailto:info@tuz-munkavedelmiszaki.hu" className="hover:text-cyan-300 transition-colors duration-300">info@tuz-munkavedelmiszaki.hu</a>
                    <a href="tel:+36302722571" className="hover:text-cyan-300 transition-colors duration-300 whitespace-nowrap">+36 30 272 2571</a>
                </div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className={`
                        ${ACCENT_COLOR.bg} ${ACCENT_COLOR.hoverBg} ${ACCENT_COLOR.textOnAccent}
                        font-bold py-2.5 px-5 rounded-lg text-sm
                        transition-all duration-300 ease-in-out
                        focus:outline-none focus-visible:ring-2 ${ACCENT_COLOR.ring}
                        `}
                    >
                        Ajánlatkérés
                    </button>
                </motion.div>
            </div>

            {/* Header Hero Section - Eltávolítottam a bg-slate-900 és cta-grid-pattern osztályokat innen */}
            <div className="flex-grow flex flex-col items-center justify-center text-center relative">
                <div className="max-w-5xl relative z-10 flex flex-col items-center">
                    <motion.div
                      className="flex flex-col items-center"
                      variants={ANIMATION_VARIANTS.container}
                      initial="hidden"
                      animate="visible"
                    >
                      <motion.div variants={ANIMATION_VARIANTS.item} className="mb-1 z-20">
                          <Image
                              src="/munkavedelmiszakiLOGO.png"
                              alt="Munkavédelmi Szaki Logó"
                              width={100}
                              height={100}
                              className="mx-auto"
                              priority
                          />
                      </motion.div>
                      <motion.h2
                          className="text-3xl md:text-4xl text-slate-300 mb-2 z-10"
                          variants={ANIMATION_VARIANTS.item}
                      >
                          Elkészítjük a jogszabályoknak megfelelő Tűz- Munkavédelmi, és HACCP dokumentációkat, hogy téged ne büntessenek meg.
                      </motion.h2>
                      <motion.h1
                          className="text-5xl sm:text-7xl md:text-7xl font-black mb-8 leading-tight tracking-tighter text-white z-10"
                          variants={ANIMATION_VARIANTS.item}
                      >
                          A büntetés értéke 10 Millió forintig terjedhet!
                      </motion.h1>
                      <motion.div
                          variants={ANIMATION_VARIANTS.item}
                      >
                          <Link
                            href="https://app.minup.io/book/munkavedelmiszaki/service/46358"
                            passHref
                            className="inline-flex"
                          >
                            <motion.button
                                whileHover={{ scale: 1.05, boxShadow: `0 0 45px ${RED_ACCENT_COLOR.baseHex}80, 0 0 90px ${RED_ACCENT_COLOR.baseHex}60, inset 0 0 30px ${RED_ACCENT_COLOR.baseHex}40` }}
                                whileTap={{ scale: 0.98, boxShadow: `0 0 15px ${RED_ACCENT_COLOR.baseHex}40, 0 0 30px ${RED_ACCENT_COLOR.baseHex}30, inset 0 0 10px ${RED_ACCENT_COLOR.baseHex}20` }}
                                className={`inline-flex items-center gap-3 ${RED_ACCENT_COLOR.bg} ${RED_ACCENT_COLOR.hoverBg} ${RED_ACCENT_COLOR.textOnAccent} font-bold py-8 px-12 rounded-xl text-3xl shadow-lg cta-glow-red transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 ${RED_ACCENT_COLOR.ring} focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900`}
                            >
                                Foglald le ingyenes konzultációdat!
                            </motion.button>
                          </Link>
                      </motion.div>

                      <motion.div
                          variants={ANIMATION_VARIANTS.item}
                          className="mt-2 mb-0 text-lg font-bold text-white text-center"
                      >
                          <span className="text-yellow-400">★ ★ ★ ★ ★</span>
                          <span className="ml-2">Több mint 150 elkerült büntetés!</span>
                      </motion.div>

                    </motion.div>
                </div>
            </div>

            {/* Testimonials Section */}
            {showTestimonials && (
              <section className="relative overflow-hidden pt-12 pb-24">
                  <BlueprintCorner className="absolute top-0 left-0 text-cyan-400/10 hidden md:block" />
                  <BlueprintCorner className="absolute bottom-0 right-0 text-cyan-400/10 transform rotate-180 hidden md:block" />
                  <div className="container mx-auto relative z-10">
                      <motion.div
                          className={`flex flex-col items-center gap-4 mb-8 lg:mb-12`}
                          initial={{opacity:0}}
                          animate={{opacity:1}}
                          transition={{duration:0.6}}
                      >
                          <MdEmojiPeople className="w-12 h-12 text-cyan-400 shrink-0" />
                          <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
                              Ők már  <span className={testimonialAccentColor.primaryText}>jobban</span> alszanak:
                          </h2>
                      </motion.div>
                      <motion.div
                          ref={sliderRef}
                          onHoverStart={handleHoverStart}
                          onHoverEnd={handleHoverEnd}
                          initial={{opacity: 0}}
                          animate={{opacity: 1}}
                          transition={{duration: 0.6, delay: 0.3}}
                          className={`max-w-7xl mx-auto overflow-hidden relative`}
                          style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
                      >
                          <motion.div className="flex" animate={controls}>
                              {combinedTestimonials.map((testimonial, index) => (
                                  <div key={`${testimonial.id}-${index}`} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                      <TestimonialCard testimonial={testimonial} />
                                  </div>
                              ))}
                          </motion.div>
                      </motion.div>
                  </div>
              </section>
            )}
            <QuoteRequestModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </div>
    );
};

export default CombinedPage;