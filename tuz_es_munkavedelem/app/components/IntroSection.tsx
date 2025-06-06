// app/components/IntroSection.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FireIcon, ShieldCheckIcon as ShieldIconOutline } from '@heroicons/react/24/solid';
import Link from 'next/link';

// --- Egyedi, 3D hatású Pajzs SVG komponens ---
const RedShieldIcon = ({ className }: { className?: string }) => {
  return (
    <motion.div
        className={className}
        animate={{
            y: [-4, 4, -4],
            rotate: [-3, 3, -3],
        }}
        transition={{
            duration: 8,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut'
        }}
    >
        <svg viewBox="0 0 100 125" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g filter="url(#filter0_d_101_2)">
                <path d="M50 0L95 20V55C95 85 50 110 50 110C50 110 5 85 5 55V20L50 0Z" fill="#E53E3E"/>
                <path d="M50 0L5 20V55C5 85 50 110 50 110V0Z" fill="#C53030"/>
                <path d="M25 55L45 75L75 45" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round"/>
            </g>
            <defs>
                <filter id="filter0_d_101_2" x="0" y="0" width="100" height="125" filterUnits="userSpaceOnUse" colorInterpolationFilters="sRGB">
                    <feFlood floodOpacity="0" result="BackgroundImageFix"/>
                    <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
                    <feOffset dy="5"/>
                    <feGaussianBlur stdDeviation="5"/>
                    <feColorMatrix type="matrix" values="0 0 0 0 0.7729167 0 0 0 0 0.1875 0 0 0 0 0.1875 0 0 0 0.25 0"/>
                    <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_101_2"/>
                    <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_101_2" result="shape"/>
                </filter>
            </defs>
        </svg>
    </motion.div>
  );
};


// --- Színpaletta és animációs variánsok ---
const accentColor = {
  base: '#03BABE',
  bg: 'bg-[#03BABE]',
  text: 'text-[#03BABE]',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  shadow: 'shadow-cyan-500/40',
  hoverShadow: 'hover:shadow-cyan-400/60',
};
const sectionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.15, delayChildren: 0.2 } 
  },
};
const itemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(5px)' },
  visible: { 
    opacity: 1, 
    y: 0, 
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  },
};
const iconCardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.3 }
  },
};

const IntroSection: React.FC = () => {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
        .bg-grid-pattern {
            background-color: #f8fafc;
            background-image: 
                linear-gradient(rgba(3, 186, 190, 0.07) 1px, transparent 1px),
                linear-gradient(to right, rgba(3, 186, 190, 0.07) 1px, transparent 1px);
            background-size: 3rem 3rem;
        }
      `}</style>
      <motion.section 
        id="bemutatkozas" 
        className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 font-['Poppins',_sans-serif] bg-grid-pattern"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <motion.h2 
            className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-16 text-center"
            variants={itemVariants}
          >
            A Professzionális <span className={accentColor.text}>Biztonság</span> Alapjai
          </motion.h2>
          
          <motion.p variants={itemVariants} className="text-center text-lg lg:text-xl text-slate-600 max-w-3xl mb-16 leading-relaxed">
            Üdvözöljük! Célunk, hogy ne csak a jogszabályi útvesztőkben nyújtsunk biztos támaszt, hanem valódi értéket teremtsünk vállalkozása számára. Egy jól megtervezett tűz- és munkavédelmi rendszer a nyugodt, biztonságos és hatékony működésnek.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-16 w-full">
            
            <motion.div 
              variants={itemVariants} 
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-200/80 transition-all duration-300 hover:shadow-2xl"
            >
              {/* JAVÍTÁS: Most már itt is a pajzs ikon van */}
              <RedShieldIcon className="absolute w-24 h-24 -top-8 -right-8" />

              <motion.div variants={iconCardVariants} className="flex items-center gap-5 mb-5">
                <div className={`p-4 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500`}>
                  <FireIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Tűzvédelem</h3>
              </motion.div>
              <p className="text-slate-600 leading-relaxed">
                Több mint tűzoltó készülékek megléte; ez egy proaktív stratégia, ami a megelőzésre, a gyors reagálásra és a károk minimalizálására épül. A megfelelő eszközöktől a munkatársak felkészítéséig minden részlet számít.
              </p>
            </motion.div>

            <motion.div 
              variants={itemVariants} 
              whileHover={{ y: -8, scale: 1.03 }}
              className="relative bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-200/80 transition-all duration-300 hover:shadow-2xl"
            >
              <RedShieldIcon className="absolute w-24 h-24 -top-8 -right-8" />

              <motion.div variants={iconCardVariants} className="flex items-center gap-5 mb-5">
                <div className={`p-4 rounded-xl bg-gradient-to-br from-cyan-400 to-teal-500`}>
                  <ShieldIconOutline className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800">Munkavédelem</h3>
              </motion.div>
              <p className="text-slate-600 leading-relaxed">
                A legértékesebb erőforrás, az ember védelmét helyezi előtérbe. A kockázatok precíz felmérésével és tudatos munkakultúrával nemcsak a baleseteket előzzük meg, de növeljük a termelékenységet is.
              </p>
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="text-center mt-20">
            <p className="mb-6 text-lg text-slate-600">
              Fedezze fel, hogyan alakíthatjuk ki közösen az Ön vállalkozásának stabil alapját!
            </p>
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.98 }}>
                <Link 
                href="/#szolgaltatasok"
                className={`
                    inline-block ${accentColor.bg} ${accentColor.hoverBg} text-white
                    font-bold py-4 px-10 rounded-xl text-lg
                    shadow-lg ${accentColor.shadow} ${accentColor.hoverShadow}
                    transition-all duration-300 ease-in-out 
                    focus:outline-none focus:ring-4 ${accentColor.ring}
                `}
                >
                Szolgáltatásaink Megtekintése
                </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
};

export default IntroSection;