// components/sections/TestimonialSlider.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { StarIcon, ChatBubbleLeftRightIcon } from '@heroicons/react/24/solid';

// Placeholder adatok (maradnak)
const testimonials = [
  { id: 1, name: "Nagy Károly", company: "Tech Kft.", quote: "Profi csapat, naprakész tudással. Az audit után sokkal nyugodtabban alszom. Maximálisan elégedett vagyok.", rating: 5 },
  { id: 2, name: "Kiss Éva", company: "Kis Bolt Bt.", quote: "Az oktatásuk érthető és gyakorlatias volt, a munkatársaim is pozitívan értékelték. Rugalmasak és segítőkészek.", rating: 5 },
  { id: 3, name: "Szabó Zoltán", company: "Gyártó Zrt.", quote: "Gyorsan és precízen elkészítették a hiányzó szabályzatainkat. A hatósági ellenőrzésen minden rendben volt.", rating: 4 },
  { id: 4, name: "Horváth Mária", company: "Szolgáltató Centrum", quote: "A kockázatértékelésük rendkívül alapos volt, olyan dolgokra is felhívták a figyelmünket, amikre nem is gondoltunk.", rating: 5 },
  { id: 5, name: "Fehér Petra", company: "Innovatív Zrt.", quote: "Modern szemlélet, kiváló szakértelem. Mindenkinek csak ajánlani tudom őket, aki komolyan veszi a biztonságot.", rating: 5 },
  { id: 6, name: "Kovács István", company: "Építőipari Kft.", quote: "Már több projekten dolgoztunk együtt, mindig megbízható és profi partnerek voltak. Köszönjük a munkájukat!", rating: 5 },
];

// Külön komponens egy véleménykártyához
interface TestimonialCardProps {
  testimonial: typeof testimonials[0];
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ testimonial }) => {
  return (
    <div className="h-full bg-white rounded-2xl shadow-xl p-8 flex flex-col justify-between border border-gray-100 overflow-hidden">
      <div className="relative z-10 text-center flex flex-col flex-grow">
        <ChatBubbleLeftRightIcon className="absolute -top-2 -left-2 w-14 h-14 sm:w-16 sm:h-16 text-amber-100 opacity-70" />
        <div className="relative flex-grow flex flex-col">
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`w-5 h-5 ${i < (testimonial.rating || 0) ? 'text-amber-400' : 'text-gray-300'}`} />
            ))}
          </div>
          <p className="text-base italic text-gray-700 mb-5 leading-relaxed flex-grow min-h-[100px] sm:min-h-[120px]">
            "{testimonial.quote}"
          </p>
          <div className="mt-auto">
            <p className="font-semibold text-base text-gray-900">{testimonial.name}</p>
            <p className="text-xs text-gray-500">{testimonial.company}</p>
          </div>
        </div>
      </div>
    </div>
  );
};


const TestimonialSlider: React.FC = () => {
  if (!testimonials || testimonials.length === 0) {
    return <section className="py-16 lg:py-20 bg-stone-100"><p className="text-center text-gray-500">Nincsenek megjeleníthető vélemények.</p></section>;
  }

  let extendedTestimonials = [...testimonials, ...testimonials];
  // Biztosítjuk, hogy a sor elég hosszú legyen a zökkenőmentes hatáshoz, különösen ha kevés az eredeti elem
  // és több mint 3-at akarunk egyszerre megjeleníteni (bár most 3 a cél).
  // Ez a logika biztosítja, hogy a duplikált sor legalább kétszer olyan hosszú legyen, mint az eredeti,
  // és elegendő elemet tartalmazzon a folyamatos gördítéshez.
  if (testimonials.length > 0) { // Csak akkor fussunk le, ha vannak testimonialok
    const minItemsForSeamlessLoop = Math.max(6, testimonials.length * 2); // Legalább 6 elem, vagy az eredeti kétszerese
    while (extendedTestimonials.length < minItemsForSeamlessLoop) {
        extendedTestimonials = [...extendedTestimonials, ...testimonials];
    }
  }


  // Animáció időtartama: Minden "eredeti" vélemény kb. 4 másodpercig tart, mire teljesen átgördül (kétszer gyorsabb)
  const singleSetDuration = testimonials.length * 4; // 4 másodperc / elem

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-stone-50 via-amber-50 to-stone-100 overflow-hidden">
      <div className="container mx-auto"> {/* Ez adja az alapvető margót a képernyő szélétől */}
        <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 text-center mb-12 lg:mb-16 tracking-tight">
          Mit Mondanak Rólunk Ügyfeleink?
        </h2>

        {/* A véleménygördítő konténere. 
          A max-w-6xl (vagy más érték) és az mx-auto biztosítja,
          hogy a gördítő sáv ne érjen ki a container széléig, így nagyobb lesz a rés.
        */}
        <div className="max-w-6xl mx-auto overflow-hidden"> {/* MÓDOSÍTÁS: Szélesség korlátozása */}
          <motion.div
            className="flex"
            animate={{ x: ["0%", `-${400 * (testimonials.length / extendedTestimonials.length)}%`] }}
            transition={{
              ease: "linear",
              duration: singleSetDuration, // MÓDOSÍTÁS: Gyorsabb animáció
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            {extendedTestimonials.map((testimonial, index) => (
              <div key={testimonial.id + '-' + index} className="flex-shrink-0 w-full sm:w-1/2 md:basis-1/3 p-2 sm:p-3"> {/* md:basis-1/3 a három oszlopos nézethez */}
                <div className="h-full">
                    <TestimonialCard testimonial={testimonial} />
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