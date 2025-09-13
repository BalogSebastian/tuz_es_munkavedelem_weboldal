// components/OfferModal.tsx
'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  XMarkIcon,
  CheckCircleIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  PaperAirplaneIcon,
} from '@heroicons/react/24/solid';

// Kettébontva a jobb átláthatóságért
const comprehensiveServices = [
  "Teljes Munkavédelmi Szolgáltatás",
  "Teljes Tűzvédelmi Szolgáltatás",
  "Teljes HACCP rendszer szolgáltatás",
  "Teljes Tűz- Munkavédelmi és HACCP szolgáltatás",
];

const individualServices = [
  "Munkahelyi kockázatértékelés",
  "Kémia kockázatértékelés",
  "Biológiai kockázatértékelés",
  "Egyéni védőeszköz juttatási rend kialakítása",
  "Munkavédelmi oktatás",
  "Munkaköri orvosi vizsgálatok rendje kialakítása",
  "Tűzvédelmi Oktatás",
  "Tűzvédelmi szabályzat",
  "Tűzriadó terv",
  "Menekülési tervrajz",
  "Kiürítés számítás",
  "HACCP",
  "HACCP oktatás",
  "Emelőgép felülvizsgálat",
  "Gépek üzembe helyezése",
  "Környezetvédelem",
  "Villamos biztonsági Felülvizsgálat",
  "Baleset kivizsgálása",
  "Oktatási tematika és tananyag készítés",
];


const OfferModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const [step, setStep] = useState(1);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    employeeCount: '',
    activity: '',
    premiseCount: '',
    premiseSize: '',
    premiseLocation: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleServiceToggle = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service)
        ? prev.filter((s) => s !== service)
        : [...prev, service]
    );
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const resetState = () => {
    setTimeout(() => {
      setStep(1);
      setSelectedServices([]);
      setFormData({
        name: '',
        email: '',
        phone: '',
        employeeCount: '',
        activity: '',
        premiseCount: '',
        premiseSize: '',
        premiseLocation: '',
      });
      setIsSubmitted(false);
      onClose();
    }, 500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/save-offer-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, services: selectedServices }),
      });

      if (!response.ok) throw new Error('A szerver hibát adott.');

      setIsSubmitted(true);
      setTimeout(resetState, 4000);
    } catch (error) {
      console.error('Hiba az ajánlatkérés küldésekor:', error);
      alert('Hiba történt a küldés során. Kérjük, próbálja meg később.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 z-[999]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetState}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-auto relative overflow-hidden"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 150, damping: 20 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={resetState}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors z-20"
            >
              <XMarkIcon className="w-8 h-8" />
            </button>

            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="p-8 md:p-12 text-center"
                >
                  <CheckCircleIcon className="w-20 h-20 mx-auto mb-4 text-cyan-500" />
                  <h3 className="text-3xl font-bold text-slate-800 mb-2">
                    Köszönjük!
                  </h3>
                  <p className="text-slate-600 text-lg">
                    Ajánlatkérését sikeresen rögzítettük. Hamarosan felvesszük
                    Önnel a kapcsolatot!
                  </p>
                </motion.div>
              ) : (
                <div className="overflow-hidden relative h-[80vh] md:h-auto max-h-[650px]">
                  <AnimatePresence mode="wait">
                    {step === 1 && (
                      <motion.div
                        key="step1"
                        initial={{ x: '-100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '100%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        className="w-full p-8 md:p-12 overflow-y-auto h-[80vh] md:h-auto max-h-[650px]"
                      >
                        <h2 className="text-3xl font-black text-slate-800 mb-2">
                          Mire szeretnél{' '}
                          <span className="text-cyan-500">ajánlatot</span>{' '}
                          kapni?
                        </h2>
                        <p className="text-slate-500 mb-8">
                          Válaszd ki az érdeklődési körödnek megfelelő
                          szolgáltatásokat.
                        </p>
                        
                        {/* Komplex csomagok */}
                        <div className="space-y-3">
                          {comprehensiveServices.map((service) => (
                            <label
                              key={service}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={selectedServices.includes(service)}
                                onChange={() => handleServiceToggle(service)}
                                className="form-checkbox h-5 w-5 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                              />
                              <span className="text-slate-700 select-none">
                                {service}
                              </span>
                            </label>
                          ))}
                        </div>

                        {/* Elválasztó vonal */}
                        <hr className="my-6 border-slate-200" />

                        {/* Egyedi szolgáltatások */}
                        <div className="space-y-3">
                          {individualServices.map((service) => (
                            <label
                              key={service}
                              className="flex items-center gap-3 p-3 rounded-lg hover:bg-slate-50 cursor-pointer transition-colors"
                            >
                              <input
                                type="checkbox"
                                checked={selectedServices.includes(service)}
                                onChange={() => handleServiceToggle(service)}
                                className="form-checkbox h-5 w-5 rounded border-gray-300 text-cyan-500 focus:ring-cyan-500 cursor-pointer"
                              />
                              <span className="text-slate-700 select-none">
                                {service}
                              </span>
                            </label>
                          ))}
                        </div>

                        <div className="mt-10 text-right">
                          <button
                            onClick={() => setStep(2)}
                            disabled={selectedServices.length === 0}
                            className="inline-flex items-center gap-2 bg-cyan-500 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all hover:bg-cyan-600 disabled:bg-slate-300 disabled:cursor-not-allowed"
                          >
                            Tovább <ArrowRightIcon className="w-5 h-5" />
                          </button>
                        </div>
                      </motion.div>
                    )}

                    {step === 2 && (
                      <motion.div
                        key="step2"
                        initial={{ x: '100%', opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: '-100%', opacity: 0 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
                        className="w-full p-8 md:p-12 overflow-y-auto h-[80vh] md:h-auto max-h-[650px]"
                      >
                        <h2 className="text-3xl font-black text-slate-800 mb-2">
                          Majdnem <span className="text-cyan-500">készen</span>{' '}
                          vagyunk!
                        </h2>
                        <p className="text-slate-500 mb-8">
                          Kérünk, add meg a pontos árajánlathoz szükséges
                          adatokat.
                        </p>

                        <form
                          onSubmit={handleSubmit}
                          className="space-y-4"
                        >
                          <div className="grid md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              name="employeeCount"
                              value={formData.employeeCount}
                              onChange={handleFormChange}
                              placeholder="Alkalmazottak száma"
                              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                            />
                            <input
                              type="text"
                              name="premiseCount"
                              value={formData.premiseCount}
                              onChange={handleFormChange}
                              placeholder="Telephelyek száma"
                              className="w-full p-3 border border-gray-300 rounded-lg text-black focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                            />
                            <input
                              type="text"
                              name="premiseSize"
                              value={formData.premiseSize}
                              onChange={handleFormChange}
                              placeholder="Telephely mérete (pl. 120m²)"
                              className="w-full p-3 border border-gray-300 rounded-lg text-black  focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                            />
                            <input
                              type="text"
                              name="premiseLocation"
                              value={formData.premiseLocation}
                              onChange={handleFormChange}
                              placeholder="Telephely lokációja (város)"
                              className="w-full p-3 border border-gray-300 rounded-lg text-black  focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                            />
                          </div>

                          <textarea
                            name="activity"
                            value={formData.activity}
                            onChange={handleFormChange}
                            placeholder="Cég tevékenysége (röviden)"
                            rows={3}
                            className="w-full p-3 border border-gray-300 text-black  rounded-lg focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                          ></textarea>

                          <div className="grid md:grid-cols-2 gap-4">
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleFormChange}
                              placeholder="Teljes név*"
                              required
                              className="w-full p-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                            />
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleFormChange}
                              placeholder="Email cím*"
                              required
                              className="w-full p-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-cyan-500 placeholder-gray-400"
                            />
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handleFormChange}
                              placeholder="Telefonszám"
                              className="w-full p-3 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-cyan-500 placeholder-gray-400 md:col-span-2"
                            />
                          </div>

                          <div className="mt-10 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => setStep(1)}
                              className="inline-flex items-center gap-2 text-slate-600 font-bold py-3 px-6 rounded-lg hover:bg-slate-100 transition-all"
                            >
                              <ArrowLeftIcon className="w-5 h-5" /> Vissza
                            </button>
                            <button
                              type="submit"
                              disabled={isLoading}
                              className="inline-flex items-center gap-3 bg-red-600 text-white font-bold py-3 px-6 rounded-lg text-lg transition-all hover:bg-red-700 disabled:bg-red-400"
                            >
                              <PaperAirplaneIcon className="w-5 h-5" />{' '}
                              {isLoading
                                ? 'Küldés...'
                                : 'Foglalj egy ingyenes konzultációt!'}
                            </button>
                          </div>
                        </form>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default OfferModal;