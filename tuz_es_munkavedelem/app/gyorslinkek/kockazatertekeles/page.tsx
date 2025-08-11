'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  ShieldCheckIcon,
  DocumentMagnifyingGlassIcon,
  ScaleIcon,
  ExclamationTriangleIcon,
  LightBulbIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  CheckBadgeIcon,
  UsersIcon // Veszélyelemzéshez
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

// Kártya komponensek (animációk nélkül, egyszerűsítve)
const PillarCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
    <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-slate-200/60 text-center flex flex-col items-center h-full">
      <div className={`p-4 rounded-full bg-gradient-to-br ${accentColor.gradientFrom} ${accentColor.gradientTo} text-white mb-5 shadow-lg shadow-cyan-500/30`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className={`text-xl font-bold ${accentColor.darkText} mb-2`}>{title}</h3>
      <p className={`${accentColor.lightText} leading-relaxed text-center flex-grow`}>{description}</p>
    </div>
);

const ServiceCard = ({ icon: Icon, title, content }: { icon: React.ElementType; title: string; content: string }) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100/80 transition-all duration-300 hover:shadow-2xl hover:border-cyan-200 hover:-translate-y-1 h-full">
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-xl ${accentColor.lightBg} ${accentColor.text} flex-shrink-0`}>
          <Icon className="w-7 h-7" />
        </div>
        <h3 className={`text-xl font-bold ${accentColor.darkText}`}>{title}</h3>
      </div>
      <p className={`${accentColor.lightText} leading-relaxed`}>{content}</p>
    </div>
);

const KockazatErtekelesPage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(3, 186, 190, 0.08) 1px, transparent 1px), linear-gradient(to right, rgba(3, 186, 190, 0.08) 1px, transparent 1px)`,
        backgroundSize: '3.5rem 3.5rem',
      }}></div>

      <div className="max-w-6xl mx-auto bg-white/90 backdrop-blur-lg rounded-2xl shadow-xl p-8 sm:p-10 relative z-10 border border-slate-200">
        
        <button
          onClick={() => router.back()}
          className={`inline-flex items-center justify-center p-3 rounded-full ${accentColor.bg} text-white shadow-md ${accentColor.hoverBg} transition-all duration-300 mb-8 hover:scale-110`}
          aria-label="Vissza az előző oldalra"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        <div className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
              Kockázatértékelés
            </h1>
            <p className="text-lg sm:text-xl text-slate-700 leading-relaxed max-w-4xl mx-auto">
              A kockázatértékelés a munkavédelem alapköve, melynek célja a munkahelyi környezetben előforduló veszélyek és kockázatok szisztematikus azonosítása, elemzése és kezelése. Ez a folyamat nem csupán jogszabályi kötelezettség, hanem a leghatékonyabb eszköz a balesetek megelőzésére, a dolgozók egészségének védelmére és a vállalkozás jogi megfelelőségének garantálására. A kockázatértékelés egy proaktív, dinamikus rendszer, ami a biztonságos munkahelyi kultúrát alapozza meg.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <PillarCard icon={DocumentMagnifyingGlassIcon} title="Veszélyelemzés és Kockázatkezelés" description="Rendszeres, proaktív elemzés a munkahelyi veszélyforrások (pl. zaj, vegyi anyagok, ergonómiai terhelés) és a lehetséges balesetek feltárására, ezzel megelőzve a sérüléseket és megbetegedéseket." />
            <PillarCard icon={ScaleIcon} title="Minden Vállalkozásnak Kötelező" description="Legyen szó irodai munkáról, építőipari tevékenységről vagy gyártásról, a kockázatértékelés kötelező feladat minden munkáltató számára, a cég méretétől és a dolgozók számától függetlenül." />
        </div>

        <section className="mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-10 text-center">
                Miből épül fel egy kockázatértékelés?
            </h2>
            <div className="space-y-6">
                <div className="bg-white p-6 rounded-lg border-l-4 border-cyan-500 shadow-md">
                    <h4 className="font-bold text-lg text-slate-800">Veszélyek azonosítása</h4>
                    <p className="text-slate-600">Feltérképezzük a munkahelyen lévő összes lehetséges veszélyforrást, a fizikai, kémiai, biológiai, pszichoszociális és ergonómiai tényezőket.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-cyan-500 shadow-md">
                    <h4 className="font-bold text-lg text-slate-800">Kockázatok értékelése</h4>
                    <p className="text-slate-600">Meghatározzuk, hogy az azonosított veszélyek milyen valószínűséggel okozhatnak sérülést vagy betegséget, és milyen súlyosságúak lehetnek a következmények.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-cyan-500 shadow-md">
                    <h4 className="font-bold text-lg text-slate-800">Megelőző intézkedések meghatározása</h4>
                    <p className="text-slate-600">Javaslatot teszünk a kockázatok csökkentésére vagy megszüntetésére, például védőfelszerelések használatára, munkaszervezési változtatásokra vagy műszaki fejlesztésekre.</p>
                </div>
                <div className="bg-white p-6 rounded-lg border-l-4 border-cyan-500 shadow-md">
                    <h4 className="font-bold text-lg text-slate-800">Dokumentáció készítése</h4>
                    <p className="text-slate-600">Egy átlátható, minden jogszabálynak megfelelő dokumentumot állítunk össze, amely rögzíti az elemzési eredményeket és a szükséges intézkedéseket.</p>
                </div>
            </div>
        </section>

        <section className="mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">
                Mi ennek a jogi kötelezettsége?
            </h2>
            <div className="bg-red-50 border-l-8 border-red-500 p-8 rounded-xl text-red-900 shadow-xl relative overflow-hidden">
                <p className="mb-6 text-lg">
                    A kockázatértékelés elvégzését a <strong>munkavédelemről szóló 1993. évi XCIII. törvény</strong> írja elő minden munkáltató számára. A hatósági ellenőrzések során a munkavédelmi felügyelők elsődlegesen a kockázatértékelés meglétét, naprakészségét és tartalmát vizsgálják.
                </p>
                <h4 className="font-bold text-xl mb-4 text-red-800">Ennek hiánya vagy hiányos elkészítése súlyos következményekkel járhat:</h4>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3"><CheckBadgeIcon className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" /><span><strong>Magas bírságok:</strong> A jogszabályok be nem tartása akár több millió forintos bírságot vonhat maga után.</span></li>
                    <li className="flex items-start gap-3"><CheckBadgeIcon className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" /><span><strong>Működés felfüggesztése:</strong> Súlyos mulasztások esetén a hatóság felfüggesztheti a cég tevékenységét.</span></li>
                    <li className="flex items-start gap-3"><CheckBadgeIcon className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" /><span><strong>Baleset esetén felmerülő felelősség:</strong> Egy esetleges baleset során a cég jogi és anyagi felelőssége nagy mértékben nőhet a megfelelő kockázatértékelés hiányában.</span></li>
                </ul>
            </div>
        </section>
        
        <section className="mb-20">
            <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                Komplex Kockázatértékelési Szolgáltatásaink
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ServiceCard icon={DocumentMagnifyingGlassIcon} title="Kockázatértékelés Készítése" content="Teljesen új kockázatértékelési dokumentációt készítünk, amely a vállalkozása egyedi profiljához és a valós munkahelyi körülményekhez igazodik." />
                <ServiceCard icon={CheckBadgeIcon} title="Rendszeres Felülvizsgálat" content="Gondoskodunk a jogszabályban előírt felülvizsgálatokról, hogy a dokumentáció mindig naprakész legyen, felkészítve Önt a hatósági ellenőrzésekre." />
                <ServiceCard icon={LightBulbIcon} title="Szakértői Tanácsadás" content="Folyamatos szakmai támogatást nyújtunk minden felmerülő munkavédelmi kérdésben, segítünk a kockázatkezelési intézkedések bevezetésében." />
                <ServiceCard icon={AcademicCapIcon} title="Célzott Munkavédelmi Oktatás" content="A kockázatértékelés eredményei alapján gyakorlatias oktatásokat tartunk, hogy munkatársai tisztában legyenek a rájuk vonatkozó veszélyekkel." />
            </div>
        </section>

        <div className="text-center mt-12 mb-8 p-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-3xl shadow-2xl relative overflow-hidden">
          <h3 className="text-3xl font-bold text-white mb-4 drop-shadow-md">Garantálja munkavállalói biztonságát és vállalkozása jogi védelmét!</h3>
          <p className="text-lg text-cyan-100 max-w-2xl mx-auto drop-shadow">
            Ne kockáztasson, legyen felkészült a biztonság minden területén. Keressen minket egy díjmentes konzultációért, ahol részletesen átbeszéljük az Ön egyedi igényeit.
          </p>
          <div className="mt-8">
            <Link href="https://calendly.com/" target="_blank" rel="noopener noreferrer">
              <button
                className={`inline-flex items-center justify-center font-bold py-4 px-10 rounded-xl text-lg text-cyan-600 bg-white shadow-2xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white/50 hover:scale-105`}
              >
                <CalendarDaysIcon className="w-6 h-6 mr-3" />
                Ingyenes Konzultációt Foglalok
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KockazatErtekelesPage;