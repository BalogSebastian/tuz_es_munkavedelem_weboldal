// components/sections/TestimonialSlider.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, useAnimationControls, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid';
import { MdEmojiPeople } from 'react-icons/md'; // ÚJ: MdEmojiPeople importálása

// --- StylizedQuoteIcon ELTÁVOLÍTVA ---
// Ez a komponens már nem lesz használva, mivel az MdEmojiPeople váltja fel.


const accentColor = {
  starActive: 'text-cyan-400',
  quoteMark: 'text-cyan-200/10', // Ezt a színt megtartjuk, bár a quote ikont kivettük
  primaryText: 'text-cyan-400', // Hozzáadtam, ha kellene a fő cím színéhez
};

const BlueprintCorner: React.FC<{ className?: string }> = ({ className }) => (
    <motion.svg className={className} width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg" initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }} viewport={{ once: true }} > <path d="M150 0H0V150" stroke="currentColor" strokeWidth="2"/><path d="M120 0H0V120" stroke="currentColor" strokeWidth="1"/><path d="M90 0H0V90" stroke="currentColor" strokeWidth="0.5"/><circle cx="0" cy="0" r="5" fill="currentColor"/> </motion.svg>
);

const testimonials = [
    { id: 1, name: "Nagy Károly", company: "Tech Kft.", quote: "Profi csapat, naprakész tudással. Az audit után sokkal nyugodtabban alszom. Maximálisan elégedett vagyok.", rating: 5 },
    { id: 2, name: "Kiss Éva", company: "Kis Bolt Bt.", quote: "Az oktatásuk érthető és gyakorlatias volt, a munkatársaim is pozitívan értékelték. Rugalmasak és segítőkészek.", rating: 5 },
    { id: 3, name: "Szabó Zoltán", company: "Gyártó Zrt.", quote: "Gyorsan és precízen elkészítették a hiányzó szabályzatainkat. A hatósági ellenőrzésen minden rendben volt.", rating: 4 },
    { id: 4, name: "Horváth Mária", company: "Szolgáltató Centrum", quote: "A kockázatértékelésük rendkívül alapos volt, olyan dolgokra is felhívták a figyelmünket, amikre nem is gondoltunk.", rating: 5 },
    { id: 5, name: "Fehér Petra", company: "Innovatív Zrt.", quote: "Modern szemlélet, kiváló szakértelem. Mindenkinek csak ajánlani tudom őket, aki komolyan veszi a biztonságot.", rating: 5 },
    { id: 6, name: "Kovács István", company: "Építőipari Kft.", quote: "Már több projekten dolgoztunk együtt, mindig megbízható és profi partnerek voltak. Köszönjük a munkájukat!", rating: 5 },
    // Hozzáadott extra értékelések a végtelenítéshez
    { id: 7, name: "Tóth Gábor", company: "Logisztika Kft.", quote: "A tűzvédelmi felülvizsgálat rendkívül alapos volt, mindenre kiterjedő és érthető magyarázatokkal. Ajánlott!", rating: 5 },
    { id: 8, name: "Varga Judit", company: "Élelmiszerbolt", quote: "A HACCP rendszer bevezetése simán ment, köszönhetően a szakértelemnek és a folyamatos támogatásnak. Remek munka!", rating: 4 },
    { id: 9, name: "Molnár Dániel", company: "Építőanyag Kereskedés", quote: "A munkavédelmi dokumentáció rendezése gyorsan és hatékonyan történt. Jelentős terhet vettek le a vállunkról.", rating: 5 },
    { id: 10, name: "Papp Andrea", company: "Vendéglátás Kft.", quote: "Az időszakos felülvizsgálatok mindig pontosan lezajlanak, és előzetesen emlékeztetnek is rá. Kiváló szolgáltatás!", rating: 5 },
    { id: 11, name: "Fekete Zsolt", company: "Szoftverfejlesztő Zrt.", quote: "Online is megoldható volt az oktatás, ami nekünk nagyon fontos volt a rugalmasság miatt. Profik!", rating: 4 },
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
                    className={`absolute -top-4 -left-2 text-8xl font-serif ${accentColor.quoteMark} z-0 transition-transform duration-300 group-hover:scale-110`}
                >“</motion.div>
                <div className="relative z-10 text-center flex flex-col flex-grow">
                    <div className="flex justify-center mb-4">
                        {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className={`w-6 h-6 ${i < testimonial.rating ? accentColor.starActive : 'text-white/20'}`} />
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

const TestimonialSlider: React.FC = () => {
    const sectionRef = useRef(null);
    const sliderRef = useRef<HTMLDivElement>(null); // Pontosabb típus
    const controls = useAnimationControls();
    const sectionIsInView = useInView(sectionRef, { once: true, amount: 0.2 });
    
    // Duplázd meg a testimonials tömböt a zökkenőmentes végtelenítéshez
    const combinedTestimonials = [...testimonials, ...testimonials];
    
    // Kiszámoljuk az egyetlen készlet szélességét a csúszás animációjához
    // Ez a `testimonials.length` értékével van arányban, nem a `combinedTestimonials` értékével.
    const itemWidth = 100 / (combinedTestimonials.length / 2); // Kártyák aránya a teljes szélességhez képest (1/2, 1/3, 1/4 attól függően, hány kártya látszik egyszerre)
    
    // Az animáció teljes időtartama - MÓDOSÍTVA: gyorsabb görgetés
    const animationDuration = combinedTestimonials.length * 0.75; // Kétszer annyi kártya, kétszer annyi idő, hogy lassabb legyen.

    useEffect(() => {
        if(sectionIsInView && sliderRef.current) {
            // Számoljuk ki a teljes görgetési távolságot százalékban
            // Ahhoz, hogy jobbra forogjon, az X értéke növekedjen, vagy a translateX maradjon negatív, de az érték csökkenjen (közelebb a 0-hoz)
            // A "jobbra forogjon" azt jelenti, hogy a tartalmat balra kell tolni, azaz a translateX negatív érték felé halad.
            // A végtelen ciklust úgy érjük el, hogy a combinedTestimonials feléig görgetünk, majd hirtelen visszaugorunk az elejére.
            const totalWidthPercentage = 100 * (testimonials.length / (combinedTestimonials.length));

            controls.start({
                x: [`0%`, `-${totalWidthPercentage}%`], // Balra görgetés a végtelen hatás eléréséhez
                transition: { ease: "linear", duration: animationDuration, repeat: Infinity }
            });
        }
    }, [sectionIsInView, controls, testimonials.length, combinedTestimonials.length, animationDuration]);
    
    // Hover start/end animáció vezérlése (csak ha már látható a szekció)
    const handleHoverStart = () => {
        if (sectionIsInView) {
            controls.stop();
        }
    };

    const handleHoverEnd = () => {
        if (sectionIsInView) {
            controls.start({
                x: [`0%`, `-${100 * (testimonials.length / (combinedTestimonials.length))}%`],
                transition: { ease: "linear", duration: animationDuration, repeat: Infinity }
            });
        }
    };


    return (
        <section ref={sectionRef} className="py-24 lg:py-32 bg-slate-900 font-['Poppins',_sans-serif] relative overflow-hidden cta-grid-pattern">
            <style>{`.cta-grid-pattern { background-image: linear-gradient(rgba(203, 213, 225, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(203, 213, 225, 0.05) 1px, transparent 1px); background-size: 4rem 4rem; }`}</style>
            
            <BlueprintCorner className="absolute top-0 left-0 text-cyan-400/10 hidden md:block" />
            <BlueprintCorner className="absolute bottom-0 right-0 text-cyan-400/10 transform rotate-180 hidden md:block" />

            <div className="container mx-auto relative z-10">
                <motion.div 
                    className="flex justify-center items-center gap-4 mb-16 lg:mb-20"
                    initial={{opacity:0, y:20}}
                    animate={sectionIsInView ? {opacity:1, y:0} : {}}
                    transition={{duration:0.6, delay:0.1}}
                >
                    {/* MÓDOSÍTVA: MdEmojiPeople ikon színe pirosra */}
                    <MdEmojiPeople className="w-12 h-12 text-cyan-400 shrink-0" /> {/* Piros árnyalat */}
                    <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tight">
                        Mit Mondanak <span className={accentColor.primaryText}>Rólunk</span> Ügyfeleink?
                    </h2>
                </motion.div>

                <motion.div
                    ref={sliderRef}
                    onHoverStart={handleHoverStart}
                    onHoverEnd={handleHoverEnd}
                    className="max-w-7xl mx-auto overflow-hidden relative"
                    // A maskImage a kártyák elhalványulását okozza a széleken
                    style={{ maskImage: "linear-gradient(to right, transparent, black 15%, black 85%, transparent)" }}
                >
                    {/* A combinedTestimonials tömb renderelése, hogy megvalósuljon a végtelenítés */}
                    <motion.div className="flex" animate={controls}>
                        {combinedTestimonials.map((testimonial, index) => (
                            // Minden kártya szélessége 100% / látható kártyák száma
                            // sm:w-1/2, md:w-1/3, lg:w-1/4, XL-en is 1/4-et feltételezünk
                            <div key={`${testimonial.id}-${index}`} className="flex-shrink-0 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
                                <TestimonialCard testimonial={testimonial} />
                            </div>
                        ))}
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default TestimonialSlider;