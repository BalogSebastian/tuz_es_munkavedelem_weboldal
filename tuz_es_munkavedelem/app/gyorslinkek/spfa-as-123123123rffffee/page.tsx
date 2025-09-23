'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  DocumentTextIcon,
  CheckBadgeIcon,
  ScaleIcon,
  ClipboardDocumentCheckIcon,
  ShieldExclamationIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
  CalendarDaysIcon,
  LightBulbIcon,
  MagnifyingGlassIcon
} from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';

// Az oldal stílusát meghatározó színséma
const accentColor = {
  text: 'text-black',
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

// Gomb stílusdefiníciók
const ACCENT_COLOR_RED = {
    baseHex: '#DC2626',
    bg: 'bg-red-600',
    textOnAccent: 'text-white',
    ring: 'focus-visible:ring-red-500',
    shadow: 'shadow-red-500/40',
    hoverShadow: 'hover:shadow-red-400/60',
};

const MunkavedelmiSzabalyzatPage = () => {
  const router = useRouter();
  const strongClass = "font-bold text-slate-800";

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');
        .timeline-connector::before {
          content: '';
          position: absolute;
          top: 2.5rem;
          left: 1.25rem;
          width: 2px;
          height: calc(100% - 2.5rem);
          background-color: #e2e8f0;
        }
        .timeline-item:last-child .timeline-connector::before {
          display: none;
        }
      `}</style>

      <div className="min-h-screen bg-slate-50 font-['Poppins',_sans_serif] py-16 px-4 sm:px-6 lg:px-8">
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
        <div className="max-w-7xl mx-auto">

          <div className="grid grid-cols-1 lg:grid-cols-5 lg:gap-16">
            
            {/* Bal oldali, "ragadós" oszlop */}
            <aside className="lg:col-span-2 lg:sticky top-16 h-fit mb-12 lg:mb-0">
              <div className="p-6 bg-white rounded-xl shadow-md border border-slate-200">
                <div className={`p-4 mb-4 inline-block rounded-lg bg-slate-100 ${accentColor.text}`}>
                    <DocumentTextIcon className="w-8 h-8"/>
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">
                  Mi az a Munkavédelmi Szabályzat?
                </h1>
                <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                  A munkavédelmi szabályzat egy olyan kötelező, írásos dokumentum, amely minden vállalkozás számára alapvető fontosságú. Célja, hogy részletesen meghatározza a munkavédelmi feladatokat, a felelősségi köröket és a munkavégzés biztonságos feltételeit. A szabályzatban rögzített előírások segítenek a munkabalesetek és a foglalkozási megbetegedések megelőzésében, ezzel védve a dolgozók egészségét és testi épségét. A dokumentum elkészítése nem csupán jogszabályi előírás, hanem a <strong className={strongClass}>biztonságtudatos</strong> és felelős cégvezetés elengedhetetlen eszköze.
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
                        A munkavédelmi szabályzat elkészítését és folyamatos karbantartását a <strong className={strongClass}>munkavédelemről szóló 1993. évi XCIII. törvény</strong> írja elő, amely egyértelműen meghatározza a munkáltatók jogait és kötelezettségeit. A szabályzat megléte és naprakészsége elengedhetetlen a hatósági ellenőrzéseken való megfeleléshez.
                    </p>
                    <h4 className="font-bold text-lg mb-3 text-slate-800">A jogi előírások figyelmen kívül hagyása súlyos következményekkel járhat:</h4>
                    <ul className="space-y-2 text-slate-700">
                        <li className="flex items-start gap-2"><ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" /><span className="text-sm sm:text-base"><strong className={strongClass}>Pénzbírság:</strong> A munkavédelmi hatóság jelentős bírságot szabhat ki a hiányzó vagy elavult szabályzat miatt.</span></li>
                        <li className="flex items-start gap-2"><ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" /><span className="text-sm sm:text-base"><strong className={strongClass}>Baleset esetén felelősség:</strong> Munkabaleset során a cég jogi és anyagi felelőssége nagyban nőhet a megfelelő szabályzat vagy a hiányos munkavédelem miatt.</span></li>
                        <li className="flex items-start gap-2"><ExclamationTriangleIcon className="w-5 h-5 text-red-500 mt-1 flex-shrink-0" /><span className="text-sm sm:text-base"><strong className={strongClass}>Működés felfüggesztése:</strong> Súlyos mulasztások esetén a hatóság felfüggesztheti a cég tevékenységét.</span></li>
                    </ul>
                </div>
              </section>

             {/* --- FELJAVÍTOTT SZOLGÁLTATÁSOK SZEKCIÓ --- */}
             <section>
                <h2 className="text-3xl font-bold text-slate-900 mb-8">Komplex Munkavédelmi Szolgáltatásaink</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    
                    {/* 1. Kártya */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-cyan-300 h-full flex flex-col">
                        <div className={`mb-4 w-fit p-3 rounded-lg bg-slate-100 ${accentColor.text}`}>
                            <DocumentTextIcon className="w-7 h-7"/>
                        </div>
                        <h4 className={`text-lg font-bold mb-2 ${accentColor.text}`}>Munkavédelmi Szabályzat Készítése</h4>
                        <p className={`text-sm ${accentColor.lightText} flex-grow`}>Szakértelemmel állítjuk össze vállalkozása egyedi munkavédelmi szabályzatát, amely teljes mértékben megfelel a jogszabályoknak.</p>
                    </div>

                    {/* 2. Kártya */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-cyan-300 h-full flex flex-col">
                        <div className={`mb-4 w-fit p-3 rounded-lg bg-slate-100 ${accentColor.text}`}>
                            <MagnifyingGlassIcon className="w-7 h-7"/>
                        </div>
                        <h4 className={`text-lg font-bold mb-2 ${accentColor.text}`}>Szabályzat Felülvizsgálata</h4>
                        <p className={`text-sm ${accentColor.lightText} flex-grow`}>Gondoskodunk a jogszabályban előírt felülvizsgálatokról, hogy a dokumentációja mindig naprakész és érvényes legyen.</p>
                    </div>

                    {/* 3. Kártya */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-cyan-300 h-full flex flex-col">
                        <div className={`mb-4 w-fit p-3 rounded-lg bg-slate-100 ${accentColor.text}`}>
                            <ShieldExclamationIcon className="w-7 h-7"/>
                        </div>
                        <h4 className={`text-lg font-bold mb-2 ${accentColor.text}`}>Kockázatértékelés</h4>
                        <p className={`text-sm ${accentColor.lightText} flex-grow`}>Elkészítjük a kockázatértékelést és beépítjük a szabályzatba, ezzel garantálva a dokumentumok egységességét és a biztonságos munkavégzést.</p>
                    </div>

                    {/* 4. Kártya */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200/90 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-cyan-300 h-full flex flex-col">
                        <div className={`mb-4 w-fit p-3 rounded-lg bg-slate-100 ${accentColor.text}`}>
                            <LightBulbIcon className="w-7 h-7"/>
                        </div>
                        <h4 className={`text-lg font-bold mb-2 ${accentColor.text}`}>Szaktanácsadás és Támogatás</h4>
                        <p className={`text-sm ${accentColor.lightText} flex-grow`}>Folyamatos szakmai támogatást nyújtunk a munkavédelemmel kapcsolatos kérdésekben, segítünk a jogszabályi bizonytalanságok tisztázásában.</p>
                    </div>
                </div>
              </section>

              {/* --- MÓDOSÍTOTT CTA SZEKCIÓ --- */}
              <div className="text-center mt-12 mb-8 p-4 sm:p-8">
                <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" target="_blank" rel="noopener noreferrer">
                  <button
                    className={`
                        inline-flex items-center justify-center gap-2
                        ${ACCENT_COLOR_RED.bg} ${ACCENT_COLOR_RED.textOnAccent}
                        font-bold py-8 px-10 sm:py-6 sm:px-10 lg:py-8 lg:px-12 rounded-xl text-xl sm:text-xl lg:text-3xl
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

            </main>
          </div>
        </div>
      </div>
    </>
  );
};

export default MunkavedelmiSzabalyzatPage;