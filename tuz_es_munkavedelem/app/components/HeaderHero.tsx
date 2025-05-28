import React from 'react';

const HeaderHero = () => {
  return (
    <div className="h-[75vh] w-screen flex flex-col antialiased">
      {/* Felső sáv - ez a rész változatlan marad */}
      <div className="bg-black text-white py-3 px-4 sm:px-6 flex items-center text-xs sm:text-sm">
        <div className="flex-1"></div>
        <div className="text-center">
          {/*
            Egyedi ("fasza") betűtípus beállításához:
            1. Válassz egy betűtípust: Népszerű modern választások pl. Inter, Montserrat, Lato, Open Sans (elérhetők a Google Fonts-on).
            2. Integráld a projektbe: A Next.js `@next/font` moduljával egyszerűen behúzhatsz Google Fonts-okat vagy helyi betűtípusokat.
               Például a `layout.tsx`-ben vagy itt a komponensben:
               import { Inter } from 'next/font/google';
               const inter = Inter({ subsets: ['latin'] });
               Majd a className-hez add hozzá: `${inter.className}`.
            3. A lenti `font-medium` osztály a jelenlegi betűtípus vastagságát növeli. Ezt lecserélheted vagy kiegészítheted a választott betűtípus osztályával.
          */}
          <div className="flex items-center justify-center flex-wrap space-x-2 sm:space-x-3 font-medium">
            <span className="whitespace-nowrap">Ügyfélszolgálat:</span>
            <a href="mailto:info@meggyesrev.hu" className="hover:underline">info@meggyesrev.hu</a>
            <a href="tel:+36209791719" className="hover:underline whitespace-nowrap">+36 20 979 17 19</a>
          </div>
        </div>
        <div className="flex-1 flex justify-end">
          <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md text-xs sm:text-sm transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-50">
            Ajánlatot kérek
          </button>
        </div>
      </div>

      {/* Fő narancssárga tartalom terület - TARTALMA LECSERÉLVE A KÉP ALAPJÁN */}
     {/* Fő narancssárga tartalom terület - "SOKKAL SOKKAL JOBBRA" ALAKÍTVA */}
     <div className="flex-grow flex flex-col items-center justify-center bg-[#DD520F] p-4 sm:p-8 text-center text-white">
        <div className="max-w-3xl">
          {/* Kiemelt, nagyobb méretű kérdés/felvetés */}
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-semibold leading-tight text-white mb-4 md:mb-6">
            'Kíváncsi vagy hogy milyen Tűz és Munkavédelmi előírásoknak kell megfelelned?
          </h2>

          {/* Kiegészítő, megoldást kínáló szöveg, normál méretben */}
          <p className="text-base sm:text-lg md:text-xl text-white mb-8">
            Segítek abban, hogy pontosan mit kérhetnek a szakhatóságok.'
          </p>

          {/* CTA Gomb, finom animációval */}
          <button className="bg-black text-white font-semibold py-3 px-8 rounded-md text-lg sm:text-xl hover:bg-gray-800 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50 transform hover:scale-105 active:scale-95">
            Megengeded hogy segítsek?
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderHero;