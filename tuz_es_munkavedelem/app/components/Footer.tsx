// components/Footer.tsx
'use client';

import React, { useState } from 'react';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  SparklesIcon,
  ChevronDownIcon, // Importálva az ikon a lenyíló menühöz
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

// --- Lenyíló menü segédkomponens ---
interface AccordionItemProps {
  title: string;
  links: { href: string; label: string }[];
  isOpen: boolean;
  toggle: () => void;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, links, isOpen, toggle }) => (
  <div className="border-b border-slate-700/50">
    <button
      onClick={toggle}
      className="flex justify-between items-center w-full py-3 text-left hover:text-white transition-colors duration-200"
    >
      <span>{title}</span>
      <ChevronDownIcon
        className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
      />
    </button>
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isOpen ? 'max-h-96' : 'max-h-0'
      }`}
    >
      <ul className="pt-2 pb-3 pl-4 space-y-3">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="hover:text-white transition-colors duration-200 block">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  </div>
);


// --- FŐ KOMPONENS ---
const Footer: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);

  const toggleAccordion = (accordionName: string) => {
    setOpenAccordion(openAccordion === accordionName ? null : accordionName);
  };
  
  return (
    <>
      <style>{`
        .footer-grid-pattern {
            background-image: linear-gradient(${accentColor.gridLines} 1px, transparent 1px),
                              linear-gradient(to right, ${accentColor.gridLines} 1px, transparent 1px);
            background-size: 3.5rem 3.5rem;
        }
        .text-gradient {
            background: linear-gradient(to right, ${accentColor.base}, #ffffff);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
        }
      `}</style>
      <footer
        className={`relative ${accentColor.darkBg} text-slate-300 py-16 sm:py-20 font-['Poppins',_sans-serif] overflow-hidden`}
      >
        {/* Háttér rács */}
        <div className="absolute inset-0 footer-grid-pattern z-0 opacity-20"></div>
        
        <div className="absolute top-8 right-8 lg:top-12 lg:right-12 w-24 h-24 lg:w-32 lg:h-32 text-cyan-400/10 hidden md:block">
             <ShieldCheckIcon className="w-full h-full" />
        </div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 sm:gap-y-16 gap-x-12">
            
            {/* Cég Logó és Rövid Leírás */}
            <div className="md:col-span-2 lg:col-span-1">
              <Link href="/" className="font-bold text-3xl tracking-wider mb-4 block text-gradient">
                  TűzÉsMunka<span className="text-white">védelem</span>
              </Link>
              <p className="text-base text-slate-400 leading-relaxed max-w-xs sm:max-w-none">
                Szakértő megoldások tűz- és munkavédelemben. Gondoskodunk a biztonságról, hogy Ön a növekedésre fókuszálhasson.
              </p>
            </div>

            {/* Gyorslinkek */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <BookOpenIcon className={`w-6 h-6 mr-3 ${accentColor.text}`} />
                Gyorslinkek
              </h3>
              <ul className="space-y-3 text-slate-400 text-base">
                <li><Link href="/bemutatkozas" className="hover:text-white transition-colors duration-200">Bemutatkozás</Link></li>
                <li><Link href="/szolgaltatasok" className="hover:text-white transition-colors duration-200">Szolgáltatások</Link></li>
                <li><Link href="/folyamat" className="hover:text-white transition-colors duration-200">Folyamatunk</Link></li>
                <li><Link href="/eredmenyek" className="hover:text-white transition-colors duration-200">Eredmények</Link></li>
                <li><Link href="/gyik" className="hover:text-white transition-colors duration-200">GYIK</Link></li>
                <li><Link href="/kapcsolat" className="hover:text-white transition-colors duration-200">Kapcsolat</Link></li>
              </ul>
            </div>

            {/* Szolgáltatások kiemelése (FRISSÍTVE) */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <ShieldCheckIcon className={`w-6 h-6 mr-3 ${accentColor.text}`} />
                Kiemelt Szolgáltatások
              </h3>
              <div className="text-slate-400 text-base">
                <AccordionItem
                  title="Munkavédelem"
                  isOpen={openAccordion === 'munkavedelem'}
                  toggle={() => toggleAccordion('munkavedelem')}
                  links={[
                    { href: '/szolgaltatasok/kockazatertekeles', label: 'Kockázatértékelés' },
                    { href: '/szolgaltatasok/munkavedelmi-szabalyzat', label: 'Munkavédelmi Szabályzat' },
                    { href: '/szolgaltatasok/munkavedelmi-oktatas', label: 'Munkavédelmi Oktatás' },
                    { href: '/szolgaltatasok/munkahelyi-baleset-kivizsgalas', label: 'Munkahelyi baleset kivizsgálás' },
                  ]}
                />
                <AccordionItem
                  title="Tűzvédelem"
                  isOpen={openAccordion === 'tuzvedelem'}
                  toggle={() => toggleAccordion('tuzvedelem')}
                  links={[
                    { href: '/szolgaltatasok/tuzvedelmi-szabalyzat', label: 'Tűzvédelmi Szabályzat' },
                    { href: '/szolgaltatasok/kiurites-szamitas', label: 'Kiürítés Számítás' },
                    { href: '/szolgaltatasok/tuzvedelmi-oktatas', label: 'Tűzvédelmi Oktatás' },
                  ]}
                />
                 <div className="border-b border-slate-700/50">
                   <Link href="/HaccpPage" className="hover:text-white transition-colors duration-200 flex py-3">HACCP</Link>
                 </div>
                 <div className="border-b border-slate-700/50">
                    <Link href="/szolgaltatasok/villamos-biztonsagi-felulvizsgalat" className="hover:text-white transition-colors duration-200 block py-3">
                        Villamos Biztonsági Felülvizsgálat (VBF)
                    </Link>
                 </div>
              </div>
            </div>

            {/* Kapcsolat Infók és CTA */}
            <div>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <PhoneIcon className={`w-6 h-6 mr-3 ${accentColor.text}`} />
                Kapcsolat
              </h3>
              <address className="not-italic space-y-3 text-slate-400 text-base mb-8">
                <a 
                    href="mailto:info@markjani.hu" 
                    className="flex items-center p-2 -ml-2 rounded-lg transition-colors duration-200 hover:bg-white/5 hover:text-white"
                >
                  <EnvelopeIcon className="w-5 h-5 mr-3 text-cyan-400" />
                  <span>info@markjani.hu</span>
                </a>
                <a 
                    href="tel:+36209791719"
                    className="flex items-center p-2 -ml-2 rounded-lg transition-colors duration-200 hover:bg-white/5 hover:text-white"
                >
                  <PhoneIcon className="w-5 h-5 mr-3 text-cyan-400" />
                  <span className="whitespace-nowrap">+36 20 979 17 19</span>
                </a>
                <div className="flex items-start p-2 -ml-2">
                  <MapPinIcon className="w-5 h-5 mr-3 mt-1 text-cyan-400 flex-shrink-0" />
                  <span>4031 Debrecen, István út 140.</span>
                </div>
                <div className="flex items-center p-2 -ml-2">
                  <BuildingOfficeIcon className="w-5 h-5 mr-3 text-cyan-400" />
                  <span>JaniMark Kft.</span>
                </div>
              </address>

              <div className="mt-8">
                 <Link href="/#ajanlatkeres">
                    <button
                        className={`
                            relative inline-flex items-center justify-center w-full
                            ${accentColor.gradient} text-white
                            font-bold py-3 px-8 rounded-xl text-lg
                            shadow-inner shadow-black/20
                            transition-all duration-300 ease-in-out
                            focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900
                            hover:shadow-xl hover:shadow-cyan-500/40
                        `}
                    >
                        <SparklesIcon className="w-6 h-6 mr-3 text-yellow-300" />
                        Ingyenes Ajánlatkérés
                    </button>
                 </Link>
              </div>
            </div>
          </div>

          <div
            className="border-t border-slate-700/60 pt-8 mt-12 text-center text-xs text-slate-500"
          >
            <p>&copy; {new Date().getFullYear()} JaniMark Kft. Minden jog fenntartva.</p>
            <div className="mt-2 flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-4">
              <Link href="/adatvedelmi-nyilatkozat" className="hover:text-white transition-colors duration-200">Adatvédelmi Nyilatkozat</Link>
              <Link href="/aszf" className="hover:text-white transition-colors duration-200">Általános Szerződési Feltételek</Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;