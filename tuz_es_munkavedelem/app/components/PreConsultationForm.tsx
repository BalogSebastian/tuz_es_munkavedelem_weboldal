// components/sections/PreConsultationFormFinal_V3.tsx
'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, Variants, useInView } from 'framer-motion'; // Hozzáadtam a useInView-t
import {
  CalendarDaysIcon,
  CheckIcon,
  UsersIcon,
  HomeModernIcon,
  BuildingStorefrontIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';

// --- TÍPUSDEFINÍCIÓK (Változatlan) ---
type EstablishmentPhaseValue = 'HAS_COMPANY' | 'OPENING_SOON' | 'NO_COMPANY';
interface AnswerSummary {
  questionId: keyof AnswersState;
  questionText: string;
  answerValue: boolean | EstablishmentPhaseValue;
  answerText: string;
}
interface AnswersState {
  establishmentPhase: EstablishmentPhaseValue | null;
  hasEmployees: boolean | null;
  hasPremise: boolean | null;
  dealsWithFood: boolean | null;
}
const initialAnswersState: AnswersState = {
  establishmentPhase: null,
  hasEmployees: null,
  hasPremise: null,
  dealsWithFood: null,
};
interface QuestionOption {
  value: EstablishmentPhaseValue;
  text: string;
}
type HeroIconType = React.ComponentType<React.SVGProps<SVGSVGElement>>;
interface BaseQuestionConfig {
  id: keyof AnswersState;
  text: string;
  icon: HeroIconType;
  detail: string;
}
interface MultiChoiceQuestionConfig extends BaseQuestionConfig {
  isMultiChoice: true;
  options: QuestionOption[];
}
interface BooleanQuestionConfig extends BaseQuestionConfig {
  isMultiChoice: false;
}
type QuestionConfig = MultiChoiceQuestionConfig | BooleanQuestionConfig;
const initialQuestionConfig: MultiChoiceQuestionConfig = {
  id: 'establishmentPhase',
  text: "Kérjük, válassza ki vállalkozása jelenlegi helyzetét:",
  icon: BuildingStorefrontIcon,
  detail: "Ez segít meghatározni az Önre vonatkozó tűz- és munkavédelmi teendőket.",
  options: [
    { value: 'HAS_COMPANY', text: 'Működő cégem van' },
    { value: 'OPENING_SOON', text: 'Hamarosan nyitok / Cégalapítás alatt' },
    { value: 'NO_COMPANY', text: 'Nincs cégem / Magánszemélyként érdeklődöm' },
  ],
  isMultiChoice: true,
};
const companySpecificQuestionsConfig: BooleanQuestionConfig[] = [
  { id: 'hasEmployees', text: "Vannak alkalmazottai?", icon: UsersIcon, detail: "A létszám fontos tényező a munkavédelmi előírások szempontjából.", isMultiChoice: false },
  { id: 'hasPremise', text: "Van fizikai telephelye, irodája vagy üzlete?", icon: HomeModernIcon, detail: "A telephely megléte alapvető a helyszíni felmérésekhez.", isMultiChoice: false },
  { id: 'dealsWithFood', text: "Foglalkozik élelmiszerrel?", icon: ShoppingCartIcon, detail: "Az élelmiszerkezelés speciális előírásokat (pl. HACCP) von maga után.", isMultiChoice: false },
];
// --- TÍPUSDEFINÍCIÓK VÉGE ---


// --- PRÉMIUM, DINAMIKUS IKONOK ---
const AnimatedDecorativeArrow = ({ className }: { className?: string }) => {
    return (
        <motion.svg
            viewBox="0 0 100 100"
            fill="none"
            className={className}
            initial="hidden"
            animate="visible"
        >
            <motion.path
                d="M20 20C48.33 22.17 73.33 45.17 80 80"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { pathLength: 1, opacity: 1, transition: { duration: 1, ease: "circOut", delay: 0.5 } }
                }}
            />
            <motion.path
                d="M70 73L80 80L87 70"
                stroke="currentColor"
                strokeWidth="8"
                strokeLinecap="round"
                strokeLinejoin="round"
                variants={{
                    hidden: { pathLength: 0, opacity: 0 },
                    visible: { pathLength: 1, opacity: 1, transition: { duration: 0.5, ease: "circOut", delay: 1.2 } }
                }}
            />
        </motion.svg>
    );
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

// --- ÚJ: LEBEGŐ HÁTTÉR ELEMEK ---
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
    const [showBookingOption, setShowBookingOption] = useState(false);
    const [summaryAnswers, setSummaryAnswers] = useState<AnswerSummary[]>([]);
    const [animationDirection, setAnimationDirection] = useState(1);
    const [questionFlow, setQuestionFlow] = useState<QuestionConfig[]>([initialQuestionConfig]);
    
    // Hozzáadva: ref és useInView a komponens láthatóságának figyeléséhez
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, amount: 0.2 }); // Amikor a szekció 20%-a láthatóvá válik

    const handleAnswer = (questionId: keyof AnswersState, value: boolean | EstablishmentPhaseValue, questionText: string, answerText: string) => {
        setAnimationDirection(1);
        setAnswers(prev => ({ ...prev, [questionId]: value as any }));
        setSummaryAnswers(prev => {
            const existing = prev.find(a => a.questionId === questionId);
            if (existing) {
                return prev.map(a => a.questionId === questionId ? { ...a, answerValue: value, answerText } : a);
            }
            return [...prev, { questionId, questionText, answerValue: value, answerText }];
        });

        const isFirstQuestion = questionId === 'establishmentPhase';
        const leadsToMoreQuestions = isFirstQuestion && value === 'HAS_COMPANY';

        if (isFirstQuestion) {
            const newFlow = leadsToMoreQuestions
                ? [initialQuestionConfig, ...companySpecificQuestionsConfig]
                : [initialQuestionConfig];
            setQuestionFlow(newFlow);
            setTimeout(() => {
                if (leadsToMoreQuestions) {
                    setCurrentStep(currentStep + 1);
                } else {
                    setShowBookingOption(true);
                }
            }, 350);
        } else {
            setTimeout(() => {
                if (currentStep < questionFlow.length - 1) {
                    setCurrentStep(currentStep + 1);
                } else {
                    setShowBookingOption(true);
                }
            }, 350);
        }
    };

    const resetForm = () => {
        setAnimationDirection(-1);
        setShowBookingOption(false);
        // Adjunk egy kis időt a kilépő animációnak, mielőtt resetelünk
        setTimeout(() => {
            setCurrentStep(0);
            setAnswers(initialAnswersState);
            setSummaryAnswers([]);
            setQuestionFlow([initialQuestionConfig]);
        }, 400);
    };

    const handleBookConsultation = () => {
        alert('Köszönjük! Hamarosan átirányítjuk az időpontfoglaló oldalra. (Ez egy minta akció)');
    };

    const currentQuestion = questionFlow[currentStep];
    const progress = questionFlow.length > 0 && currentQuestion ? ((currentStep + (showBookingOption ? 1 : 0)) / questionFlow.length) * 100 : 0;
    
    // --- ANIMÁCIÓS VARIÁNSOK ---
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

    // Fő szekció beúszó animációs variánsok
    const sectionEnterVariants: Variants = {
        hidden: { opacity: 0, y: 100, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { 
                duration: 0.9, 
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2 // Kis késleltetés, hogy ne azonnal jelenjen meg görgetéskor
            } 
        },
    };


    if (!currentQuestion && !showBookingOption) {
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
                background: linear-gradient(to right, #06b6d4, #2dd4bf);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
                background-clip: text;
                text-fill-color: transparent;
              }
              .gradient-bg {
                background: linear-gradient(to right, #06b6d4, #2dd4bf);
              }
            `}</style>
            <motion.section 
                ref={sectionRef} 
                className="relative py-24 sm:py-32 bg-slate-50 font-['Poppins',_sans-serif] overflow-hidden"
                variants={sectionEnterVariants} // Alkalmazom a beúszó animációt
                initial="hidden"
                animate={isInView ? "visible" : "hidden"} // Csak akkor animáljon, ha láthatóvá válik
                viewport={{ once: true, amount: 0.2 }} // Módosítottam a viewport beállítást
            >
                <FloatingShapes />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-center items-center gap-4 lg:gap-12">
                        <motion.div 
                            className="flex-1 hidden xl:flex justify-end items-center self-start mt-10"
                            initial={{ opacity: 0, x: -100 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                        >
                             <AnimatedDecorativeArrow className="w-40 h-40 text-blue-500 transform -scale-x-100" />
                        </motion.div>
                        
                        <div className="w-full max-w-lg shrink-0">
                            <motion.div 
                                className="w-full bg-white/60 p-6 sm:p-8 rounded-2xl shadow-2xl shadow-cyan-500/5 ring-1 ring-black/5 backdrop-blur-xl"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                                transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
                            >
                                <AnimatePresence initial={false} mode="wait">
                                    {!showBookingOption ? (
                                        <motion.div key="questions">
                                            <div className="mb-8">
                                                <div className="flex justify-between items-end mb-1.5 text-xs font-medium text-slate-500">
                                                    <span>{currentStep + 1}. Kérdés / {questionFlow.length}</span>
                                                </div>
                                                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                                    <motion.div
                                                        className="h-full rounded-full gradient-bg"
                                                        initial={{ width: 0 }}
                                                        animate={{ width: `${progress}%` }}
                                                        transition={{ duration: 0.6, ease: "easeOut" }}
                                                    />
                                                </div>
                                            </div>
                                            <AnimatePresence initial={false} custom={animationDirection} mode="wait">
                                                <motion.div key={currentStep} custom={animationDirection} variants={questionWrapperVariants} initial="enter" animate="center" exit="exit" className="text-center">
                                                    <motion.div variants={contentStaggerVariants}>
                                                        <motion.div variants={contentItemVariants}>
                                                            <currentQuestion.icon className="w-14 h-14 gradient-text mx-auto mb-5" />
                                                        </motion.div>
                                                        <motion.h2 variants={contentItemVariants} className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">{currentQuestion.text}</motion.h2>
                                                        <motion.p variants={contentItemVariants} className="text-slate-500 text-sm mb-8 px-2">{currentQuestion.detail}</motion.p>
                                                    </motion.div>

                                                    {currentQuestion.isMultiChoice ? (
                                                        <div className="grid grid-cols-1 gap-3">
                                                            {currentQuestion.options.map((opt, i) => (
                                                                <motion.button key={opt.value} onClick={() => handleAnswer(currentQuestion.id, opt.value, currentQuestion.text, opt.text)}
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
                                            <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">Köszönjük a válaszait!</h2>
                                            <p className="text-slate-600 mb-6 text-sm sm:text-base max-w-md mx-auto">Ez alapján jobban felkészülhetünk a személyes konzultációra.</p>
                                            <motion.div variants={summaryListVariants} initial="hidden" animate="visible" className="text-left bg-slate-50/70 p-4 rounded-lg mb-8 max-w-sm mx-auto space-y-2 border border-slate-200/80 shadow-inner">
                                                {summaryAnswers.map(ans => (
                                                    <motion.div variants={summaryItemVariants} key={ans.questionId} className="flex justify-between items-center text-sm">
                                                        <span className="text-slate-600 truncate pr-2" title={ans.questionText}>{ans.questionText.length > 28 ? ans.questionText.substring(0,25) + "..." : ans.questionText}</span>
                                                        <span className={`font-bold px-2 py-0.5 rounded-md text-xs ${typeof ans.answerValue === 'boolean' ? (ans.answerValue ? `bg-cyan-100 text-cyan-800` : 'bg-red-100 text-red-800') : `bg-cyan-100 text-cyan-800`}`}>{ans.answerText}</span>
                                                    </motion.div>
                                                ))}
                                            </motion.div>
                                            <p className="text-slate-600 mb-8 text-sm sm:text-base max-w-md mx-auto">Készen áll a következő lépésre? Foglaljon egy ingyenes, kötelezettségmentes konzultációs időpontot.</p>
                                            
                                            <motion.button onClick={handleBookConsultation} whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 20px -5px rgb(6 182 212 / 0.4)' }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto inline-flex items-center justify-center gradient-bg text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg shadow-cyan-500/20 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-50">
                                                <CalendarDaysIcon className="w-5 h-5 mr-2.5" />
                                                Ingyenes Konzultáció Foglalása
                                            </motion.button>
                                            
                                            <button onClick={resetForm} className="mt-6 block w-full text-sm font-semibold text-cyan-600 hover:text-cyan-800 hover:underline transition-colors">Újrakezdés</button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </motion.div>
                        </div>

                        <motion.div 
                            className="flex-1 hidden xl:flex justify-start items-center self-end mb-10"
                            initial={{ opacity: 0, x: 100 }}
                            animate={isInView ? { opacity: 1, x: 0 } : {}}
                            transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}
                        >
                           <AnimatedDecorativeArrow className="w-32 h-32 text-blue-500" />
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </>
    );
};

export default PreConsultationFormFinal;