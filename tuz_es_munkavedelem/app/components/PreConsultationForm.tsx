// app/components/PreConsultationFormClean.tsx
'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRightIcon,
  CalendarDaysIcon,
  CheckIcon,
  UsersIcon,
  BuildingOffice2Icon,
  HomeModernIcon,
} from '@heroicons/react/24/outline'; // Heroicons továbbra is jó választás

interface Answer {
  questionId: keyof AnswersState;
  value: boolean;
  text: string;
}

interface AnswersState {
  hasEmployees: boolean | null;
  hasCompany: boolean | null;
  hasPremise: boolean | null;
}

const initialAnswersState: AnswersState = {
  hasEmployees: null,
  hasCompany: null,
  hasPremise: null,
};

const questions = [
  { id: 'hasEmployees' as keyof AnswersState, text: "Vannak alkalmazottai?", icon: UsersIcon, detail: "A létszám fontos tényező a munkavédelmi előírások szempontjából." },
  { id: 'hasCompany' as keyof AnswersState, text: "Rendelkezik bejegyzett vállalkozással?", icon: BuildingOffice2Icon, detail: "A cégforma befolyásolhatja a tűz- és munkavédelmi kötelezettségeket." },
  { id: 'hasPremise' as keyof AnswersState, text: "Van fizikai telephelye, irodája vagy üzlete?", icon: HomeModernIcon, detail: "A telephely megléte alapvető a helyszíni felmérésekhez." },
];

// Az accentColor a projekt narancssárgája a konzisztencia érdekében
const accentColor = {
  bg: 'bg-[#DD520F]', // HeaderHero narancssárga gombja alapján
  text: 'text-[#DD520F]',
  hoverBg: 'hover:bg-orange-700',
  ring: 'focus:ring-orange-500',
  border: 'border-orange-600',
  fill: 'fill-orange-500' // SVG fill-hez, ha szükséges
};

const PreConsultationFormClean: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<AnswersState>(initialAnswersState);
  const [showBookingOption, setShowBookingOption] = useState(false);
  const [summaryAnswers, setSummaryAnswers] = useState<Answer[]>([]);
  const [animationDirection, setAnimationDirection] = useState(1);


  const handleAnswer = (questionId: keyof AnswersState, value: boolean, questionText: string) => {
    setAnimationDirection(1); // Előre lépés
    setAnswers(prev => ({ ...prev, [questionId]: value }));
    setSummaryAnswers(prev => {
        // Elkerüljük a duplikációt, ha a felhasználó esetleg visszalépne (bár most nincs Vissza gomb)
        const existing = prev.find(a => a.questionId === questionId);
        if (existing) {
            return prev.map(a => a.questionId === questionId ? {...a, value} : a);
        }
        return [...prev, { questionId, value, text: questionText }];
    });


    if (currentStep < questions.length - 1) {
      setTimeout(() => setCurrentStep(currentStep + 1), 200);
    } else {
      setTimeout(() => setShowBookingOption(true), 300);
    }
  };

  const progress = Math.min(((currentStep + (answers[questions[currentStep]?.id] !== null ? 1: 0) ) / questions.length) * 100, 100);
  const currentQuestion = questions[currentStep];

  const handleBookConsultation = () => {
    alert('Köszönjük! Hamarosan átirányítjuk az időpontfoglaló oldalra. (Ez egy minta akció)');
  };

  const resetForm = () => {
    setAnimationDirection(-1); // Visszalépés animáció az elejére
    setCurrentStep(0);
    setAnswers(initialAnswersState);
    setShowBookingOption(false);
    setSummaryAnswers([]);
  };

  const cardAnimationVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 80 : -80, // Csökkentett távolság
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "circOut" } // Finomabb, gyorsabb animáció
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 80 : -80,
      opacity: 0,
      transition: { duration: 0.3, ease: "circIn" }
    })
  };


  return (
    <section className="py-16 sm:py-24 bg-slate-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-xl border border-gray-200/80">
          {!showBookingOption ? (
            <>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="flex justify-between items-end mb-1.5 text-xs font-medium text-gray-500">
                  <span>{currentStep + 1}. Kérdés / {questions.length}</span>
                </div>
                <div className={`w-full bg-gray-200 rounded-full h-1.5`}>
                  <motion.div
                    className={`${accentColor.bg} h-1.5 rounded-full`}
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
              </div>

              {/* Question Area */}
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
                  <currentQuestion.icon className={`w-12 h-12 ${accentColor.text} mx-auto mb-5`} />
                  <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
                    {currentQuestion.text}
                  </h2>
                  <p className="text-gray-500 text-sm mb-8 px-2">{currentQuestion.detail}</p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {[true, false].map((value) => (
                      <motion.button
                        key={value ? 'yes' : 'no'}
                        onClick={() => handleAnswer(currentQuestion.id, value, currentQuestion.text)}
                        className={`
                          p-4 rounded-lg text-base font-medium border-2 transition-colors duration-150 ease-in-out
                          focus:outline-none focus:ring-2 ${accentColor.ring} focus:ring-offset-2
                          ${answers[currentQuestion.id] === value
                            ? `${accentColor.bg} ${accentColor.border} text-white shadow-md` // Kiemelt kiválasztott
                            : `bg-white hover:border-gray-400 border-gray-300 text-gray-700 hover:text-gray-900`
                          }
                        `}
                        whileHover={{ scale: answers[currentQuestion.id] === value ? 1 : 1.03 }}
                        whileTap={{ scale: 0.97 }}
                      >
                        {value ? 'Igen' : 'Nem'}
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </>
          ) : (
            // Booking Option / Thank You
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="text-center"
            >
              <CheckIcon className={`w-16 h-16 ${accentColor.text} mx-auto mb-5`} />
              <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-4">
                Köszönjük a válaszait!
              </h2>
              <p className="text-gray-600 mb-6 text-sm sm:text-base max-w-md mx-auto">
                Ez alapján jobban felkészülhetünk a személyes konzultációra:
              </p>
              <div className="text-left bg-slate-100 p-3 sm:p-4 rounded-lg mb-6 max-w-sm mx-auto space-y-1.5 border border-gray-200/80">
                {summaryAnswers.map(ans => (
                    <div key={ans.questionId} className="flex justify-between items-center text-xs sm:text-sm">
                        <span className="text-gray-600">{ans.text.length > 25 ? ans.text.substring(0,22) + "..." : ans.text}</span>
                        <span className={`font-semibold px-2 py-0.5 rounded ${ans.value ? `${accentColor.bg} bg-opacity-20 ${accentColor.text}` : 'bg-red-500 bg-opacity-20 text-red-700'}`}>
                            {ans.value ? 'Igen' : 'Nem'}
                        </span>
                    </div>
                ))}
              </div>
              <p className="text-gray-600 mb-8 text-sm sm:text-base max-w-md mx-auto">
                Készen áll a következő lépésre? Foglaljon egy ingyenes, kötelezettségmentes konzultációs időpontot.
              </p>
              <motion.button
                onClick={handleBookConsultation}
                className={`w-full sm:w-auto inline-flex items-center justify-center ${accentColor.bg} ${accentColor.hoverBg} text-white font-semibold py-3 px-8 rounded-lg text-base shadow-md hover:shadow-lg transition-all duration-200 ease-in-out focus:outline-none ${accentColor.ring} focus:ring-offset-2`}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <CalendarDaysIcon className="w-5 h-5 mr-2.5" />
                Ingyenes Konzultáció Foglalása
              </motion.button>
              <button
                onClick={resetForm}
                className={`mt-5 text-xs sm:text-sm ${accentColor.text} hover:underline transition-colors`}
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