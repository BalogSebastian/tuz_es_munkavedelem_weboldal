'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion'; // Hozzáadva
import {
  ArrowLeftIcon,
  BookOpenIcon,
  DocumentCheckIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  ComputerDesktopIcon, // Online oktatáshoz
  MapPinIcon // Helyszíni oktatáshoz
} from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid'; // Hozzáadva

// A meglévő, tűzvédelmi témájú színséma
const themeColors = {
  primary: {
    text: 'text-red-600',
    bg: 'bg-red-600',
    hoverBg: 'hover:bg-red-700',
    ring: 'focus:ring-red-500',
    border: 'border-red-500',
    lightBg: 'bg-red-100', // Világosabb piros háttér
    lightText: 'text-red-900',
  },
  secondary: {
    lightBg: 'bg-cyan-100', // A kék kiemeléshez
    border: 'border-cyan-500',
    lightText: 'text-cyan-900',
  },
  cta: { // A piros CTA gombhoz
    text: 'text-white',
    bg: 'bg-red-600',
    hoverBg: 'hover:bg-red-700',
    ring: 'focus:ring-red-500',
    gradientFrom: 'from-red-600',
    gradientTo: 'to-orange-500',
  },
  base: {
    pageBg: 'bg-slate-50',
    containerBg: 'bg-white',
    darkText: 'text-slate-900',
    lightText: 'text-slate-600',
    border: 'border-slate-200',
  }
};

// Gomb stílusdefiníciók (Hozzáadva)
const ACCENT_COLOR_RED = {
    baseHex: '#DC2626',
    bg: 'bg-red-600',
    textOnAccent: 'text-white',
    ring: 'focus-visible:ring-red-500',
    shadow: 'shadow-red-500/40',
    hoverShadow: 'hover:shadow-red-400/60',
};

const ServiceCard = ({ icon: Icon, title, content }: { icon: React.ElementType; title: string; content: React.ReactNode }) => (
    <div className={`${themeColors.base.containerBg} p-6 rounded-xl shadow-md border ${themeColors.base.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-red-200 h-full`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-lg ${themeColors.primary.lightBg} ${themeColors.primary.text} flex-shrink-0`}>
          <Icon className="w-7 h-7" />
        </div>
        <h3 className={`text-lg font-bold ${themeColors.base.darkText}`}>{title}</h3>
      </div>
      <div className={`${themeColors.base.lightText} leading-relaxed text-sm`}>{content}</div>
    </div>
);

const TuzvedelmiOktatasPage = () => {
  const router = useRouter();
  const strongClass = "font-bold text-slate-800"; // A strong tag stílusa

  return (
    <div className={`min-h-screen ${themeColors.base.pageBg} font-['Poppins',_sans_serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8`}>
        <style>{`
            .cta-button {
                transition: all 0.3s ease-in-out;
                box-shadow: 0 0 20px ${ACCENT_COLOR_RED.baseHex}40;
            }
            .cta-button:hover {
                transform: scale(1.02);
                box-shadow: 0 0 20px ${ACCENT_COLOR_RED.baseHex}60, 0 0 30px ${ACCENT_COLOR_RED.baseHex}40;
            }
            .cta-button:active {
                transform: scale(0.98);
            }
        `}</style>
      <div className={`max-w-6xl mx-auto ${themeColors.base.containerBg}/90 backdrop-blur-lg rounded-2xl shadow-2xl p-4 sm:p-8 lg:p-12 relative z-10 border ${themeColors.base.border}`}>
        

        {/* --- 1. KÉP TARTALMA: Bevezető --- */}
        <section className="text-center mb-16">
            <h1 className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold ${themeColors.base.darkText} mb-4`}>
              Tűzvédelmi <span className={themeColors.primary.text}>Oktatás</span>
            </h1>
            <p className={`text-base sm:text-lg ${themeColors.base.lightText} leading-relaxed max-w-4xl mx-auto`}>
              A tűzvédelmi oktatás a tűz- és munkavédelmi rendszer egyik alapvető, jogszabályi kötelezettségként elrendelt eleme, amelynek célja a tűzveszélyek megismerése, a megelőzés, valamint a vészhelyzetekben való helyes cselekvés biztosítása.
            </p>
        </section>

        {/* --- 1. KÉP TARTALMA: Jogi háttér és következmények --- */}
        <section className="mb-20">
            <h2 className={`text-2xl sm:text-3xl font-bold ${themeColors.base.darkText} mb-8 text-center`}>
                Jogi Háttér és Következmények
            </h2>
            <div className={`bg-slate-100/70 border ${themeColors.base.border} p-4 sm:p-8 rounded-xl space-y-6`}>
                <p className={themeColors.base.lightText}>
                    A tűzvédelmi oktatás kötelezettségét főként a <strong className={strongClass}>1996. évi XXXI. törvény</strong> a tűz elleni védekezésről, a műszaki mentésről és a tűzoltóságról, valamint a <strong className={strongClass}>101/2023. (XII. 29.) BM rendelet</strong> szabályozza.
                </p>
                
                <div className={`p-6 rounded-lg border-l-4 ${themeColors.secondary.border} ${themeColors.secondary.lightBg}`}>
                    <p className={`${themeColors.secondary.lightText} text-sm`}>A munkáltató köteles gondoskodni arról, hogy munkavállalói és a munkavégzésben résztvevő családtagjai a <strong className={strongClass}>munkakörükkel kapcsolatos tűzvédelmi ismereteket a foglalkoztatás megkezdése előtt megismerjék</strong>.</p>
                </div>

                <div className={`p-6 rounded-lg border-l-4 ${themeColors.primary.border} ${themeColors.primary.lightBg}`}>
                    <p className={`${themeColors.primary.lightText} mb-4 text-sm`}>Az új munkavállalókat a munkába állásukkor előzetes oktatásban kell részesíteni. Ennek elmulasztása esetén a munkáltató <strong className={strongClass}>1,5 millió forintig terjedő bírsággal sújtható, ha a munkavállaló belépése óta több mint 15 nap telt el</strong>.</p>
                    <p className={`${themeColors.primary.lightText} text-sm`}>A tűzvédelmi oktatás részletes szabályairól és tartalmi követelményeiről további információkat találsz a <strong className={strongClass}>101/2023. (XII. 29.) BM rendelet</strong>-ben, és a kapcsolódó katasztrófavédelmi irányelvekben.</p>
                </div>
            </div>
        </section>

        {/* --- 2. KÉP TARTALMA: Oktatás Nálunk --- */}
        <section className="mb-20">
            <h2 className={`text-2xl sm:text-3xl font-bold ${themeColors.base.darkText} mb-12 text-center`}>
                Tűzvédelmi oktatás nálunk
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <ServiceCard icon={ComputerDesktopIcon} title="Online oktató anyag" content="Rugalmas, online elérhető tananyagok, melyeket a munkavállalók a saját tempójukban végezhetnek el." />
                <ServiceCard icon={BookOpenIcon} title="Oktatási tematika" content="Személyre szabott tematikát állítunk össze, figyelembe véve a munkavállalók tevékenységi körét, hogy az oktatás releváns és jogszabályilag megfelelő legyen." />
                <ServiceCard icon={MapPinIcon} title="Helyszíni oktatás" content="Tapasztalt szakértőink a helyszínen tartanak gyakorlatias, interaktív képzéseket a maximális hatékonyság érdekében." />
                <ServiceCard icon={DocumentCheckIcon} title="Dokumentáció és Naplózás" content="Az oktatás végrehajtását hitelesen, oktatási naplóban rögzítjük, melyet a hatósági ellenőrzések során be kell mutatni." />
            </div>
        </section>

        {/* --- MÓDOSÍTOTT CTA SZEKCIÓ --- */}
        <div className="text-center mt-12 mb-8 p-4 sm:p-8">
            <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" target="_blank" rel="noopener noreferrer">
              <button
                className={`
                    inline-flex items-center justify-center gap-2
                    ${ACCENT_COLOR_RED.bg} ${ACCENT_COLOR_RED.textOnAccent}
                    font-bold py-8 px-10 sm:py-6 sm:px-10 lg:py-8 lg:px-12 rounded-xl text-2xl sm:text-xl lg:text-3xl
                    shadow-lg ${ACCENT_COLOR_RED.shadow} ${ACCENT_COLOR_RED.hoverShadow}
                    transition-all duration-300 ease-in-out
                    focus:outline-none focus:ring-4 ${ACCENT_COLOR_RED.ring} focus:ring-offset-2 focus:ring-offset-slate-50
                    cta-button
                `}
              >
                <span className="hidden sm:inline">Foglalj egy ingyenes konzultációt!</span>
                <span className="sm:hidden text-center leading-tight text-2xl">Ingyenes<br/>Konzultáció</span>
              </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default TuzvedelmiOktatasPage;