// app/components/HeaderHero.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // AnimatePresence nem volt használva, eltávolítottam
import { ArrowRightIcon } from '@heroicons/react/24/outline';

// Brand színek és stílusok
const accentColor = {
  baseHex: '#DD520F',
  bg: 'bg-[#DD520F]',
  textOnAccent: 'text-white',
  hoverBg: 'hover:bg-orange-700',
  ring: 'focus:ring-orange-500',
  textDark: 'text-orange-700', // Narancs szöveg világos alapon (pl. fehér gombon)
};

// Szöveg animációhoz variánsok
const sentenceVariants = {
  hidden: { opacity: 0 },
  visible: (i: number = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: i * 0.2 }, // Finomított időzítés
  }),
};

const wordVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring', stiffness: 100, damping: 13 },
  },
};

// Lebegő dekoratív elemekhez variánsok
const floatingElementVariants = {
  float: (i: number) => ({
    y: [0, Math.random() * 12 - 6, 0],
    x: [0, Math.random() * 10 - 5, 0],
    rotate: [0, Math.random() * 12 - 6, 0],
    scale: [1, 1 + Math.random() * 0.1, 1], // Finom skálázódás
    opacity: [0.05 + Math.random() * 0.05, 0.1 + Math.random() * 0.1, 0.05 + Math.random() * 0.05], // Finom opacitás pulzálás
    transition: {
      duration: 6 + Math.random() * 6,
      repeat: Infinity,
      repeatType: "mirror" as const,
      ease: "easeInOut",
      delay: i * 0.7,
    },
  }),
};

// Típus a lebegő elemek stílusához
interface FloatingStyle extends React.CSSProperties {}

const HeaderHero = () => {
  // FRISSÍTETT FŐCÍM a tűz- és munkavédelmi témához
  const mainHeadline = "Profi Tűz- és Munkavédelem: Elkerülhető Bírságok, Biztonságos Működés, Nyugodt Vezetés!";
  const mainHeadlineWords = mainHeadline.split(" ");

  const [floatingStyles, setFloatingStyles] = useState<FloatingStyle[]>([]);

  useEffect(() => {
    const styles: FloatingStyle[] = [...Array(4)].map(() => ({ // Növeltük a lebegő elemek számát 4-re
      width: `${40 + Math.random() * 80}px`,
      height: `${40 + Math.random() * 80}px`,
      backgroundColor: `rgba(255, 255, 255, ${0.03 + Math.random() * 0.07})`, // Még finomabb áttetszőség
      top: `${5 + Math.random() * 90}%`, // Teljesebb magasság kihasználása
      left: `${5 + Math.random() * 90}%`, // Teljesebb szélesség kihasználása
    }));
    setFloatingStyles(styles);
  }, []);

  // Dinamikus késleltetések kiszámítása a főcím hossza alapján
  const headlineAnimationDelay = 0.2; // Kezdeti késleltetés a P1 után
  const headlineDurationEstimate = headlineAnimationDelay + mainHeadlineWords.length * 0.08 + 0.5; // Becsült idő, mire a H1 megjelenik

  return (
    <div className="min-h-[85vh] sm:min-h-[75vh] w-screen flex flex-col text-white antialiased relative overflow-hidden">
      {/* Felső sáv */}
      <div className={`bg-black text-white py-3 px-4 sm:px-6 flex items-center text-xs sm:text-sm shadow-md z-20`}>
        <div className="flex-1"></div>
        <div className="text-center">
          <div className="flex items-center justify-center flex-wrap space-x-2 sm:space-x-3 font-medium">
            <span className="whitespace-nowrap">Ügyfélszolgálat:</span>
            <a href="mailto:info@meggyesrev.hu" className="hover:underline">info@meggyesrev.hu</a>
            <a href="tel:+36209791719" className="hover:underline whitespace-nowrap">+36 20 979 17 19</a>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <motion.button
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className={`
                ${accentColor.bg} ${accentColor.hoverBg} ${accentColor.textOnAccent}
                font-bold py-2 px-4 rounded-lg text-xs sm:text-sm
                transition duration-300 ease-in-out
                focus:outline-none focus:ring-2 ${accentColor.ring} focus:ring-opacity-50
             `}
          >
            Ajánlatot kérek
          </motion.button>
        </div>
      </div>

      {/* Fő narancssárga tartalom terület */}
      <div className={`flex-grow flex flex-col items-center justify-center ${accentColor.bg} p-4 sm:p-8 text-center relative`}>
        <motion.div
          className="absolute inset-0 opacity-10 z-0"
          style={{
            backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.05) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.05) 75%, transparent 75%, transparent), linear-gradient(-45deg, rgba(255,255,255,0.03) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.03) 50%, rgba(255,255,255,0.03) 75%, transparent 75%, transparent)`,
            backgroundSize: '80px 80px', // Nagyobb minta
          }}
          animate={{ backgroundPosition: ['0% 0%', '160px 80px'] }} // Kettős annyi elmozdulás
          transition={{ duration: 25, ease: 'linear', repeat: Infinity, repeatType: 'loop' }}
        />
        
        {floatingStyles.length > 0 && floatingStyles.map((style, i) => (
          <motion.div
            key={`float-${i}`}
            className="absolute rounded-full z-0" // Opacity mostantól a style-ban van
            style={{...style, opacity: 0.03 + Math.random() * 0.07}} // Egyedi opacitás itt, hogy ne legyen a className-ben fixen 0.1
            variants={floatingElementVariants}
            animate="float"
            custom={i}
          />
        ))}

        <div className="max-w-3xl relative z-10">
          {/* ÚJ P1 SZÖVEG */}
          <motion.p 
            className="mb-6 text-lg sm:text-xl text-orange-100"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Éjszaka is nyugodtan aludna? Vagy a munkahelyi kockázatok és a közelgő ellenőrzés miatt fő a feje?
          </motion.p>
          
          {/* ÚJ H1 SZÖVEG */}
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 leading-tight text-white"
            variants={sentenceVariants}
            initial="hidden"
            animate="visible"
            custom={headlineAnimationDelay} // Átadva a késleltetés
          >
            {mainHeadlineWords.map((word, index) => (
              <motion.span key={index} className="inline-block mr-[0.2em]" variants={wordVariants}>
                {word}
              </motion.span>
            ))}
          </motion.h1>

          {/* ÚJ P2 SZÖVEG */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl mb-10 text-orange-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: headlineDurationEstimate }}
          >
            Levesszük válláról a tűz- és munkavédelem komplex terheit! Teljes körű megoldásainkkal – a kockázatértékeléstől az oktatásokon át a teljes dokumentációig – biztosítjuk cége jogszabályi megfelelőségét, hogy Ön nyugodtan a növekedésre koncentrálhasson.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: headlineDurationEstimate + 0.2 }}
            className="space-y-6 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row justify-center items-center mb-10"
          >
            <motion.button
              whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255,255,255,0.25)" }} // Erősebb boxShadow
              whileTap={{ scale: 0.95 }}
              className={`bg-white hover:bg-gray-50 ${accentColor.textDark} font-semibold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-opacity-75`}
            >
              MIRŐL VAN SZÓ?
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0px 0px 20px rgba(255,255,255,0.2)" }}
                whileTap={{ scale: 0.95 }}
                className={`bg-black hover:bg-gray-800 text-white font-semibold py-3 px-8 rounded-lg text-lg shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-75`}
            >
                Megengeded hogy segítsünk?
            </motion.button>
          </motion.div>
          
          <motion.p 
            className="text-base sm:text-lg text-orange-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: headlineDurationEstimate + 0.4 }}
          >
            'Kíváncsi vagy hogy milyen Tűz és Munkavédelmi előírásoknak kell megfelelned? Segítek abban, hogy pontosan mit kérhetnek a szakhatóságok.'
          </motion.p>
        </div>
      </div>
    </div>
  );
};

export default HeaderHero;