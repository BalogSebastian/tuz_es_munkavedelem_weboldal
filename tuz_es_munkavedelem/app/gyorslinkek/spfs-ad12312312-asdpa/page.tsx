'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  UsersIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

// Egyedi, műszaki jellegű színséma
const accentColor = {
  text: 'text-cyan-500',
  bg: 'bg-cyan-500',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  border: 'border-cyan-500',
  lightBg: 'bg-slate-100',
  darkText: 'text-slate-800',
  lightText: 'text-slate-600',
  gridLines: 'border-slate-200',
  warningText: 'text-red-700',
  warningBg: 'bg-red-50',
  warningBorder: 'border-red-400'
};

// Gomb stílusdefiníciók
const ACCENT_COLOR_RED = {
    baseHex: '#DC2626',
    bg: 'bg-red-600',
    textOnAccent: 'text-white',
    ring: 'focus-visible:ring-red-500',
    shadow: 'shadow-red-500/40',
    hoverShadow: 'hover:shadow-red-400/60',
};

const KiuritesSzamitasPage = () => {
  const router = useRouter();
  const strongClass = "font-bold text-slate-900"; // A kiemelések stílusa

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&family=Roboto+Mono:wght@500&display=swap');
        .font-roboto-mono {
          font-family: 'Roboto Mono', monospace;
        }
      `}</style>

      <div className={`min-h-screen bg-white font-['Poppins',_sans_serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8`}>
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
        <div className="absolute inset-0 z-0 opacity-50" style={{
          backgroundImage: `linear-gradient(${accentColor.gridLines} 1px, transparent 1px), linear-gradient(to right, ${accentColor.gridLines} 1px, transparent 1px)`,
          backgroundSize: '3rem 3rem',
        }}></div>

        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-lg shadow-2xl p-4 sm:p-8 lg:p-12 relative z-10 border border-slate-200">
          
          {/* Címsor szekció */}
          <div className="text-center mb-12 border-b border-slate-200 pb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 ">
              Kiürítési <span className={accentColor.text}>Számítás</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-600 max-w-4xl mx-auto">
            A <strong>kiürítési számítás</strong> nem csupán egy dokumentum, hanem az épület biztonságának tudományos alapja. Ez az elemzés azt igazolja, hogy vészhelyzet esetén mindenki időben és biztonságosan tudja elhagyni az épületet. A számítás során figyelembe vesszük az épület méretét, elrendezését, a bent tartózkodók számát és a menekülési útvonalak kapacitását. Ezáltal pontosan meghatározzuk a maximálisan megengedett kiürítési időt, ami elengedhetetlen a biztonságos működéshez és a jogszabályoknak való megfeleléshez.
            </p>
          </div>
          
          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">Miből áll egy teljes körű kiürítési számítás?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg border border-slate-200"><div className={`mb-3 w-fit p-3 rounded-md ${accentColor.lightBg} ${accentColor.text}`}><UsersIcon className="w-6 h-6"/></div><h4 className="font-bold mb-1"><strong className={strongClass}>Terhelés meghatározása</strong></h4><p className="text-sm text-slate-600">Megállapítjuk az épületben egyidejűleg tartózkodó személyek maximális számát a helyiség funkciója alapján.</p></div>
                <div className="bg-white p-6 rounded-lg border border-slate-200"><div className={`mb-3 w-fit p-3 rounded-md ${accentColor.lightBg} ${accentColor.text}`}><ArrowTrendingUpIcon className="w-6 h-6"/></div><h4 className="font-bold mb-1"><strong className={strongClass}>Menekülési útvonalak kapacitása</strong></h4><p className="text-sm text-slate-600">Elemezzük a menekülési útvonalak (folyosók, ajtók, lépcsők) szélességét, hosszát és kapacitását a hatályos szabványok szerint.</p></div>
                <div className="bg-white p-6 rounded-lg border border-slate-200"><div className={`mb-3 w-fit p-3 rounded-md ${accentColor.lightBg} ${accentColor.text}`}><ClockIcon className="w-6 h-6"/></div><h4 className="font-bold mb-1"><strong className={strongClass}>Kiürítési idő elemzése</strong></h4><p className="text-sm text-slate-600">Kiszámoljuk, mennyi idő alatt tud eljutni a leghosszabb menekülési útvonalon lévő személy a gyűjtőhelyre.</p></div>
                <div className="bg-white p-6 rounded-lg border border-slate-200"><div className={`mb-3 w-fit p-3 rounded-md ${accentColor.lightBg} ${accentColor.text}`}><LightBulbIcon className="w-6 h-6"/></div><h4 className="font-bold mb-1"><strong className={strongClass}>Javaslatok és intézkedések</strong></h4><p className="text-sm text-slate-600">Amennyiben a számítás hiányosságokat mutat, javaslatot teszünk a szükséges műszaki és szervezési intézkedésekre.</p></div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">Mi a jogi kötelezettség?</h2>
            <div className={`p-4 sm:p-8 rounded-lg border ${accentColor.warningBorder} ${accentColor.warningBg}`}>
                <p className={`mb-4 text-sm sm:text-base ${accentColor.warningText}`}>
                A kiürítési számítás szükségességét és követelményeit a <strong className={strongClass}>2011. évi CXXVIII. törvény a tűz elleni védekezésről</strong> és az <strong className={strongClass}>54/2014. (XII. 5.) BM rendelet</strong> írják elő. A számítás elkészítése kötelező új épületek tervezésekor, felújításkor vagy funkcióváltás esetén.
                </p>
                <h4 className="font-bold text-lg mb-3 text-slate-800">A számítás hiánya vagy hibás tartalma súlyos következményekkel járhat:</h4>
                <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-slate-700">
                    <li><strong className={strongClass}>Hatósági elutasítás:</strong> A tűzvédelmi hatóság elutasíthatja a tervet, ami késlelteti az építési vagy működési engedélyt.</li>
                    <li><strong className={strongClass}>Pénzbírság:</strong> A hatóság jelentős bírságot szabhat ki a hiányzó dokumentáció miatt.</li>
                    <li><strong className={strongClass}>Balesetveszély:</strong> A legfontosabb, hogy egy vészhelyzetben a rosszul méretezett menekülési útvonalak és a hosszú kiürítési idő emberéletet veszélyeztethet.</li>
                </ul>
            </div>
          </section>
          
            {/* --- CTA SZEKCIÓ --- */}
            <div className="text-center mt-12 mb-8 p-4 sm:p-8">
                <p className="text-sm sm:text-lg text-slate-600 max-w-2xl mx-auto mb-8">
                Számolj a biztonsággal! Keress minket egy ingyenes konzultációért, és segítünk elkészíteni a telephelyed kiürítés számítását.
                </p>
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
    </>
  );
};

export default KiuritesSzamitasPage;