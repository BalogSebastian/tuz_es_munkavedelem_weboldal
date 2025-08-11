'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeftIcon,
  DocumentTextIcon, // Fő ikon
  CheckBadgeIcon, // Megelőzés
  ScaleIcon, // Jog
  ClipboardDocumentCheckIcon, // Feladatok
  ShieldExclamationIcon, // Kockázatértékelés
  UserGroupIcon, // Oktatás
  ExclamationTriangleIcon, // Figyelmeztetés
  CalendarDaysIcon,
  LightBulbIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';

// Az oldal stílusát meghatározó színséma
const accentColor = {
  text: 'text-cyan-500',
  bg: 'bg-cyan-500',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  border: 'border-cyan-500',
  lightBg: 'bg-slate-100',
  darkText: 'text-slate-900',
  lightText: 'text-slate-600',
  gridLines: 'border-slate-200/80',
  warningText: 'text-red-800',
  warningBg: 'bg-red-50',
  warningBorder: 'border-red-500'
};

const MunkavedelmiSzabalyzatPage = () => {
  const router = useRouter();

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');
        .timeline-connector::before {
          content: '';
          position: absolute;
          top: 2.5rem;
          left: 1.25rem; /* calc(1.25rem) */
          width: 2px;
          height: calc(100% - 2.5rem);
          background-color: #e2e8f0; /* slate-200 */
        }
        .timeline-item:last-child .timeline-connector::before {
          display: none;
        }
      `}</style>

      <div className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => router.back()}
            className={`inline-flex items-center justify-center p-3 rounded-full ${accentColor.bg} text-white shadow-lg ${accentColor.hoverBg} transition-all duration-300 mb-8 hover:scale-110 hover:shadow-cyan-500/40`}
            aria-label="Vissza az előző oldalra"
          >
            <ArrowLeftIcon className="w-6 h-6" />
          </button>

          <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-16">
            
            {/* Bal oldali, "ragadós" oszlop */}
            <aside className="lg:col-span-2 lg:sticky top-16 h-fit mb-12 lg:mb-0">
              <div className="p-6 bg-white rounded-xl shadow-md border border-slate-200">
                <div className={`p-4 mb-4 inline-block rounded-lg bg-slate-100 ${accentColor.text}`}>
                    <DocumentTextIcon className="w-8 h-8"/>
                </div>
                <h1 className="text-3xl font-extrabold text-slate-900 mb-4">
                  Munkavédelmi Szabályzat
                </h1>
                <p className="text-slate-600 leading-relaxed">
                  A munkavédelmi szabályzat egy olyan kötelező, írásos dokumentum, amely minden vállalkozás számára alapvető fontosságú. Célja, hogy részletesen meghatározza a munkavédelmi feladatokat, a felelősségi köröket és a munkavégzés biztonságos feltételeit.
                </p>
              </div>
            </aside>

            {/* Jobb oldali, görgethető tartalom */}
            <main className="lg:col-span-3 space-y-16">
              
              <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg border border-slate-200">
                        <CheckBadgeIcon className={`w-8 h-8 mb-3 ${accentColor.text}`} />
                        <h3 className="font-bold text-lg text-slate-800 mb-1">Rendszeres Ellenőrzés és Megelőzés</h3>
                        <p className="text-sm text-slate-600">Azonosítjuk a veszélyeket a munkahelyi környezetben, és javaslatot teszünk a kockázatok csökkentésére, ezzel megelőzve a baleseteket.</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg border border-slate-200">
                        <ScaleIcon className={`w-8 h-8 mb-3 ${accentColor.text}`} />
                        <h3 className="font-bold text-lg text-slate-800 mb-1">Minden Vállalkozásnak Kötelező</h3>
                        <p className="text-sm text-slate-600">A jogszabályok előírják a munkavédelmi szabályzat készítését és karbantartását minden olyan vállalkozás számára, ahol a foglalkoztatott munkavállalók száma indokolja.</p>
                    </div>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Miből épül fel egy munkavédelmi szabályzat?</h2>
                <div className="relative space-y-8">
                    {[
                        { icon: ClipboardDocumentCheckIcon, title: 'Munkavédelmi feladatok', content: 'A munkavédelmi felelősségi körök, a biztonságos munkavégzés követelményei és a munkahelyi higiéniai előírások részletes leírása.' },
                        { icon: ShieldExclamationIcon, title: 'Kockázatértékelés', content: 'A munkahelyi veszélyforrások (pl. gépek, vegyi anyagok, zaj) feltérképezése, a kockázatok értékelése és a szükséges megelőző intézkedések meghatározása.' },
                        { icon: CheckBadgeIcon, title: 'Egyéni védőeszközök', content: 'A munkakörökhöz rendelt kötelező egyéni védőeszközök (PPE) listája, azok beszerzési, használati és karbantartási szabályaival együtt.' },
                        { icon: UserGroupIcon, title: 'Oktatási tematikák és rend', content: 'A munkavédelmi oktatások menetének, tartalmának és a dolgozók oktatási naplójának vezetése.' }
                    ].map((item, index) => (
                        <div key={index} className="relative pl-14 timeline-item">
                            <div className="timeline-connector">
                                <div className={`absolute top-0 left-0 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 ring-4 ring-slate-50 z-10`}>
                                    <item.icon className={`w-6 h-6 ${accentColor.text}`} />
                                </div>
                            </div>
                            <div className="ml-4">
                                <h4 className="font-bold text-slate-800 text-lg">{item.title}</h4>
                                <p className="text-slate-600">{item.content}</p>
                            </div>
                        </div>
                    ))}
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Mi ennek a jogi kötelezettsége?</h2>
                <div className={`p-8 rounded-xl border-2 ${accentColor.warningBorder} ${accentColor.warningBg}`}>
                    <p className={`mb-6 ${accentColor.warningText}`}>
                        A munkavédelmi szabályzat elkészítését és folyamatos karbantartását a <strong>munkavédelemről szóló 1993. évi XCIII. törvény</strong> írja elő, amely egyértelműen meghatározza a munkáltatók jogait és kötelezettségeit. A szabályzat megléte és naprakészsége elengedhetetlen a hatósági ellenőrzéseken való megfeleléshez.
                    </p>
                    <h4 className="font-bold text-lg mb-3 text-slate-800">A jogi előírások figyelmen kívül hagyása súlyos következményekkel járhat:</h4>
                    <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2"><ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" /><span><strong>Pénzbírság:</strong> A munkavédelmi hatóság jelentős bírságot szabhat ki a hiányzó vagy elavult szabályzat miatt.</span></li>
                        <li className="flex items-start gap-2"><ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" /><span><strong>Baleset esetén felelősség:</strong> Munkabaleset során a cég jogi és anyagi felelőssége nagyban nőhet a megfelelő szabályzat vagy a hiányos munkavédelem miatt.</span></li>
                        <li className="flex items-start gap-2"><ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" /><span><strong>Működés felfüggesztése:</strong> Súlyos mulasztások esetén a hatóság felfüggesztheti a cég tevékenységét.</span></li>
                    </ul>
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Komplex Munkavédelmi Szolgáltatásaink</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-lg border border-slate-200"><div className={`mb-3 w-fit p-3 rounded-md ${accentColor.lightBg} ${accentColor.text}`}><DocumentTextIcon className="w-6 h-6"/></div><h4 className="font-bold mb-1">Munkavédelmi Szabályzat Készítése</h4><p className="text-sm text-slate-600">Szakértelemmel állítjuk össze vállalkozása egyedi munkavédelmi szabályzatát, amely teljes mértékben megfelel a jogszabályoknak.</p></div>
                    <div className="bg-white p-6 rounded-lg border border-slate-200"><div className={`mb-3 w-fit p-3 rounded-md ${accentColor.lightBg} ${accentColor.text}`}><MagnifyingGlassIcon className="w-6 h-6"/></div><h4 className="font-bold mb-1">Szabályzat Felülvizsgálata</h4><p className="text-sm text-slate-600">Gondoskodunk a jogszabályban előírt felülvizsgálatokról, hogy a dokumentációja mindig naprakész és érvényes legyen.</p></div>
                    <div className="bg-white p-6 rounded-lg border border-slate-200"><div className={`mb-3 w-fit p-3 rounded-md ${accentColor.lightBg} ${accentColor.text}`}><ShieldExclamationIcon className="w-6 h-6"/></div><h4 className="font-bold mb-1">Kockázatértékelés</h4><p className="text-sm text-slate-600">Elkészítjük a kockázatértékelést és beépítjük a szabályzatba, ezzel garantálva a dokumentumok egységességét és a biztonságos munkavégzést.</p></div>
                    <div className="bg-white p-6 rounded-lg border border-slate-200"><div className={`mb-3 w-fit p-3 rounded-md ${accentColor.lightBg} ${accentColor.text}`}><LightBulbIcon className="w-6 h-6"/></div><h4 className="font-bold mb-1">Szaktanácsadás és Támogatás</h4><p className="text-sm text-slate-600">Folyamatos szakmai támogatást nyújtunk a munkavédelemmel kapcsolatos kérdésekben, segítünk a jogszabályi bizonytalanságok tisztázásában.</p></div>
                </div>
              </section>

              <div className="text-center mt-12 p-8 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-lg shadow-2xl">
                <h3 className="text-2xl font-bold text-white mb-3">Gondoskodjon munkatársai biztonságáról és cége jogszerű működéséről!</h3>
                <p className="text-lg text-cyan-100 max-w-2xl mx-auto">
                  Ne kockáztasson! Keressen minket egy ingyenes konzultációért, hogy átbeszéljük az Ön egyedi munkavédelmi igényeit és elkészítsük a szabályzatot.
                </p>
                <div className="mt-8">
                  <Link href="https://calendly.com/" target="_blank" rel="noopener noreferrer">
                    <button
                      className={`inline-flex items-center justify-center font-bold py-3 px-8 rounded-lg text-lg text-cyan-600 bg-white shadow-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 focus:ring-white/50 hover:scale-105`}
                    >
                      <CalendarDaysIcon className="w-6 h-6 mr-3" />
                      Ingyenes Konzultációt Foglalok
                    </button>
                  </Link>
                </div>
              </div>

            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default MunkavedelmiSzabalyzatPage;