'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  FireIcon,
  UserGroupIcon,
  ScaleIcon,
  BookOpenIcon,
  WrenchScrewdriverIcon,
  ChatBubbleLeftRightIcon,
  DocumentCheckIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  MapPinIcon,
  AcademicCapIcon
} from '@heroicons/react/24/outline';

// Egyedi, tűzvédelmi témájú színséma
const themeColors = {
  primary: {
    text: 'text-red-600',
    bg: 'bg-red-600',
    hoverBg: 'hover:bg-red-700',
    ring: 'focus:ring-red-500',
    border: 'border-red-500',
    lightBg: 'bg-red-50',
  },
  cta: {
    text: 'text-white',
    bg: 'bg-cyan-500',
    hoverBg: 'hover:bg-cyan-600',
    ring: 'focus:ring-cyan-500',
    gradientFrom: 'from-cyan-500',
    gradientTo: 'to-teal-500',
  },
  base: {
    pageBg: 'bg-slate-50',
    containerBg: 'bg-white',
    darkText: 'text-slate-900',
    lightText: 'text-slate-600',
    border: 'border-slate-200',
  }
};

// Kártya komponensek
const PillarCard = ({ icon: Icon, title, description }: { icon: React.ElementType; title: string; description: string }) => (
    <div className={`${themeColors.base.containerBg} p-8 rounded-2xl shadow-lg border ${themeColors.base.border} text-center flex flex-col items-center h-full`}>
      <div className={`p-4 rounded-full ${themeColors.primary.lightBg} ${themeColors.primary.text} mb-5`}>
        <Icon className="w-8 h-8" />
      </div>
      <h3 className={`text-xl font-bold ${themeColors.base.darkText} mb-2`}>{title}</h3>
      <p className={`${themeColors.base.lightText} leading-relaxed text-center flex-grow`}>{description}</p>
    </div>
);

const ServiceCard = ({ icon: Icon, title, content }: { icon: React.ElementType; title: string; content: string }) => (
    <div className={`${themeColors.base.containerBg} p-6 rounded-xl shadow-md border ${themeColors.base.border} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-red-200`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`p-3 rounded-lg ${themeColors.primary.lightBg} ${themeColors.primary.text} flex-shrink-0`}>
          <Icon className="w-7 h-7" />
        </div>
        <h3 className={`text-lg font-bold ${themeColors.base.darkText}`}>{title}</h3>
      </div>
      <p className={`${themeColors.base.lightText} leading-relaxed text-sm`}>{content}</p>
    </div>
);

const TuzvedelmiOktatasPage = () => {
  const router = useRouter();

  return (
    <div className={`min-h-screen ${themeColors.base.pageBg} font-['Poppins',_sans-serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8`}>
      <FireIcon className="absolute -top-24 -left-24 w-96 h-96 text-red-500/5 opacity-50 rotate-12" />
      <FireIcon className="absolute -bottom-24 -right-24 w-96 h-96 text-orange-500/5 opacity-50 -rotate-12" />

      <div className={`max-w-6xl mx-auto ${themeColors.base.containerBg}/90 backdrop-blur-lg rounded-2xl shadow-2xl p-8 sm:p-10 relative z-10 border ${themeColors.base.border}`}>
        
        <button
          onClick={() => router.back()}
          className={`inline-flex items-center justify-center p-3 rounded-full ${themeColors.cta.bg} text-white shadow-lg ${themeColors.cta.hoverBg} transition-all duration-300 mb-8 hover:scale-110 hover:shadow-cyan-500/40`}
          aria-label="Vissza az előző oldalra"
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </button>

        <section className="text-center mb-16">
            <h1 className="text-4xl sm:text-5xl font-extrabold ${themeColors.base.darkText} mb-4">
              Tűzvédelmi <span className={themeColors.primary.text}>Oktatás</span>
            </h1>
            <p className="text-lg sm:text-xl ${themeColors.base.lightText} leading-relaxed max-w-4xl mx-auto">
              A tűzvédelmi oktatás a tüzek megelőzésének és a tűzesetek hatékony kezelésének alapvető eleme. Célja, hogy a munkavállalók naprakész ismeretekkel rendelkezzenek a munkahelyi tűzvédelmi előírásokról, a menekülési útvonalakról, a tűzoltóeszközök használatáról és a tűz esetén követendő helyes cselekvési protokollokról.
            </p>
        </section>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            <PillarCard icon={UserGroupIcon} title="Felkészült Munkatársak" description="Gyakorlati tudást adunk át, hogy a munkavállalók a valós vészhelyzetben is tudják, mit kell tenniük, ezzel védve az emberi életeket és a vagyont." />
            <PillarCard icon={ScaleIcon} title="Minden Vállalkozásnak Kötelező" description="A jogszabályok előírják a rendszeres tűzvédelmi oktatást minden munkáltató számára. Az oktatás elmulasztása súlyos jogi és anyagi következményekkel jár." />
        </div>

        <section className="mb-20">
            <h2 className="text-3xl font-bold ${themeColors.base.darkText} mb-10 text-center">
                Miből épül fel egy tűzvédelmi oktatás?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-slate-100/70 p-6 rounded-lg border border-slate-200"><h4 className="font-bold text-lg text-slate-800 mb-2">Elméleti ismeretek</h4><p className="text-slate-600">A jogszabályi háttér, a tűz keletkezésének feltételei, a tűzveszélyességi osztályok és a munkahelyi tűzvédelmi szabályzat bemutatása.</p></div>
                <div className="bg-slate-100/70 p-6 rounded-lg border border-slate-200"><h4 className="font-bold text-lg text-slate-800 mb-2">Gyakorlati képzés</h4><p className="text-slate-600">A tűzoltó készülékek típusainak és helyes használatának bemutatása, a menekülési útvonalak bejárása és a menekülési terv átbeszélése.</p></div>
                <div className="bg-slate-100/70 p-6 rounded-lg border border-slate-200"><h4 className="font-bold text-lg text-slate-800 mb-2">Interaktív beszélgetés</h4><p className="text-slate-600">Hagyunk időt a felmerülő kérdések tisztázására, hogy minden munkatárs maximálisan felkészülten távozzon.</p></div>
                <div className="bg-slate-100/70 p-6 rounded-lg border border-slate-200"><h4 className="font-bold text-lg text-slate-800 mb-2">Sikeres teljesítés igazolása</h4><p className="text-slate-600">A képzés elvégzését írásos formában igazoljuk, amely megfelel a hatósági előírásoknak.</p></div>
            </div>
        </section>

        <section className="mb-20">
            <h2 className="text-3xl font-bold ${themeColors.base.darkText} mb-8 text-center">
                Mi ennek a jogi kötelezettsége?
            </h2>
            <div className={`${themeColors.primary.lightBg} border-l-8 ${themeColors.primary.border} p-8 rounded-xl text-red-900 shadow-xl relative overflow-hidden`}>
                <p className="mb-6 text-lg">
                    A tűzvédelmi oktatás elvégzését a <strong>2011. évi CXXVIII. törvény</strong> a tűz elleni védekezésről írja elő, és a <strong>2015. évi 54/2014. (XII. 5.) BM rendelet</strong> rögzíti annak pontos tartalmát és gyakoriságát.
                </p>
                <h4 className="font-bold text-xl mb-4 text-red-800">Az elmaradás komoly szankciókat vonhat maga után:</h4>
                <ul className="space-y-3">
                    <li className="flex items-start gap-3"><ExclamationTriangleIcon className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" /><span><strong>Hatósági bírság:</strong> A tűzvédelmi hatóság jelentős bírságot szabhat ki.</span></li>
                    <li className="flex items-start gap-3"><ExclamationTriangleIcon className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" /><span><strong>Felelősség növekedése:</strong> Tűzeset során, ha bebizonyosodik, hogy a munkavállaló nem kapott megfelelő oktatást, a cég jogi felelőssége nagy mértékben növekedhet.</span></li>
                    <li className="flex items-start gap-3"><ExclamationTriangleIcon className="w-6 h-6 text-red-500 mt-1 flex-shrink-0" /><span><strong>Munkatársak veszélyeztetése:</strong> A felkészületlen dolgozók veszélybe sodorhatják önmagukat és másokat.</span></li>
                </ul>
            </div>
        </section>
        
        <section className="mb-20">
            <h2 className="text-3xl font-bold ${themeColors.base.darkText} mb-12 text-center">
                Komplex Tűzvédelmi Oktatási Szolgáltatásaink
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <ServiceCard icon={AcademicCapIcon} title="Szakmailag felkészült oktatók" content="Tapasztalt tűzvédelmi szakembereink garantálják a színvonalas és érthető oktatást, a legújabb ismeretek átadásával." />
                <ServiceCard icon={MapPinIcon} title="Helyszíni, gyakorlati képzés" content="Igény szerint a helyszínen tartott, interaktív képzéseket tartunk, amelyek a maximális hatékonyság érdekében a valós környezetben zajlanak." />
                <ServiceCard icon={BookOpenIcon} title="Cégére szabott tematika" content="A tananyagot az Ön vállalkozásának profiljához és a munkahelyi környezethez igazítjuk, hogy a képzés releváns és hasznos legyen." />
                <ServiceCard icon={DocumentCheckIcon} title="Teljeskörű dokumentáció" content="Elkészítjük és átadjuk a hatóságok számára is elfogadható oktatási jegyzőkönyveket és igazolásokat, amelyekkel a cége jogszerűen működhet." />
            </div>
        </section>

        <div className="text-center mt-12 p-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl shadow-2xl">
          <h3 className="text-3xl font-bold text-white mb-4">Garantálja munkatársai felkészültségét!</h3>
          <p className="text-lg text-cyan-100 max-w-2xl mx-auto">
            Ne várjon a hatósági ellenőrzésig, tegye meg az első lépést a biztonság felé. Kérjen tőlünk egy ingyenes konzultációt, és gondoskodjon munkatársai megfelelő tűzvédelmi oktatásáról.
          </p>
          <div className="mt-8">
            <Link href="https://calendly.com/" target="_blank" rel="noopener noreferrer">
              <button
                className={`inline-flex items-center justify-center font-bold py-4 px-10 rounded-xl text-lg text-cyan-600 bg-white shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white/50 hover:scale-105`}
              >
                <CalendarDaysIcon className="w-6 h-6 mr-3" />
                Ingyenes Ajánlatkérést Kérek
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TuzvedelmiOktatasPage;