'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  BoltIcon,
  ShieldCheckIcon,
  ScaleIcon,
  EyeIcon,
  BeakerIcon,
  DocumentChartBarIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  LightBulbIcon,
  ClockIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';

// Új, kontrasztos, sárga-sötét témájú színséma
const themeColors = {
  pageBg: 'bg-slate-900',
  containerBg: 'bg-slate-800/60',
  cardBg: 'bg-slate-800',
  border: 'border-slate-700',
  
  primary: {
    text: 'text-amber-400',
    glow: 'shadow-amber-500/30',
    border: 'border-amber-500',
  },
  
  text: {
    heading: 'text-white',
    body: 'text-slate-300', // Világosabb a jobb kontrasztért
    subtle: 'text-slate-400',
  },

  cta: {
    bg: 'bg-cyan-500',
    hoverBg: 'hover:bg-cyan-600',
    ring: 'focus:ring-cyan-500',
    text: 'text-white',
    glow: 'shadow-cyan-500/40'
  },
  
  warning: {
    bg: 'bg-red-900/30',
    border: 'border-red-500/50',
    text: 'text-red-300',
  }
};

const VbfPage = () => {
  const router = useRouter();

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');
        .circuit-bg {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ca8a04' fill-opacity='0.04'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
        }
      `}</style>

      <div className={`min-h-screen ${themeColors.pageBg} font-['Poppins',_sans-serif] py-16 px-4 sm:px-6 lg:px-8 circuit-bg`}>
        <div className={`max-w-6xl mx-auto ${themeColors.containerBg} backdrop-blur-xl rounded-2xl shadow-2xl p-8 sm:p-12 border ${themeColors.border}`}>
          
          <button
            onClick={() => router.back()}
            className={`inline-flex items-center justify-center p-3 rounded-full ${themeColors.cta.bg} ${themeColors.cta.text} shadow-lg ${themeColors.cta.hoverBg} transition-all duration-300 mb-8 hover:scale-110 ${themeColors.cta.glow}`}
            aria-label="Vissza az előző oldalra"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>

          {/* Címsor és bevezető */}
          <section className="text-center mb-16">
            <div className={`inline-block p-4 rounded-full bg-amber-400/10 ${themeColors.primary.text} mb-4 shadow-lg ${themeColors.primary.glow}`}>
              <BoltIcon className="w-10 h-10" />
            </div>
            <h1 className={`text-4xl sm:text-5xl font-extrabold ${themeColors.text.heading} mb-4`}>
              Villamos Biztonsági Felülvizsgálat
            </h1>
            <p className={`text-lg ${themeColors.text.body} max-w-4xl mx-auto`}>
              A villamos biztonsági felülvizsgálat (VBF), vagy köznyelvben érintésvédelmi felülvizsgálat, egy kötelezően elvégzendő, szisztematikus ellenőrzés. Célja a villamos berendezések, gépek és hálózatok hibáinak felderítése, hogy megelőzzük az áramütéses baleseteket és a tűzeseteket.
            </p>
          </section>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
              <div className={`${themeColors.cardBg} p-6 rounded-lg border ${themeColors.border} flex items-start gap-5`}>
                  <div className={`p-3 rounded-lg ${themeColors.primary.text} bg-slate-700 flex-shrink-0`}><ShieldCheckIcon className="w-8 h-8"/></div>
                  <div>
                      <h3 className={`text-xl font-bold ${themeColors.text.heading} mb-1`}>Rendszeres Ellenőrzés és Megelőzés</h3>
                      <p className={themeColors.text.body}>Azonosítjuk a veszélyeket a villamos hálózatban és a berendezésekben, így időben elkerülhetők a zárlatok, túlmelegedések és áramütéses balesetek.</p>
                  </div>
              </div>
              <div className={`${themeColors.cardBg} p-6 rounded-lg border ${themeColors.border} flex items-start gap-5`}>
                  <div className={`p-3 rounded-lg ${themeColors.primary.text} bg-slate-700 flex-shrink-0`}><ScaleIcon className="w-8 h-8"/></div>
                  <div>
                      <h3 className={`text-xl font-bold ${themeColors.text.heading} mb-1`}>Minden Vállalkozásnak Kötelező</h3>
                      <p className={themeColors.text.body}>Legyen szó irodaházról, üzlethelyiségről, gyártócsarnokról, vagy bármilyen, villamos energiát használó helyről, a rendszeres VBF elvégzése jogszabályi kötelezettség.</p>
                  </div>
              </div>
          </div>

          {/* Miből épül fel? */}
          <section className="mb-20">
              <h2 className={`text-3xl font-bold ${themeColors.text.heading} mb-10 text-center`}>
                  Miből épül fel egy Villamos Biztonsági Felülvizsgálat?
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div className={`${themeColors.cardBg} p-8 rounded-xl border ${themeColors.border} shadow-lg`}>
                      <EyeIcon className={`w-10 h-10 mx-auto mb-4 ${themeColors.primary.text}`}/>
                      <h4 className={`font-bold text-lg ${themeColors.text.heading} mb-2`}>Szemrevételezés</h4>
                      <p className={`${themeColors.text.subtle} text-sm`}>Vizsgáljuk a villamos hálózat és berendezések látható állapotát, ellenőrizzük a sérüléseket és a szabályos telepítést.</p>
                  </div>
                  <div className={`${themeColors.cardBg} p-8 rounded-xl border ${themeColors.border} shadow-lg`}>
                      <BeakerIcon className={`w-10 h-10 mx-auto mb-4 ${themeColors.primary.text}`}/>
                      <h4 className={`font-bold text-lg ${themeColors.text.heading} mb-2`}>Mérések elvégzése</h4>
                      <p className={`${themeColors.text.subtle} text-sm`}>Speciális, kalibrált műszerekkel elvégezzük az érintésvédelemre, a szigetelési ellenállásra és más elektromos paraméterekre vonatkozó méréseket.</p>
                  </div>
                  <div className={`${themeColors.cardBg} p-8 rounded-xl border ${themeColors.border} shadow-lg`}>
                      <DocumentChartBarIcon className={`w-10 h-10 mx-auto mb-4 ${themeColors.primary.text}`}/>
                      <h4 className={`font-bold text-lg ${themeColors.text.heading} mb-2`}>Minősítő irat kiállítása</h4>
                      <p className={`${themeColors.text.subtle} text-sm`}>A vizsgálatról részletes jegyzőkönyvet készítünk, amely tartalmazza a felülvizsgálat eredményeit és a szükséges intézkedéseket.</p>
                  </div>
              </div>
          </section>

          {/* Jogi kötelezettség */}
          <section className="mb-20">
              <h2 className={`text-3xl font-bold ${themeColors.text.heading} mb-8 text-center`}>
                  Mi ennek a jogi kötelezettsége?
              </h2>
              <div className={`${themeColors.warning.bg} border-l-8 ${themeColors.warning.border} p-8 rounded-xl ${themeColors.warning.text} shadow-lg`}>
                  <p className="mb-6 text-lg">
                      A felülvizsgálat elvégzését a <strong>40/2017. (XII. 4.) NGM rendelet</strong> és a <strong>2016. évi CLXXXIX. törvény</strong> a villamos energiáról írja elő. A felülvizsgálat gyakorisága a munkahelyi környezettől és a berendezések típusától függ, de elmulasztása súlyos következményekkel jár:
                  </p>
                  <ul className="space-y-3">
                      <li className="flex items-start gap-3"><ExclamationTriangleIcon className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" /><span><strong>Pénzbírság:</strong> A munkavédelmi és a tűzvédelmi hatóság is bírságot szabhat ki.</span></li>
                      <li className="flex items-start gap-3"><ExclamationTriangleIcon className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" /><span><strong>Tűz- és balesetveszély:</strong> A fel nem tárt hibák áramütéshez vagy elektromos tűzesethez vezethetnek.</span></li>
                      <li className="flex items-start gap-3"><ExclamationTriangleIcon className="w-6 h-6 text-red-400 mt-1 flex-shrink-0" /><span><strong>Biztosítási fedezet hiánya:</strong> Káresemény esetén a biztosító megtagadhatja a kifizetést, ha a megfelelő jegyzőkönyvek nem állnak rendelkezésre.</span></li>
                  </ul>
              </div>
          </section>
          
          {/* Így csináljuk mi */}
          <section className="mb-20">
              <h2 className={`text-3xl font-bold ${themeColors.text.heading} mb-12 text-center`}>
                  Így csináljuk mi:
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  <div className={`${themeColors.cardBg} p-6 rounded-lg border ${themeColors.border} relative`}><span className={`font-bold text-5xl ${themeColors.primary.text} opacity-10 absolute top-4 right-6`}>1</span><h4 className={`font-bold text-lg ${themeColors.text.heading} mb-2`}>Villamos Biztonsági Felülvizsgálat</h4><p className={`text-sm ${themeColors.text.body}`}>Szakértőink elvégzik a teljeskörű vizsgálatot, kiállítva a jogszabályoknak megfelelő minősítő iratot.</p></div>
                  <div className={`${themeColors.cardBg} p-6 rounded-lg border ${themeColors.border} relative`}><span className={`font-bold text-5xl ${themeColors.primary.text} opacity-10 absolute top-4 right-6`}>2</span><h4 className={`font-bold text-lg ${themeColors.text.heading} mb-2`}>Hibafeltárás és Javítási Javaslat</h4><p className={`text-sm ${themeColors.text.body}`}>A felülvizsgálat során feltárjuk a hibákat és javaslatot teszünk azok szakszerű javítására.</p></div>
                  <div className={`${themeColors.cardBg} p-6 rounded-lg border ${themeColors.border} relative`}><span className={`font-bold text-5xl ${themeColors.primary.text} opacity-10 absolute top-4 right-6`}>3</span><h4 className={`font-bold text-lg ${themeColors.text.heading} mb-2`}>Szaktanácsadás és Dokumentáció</h4><p className={`text-sm ${themeColors.text.body}`}>Azonnal átadjuk a hatósági ellenőrzéseken is érvényes dokumentációt, és tanácsot adunk.</p></div>
                  <div className={`${themeColors.cardBg} p-6 rounded-lg border ${themeColors.border} relative`}><span className={`font-bold text-5xl ${themeColors.primary.text} opacity-10 absolute top-4 right-6`}>4</span><h4 className={`font-bold text-lg ${themeColors.text.heading} mb-2`}>Időszakos Ellenőrzések</h4><p className={`text-sm ${themeColors.text.body}`}>Gondoskodunk a jogszabályban előírt gyakoriságú időszakos felülvizsgálatokról.</p></div>
              </div>
          </section>

          {/* CTA */}
          <div className={`text-center mt-12 p-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl shadow-2xl`}>
            <h3 className="text-3xl font-bold text-white mb-4">Garantálja vállalkozása villamos biztonságát!</h3>
            <p className="text-lg text-cyan-100 max-w-2xl mx-auto">
              Ne bízza a véletlenre az elektromos rendszerei biztonságát! Foglaljon egy ingyenes konzultációt, hogy felmérhessük az igényeit és a felülvizsgálatok szükségességét.
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
    </>
  );
};

export default VbfPage;