// app/components/DownloadableDocsSection.tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { DocumentArrowDownIcon, UserIcon, EnvelopeIcon, PhoneIcon, ArrowRightIcon } from '@heroicons/react/24/outline';

const downloadableDocs = [
  {
    id: 1,
    title: "Kávézó Nyitás feltételei",
    description: "Töltse le részletes útmutatónkat, amely lépésről lépésre bemutatja egy sikeres kávézó tűz- és munkavédelmi kötelezettségeit és a nyitás alapvető feltételeit.",
    fileName: "kavezo_nyitas_feltetelei.pdf", // Példa fájlnév
  },
  {
    id: 2,
    title: "Mire van szüksége egy irodának?",
    description: "Ismerje meg az irodák alapvető tűz- és munkavédelmi szükségleteit ezzel az átfogó ellenőrzőlistával és tegye biztonságosabbá munkahelyét.",
    fileName: "irodai_szuksegletek_lista.pdf", // Példa fájlnév
  },
];

interface FormData {
  name: string;
  email: string;
  phone: string;
}

const DownloadableDocsSection: React.FC = () => {
  const [formData, setFormData] = useState<Record<number, FormData>>({
    1: { name: '', email: '', phone: '' },
    2: { name: '', email: '', phone: '' },
  });
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({
    1: false,
    2: false,
  });

  const handleChange = (docId: number, e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [docId]: {
        ...prev[docId],
        [e.target.name]: e.target.value,
      }
    }));
  };

  const handleSubmit = (docId: number, e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Itt történne a form adatainak feldolgozása, pl. elküldése egy API-nak
    // és a fájl letöltésének elindítása.
    // Most csak egy egyszerű visszajelzést adunk:
    console.log(`Űrlap adatok (${downloadableDocs.find(doc => doc.id === docId)?.title}):`, formData[docId]);
    setSubmitted(prev => ({ ...prev, [docId]: true }));
    // alert(`Köszönjük! A "${downloadableDocs.find(doc => doc.id === docId)?.fileName}" letöltése hamarosan megkezdődik.`);
    // Példa letöltés (helyettesítsd a valós logikával)
    // window.location.href = `/downloads/${downloadableDocs.find(doc => doc.id === docId)?.fileName}`;
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-3">
            Töltse Le Hasznos Anyagainkat!
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Adja meg adatait, és férjen hozzá exkluzív útmutatóinkhoz, amelyek segítenek megfelelni az előírásoknak.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } }
          }}
        >
          {downloadableDocs.map((doc) => (
            <motion.div
              key={doc.id}
              className="bg-white p-8 rounded-xl shadow-lg border border-gray-200 flex flex-col"
              variants={cardVariants}
            >
              <div className="flex-grow">
                <DocumentArrowDownIcon className="w-12 h-12 text-red-600 mb-6 mx-auto" />
                <h3 className="text-2xl font-semibold text-gray-800 mb-4 text-center">{doc.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-8 text-center text-sm">{doc.description}</p>

                {submitted[doc.id] ? (
                  <div className="text-center py-8">
                    <h4 className="text-xl font-semibold text-green-600 mb-2">Köszönjük az adatait!</h4>
                    <p className="text-gray-700">A letöltési linket hamarosan elküldjük Önnek, vagy a letöltés automatikusan elindul.</p>
                    <p className="text-sm text-gray-500 mt-2">(Ez egy minta üzenet, a valós működéshez backend integráció szükséges.)</p>
                  </div>
                ) : (
                  <form onSubmit={(e) => handleSubmit(doc.id, e)} className="space-y-6">
                    <div>
                      <label htmlFor={`name-${doc.id}`} className="sr-only">Név</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <UserIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          id={`name-${doc.id}`}
                          value={formData[doc.id].name}
                          onChange={(e) => handleChange(doc.id, e)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          placeholder="Teljes Név"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor={`email-${doc.id}`} className="sr-only">Email cím</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <EnvelopeIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          id={`email-${doc.id}`}
                          value={formData[doc.id].email}
                          onChange={(e) => handleChange(doc.id, e)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          placeholder="Email cím"
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label htmlFor={`phone-${doc.id}`} className="sr-only">Telefonszám</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <PhoneIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </div>
                        <input
                          type="tel"
                          name="phone"
                          id={`phone-${doc.id}`}
                          value={formData[doc.id].phone}
                          onChange={(e) => handleChange(doc.id, e)}
                          className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm"
                          placeholder="Telefonszám (opcionális)"
                        />
                      </div>
                    </div>
                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transform transition-all duration-150 ease-in-out hover:scale-105"
                      >
                        Letöltés és Adatlap Küldése
                        <ArrowRightIcon className="ml-3 h-5 w-5" />
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default DownloadableDocsSection;