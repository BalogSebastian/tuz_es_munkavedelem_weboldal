// app/components/HeaderHero.tsx
import React from 'react';

const HeaderHero = () => {
  return (
    // A h-screen itt h-[75vh]-ra változik
    <div className="h-[75vh] w-screen flex flex-col text-white antialiased">
      {/* Felső fekete sáv */}
      <div className="bg-black py-2 px-4 text-center text-sm sm:text-base">
        <p>Már csak ennyi ideig elérhető:</p>
      </div>

      {/* Fő narancssárga tartalom terület */}
      <div className="flex-grow flex flex-col items-center justify-center bg-[#DD520F] p-4 sm:p-8 text-center">
        {/* Tartalom konténer a maximális szélesség korlátozásához */}
        <div className="max-w-3xl">
          <p className="mb-4 text-lg sm:text-xl">
            A marketingesed nem hozza az elvárt eredményt?
          </p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Szerezz több ügyfelet és bevételt ezzel az apró, de kötelező elemmel, ami a legtöbb marketinges szerint lehetetlen!
          </h1>
          <p className="text-base sm:text-lg md:text-xl mb-8">
            Tervezzük meg lépésről lépésre, célzott mérőszámokkal és pontos költségtervvel azt a marketingrendszert, amiből pontosan láthatod hogyan érheted el a bevételi célod!
          </p>
          <button className="bg-black text-white font-semibold py-3 px-8 rounded-md text-lg sm:text-xl hover:bg-gray-800 transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50">
            MIRŐL VAN SZÓ?
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderHero;