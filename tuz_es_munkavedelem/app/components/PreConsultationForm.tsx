// app/components/PreConsultationForm.tsx
'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, Variants, useInView } from 'framer-motion';
import {
  CalendarDaysIcon,
  CheckIcon,
  UsersIcon,
  HomeModernIcon,
  BuildingStorefrontIcon,
  ShoppingCartIcon,
  LightBulbIcon,
  BriefcaseIcon,
  ClockIcon,
  TruckIcon,
} from '@heroicons/react/24/outline';

// FaArrowTrendDown importálása a react-icons/fa6-ból
import { FaArrowTrendDown } from 'react-icons/fa6';


// --- TÍPUSDEFINÍCIÓK (Változatlan) ---
type EstablishmentPhaseValue = 'HAS_COMPANY' | 'OPENING_SOON' | 'NO_COMPANY';
type OpeningSoonTimelineValue = 'LESS_THAN_1_MONTH' | '1_2_MONTHS' | '3_5_MONTHS' | 'MORE_THAN_5_MONTHS';
type NoCompanyInterestValue = 'BUSINESS_IDEA_EXISTS' | 'NO_BUSINESS_IDEA';

interface AnswerSummary {
  questionId: string;
  questionText: string;
  answerValue: boolean | EstablishmentPhaseValue | OpeningSoonTimelineValue | NoCompanyInterestValue | string;
  answerText: string;
}

interface AnswersState {
  establishmentPhase: EstablishmentPhaseValue | null;
  hasEmployees: boolean | null;
  hasPremise: boolean | null;
  dealsWithFood: boolean | null;
  openingSoonTimeline: OpeningSoonTimelineValue | null;
  noCompanyInterest: NoCompanyInterestValue | null;
  [key: string]: any;
}

const initialAnswersState: AnswersState = {
  establishmentPhase: null,
  hasEmployees: null,
  hasPremise: null,
  dealsWithFood: null,
  openingSoonTimeline: null,
  noCompanyInterest: null,
};

interface QuestionOption {
  value: EstablishmentPhaseValue | OpeningSoonTimelineValue | NoCompanyInterestValue | boolean;
  text: string;
}

type HeroIconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;

interface BaseQuestionConfig {
  id: string;
  text: string;
  icon: HeroIconType;
  detail: string;
  isMultiChoice: boolean;
  options?: QuestionOption[];
}

// A kérdés konfigurációk (Változatlan)
const allQuestionsConfig: { [key: string]: BaseQuestionConfig } = {
    establishmentPhase: {
      id: 'establishmentPhase',
      text: "Válassza ki vállalkozása jelenlegi helyzetét:",
      icon: BuildingStorefrontIcon,
      detail: "Ez segít meghatározni az Önre vonatkozó teendőket.",
      options: [
        { value: 'HAS_COMPANY', text: 'Működő cégem van' },
        { value: 'OPENING_SOON', text: 'Hamarosan nyitok' },
        { value: 'NO_COMPANY', text: 'Nincs cégem' },
      ],
      isMultiChoice: true,
    },
    hasEmployees: {
      id: 'hasEmployees',
      text: "Van munkavállalója?",
      icon: UsersIcon,
      detail: "A létszám fontos a munkavédelmi előírások szempontjából.",
      isMultiChoice: false,
    },
    hasPremise: {
      id: 'hasPremise',
      text: "Van telephelye?",
      icon: HomeModernIcon,
      detail: "A telephely megléte alapvető a helyszíni felmérésekhez.",
      isMultiChoice: false,
    },
    dealsWithFood: {
      id: 'dealsWithFood',
      text: "Foglalkozik élelmiszerrel?",
      icon: ShoppingCartIcon,
      detail: "Az élelmiszerkezelés speciális előírásokat (pl. HACCP) von maga után.",
      isMultiChoice: false,
    },
    openingSoonTimeline: {
        id: 'openingSoonTimeline',
        text: "Hány hónap múlva nyitok?",
        icon: ClockIcon,
        detail: "Ez segít nekünk felmérni a szükséges teendőket a nyitáshoz.",
        options: [
            { value: 'LESS_THAN_1_MONTH', text: 'Kevésbé mint 1 hónap' },
            { value: '1_2_MONTHS', text: '1-2 hónap' },
            { value: '3_5_MONTHS', text: '3-5 hónap' },
            { value: 'MORE_THAN_5_MONTHS', text: 'Több mint 5 hónap' },
        ],
        isMultiChoice: true,
    },
    noCompanyInterest: {
        id: 'noCompanyInterest',
        text: "Milyen vállalkozásról van szó?",
        icon: LightBulbIcon,
        detail: "Ez segít nekünk, hogy a legrelevánsabb információkat nyújtsuk.",
        options: [
            { value: 'BUSINESS_IDEA_EXISTS', text: 'Értem, és milyen vállalkozásról van szó?' },
            { value: 'NO_BUSINESS_IDEA', text: 'Nincs üzleti ötletem' },
        ],
        isMultiChoice: true,
    },
};

const AnimatedCheckIcon = ({ className }: { className?: string }) => (
    <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={className}
    >
        <motion.path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4.5 12.75l6 6 9-13.5"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
        />
    </motion.svg>
);

// --- LEBEGŐ HÁTTÉR ELEMEK (Változatlan) ---
const FloatingShapes = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
            className="absolute top-[10%] left-[5%] w-48 h-48 bg-cyan-400/10 rounded-full"
            animate={{
                y: [0, 20, 0],
                x: [0, -15, 0],
                rotate: [0, 180, 360],
            }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
            className="absolute bottom-[15%] right-[8%] w-40 h-40 border-[1.5rem] border-teal-400/10 rounded-lg"
            animate={{
                y: [0, -25, 0],
                x: [0, 10, 0],
                rotate: [0, -120, -360],
            }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear", delay: 5 }}
        />
         <motion.div
            className="absolute top-[20%] right-[20%] w-12 h-12 bg-indigo-300/10"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} // Háromszög
            animate={{
                y: [0, 30, 0],
                x: [0, -30, 0],
            }}
            transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", repeatType: 'mirror' }}
        />
    </div>
);


// --- FŐ KOMPONENS ---
const PreConsultationFormFinal: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<AnswersState>(initialAnswersState);
    const [showFinalScreen, setShowFinalScreen] = useState(false);
    const [finalMessage, setFinalMessage] = useState<{ type: 'booking' | 'info' | 'generic', text: string, buttonText?: string, buttonAction?: () => void } | null>(null);
    const [summaryAnswers, setSummaryAnswers] = useState<AnswerSummary[]>([]);
    const [animationDirection, setAnimationDirection] = useState(1);
    const [questionFlow, setQuestionFlow] = useState<BaseQuestionConfig[]>([allQuestionsConfig.establishmentPhase]);

    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

    const handleAnswer = (
      questionId: string,
      value: boolean | EstablishmentPhaseValue | OpeningSoonTimelineValue | NoCompanyInterestValue | string,
      questionText: string,
      answerText: string
    ) => {
        setAnimationDirection(1);
        setAnswers(prev => ({ ...prev, [questionId]: value as any }));

        setSummaryAnswers(prev => {
            const existing = prev.find(a => a.questionId === questionId);
            if (existing) {
                return prev.map(a => a.questionId === questionId ? { ...a, answerValue: value, answerText } : a);
            }
            return [...prev, { questionId, questionText, answerValue: value, answerText }];
        });

        setTimeout(() => {
            handleNextQuestionLogic(questionId, value);
        }, 300);
    };

    const handleNextQuestionLogic = (questionId: string, value: any) => {
        let newFinalMessage: typeof finalMessage = null;
        let nextQuestions: BaseQuestionConfig[] = [];
        let shouldAdvanceStep = true;

        if (questionId === 'establishmentPhase') {
            if (value === 'HAS_COMPANY') {
                nextQuestions = [
                    allQuestionsConfig.hasEmployees,
                    allQuestionsConfig.hasPremise,
                    allQuestionsConfig.dealsWithFood
                ];
                setQuestionFlow([allQuestionsConfig.establishmentPhase, ...nextQuestions]);
                setCurrentStep(currentStep + 1);
                shouldAdvanceStep = false;
            } else if (value === 'OPENING_SOON') {
                nextQuestions = [allQuestionsConfig.openingSoonTimeline];
                setQuestionFlow([allQuestionsConfig.establishmentPhase, ...nextQuestions]);
                setCurrentStep(currentStep + 1);
                shouldAdvanceStep = false;
            } else if (value === 'NO_COMPANY') {
                nextQuestions = [allQuestionsConfig.noCompanyInterest];
                setQuestionFlow([allQuestionsConfig.establishmentPhase, ...nextQuestions]);
                setCurrentStep(currentStep + 1);
                shouldAdvanceStep = false;
            }
        } else if (questionId === 'openingSoonTimeline') {
            newFinalMessage = {
                type: 'booking',
                text: 'Egy szakértő tud segíteni ebben, ha már van kész cég, és vannak konkrétumok. Kapsz tőlünk egy átlátszó ismertető anyagot, hogy ne kelljen tovább bogarásznod! Keress minket egy email, vagy telefonszám!',
                buttonText: 'Ingyenes Konzultáció Foglalása',
                buttonAction: handleBookConsultation,
            };
        } else if (questionId === 'noCompanyInterest') {
            if (value === 'BUSINESS_IDEA_EXISTS') {
                newFinalMessage = {
                    type: 'booking',
                    text: 'Értem, és milyen vállalkozásról van szó? (Ez alapján tudunk tovább segíteni). Keress minket egy email, vagy telefonszám!',
                    buttonText: 'Ingyenes Konzultáció Foglalása',
                    buttonAction: handleBookConsultation,
                };
            } else if (value === 'NO_BUSINESS_IDEA') {
                newFinalMessage = {
                    type: 'info',
                    text: 'Mivel nincs vállalkozásod, így konkrétumokkal én sem tudok szolgálni, viszont ha szeretnéd küldök neked egy általános tájékoztatót email-ben, illetve egy elemezhető, amin keresztül lehetsz okosabb! Mi a célja?',
                    buttonText: 'Kérjen tájékoztatót emailben',
                    buttonAction: () => alert('Tájékoztató igénylése emailben (Minta akció)'),
                };
            }
        }

        if (questionId === 'dealsWithFood') {
            newFinalMessage = {
                type: 'booking',
                text: 'Köszönjük a válaszokat! Az Ön esetében személyes konzultáció szükséges a további lépésekhez.',
                buttonText: 'Ingyenes Konzultáció Foglalása',
                buttonAction: handleBookConsultation,
            };
        }


        if (newFinalMessage) {
            setFinalMessage(newFinalMessage);
            setShowFinalScreen(true);
        } else if (shouldAdvanceStep && currentStep < questionFlow.length - 1) {
            setCurrentStep(currentStep + 1);
        } else if (questionFlow.length > 0 && !newFinalMessage) {
             // Fallback for generic booking if no specific path leads to a final message
        }
    };


    const resetForm = () => {
        setAnimationDirection(-1);
        setShowFinalScreen(false);
        setFinalMessage(null);
        setTimeout(() => {
            setCurrentStep(0);
            setAnswers(initialAnswersState);
            setSummaryAnswers([]);
            setQuestionFlow([allQuestionsConfig.establishmentPhase]);
        }, 400);
    };

    const handleBookConsultation = () => {
        alert('Köszönjük! Hamarosan átirányítjuk az időpontfoglaló oldalra. (Ez egy minta akció)');
    };

    const currentQuestion = questionFlow[currentStep];
    const progress = currentQuestion ? ((summaryAnswers.length) / (questionFlow.length)) * 100 : 0;


    // --- ANIMÁCIÓS VARIÁNSOK (Változatlan) ---
    const questionWrapperVariants: Variants = {
        enter: (direction: number) => ({ x: direction > 0 ? 80 : -80, opacity: 0 }),
        center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.21, 1.02, 0.73, 1] } },
        exit: (direction: number) => ({ x: direction < 0 ? 80 : -80, opacity: 0, transition: { duration: 0.4, ease: [0.83, 0, 0.17, 1] } })
    };

    const contentStaggerVariants: Variants = {
        center: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } },
    };

    const contentItemVariants: Variants = {
        enter: { y: 20, opacity: 0 },
        center: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "circOut" } }
    };

    const summaryListVariants: Variants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } }
    };

    const summaryItemVariants: Variants = {
        hidden: { x: -20, opacity: 0 },
        visible: { x: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.5 } }
    };

    const sectionEnterVariants: Variants = {
        hidden: { opacity: 0, y: 100, scale: 0.95 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.9,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2
            }
        },
    };


    if (!currentQuestion && !showFinalScreen) {
        return (
            <section className="py-24 sm:py-32 bg-slate-50 font-['Poppins',_sans-serif] relative">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <p className="text-slate-800">Hiba történt a kérdések betöltése közben.</p>
                    <button onClick={resetForm} className="mt-5 text-sm font-semibold text-cyan-600 hover:underline">Vissza a kezdéshez</button>
                </div>
            </section>
        );
    }

    return (
        <>
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
              .gradient-text {
                background: linear-gradient(to right, #06b6d4, #2dd4bf); /* Kékes-türkizes átmenet */
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
              }
              .gradient-bg {
                background: linear-gradient(to right, #06b6d4, #2dd4bf);
              }
              /* Rácsminta háttér */
              .bg-quiz-pattern {
                background-color: #f8fafc; /* Világos háttér a rács alá */
                background-image: 
                    linear-gradient(rgba(3, 186, 190, 0.05) 1px, transparent 1px),
                    linear-gradient(to right, rgba(3, 186, 190, 0.05) 1px, transparent 1px);
                background-size: 3rem 3rem;
              }
            `}</style>
            <motion.section
                ref={sectionRef}
                className="relative py-24 sm:py-32 bg-quiz-pattern font-['Poppins',_sans-serif] overflow-hidden"
                variants={sectionEnterVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                viewport={{ once: true, amount: 0.2 }}
            >
                <FloatingShapes />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center gap-4 lg:gap-12">
                        <motion.div
                            className="flex-1 hidden xl:flex justify-end items-center self-start"
                            initial={{ opacity: 0, x: -100 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                        >
                             {/* MÓDOSÍTVA: FaArrowTrendDown ikon, kisebb méret, kékes színátmenet, forgatás */}
                             <FaArrowTrendDown className="w-16 h-16 transform -scale-x-100 rotate-180 gradient-text" /> 
                        </motion.div>

                        <div className="w-full max-w-lg shrink-0">
                            <motion.div
                                className="w-full bg-white/60 p-6 sm:p-8 rounded-2xl shadow-2xl shadow-cyan-500/5 ring-1 ring-black/5 backdrop-blur-xl"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                            >
                                <AnimatePresence initial={false} mode="wait">
                                    {!showFinalScreen ? (
                                        <motion.div key="questions">
                                            <div className="mb-8">
                                                <div className="flex justify-between items-end mb-1.5 text-xs font-medium text-slate-500">
                                                    <span>{summaryAnswers.length + 1}. Kérdés / {questionFlow.length}</span>
                                                </div>
                                                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                                    <motion.div
                                                        className="h-full rounded-full gradient-bg"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${(summaryAnswers.length / questionFlow.length) * 100}%` }}
                                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                                    />
                                                </div>
                                            </div>
                                            <AnimatePresence initial={false} custom={animationDirection} mode="wait">
                                                <motion.div key={currentQuestion.id} custom={animationDirection} variants={questionWrapperVariants} initial="enter" animate="center" exit="exit" className="text-center">
                                                    <motion.div variants={contentStaggerVariants}>
                                                        <motion.div variants={contentItemVariants}>
                                                            <currentQuestion.icon className="w-14 h-14 gradient-text mx-auto mb-5" />
                                                        </motion.div>
                                                        <motion.h2 variants={contentItemVariants} className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">{currentQuestion.text}</motion.h2>
                                                        <motion.p variants={contentItemVariants} className="text-slate-500 text-sm mb-8 px-2">{currentQuestion.detail}</motion.p>
                                                    </motion.div>

                                                    {currentQuestion.isMultiChoice ? (
                                                        <div className="grid grid-cols-1 gap-3">
                                                            {currentQuestion.options!.map((opt, i) => (
                                                                <motion.button key={String(opt.value)} onClick={() => handleAnswer(currentQuestion.id, opt.value, currentQuestion.text, opt.text)}
                                                                    className={`p-4 rounded-lg font-semibold border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-white/80
                                                                        ${answers[currentQuestion.id] === opt.value
                                                                            ? 'gradient-bg text-white border-transparent shadow-lg shadow-cyan-500/20'
                                                                            : 'bg-white/50 border-slate-300 text-slate-700 hover:border-cyan-400 hover:text-slate-900 hover:shadow-md'}`
                                                                    }
                                                                    initial={{ opacity: 0, y: 20 }}
                                                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.4 + i * 0.07 } }}
                                                                    whileHover={{ scale: 1.03, y: -4 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                >{opt.text}</motion.button>
                                                            ))}
                                                        </div>
                                                    ) : (
                                                        <div className="grid grid-cols-2 gap-4">
                                                            {[ {v: true, t: 'Igen'}, {v: false, t: 'Nem'} ].map((val, i) => (
                                                                <motion.button key={String(val.v)} onClick={() => handleAnswer(currentQuestion.id, val.v, currentQuestion.text, val.t)}
                                                                     className={`p-4 rounded-lg font-semibold border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-white/80
                                                                        ${answers[currentQuestion.id] === val.v
                                                                            ? 'gradient-bg text-white border-transparent shadow-lg shadow-cyan-500/20'
                                                                            : 'bg-white/50 border-slate-300 text-slate-700 hover:border-cyan-400 hover:text-slate-900 hover:shadow-md'}`
                                                                    }
                                                                    initial={{ opacity: 0, y: 20 }}
                                                                    animate={{ opacity: 1, y: 0, transition: { delay: 0.4 + i * 0.1 } }}
                                                                    whileHover={{ scale: 1.05, y: -5 }}
                                                                    whileTap={{ scale: 0.98 }}
                                                                >{val.t}</motion.button>
                                                            ))}
                                                        </div>
                                                    )}
                                                </motion.div>
                                            </AnimatePresence>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="summary" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.5}} className="text-center">
                                            <AnimatedCheckIcon className="w-20 h-20 gradient-text mx-auto mb-4" />
                                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
                                                {finalMessage?.type === 'booking' ? 'Köszönjük a válaszait!' : 'Tájékoztatás'}
                                            </h2>
                                            <p className="text-slate-600 mb-6 text-sm sm:text-base max-w-md mx-auto">{finalMessage?.text}</p>
                                            {finalMessage?.type === 'booking' && (
                                                <>
                                                    <motion.div variants={summaryListVariants} initial="hidden" animate="visible" className="text-left bg-slate-50/70 p-4 rounded-lg mb-8 max-w-sm mx-auto space-y-2 border border-slate-200/80 shadow-inner">
                                                        {summaryAnswers.map(ans => (
                                                            <motion.div variants={summaryItemVariants} key={ans.questionId} className="flex justify-between items-center text-sm">
                                                                <span className="text-slate-600 truncate pr-2" title={ans.questionText}>{ans.questionText.length > 28 ? ans.questionText.substring(0,25) + "..." : ans.questionText}</span>
                                                                <span className={`font-bold px-2 py-0.5 rounded-md text-xs ${typeof ans.answerValue === 'boolean' ? (ans.answerValue ? `bg-cyan-100 text-cyan-800` : 'bg-red-100 text-red-800') : `bg-cyan-100 text-cyan-800`}`}>{ans.answerText}</span>
                                                            </motion.div>
                                                        ))}
                                                    </motion.div>
                                                    <motion.button onClick={finalMessage?.buttonAction} whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 20px -5px rgb(6 182 212 / 0.4)' }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto inline-flex items-center justify-center gradient-bg text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg shadow-cyan-500/20 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-50">
                                                        <CalendarDaysIcon className="w-5 h-5 mr-2.5" />
                                                        {finalMessage?.buttonText}
                                                    </motion.button>
                                                </>
                                            )}
                                            {finalMessage?.type === 'info' && (
                                                <motion.button onClick={finalMessage?.buttonAction} whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 20px -5px rgb(6 182 212 / 0.4)' }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto inline-flex items-center justify-center gradient-bg text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg shadow-cyan-500/20 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-50">
                                                    <TruckIcon className="w-5 h-5 mr-2.5" />
                                                    {finalMessage?.buttonText}
                                                </motion.button>
                                            )}
                                            <button onClick={resetForm} className="mt-6 block w-full text-sm font-semibold text-cyan-600 hover:text-cyan-800 hover:underline transition-colors">Újrakezdés</button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>

                        <motion.div
                            className="flex-1 hidden xl:flex justify-start items-center self-end"
                            initial={{ opacity: 0, x: 100 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                        >
                           {/* MÓDOSÍTVA: FaArrowTrendDown ikon, kisebb méret, kékes színátmenet */}
                           <FaArrowTrendDown className="w-16 h-16 gradient-text" />
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </>
    );
};

export default PreConsultationFormFinal;