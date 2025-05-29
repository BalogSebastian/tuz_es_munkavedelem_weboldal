// components/sections/PreConsultationFormClean.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  CalendarDaysIcon,
  CheckIcon,
  UsersIcon,
  HomeModernIcon,
  BuildingStorefrontIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';

// --- TÍPUSDEFINÍCIÓK (változatlan) ---
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
type HeroIconType = React.ComponentType<React.SVGProps<SVGSVGElement> & { title?: string; titleId?: string }>;
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
  { id: 'dealsWithFood', text: "Foglalkozik élelmiszerrel (pl. vendéglátás, élelmiszerbolt)?", icon: ShoppingCartIcon, detail: "Az élelmiszerkezelés speciális előírásokat (pl. HACCP) von maga után.", isMultiChoice: false },
];
// --- TÍPUSDEFINÍCIÓK VÉGE ---

const accentColor = {
  base: '#DD520F',
  bg: 'bg-[#DD520F]',
  textOnLight: 'text-[#DD520F]',
  textOnAccent: 'text-white',
  hoverBg: 'hover:bg-orange-700',
  ring: 'focus:ring-orange-500',
  borderSelected: 'border-orange-600',
  borderHoverUnselected: 'hover:border-orange-400',
  progressShimmerFrom: 'rgba(255,255,255,0.1)',
  progressShimmerVia: 'rgba(255,255,255,0.4)',
  progressShimmerTo: 'rgba(255,255,255,0.1)',
};

const PreConsultationFormClean: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AnswersState>(initialAnswersState);
  const [showBookingOption, setShowBookingOption] = useState(false);
  const [summaryAnswers, setSummaryAnswers] = useState<AnswerSummary[]>([]);
  const [animationDirection, setAnimationDirection] = useState(1);
  const [questionFlow, setQuestionFlow] = useState<QuestionConfig[]>([initialQuestionConfig]);

  const handleAnswer = (
    questionId: keyof AnswersState,
    value: boolean | EstablishmentPhaseValue,
    questionText: string,
    answerText: string
  ) => {
    setAnimationDirection(1);
    setAnswers(prev => ({ ...prev, [questionId]: value as any }));    
    setSummaryAnswers(prev => {
        const existing = prev.find(a => a.questionId === questionId);
        if (existing) {
            return prev.map(a => a.questionId === questionId ? {...a, answerValue: value, answerText } : a);
        }
        return [...prev, { questionId, questionText, answerValue: value, answerText }];
    });

    if (questionId === 'establishmentPhase') {
      if (value === 'HAS_COMPANY') {
        const newFlow: QuestionConfig[] = [initialQuestionConfig, ...companySpecificQuestionsConfig];
        setQuestionFlow(newFlow);
        if (currentStep < newFlow.length - 1) {
            setTimeout(() => setCurrentStep(currentStep + 1), 300);
        } else {
            setTimeout(() => setShowBookingOption(true), 400);
        }
      } else { 
        setQuestionFlow([initialQuestionConfig]);
        setTimeout(() => setShowBookingOption(true), 400);
      }
    } else {
      if (currentStep < questionFlow.length - 1) {
        setTimeout(() => setCurrentStep(currentStep + 1), 300);
      } else {
        setTimeout(() => setShowBookingOption(true), 400);
      }
    }
  };

  const currentQuestion = questionFlow[currentStep];
  const progress = questionFlow.length > 0 && currentQuestion ? Math.min(((currentStep + (answers[currentQuestion.id] !== null ? 1 : 0)) / questionFlow.length) * 100, 100) : 0;

  const handleBookConsultation = () => { alert('Köszönjük! Hamarosan átirányítjuk az időpontfoglaló oldalra. (Ez egy minta akció)'); };
  const resetForm = () => { 
    setAnimationDirection(-1); 
    setCurrentStep(0);
    setAnswers(initialAnswersState);
    setShowBookingOption(false);
    setSummaryAnswers([]);
    setQuestionFlow([initialQuestionConfig]);
  };

  const cardAnimationVariants = {
    enter: (direction: number) => ({ x: direction > 0 ? 60 : -60, opacity: 0, scale: 0.98 }),
    center: { x: 0, opacity: 1, scale: 1, transition: { duration: 0.5, ease: "circOut" } },
    exit: (direction: number) => ({ x: direction < 0 ? 60 : -60, opacity: 0, scale: 0.98, transition: { duration: 0.3, ease: "circIn" } })
  };

  if (!currentQuestion) { return (
    <section className="py-16 sm:py-24 bg-slate-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-lg mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-xl border border-gray-200/80 text-center">
                <p>Hiba történt a kérdések betöltése közben. Kérjük, próbálja újra később.</p>
                <button onClick={resetForm} className={`mt-5 text-sm ${accentColor.textOnLight} hover:underline`}>Vissza</button>
            </div>
        </div>
    </section>
  )};

  return (
    <section className="py-16 sm:py-24 bg-slate-100"> 
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-xl border border-gray-200/80">
          {!showBookingOption ? (
            <>
              <div className="mb-8">
                <div className="flex justify-between items-end mb-1.5 text-xs font-medium text-gray-500">
                  <span>{currentStep + 1}. Kérdés / {questionFlow.length}</span>
                </div>
                <div className={`w-full bg-gray-200 rounded-full h-2 relative overflow-hidden`}>
                  <motion.div
                    className={`${accentColor.bg} h-full rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ width: { duration: 0.5, ease: "easeOut" } }}
                  >
                    {progress > 0 && (
                        <motion.div
                        className="absolute top-0 left-0 h-full opacity-50"
                        style={{
                            width: '100%',
                            backgroundImage: `linear-gradient(90deg, ${accentColor.progressShimmerFrom} 0%, ${accentColor.progressShimmerVia} 50%, ${accentColor.progressShimmerTo} 100%)`,
                            backgroundSize: '250px 100%',
                        }}
                        initial={{ backgroundPosition: '-250px 0' }}
                        animate={{ backgroundPosition: ['-250px 0', `${progress}% 0`] }}
                        transition={{
                            duration: 1.8,
                            repeat: Infinity,
                            ease: 'linear',
                            delay: 0.2,
                        }}
                        />
                    )}
                  </motion.div>
                </div>
              </div>

              <AnimatePresence initial={false} custom={animationDirection} mode="wait">
                <motion.div
                  key={currentStep}
                  custom={animationDirection}
                  variants={cardAnimationVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="text-center"
                >
                  <motion.div
                    key={`icon-${currentStep}`}
                    initial={{ scale: 0.6, opacity: 0, y: -10 }}
                    animate={{ scale: 1, opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.15 }}
                  >
                    <currentQuestion.icon className={`w-14 h-14 ${accentColor.textOnLight} mx-auto mb-5`} />
                  </motion.div>
                  
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    {currentQuestion.text}
                  </h2>
                  <p className="text-gray-500 text-sm mb-8 px-2">{currentQuestion.detail}</p>

                  {currentQuestion.isMultiChoice ? (
                    <div className="grid grid-cols-1 gap-3 sm:gap-4">
                      {currentQuestion.options.map((opt) => (
                        <motion.button
                          key={opt.value}
                          onClick={() => handleAnswer(currentQuestion.id, opt.value, currentQuestion.text, opt.text)}
                          className={`
                            p-4 rounded-lg text-base font-medium border-2 transition-all duration-200 ease-in-out
                            focus:outline-none focus:ring-2 ${accentColor.ring} focus:ring-offset-2
                            ${answers[currentQuestion.id] === opt.value
                              ? `${accentColor.bg} ${accentColor.borderSelected} ${accentColor.textOnAccent} shadow-md scale-105`
                              : `bg-white border-gray-300 text-gray-700 ${accentColor.borderHoverUnselected} hover:text-gray-900 hover:shadow-sm`
                            }
                          `}
                          whileHover={{ scale: answers[currentQuestion.id] === opt.value ? 1.05 : 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {opt.text}
                        </motion.button>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      {[true, false].map((value) => (
                        <motion.button
                          key={value ? 'yes' : 'no'}
                          onClick={() => handleAnswer(currentQuestion.id, value, currentQuestion.text, value ? 'Igen' : 'Nem')}
                          className={`
                            p-4 rounded-lg text-base font-medium border-2 transition-all duration-200 ease-in-out
                            focus:outline-none focus:ring-2 ${accentColor.ring} focus:ring-offset-2
                            ${answers[currentQuestion.id] === value
                              ? `${accentColor.bg} ${accentColor.borderSelected} ${accentColor.textOnAccent} shadow-md scale-105`
                              : `bg-white border-gray-300 text-gray-700 ${accentColor.borderHoverUnselected} hover:text-gray-900 hover:shadow-sm`
                            }
                          `}
                          whileHover={{ scale: answers[currentQuestion.id] === value ? 1.05 : 1.03, y: -2 }}
                          whileTap={{ scale: 0.97 }}
                        >
                          {value ? 'Igen' : 'Nem'}
                        </motion.button>
                      ))}
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="text-center"
            >
              <motion.div
                initial={{ scale: 0, rotate: -180, opacity: 0 }}
                animate={{ scale: 1, rotate: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 250, damping: 18, delay: 0.1, duration: 0.7 }}
              >
                <CheckIcon className={`w-20 h-20 ${accentColor.textOnLight} mx-auto mb-6`} />
              </motion.div>
              
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
                Köszönjük a válaszait!
              </h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-md mx-auto">
                Ez alapján jobban felkészülhetünk a személyes konzultációra:
              </p>
              <div className="text-left bg-slate-100 p-3 sm:p-4 rounded-lg mb-6 max-w-sm mx-auto space-y-1.5 border border-gray-200/80 shadow">
                {/* JAVÍTÁS: Az összefoglaló map tartalma visszaállítva */}
                {summaryAnswers.map(ans => (
                    <div key={ans.questionId} className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-gray-600 truncate pr-2" title={ans.questionText}>
                            {ans.questionText.length > 28 ? ans.questionText.substring(0,25) + "..." : ans.questionText}
                        </span>
                        <span className={`font-semibold px-2 py-0.5 rounded-md text-xs ${
                            typeof ans.answerValue === 'boolean' ? 
                                (ans.answerValue 
                                    ? `${accentColor.bg} bg-opacity-20 ${accentColor.textOnLight}` // Pl. Narancs szöveg világos narancs alapon
                                    : 'bg-red-100 text-red-700' // Külön stílus a "Nem" válaszra
                                ) 
                                : `${accentColor.bg} bg-opacity-20 ${accentColor.textOnLight}` // Szöveges válaszok (pl. "Működő cégem van")
                            }`}>
                            {ans.answerText}
                        </span>
                    </div>
                ))}
              </div>
              <p className="text-gray-600 mb-8 text-sm sm:text-base max-w-md mx-auto">
                Készen áll a következő lépésre? Foglaljon egy ingyenes, kötelezettségmentes konzultációs időpontot.
              </p>
              <button
                onClick={handleBookConsultation}
                type="button"
                className={`
                  w-full sm:w-auto inline-flex items-center justify-center 
                  ${accentColor.bg} ${accentColor.hoverBg} ${accentColor.textOnAccent}
                  font-semibold py-4 px-10 rounded-lg text-lg sm:text-xl 
                  shadow-md hover:shadow-lg 
                  transition-all duration-300 ease-in-out 
                  focus:outline-none focus:ring-2 ${accentColor.ring} focus:ring-opacity-75 
                  transform hover:scale-105 active:scale-95
                `}
              >
                <CalendarDaysIcon className="w-5 h-5 mr-2.5" />
                Ingyenes Konzultáció Foglalása
              </button>
              <button
                onClick={resetForm}
                className={`mt-5 text-xs sm:text-sm ${accentColor.textOnLight} hover:underline transition-colors`}
              >
                Vissza a kezdéshez
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default PreConsultationFormClean;