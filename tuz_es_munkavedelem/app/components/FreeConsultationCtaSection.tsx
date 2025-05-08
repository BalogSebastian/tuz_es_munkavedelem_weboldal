// app/components/FreeConsultationCtaSection.tsx
import React from 'react';
import { ArrowRightIcon } from '@heroicons/react/24/outline'; // Vagy más releváns ikon

const FreeConsultationCtaSection = () => {
  return (
    <section className="bg-gradient-to-r from-slate-800 via-gray-900 to-black py-20 sm:py-28 md:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
          Készen Áll a Következő Lépésre?
        </h2>
        <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
          Vegye fel velünk a kapcsolatot egy díjmentes konzultációért, ahol személyre szabott tanácsokkal segítjük vállalkozása tűz- és munkavédelmi kihívásaiban. Nincsenek kötelezettségek, csak tiszta, szakértői útmutatás.
        </p>
        <button
          type="button"
          // Az oldalon használt egyik kiemelt gomb stílusát alkalmazva
          // pl. a HeaderHero narancssárga gombja (#DD520F) vagy a CallToActionSection piros gombja
          // Most egy narancssárga változatot használok, hasonlóan a ServiceHighlightCards gombjához
          className="inline-flex items-center justify-center bg-[#DD520F] hover:bg-orange-700 text-white font-semibold py-4 px-10 rounded-lg text-lg sm:text-xl shadow-lg hover:shadow-xl transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Ingyenes Konzultáció
          <ArrowRightIcon className="ml-3 -mr-1 h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </section>
  );
};

export default FreeConsultationCtaSection;