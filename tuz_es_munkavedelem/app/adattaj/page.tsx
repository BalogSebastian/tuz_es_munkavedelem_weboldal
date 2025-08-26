'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

// A kiemelő szín beállításai, könnyen módosítható
const accentColor = {
  text: 'text-[#03BABE]',
  bg: 'bg-[#03BABE]',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  focusRingOffset: 'focus:ring-offset-white',
};

const AdatkezelesiTajekoztatoPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      {/* Háttér rácsozat */}
      <div className="absolute inset-0 z-0 opacity-10" style={{
        backgroundImage: `linear-gradient(rgba(3, 186, 190, 0.1) 1px, transparent 1px), linear-gradient(to right, rgba(3, 186, 190, 0.1) 1px, transparent 1px)`,
        backgroundSize: '3rem 3rem',
      }}></div>

      <motion.div
        className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-8 sm:p-10 relative z-10 border border-slate-100"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Vissza gomb */}
        <motion.button
          onClick={() => router.back()}
          className={`inline-flex items-center justify-center p-3 rounded-full ${accentColor.bg} text-white shadow-md ${accentColor.hoverBg} transition-all duration-300 mb-8`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </motion.button>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-8 text-center">
          Adatkezelési <span className={accentColor.text}>Tájékoztató</span>
        </h1>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">1. Mi a tájékoztató célja?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Ezt a Tájékoztatót abból a célból készítettük, hogy szolgáltatásainkat igénybe vevő természetes személyek és jogi személyek képviselői (a továbbiakban: Felhasználók) számára minden adatkezeléssel kapcsolatos lényeges információt egyértelműen, átláthatóan és közérthetően mutassunk be. Fontosnak tartjuk, hogy ügyfeleink pontosan megismerjék, milyen adatokat kezelünk, milyen jogalapon történik az adatkezelés, és hogyan tudják gyakorolni jogaikat.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Adatkezelési kötelezettségünket az Európai Parlament és Tanács (EU) 2016/679 rendelete (a továbbiakban: GDPR), valamint a magyar jogszabályok, különösen az információs önrendelkezési jogról és információszabadságról szóló 2011. évi CXII. törvény (a továbbiakban: Infotv.), továbbá az elektronikus kereskedelmi szolgáltatásokról szóló 2001. évi CVIII. törvény (a továbbiakban: Elkertv.) alapján teljesítjük.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Tájékoztató összeállítása során figyelembe vettük a GDPR és az Infotv. előírásait, valamint minden olyan releváns szabályozást, amely az adatkezelés szempontjából irányadó. A vonatkozó jogszabályok felsorolását az 1. számú melléklet tartalmazza, míg a legfontosabb fogalmak magyarázatát a 2. számú mellékletben adjuk meg.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az adatkezelési tájékoztató elkészítésekor a Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH) ajánlásait is figyelembe vettük, továbbá a GDPR 5. cikkében rögzített alapelvek – különösen az átláthatóság, a célhoz kötöttség és az elszámoltathatóság – szellemében jártunk el.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">2. Adatkezelő adatai</h2>
        <div className="bg-slate-50 p-4 rounded-lg">
            <ul className="list-none text-slate-700 leading-relaxed">
                <li><strong>Cégnév:</strong> Trident Shield Group Kft.</li>
                <li><strong>Kapcsolattartó:</strong> Németh János</li>
                <li><strong>Weboldal:</strong> https://munkavedelmiszakibeta.vercel.app/</li>
                <li><strong>Cégjegyzékszám:</strong> 15 09 093902</li>
                <li><strong>Székhely:</strong> 4485 Nagyhalász, Jókai utca 18.</li>
                <li><strong>Adószám:</strong> 32873537-1-15</li>
                <li><strong>E-mail:</strong> info.setter.job@gmail.com</li>
                <li><strong>Telefonszám:</strong> +36302722571</li>
            </ul>
        </div>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">3. Milyen adatkezelési folyamatok történnek a Weboldalon?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">Jelen pontban részletezzük az egyes adatkezelésekhez tartozó azon lényeges körülményeket, melyeket a GDPR és az egyéb ágazati jogszabályok elvárnak minden adatkezelőtől.</p>

        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">3.1. Hírlevél-küldéshez kapcsolódó adatkezelés</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Amennyiben Ön feliratkozik hírlevelünkre, rendszeresen tájékoztatjuk szolgáltatásainkról, jogszabályi változásokról és egyéb releváns információkról.</p>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.1.1. A kezelt személyes adatok és az adatkezelés célja</h4>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full bg-white text-black border border-slate-500 text-sm">
            <thead className="bg-slate-500">
              <tr>
                <th className="text-left font-semibold py-2 px-4 border-b">Személyes adat</th>
                <th className="text-left font-semibold py-2 px-4 border-b">Adatkezelés célja</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">név</td>
                <td className="py-2 px-4 border-b">a hírlevélben történő személyes megszólítás</td>
              </tr>
              <tr>
                <td className="py-2 px-4">e-mail cím</td>
                <td className="py-2 px-4">az elektronikus elérhetőség biztosítása, ahová a hírleveleket küldjük</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.1.2. Az adatkezelés jogalapja</h4>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>Az érintett hozzájárulása (GDPR 6. cikk (1) a) pont), valamint</li>
          <li>a gazdasági reklámtevékenység alapvető feltételeiről és egyes korlátairól szóló 2008. évi XLVIII. törvény (Grt.) 6. § (1) bekezdése.</li>
        </ul>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.1.3. Az adatkezelés időtartama</h4>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>A hozzájárulás visszavonásáig.</li>
          <li>A leiratkozás bármikor, indokolás nélkül megtehető a hírlevelek alján található „Leiratkozás” linkre kattintva.</li>
        </ul>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.1.4. Az adatkezelés módja</h4>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>Az adatkezelés elektronikus formában történik.</li>
          <li>Az adatokat kizárólag az adatkezelő és – amennyiben igénybe vételre kerül – a hírlevélküldő szolgáltató mint adatfeldolgozó kezeli, a szükséges mértékben.</li>
        </ul>

        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">3.2. Kapcsolatfelvétellel összefüggő adatkezelés</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Weboldalunkon, e-mailben vagy telefonon keresztül lehetőség van kapcsolatfelvételre. A kapcsolatfelvétel során megadott személyes adatokat az alábbiak szerint kezeljük:</p>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.2.1. A kezelt személyes adatok és az adatkezelés célja</h4>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full bg-white text-black border border-slate-500 text-sm">
            <thead className="bg-slate-500">
              <tr>
                <th className="text-left font-semibold py-2 px-4 border-b">Személyes adat</th>
                <th className="text-left font-semibold py-2 px-4 border-b">Adatkezelés célja</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">név</td>
                <td className="py-2 px-4 border-b">a felhasználó beazonosítása</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">e-mail cím</td>
                <td className="py-2 px-4 border-b">kapcsolattartás, válaszadás a megkeresésre</td>
              </tr>
              <tr>
                <td className="py-2 px-4">telefonszám</td>
                <td className="py-2 px-4">kapcsolattartás, gyorsabb ügyintézés</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.2.2. Az adatkezelés jogalapja</h4>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>Az érintett hozzájárulása (GDPR 6. cikk (1) a) pont), illetve</li>
          <li>az adatkezelés az adatkezelő jogos érdekén is alapulhat a felhasználói megkeresések megválaszolása érdekében (GDPR 6. cikk (1) f) pont).</li>
        </ul>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.2.3. Az adatkezelés időtartama</h4>
        <p className="text-slate-700 leading-relaxed mb-4">A kapcsolatfelvételt követően az adatokat legfeljebb 1 évig őrizzük meg, majd törlésre kerülnek, kivéve, ha a kapcsolatfelvételből szerződés vagy ügyfélkapcsolat jön létre, amely további adatkezelést indokol.</p>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.2.4. Az adatkezelés módja</h4>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>Az adatkezelés elektronikus formában történik.</li>
          <li>Az adatokhoz kizárólag az adatkezelő jogosult hozzáférni, az ügyintézéshez szükséges mértékben.</li>
        </ul>
        
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">3.3. Számlázással kapcsolatos adatkezelés</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Szolgáltatás igénybevétele esetén az adatkezelő a számviteli előírásoknak megfelelően számlát állít ki. A számla kiállítása és megőrzése érdekében az alábbi személyes adatok kezelésére kerül sor:</p>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.3.1. A kezelt személyes adatok és az adatkezelés célja</h4>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full bg-white border text-black border-slate-500 text-sm">
            <thead className="bg-slate-500">
              <tr>
                <th className="text-left font-semibold py-2 px-4 border-b">Személyes adat</th>
                <th className="text-left font-semibold py-2 px-4 border-b">Adatkezelés célja</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">név (magánszemély esetén) / cégnév</td>
                <td className="py-2 px-4 border-b">a számla kiállítása</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">lakcím / székhely (irányítószám, város, utca, házszám)</td>
                <td className="py-2 px-4 border-b">a számla kiállítása és a jogszabályi előírásoknak való megfelelés</td>
              </tr>
              <tr>
                <td className="py-2 px-4">adószám (vállalkozás esetén)</td>
                <td className="py-2 px-4">a számla kiállítása és a jogszabályi előírások teljesítése</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.3.2. Az adatkezelés jogalapja</h4>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
            <li>Jogszabályi kötelezettség teljesítése:
                <ul className="list-circle list-inside pl-6">
                    <li>GDPR 6. cikk (1) c) pont,</li>
                    <li>a számvitelről szóló 2000. évi C. törvény (Számviteli tv.) 166. § (1)–(3) bekezdései.</li>
                </ul>
            </li>
        </ul>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.3.3. Az adatkezelés időtartama</h4>
        <p className="text-slate-700 leading-relaxed mb-4">A számlák és a számlához kapcsolódó személyes adatok a jogszabályi kötelezettség alapján 8 évig megőrzésre kerülnek (Számviteli tv. 169. § (2) bekezdés).</p>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.3.4. Az adatkezelés módja</h4>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>Az adatkezelés elektronikus formában történik.</li>
          <li>A számlázási adatokat az adatkezelő könyvelője vagy számlázóprogram-szolgáltatója (mint adatfeldolgozó) is kezelheti, kizárólag a jogszabályi kötelezettségek teljesítése érdekében.</li>
        </ul>

        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">3.4. Ügyfélszolgálattal és panaszkezeléssel kapcsolatos adatkezelés</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az ügyfélszolgálattal való kapcsolatfelvétel és a panaszkezelés során az ügyfelek által megadott személyes adatokat az alábbiak szerint kezeljük:</p>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.4.1. A kezelt személyes adatok és az adatkezelés célja</h4>
        <div className="overflow-x-auto my-4">
          <table className="min-w-full bg-white text-black border border-slate-500 text-sm">
            <thead className="bg-slate-500">
              <tr>
                <th className="text-left font-semibold py-2 px-4 border-b">Személyes adat</th>
                <th className="text-left font-semibold py-2 px-4 border-b">Adatkezelés célja</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">név</td>
                <td className="py-2 px-4 border-b">az ügyfél beazonosítása</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">e-mail cím</td>
                <td className="py-2 px-4 border-b">kapcsolattartás, tájékoztatás nyújtása, válasz a panaszra</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">telefonszám</td>
                <td className="py-2 px-4 border-b">gyorsabb ügyintézés, kapcsolattartás</td>
              </tr>
              <tr>
                <td className="py-2 px-4">panasz tartalma</td>
                <td className="py-2 px-4">a bejelentés rögzítése és kivizsgálása</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.4.2. Az adatkezelés jogalapja</h4>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
            <li>Jogszabályi kötelezettség teljesítése (GDPR 6. cikk (1) c) pont), különösen:
                <ul className="list-circle list-inside pl-6">
                    <li>az információs önrendelkezési jogról és információszabadságról szóló 2011. évi CXII. törvény (Infotv.),</li>
                    <li>a fogyasztóvédelemről szóló 1997. évi CLV. törvény (Fgytv.) 17/A. § (7) bekezdése.</li>
                </ul>
            </li>
        </ul>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.4.3. Az adatkezelés időtartama</h4>
        <p className="text-slate-700 leading-relaxed mb-4">A panaszokhoz kapcsolódó adatokat a panasz beérkezésétől számított 5 évig őrizzük meg a Fgytv. előírásainak megfelelően.</p>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.4.4. Az adatkezelés módja</h4>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>Az adatkezelés elektronikus formában történik.</li>
          <li>Az adatokat kizárólag az adatkezelő és az ügyfélszolgálatért felelős munkatársak kezelik, a panasz kivizsgálásához szükséges mértékben.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">4. Az érintettek jogai</h2>
        <p className="text-slate-700 leading-relaxed mb-4">Számunkra kiemelten fontos, hogy személyes adataik kezelése során ügyfeleink jogai maradéktalanul érvényesüljenek. Az adatkezelésnek mindig tisztességesnek, jogszerűnek és átláthatónak kell lennie, ezért biztosítjuk, hogy az érintettek a jogszabályokban meghatározott jogokat gyakorolhassák.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Az érintettek különösen jogosultak arra, hogy tájékoztatást kapjanak adataik kezeléséről, kérhessék azok helyesbítését, törlését, kezelésének korlátozását, valamint tiltakozhassanak az adatkezelés ellen. Bizonyos esetekben joguk van az adatok hordozhatóságához is.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Az alábbiakban részletesen bemutatjuk, hogy Ön milyen jogokkal élhet a kezelt személyes adataival kapcsolatban.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">4.1. Hozzáféréshez való jog</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az érintett jogosult visszajelzést kapni arról, hogy személyes adatainak kezelése folyamatban van-e, és ha igen, jogosult arra, hogy hozzáférést kapjon a kezelt adatokhoz, valamint az adatkezelés céljairól, jogalapjáról és időtartamáról szóló információkhoz.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">4.2. Helyesbítéshez való jog</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az érintett kérheti a pontatlan személyes adatainak helyesbítését, illetve a hiányos adatok kiegészítését.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">4.3. Törléshez való jog („elfeledtetéshez való jog”)</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az érintett kérheti személyes adatainak törlését, ha azokra már nincs szükség, ha visszavonja hozzájárulását, tiltakozik az adatkezelés ellen, vagy az adatkezelés jogellenes.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">4.4. Az adatkezelés korlátozásához való jog</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az érintett kérheti az adatkezelés korlátozását, ha vitatja az adatok pontosságát, az adatkezelés jogellenes, de nem kéri a törlést, vagy ha az adatkezelőnek már nincs szüksége az adatokra, de az érintett igényli azokat jogi igény érvényesítéséhez.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">4.5. Tiltakozáshoz való jog</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az érintett tiltakozhat személyes adatai kezelése ellen, ha az adatkezelés jogos érdeken alapul.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">4.6. Adathordozhatósághoz való jog</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az érintett jogosult arra, hogy a rá vonatkozó, általa megadott személyes adatokat széles körben használt, géppel olvasható formátumban megkapja, és jogosult arra, hogy ezeket egy másik adatkezelőnek továbbítsa.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">4.7. Reagálási határidő</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az adatkezelő indokolatlan késedelem nélkül, de legkésőbb a kérelem beérkezésétől számított 30 napon belül köteles válaszolni az érintett kérelmére. Különösen indokolt esetben ez a határidő további két hónappal meghosszabbítható.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">4.8. Jogorvoslati lehetőségek</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Amennyiben az érintett úgy érzi, hogy az adatkezelő megsértette a személyes adatok védelméhez fűződő jogait, az alábbi jogorvoslati lehetőségekkel élhet:</p>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">Panasz benyújtása az adatkezelőhöz</h4>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
            <li>Az érintett közvetlenül az adatkezelőhöz fordulhat kérdésével, észrevételével vagy panaszával. Az adatkezelő a panaszt kivizsgálja, és legkésőbb a panasz kézhezvételétől számított 30 napon belül írásban válaszol.</li>
        </ul>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">Panasz benyújtása a felügyeleti hatósághoz (NAIH)</h4>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
            <li>Az érintett jogosult panaszt benyújtani a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH), ha megítélése szerint a személyes adatainak kezelése sérti a 2016/679/EU általános adatvédelmi rendelet (GDPR), illetve a hazai adatvédelmi jogszabályok, különösen az információs önrendelkezési jogról és az információszabadságról szóló 2011. évi CXII. törvény (Infotv.) rendelkezéseit.
                <ul className="list-none list-inside pl-6 mt-2 bg-slate-50 p-3 rounded">
                    <li><strong>Név:</strong> Nemzeti Adatvédelmi és Információszabadság Hatóság</li>
                    <li><strong>Székhely:</strong> 1055 Budapest, Falk Miksa utca 9–11.</li>
                    <li><strong>Postacím:</strong> 1363 Budapest, Pf. 9.</li>
                    <li><strong>Telefon:</strong> +36 (1) 391-1400</li>
                    <li><strong>E-mail:</strong> ugyfelszolgalat@naih.hu</li>
                    <li><strong>Honlap:</strong> www.naih.hu</li>
                </ul>
            </li>
        </ul>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">Bírósági jogérvényesítés</h4>
        <p className="text-slate-700 leading-relaxed mb-4">Az érintett a Polgári Törvénykönyvről szóló 2013. évi V. törvény és a GDPR 79. cikke alapján bírósághoz fordulhat, amennyiben úgy ítéli meg, hogy az adatkezelő megsértette a személyes adatok védelméhez fűződő jogait.</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
            <li>A pert az érintett választása szerint a lakóhelye vagy tartózkodási helye szerinti illetékes törvényszék előtt is megindíthatja.</li>
            <li>A bíróság a pert soron kívül folytatja le.</li>
        </ul>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">5. Jogok gyakorlására irányuló kérelmekkel kapcsolatos eljárásunk</h2>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">5.1. Címzettek értesítése</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az adatkezelő a helyesbítésről, törlésről és az adatkezelés korlátozásáról értesíti mindazokat a címzetteket, akikkel az érintett személyes adatait közöltük, kivéve, ha ez lehetetlennek bizonyul, vagy aránytalanul nagy erőfeszítést igényel. Az érintett kérésére tájékoztatást nyújtunk a címzettekről.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">5.2. Tájékoztatás módja és határideje</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az érintett kérelme nyomán hozott intézkedésekről indokolatlan késedelem nélkül, de legkésőbb a kérelem beérkezésétől számított egy hónapon belül tájékoztatást adunk.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Ez a határidő – a kérelem összetettségére és a kérelmek számára tekintettel – indokolt esetben további két hónappal meghosszabbítható. A határidő meghosszabbításáról és annak indokairól az érintettet a kérelem kézhezvételétől számított egy hónapon belül tájékoztatjuk.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Az érintett kérésére szóbeli tájékoztatást is adhatunk, feltéve, hogy személyazonosságát megfelelő módon igazolta.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Amennyiben nem teszünk intézkedést a kérelem nyomán, az érintettet legkésőbb a kérelem beérkezésétől számított egy hónapon belül tájékoztatjuk az intézkedés elmaradásának okairól, továbbá arról, hogy panaszt nyújthat be a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH), valamint élhet bírósági jogorvoslati jogával.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">5.3. Ellenőrzés</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Amennyiben megalapozott kétség merül fel a kérelmet benyújtó személyazonosságát illetően, további, a személyazonosság megerősítéséhez szükséges információkat kérhetünk. Ez az intézkedés a GDPR 5. cikk (1) bekezdés f) pontján alapul, amely az adatbiztonság és a jogosulatlan hozzáférés megakadályozásának követelménye.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">5.4. Tájékoztatás és intézkedés költségei</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az érintett kérelmei alapján adott tájékoztatás és az azok alapján hozott intézkedések díjmentesek.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Ha azonban az érintett kérelme egyértelműen megalapozatlan, ismétlődő jellegű vagy túlzó, az adatkezelő jogosult:</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
            <li>észszerű díjat felszámítani az adminisztratív költségek fedezésére, vagy</li>
            <li>megtagadni a kérelem alapján történő intézkedést.</li>
        </ul>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">Kérelmek benyújtása</h4>
        <p className="text-slate-700 leading-relaxed mb-4">Az adatkezelési jogok gyakorlására irányuló kérelmeket az alábbi elérhetőségeken lehet benyújtani:</p>
        <div className="bg-slate-50 p-4 rounded-lg">
            <ul className="list-none text-slate-700 leading-relaxed">
                <li><strong>Adatkezelő neve:</strong> Trident Shield Group Kft.</li>
                <li><strong>Székhely:</strong> 4485 Nagyhalász, Jókai utca 18.</li>
                <li><strong>E-mail:</strong> info.setter.job@gmail.com</li>
                <li><strong>Telefon:</strong> +36302722571</li>
                <li><strong>Az adatvédelmi ügyek intézéséért felelős kapcsolattartó:</strong> Németh János.</li>
            </ul>
        </div>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">6. Személyes adatok lehetséges címzettjei, adatfeldolgozók</h2>
        <p className="text-slate-700 leading-relaxed mb-4">Az adatkezelő a személyes adatok kezelését kizárólag a jogszabályban meghatározott kötelezettségeinek teljesítése, valamint a szolgáltatásai biztosítása érdekében végzi. Az adatkezelés során az alábbi adatfeldolgozók és címzettek vehetik igénybe a felhasználók személyes adatait:</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">6.1. Tárhelyszolgáltató</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A weboldal üzemeltetése során a felhasználók által megadott személyes adatok a tárhelyszolgáltató szerverein tárolódnak.</p>
        <div className="bg-slate-50 p-4 rounded-lg">
            <ul className="list-none text-slate-700 leading-relaxed">
                <li><strong>Név:</strong> [A Tárhelyszolgáltató Neve]</li>
                <li><strong>Székhely:</strong> [A Tárhelyszolgáltató Székhelye]</li>
                <li><strong>Elérhetőség:</strong> [A Tárhelyszolgáltató Elérhetősége]</li>
            </ul>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">6.2. Számlázóprogram</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A számlák kiállítása és megőrzése érdekében a számlázóprogram üzemeltetője adatfeldolgozóként jár el.</p>
        <div className="bg-slate-50 p-4 rounded-lg">
            <ul className="list-none text-slate-700 leading-relaxed">
                <li><strong>Név:</strong> KBOSS.hu Kereskedelmi és Szolgáltató Kft. (Számlázz.hu)</li>
                <li><strong>Székhely:</strong> 1031 Budapest, Záhony utca 7.</li>
                <li><strong>Cégjegyzékszám:</strong> 01-09-303201</li>
                <li><strong>Adószám:</strong> 13421739-2-41</li>
                <li><strong>Weboldal:</strong> https://www.szamlazz.hu</li>
            </ul>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">6.3. Nemzeti Adó- és Vámhivatal (NAV)</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Jogszabályi kötelezettség alapján az adatkezelő a számlázással kapcsolatos adatokat köteles a Nemzeti Adó- és Vámhivatal részére továbbítani.</p>
        <div className="bg-slate-50 p-4 rounded-lg">
            <ul className="list-none text-slate-700 leading-relaxed">
                <li><strong>Név:</strong> Nemzeti Adó- és Vámhivatal</li>
                <li><strong>Székhely:</strong> 1054 Budapest, Széchenyi utca 2.</li>
                <li><strong>Weboldal:</strong> https://www.nav.gov.hu</li>
            </ul>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">6.4. Megrendelt termékek kiszállításával összefüggésben</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az adatkezelő a szolgáltatás teljesítése érdekében együttműködik tűz- és munkavédelmi szakemberekkel, akik az ügyfél részére készítendő dokumentáció és jegyzőkönyvek előállításában vesznek részt. E tevékenység során a partnerek kizárólag a szolgáltatás teljesítéséhez szükséges mértékben ismerhetik meg az ügyfelek személyes adatait (pl. név, beosztás, elérhetőség, cégadatok). A partnerek az adatkezelő megbízásából járnak el, önálló adatkezelést nem végeznek.</p>
        <div className="bg-slate-50 p-4 rounded-lg">
            <ul className="list-none text-slate-700 leading-relaxed">
                <li><strong>Név:</strong> [Partner neve / vállalkozása]</li>
                <li><strong>Székhely:</strong> [Partner Székhelye]</li>
                <li><strong>Elérhetőség:</strong> [Partner Elérhetősége]</li>
            </ul>
        </div>
        <p className="text-slate-700 leading-relaxed my-4">Az adatkezelő és a partner között adatfeldolgozói megállapodás van érvényben, amely biztosítja a GDPR 28. cikkében előírt követelmények teljesülését.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">6.5. Megrendelés díjának fizetésével összefüggésben</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A megrendelés díját banki szolgáltató, mint adatfeldolgozó felületén keresztül lehet megfizetni. Az adatfeldolgozó adatai az alábbiak:</p>
        <div className="bg-slate-50 p-4 rounded-lg">
            <ul className="list-none text-slate-700 leading-relaxed">
                <li><strong>Név:</strong> CIB Bank Zrt.</li>
                <li><strong>Székhely:</strong> 1027 Budapest, Medve utca 4–14.</li>
                <li><strong>Postacím:</strong> 1537 Budapest, Pf. 394.</li>
                <li><strong>Elérhetőség:</strong> informacio@cib.hu</li>
                <li><strong>Telefonszám:</strong> (+36 1) 4 242 242</li>
                <li><strong>Weboldal:</strong> https://www.cib.hu</li>
            </ul>
        </div>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">6.6. Közösségi média felületekkel összefüggésben</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Adatkezelő jelen van bizonyos közösségi média felületeken (pl. Facebook, LinkedIn). Amennyiben a Felhasználó az adott platformon kapcsolatba lép velünk (pl. üzenetet küld, oldalunkat „kedveli”), az ott megvalósuló adatkezelésre az adott szolgáltató (pl. Meta Platforms Ireland Ltd., LinkedIn Ireland Unlimited Company) saját adatkezelési szabályzata az irányadó.</p>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">7. Adatbiztonság</h2>
        <p className="text-slate-700 leading-relaxed mb-4">Az adatkezelő kiemelt figyelmet fordít arra, hogy a felhasználók személyes adatainak kezelése minden körülmények között biztonságosan történjen. A személyes adatokhoz való hozzáférés kizárólag a feladataik ellátásához szükséges mértékben engedélyezett, és az adatbiztonság garantálása érdekében mind technikai, mind szervezési intézkedéseket alkalmazunk.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">7.1. Szervezési intézkedések</h3>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
            <li>Az adatkezelőnél a személyes adatokhoz kizárólag azok a munkavállalók és megbízott partnerek (pl. tűz- és munkavédelmi szakemberek) férhetnek hozzá, akiknek a munkakörükből adódóan ez elengedhetetlen a feladatuk ellátásához.</li>
            <li>A hozzáférések kiosztásánál érvényesül a „szükséges és elégséges jogok elve”: minden érintett személy kizárólag a munkájához feltétlenül szükséges adatokhoz férhet hozzá, a szükséges időtartamra.</li>
            <li>Az adatkezelő minden érintettel (munkavállaló, partner) titoktartási nyilatkozatot köt ki, amely garantálja, hogy a személyes adatok kizárólag a jogszerű és szerződéses kötelezettségek teljesítése érdekében kerülnek felhasználásra.</li>
            <li>Az adatvédelmi szabályok és titoktartási kötelezettségek megsértése szankcionálható, és a munkatársak rendszeres képzést kapnak a személyes adatok kezelésére vonatkozóan.</li>
        </ul>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">7.2. Technikai intézkedések</h3>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
            <li>Az adatokat – az adatfeldolgozókon (pl. tárhelyszolgáltató, számlázóprogram) keresztül kezelt adatok kivételével – az adatkezelő saját eszközein, biztonságos környezetben tárolja.</li>
            <li>A weboldalon és a háttérrendszerekben tárolt adatokat többszintű jogosultságkezelés védi, a hozzáférések naplózása révén minden művelet visszakövethető.</li>
            <li>A belső hálózatokat és az internetes kommunikációt többrétegű tűzfalak és vírusvédelmi rendszerek védik. A rendszer rendszeresen frissített kártevő-elhárító szoftverekkel működik.</li>
            <li>Az adatok átvitele titkosított csatornán történik, az adatkezelő weboldalán HTTPS protokoll van érvényben, amely magasabb biztonsági szintet jelent a HTTP protokollhoz képest.</li>
            <li>Az adatvesztés és adatmegsérülés elkerülése érdekében rendszeres adatmentések készülnek, amelyek biztonságos helyen kerülnek megőrzésre.</li>
            <li>A tárhelyszolgáltató dedikált, elkülönített szerverein történik az adatkezelés, amelyeket fizikai és logikai védelmi intézkedések egyaránt biztosítanak.</li>
        </ul>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">7.3. Incidenskezelés</h3>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
            <li>Az adatkezelő olyan rendszereket alkalmaz, amelyek lehetővé teszik a hozzáférési kísérletek, jogosulatlan behatolások észlelését, valamint a bekövetkezett incidensek gyors kezelését.</li>
            <li>Adatvédelmi incidens észlelése esetén az adatkezelő köteles a GDPR 33. cikke alapján a Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH) felé 72 órán belül bejelentést tenni.</li>
            <li>Amennyiben az incidens a felhasználók jogait vagy szabadságait érinti, az adatkezelő a GDPR 34. cikke szerint az érintetteket is megfelelően tájékoztatja.</li>
        </ul>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">7.4. Folyamatos megfelelés biztosítása</h3>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
            <li>Az adatkezelő a személyes adatok védelmére vonatkozó belső szabályzatokat rendszeresen felülvizsgálja, és szükség esetén aktualizálja.</li>
            <li>A használt szoftverek és informatikai rendszerek naprakészségéről folyamatosan gondoskodik, annak érdekében, hogy megfeleljenek a piacon elérhető legújabb biztonsági követelményeknek.</li>
            <li>Az adatkezelő együttműködik adatfeldolgozó partnereivel (pl. tárhelyszolgáltató, számlázóprogram, banki szolgáltató), és meggyőződik arról, hogy ők is a GDPR előírásainak megfelelő technikai és szervezési intézkedéseket alkalmaznak.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">8. Sütik (Cookies) kezelése</h2>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">8.1. Mi a süti?</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A süti (cookie) egy kis méretű szöveges fájl, amelyet a weboldal a Felhasználó számítógépére, okostelefonjára vagy más internet-hozzáféréssel rendelkező eszközére helyez el. A sütik lehetővé teszik, hogy a weboldal felismerje a Felhasználót, megjegyezze a beállításait (például nyelv, betűméret, megjelenítési mód), valamint biztosítsa a weboldal hatékonyabb, személyre szabott használatát.</p>
        <p className="text-slate-700 leading-relaxed mb-4">A sütik önmagukban nem alkalmasak arra, hogy a Felhasználót közvetlenül azonosítsák, és nem tartalmaznak vírusokat vagy egyéb kártékony programokat.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">8.2. A weboldalon használt sütik típusai</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Weboldalunk a következő sütiket alkalmazza:</p>
        <ol className="list-decimal list-inside text-slate-700 leading-relaxed mb-4 pl-4 space-y-2">
            <li><strong>Elengedhetetlen (szükséges) sütik</strong>
                <ul className="list-disc list-inside pl-6">
                    <li>A weboldal alapvető működését biztosítják.</li>
                    <li>Például: biztonságos belépés, űrlapok kitöltésének kezelése, munkamenet fenntartása.</li>
                    <li>E sütik hiányában a weboldal nem tud megfelelően működni.</li>
                </ul>
            </li>
            <li><strong>Funkcionális sütik</strong>
                <ul className="list-disc list-inside pl-6">
                    <li>Lehetővé teszik, hogy a weboldal megjegyezze a Felhasználó egyéni beállításait.</li>
                    <li>Például: nyelvi beállítás, betűméret, megjelenítési mód.</li>
                    <li>Ezek növelik a felhasználói élményt.</li>
                </ul>
            </li>
            <li><strong>Teljesítmény- és analitikai sütik</strong>
                <ul className="list-disc list-inside pl-6">
                    <li>Információt gyűjtenek arról, hogyan használják a látogatók a weboldalt.</li>
                    <li>Segítenek megérteni, mely oldalak a legnépszerűbbek, milyen hibák fordulnak elő, és miként lehet a weboldalt továbbfejleszteni.</li>
                    <li>Ezek kizárólag statisztikai célokat szolgálnak.</li>
                </ul>
            </li>
            <li><strong>Marketing és célzott sütik</strong>
                <ul className="list-disc list-inside pl-6">
                    <li>Ezek teszik lehetővé, hogy a Felhasználó érdeklődésének megfelelő hirdetések jelenjenek meg.</li>
                    <li>Ilyeneket tipikusan harmadik fél (pl. Google, Facebook) helyezhet el.</li>
                </ul>
            </li>
            <li><strong>Munkamenet (session) sütik</strong>
                <ul className="list-disc list-inside pl-6">
                    <li>Ideiglenes sütik, amelyek a böngészés időtartamára kerülnek elhelyezésre, majd a böngésző bezárásával automatikusan törlődnek.</li>
                </ul>
            </li>
        </ol>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">8.3. Google Analytics használata</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Weboldalunk igénybe veszi a Google Analytics szolgáltatást, amelyet a Google Ireland Ltd. (Gordon House, Barrow Street, Dublin 4, Írország) üzemeltet.</p>
        <p className="text-slate-700 leading-relaxed mb-4">A Google Analytics sütiket alkalmaz annak érdekében, hogy elemezze a weboldal látogatottságát és a Felhasználók böngészési szokásait. A sütik által létrehozott információk – ideértve a Felhasználó IP-címét, a használt böngésző típusát, a meglátogatott oldalakat és a látogatás időpontját – a Google szervereire kerülnek továbbításra és ott tárolódnak.</p>
        <p className="text-slate-700 leading-relaxed mb-4">A weboldalon az IP-anonimizálás aktív, így a Google az IP-cím rövidített változatát rögzíti az Európai Unió tagállamain belül, mielőtt az Egyesült Államokba történő továbbítás megtörténne. Csak kivételes esetben kerül sor a teljes IP-cím továbbítására.</p>
        <p className="text-slate-700 leading-relaxed mb-4">A Google az adatokat kizárólag a weboldal üzemeltetője számára értékeli ki, és jelentéseket készít a weboldal aktivitásáról. A Google nem kapcsolja össze a Google Analytics keretében gyűjtött adatokat a Felhasználó más Google-szolgáltatások keretében megadott adataival.</p>
        <p className="text-slate-700 leading-relaxed mb-4">A Felhasználó a böngésző beállításaiban letilthatja a sütik tárolását, illetve telepítheti a Google által biztosított böngésző-kiegészítőt, amely megakadályozza, hogy a Google Analytics adatokat gyűjtsön róla. Ez az alábbi linken érhető el: <a href="https://tools.google.com/dlpage/gaoptout?hl=hu" target="_blank" rel="noopener noreferrer" className={`break-all ${accentColor.text} hover:underline`}>https://tools.google.com/dlpage/gaoptout?hl=hu</a></p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">8.4. Hogyan kezelhetők a sütik?</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A Felhasználó a sütik tárolását bármikor szabályozhatja, letilthatja vagy törölheti. A sütik tiltása esetén előfordulhat, hogy a weboldal bizonyos funkciói nem lesznek elérhetők.</p>
        <p className="text-slate-700 leading-relaxed mb-4">A sütik kezelése és törlése böngészőnként eltérő módon történik. Az alábbi linkeken található részletes útmutató:</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
            <li>Mozilla Firefox</li>
            <li>Google Chrome</li>
            <li>Microsoft Edge</li>
            <li>Internet Explorer 11</li>
            <li>Safari</li>
            <li>Opera</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">9. Egyéb rendelkezések</h2>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">9.1. Adatgyűjtés aktivitásról</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A Felhasználók weboldalon végzett aktivitásáról kizárólag olyan módon gyűjtünk adatokat, amelyek nem kapcsolhatók össze a Felhasználó által megadott személyes adatokkal (pl. név, e-mail cím, telefonszám). Az így keletkező adatok statisztikai jellegűek, céljuk a weboldal fejlesztése és működésének optimalizálása.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">9.2. Adatkezelés eltérő célra</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Amennyiben a kezelt személyes adatokat az eredeti adatfelvételtől eltérő célra kívánnánk felhasználni, erről a Felhasználót előzetesen, egyértelmű és részletes tájékoztatást adunk. Az eltérő célú adatkezeléshez minden esetben a Felhasználó kifejezett hozzájárulását kérjük.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">9.3. Nyilvántartási kötelezettség</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az adatkezelő a felelősségi körébe tartozó adatkezelési tevékenységekről nyilvántartást vezet, a GDPR 30. cikke alapján. A nyilvántartás tartalmazza többek között az adatkezelés célját, jogalapját, az érintetti kört, a kezelt adatok kategóriáit, a címzettek körét, valamint az adattárolás időtartamát.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">9.4. Adatvédelmi incidens</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Adatvédelmi incidensnek minősül minden olyan esemény, amely a személyes adatok jogosulatlan vagy jogellenes kezelését, megsemmisítését, elvesztését, megváltoztatását vagy jogosulatlan nyilvánosságra hozatalát eredményezi.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Incidens esetén az adatkezelő a GDPR 33–34. cikkei szerint köteles eljárni:</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
            <li>az adatvédelmi incidenst a tudomására jutástól számított 72 órán belül köteles bejelenteni a Nemzeti Adatvédelmi és Információszabadság Hatóságnak (NAIH), kivéve, ha valószínűsíthetően nem jár kockázattal az érintettek jogaira és szabadságaira nézve;</li>
            <li>amennyiben az incidens magas kockázattal járhat az érintettek jogaira és szabadságaira nézve, az adatkezelő indokolatlan késedelem nélkül értesíti az érintetteket is.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">Az incidensekről külön nyilvántartást vezetünk, amelyben feltüntetjük az incidens körülményeit, hatásait és a megtett intézkedéseket.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">9.5. Módosítás</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az adatkezelő jogosult jelen Tájékoztatót bármikor, egyoldalúan módosítani. A módosításról a weboldalon keresztül tájékoztatást adunk, és az új változat a közzététel napjától hatályos.</p>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">10. Mellékletek</h2>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">1. számú melléklet: Vonatkozó jogszabályok</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az Adatkezelési Tájékoztató kialakítása során az Adatkezelő figyelembe vette a vonatkozó hatályos jogszabályokat, valamint az Európai Unió és a magyar jogrendszer releváns rendelkezéseit. Különös tekintettel az alábbiakra:</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>Az Európai Parlament és a Tanács (EU) 2016/679 rendelete (2016. április 27.) a természetes személyeknek a személyes adatok kezelése tekintetében történő védelméről és az ilyen adatok szabad áramlásáról (általános adatvédelmi rendelet, GDPR).</li>
          <li>Az információs önrendelkezési jogról és az információszabadságról szóló 2011. évi CXII. törvény (Infotv.).</li>
          <li>A Polgári Törvénykönyvről szóló 2013. évi V. törvény (Ptk.).</li>
          <li>A polgári perrendtartásról szóló 2016. évi CXXX. törvény (Pp.).</li>
          <li>A számvitelről szóló 2000. évi C. törvény (Sztv.).</li>
          <li>A fogyasztóvédelemről szóló 1997. évi CLV. törvény (Fgytv.).</li>
          <li>Az elektronikus kereskedelmi szolgáltatásokról, valamint az információs társadalommal összefüggő szolgáltatások egyes kérdéseiről szóló 2001. évi CVIII. törvény (Ekertv.).</li>
        </ul>

        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">2. számú melléklet: A személyes adatok kezelésével kapcsolatos fogalmak</h3>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4 space-y-2">
            <li><strong>Adatkezelő:</strong> az a természetes vagy jogi személy, illetve szerv, amely a személyes adatok kezelésének céljait és eszközeit önállóan vagy másokkal együtt meghatározza.</li>
            <li><strong>Adatkezelés:</strong> a személyes adatokon vagy adatállományokon automatizált vagy nem automatizált módon végzett bármely művelet vagy műveletek összessége, így különösen a gyűjtés, rögzítés, rendszerezés, tagolás, tárolás, átalakítás, megváltoztatás, lekérdezés, betekintés, felhasználás, közlés, továbbítás, terjesztés, nyilvánosságra hozatal, összehangolás, összekapcsolás, korlátozás, törlés vagy megsemmisítés.</li>
            <li><strong>Adattovábbítás:</strong> a személyes adatok meghatározott harmadik személy számára történő hozzáférhetővé tétele.</li>
            <li><strong>Adattörlés:</strong> a személyes adatok felismerhetetlenné tétele oly módon, hogy a helyreállításuk többé nem lehetséges.</li>
            <li><strong>Adatmegjelölés:</strong> a személyes adatok azonosító jelzéssel való ellátása azok jövőbeni kezelésének korlátozása érdekében.</li>
            <li><strong>Adatkezelés korlátozása:</strong> a tárolt személyes adatok megjelölése a jövőbeni kezelésük korlátozása céljából.</li>
            <li><strong>Adatmegsemmisítés:</strong> a személyes adatokat tartalmazó adathordozó teljes fizikai megsemmisítése.</li>
            <li><strong>Adatfeldolgozó:</strong> az a természetes vagy jogi személy, hatóság, ügynékség vagy egyéb szerv, amely az adatkezelő nevében személyes adatokat kezel.</li>
            <li><strong>Címzett:</strong> az a természetes vagy jogi személy, hatóság, ügynökség vagy más szerv, akivel a személyes adatot közlik, függetlenül attól, hogy harmadik fél-e.</li>
            <li><strong>Érintett / Felhasználó:</strong> azonosított vagy azonosítható természetes személy, aki közvetlenül vagy közvetve azonosítható, különösen valamely azonosító, például név, azonosítószám, helymeghatározó adat, online azonosító, vagy a természetes személy testi, fiziológiai, genetikai, szellemi, gazdasági, kulturális vagy szociális azonosságára vonatkozó tényezők alapján.</li>
            <li><strong>Harmadik személy:</strong> az a természetes vagy jogi személy, közhatalmi szerv, ügynökség vagy bármely egyéb szerv, amely nem azonos az érintettel, az adatkezelővel vagy az adatfeldolgozóval.</li>
            <li><strong>Hozzájárulás:</strong> az érintett akaratának önkéntes, konkrét, tájékozott és egyértelmű kinyilvánítása, amellyel az érintett nyilatkozat vagy megerősítést egyértelműen kifejező cselekedet útján jelzi beleegyezését személyes adatainak kezeléséhez.</li>
            <li><strong>IP-cím:</strong> valamennyi hálózatban, amelyben a kommunikáció TCP/IP protokoll szerint zajlik, a szerverek és számítógépek egyedi azonosító száma. Az IP-cím azonosításra és a felhasználó beazonosítására alkalmas lehet.</li>
            <li><strong>Személyes adat:</strong> az érintettre vonatkozó bármely információ.</li>
            <li><strong>Tiltakozás:</strong> az érintett nyilatkozata, amellyel személyes adatainak kezelését kifogásolja, és kéri a kezelés megszüntetését, illetve a kezelt adatok törlését.</li>
            <li><strong>Cookie (süti):</strong> a webszerver által küldött és a felhasználó számítógépén elhelyezett kis adatcsomag (szöveges fájl), amely egyedi azonosításra, illetve a felhasználó beállításainak tárolására szolgál.</li>
        </ul>

        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">3. számú melléklet: Érintetti jogok</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A GDPR célja, hogy az érintettek (Felhasználók) átlátható és egyértelmű jogokat gyakorolhassanak személyes adataikkal kapcsolatban. Az alábbiakban részletesen bemutatjuk, milyen lehetőségei vannak minden érintettnek, és mi, mint Adatkezelők, hogyan biztosítjuk ezek érvényesítését.</p>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.1. Hozzáférés joga</h4>
        <p className="text-slate-700 leading-relaxed mb-4">A Felhasználó jogosult arra, hogy tájékoztatást kapjon arról, hogy kezeljük-e a személyes adatait, és ha igen, akkor pontosan milyen adatokat, milyen célból, milyen jogalapon és mennyi ideig tárolunk. Ez magában foglalja azt is, hogy a Felhasználó információt kapjon az adatok címzettjeiről, az adattovábbítás lehetőségeiről, valamint a jogorvoslati lehetőségeiről.</p>
        <p className="text-slate-700 leading-relaxed mb-4">A hozzáférési jog része az is, hogy a Felhasználó másolatot kérhet a kezelt adatokról. A másolatot elektronikus formában (például PDF vagy XML fájlban) biztosítjuk, de igény esetén papír alapon is átadjuk. Ez a szolgáltatás első alkalommal díjmentes, további másolatokért azonban – adminisztratív költségek fedezésére – ésszerű díjat számíthatunk fel.</p>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.2. Helyesbítés joga</h4>
        <p className="text-slate-700 leading-relaxed mb-4">Amennyiben a Felhasználó úgy véli, hogy a róla kezelt adatok pontatlanok vagy hiányosak, jogosult kérni ezek helyesbítését vagy kiegészítését. Mi kötelesek vagyunk indokolatlan késedelem nélkül elvégezni a javítást.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Ez azért kiemelten fontos jog, mert a pontatlan adatokból téves követztetések születhetnek, illetve hibás ügyintézés történhet. Például ha a megadott elérhetőségi adat hibás, az akadályozhatja a kapcsolattartást vagy a szolgáltatásnyújtást.</p>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.3. Törléshez való jog („elfeledtetés joga”)</h4>
        <p className="text-slate-700 leading-relaxed mb-4">A Felhasználó kérheti személyes adatainak törlését, amennyiben:</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
            <li>az adatokra már nincs szükség az adatkezelés céljából,</li>
            <li>a hozzájárulását visszavonta, és az adatkezelésnek nincs más jogalapja,</li>
            <li>tiltakozott az adatkezelés ellen, és nincs elsőbbséget élvező jogszerű ok az adatkezelés folytatására,</li>
            <li>az adatkezelés jogellenes,</li>
            <li>jogszabály írja elő a törlést.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">Fontos hangsúlyozni, hogy a törlési kérelem teljesítése nem jelentheti azt, hogy minden adat azonnal megsemmisül: bizonyos esetekben (például számlázási adatok, törvényi megőrzési kötelezettség alá tartozó iratok) a jogszabály előírja az adatok megőrzését. Ezekben az esetekben az adatok törlésére a törvényi kötelezettség megszűnését követően kerülhet sor.</p>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.4. Az adatkezelés korlátozásához való jog</h4>
        <p className="text-slate-700 leading-relaxed mb-4">A Felhasználó kérheti, hogy a személyes adatok kezelése bizonyos időre vagy körülmények között korlátozás alá essen. Ilyen eset például, ha:</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
            <li>vitatja az adatok pontosságát (a helyesbítés idejére),</li>
            <li>az adatkezelés jogellenes, de a Felhasználó nem törlést, hanem csak korlátozást kér,</li>
            <li>az adatkezelés célja megszűnt, de a Felhasználónak szüksége van az adatokra jogi igények előterjesztéséhez vagy védelméhez,</li>
            <li>a Felhasználó tiltakozott az adatkezelés ellen, és még vizsgáljuk, hogy az adatkezelő jogos indokai elsőbbséget élveznek-e.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">A korlátozás időtartama alatt az adatokat alapvetően csak tárolni lehet, más művelet nem végezhető rajtuk, kivéve ha az érintett hozzájárulását adja, vagy jogi kötelezettség teljesítése indokolja.</p>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.5. Adathordozhatósághoz való jog</h4>
        <p className="text-slate-700 leading-relaxed mb-4">A Felhasználó jogosult arra, hogy az általa megadott, és automatizált módon kezelt adatokat széles körben használt, géppel olvasható formátumban (pl. CSV, JSON, XML) megkapja, és ezeket egy másik adatkezelőhöz továbbítsa. Ez a jog elősegíti az adatkezelők közötti szabad váltást, például szolgáltatóváltás esetén.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Ez a jog azonban csak akkor gyakorolható, ha az adatkezelés hozzájáruláson vagy szerződés teljesítésén alapul, és az adatkezelés automatizált módon történik. Papír alapú nyilvántartások esetén tehát nem alkalmazható.</p>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.6. Tiltakozáshoz való jog</h4>
        <p className="text-slate-700 leading-relaxed mb-4">A Felhasználó bármikor tiltakozhat személyes adatainak kezelése ellen, ha az adatkezelés közérdekű feladat ellátásához vagy jogos érdek érvényesítéséhez szükséges. Ilyen esetben az adatokat nem kezelhetjük tovább, kivéve, ha bizonyítjuk, hogy az adatkezelést olyan kényszerítő erejű jogos okok indokolják, amelyek elsőbbséget élveznek a Felhasználó érdekeivel és jogaival szemben.</p>
        <p className="text-slate-700 leading-relaxed mb-4">A Felhasználó emellett jogosult arra is, hogy bármikor tiltakozzon személyes adatainak közvetlen üzletszerzési célokra (például hírlevélküldés) való felhasználása ellen. Ha a Felhasználó tiltakozik, akkor a személyes adatokat ezen célból többé nem kezelhetjük.</p>
        <h4 className="text-lg font-semibold text-slate-700 mb-2 mt-4">3.7. Jogorvoslati lehetőségek</h4>
        <p className="text-slate-700 leading-relaxed mb-4">Amennyiben a Felhasználó úgy ítéli meg, hogy a személyes adatainak kezelése sérti a GDPR vagy más adatvédelmi jogszabály rendelkezéseit, az alábbi lehetőségei vannak:</p>
        <ol className="list-decimal list-inside text-slate-700 leading-relaxed mb-4 pl-4 space-y-2">
            <li><strong>Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH) fordulhat</strong>
                 <ul className="list-none list-inside pl-6 mt-2 bg-slate-50 p-3 rounded">
                    <li><strong>Cím:</strong> 1125 Budapest, Szilágyi Erzsébet fasor 22/c.</li>
                    <li><strong>Telefon:</strong> +36-1-391-1400</li>
                    <li><strong>E-mail:</strong> ugyfelszolgalat@naih.hu</li>
                    <li><strong>Honlap:</strong> https://www.naih.hu</li>
                </ul>
            </li>
            <li><strong>Bírósági jogorvoslatot kezdeményezhet</strong>
                <p className="text-slate-700 leading-relaxed mt-2 pl-6">A Felhasználó jogosult arra is, hogy a lakóhelye vagy tartózkodási helye szerint illetékes bíróságnál pert indítson, ha úgy érzi, hogy személyes adatainak kezelése jogsértő. Az eljárás polgári per keretében történik a Polgári Törvénykönyv (2013. évi V. törvény) és a polgári perrendtartás szabályai szerint.</p>
            </li>
        </ol>

      </motion.div>
    </div>
  );
};

export default AdatkezelesiTajekoztatoPage;