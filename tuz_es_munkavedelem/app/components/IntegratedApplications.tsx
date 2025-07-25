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
  FireIcon,
  ShieldCheckIcon as ShieldIconOutline,
  XMarkIcon,
  CheckCircleIcon,
  PhoneIcon
} from '@heroicons/react/24/outline';
import {
    FireIcon as FireIconSolid,
    ShieldCheckIcon as ShieldIconSolid,
    CalendarDaysIcon as CalendarDaysIconSolid,
} from '@heroicons/react/24/solid';

import { FaArrowTrendDown, FaHelmetSafety } from 'react-icons/fa6';
import { HiDocument } from 'react-icons/hi';

import Link from 'next/link';

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

const FloatingShapes = () => (
    <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div
            className="absolute top-[10%] left-[5%] w-48 h-48 bg-cyan-400/10 rounded-full"
            animate={{ y: [0, 20, 0], x: [0, -15, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
            className="absolute bottom-[15%] right-[8%] w-40 h-40 border-[1.5rem] border-teal-400/10 rounded-lg"
            animate={{ y: [0, -25, 0], x: [0, 10, 0], rotate: [0, -120, -360] }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear", delay: 5 }}
        />
         <motion.div
            className="absolute top-[20%] right-[20%] w-12 h-12 bg-indigo-300/10"
            style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}
            animate={{ y: [0, 30, 0], x: [0, -30, 0] }}
            transition={{ duration: 35, repeat: Infinity, ease: "easeInOut", repeatType: 'mirror' }}
        />
    </div>
);

const accentColor = {
  base: '#03BABE', bg: 'bg-[#03BABE]', text: 'text-[#03BABE]', hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500', shadow: 'shadow-cyan-500/40', hoverShadow: 'hover:shadow-cyan-400/60',
};

const introSectionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.2 } },
};

const introItemVariants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(5px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const iconCardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { type: 'spring', stiffness: 200, damping: 20, delay: 0.3 } },
};

const ServicesModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void; }) => {
    const servicesList = [
        { id: 'tuzvedelem', text: 'Teljes körű tűzvédelmi szolgáltatás' }, { id: 'munkavedelem', text: 'Munkavédelmi feladatok ellátása' },
        { id: 'kockazatert', text: 'Kockázatértékelés készítése' }, { id: 'haccp', text: 'HACCP rendszer kiépítése és felügyelete' },
        { id: 'erintesved', text: 'Érintésvédelmi felülvizsgálat' }, { id: 'oktatasok', text: 'Tűz- és munkavédelmi oktatások' },
        { id: 'balesetek', text: 'Munkabalesetek kivizsgálása' }, { id: 'emelogep', text: 'Emelőgép- és egyéb gépvizsgálatok' },
    ];
    const [selectedServices, setSelectedServices] = useState<string[]>([]);
    const handleCheckboxChange = (serviceId: string) => { setSelectedServices(prev => prev.includes(serviceId) ? prev.filter(id => id !== serviceId) : [...prev, serviceId]); };
    const handleBookConsultationWithServices = () => { if (selectedServices.length === 0) { alert('Kérjük, válasszon ki legalább egy szolgáltatást!'); return; } const selectedServiceNames = servicesList.filter(s => selectedServices.includes(s.id)).map(s => s.text).join(', '); alert(`Köszönjük! Az alábbi szolgáltatások érdeklik: ${selectedServiceNames}. Most átirányítjuk az időpontfoglaló oldalra.`); window.location.href = 'https://calendly.com/tuzesmunkavedelem/60'; };
    const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
    const modalVariants = { hidden: { opacity: 0, y: 50, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 300, damping: 25, delay: 0.1 } }, exit: { opacity: 0, y: 30, scale: 0.95, transition: { duration: 0.2 } } };
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div className="fixed inset-0 flex items-center justify-center p-4 z-50 modal-grid-bg" variants={backdropVariants} initial="hidden" animate="visible" exit="hidden" onClick={onClose}>
                    <motion.div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-auto p-8 relative" variants={modalVariants} exit="exit" onClick={(e) => e.stopPropagation()}>
                        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"><XMarkIcon className="w-8 h-8" /></button>
                        <h2 className={`text-3xl font-black text-center mb-6`}>Miben <span className={accentColor.text}>Segíthetünk</span>?</h2>
                        <p className="text-center text-slate-600 mb-8 max-w-lg mx-auto">Az alábbi szolgáltatásokkal állunk rendelkezésére, hogy vállalkozása biztonságos és a jogszabályoknak megfelelő legyen. Kérjük, válassza ki az Önt érdeklő területeket.</p>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 mb-10">
                            {servicesList.map((service, index) => (
                                <motion.li key={service.id} className="flex items-start gap-3" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0, transition: { delay: 0.2 + index * 0.05 } }}>
                                    <input type="checkbox" id={`service-${service.id}`} checked={selectedServices.includes(service.id)} onChange={() => handleCheckboxChange(service.id)} className={`form-checkbox h-6 w-6 rounded border-gray-300 text-cyan-500 shadow-sm focus:ring-cyan-500 cursor-pointer transition-colors duration-200 ${selectedServices.includes(service.id) ? accentColor.bg : 'bg-white border-gray-300'}`} />
                                    <label htmlFor={`service-${service.id}`} className="text-slate-700 cursor-pointer flex-1">{service.text}</label>
                                </motion.li>
                            ))}
                        </ul>
                        <motion.div className="text-center" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.7 } }}>
                           <motion.button onClick={handleBookConsultationWithServices} className={`inline-flex items-center gap-3 ${accentColor.bg} text-white font-bold py-4 px-10 rounded-xl text-lg transition-shadow duration-300 ease-in-out focus:outline-none focus:ring-4 ${accentColor.ring} focus:ring-offset-2`} whileHover={{ scale: 1.05, y: -4, boxShadow: '0 10px 20px -5px rgba(3, 186, 190, 0.5)' }} whileTap={{ scale: 0.98 }}>
                                <CalendarDaysIconSolid className="w-6 h-6" /> Időpontot Foglalok
                            </motion.button>
                        </motion.div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};


const IntegratedApplication: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<AnswersState>(initialAnswersState);
    const [showFinalScreen, setShowFinalScreen] = useState(false);
    const [finalMessage, setFinalMessage] = useState<{ type: 'booking' | 'info' | 'generic', text: string, buttonText?: string, buttonAction?: () => void } | null>(null);
    const [summaryAnswers, setSummaryAnswers] = useState<AnswerSummary[]>([]);
    const [animationDirection, setAnimationDirection] = useState(1);
    const [questionFlow, setQuestionFlow] = useState<BaseQuestionConfig[]>([allQuestionsConfig.establishmentPhase]);
    const preConsultationSectionRef = useRef<HTMLElement>(null);
    const isPreConsultationInView = useInView(preConsultationSectionRef, { once: true, amount: 0.2 });

    const handleAnswer = (questionId: string, value: any, questionText: string, answerText: string) => {
        setAnimationDirection(1); setAnswers(prev => ({ ...prev, [questionId]: value }));
        setSummaryAnswers(prev => { const existing = prev.find(a => a.questionId === questionId); if (existing) { return prev.map(a => a.questionId === questionId ? { ...a, answerValue: value, answerText } : a); } return [...prev, { questionId, questionText, answerValue: value, answerText }]; });
        setTimeout(() => { handleNextQuestionLogic(questionId, value); }, 300);
    };

    const handleNextQuestionLogic = (questionId: string, value: any) => {
        let newFinalMessage: typeof finalMessage = null; let nextQuestions: BaseQuestionConfig[] = []; let shouldAdvanceStep = true;
        if (questionId === 'establishmentPhase') {
            if (value === 'HAS_COMPANY') { nextQuestions = [allQuestionsConfig.hasEmployees, allQuestionsConfig.hasPremise, allQuestionsConfig.dealsWithFood]; setQuestionFlow([allQuestionsConfig.establishmentPhase, ...nextQuestions]); setCurrentStep(c => c + 1); shouldAdvanceStep = false; } 
            else if (value === 'OPENING_SOON') { nextQuestions = [allQuestionsConfig.openingSoonTimeline]; setQuestionFlow([allQuestionsConfig.establishmentPhase, ...nextQuestions]); setCurrentStep(c => c + 1); shouldAdvanceStep = false; } 
            else if (value === 'NO_COMPANY') { newFinalMessage = { type: 'booking', text: 'Kérjük, válasszon ki egy konzultációs lehetőséget, hogy segíthessünk vállalkozása elindításában.', buttonText: 'Ingyenes Konzultáció Foglalása', buttonAction: handleBookConsultation, }; }
        } else if (questionId === 'openingSoonTimeline') { newFinalMessage = { type: 'booking', text: 'Egy szakértő tud segíteni ebben. Kapsz tőlünk egy átlátszó ismertető anyagot. Keress minket emailben vagy telefonon!', buttonText: 'Ingyenes Konzultáció Foglalása', buttonAction: handleBookConsultation, }; }
        else if (questionId === 'dealsWithFood') { newFinalMessage = { type: 'booking', text: 'Köszönjük a válaszokat! Az Ön esetében személyes konzultáció szükséges a további lépésekhez.', buttonText: 'Ingyenes Konzultáció Foglalása', buttonAction: handleBookConsultation, }; }
        if (newFinalMessage) { setFinalMessage(newFinalMessage); setShowFinalScreen(true); } 
        else if (shouldAdvanceStep && currentStep < questionFlow.length - 1) { setCurrentStep(c => c + 1); }
    };

    const resetForm = () => { setAnimationDirection(-1); setShowFinalScreen(false); setFinalMessage(null); setTimeout(() => { setCurrentStep(0); setAnswers(initialAnswersState); setSummaryAnswers([]); setQuestionFlow([allQuestionsConfig.establishmentPhase]); }, 400); };
    const handleBookConsultation = () => { window.location.href = 'https://calendly.com/tuzesmunkavedelem/60'; };
    const currentQuestion = questionFlow[currentStep];
    const questionWrapperVariants: Variants = { enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }), center: { x: 0, opacity: 1, transition: { duration: 0.5, ease: [0.21, 1.02, 0.73, 1] } }, exit: (dir: number) => ({ x: dir < 0 ? 80 : -80, opacity: 0, transition: { duration: 0.4, ease: [0.83, 0, 0.17, 1] } }) };
    const contentStaggerVariants: Variants = { center: { transition: { staggerChildren: 0.08, delayChildren: 0.2 } }, };
    const contentItemVariants: Variants = { enter: { y: 20, opacity: 0 }, center: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "circOut" } } };
    const summaryListVariants: Variants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.5 } } };
    const summaryItemVariants: Variants = { hidden: { x: -20, opacity: 0 }, visible: { x: 0, opacity: 1, transition: { ease: 'easeOut', duration: 0.5 } } };
    const sectionEnterVariants: Variants = { hidden: { opacity: 0, y: 100, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 } }, };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const introSectionRef = useRef<HTMLElement>(null);
    const isIntroSectionInView = useInView(introSectionRef, { once: true, amount: 0.2 });
    if (!currentQuestion && !showFinalScreen) { return <section className="py-24 sm:py-32 bg-slate-50 font-['Poppins',_sans-serif] relative"><div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center"><p className="text-slate-800">Kérdések betöltése...</p></div></section>; }

    return (
        <>
            <style>{`
              @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
              .gradient-text { background: linear-gradient(to right, #06b6d4, #2dd4bf); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; text-fill-color: transparent; }
              .gradient-bg { background: linear-gradient(to right, #06b6d4, #2dd4bf); }
              .modal-grid-bg { background-color: #1a202c; background-image: linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px); background-size: 3rem 3rem; }
              input[type="checkbox"] { flex-shrink: 0; transition: all 0.2s ease-in-out; }
              input[type="checkbox"]:checked { border-color: #03BABE; background-color: #03BABE; background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M12.207 4.793a1 1 0 010 1.414l-5 5a1 1 0 01-1.414 0l-2-2a1 1 0 011.414-1.414L6.5 9.086l4.293-4.293a1 1 0 011.414 0z'/%3e%3c/svg%3e"); background-size: 100%; background-position: center; background-repeat: no-repeat; }
            `}</style>

            <div 
              style={{ backgroundColor: '#ffffff', backgroundImage: `linear-gradient(rgba(3, 186, 190, 0.15) 1px, transparent 1px), linear-gradient(to right, rgba(3, 186, 190, 0.15) 1px, transparent 1px)`, backgroundSize: '3rem 3rem' }} 
              className="font-['Poppins',_sans-serif] min-h-screen relative"
            >
                {/* === MÓDOSÍTÁS: ÚJ, LETISZTULT SVG ELVÁLASZTÓ === */}
                <div 
                  className="absolute top-0 left-0 w-full overflow-hidden leading-[0] text-slate-900" // Ez a Testimonial Slider sötét háttérszíne
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 1200 120"
                        preserveAspectRatio="none"
                        className="relative block w-full h-[60px] sm:h-[100px]"
                        fill="currentColor"
                    >
                        <path d="M1200 0L0 0 0 120 1200 120 1200 0z" className="hidden" /> {/* Eltartja a méretet */}
                        <path d="M0 0v46.29c47.79 22.2 103.59 32.17 158 28 70.36-5.37 136.33-33.31 206.3-37.5 74.18-4.82 148.64 16.54 221.58 35.85 72.94 19.31 148.8 31.54 223.32 23.33 74.52-8.21 146.43-39.22 215.1-66.21L1200 0H0z"></path>
                    </svg>
                </div>
                
                <motion.section 
                  ref={preConsultationSectionRef} 
                  className="relative pt-28 sm:pt-40 pb-24 sm:pb-32 overflow-hidden" // A felső padding helyet ad a hullámnak
                  variants={sectionEnterVariants} 
                  initial="hidden" 
                  animate={isPreConsultationInView ? "visible" : "hidden"} 
                  viewport={{ once: true, amount: 0.2 }}
                >
                    {/* A komponens többi része változatlan */}
                    <FloatingShapes />
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <motion.div 
                            className="text-center mb-16"
                            initial="hidden"
                            animate={isPreConsultationInView ? "visible" : "hidden"}
                            variants={{
                                hidden: { opacity: 0, y: -30 },
                                visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } }
                            }}
                        >
                            <h2 className="text-4xl lg:text-5xl font-black text-slate-800 tracking-tight mb-4">
                                Mit szólsz egy gyors <span className={accentColor.text}>kvízhez</span>?
                            </h2>
                            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                                Töltsd ki <span className={accentColor.text}>ha nem vagy benne biztos</span>, hogy mire is van szükséged:
                            </p>
                        </motion.div>
                        <div className="flex justify-center items-center gap-4 lg:gap-12">
                            <motion.div className="flex-1 hidden xl:flex justify-end items-center self-start" initial={{ opacity: 0, x: -100 }} animate={isPreConsultationInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}>
                                 <FaArrowTrendDown className="w-16 h-16 transform -scale-x-100 rotate-180 gradient-text" />
                            </motion.div>
                            <div className="w-full max-w-lg shrink-0">
                                <motion.div className="w-full bg-white/60 p-6 sm:p-8 rounded-2xl shadow-2xl shadow-cyan-500/5 ring-1 ring-black/5 backdrop-blur-xl" initial={{ opacity: 0, scale: 0.9 }} animate={isPreConsultationInView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}>
                                    <AnimatePresence initial={false} mode="wait">
                                        {!showFinalScreen ? (
                                            <motion.div key="questions">
                                                <div className="mb-8">
                                                    <div className="flex justify-between items-end mb-1.5 text-xs font-medium text-slate-500"><span>{summaryAnswers.length + 1}. Kérdés / {questionFlow.length}</span></div>
                                                    <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                                                        <motion.div className="h-full rounded-full gradient-bg" initial={{ width: 0 }} animate={{ width: `${(summaryAnswers.length / questionFlow.length) * 100}%` }} transition={{ duration: 0.6, ease: "easeOut" }} />
                                                    </div>
                                                </div>
                                                <AnimatePresence initial={false} custom={animationDirection} mode="wait">
                                                    <motion.div key={currentQuestion.id} custom={animationDirection} variants={questionWrapperVariants} initial="enter" animate="center" exit="exit" className="text-center">
                                                        <motion.div variants={contentStaggerVariants}>
                                                            <motion.div variants={contentItemVariants}><currentQuestion.icon className="w-14 h-14 gradient-text mx-auto mb-5" /></motion.div>
                                                            <motion.h2 variants={contentItemVariants} className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">{currentQuestion.text}</motion.h2>
                                                            <motion.p variants={contentItemVariants} className="text-slate-500 text-sm mb-8 px-2">{currentQuestion.detail}</motion.p>
                                                        </motion.div>
                                                        {currentQuestion.isMultiChoice ? (
                                                            <div className="grid grid-cols-1 gap-3">
                                                                {currentQuestion.options!.map((opt, i) => ( <motion.button key={String(opt.value)} onClick={() => handleAnswer(currentQuestion.id, opt.value, currentQuestion.text, opt.text)} className={`p-4 rounded-lg font-semibold border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-white/80 ${answers[currentQuestion.id] === opt.value ? 'gradient-bg text-white border-transparent shadow-lg shadow-cyan-500/20' : 'bg-white/50 border-slate-300 text-slate-700 hover:border-cyan-400 hover:text-slate-900 hover:shadow-md'}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.4 + i * 0.07 } }} whileHover={{ scale: 1.03, y: -4 }} whileTap={{ scale: 0.98 }}>{opt.text}</motion.button> ))}
                                                            </div>
                                                        ) : (
                                                            <div className="grid grid-cols-2 gap-4">
                                                                {[ {v: true, t: 'Igen'}, {v: false, t: 'Nem'} ].map((val, i) => ( <motion.button key={String(val.v)} onClick={() => handleAnswer(currentQuestion.id, val.v, currentQuestion.text, val.t)} className={`p-4 rounded-lg font-semibold border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-white/80 ${answers[currentQuestion.id] === val.v ? 'gradient-bg text-white border-transparent shadow-lg shadow-cyan-500/20' : 'bg-white/50 border-slate-300 text-slate-700 hover:border-cyan-400 hover:text-slate-900 hover:shadow-md'}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: 0.4 + i * 0.1 } }} whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.98 }}>{val.t}</motion.button> ))}
                                                            </div>
                                                        )}
                                                    </motion.div>
                                                </AnimatePresence>
                                            </motion.div>
                                        ) : (
                                            <motion.div key="summary" initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.5}} className="text-center">
                                                <AnimatedCheckIcon className="w-20 h-20 gradient-text mx-auto mb-4" />
                                                <h2 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">{finalMessage?.type === 'booking' ? 'Köszönjük a válaszait!' : 'Tájékoztatás'}</h2>
                                                <p className="text-slate-600 mb-6 text-sm sm:text-base max-w-md mx-auto">{finalMessage?.text}</p>
                                                {finalMessage?.type === 'booking' && ( <> <motion.div variants={summaryListVariants} initial="hidden" animate="visible" className="text-left bg-slate-50/70 p-4 rounded-lg mb-8 max-w-sm mx-auto space-y-2 border border-slate-200/80 shadow-inner"> {summaryAnswers.map(ans => ( <motion.div variants={summaryItemVariants} key={ans.questionId} className="flex justify-between items-center text-sm"> <span className="text-slate-600 truncate pr-2" title={ans.questionText}>{ans.questionText.length > 28 ? ans.questionText.substring(0,25) + "..." : ans.questionText}</span> <span className={`font-bold px-2 py-0.5 rounded-md text-xs ${typeof ans.answerValue === 'boolean' ? (ans.answerValue ? `bg-cyan-100 text-cyan-800` : 'bg-red-100 text-red-800') : `bg-cyan-100 text-cyan-800`}`}>{ans.answerText}</span> </motion.div> ))} </motion.div> <motion.button onClick={finalMessage?.buttonAction} whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 20px -5px rgb(6 182 212 / 0.4)' }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto inline-flex items-center justify-center gradient-bg text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg shadow-cyan-500/20 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-50"> <CalendarDaysIcon className="w-5 h-5 mr-2.5" /> {finalMessage?.buttonText} </motion.button> </> )}
                                                {finalMessage?.type === 'info' && ( <motion.button onClick={finalMessage?.buttonAction} whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 20px -5px rgb(6 182 212 / 0.4)' }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto inline-flex items-center justify-center gradient-bg text-white font-bold py-4 px-10 rounded-lg text-lg shadow-lg shadow-cyan-500/20 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-50"> <TruckIcon className="w-5 h-5 mr-2.5" /> {finalMessage?.buttonText} </motion.button> )}
                                                <button onClick={resetForm} className="mt-6 block w-full text-sm font-semibold text-cyan-600 hover:text-cyan-800 hover:underline transition-colors">Újrakezdés</button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            </div>
                            <motion.div className="flex-1 hidden xl:flex justify-start items-center self-end" initial={{ opacity: 0, x: 100 }} animate={isPreConsultationInView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.8, delay: 0.5, ease: 'easeOut' }}>
                               <FaArrowTrendDown className="w-16 h-16 gradient-text" />
                            </motion.div>
                        </div>
                    </div>
                </motion.section>

                <motion.section 
                    ref={introSectionRef} 
                    id="bemutatkozas" 
                    className="py-24 lg:py-32 px-4 sm:px-6 lg:px-8 font-['Poppins',_sans-serif]" 
                    variants={introSectionVariants} 
                    initial="hidden" 
                    whileInView="visible" 
                    viewport={{ once: true, amount: 0.2 }}
                >
                    <div className="max-w-6xl mx-auto flex flex-col items-center">
                        <motion.h2 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-16 text-center" variants={introItemVariants}>Erről <span className={accentColor.text}>jó</span> ha tudsz:</motion.h2>
                        <motion.p variants={introItemVariants} className="text-center text-lg lg:text-xl text-slate-600 max-w-3xl mb-16 leading-relaxed">Jó hogy ittvagy!  Fontos tudnod, hogy minden vállalkozásra más-más előírás vonatkozik, emiatt nem mindig egyszerű ennek megfelelni! Érdemes tisztában lenned azzal hogy mire is kell figyelmet fordítanod.</motion.p>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16 w-full">
                            <motion.div variants={introItemVariants} whileHover={{ y: -8, scale: 1.03 }} className="relative bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-200/80 transition-all duration-300 hover:shadow-2xl">
                                <motion.div className="absolute w-24 h-24 -top-8 -right-8" animate={{ y: [-4, 4, -4], rotate: [-3, 3, -3], }} transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}><FireIconSolid className="w-full h-full text-red-500 drop-shadow-lg" /></motion.div>
                                <motion.div variants={iconCardVariants} className="flex items-center gap-5 mb-5"><div className={`p-4 rounded-xl bg-gradient-to-br from-red-400 to-red-600`}><FireIcon className="w-8 h-8 text-white" /></div><h3 className="text-2xl font-bold text-slate-800">Tűzvédelem</h3></motion.div>
                                <p className="text-slate-600 leading-relaxed">Többről van szó mint a tűzoltó készülék meglétéről. A Tűzvédelem egy proaktív stratégia, ami a probléma megelőzésére, és gyors reagálására szolgál. Fontos: Kötelező, ha rendelkezel bármilyen telephellyel!</p>
                            </motion.div>
                            <motion.div variants={introItemVariants} whileHover={{ y: -8, scale: 1.03 }} className="relative bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-200/80 transition-all duration-300 hover:shadow-2xl">
                                <motion.div className="absolute w-24 h-24 -top-8 -right-8" animate={{ y: [-4, 4, -4], rotate: [-3, 3, -3], }} transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}>
                                    <FaHelmetSafety className="w-full h-full text-yellow-500 drop-shadow-lg" />
                                </motion.div>
                                <motion.div variants={iconCardVariants} className="flex items-center gap-5 mb-5">
                                    <div className={`p-4 rounded-xl bg-gradient-to-br from-amber-400 to-yellow-500`}>
                                        <FaHelmetSafety className="w-8 h-8 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-slate-800">Munkavédelem</h3>
                                </motion.div>
                                <p className="text-slate-600 leading-relaxed">
                                    Munkaadóként felelősséggel tartozol a kollégák iránt, és ezt a hatóságok is így gondolják.
                                    <br />
                                    <span className="font-bold">Fontos:</span> A “legveszélytelenebb” munkahelyeken is elvárják az alapvető munkavédelmi előírások betartását, hiszen az emberi élet érték.
                                </p>
                            </motion.div>
                            <motion.div variants={introItemVariants} whileHover={{ y: -8, scale: 1.03 }} className="relative bg-white/50 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-slate-200/80 transition-all duration-300 hover:shadow-2xl">
                                <motion.div className="absolute w-24 h-24 -top-8 -right-8" animate={{ y: [-4, 4, -4], rotate: [-3, 3, -3], }} transition={{ duration: 8, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}><HiDocument className="w-full h-full text-blue-500 drop-shadow-lg" /></motion.div>
                                <motion.div variants={iconCardVariants} className="flex items-center gap-5 mb-5"><div className={`p-4 rounded-xl bg-gradient-to-br from-blue-400 to-indigo-500`}><HiDocument className="w-8 h-8 text-white" /></div><h3 className="text-2xl font-bold text-slate-800">HACCP</h3></motion.div>
                                <p className="text-slate-600 leading-relaxed">A HACCP az élelmiszer biztonság alapköve. Minden esetben ki kell dolgozni ha valaki élelmiszerrel foglalkozik, és természetesen e-szerint kell eljárni a későbbiekben. Fontos tudni, hogy nem üzemelhetsz HACCP rendszer nélkül, különben bármikor bezárathatják az egységedet!</p>
                            </motion.div>
                        </div>
                        <motion.div variants={introItemVariants} className="text-center mt-20">
                            <p className="mb-6 text-xl text-slate-600">Beszélni szeretnék egy <span className={accentColor.text}>jó</span> szakival!</p>
                            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.98 }}><button onClick={() => setIsModalOpen(true)} className={`inline-block ${accentColor.bg} ${accentColor.hoverBg} text-white font-bold py-4 px-10 rounded-xl text-lg shadow-lg ${accentColor.shadow} ${accentColor.hoverShadow} transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 ${accentColor.ring}`}>online konzultáció egy szakemberrel</button></motion.div>
                        </motion.div>
                    </div>
                </motion.section>
            </div>
            <ServicesModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    );
};

export default IntegratedApplication;