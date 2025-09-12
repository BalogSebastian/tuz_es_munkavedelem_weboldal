'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  ArrowLeftIcon,
  ShieldExclamationIcon,
  MagnifyingGlassCircleIcon,
  ScaleIcon,
  MapIcon,
  UserIcon,
  ClipboardDocumentListIcon,
  LinkIcon,
  DocumentTextIcon,
  CalendarDaysIcon,
  WrenchScrewdriverIcon,
  LifebuoyIcon,
  FolderOpenIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';
import { SparklesIcon } from '@heroicons/react/24/solid';

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

// Gomb stílusdefiníciók
const ACCENT_COLOR_RED = {
    baseHex: '#DC2626',
    bg: 'bg-red-600',
    textOnAccent: 'text-white',
    ring: 'focus-visible:ring-red-500',
    shadow: 'shadow-red-500/40',
    hoverShadow: 'hover:shadow-red-400/60',
};

const MunkahelyiBalesetPage = () => {
  const router = useRouter();
  const strongClass = "font-bold text-slate-900";

  return (
    <>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;800&display=swap');
        .grid-bg {
          background-color: #f8fafc;
          background-image:
            linear-gradient(${accentColor.gridLines} 1px, transparent 1px),
            linear-gradient(to right, ${accentColor.gridLines} 1px, transparent 1px);
          background-size: 3rem 3rem;
        }
        .step-connector::after {
          content: '';
          position: absolute;
          top: 2rem;
          left: 2rem;
          height: calc(100% - 2rem);
          width: 2px;
          background: ${'#e2e8f0'}; /* slate-200 */
          z-index: 0;
        }
        .step-item:last-child .step-connector::after {
          display: none;
        }
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

      <div className="min-h-screen bg-slate-50 font-['Poppins',_sans_serif] py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">

          <main className="grid-bg p-8 sm:p-12 rounded-2xl shadow-2xl border border-slate-200/80">
            {/* Felső szekció: Cím és bevezető */}
            <section className="text-center border-b border-slate-200 pb-10 mb-10">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 mb-4">
                Munkahelyi Baleset <span className={accentColor.text}>Kivizsgálás</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-4xl mx-auto">
                A munkahelyi baleset olyan sérüléssel járó esemény, amely a munkavégzéssel összefüggésben, a munkavállalót éri. Ilyenkor a munkáltató első és legfontosabb feladata a sérült ellátásán túl a baleset <strong className={strongClass}>szakszerű és jogszabályi előírásoknak megfelelő kivizsgálása</strong>. Ennek célja, hogy feltárja a baleset okait, megelőzze a hasonló esetek jövőbeli bekövetkezését, és megállapítsa a munkáltatói felelősséget. A kivizsgálás nem csupán jogi kötelezettség, hanem alapvető fontosságú a munkahelyi biztonság fenntartásához és a cég jogi védelméhez.
              </p>
            </section>

            {/* Fő tartalmi rész - most már teljes szélességben */}
            <div className="space-y-10">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-lg border border-slate-200 flex items-start gap-5">
                      <div className={`p-3 rounded-lg ${accentColor.text} bg-slate-100 flex-shrink-0`}><MagnifyingGlassCircleIcon className="w-8 h-8"/></div>
                      <div>
                          <h3 className="text-xl font-bold text-slate-800 mb-1">Tényfeltárás és Megelőzés</h3>
                          <p className="text-slate-600 text-sm">Felderítjük a baleset pontos okait, legyen szó technikai, szervezési vagy emberi <strong className={strongClass}>tényezőről</strong>, hogy elkerülhetővé váljanak a jövőbeni esetek.</p>
                      </div>
                  </div>
                  <div className="bg-white p-6 rounded-lg border border-slate-200 flex items-start gap-5">
                      <div className={`p-3 rounded-lg ${accentColor.text} bg-slate-100 flex-shrink-0`}><ScaleIcon className="w-8 h-8"/></div>
                      <div>
                         <h3 className="text-xl font-bold text-slate-800 mb-1">Komplex Jogi Kötelezettség</h3>
                          <p className="text-slate-600 text-sm">A baleset kivizsgálása szigorú jogi eljárás, amelynek elmulasztása vagy szakszerűtlen végrehajtása súlyos következményekkel járhat.</p>
                      </div>
                  </div>
              </div>

              <section>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Miből áll egy munkahelyi baleset kivizsgálása?</h2>
                <div className="space-y-4">
                  {[
                    { icon: MapIcon, title: 'Helyszíni szemle', content: 'A baleset helyszínének felmérése, a körülmények rögzítése, fényképek és rajzok készítése.' },
                    { icon: UserIcon, title: 'Személyi sérülések dokumentálása', content: 'Az orvosi dokumentációk és a tanúvallomások beszerzése, a sérült állapotának pontos rögzítése.' },
                    { icon: ClipboardDocumentListIcon, title: 'Adatgyűjtés és elemzés', content: 'A baleseti jegyzőkönyv felvétele, a munkavédelmi oktatási jegyzőkönyvek, a kockázatértékelés és a gépekkel kapcsolatos dokumentumok átvizsgálása.' },
                    { icon: LinkIcon, title: 'Ok-okozati összefüggés feltárása', content: 'Szakértői vélemény alapján a baleset közvetlen és közvetett okainak megállapítása.' },
                    { icon: DocumentTextIcon, title: 'Jegyzőkönyv elkészítése', content: 'A baleset kivizsgálásáról egy hivatalos, hiteles jegyzőkönyv elkészítése, amely a hatóságok számára is elfogadható.' }
                  ].map((step, index) => (
                    <div key={index} className="relative pl-12 step-item">
                      <div className="step-connector">
                        <div className={`absolute top-0 left-0 w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 border-2 ${accentColor.gridLines} z-10`}>
                          <step.icon className={`w-6 h-6 ${accentColor.text}`} />
                        </div>
                      </div>
                      <div className="bg-white p-5 rounded-lg border border-slate-200 ml-2">
                        <h4 className="font-bold text-slate-800">{step.title}</h4>
                        <p className="text-sm text-slate-600">{step.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-3xl font-bold text-slate-900 mb-6">Komplex Munkahelyi Baleset Kivizsgálási Szolgáltatásaink</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white p-6 rounded-lg border border-slate-200"><div className={`mb-3 w-fit p-3 rounded-md ${accentColor.lightBg} ${accentColor.text}`}><WrenchScrewdriverIcon className="w-6 h-6"/></div><h4 className="font-bold text-slate-900 mb-1">Teljeskörű Kivizsgálás</h4><p className="text-sm text-slate-600">Szakértőink elvégzik a baleset teljes körű <strong className={strongClass}>kivizsgálását</strong>, és elkészítik a jogszabályoknak megfelelő baleseti jegyzőkönyvet.</p></div>
                  <div className="bg-white p-6 rounded-lg border border-slate-200"><div className={`mb-3 w-fit p-3 rounded-md ${accentColor.lightBg} ${accentColor.text}`}><LifebuoyIcon className="w-6 h-6"/></div><h4 className="font-bold text-slate-900 mb-1">Helyszíni Segítségnyújtás</h4><p className="text-sm text-slate-600">Azonnal a helyszínre megyünk, hogy <strong className={strongClass}>szakszerűen</strong> rögzítsük a baleset körülményeit, ezzel elkerülve a bizonyítékok elvesztését vagy elmozdítását.</p></div>
                  <div className="bg-white p-6 rounded-lg border border-slate-200"><div className={`mb-3 w-fit p-3 rounded-md ${accentColor.lightBg} ${accentColor.text}`}><FolderOpenIcon className="w-6 h-6"/></div><h4 className="font-bold text-slate-900 mb-1">Dokumentumok Rendszerezése</h4><p className="text-sm text-slate-600">Segítünk az összes szükséges <strong className={strongClass}>dokumentum</strong> (orvosi papírok, oktatási jegyzőkönyvek, kockázatértékelés) rendszerezésében és a bejelentési kötelezettségek teljesítésében.</p></div>
                  <div className="bg-white p-6 rounded-lg border border-slate-200"><div className={`mb-3 w-fit p-3 rounded-md ${accentColor.lightBg} ${accentColor.text}`}><LightBulbIcon className="w-6 h-6"/></div><h4 className="font-bold text-slate-900 mb-1">Szaktanácsadás és Támogatás</h4><p className="text-sm text-slate-600">A baleset kivizsgálása <strong className={strongClass}>után</strong> tanácsot adunk a megelőző intézkedések bevezetésére, hogy hasonló esetek ne fordulhassanak elő.</p></div>
                </div>
              </section>

            </div>

            {/* --- Teljes szélességű lezáró szekció --- */}
            <section className="mt-16 pt-10 border-t border-slate-200">
                <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
                    Jogi Kötelezettség
                </h2>
                <div className={`p-8 rounded-lg border-l-8 ${accentColor.warningBorder} ${accentColor.warningBg} max-w-4xl mx-auto shadow-lg`}>
                    <p className={`mb-4 ${accentColor.warningText}`}>
                        A munkahelyi balesetek bejelentését és kivizsgálását a <strong className={strongClass}>munkavédelemről szóló 1993. évi XCIII. törvény</strong> és a <strong className={strongClass}>33/1998. (VI. 24.) NM rendelet</strong> írja elő. A kivizsgálási eljárás határideje a baleset bejelentésétől számított 8 nap, súlyos baleset esetén pedig azonnal értesíteni kell a hatóságot.
                    </p>
                    <h4 className="font-bold text-lg mb-3 text-slate-800">A szakszerűtlen kivizsgálás vagy annak elmulasztása súlyos következményekkel járhat:</h4>
                    <ul className="list-disc list-inside space-y-2 text-slate-700">
                        <li><strong className={strongClass}>Hatósági bírság:</strong> A munkavédelmi hatóság jelentős bírságot szabhat ki a hiányos vagy nem megfelelő kivizsgálás miatt.</li>
                        <li><strong className={strongClass}>Jogi felelősség:</strong> A munkáltatót polgári jogi és büntetőjogi felelősség is terhelheti, ha a baleset a munkavédelmi szabályok megszegése miatt következett be.</li>
                        <li><strong className={strongClass}>Kártérítési kötelezettség:</strong> A munkáltatónak a sérült felé kártérítési felelőssége van, amelynek összege jelentősen <strong className={strongClass}>megnövekedhet</strong> egy hibásan lefolytatott eljárás miatt.</li>
                    </ul>
                </div>
                <div className="text-center mt-12 mb-8">
                    <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" target="_blank" rel="noopener noreferrer">
                        <button
                            className={`
                                inline-flex items-center gap-3
                                ${ACCENT_COLOR_RED.bg} ${ACCENT_COLOR_RED.textOnAccent}
                                font-bold py-8 px-12 rounded-xl text-3xl
                                shadow-lg ${ACCENT_COLOR_RED.shadow} ${ACCENT_COLOR_RED.hoverShadow}
                                transition-all duration-300 ease-in-out
                                focus:outline-none focus:ring-4 ${ACCENT_COLOR_RED.ring} focus:ring-offset-2 focus:ring-offset-slate-50
                                cta-button
                            `}
                        >
                            Foglalj egy ingyenes konzultációt!
                        </button>
                    </Link>
                </div>
            </section>
          </main>
        </div>
      </div>
    </>
  );
};

export default MunkahelyiBalesetPage;