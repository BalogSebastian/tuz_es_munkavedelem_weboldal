'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // Hozzáadva
import {
  ArrowLeftIcon,
  ShieldCheckIcon,
  BeakerIcon,
  BuildingStorefrontIcon,
  ClipboardDocumentListIcon,
  ScaleIcon,
  DocumentMagnifyingGlassIcon,
  AcademicCapIcon,
  LightBulbIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
  CheckBadgeIcon
} from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid'; // Hozzáadva
import Link from 'next/link';

// Sötét témájú, felturbózott színséma
const accentColor = {
  text: 'text-cyan-400',
  bg: 'bg-cyan-500',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  gradientFrom: 'from-cyan-400',
  gradientTo: 'to-teal-400',
  glow: 'shadow-cyan-500/30',
  pageBg: 'bg-slate-900',
  containerBg: 'bg-slate-800/50',
  containerBorder: 'border-slate-700',
  cardBg: 'bg-slate-800',
  headingText: 'text-white',
  bodyText: 'text-slate-300',
  subtleText: 'text-slate-400',
  warningBg: 'bg-red-900/30',
  warningBorder: 'border-red-500/50',
  warningText: 'text-red-300'
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


// Kártya komponensek sötét témára szabva
const PillarCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: React.ReactNode }) => (
    <div
      className={`${accentColor.cardBg} backdrop-blur-sm p-8 rounded-2xl shadow-lg border ${accentColor.containerBorder} text-center flex flex-col items-center h-full transition-all duration-300 hover:border-cyan-500/50 hover:-translate-y-1`}
    >
      <div className={`p-4 rounded-full bg-gradient-to-br ${accentColor.gradientFrom} ${accentColor.gradientTo} text-white mb-5 shadow-lg ${accentColor.glow}`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className={`text-xl font-bold ${accentColor.headingText} mb-2`}>{title}</h3>
      <p className={`${accentColor.subtleText} leading-relaxed text-center flex-grow`}>{description}</p>
    </div>
  );

const ServiceCard = ({ icon: Icon, title, content }: { icon: React.ElementType; title: string; content: React.ReactNode }) => (
    <div
      className={`${accentColor.cardBg} p-6 rounded-2xl shadow-lg border ${accentColor.containerBorder} transition-all duration-300 hover:shadow-2xl hover:border-cyan-500/50 hover:-translate-y-1 h-full`}
    >
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-xl bg-cyan-500/10 ${accentColor.text} flex-shrink-0`}>
          <Icon className="w-7 h-7" />
        </div>
        <h3 className={`text-xl font-bold ${accentColor.headingText}`}>{title}</h3>
      </div>
      <div className={`${accentColor.bodyText} leading-relaxed`}>{content}</div>
    </div>
  );

const HaccpPage = () => {
  const router = useRouter();
  const strongClass = "font-semibold text-cyan-300"; // A kiemelések stílusa

  return (
    <div
      className={`min-h-screen ${accentColor.pageBg} font-['Poppins',_sans_serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8`}
    >
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
      <div className="absolute inset-0 z-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(203, 213, 225, 0.03) 1px, transparent 1px), linear-gradient(to right, rgba(203, 213, 225, 0.03) 1px, transparent 1px)`,
        backgroundSize: '3.5rem 3.5rem',
      }}></div>
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl"
        />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full filter blur-3xl"
        />
      </div>

      <div
        className={`max-w-6xl mx-auto ${accentColor.containerBg} backdrop-blur-xl rounded-3xl shadow-2xl p-8 sm:p-12 relative z-10 border ${accentColor.containerBorder}`}
      >

        <div className="text-center mb-16">
            <h2 className="text-2xl font-bold text-white mb-6">Mi az a HACCP?</h2>
            <p className="text-lg text-slate-300 leading-relaxed max-w-4xl mx-auto">
              A <strong className={strongClass}>HACCP</strong> (Hazard Analysis and Critical Control Points) egy nemzetközileg elfogadott, dinamikus élelmiszerbiztonsági rendszer, amelynek célja a fogyasztók egészségének védelme. Lényege a veszélyek elemzése és a kritikus ellenőrző pontok meghatározása az élelmiszer-előállítás és -forgalmazás teljes folyamatában. Ez a rendszer segít azonosítani, értékelni és kezelni az élelmiszerbiztonságot fenyegető biológiai, kémiai és fizikai kockázatokat, még a problémák felmerülése előtt. A HACCP bevezetése nem csupán jogszabályi kötelezettség, hanem a fogyasztók bizalmának alapja.
            </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <PillarCard icon={BeakerIcon} title="Veszélyelemzés és Kockázatkezelés" description="Rendszeres, proaktív elemzés a lehetséges szennyeződések, fertőzések és egyéb élelmiszerbiztonsági kockázatok elkerülésére a teljes termési láncban." />
            <PillarCard icon={BuildingStorefrontIcon} title="Minden Élelmiszeripari Egységnek Kötelező" description={
                <>Legyen szó étteremről, boltról vagy <strong className={strongClass}>gyárról</strong>, a HACCP-rendszer bevezetése és fenntartása kötelező minden élelmiszerrel foglalkozó vállalkozás számára.</>
            } />
        </div>

        <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-10 text-center">
                Miből épül fel a HACCP?
            </h2>
            <div className={`${accentColor.cardBg} p-8 rounded-2xl shadow-xl border ${accentColor.containerBorder}`}>
                <p className="text-slate-300 mb-6">A HACCP-rendszer 7 alapelvre épül, amelyek a következők:</p>
                <ol className="list-decimal list-inside space-y-4 text-slate-300">
                    <li><strong className="font-semibold text-white">Veszélyelemzés:</strong> A potenciális élelmiszerbiztonsági veszélyek azonosítása és értékelése.</li>
                    <li><strong className="font-semibold text-white">Kritikus ellenőrző pontok (CCP-k) meghatározása:</strong> Azoknak a pontoknak a kijelölése a folyamatban, ahol a veszélyek kontrollálhatók.</li>
                    <li><strong className="font-semibold text-white">Kritikus határértékek megállapítása:</strong> A CCP-khez tartozó elfogadható paraméterek (pl. hőmérséklet, idő) meghatározása.</li>
                    <li><strong className="font-semibold text-white">Ellenőrzési eljárások kidolgozása:</strong> A CCP-k rendszeres felügyeletének módjának leírása.</li>
                    <li><strong className="font-semibold text-white">Helyesbítő tevékenységek megfogalmazása:</strong> A cselekvési terv a kritikus határértékek túllépése esetén.</li>
                    <li><strong className="font-semibold text-white">Igazoló eljárások bevezetése:</strong> A rendszer hatékonyságának igazolása (pl. auditok).</li>
                    <li><strong className="font-semibold text-white">Dokumentáció készítése:</strong> A teljes rendszer dokumentálása és nyilvántartások vezetése.</li>
                </ol>
            </div>
        </section>

        <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-8 text-center">
                Mi ennek a jogi kötelezettsége?
            </h2>
            <div className={`${accentColor.warningBg} border-l-8 ${accentColor.warningBorder} p-8 rounded-xl ${accentColor.warningText} shadow-xl relative overflow-hidden`}>
                <ExclamationTriangleIcon className="absolute -right-8 -bottom-8 w-40 h-40 text-red-500/10" />
                <p className="mb-6 text-lg text-red-200">
                    A HACCP-rendszer működtetése az Európai Unióban a <strong className={strongClass}>852/2004/EK rendeleten</strong> alapul, amelynek előírásait a magyar jog is átültette. A <strong className={strongClass}>Nemzeti Élelmiszerlánc-biztonsági Hivatal (Nébih)</strong> rendszeresen ellenőrzi a vállalkozásokat a HACCP-rendszer meglétét és hatékony működését illetően.
                </p>
                <h4 className="font-bold text-xl text-white mb-4">A HACCP hiánya vagy nem megfelelő működtetése súlyos következményekkel járhat:</h4>
                <ul className="space-y-3 text-red-200">
                    <li className="flex items-start gap-3"><CheckBadgeIcon className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" /><span><strong className="font-semibold text-white">Magas bírságok:</strong> A Nébih több százezer forintos, akár milliós nagyságrendű bírságot is kiszabhat.</span></li>
                    <li className="flex items-start gap-3"><CheckBadgeIcon className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" /><span><strong className="font-semibold text-white">Működés felfüggesztése/bezárása:</strong> Súlyos élelmiszer-biztonsági kockázat esetén a hatóság ideiglenesen vagy véglegesen is bezárathatja a vállalkozást.</span></li>
                    <li className="flex items-start gap-3"><CheckBadgeIcon className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" /><span><strong className="font-semibold text-white">Fogyasztói bizalom elvesztése:</strong> Az élelmiszer-botrányok komoly bizalmatlanságot okozhatnak, ami hosszú távon károsítja a cég hírnevét és üzletmenetét.</span></li>
                </ul>
            </div>
        </section>
        
        <section className="mb-20">
            <h2 className="text-3xl font-bold text-white mb-12 text-center">
                Komplex HACCP Szolgáltatásaink
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ServiceCard icon={ClipboardDocumentListIcon} title="HACCP Rendszer kiépítése" content={<>Teljes körű <strong className={strongClass}>HACCP kézikönyvet</strong> és a szükséges dokumentációt készítünk, amely az Ön vállalkozásának profiljához igazodik, felkészítve Önt a hatósági ellenőrzésekre.</>} />
                <ServiceCard icon={DocumentMagnifyingGlassIcon} title="Rendszeres Felülvizsgálat és Audit" content={<>Gondoskodunk a jogszabályban előírt éves <strong className={strongClass}>felülvizsgálatáról</strong> és belső auditokról, hogy a rendszere mindig naprakész és hatékony legyen.</>} />
                <ServiceCard icon={AcademicCapIcon} title="Higiéniai és HACCP Oktatás" content={<>Célzott, gyakorlatias oktatásokat tartunk <strong className={strongClass}>munkatársainak</strong>, hogy tisztában legyenek a HACCP-rendszer elveivel és saját feladataikkal.</>} />
                <ServiceCard icon={LightBulbIcon} title="Szakértői Tanácsadás és Támogatás" content={<>Folyamatos <strong className={strongClass}>szakmai támogatást</strong> nyújtunk minden felmerülő élelmiszer-biztonsági kérdésben, segítünk a jogszabályi bizonytalanságok tisztázásában.</>} />
            </div>
        </section>

        {/* --- MÓDOSÍTOTT CTA SZEKCIÓ --- */}
        <div className="text-center mt-12 mb-8 p-8">
          <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" target="_blank" rel="noopener noreferrer">
            <button
                className={`
                    inline-flex items-center gap-3
                    ${ACCENT_COLOR_RED.bg} ${ACCENT_COLOR_RED.textOnAccent}
                    font-bold py-8 px-12 rounded-xl text-3xl
                    shadow-lg ${ACCENT_COLOR_RED.shadow} ${ACCENT_COLOR_RED.hoverShadow}
                    transition-all duration-300 ease-in-out
                    focus:outline-none focus:ring-4 ${ACCENT_COLOR_RED.ring} focus:ring-offset-2 focus:ring-offset-slate-900
                    cta-button
                `}
            >
                Foglalj egy ingyenes konzultációt!
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HaccpPage;