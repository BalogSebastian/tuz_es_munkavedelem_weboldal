'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { SparklesIcon, ChevronDownIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import {
    ChatBubbleLeftRightIcon,
    DocumentCheckIcon,
    WrenchScrewdriverIcon,
    CreditCardIcon,
} from '@heroicons/react/24/outline';
import { IoArrowUndoSharp, IoArrowRedo } from "react-icons/io5";

// --- STÍLUS ÉS KOMPONENS DEFINÍCIÓK ---
const BlueprintCorner: React.FC<{ className?: string }> = ({ className }) => {
    return (
        <svg
            className={className} width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="0" cy="0" r="5" fill="currentColor"/>
        </svg>
    );
};

const ACCENT_COLOR_CYAN = {
    base: '#03BABE', bg: 'bg-[#03BABE]', text: 'text-[#03BABE]', hoverBg: 'hover:bg-cyan-600', ring: 'focus:ring-cyan-500', shadow: 'shadow-cyan-500/40', hoverShadow: 'hover:shadow-cyan-400/60', focusRingOffset: 'focus:ring-offset-slate-50', textGradient: 'from-cyan-300 to-sky-400'
};

const ACCENT_COLOR_RED = {
    baseHex: '#DC2626',
    bg: 'bg-red-600',
    textOnAccent: 'text-white',
    ring: 'focus-visible:ring-red-500',
    shadow: 'shadow-red-500/40',
    hoverShadow: 'hover:shadow-red-400/60',
};

const steps = [
    {
        step: 1,
        icon: ChatBubbleLeftRightIcon,
        title: "Konzultáció és Igényfelmérés",
        description: "Részletesen átbeszéljük vállalkozás specifikus igényeit, céljait és a vonatkozó jogszabályi követelményeket."
    },
    {
        step: 2,
        icon: DocumentCheckIcon,
        title: "Szerződéskötés",
        description: "Az egyeztetettek alapján mi elkészítjük a hivatalos megállapodást, amely rögzíti a vállalt szolgáltatásokat és feltételeket."
    },
    {
        step: 3,
        icon: WrenchScrewdriverIcon,
        title: "A Munka Kivitelezése",
        description: "Szakértő csapatunk precízen és a megbeszélt ütemezés szerint elvégzi a szerződésben foglalt feladatokat."
    },
    {
        step: 4,
        icon: CreditCardIcon,
        title: "Fizetés és Utánkövetés",
        description: "A munka sikeres teljesítése és átadása után történik a díjazás. A későbbiekben pedig minden jogszabály módosításról informálunk, és minden határidőről értesítünk."
    }
];

const faqItems = [
    { question: "Milyen gyakran kell munkavédelmi oktatást tartani?", answer: "A munkavédelmi oktatást munkába álláskor, munkahely vagy munkakör megváltozásakor, valamint legalább évente ismétlődően meg kell tartani. Bizonyos esetekben (pl. technológia változás) soron kívüli oktatás is szükséges lehet.", isImportant: false },
    { question: "Kötelező minden vállalkozásnak tűzvédelmi szabályzatot készíteni?", answer: "Nem minden esetben. Tűzvédelmi szabályzatot kell készíteni, ha a munkavállalók létszáma meghaladja az 5 főt, vagy ha 50 főnél több személy befogadására alkalmas létesítményt üzemeltetnek, illetve fokozottan tűz- vagy robbanásveszélyes besorolású anyagot használnak." },
    { question: "Mi az a kockázatértékelés és miért fontos?", answer: "A kockázatértékelés egy olyan folyamat, amely során felmérjük a munkahelyen előforduló potenciális veszélyeket és értékeljük az azokból adódó kockázatokat. Célja a munkabalesetek és egészségkárosodások megelőzése, valamint a szükséges védőintézkedések meghatározása. Minden munkáltatónak kötelező elvégeznie.", isImportant: false },
    { question: "Mennyi idő alatt készül el egy munkavédelmi szabályzat?", answer: "Ez nagyban függ a vállalkozás méretétől, tevékenységétől és a meglévő dokumentáció állapotától. Egy alapos felmérés után tudunk pontosabb időbecslést adni, de általában néhány naptól 1-2 hétig terjedhet." },
    { question: "Milyen szankciókra számíthatok, ha nem felelek meg az előírásoknak?", answer: "A hatóságok a hiányosságok súlyosságától függően figyelmeztetéstől kezdve a tevékenység felfüggesztésén át a jelentős összegű bírság kiszabásáig terjedő szankciókat alkalmazhatnak. A megelőzés mindig költséghatékonyabb." },
];

const CombinedSections: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);
    const faqSectionRef = useRef<HTMLElement>(null);
    const [isFaqVisible, setIsFaqVisible] = useState(false);

    const toggleItem = (index: number) => { setOpenIndex(openIndex === index ? null : index); };

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsFaqVisible(true);
                } else {
                    setIsFaqVisible(false);
                }
            },
            {
                threshold: 0.5,
            }
        );

        if (faqSectionRef.current) {
            observer.observe(faqSectionRef.current);
        }

        return () => {
            if (faqSectionRef.current) {
                observer.unobserve(faqSectionRef.current);
            }
        };
    }, []);


    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');

                /* Egységes 4rem x 4rem rácsméret mindhárom szekcióhoz */
                .grid-pattern {
                    background-size: 4rem 4rem;
                }
                .grid-pattern-light {
                    background-image: linear-gradient(rgba(3, 186, 190, 0.15) 1px, transparent 1px),
                                      linear-gradient(to right, rgba(3, 186, 190, 0.15) 1px, transparent 1px);
                                      background-attachment: fixed;
                                      background-position: 0  150px;
                }
                .grid-pattern-dark {
                    background-image: linear-gradient(rgba(203, 213, 225, 0.05) 1px, transparent 1px),
                                      linear-gradient(to right, rgba(203, 213, 225, 0.05) 1px, transparent 1px);
                    background-attachment: fixed;
                    background-position: 0  170px;
                }

                .cta-button {
                    transition: all 0.3s ease-in-out;
                    box-shadow: 0 0 20px ${ACCENT_COLOR_RED.baseHex}40;
                }
                .cta-button:hover {
                    transform: scale(1.05);
                    box-shadow: 0 0 35px ${ACCENT_COLOR_RED.baseHex}60, 0 0 70px ${ACCENT_COLOR_RED.baseHex}40;
                }
                .cta-button:active {
                    transform: scale(0.98);
                }

                .faq-full-height {
                    transition: min-height 0.8s ease-in-out;
                }
                .faq-full-height.is-visible {
                    min-height: 100vh;
                }
            `}</style>

            {/* --- PROCESS STEPS SZEKCIÓ --- */}
            <section
                className="pt-20 lg:pt-28 pb-32 lg:pb-40 font-['Poppins',_sans-serif] relative z-20 overflow-hidden bg-white grid-pattern grid-pattern-light"
            >
                <BlueprintCorner className="absolute top-0 left-0 text-cyan-900/10 hidden md:block" />
                <BlueprintCorner className="absolute bottom-0 right-0 text-cyan-900/10 transform rotate-180 hidden md:block" />

                {/* ELSŐ NYÍL */}
                <div className="absolute w-36 h-36 text-cyan-500 pointer-events-none z-20"
                    style={{
                        top: '11%',
                        right: '5%',
                        transform: 'translateY(-50%) rotate(150deg)'
                    }}
                >
                    <IoArrowRedo className="w-full h-full" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="relative text-center mb-16 lg:mb-20">
                        <h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4">
                            Együttműködésünk <span className={ACCENT_COLOR_CYAN.text}>Folyamata</span>
                        </h2>
                        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                            Átlátható közös munkát biztosítunk, ahol a munka befejezése után is folyamatosan kapcsolatban maradunk, és kezeljük az ügyeket, ellentétben azokkal, akik eltűnnek.
                        </p>
                    </div>
                    <div className="relative max-w-xl mx-auto lg:max-w-4xl">
                        <div
                            className="hidden lg:block absolute left-1/2 top-10 bottom-10 w-1 bg-gradient-to-b from-cyan-200 via-cyan-300 to-cyan-200 rounded-full transform -translate-x-1/2"
                            style={{ transformOrigin: 'top' }}
                        />
                        <div className="space-y-20">
                            {steps.map((step, index) => (
                                <div
                                    key={step.step}
                                    className={`lg:flex items-center relative ${index % 2 === 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'}`}
                                >
                                    <div className={`w-full lg:w-1/2 flex mb-8 lg:mb-0 ${index % 2 === 0 ? 'lg:justify-start lg:pl-[calc(50%+3rem)]' : 'lg:justify-end lg:pr-[calc(50%+3rem)]'}`}>
                                        <div className="relative inline-block">
                                            <div
                                                className="hidden lg:block absolute top-1/2 w-5 h-5 bg-white rounded-full z-10"
                                                style={{ borderColor: ACCENT_COLOR_CYAN.base, borderWidth: '2px', left: index % 2 === 0 ? 'auto' : 'calc(100% + 2rem)', right: index % 2 === 0 ? 'calc(100% + 2rem)' : 'auto' }}
                                            />
                                            <div className="bg-gradient-to-br from-white to-slate-100 p-6 rounded-full inline-flex items-center justify-center shadow-xl border border-gray-100 ring-8 ring-white/50">
                                                <div className={`absolute -top-3 ${index % 2 === 0 ? '-right-3' : '-left-3'} ${ACCENT_COLOR_CYAN.bg} text-white w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg shadow-lg z-20 ring-4 ring-white`}>
                                                    <span>{step.step}</span>
                                                </div>
                                                <step.icon className={`w-14 h-14 ${ACCENT_COLOR_CYAN.text}`} aria-hidden="true" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`w-full lg:w-1/2 ${index % 2 === 0 ? 'lg:pr-10' : 'lg:pl-10'}`}>
                                        <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100 hover:shadow-2xl transition-shadow duration-300 h-full">
                                            <h3 className="text-xl lg:text-2xl font-semibold text-gray-900 mb-3">{step.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{step.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="text-center mt-16 lg:mt-20 px-4">
                        <p className="text-lg md:text-xl text-slate-700 font-medium max-w-xl mx-auto">
                            Igen jól látod, nálunk csak a munka befejezése után kell fizetni!
                        </p>
                    </div>
                    <div className="text-center mt-10 lg:mt-12">
                        <Link
                            href="https://app.minup.io/book/munkavedelmiszaki/service/46358"
                            className={`
                                inline-flex items-center
                                ${ACCENT_COLOR_RED.bg} ${ACCENT_COLOR_RED.textOnAccent}
                                font-bold py-4 px-10 rounded-xl text-lg sm:text-xl
                                shadow-lg ${ACCENT_COLOR_RED.shadow} ${ACCENT_COLOR_RED.hoverShadow}
                                transition-all duration-300 ease-in-out
                                focus:outline-none focus:ring-4 ${ACCENT_COLOR_RED.ring} focus:ring-offset-2 focus:ring-offset-slate-900
                                cta-button
                            `}
                        >
                            <SparklesIcon className="w-6 h-6 mr-2" />
                            Ingyenes konzultációt foglalok
                        </Link>
                    </div>
                </div>
            </section>

            {/* --- CALL TO ACTION SZEKCIÓ --- */}
            <section className="bg-slate-900 pb-20 sm:pb-32 relative font-['Poppins',_sans-serif] grid-pattern grid-pattern-dark">
                {/* MÁSODIK NYÍL */}
                <div className="absolute w-36 h-36 text-cyan-500 pointer-events-none z-20"
                    style={{
                        top: '1%',
                        left: '10%',
                        transform: 'translateY(-50%) rotate(200deg)'
                    }}
                >
                    <IoArrowUndoSharp className="w-full h-full" />
                </div>
                <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-40">
                    <div className="max-w-3xl mx-auto flex flex-col items-center text-center relative z-10">
                        <h2
                            className={`text-4xl sm:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r ${ACCENT_COLOR_CYAN.textGradient} mb-6 tracking-tight`}
                        >
                            Készen állsz a biztonságra?
                        </h2>
                        <p
                            className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed"
                        >
                            Tedd meg az első lépést, és tudd biztonságban minden értékedet, előzd meg az esetleges tüzet, és a baleseteket!
                        </p>
                        <div>
                            <Link
                                href="https://app.minup.io/book/munkavedelmiszaki/service/46358"
                                className={`
                                    inline-flex items-center gap-3
                                    ${ACCENT_COLOR_RED.bg} ${ACCENT_COLOR_RED.textOnAccent}
                                    font-bold py-4 px-10 rounded-xl text-lg sm:text-xl
                                    shadow-lg ${ACCENT_COLOR_RED.shadow} ${ACCENT_COLOR_RED.hoverShadow}
                                    transition-all duration-300 ease-in-out
                                    focus:outline-none focus:ring-4 ${ACCENT_COLOR_RED.ring} focus:ring-offset-2 focus:ring-offset-slate-900
                                    cta-button
                                `}
                            >
                                <SparklesIcon className="w-6 h-6" />
                                Foglalj egy ingyenes konzultációt!
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- FAQ ACCORDION SZEKCIÓ --- */}
<section
    ref={faqSectionRef}
    className={`py-16 lg:py-24 font-['Poppins',_sans-serif] relative bg-white grid-pattern grid-pattern-light faq-full-height ${isFaqVisible ? 'is-visible' : ''}`}
>
    {/* HARMADIK NYÍL */}
    <div className="absolute w-36 h-36 text-cyan-500 pointer-events-none z-20"
        style={{
            top: '1%',
            left: '80%',
            transform: 'translateY(-50%) rotate(150deg)'
        }}
    >
        <IoArrowRedo className="w-full h-full" />
    </div>

    <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 lg:mb-12">
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight mb-4">
                Gyakori <span className={ACCENT_COLOR_CYAN.text}>Kérdések</span>
            </h2>
            <p className="text-base text-slate-600 max-w-2xl mx-auto">
                Rövid válaszok a legfontosabb munkavédelmi és tűzvédelmi kérdésekre.
            </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
            {faqItems.map((item, index) => {
                const isOpen = openIndex === index;
                return (
                    <div
                        key={index}
                        className={`rounded-lg shadow-md hover:shadow-lg transition-shadow border overflow-hidden
                                    ${isOpen ? `bg-white/80 border-cyan-400` : 'bg-white/70 border-gray-100'}`}
                    >
                        <button
                            onClick={() => toggleItem(index)}
                            className="w-full flex justify-between items-center p-4 text-left focus:outline-none group hover:bg-slate-50 transition-colors"
                        >
                            <span className={`flex items-center text-lg sm:text-xl font-semibold ${isOpen ? 'text-cyan-700' : 'text-slate-800 group-hover:text-cyan-600'}`}>
                                {item.isImportant && (
                                    <ExclamationCircleIcon className="w-6 h-6 mr-2 text-red-500/80" />
                                )}
                                {item.question}
                            </span>
                            <ChevronDownIcon
                                className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180 text-cyan-600' : 'text-gray-500 group-hover:text-cyan-500'}`}
                            />
                        </button>
                        {isOpen && (
                            <div className="px-4 pb-4 text-slate-700 text-xl lg:text-2xl leading-relaxed">
                                {item.answer}
                            </div>
                        )}
                    </div>
                );
            })}
        </div>

        <div className="text-center mt-10">
            <p className="text-base text-slate-600 mb-4">Nem találtál választ? Lépj kapcsolatba velünk:</p>
            <Link
                                href="https://app.minup.io/book/munkavedelmiszaki/service/46358"
                                className={`
                                    inline-flex items-center gap-3
                                    ${ACCENT_COLOR_RED.bg} ${ACCENT_COLOR_RED.textOnAccent}
                                    font-bold py-4 px-10 rounded-xl text-lg sm:text-xl
                                    shadow-lg ${ACCENT_COLOR_RED.shadow} ${ACCENT_COLOR_RED.hoverShadow}
                                    transition-all duration-300 ease-in-out
                                    focus:outline-none focus:ring-4 ${ACCENT_COLOR_RED.ring} focus:ring-offset-2 focus:ring-offset-slate-900
                                    cta-button
                                `}
                            >
                                <SparklesIcon className="w-6 h-6" />
                                Foglalj egy ingyenes konzultációt!
                            </Link>
        </div>
    </div>
</section>

        </>
    );
};

export default CombinedSections;