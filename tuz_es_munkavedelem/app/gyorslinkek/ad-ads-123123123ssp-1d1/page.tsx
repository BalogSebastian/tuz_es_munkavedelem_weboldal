'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  DocumentMagnifyingGlassIcon,
  ScaleIcon,
  CheckBadgeIcon,
  UsersIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

// Az oldal stílusát meghatározó színséma
const accentColor = {
  text: 'text-cyan-500',
  bg: 'bg-cyan-500',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  gradientFrom: 'from-cyan-500',
  gradientTo: 'to-teal-500',
  lightBg: 'bg-cyan-50',
  lightBorder: 'border-cyan-200',
  darkText: 'text-slate-800',
  lightText: 'text-slate-600'
};

// Kártya komponens
const PillarCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: React.ReactNode }) => (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200/60 text-center flex flex-col items-center h-full">
      <div className={`p-4 rounded-full bg-gradient-to-br ${accentColor.gradientFrom} ${accentColor.gradientTo} text-white mb-5 shadow-lg shadow-cyan-500/30`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className={`text-xl font-bold ${accentColor.darkText} mb-2`}>{title}</h3>
      <p className={`${accentColor.lightText} leading-relaxed text-center flex-grow`}>{description}</p>
    </div>
);

const KockazatErtekelesPage = () => {
  const router = useRouter();
  const strongClass = "font-bold text-slate-900"; // A kiemelések stílusa

  return (
    <div className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(3, 186, 190, 0.08) 1px, transparent 1px), linear-gradient(to right, rgba(3, 186, 190, 0.08) 1px, transparent 1px)`,
        backgroundSize: '3.5rem 3.5rem',
      }}></div>

      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 sm:p-10 relative z-10 border border-slate-200">
        

        <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
              Kockázatértékelés
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-4xl mx-auto">
              A munkahelyi balesetek és megbetegedések megelőzése nemcsak erkölcsi kötelesség, hanem törvényi előírás. A kockázatértékelés célja a munkahelyi környezetben előforduló veszélyek és kockázatok szisztematikus azonosítása, elemzése és kezelése. Megfelelő elkészítése nemcsak emberi tragédiákat akadályoz meg, hanem anyagi károktól és jelentős jogi szankcióktól is óvja meg vállalkozását.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <PillarCard icon={ScaleIcon} title="Minden Munkáltatónak Kötelező" description={
              <>
                <strong className={strongClass}>Legyen szó irodai munkáról, vendéglátásról, építőipari tevékenységről vagy gyártásról</strong>, a kockázatértékelés kötelező feladat minden munkáltató számára, már 1 munkavállalótól. Az hogy milyen típusú kockázatértékelésre lehet szükséged, az mindig a tevékenységi kör határozza meg.
              </>
            } />
            <PillarCard icon={AcademicCapIcon} title="Kizárólag Szakemberek Végezhetik" description={
              <>
                Elvégzése munkabiztonsági és/vagy munkaegészségügyi szaktevékenység, tehát <strong className={strongClass}>munkavédelmi végzettségű szakemberek</strong> végezhetik el.
              </>
            } />
        </div>

        <section className="mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
                Miből épül fel egy kockázatértékelés?
            </h2>
            <div className="space-y-6 max-w-3xl mx-auto">
                <div className="bg-white p-6 rounded-lg border-l-4 border-cyan-500 shadow-md">
                    <h4 className="font-bold text-lg text-slate-800"><strong className={strongClass}>Veszélyek azonosítása</strong></h4>
                    <p className="text-slate-600">Feltérképezzük a munkahelyen lévő összes lehetséges veszélyforrást, a fizikai, kémiai, biológiai, pszichoszociális és ergonómiai tényezőket.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-cyan-500 shadow-md">
                    <h4 className="font-bold text-lg text-slate-800"><strong className={strongClass}>Kockázatok értékelése</strong></h4>
                    <p className="text-slate-600">Meghatározzuk, hogy az azonosított veszélyek milyen valószínűséggel okozhatnak sérülést vagy betegséget, és milyen súlyosságúak lehetnek a következmények.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-cyan-500 shadow-md">
                    <h4 className="font-bold text-lg text-slate-800"><strong className={strongClass}>Megelőző intézkedések meghatározása</strong></h4>
                    <p className="text-slate-600">Javaslatot teszünk a kockázatok csökkentésére vagy megszüntetésére, például védőfelszerelések használatára, munkaszervezési változtatásokra vagy műszaki fejlesztésekre.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-cyan-500 shadow-md">
                    <h4 className="font-bold text-lg text-slate-800"><strong className={strongClass}>Dokumentáció készítése</strong></h4>
                    <p className="text-slate-600">Egy átlátható, minden jogszabálynak megfelelő dokumentumot állítunk össze, amely rögzíti az elemzési eredményeket és a szükséges intézkedéseket.</p>
                </div>
            </div>
        </section>

        <section className="mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                Mi ennek a jogi kötelezettsége?
            </h2>
            <div className="bg-red-50 border-l-8 border-red-500 p-8 rounded-xl text-red-900 shadow-xl">
                <p className="mb-6 text-base">
                    A kockázatértékelés elvégzését a <strong className={strongClass}>munkavédelemről szóló 1993. évi XCIII. törvény</strong> írja elő minden munkáltató számára. A hatósági ellenőrzések során a munkavédelmi felügyelők elsődlegesen a kockázatértékelés meglétét, naprakészségét és tartalmát vizsgálják.
                </p>
                <h4 className="font-bold text-lg mb-4 text-red-800">Ennek hiánya vagy hiányos elkészítése súlyos következményekkel jár:</h4>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3"><CheckBadgeIcon className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" /><span><strong className={strongClass}>Pénzbírságok:</strong> A munkavédelmi bírság összege <strong className={strongClass}>50 000 Ft-tól 10 000 000 Ft-ig</strong> terjedhet, attól függően mekkora a mulasztás.</span></li>
                    <li className="flex items-start gap-3"><CheckBadgeIcon className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" /><span><strong className={strongClass}>Működés felfüggesztése:</strong> Súlyos hiányosság esetén a hatóság felfüggesztheti a cég tevékenységét.</span></li>
                    <li className="flex items-start gap-3"><CheckBadgeIcon className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" /><span><strong className={strongClass}>Baleset esetén felmerülő felelősség:</strong> Ha baleset történik és kiderül, hogy a kockázatértékelés nem volt meg vagy hiányos, a munkáltatót kártérítési perek érik, és teljes mértékben meg kell térítenie a sérült kárát.</span></li>
                </ul>
            </div>
        </section>
        
        <div className="text-center mt-12 mb-8">
            <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" target="_blank" rel="noopener noreferrer">
              <button
                className={`inline-flex items-center gap-3 bg-red-600 hover:bg-red-700 text-white font-bold py-8 px-12 rounded-xl text-3xl shadow-lg cta-glow-red transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900`}
              >
                Ingyenes Konzultációt Foglalok
              </button>
            </Link>
        </div>
      </div>
    </div>
  );
};

export default KockazatErtekelesPage;