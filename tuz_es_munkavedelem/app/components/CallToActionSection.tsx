// app/components/CallToActionSection.tsx
import React from 'react';

const CallToActionSection = () => {
  return (
    <section className="bg-black py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8">
      {/*
        A sötét háttér (`bg-black` vagy `bg-gray-900`) és a belső padding (`py-`)
        adja meg a szekció méretét és a gomb körüli teret.
        A kép alapján a gomb a szekció felső részén, középen helyezkedik el.
      */}
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        {/*
          Ha a gombot jobban a szekció közepére szeretnéd vertikálisan is,
          akkor a szülő div-nek adj 'min-h-[X]' értéket és 'justify-center'-t.
          De a kép alapján a gomb inkább a felső harmadban van,
          amit a section padding-je és a gomb pozicionálása eredményez.
        */}
        <button
          type="button"
          // A színeket és stílusokat itt finomíthatod tovább
          className="bg-red-600 hover:bg-red-700 text-white font-semibold py-4 px-10 rounded-lg text-lg sm:text-xl shadow-lg transform transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-black"
        >
          Ajánlatkérés / Konzultáció
        </button>
      </div>
      {/* A kép alapján a szekció többi része üres, sötét tér */}
    </section>
  );
};

export default CallToActionSection;