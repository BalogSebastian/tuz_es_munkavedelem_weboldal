'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  FireIcon,
  ScaleIcon,
  UsersIcon,
  BuildingOfficeIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';

// A sötét téma és a stílusok megmaradnak
const themeColors = {
  pageBg: 'bg-slate-900',
  containerBg: 'bg-slate-800/50',
  cardBg: 'bg-slate-800',
  border: 'border-slate-700',
  headingText: 'text-white',
  bodyText: 'text-slate-200',
  subtleText: 'text-slate-400',
  
  primary: {
    text: 'text-red-500',
    border: 'border-red-500',
    glow: 'shadow-red-500/30'
  },
  cta: {
    bg: 'bg-cyan-500',
    hoverBg: 'hover:bg-cyan-600',
    ring: 'focus:ring-cyan-500',
    text: 'text-white',
    glow: 'shadow-cyan-500/40',
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-teal-500'
  },
  warningBg: 'bg-red-900/30',
  warningText: 'text-red-200'
};

// A kártya komponens változatlan
const PillarCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
    <div className={`${themeColors.cardBg} backdrop-blur-sm p-8 rounded-2xl shadow-lg border ${themeColors.border} text-center flex flex-col items-center h-full transition-all duration-300 hover:border-red-500/50 hover:-translate-y-1`}>
      <div className={`p-4 rounded-full bg-red-500/10 ${themeColors.primary.text} mb-5`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className={`text-xl font-bold ${themeColors.headingText} mb-2`}>{title}</h3>
      <p className={`${themeColors.bodyText} leading-relaxed text-center flex-grow`}>{description}</p>
    </div>
);

const TuzvedelmiSzabalyzatPage = () => {
  const router = useRouter();
  const strongClass = "font-extrabold text-red-300";

  return (
    <div className={`min-h-screen ${themeColors.pageBg} font-['Poppins',_sans-serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8`}>
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(239, 68, 68, 0.05) 1px, transparent 1px), linear-gradient(to right, rgba(239, 68, 68, 0.05) 1px, transparent 1px)`,
        backgroundSize: '4rem 4rem',
      }}></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full filter blur-3xl animate-blob"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/10 rounded-full filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className={`max-w-6xl mx-auto ${themeColors.containerBg} backdrop-blur-xl rounded-2xl shadow-2xl p-8 sm:p-12 relative z-10 border ${themeColors.border}`}>
        

        {/* --- FRISSÍTETT TARTALOM: Bevezető --- */}
        <section className="text-center mb-16">
            <h1 className={`text-4xl sm:text-5xl font-extrabold ${themeColors.headingText} mb-4`}>
              Tűzvédelmi <span className={themeColors.primary.text}>Szabályzat</span>
            </h1>
            <div className={`text-lg sm:text-xl ${themeColors.bodyText} leading-relaxed max-w-4xl mx-auto space-y-4`}>
                <p>
                    A magyar tűzvédelmi jogszabályok értelmében a tűzvédelmi szabályzat kötelező elkészítésének kérdése főként a munkavállalók száma, a tevékenység jellege és az épület vagy létesítmény egyéb jellemzői alapján dől el.
                </p>
                <p>
                    A kötelezettség alapvetően a munkavállalók számához és az épület befogadó képességéhez kötődik, de vannak kivételek és kiegészítő szabályok.
                </p>
            </div>
        </section>
        
        {/* --- FRISSÍTETT TARTALOM: Fő szabályok --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <PillarCard icon={UsersIcon} title="Általános szabály: 50+ munkavállaló" description="Akkor kötelező a tűzvédelmi szabályzatot készíteni, ha a munkáltató ötven vagy több munkavállalót foglalkoztat." />
            <PillarCard icon={BuildingOfficeIcon} title="Befogadóképesség: 50+ fő" description="Ha a munkahely legnagyobb helyiségének befogadóképessége eléri vagy meghaladja az 50 főt, függetlenül a ténylegesen foglalkoztatottak számától." />
        </div>

        {/* --- FRISSÍTETT TARTALOM: Speciális esetek és jogi háttér --- */}
        <section className="mb-20">
            <h2 className={`text-3xl font-bold ${themeColors.headingText} mb-12 text-center`}>
                Egyéb speciális esetek
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-16">
                <div className={`${themeColors.cardBg} p-6 rounded-lg border ${themeColors.border}`}><p className={themeColors.bodyText}>Ha a fokozottan tűz- vagy robbanásveszélyes anyagok egy telephelyen tárolt együttes, egyidejű mennyisége meghaladja az <strong className={strongClass}>1000 kg-ot vagy litert</strong>. (festékek, lakkok, oldószerek, gázolaj)</p></div>
                <div className={`${themeColors.cardBg} p-6 rounded-lg border ${themeColors.border}`}><p className={themeColors.bodyText}>Ha a cég <strong className={strongClass}>mérsékelten tűzveszélyes osztályba</strong> tartozó anyagot vagy terméket tárol szabadtéren, és az erre használt összesített alapterület meghaladja az <strong className={strongClass}>1000 m²-t</strong>. (szárított deszka, gerenda, textil, tűzifa, brikett, kartonpapír)</p></div>
                <div className={`${themeColors.cardBg} p-6 rounded-lg border ${themeColors.border}`}><p className={themeColors.bodyText}>Intézmények, ahol menekülésben korlátozott személyek vannak - Iskolák, óvodák, bölcsődék, gyermekotthonok, ápolási otthonok esetében, ahol <strong className={strongClass}>20 főnél több</strong> menekülésben korlátozott személy (gyermek, beteg, idős) tartózkodik egyidejűleg, a tűzvédelmi szabályzat elkészítése és a <strong className={strongClass}>rendkívül szigorú előírások betartása létfontosságú</strong>.</p></div>
            </div>

            <div className={`${themeColors.cardBg} p-8 rounded-2xl border ${themeColors.border} space-y-4`}>
                <p className={`text-base ${themeColors.bodyText} flex items-start gap-3`}>
                    <InformationCircleIcon className="w-8 h-8 text-cyan-400 mt-1 flex-shrink-0" />
                    <span>A szabályzat hiánya vagy nem megfelelő készítése <strong className={strongClass}>jogszabálysértés, amely pénzbírsággal sújtható</strong>. (Tűzeset során a cég jogi felelőssége nagyban nőhet a megfelelő szabályzat vagy a hiányos tűzvédelem miatt.)</span>
                </p>
                <p className={`text-sm ${themeColors.subtleText} flex items-start gap-3`}>
                    <ScaleIcon className="w-6 h-6 text-slate-500 mt-0.5 flex-shrink-0" />
                    <span>A fenti információk a 2025. január 1-jén hatályba lépett 63/2024. (XII.30.) BM rendelet és a 101/2023. (XII. 29.) BM rendelet alapján készültek. A kötelezettség ellenőrzése a katasztrófavédelmi hatóságok (Országos Katasztrófavédelmi Főigazgatóság) feladata.</span>
                </p>
            </div>
        </section>

        {/* --- VÁLTOZATLAN: Call to Action --- */}
        <div className={`text-center mt-12`}>
            <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" target="_blank" rel="noopener noreferrer">
              <button
                className={`inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-8 px-12 rounded-xl text-3xl shadow-lg cta-glow-red transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900`}
              >
                Tűzvédelmi konzultáció szakemberrel!
              </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default TuzvedelmiSzabalyzatPage;