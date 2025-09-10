'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, Variants, useInView } from 'framer-motion';
import {
  BuildingStorefrontIcon,
  CalendarDaysIcon,
  CheckCircleIcon,
  ClockIcon,
  DocumentArrowDownIcon,
  EnvelopeIcon,
  HomeModernIcon,
  LightBulbIcon,
  PhoneIcon,
  ShoppingCartIcon,
  UserIcon,
  UsersIcon,
  XMarkIcon // Hozzáadva az X gombhoz
} from '@heroicons/react/24/outline';

// --- TÍPUSDEFINÍCIÓK ---
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

const allQuestionsConfig: { [key: string]: BaseQuestionConfig } = {
    establishmentPhase: { id: 'establishmentPhase', text: "Válaszd ki a vállalkozásod jelenlegi helyzetét:", icon: BuildingStorefrontIcon, detail: "Ez segít meghatározni a rád vonatkozó teendőket.", options: [ { value: 'HAS_COMPANY', text: 'Működő cégem van' }, { value: 'OPENING_SOON', text: 'Hamarosan nyitok' }, { value: 'NO_COMPANY', text: 'Nincs cégem' }, ], isMultiChoice: true, },
    hasEmployees: { id: 'hasEmployees', text: "Van munkavállalója?", icon: UsersIcon, detail: "A létszám fontos a munkavédelmi előírások szempontjából.", isMultiChoice: false, },
    hasPremise: { id: 'hasPremise', text: "Van telephelye?", icon: HomeModernIcon, detail: "A telephely megléte alapvető a helyszíni felmérésekhez.", isMultiChoice: false, },
    dealsWithFood: { id: 'dealsWithFood', text: "Foglalkozik élelmiszerrel?", icon: ShoppingCartIcon, detail: "Az élelmiszerkezelés speciális előírásokat (pl. HACCP) von maga után.", isMultiChoice: false, },
    openingSoonTimeline: { id: 'openingSoonTimeline', text: "Hány hónap múlva nyitok?", icon: ClockIcon, detail: "Ez segít nekünk felmérni a szükséges teendőket a nyitáshoz.", options: [ { value: 'LESS_THAN_1_MONTH', text: 'Kevésbé mint 1 hónap' }, { value: '1_2_MONTHS', text: '1-2 hónap' }, { value: '3_5_MONTHS', text: '3-5 hónap' }, { value: 'MORE_THAN_5_MONTHS', text: 'Több mint 5 hónap' }, ], isMultiChoice: true, },
    noCompanyInterest: { id: 'noCompanyInterest', text: "Milyen vállalkozásról van szó?", icon: LightBulbIcon, detail: "Ez segít nekünk, hogy a legrelevánsabb információkat nyújtsuk.", options: [ { value: 'BUSINESS_IDEA_EXISTS', text: 'Értem, és milyen vállalkozásról van szó?' }, { value: 'NO_BUSINESS_IDEA', text: 'Nincs üzleti ötletem' }, ], isMultiChoice: true, },
};

const accentColor = {
  base: '#03BABE', bg: 'bg-[#03BABE]', text: 'text-[#03BABE]', hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500', shadow: 'shadow-cyan-500/40', hoverShadow: 'hover:shadow-cyan-400/60',
};

const AnimatedCheckIcon = ({ className }: { className?: string }) => (
    <motion.svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
        <motion.path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" initial={{ pathLength: 0, opacity: 0 }} animate={{ pathLength: 1, opacity: 1 }} transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }} />
    </motion.svg>
);

const FloatingShapes = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div className="absolute top-[10%] left-[5%] w-48 h-48 bg-cyan-400/10 rounded-full" animate={{ y: [0, 20, 0], x: [0, -15, 0], rotate: [0, 180, 360] }} transition={{ duration: 40, repeat: Infinity, ease: "linear" }} />
        <motion.div className="absolute bottom-[15%] right-[8%] w-40 h-40 border-[1.5rem] border-teal-400/10 rounded-lg" animate={{ y: [0, -25, 0], x: [0, 10, 0], rotate: [0, -120, -360] }} transition={{ duration: 50, repeat: Infinity, ease: "linear", delay: 5 }} />
        <motion.div className="absolute top-[20%] right-[20%] w-12 h-12 bg-indigo-300/10" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }} animate={{ y: [0, 30, 0], x: [0, -30, 0] }} transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", repeatType: 'mirror' }} />
    </div>
);

const DownloadForm = ({ onDownloadCompleted, onClose }: { onDownloadCompleted: () => void; onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch('/api/save-quiz-lead', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, quizAnswers: 'Nincs cégem válasz', downloadedDocument: 'altalanos_munkavedelmi_kisokos.pdf', }), });
      const link = document.createElement('a');
      link.href = '/documents/altalanos_munkavedelem_kisokos.pdf';
      link.setAttribute('download', 'altalanos_munkavedelmi_kisokos.pdf');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsSubmitted(true);
      onDownloadCompleted();
      // Bezárjuk a modalt a letöltés után 3 másodperccel
      setTimeout(() => {
        onClose();
      }, 3000);
    } catch (error) {
      console.error("Submission error:", error);
      alert("Hiba történt a letöltés közben. Kérjük, próbálja újra.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return <motion.div className="text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }}><CheckCircleIcon className={`w-20 h-20 mx-auto mb-4 ${accentColor.text}`} /><h3 className="text-2xl font-bold text-slate-800 mb-2">Köszönjük!</h3><p className="text-slate-600">A letöltés automatikusan elindult. Hamarosan felvesszük Önnel a kapcsolatot.</p></motion.div>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">Töltsd le az útmutatót!</h2>
      <p className="text-slate-600 mb-6 text-sm sm:text-base max-w-md mx-auto">Add meg adataidat a letöltéshez. Kérdéseiddel pedig keress minket bátran!</p>
      <div className="relative group"><div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none`}><UserIcon className="h-5 w-5 text-gray-400 group-focus-within:text-cyan-500" /></div><input type="text" name="name" value={formData.name} onChange={handleFormChange} className="block text-gray-500 w-full pl-10 pr-3 py-3 border font-black border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Teljes Név*" required /></div>
      <div className="relative group"><div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none`}><EnvelopeIcon className="h-5 w-5 text-gray-400 group-focus-within:text-cyan-500" /></div><input type="email" name="email" value={formData.email} onChange={handleFormChange} className="block text-gray-500 w-full pl-10 pr-3 py-3 border font-black border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500" placeholder="Email cím*" required /></div>
      <div className="relative group"><div className={`absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none`}><PhoneIcon className="h-5 w-5 text-gray-400 group-focus-within:text-cyan-500" /></div><input type="tel" name="phone" value={formData.phone} onChange={handleFormChange} className="block w-full text-gray-500 pl-10 pr-3 py-3 border border-gray-300 rounded-lg placeholder-gray-400 focus:outline-none font-black focus:ring-2 focus:ring-cyan-500" placeholder="Telefonszám" /></div>
      <div className="text-center pt-4"><motion.button type="submit" disabled={isLoading} className={`inline-flex items-center gap-3 ${accentColor.bg} text-white font-bold py-4 px-10 rounded-xl text-lg transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-4 ${accentColor.ring} focus:ring-offset-2 disabled:bg-cyan-300 disabled:cursor-not-allowed`} whileHover={{ scale: 1.05, y: -4, boxShadow: '0 10px 20px -5px rgba(3, 186, 190, 0.5)' }} whileTap={{ scale: 0.98 }}><DocumentArrowDownIcon className="w-6 h-6" /> {isLoading ? 'Letöltés...' : 'Letöltöm az anyagot'}</motion.button></div>
    </form>
  );
};


// --- FŐ KOMPONENS, FELUGÓ ABLAKKÁ ALAKÍTVA ---
interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ isOpen, onClose }) => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<AnswersState>(initialAnswersState);
    const [showFinalScreen, setShowFinalScreen] = useState(false);
    const [finalScreenType, setFinalScreenType] = useState<'booking' | 'download' | null>(null);
    const [summaryAnswers, setSummaryAnswers] = useState<AnswerSummary[]>([]);
    const [animationDirection, setAnimationDirection] = useState(1);
    const [questionFlow, setQuestionFlow] = useState<BaseQuestionConfig[]>([allQuestionsConfig.establishmentPhase]);
    
    // Reseteljük az állapotot, ha a modal megnyílik/bezáródik, hogy mindig tiszta lappal induljon
    useEffect(() => {
        if (isOpen) {
            resetForm(); // Az állapotot alaphelyzetbe állítjuk megnyitáskor
        }
    }, [isOpen]);


    const handleAnswer = (questionId: string, value: any, questionText: string, answerText: string) => {
        setAnimationDirection(1);
        setAnswers(prev => ({ ...prev, [questionId]: value }));
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
        let newFinalScreenType: typeof finalScreenType = null;
        let nextQuestions: BaseQuestionConfig[] = [];
        let shouldAdvanceStep = true;
        if (questionId === 'establishmentPhase') {
            if (value === 'HAS_COMPANY') {
                nextQuestions = [allQuestionsConfig.hasEmployees, allQuestionsConfig.hasPremise, allQuestionsConfig.dealsWithFood];
                setQuestionFlow([allQuestionsConfig.establishmentPhase, ...nextQuestions]);
                setCurrentStep(c => c + 1);
                shouldAdvanceStep = false;
            } else if (value === 'OPENING_SOON') {
                nextQuestions = [allQuestionsConfig.openingSoonTimeline];
                setQuestionFlow([allQuestionsConfig.establishmentPhase, ...nextQuestions]);
                setCurrentStep(c => c + 1);
                shouldAdvanceStep = false;
            } else if (value === 'NO_COMPANY') {
                newFinalScreenType = 'download';
            }
        } else if (questionId === 'openingSoonTimeline' || questionId === 'dealsWithFood') {
            newFinalScreenType = 'booking';
        }
        if (newFinalScreenType) {
            setFinalScreenType(newFinalScreenType);
            setShowFinalScreen(true);
        } else if (shouldAdvanceStep && currentStep < questionFlow.length - 1) {
            setCurrentStep(c => c + 1);
        }
    };

    const resetForm = () => {
        setAnimationDirection(-1);
        setShowFinalScreen(false);
        setFinalScreenType(null);
        setTimeout(() => {
            setCurrentStep(0);
            setAnswers(initialAnswersState);
            setSummaryAnswers([]);
            setQuestionFlow([allQuestionsConfig.establishmentPhase]);
        }, 0); // Azonnali reset, hogy az animáció ne akadozzon
    };

    const handleBookConsultation = () => { 
        window.location.href = 'https://app.minup.io/book/munkavedelmiszaki/service/46358'; 
        onClose(); // Bezárjuk a modalt, ha a konzultációt lefoglalják
    };

    const currentQuestion = questionFlow[currentStep];
    const questionWrapperVariants: Variants = { enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }), center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.21, 1.02, 0.73, 1] } }, exit: (dir: number) => ({ x: dir < 0 ? 80 : -80, opacity: 0, transition: { duration: 0.4, ease: [0.83, 0, 0.17, 1] } }) };
    const contentStaggerVariants: Variants = { center: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }, };
    const contentItemVariants: Variants = { enter: { y: 20, opacity: 0 }, center: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "circOut" } } };
    const summaryListVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } } };
    const summaryItemVariants: Variants = { hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.5 } } };

    if (!currentQuestion && !showFinalScreen && isOpen) { 
        return (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[999] p-4 font-['Poppins',_sans-serif]">
                <div className="bg-white p-8 rounded-2xl shadow-xl text-center">
                    <p>Kérdések betöltése...</p>
                    <button onClick={onClose} className="mt-4 text-cyan-600 hover:text-cyan-800">Bezárás</button>
                </div>
            </div>
        );
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/70 backdrop-blur-lg flex items-center justify-center z-[999] p-4 font-['Poppins',_sans-serif]"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose} // Bezárja a modalt a háttérre kattintva
                >
                    <motion.div
                        className="w-full max-w-lg shrink-0 relative"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        onClick={(e) => e.stopPropagation()} // Megakadályozza a buborékolást a modalra kattintva
                    >
                        <div className="w-full bg-white p-6 sm:p-8 rounded-2xl shadow-2xl shadow-cyan-500/10 ring-2 ring-cyan-500/20 backdrop-blur-sm relative border-2 border-cyan-300"> {/* Stílus javítások */}
                            <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors z-20 p-2 rounded-full hover:bg-slate-100"><XMarkIcon className="w-8 h-8" /></button>
                            <FloatingShapes />
                            <div className="relative z-10">
                                <AnimatePresence initial={false} mode="wait">
                                    {!showFinalScreen ? (
                                        <motion.div key="questions">
                                            <div className="mb-8"><div className="flex justify-between items-end mb-1.5 text-xs font-medium text-slate-500"><span>{summaryAnswers.length + 1}. Kérdés / {questionFlow.length}</span></div><div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden"><motion.div className="h-full rounded-full gradient-bg" initial={{ width: 0 }} animate={{ width: `${(summaryAnswers.length / questionFlow.length) * 100}%` }} transition={{ duration: 0.6, ease: "easeOut" }} /></div></div>
                                            <AnimatePresence initial={false} custom={animationDirection} mode="wait">
                                                <motion.div key={currentQuestion.id} custom={animationDirection} variants={questionWrapperVariants} initial="enter" animate="center" exit="exit" className="text-center">
                                                    <motion.div variants={contentStaggerVariants}><motion.div variants={contentItemVariants}><currentQuestion.icon className="w-14 h-14 gradient-text mx-auto mb-5" /></motion.div><motion.h2 variants={contentItemVariants} className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">{currentQuestion.text}</motion.h2><motion.p variants={contentItemVariants} className="text-slate-500 text-sm mb-8 px-2">{currentQuestion.detail}</motion.p></motion.div>
                                                    {currentQuestion.isMultiChoice ? (<div className="grid grid-cols-1 gap-3">{currentQuestion.options!.map((opt, i) => ( <motion.button key={String(opt.value)} onClick={() => handleAnswer(currentQuestion.id, opt.value, currentQuestion.text, opt.text)} className={`p-4 rounded-lg font-semibold border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-white/80 ${answers[currentQuestion.id] === opt.value ? 'gradient-bg text-white border-transparent shadow-lg shadow-cyan-500/20' : 'bg-white/50 border-slate-300 text-slate-700 hover:border-cyan-400 hover:text-slate-900 hover:shadow-md'}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.4 + i * 0.07 } }} whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.98 }}>{opt.text}</motion.button> ))}</div>)
                                                    : (<div className="grid grid-cols-2 gap-4">{[ {v: true, t: 'Igen'}, {v: false, t: 'Nem'} ].map((val, i) => ( <motion.button key={String(val.v)} onClick={() => handleAnswer(currentQuestion.id, val.v, currentQuestion.text, val.t)} className={`p-4 rounded-lg font-semibold border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-white/80 ${answers[currentQuestion.id] === val.v ? 'gradient-bg text-white border-transparent shadow-lg shadow-cyan-500/20' : 'bg-white/50 border-slate-300 text-slate-700 hover:border-cyan-400 hover:text-slate-900 hover:shadow-md'}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.4 + i * 0.1 } }} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.98 }}>{val.t}</motion.button> ))}</div>)}
                                                </motion.div>
                                            </AnimatePresence>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="summary" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.5}} className="text-center">
                                            {finalScreenType === 'booking' && (<><AnimatedCheckIcon className="w-20 h-20 gradient-text mx-auto mb-4" /><h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">Köszönjük a válaszait!</h2><p className="text-slate-600 mb-6 text-sm sm:text-base max-w-md mx-auto">Az Ön esetében személyes konzultáció szükséges a további lépésekhez. Foglaljon időpontot szakértőinkkel!</p><motion.div variants={summaryListVariants} initial="hidden" animate="visible" className="text-left bg-slate-50/70 p-4 rounded-lg mb-8 max-w-sm mx-auto space-y-2 border border-slate-200/80 shadow-inner"> {summaryAnswers.map(ans => ( <motion.div variants={summaryItemVariants} key={ans.questionId} className="flex justify-between items-center text-sm"> <span className="text-slate-600 truncate pr-2" title={ans.questionText}>{ans.questionText.length > 28 ? ans.questionText.substring(0,25) + "..." : ans.questionText}</span> <span className={`font-bold px-2 py-0.5 rounded-md text-xs ${typeof ans.answerValue === 'boolean' ? (ans.answerValue ? `bg-cyan-100 text-cyan-800` : 'bg-red-100 text-red-800') : `bg-cyan-100 text-cyan-800`}`}>{ans.answerText}</span> </motion.div> ))} </motion.div><motion.button onClick={handleBookConsultation} whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 20px -5px rgb(6 182 212 / 0.4)' }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto inline-flex items-center justify-center gradient-bg text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg shadow-cyan-500/20 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-50"> <CalendarDaysIcon className="w-5 h-5 mr-2.5" /> Konzultáció Foglalása </motion.button></>)}
                                            {finalScreenType === 'download' && <DownloadForm onDownloadCompleted={() => setShowFinalScreen(true)} onClose={onClose} />}
                                            <button onClick={resetForm} className="mt-6 block w-full text-sm font-semibold text-cyan-600 hover:text-cyan-800 hover:underline transition-colors">Újrakezdés</button>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default QuizModal;