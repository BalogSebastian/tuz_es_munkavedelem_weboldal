// app/components/IntroSection.tsx
import React from 'react';

const IntroSection = () => {
  return (
    <section id="bemutatkozas" className="bg-white py-16 sm:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto"> {/* Középre igazított, maximális szélességű konténer az olvashatóságért */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-8 text-center">
          A Tűz- és Munkavédelem Fontossága
        </h2>
        <div className="text-lg text-gray-700 space-y-6">
          <p>
            Üdvözöljük! Célunk, hogy átfogó képet adjunk a tűz- és munkavédelem összetett, ám rendkívül fontos világáról. Ezen ismeretek birtokában nem csupán a jogszabályi előírásoknak tehet eleget, hanem hozzájárulhat egy biztonságosabb, egészségesebb és hatékonyabb munkakörnyezet kialakításához is.
          </p>
          <p>
            A tűzvédelem magában foglalja mindazokat a technikai, szervezési és jogi eszközöket, amelyekkel megelőzhetők a tűzesetek, illetve csökkenthetők azok káros hatásai. Ide tartozik a megfelelő tűzoltó készülékek biztosítása, a menekülési útvonalak kijelölése és karbantartása, valamint a munkavállalók rendszeres oktatása.
          </p>
          <p>
            A munkavédelem ezzel párhuzamosan a munkahelyi kockázatok felmérésére, a balesetek és foglalkozási megbetegedések megelőzésére összpontosít. Ez kiterjed az egyéni védőeszközök használatától kezdve, az ergonómiai szempontok figyelembevételén át, egészen a pszichoszociális kockázatok kezeléséig.
          </p>
          <p>
            Ismerje meg szolgáltatásainkat, és tegyük együtt biztonságosabbá vállalkozását!
          </p>
          {/* Itt folytathatod a bemutatkozó szöveget, vagy további alfejezeteket hozhatsz létre. */}
        </div>
      </div>
    </section>
  );
};

export default IntroSection;