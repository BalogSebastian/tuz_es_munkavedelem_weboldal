// components/sections/TestimonialSlider.tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView, animate } from 'framer-motion';
import { StarIcon } from '@heroicons/react/24/solid'; // ChatBubbleLeftRightIcon eltávolítva, helyette SVG idézőjel lesz

// Brand színek (csillagokhoz) és egyéb pasztell színek
const accentColor = {
  starActive: 'text-orange-400', // Enyhén világosabb narancs a csillagokhoz
  quoteMark: 'text-amber-100',   // Nagyon halvány borostyán az idézőjelhez
};

// Típus a háttérelemek konfigurációjához
interface AnimatedBackgroundElementConfig {
  key: string;
  className: string;
  initial: Record<string, any>;
  animate: Record<string, any>;
  transition: Record<string, any>;
  style?: React.CSSProperties;
}


const testimonials = [
  { id: 1, name: "Nagy Károly", company: "Tech Kft.", quote: "Profi csapat, naprakész tudással. Az audit után sokkal nyugodtabban alszom. Maximálisan elégedett vagyok.", rating: 5 },
  { id: 2, name: "Kiss Éva", company: "Kis Bolt Bt.", quote: "Az oktatásuk érthető és gyakorlatias volt, a munkatársaim is pozitívan értékelték. Rugalmasak és segítőkészek.", rating: 5 },
  { id: 3, name: "Szabó Zoltán", company: "Gyártó Zrt.", quote: "Gyorsan és precízen elkészítették a hiányzó szabályzatainkat. A hatósági ellenőrzésen minden rendben volt.", rating: 4 },
  { id: 4, name: "Horváth Mária", company: "Szolgáltató Centrum", quote: "A kockázatértékelésük rendkívül alapos volt, olyan dolgokra is felhívták a figyelmünket, amikre nem is gondoltunk.", rating: 5 },
  { id: 5, name: "Fehér Petra", company: "Innovatív Zrt.", quote: "Modern szemlélet, kiváló szakértelem. Mindenkinek csak ajánlani tudom őket, aki komolyan veszi a biztonságot.", rating: 5 },
  { id: 6, name: "Kovács István", company: "Építőipari Kft.", quote: "Már több projekten dolgoztunk együtt, mindig megbízható és profi partnerek voltak. Köszönjük a munkájukat!", rating: 5 },
];

interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
  isInView?: boolean; // Szülőből átadott láthatóság a csillag animációhoz
}

const starVariants = {
  hidden: { scale: 0, opacity: 0, rotate: -90 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    rotate: 0,
    transition: { delay: i * 0.08 + 0.3, type: 'spring', stiffness: 300, damping: 12 },
  }),
};

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial, isInView }) => {
  return (
    <div className="h-full bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between border border-gray-100/80 overflow-hidden relative"> {/* relative a nagyméretű idézőjelhez */}
      {/* Nagyméretű, dekoratív idézőjel a háttérben */}
      <motion.div 
        className={`absolute -top-4 -left-2 sm:-top-5 sm:-left-3 text-8xl sm:text-9xl font-serif ${accentColor.quoteMark} opacity-80 z-0`}
        initial={{opacity:0, x: -20, y: -20, rotate: -15}}
        animate={isInView ? {opacity:0.8, x:0, y:0, rotate:0} : {}}
        transition={{delay:0.2, duration:0.6, ease:"easeOut"}}
      >
        “
      </motion.div>
      
      <div className="relative z-10 text-center flex flex-col flex-grow">
        <motion.div 
          className="flex justify-center mb-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"} // Animáció indítása, ha a kártya látható
        >
          {[...Array(5)].map((_, i) => (
            <motion.div key={i} custom={i} variants={starVariants}>
              <StarIcon key={i} className={`w-5 h-5 sm:w-6 sm:h-6 ${i < (testimonial.rating || 0) ? accentColor.starActive : 'text-gray-300'}`} />
            </motion.div>
          ))}
        </motion.div>
        <p className="text-base italic text-gray-700 mb-5 leading-relaxed flex-grow min-h-[100px] sm:min-h-[120px] flex items-center justify-center">
          <span>"{testimonial.quote}"</span>
        </p>
        <div className="mt-auto">
          <p className="font-semibold text-base text-gray-900">{testimonial.name}</p>
          <p className="text-xs text-gray-500">{testimonial.company}</p>
        </div>
      </div>
    </div>
  );
};


const TestimonialSlider: React.FC = () => {
  const sectionRef = useRef(null);
  const sectionIsInView = useInView(sectionRef, { once: true, amount: 0.2 });

  // Háttérblobokhoz
  const [bgElements, setBgElements] = useState<AnimatedBackgroundElementConfig[]>([]);
  useEffect(() => {
    const elements: AnimatedBackgroundElementConfig[] = [...Array(2)].map((_, i) => {
      const size = 200 + Math.random() * 350;
      const duration = 25 + Math.random() * 20;
      return {
        key: `testimonial-bg-el-${i}`,
        className: "absolute rounded-full filter blur-3xl",
        initial: { opacity: 0, scale: 0.6 + Math.random()*0.2 },
        animate: { opacity: [0, 0.03 + Math.random() * 0.04, 0.02 + Math.random() * 0.03, 0], scale: [0.8, 1 + Math.random()*0.15, 0.8] },
        style: {
            width: `${size}px`,
            height: `${size}px`,
            backgroundColor: i % 2 === 0 ? 'rgba(221, 130, 15, 0.04)' : 'rgba(239, 180, 70, 0.04)', // Meleg, halvány borostyán és narancs
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
        },
        transition: { duration: duration, repeat: Infinity, repeatType: 'mirror' as const, ease: 'easeInOut', delay: i * 2 + Math.random() * 3 },
      };
    });
    setBgElements(elements);
  }, []);


  if (!testimonials || testimonials.length === 0) { /* ... változatlan ... */ }

  let extendedTestimonials = [...testimonials, ...testimonials];
  if (testimonials.length > 0) { /* ... változatlan ... */ }
  const singleSetDuration = testimonials.length * 5; // Kicsit lassabb görgetés

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-gradient-to-br from-stone-100 via-amber-50 to-orange-100 relative overflow-hidden"> {/* Finomított háttérszín */}
      {bgElements.length > 0 && bgElements.map(el => (
        <motion.div
          key={el.key}
          className={el.className}
          style={el.style}
          initial={el.initial}
          animate={el.animate}
          transition={el.transition}
        />
      ))}
      
      <div className="container mx-auto relative z-10"> {/* z-10 a tartalomnak */}
        <motion.h2 
          className="text-4xl lg:text-5xl font-bold text-gray-900 text-center mb-12 lg:mb-16 tracking-tight"
          initial={{opacity:0, y:-20}}
          animate={sectionIsInView ? {opacity:1, y:0} : {}}
          transition={{duration:0.6, delay:0.1}}
        >
          Mit Mondanak Rólunk Ügyfeleink?
        </motion.h2>

        {/* Gördülő sáv konténer áttűnő szélekkel */}
        <div className="max-w-6xl mx-auto overflow-hidden relative">
          {/* Bal oldali áttűnés */}
          <div className="absolute top-0 bottom-0 left-0 w-16 sm:w-24 md:w-32 bg-gradient-to-r from-stone-100 via-amber-50/80 to-transparent z-20 pointer-events-none"></div>
          {/* Jobb oldali áttűnés */}
          <div className="absolute top-0 bottom-0 right-0 w-16 sm:w-24 md:w-32 bg-gradient-to-l from-stone-100 via-amber-50/80 to-transparent z-20 pointer-events-none"></div>
          
          <motion.div
            className="flex"
            animate={{ x: ["0%", `-${100 * (testimonials.length / (extendedTestimonials.length / testimonials.length))}%`] }}
            transition={{
              ease: "linear",
              duration: singleSetDuration,
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div key={testimonial.id + '-' + index} className="flex-shrink-0 w-full sm:w-[calc(50%-1rem)] md:basis-[calc(33.333%-1rem)] mx-2 sm:mx-2"> {/* Kisebb margó a kártyák között */}
                <div className="h-full">
                    <TestimonialCard testimonial={testimonial} isInView={sectionIsInView} /> {/* isInView átadása */}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;