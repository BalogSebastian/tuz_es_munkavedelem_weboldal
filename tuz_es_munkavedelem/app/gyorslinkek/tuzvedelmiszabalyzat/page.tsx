'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  FireIcon,
  ScaleIcon,
  CheckBadgeIcon,
  ClipboardDocumentListIcon,
  MapPinIcon,
  BellAlertIcon,
  ExclamationTriangleIcon,
  DocumentTextIcon,
  MagnifyingGlassIcon,
  LightBulbIcon,
  ChatBubbleLeftRightIcon,
  CalendarDaysIcon
} from '@heroicons/react/24/outline';

// Sötét téma, javított, világosabb szövegszínekkel
const themeColors = {
  pageBg: 'bg-slate-900',
  containerBg: 'bg-slate-800/50',
  cardBg: 'bg-slate-800',
  border: 'border-slate-700',
  headingText: 'text-white',
  bodyText: 'text-slate-200', // Világosabb szürke a jobb olvashatóságért
  subtleText: 'text-slate-400', // A legkisebb szövegekhez
  
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

// Kártya komponensek
const PillarCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
    <div className={`${themeColors.cardBg} backdrop-blur-sm p-8 rounded-2xl shadow-lg border ${themeColors.border} text-center flex flex-col items-center h-full transition-all duration-300 hover:border-red-500/50 hover:-translate-y-1`}>
      <div className={`p-4 rounded-full bg-red-500/10 ${themeColors.primary.text} mb-5`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className={`text-xl font-bold ${themeColors.headingText} mb-2`}>{title}</h3>
      <p className={`${themeColors.bodyText} leading-relaxed text-center flex-grow`}>{description}</p>
    </div>
);

const ServiceCard = ({ icon: Icon, title, content }: { icon: React.ElementType; title: string; content: string }) => (
    <div className={`${themeColors.cardBg} p-6 rounded-xl shadow-md border ${themeColors.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-red-500/50 h-full`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-lg bg-red-500/10 ${themeColors.primary.text} flex-shrink-0`}>
          <Icon className="w-7 h-7" />
        </div>
        <h3 className={`text-lg font-bold ${themeColors.headingText}`}>{title}</h3>
      </div>
      <p className={`${themeColors.bodyText} leading-relaxed text-sm`}>{content}</p>
    </div>
);


const TuzvedelmiSzabalyzatPage = () => {
  const router = useRouter();

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
        
        <button
          onClick={() => router.back()}
          className={`inline-flex items-center justify-center p-3 rounded-full ${themeColors.cta.bg} text-white shadow-lg ${themeColors.cta.glow} ${themeColors.cta.hoverBg} transition-all duration-300 mb-8 hover:scale-110`}
          aria-label="Vissza az előző oldalra"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        <section className="text-center mb-16">
            <h1 className={`text-4xl sm:text-5xl font-extrabold ${themeColors.headingText} mb-4`}>
              Tűzvédelmi <span className={themeColors.primary.text}>Szabályzat</span>
            </h1>
            <p className={`text-lg sm:text-xl ${themeColors.bodyText} leading-relaxed max-w-4xl mx-auto`}>
              A tűzvédelmi szabályzat egy olyan átfogó, írásos dokumentum, amely minden vállalkozás számára kötelező. Lényegében egy cégre szabott, részletes terv a tüzek megelőzésére és a tűzesetek kezelésére. Célja, hogy meghatározza a tűzvédelmi feladatokat, a felelősségi köröket, a megelőző intézkedéseket, valamint a teendőket vészhelyzet esetén.
            </p>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <PillarCard icon={CheckBadgeIcon} title="Rendszeres Ellenőrzés és Megelőzés" description="Azonosítjuk a veszélyeket a munkahelyi környezetben, és javaslatot teszünk a tűzoltóeszközök elhelyezésére, ezzel megelőzve a tűzeseteket." />
            <PillarCard icon={ScaleIcon} title="Minden Vállalkozásnak Kötelező" description="A jogszabályok előírják a tűzvédelmi szabályzat készítését és karbantartását minden olyan vállalkozás számára, ahol a tűzveszélyes anyagok tárolása vagy az alkalmazottak száma indokolja." />
        </div>

        <section className="mb-20">
            <h2 className={`text-3xl font-bold ${themeColors.headingText} mb-10 text-center`}>
                Miből épül fel egy tűzvédelmi szabályzat?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className={`${themeColors.cardBg} p-6 rounded-lg border ${themeColors.border}`}><h4 className={`font-bold text-lg ${themeColors.headingText} mb-2`}>Tűzveszélyességi osztályba sorolás</h4><p className={`text-sm ${themeColors.bodyText}`}>Meghatározzuk az épületek és a helyiségek tűzveszélyességi besorolását a bennük lévő anyagok és technológiák alapján.</p></div>
                <div className={`${themeColors.cardBg} p-6 rounded-lg border ${themeColors.border}`}><h4 className={`font-bold text-lg ${themeColors.headingText} mb-2`}>Tűzoltóeszközök elhelyezése és használata</h4><p className={`text-sm ${themeColors.bodyText}`}>Pontos tervet készítünk a tűzoltó készülékek, tűzcsapok és egyéb tűzoltó berendezések helyéről és karbantartási üteméről.</p></div>
                <div className={`${themeColors.cardBg} p-6 rounded-lg border ${themeColors.border}`}><h4 className={`font-bold text-lg ${themeColors.headingText} mb-2`}>Menekülési útvonalak és jelzések</h4><p className={`text-sm ${themeColors.bodyText}`}>Térképet és leírást adunk a menekülési útvonalakról, gyülekezési helyekről, valamint a tűzvédelmi jelzésekről.</p></div>
                <div className={`${themeColors.cardBg} p-6 rounded-lg border ${themeColors.border}`}><h4 className={`font-bold text-lg ${themeColors.headingText} mb-2`}>Tűzoltási feladatok és riasztási terv</h4><p className={`text-sm ${themeColors.bodyText}`}>Részletesen leírjuk a teendőket tűz esetén, a riasztási láncot, és a mentési feladatokat.</p></div>
            </div>
        </section>

        <section className="mb-20">
            <h2 className={`text-3xl font-bold ${themeColors.headingText} mb-8 text-center`}>
                Mi ennek a jogi kötelezettsége?
            </h2>
            <div className={`${themeColors.warningBg} border-l-8 ${themeColors.primary.border} p-8 rounded-xl ${themeColors.warningText} shadow-xl`}>
                <p className="mb-6 text-lg">
                    A tűzvédelemről szóló jogszabályok, mint például a <strong>2011. évi CXXVIII. törvény</strong> és a <strong>2015. évi 54/2014. (XII. 5.) BM rendelet</strong> minden vállalkozás számára előírják a tűzvédelmi szabályzat készítését és a rendszeres felülvizsgálatát.
                </p>
                <h4 className={`font-bold text-xl mb-4 ${themeColors.headingText}`}>A jogi előírások figyelmen kívül hagyása súlyos következményekkel járhat:</h4>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3"><ExclamationTriangleIcon className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" /><span><strong>Pénzbírság:</strong> A hatósági ellenőrzések során a hiányosságokért akár több százezer forintos tűzvédelmi bírságot is kiszabhatnak.</span></li>
                    <li className="flex items-start gap-3"><ExclamationTriangleIcon className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" /><span><strong>Tevékenység korlátozása vagy felfüggesztése:</strong> Súlyos tűzvédelmi hiányosságok esetén a hatóság megtilthatja a tevékenység folytatását.</span></li>
                    <li className="flex items-start gap-3"><ExclamationTriangleIcon className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" /><span><strong>Baleset esetén felelősség:</strong> Tűzeset során a cég jogi felelőssége nagyban nőhet a megfelelő szabályzat vagy a hiányos tűzvédelem miatt.</span></li>
                </ul>
            </div>
        </section>
        
        <section className="mb-20">
            <h2 className={`text-3xl font-bold ${themeColors.headingText} mb-12 text-center`}>
                Komplex Tűzvédelmi Szolgáltatásaink
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ServiceCard icon={DocumentTextIcon} title="Tűzvédelmi Szabályzat Készítése" content="Szakértelemmel állítjuk össze vállalkozása egyedi tűzvédelmi szabályzatát, amely teljes mértékben megfelel a hatályos jogszabályoknak." />
                <ServiceCard icon={MagnifyingGlassIcon} title="Tűzvédelmi Szabályzat Felülvizsgálata" content="Gondoskodunk a jogszabályban előírt felülvizsgálatokról, hogy a dokumentációja mindig naprakész és érvényes legyen." />
                <ServiceCard icon={FireIcon} title="Tűzveszélyességi tanácsadás" content="Segítünk a helyiségek és technológiák tűzveszélyességi besorolásának meghatározásában, és javaslatot teszünk a kockázatok csökkentésére." />
                <ServiceCard icon={ChatBubbleLeftRightIcon} title="Szaktanácsadás és Támogatás" content="Folyamatos szakmai támogatást nyújtunk a tűzvédelemmel kapcsolatos kérdésekben, segítünk a jogszabályi bizonytalanságok tisztázásában." />
            </div>
        </section>

        <div className={`text-center mt-12 p-10 bg-gradient-to-br ${themeColors.cta.gradientFrom} ${themeColors.cta.gradientTo} rounded-2xl shadow-2xl`}>
          <h3 className="text-3xl font-bold text-white mb-4">Garantálja cége tűzvédelmét és alkalmazottai biztonságát!</h3>
          <p className="text-lg text-cyan-100 max-w-2xl mx-auto">
            Ne kockáztasson! Keressen minket egy ingyenes konzultációért, hogy átbeszéljük az Ön egyedi tűzvédelmi igényeit és elkészítsük a szabályzatot.
          </p>
          <div className="mt-8">
            <Link href="https://calendly.com/" target="_blank" rel="noopener noreferrer">
              <button
                className={`inline-flex items-center justify-center font-bold py-4 px-10 rounded-xl text-lg text-cyan-600 bg-white shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white/50 hover:scale-105`}
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

export default TuzvedelmiSzabalyzatPage;