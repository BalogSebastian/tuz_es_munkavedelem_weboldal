// components/Footer.tsx
'use client';

import React, { useRef } from 'react';
import { motion, Variants } from 'framer-motion';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  SparklesIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// --- SZÍNPALETTA ÉS KONSTANSOK ---
const accentColor = {
  base: '#03BABE',
  baseRgb: '3, 186, 190',
  bg: 'bg-[#03BABE]',
  hoverBg: 'hover:bg-cyan-600',
  text: 'text-[#03BABE]',
  lightText: 'text-cyan-200',
  darkBg: 'bg-slate-900',
  gradient: 'bg-gradient-to-r from-cyan-400 to-teal-500',
  gridLines: 'rgba(3, 186, 190, 0.08)',
  contactHoverBg: 'bg-white/5',
};

// --- GLOBÁLIS ANIMÁCIÓS VARIÁNSOK ---
const footerVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.85, 0.45, 1],
      staggerChildren: 0.15,
    },
  },
};

const sectionItemVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const linkItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};


// --- FŐ KOMPONENS ---
const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  
  // OPTIMALIZÁLÁS: A canvas animáció és a hozzá tartozó hook teljesen eltávolítva.

  return (
    <>
      <style>{`
        .footer-grid-pattern {
            background-image: linear-gradient(${accentColor.gridLines} 1px, transparent 1px),
                              linear-gradient(to right, ${accentColor.gridLines} 1px, transparent 1px);
            background-size: 3.5rem 3.5rem;
        }
        .text-gradient {
            background: linear-gradient(to right, ${accentColor.lightText}, ${accentColor.base});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
        }
      `}</style>
      <motion.footer
        ref={footerRef}
        className={`relative ${accentColor.darkBg} text-slate-300 py-16 sm:py-20 font-['Poppins',_sans-serif] overflow-hidden`}
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Háttér rács - ez egy performáns, statikus megoldás */}
        <div className="absolute inset-0 footer-grid-pattern z-0 opacity-20"></div>
        
        {/* OPTIMALIZÁLÁS: A lebegő, pulzáló és canvas-alapú effektek eltávolítva a jobb teljesítményért. */}
        
        {/* Statikus díszítőelem (korábban animált volt) */}
        <div className="absolute top-8 right-8 lg:top-12 lg:right-12 w-24 h-24 lg:w-32 lg:h-32 text-cyan-400/10 hidden md:block">
             <ShieldCheckIcon className="w-full h-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 sm:gap-y-16 gap-x-12">
            
            {/* Cég Logó és Rövid Leírás */}
            <motion.div className="md:col-span-2 lg:col-span-1" variants={sectionItemVariants}>
              {/* OPTIMALIZÁLÁS: A logó animációja leegyszerűsítve, de a kinézet megmaradt. */}
              <Link href="/" className="font-bold text-3xl tracking-wider mb-4 block text-gradient">
                <span className={accentColor.lightText}>Tűz</span>
                <span className="text-white mx-0.5">És</span>
                <span className={accentColor.lightText}>Munka</span>
                <span className="text-white">védelem</span>
              </Link>
              <p className="text-base text-slate-400 leading-relaxed max-w-xs sm:max-w-none">
                Szakértő megoldások tűz- és munkavédelemben. Gondoskodunk a biztonságról, hogy Ön a növekedésre fókuszálhasson.
              </p>
            </motion.div>

            {/* Gyorslinkek */}
            <motion.div variants={sectionItemVariants}>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <BookOpenIcon className={`w-6 h-6 mr-3 ${accentColor.text}`} />
                Gyorslinkek
              </h3>
              <ul className="space-y-3 text-slate-400 text-base">
                <motion.li variants={linkItemVariants}><Link href="/bemutatkozas" className="hover:text-white transition-colors duration-200">Bemutatkozás</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/szolgaltatasok" className="hover:text-white transition-colors duration-200">Szolgáltatások</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/folyamat" className="hover:text-white transition-colors duration-200">Folyamatunk</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/eredmenyek" className="hover:text-white transition-colors duration-200">Eredmények</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/gyik" className="hover:text-white transition-colors duration-200">GYIK</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/kapcsolat" className="hover:text-white transition-colors duration-200">Kapcsolat</Link></motion.li>
              </ul>
            </motion.div>

            {/* Szolgáltatások kiemelése */}
            <motion.div variants={sectionItemVariants}>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <ShieldCheckIcon className={`w-6 h-6 mr-3 ${accentColor.text}`} />
                Kiemelt Szolgáltatások
              </h3>
              <ul className="space-y-3 text-slate-400 text-base">
                <motion.li variants={linkItemVariants}><Link href="/KockazatErtekelesPage" className="hover:text-white transition-colors duration-200">Kockázatértékelés</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/MunkavedelemPage" className="hover:text-white transition-colors duration-200">Munkavédelem</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/TuzvedelemPage" className="hover:text-white transition-colors duration-200">Tűzvédelem</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/HaccpPage" className="hover:text-white transition-colors duration-200">HACCP Rendszer</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/OktatasokPage" className="hover:text-white transition-colors duration-200">Oktatások</Link></motion.li>
              </ul>
            </motion.div>

            {/* Kapcsolat Infók és CTA */}
            <motion.div variants={sectionItemVariants}>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <PhoneIcon className={`w-6 h-6 mr-3 ${accentColor.text}`} />
                Kapcsolat
              </h3>
              <address className="not-italic space-y-3 text-slate-400 text-base mb-8">
                <motion.a 
                    href="mailto:info@markjani.hu" 
                    className="flex items-center p-2 -ml-2 rounded-lg transition-colors duration-200 hover:bg-white/5 hover:text-white"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                  <EnvelopeIcon className="w-5 h-5 mr-3 text-cyan-400" />
                  <span>info@markjani.hu</span>
                </motion.a>
                <motion.a 
                    href="tel:+36209791719"
                    className="flex items-center p-2 -ml-2 rounded-lg transition-colors duration-200 hover:bg-white/5 hover:text-white"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                >
                  <PhoneIcon className="w-5 h-5 mr-3 text-cyan-400" />
                  <span className="whitespace-nowrap">+36 20 979 17 19</span>
                </motion.a>
                <div className="flex items-start p-2 -ml-2">
                  <MapPinIcon className="w-5 h-5 mr-3 mt-1 text-cyan-400 flex-shrink-0" />
                  <span>4031 Debrecen, István út 140.</span>
                </div>
                <div className="flex items-center p-2 -ml-2">
                  <BuildingOfficeIcon className="w-5 h-5 mr-3 text-cyan-400" />
                  <span>JaniMark Kft.</span>
                </div>
              </address>

              {/* OPTIMALIZÁLÁS: A folyamatosan futó glow animáció eltávolítva a gombról. */}
              <motion.div
                className="mt-8"
                whileHover={{ scale: 1.03 }}
              >
                 <Link href="/#ajanlatkeres">
                    <motion.button
                        className={`
                            relative inline-flex items-center justify-center w-full
                            ${accentColor.gradient} text-white
                            font-bold py-3 px-8 rounded-xl text-lg
                            shadow-inner shadow-black/20
                            transition-all duration-300 ease-in-out
                            focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900
                            hover:shadow-xl hover:shadow-cyan-500/40
                        `}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98, y: 0 }}
                    >
                        <SparklesIcon className="w-6 h-6 mr-3 text-yellow-300" />
                        Ingyenes Ajánlatkérés
                    </motion.button>
                 </Link>
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            className="border-t border-slate-700/60 pt-8 mt-12 text-center text-xs text-slate-500"
            variants={sectionItemVariants}
          >
            <p>&copy; {new Date().getFullYear()} JaniMark Kft. Minden jog fenntartva.</p>
            <div className="mt-2 flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-4">
              <Link href="/adatvedelmi-nyilatkozat" className="hover:text-white transition-colors duration-200">Adatvédelmi Nyilatkozat</Link>
              <Link href="/aszf" className="hover:text-white transition-colors duration-200">Általános Szerződési Feltételek</Link>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;