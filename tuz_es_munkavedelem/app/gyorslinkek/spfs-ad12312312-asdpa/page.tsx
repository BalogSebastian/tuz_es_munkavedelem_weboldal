'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  CalculatorIcon,
  UsersIcon,
  ArrowTrendingUpIcon,
  ClockIcon,
  LightBulbIcon,
  ScaleIcon,
  DocumentCheckIcon,
  WrenchScrewdriverIcon,
  MagnifyingGlassIcon,
  CalendarDaysIcon,
  CpuChipIcon,
  AcademicCapIcon
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

// Kártya komponens a szolgáltatásokhoz
const ServiceCard = ({ icon: Icon, title, content }: { icon: React.ElementType; title: string; content: string }) => (
    <div className={`relative bg-white p-6 rounded-lg border ${accentColor.gridLines} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-cyan-300 h-full`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-lg bg-slate-100 ${accentColor.text}`}>
          <Icon className="w-7 h-7" />
        </div>
        <h3 className={`text-lg font-bold ${accentColor.darkText}`}>{title}</h3>
      </div>
      <p className={`${accentColor.lightText} leading-relaxed text-sm`}>{content}</p>
    </div>
  );

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

      <div className={`min-h-screen bg-white font-['Poppins',_sans-serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8`}>
        <div className="absolute inset-0 z-0 opacity-50" style={{
          backgroundImage: `linear-gradient(${accentColor.gridLines} 1px, transparent 1px), linear-gradient(to right, ${accentColor.gridLines} 1px, transparent 1px)`,
          backgroundSize: '3rem 3rem',
        }}></div>

        <div className="max-w-6xl mx-auto bg-white/80 backdrop-blur-lg rounded-lg shadow-2xl p-8 sm:p-12 relative z-10 border border-slate-200">
          
          <button
            onClick={() => router.back()}
            className={`inline-flex items-center justify-center p-3 rounded-full ${accentColor.bg} text-white shadow-lg ${accentColor.hoverBg} transition-all duration-300 mb-8 hover:shadow-cyan-500/40`}
            aria-label="Vissza az előző oldalra"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>

          {/* Címsor szekció */}
          <div className="text-center mb-12 border-b border-slate-200 pb-8">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 mb-4 font-roboto-mono">
              Kiürítési <span className={accentColor.text}>Számítás</span>
            </h1>
            <p className="text-lg text-slate-600 max-w-4xl mx-auto">
            <strong className={strongClass}>A kiürítés számítás</strong>  egy kulcsfontosságú tűzvédelmi dokumentum, amely tudományosan igazolja, hogy egy adott épületben vagy helyiségben vészhelyzet esetén abenntartózkodók időben, biztonságosan el tudják hagyni a területet. A számítás során figyelembe vesszük az épület paramétereit (méret, elrendezés), a benne tartózkodók számát és a menekülési útvonalak kapacitását, hogy meghatározzuk a maximálisan megengedett kiürítési időt. Ez az elemzés elengedhetetlen a biztonságos épületüzemeltetéshez és a jogszabályoknak való megfeleléshez.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 flex items-start gap-5">
                <div className={`p-3 rounded-lg ${accentColor.text} bg-white border border-slate-200 flex-shrink-0`}><CpuChipIcon className="w-8 h-8"/></div>
                <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Műszaki Biztonság Mérése</h3>
                    <p className="text-slate-600">Pontos adatokat szolgáltatunk a kiürítési időről, ezzel igazolva a menekülési útvonalak megfelelő kialakítását, a pánikhelyzetek elkerülése érdekében.</p>
                </div>
            </div>
            <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 flex items-start gap-5">
                <div className={`p-3 rounded-lg ${accentColor.text} bg-white border border-slate-200 flex-shrink-0`}><AcademicCapIcon className="w-8 h-8"/></div>
                <div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">Speciális Szakértelem</h3>
                    <p className="text-slate-600">A számításhoz speciális műszaki ismeretek és szoftverek szükségesek. Ne bízza ezt a feladatot a véletlenre, vegye igénybe szakképzett csapatunk segítségét!</p>
                </div>
            </div>
          </div>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Miből épül fel egy kiürítési számítás?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-lg border border-slate-200"><div className={`mb-3 w-fit p-3 rounded-md ${accentColor.lightBg} ${accentColor.text}`}><UsersIcon className="w-6 h-6"/></div><h4 className="font-bold mb-1"><strong className={strongClass}>Terhelés meghatározása</strong></h4><p className="text-sm text-slate-600">Megállapítjuk az épületben egyidejűleg tartózkodó személyek maximális számát a helyiség funkciója alapján.</p></div>
                <div className="bg-white p-6 rounded-lg border border-slate-200"><div className={`mb-3 w-fit p-3 rounded-md ${accentColor.lightBg} ${accentColor.text}`}><ArrowTrendingUpIcon className="w-6 h-6"/></div><h4 className="font-bold mb-1"><strong className={strongClass}>Menekülési útvonalak kapacitása</strong></h4><p className="text-sm text-slate-600">Elemezzük a menekülési útvonalak (folyosók, ajtók, lépcsők) szélességét és hosszát, valamint azok kapacitását a hatályos szabványok szerint.</p></div>
                <div className="bg-white p-6 rounded-lg border border-slate-200"><div className={`mb-3 w-fit p-3 rounded-md ${accentColor.lightBg} ${accentColor.text}`}><ClockIcon className="w-6 h-6"/></div><h4 className="font-bold mb-1"><strong className={strongClass}>Kiürítési idő elemzése</strong></h4><p className="text-sm text-slate-600">Kiszámítjuk, hogy a leghosszabb menekülési útvonalon tartózkodó személy mennyi idő alatt tud biztonságosan eljutni a gyűjtőhelyre.</p></div>
                <div className="bg-white p-6 rounded-lg border border-slate-200"><div className={`mb-3 w-fit p-3 rounded-md ${accentColor.lightBg} ${accentColor.text}`}><LightBulbIcon className="w-6 h-6"/></div><h4 className="font-bold mb-1"><strong className={strongClass}>Javaslatok és intézkedések</strong></h4><p className="text-sm text-slate-600">Amennyiben a számítás azt mutatja, hogy az épület nem felel meg a követelményeknek, javaslatot teszünk a szükséges műszaki és szervezési intézkedésekre.</p></div>
            </div>
          </section>

          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Mi ennek a jogi kötelezettsége?</h2>
            <div className={`p-8 rounded-lg border ${accentColor.warningBorder} ${accentColor.warningBg}`}>
                <p className={`mb-4 ${accentColor.warningText}`}>
                    A kiürítési számítás szükségességét és követelményeit a <strong className={strongClass}>2011. évi CXXVIII. törvény a tűz elleni védekezésről</strong> és a kapcsolódó jogszabályok, mint például az <strong className={strongClass}>54/2014. (XII. 5.) BM rendelet</strong> írják elő. A számítás elkészítése számos esetben kötelező, például új épületek tervezésekor, felújításkor vagy a funkcióváltás során.
                </p>
                <h4 className="font-bold text-lg mb-3 text-slate-800">A számítás hiánya vagy hibás tartalma súlyos következményekkel járhat:</h4>
                <ul className="list-disc list-inside space-y-2 text-slate-700">
                    <li><strong className={strongClass}>Hatósági elutasítás:</strong> A tűzvédelmi hatóság elutasíthatja a tervet, ha a számítás hiányos vagy hibás, ami építési vagy működési engedély késedelmet okoz.</li>
                    <li><strong className={strongClass}>Pénzbírság:</strong> A tűzvédelmi hatóság jelentős bírságot szabhat ki a hiányzó <strong className={strongClass}>dokumentáció</strong> miatt.</li>
                    <li><strong className={strongClass}>Balesetveszély:</strong> A legfontosabb, hogy egy vészhelyzetben a rosszul méretezett menekülési útvonalak és a hosszú kiürítési idő <strong className={strongClass}>emberéletet</strong> veszélyeztethet.</li>
                </ul>
            </div>
          </section>
          
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">Komplex Kiürítési Számítás Szolgáltatásaink</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ServiceCard icon={CalculatorIcon} title="Kiürítési Számítás Készítése" content="Szakértelemmel állítjuk össze a kiürítési számítást, amely teljes mértékben megfelel a hatályos jogszabályoknak és a tűzvédelmi követelményeknek." />
                <ServiceCard icon={DocumentCheckIcon} title="Szabályzat és Terv Kiegészítése" content="A számítást beépítjük a meglévő tűzvédelmi szabályzatba és a menekülési tervbe, ezzel garantálva a dokumentáció egységességét és naprakészségét." />
                <ServiceCard icon={WrenchScrewdriverIcon} title="Műszaki Tanácsadás" content="Javaslatot teszünk a menekülési útvonalak optimalizálására és a kiürítést befolyásoló tényezők javítására, a leggyorsabb és legbiztonságosabb evakuálás érdekében." />
                <ServiceCard icon={MagnifyingGlassIcon} title="Számítás Felülvizsgálata" content="Gondoskodunk a jogszabályban előírt felülvizsgálatokról, hogy a számítás mindig az épület aktuális állapotának feleljen meg." />
            </div>
          </section>

          <div className="text-center mt-12 p-8 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-lg shadow-2xl">
            <h3 className="text-2xl font-bold text-white mb-3">Számoljon a biztonsággal!</h3>
            <p className="text-lg text-cyan-100 max-w-2xl mx-auto">
              Ne kockáztasson a számokkal! Keressen minket egy ingyenes konzultációért, és győződjön meg róla, hogy épülete minden szempontból biztonságos.
            </p>
            <div className="mt-8">
              <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" target="_blank" rel="noopener noreferrer">
                <button
                  className={`inline-flex items-center justify-center font-bold py-3 px-8 rounded-lg text-lg text-cyan-600 bg-white shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white/50 hover:scale-105`}
                >
                  <CalendarDaysIcon className="w-6 h-6 mr-3" />
                  Ingyenes Konzultációt Foglalok
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default KiuritesSzamitasPage;