'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

const accentColor = {
  text: 'text-[#03BABE]',
  bg: 'bg-[#03BABE]',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
  focusRingOffset: 'focus:ring-offset-white',
};

const PrivacyPolicyPage: React.FC = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif] relative overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
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
        <motion.button
          onClick={() => router.back()}
          className={`inline-flex items-center justify-center p-3 rounded-full ${accentColor.bg} text-white shadow-md ${accentColor.hoverBg} transition-all duration-300 mb-8`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <ArrowLeftIcon className="w-6 h-6" />
        </motion.button>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6 text-center">
          Adatvédelmi <span className={accentColor.text}>Nyilatkozat</span>
        </h1>
        
        <p className="text-slate-700 leading-relaxed mb-4">
          Cégünk, a JaniMark Kft. (a továbbiakban: "Adatkezelő") elkötelezett az Ön személyes adatainak védelme iránt. Jelen Adatvédelmi Nyilatkozat célja, hogy részletesen tájékoztassuk Önt arról, hogyan gyűjtjük, használjuk, tároljuk, védjük és kezeljük az Ön adatait a weboldalunk és szolgáltatásaink használata során, összhangban az Európai Unió Általános Adatvédelmi Rendeletével (GDPR) és a vonatkozó magyar jogszabályokkal.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Kérjük, figyelmesen olvassa el jelen Nyilatkozatot, mielőtt személyes adatait megosztaná velünk.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">1. Adatgyűjtés és Felhasználás</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az Adatkezelő különböző típusú személyes adatokat gyűjthet az Önnel való interakció során, a szolgáltatásaink nyújtásához és fejlesztéséhez.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">1.1. Weboldal Látogatása Során Gyűjtött Adatok:</h3>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>**Technikai adatok:** IP-cím, böngésző típusa és verziója, operációs rendszer, hozzáférés dátuma és ideje, hivatkozó URL-ek, látogatott oldalak, munkamenet időtartama.</li>
          <li>**Célja:** A weboldal működésének biztosítása, biztonsági ellenőrzések, statisztikai elemzések (pl. Google Analytics segítségével) a felhasználói élmény javítása és a szolgáltatások fejlesztése érdekében.</li>
          <li>**Jogi alapja:** Az Adatkezelő jogos érdeke (GDPR 6. cikk (1) bekezdés f) pont).</li>
        </ul>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">1.2. Kapcsolatfelvétel Során Gyűjtött Adatok:</h3>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>**Kapcsolati adatok:** Név, e-mail cím, telefonszám, cégnév, beosztás.</li>
          <li>**Üzenet tartalma:** Az Ön által megfogalmazott kérdések, kérések, ajánlatkérések részletei.</li>
          <li>**Célja:** A megkeresés megválaszolása, ajánlatkérés feldolgozása, információk nyújtása, előzetes konzultációk lebonyolítása.</li>
          <li>**Jogi alapja:** Az Ön hozzájárulása (GDPR 6. cikk (1) bekezdés a) pont) vagy a szerződéskötést megelőző lépések megtétele (GDPR 6. cikk (1) bekezdés b) pont).</li>
        </ul>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">1.3. Szolgáltatásnyújtás Során Gyűjtött Adatok:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Amennyiben Ön Megrendelőként szolgáltatásainkat igénybe veszi, további személyes és céges adatokat gyűjthetünk a Szerződés teljesítése érdekében.
        </p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>**Szerződéses adatok:** Cégjegyzékszám, adószám, székhely, telephelyek címei, bankszámlaszám.</li>
          <li>**Munkavállalói adatok (amennyiben a szolgáltatás jellege megköveteli, pl. oktatások, balesetvizsgálat):** Név, beosztás, aláírás, oktatási jegyzőkönyvekben való részvétel.</li>
          <li>**Specifikus adatok a szolgáltatáshoz:** A telephelyekre, gépekre, technológiákra, veszélyes anyagokra vonatkozó információk, amelyek a kockázatértékeléshez, szabályzatokhoz, oktatásokhoz szükségesek.</li>
          <li>**Célja:** A tűz-, munka-, környezetvédelmi és HACCP szolgáltatások szakszerű nyújtása, dokumentációk elkészítése, oktatások lebonyolítása, hatósági bejelentések teljesítése, számlázás és szerződéses kötelezettségek teljesítése.</li>
          <li>**Jogi alapja:** Szerződés teljesítése (GDPR 6. cikk (1) bekezdés b) pont), jogi kötelezettség teljesítése (GDPR 6. cikk (1) bekezdés c) pont), vagy az Adatkezelő jogos érdeke (GDPR 6. cikk (1) bekezdés f) pont), amennyiben az adatkezelés a szolgáltatásnyújtáshoz elengedhetetlen és az érintett érdekeivel arányos.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">2. Adattárolás és Adatbiztonság</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az Adatkezelő kiemelt figyelmet fordít az Ön személyes adatainak biztonságára.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">2.1. Adattárolás:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az Ön adatait biztonságos szervereken tároljuk, amelyek fizikai és informatikai védelemmel egyaránt rendelkeznek. Az adatok tárolása az Európai Gazdasági Térség (EGT) területén történik.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">2.2. Adatbiztonsági Intézkedések:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Megteszünk minden ésszerű technikai és szervezeti intézkedést, hogy megvédjük az Ön adatait az illetéktelen hozzáféréstől, módosítástól, nyilvánosságra hozataltól, törléstől, sérüléstől vagy megsemmisítéstől. Ezek az intézkedések magukban foglalják:
        </p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>Hozzáférési jogosultságok korlátozása és rendszeres felülvizsgálata.</li>
          <li>Titkosított adatkommunikáció (pl. SSL/TLS protokollok használata a weboldalon).</li>
          <li>Rendszeres biztonsági mentések készítése az adatok helyreállíthatóságának biztosítása érdekében.</li>
          <li>Tűzfalak és vírusvédelem alkalmazása.</li>
          <li>Rendszeres biztonsági auditok és sebezhetőségi vizsgálatok.</li>
          <li>Munkatársaink rendszeres adatvédelmi képzése és tudatosság növelése.</li>
        </ul>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">2.3. Adatmegőrzési Idő:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Személyes adatait csak addig tároljuk, ameddig az az adatgyűjtés céljának eléréséhez feltétlenül szükséges, vagy ameddig jogszabályi kötelezettség előírja.
        </p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>**Kapcsolatfelvételi adatok:** A megkeresés lezárását követő 3 hónapig, kivéve, ha szerződéses jogviszony jön létre.</li>
          <li>**Szerződéses adatok:** A szerződés megszűnését követő 8 évig (számviteli jogszabályok miatt).</li>
          <li>**Oktatási jegyzőkönyvek:** A jogszabályi előírásoknak megfelelően (általában 5 évig, súlyos baleset esetén hosszabb ideig).</li>
          <li>**Weboldal látogatási adatok:** Maximum 2 évig (Google Analytics beállításoktól függően).</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">3. Adattovábbítás és Adatfeldolgozók</h2>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">3.1. Adattovábbítás:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az Ön személyes adatait harmadik fél részére kizárólag az alábbi esetekben továbbíthatjuk:
        </p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>**Hatóságok felé:** Amennyiben jogszabályi kötelezettség írja elő (pl. balesetvizsgálat, adóhatóság).</li>
          <li>**Szolgáltatásnyújtáshoz kapcsolódó partnerek felé:** Amennyiben a szolgáltatás teljesítése megköveteli (pl. akkreditált laboratóriumok mérésekhez, alvállalkozók speciális feladatokhoz), kizárólag a szükséges mértékben és előzetes tájékoztatással.</li>
          <li>**Az Ön hozzájárulásával:** Minden más esetben kizárólag az Ön kifejezett hozzájárulásával.</li>
        </ul>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">3.2. Adatfeldolgozók:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az Adatkezelő adatfeldolgozókat vehet igénybe az adatkezelési műveletekhez. Az adatfeldolgozók kizárólag az Adatkezelő utasításai szerint járhatnak el, és kötelesek biztosítani az adatok megfelelő védelmét. Adatfeldolgozóink lehetnek például:
        </p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>IT szolgáltatók (szerver üzemeltetés, tárhely szolgáltatás).</li>
          <li>Könyvelési és adótanácsadó cégek.</li>
          <li>Online marketing és analitikai szolgáltatók (pl. Google).</li>
          <li>E-mail küldő szolgáltatók.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Minden adatfeldolgozóval írásbeli szerződést kötünk, amely garantálja a GDPR-nak való megfelelést és az adatok biztonságát.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">3.3. Harmadik Országba Történő Adattovábbítás:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Amennyiben az adatok EGT-n kívüli országba kerülnek továbbításra (pl. egyes felhőalapú szolgáltatások esetén), az Adatkezelő biztosítja, hogy a továbbításra a GDPR előírásainak megfelelően, megfelelő garanciák mellett kerüljön sor (pl. standard szerződési klauzulák, megfelelőségi határozat).
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">4. Az Ön Jogai</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az Ön, mint érintett, a GDPR alapján az alábbi jogokkal rendelkezik személyes adatai kezelésével kapcsolatban:
        </p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>**Hozzáférés joga (GDPR 15. cikk):** Joga van tájékoztatást kapni arról, hogy az Adatkezelő kezel-e Önre vonatkozó személyes adatokat, és ha igen, milyen adatokat, milyen célból, kinek továbbítja, mennyi ideig tárolja.</li>
          <li>**Helyesbítéshez való jog (GDPR 16. cikk):** Joga van kérni, hogy az Adatkezelő indokolatlan késedelem nélkül helyesbítse az Önre vonatkozó pontatlan személyes adatokat, vagy egészítse ki a hiányos adatokat.</li>
          <li>**Törléshez való jog ("elfeledtetéshez való jog") (GDPR 17. cikk):** Joga van kérni, hogy az Adatkezelő indokolatlan késedelem nélkül törölje az Önre vonatkozó személyes adatokat, amennyiben az adatkezelés célja megszűnt, az adatokra már nincs szükség, Ön visszavonja hozzájárulását, vagy az adatkezelés jogellenes.</li>
          <li>**Adatkezelés korlátozásához való jog (GDPR 18. cikk):** Joga van kérni az adatkezelés korlátozását, ha vitatja az adatok pontosságát, az adatkezelés jogellenes, de Ön ellenzi az adatok törlését, vagy az Adatkezelőnek már nincs szüksége az adatokra, de Önnek jogi igények érvényesítéséhez szüksége van rájuk.</li>
          <li>**Adathordozhatósághoz való jog (GDPR 20. cikk):** Joga van az Önre vonatkozó, Ön által az Adatkezelő rendelkezésére bocsátott személyes adatokat tagolt, széles körben használt, géppel olvasható formában megkapni, és ezeket az adatokat egy másik adatkezelőnek továbbítani.</li>
          <li>**Tiltakozáshoz való jog (GDPR 21. cikk):** Joga van tiltakozni személyes adatainak kezelése ellen, amennyiben az adatkezelés az Adatkezelő jogos érdekén alapul. Ebben az esetben az Adatkezelő nem kezelheti tovább az adatokat, kivéve, ha bizonyítja, hogy az adatkezelést olyan kényszerítő erejű jogos okok indokolják, amelyek elsőbbséget élveznek az Ön érdekeivel, jogaival és szabadságaival szemben, vagy amelyek jogi igények előterjesztéséhez, érvényesítéséhez vagy védelméhez kapcsolódnak.</li>
          <li>**Panasz benyújtásának joga (GDPR 77. cikk):** Joga van panaszt benyújtani a felügyeleti hatósághoz, ha úgy ítéli meg, hogy személyes adatainak kezelése sérti a GDPR rendelkezéseit. Magyarországon a felügyeleti hatóság a Nemzeti Adatvédelmi és Információszabadság Hatóság (NAIH).
            <br />
            NAIH elérhetőségei:
            <br />
            Cím: 1055 Budapest, Falk Miksa utca 9-11.
            <br />
            Postacím: 1363 Budapest, Pf.: 9.
            <br />
            Telefon: +36 (1) 391-1400
            <br />
            Fax: +36 (1) 391-1410
            <br />
            E-mail: ugyfelszolgalat@naih.hu
            <br />
            Weboldal: www.naih.hu
          </li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Jogainak gyakorlásához írásban (e-mailben vagy postai úton) fordulhat az Adatkezelőhöz a jelen Nyilatkozat 7. pontjában megadott elérhetőségeken. Az Adatkezelő indokolatlan késedelem nélkül, de legkésőbb a kérelem beérkezésétől számított egy hónapon belül tájékoztatja Önt a kérelem nyomán hozott intézkedésekről. Szükség esetén ez a határidő további két hónappal meghosszabbítható.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">5. Sütik (Cookies) Használata</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Weboldalunk sütiket (cookie-kat) használ a felhasználói élmény javítása, a weboldal működésének biztosítása és a statisztikai adatok gyűjtése érdekében. A sütik kis szöveges fájlok, amelyeket a böngészője tárol az Ön eszközén.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">5.1. Használt sütik típusai:</h3>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>**Feltétlenül szükséges sütik:** Ezek a sütik elengedhetetlenek a weboldal alapvető funkcióinak működéséhez (pl. navigáció, biztonságos területek elérése). Ezen sütik nélkül a weboldal nem tud megfelelően működni.</li>
          <li>**Teljesítményt mérő sütik (analitikai sütik):** Ezek a sütik információt gyűjtenek arról, hogyan használják a látogatók a weboldalt (pl. mely oldalakat látogatják meg a leggyakrabban, kapnak-e hibaüzeneteket). Ezek az adatok anonimizált formában kerülnek gyűjtésre, és a weboldal teljesítményének javítását szolgálják.</li>
          <li>**Funkcionális sütik:** Ezek a sütik lehetővé teszik a weboldal számára, hogy emlékezzen az Ön választásaira (pl. nyelv, régió), és továbbfejlesztett, személyesebb funkciókat biztosítson.</li>
          <li>**Marketing sütik:** Ezeket a sütiket arra használják, hogy relevánsabb hirdetéseket jelenítsenek meg az Ön érdeklődési körének megfelelően. Ezek a sütik nyomon követik a weboldalakon keresztüli böngészését.</li>
        </ul>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">5.2. Sütik kezelése:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          A legtöbb böngésző alapértelmezetten elfogadja a sütiket, de Önnek lehetősége van a böngésző beállításaiban módosítani a sütik kezelését, letiltani azokat, vagy értesítést kérni, mielőtt egy süti tárolásra kerülne. Felhívjuk figyelmét, hogy a sütik letiltása befolyásolhatja a weboldal bizonyos funkcióinak működését.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Részletesebb információkat a sütikről és azok kezeléséről a Sütiszabályzatunkban talál, amely a weboldalunkon külön dokumentumban érhető el.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">6. Harmadik Fél Szolgáltatók</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az Adatkezelő harmadik fél szolgáltatókat vehet igénybe a weboldal működtetéséhez és a szolgáltatások nyújtásához. Ezek a szolgáltatók szintén kezelhetnek személyes adatokat, és saját adatvédelmi szabályzatokkal rendelkeznek. Fontos, hogy Ön is megismerje ezeket a szabályzatokat.
        </p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>**Google Analytics:** Webanalitikai szolgáltatás, amely anonim statisztikai adatokat gyűjt a weboldal használatáról. (Google adatvédelmi irányelvei: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className={accentColor.text}>https://policies.google.com/privacy</a>)</li>
          <li>**Tárhely szolgáltató:** A weboldal és az adatok tárolásáért felelős.</li>
          <li>**E-mail szolgáltató:** A levelezés és hírlevelek küldéséért felelős.</li>
          <li>**Online időpontfoglaló rendszerek (pl. Calendly):** Amennyiben Ön online időpontot foglal, az adott szolgáltató adatvédelmi szabályzata is érvényes.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az Adatkezelő mindent megtesz annak érdekében, hogy csak olyan harmadik fél szolgáltatókkal működjön együtt, amelyek garantálják az adatok megfelelő szintű védelmét és megfelelnek a GDPR előírásainak.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">7. Adatvédelmi Incidensek Kezelése</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az adatvédelmi incidens a biztonság olyan sérülése, amely a továbbított, tárolt vagy más módon kezelt személyes adatok véletlen vagy jogellenes megsemmisítését, elvesztését, megváltoztatását, jogosulatlan közlését vagy az azokhoz való jogosulatlan hozzáférést eredményezi.
        </p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>**Intézkedések incidens esetén:** Adatvédelmi incidens esetén az Adatkezelő haladéktalanul megteszi a szükséges intézkedéseket az incidens azonosítására, kivizsgálására, elhárítására és a káros következmények enyhítésére.</li>
          <li>**Bejelentési kötelezettség:** Amennyiben az adatvédelmi incidens valószínűsíthetően magas kockázattal jár az érintettek jogaira és szabadságaira nézve, az Adatkezelő indokolatlan késedelem nélkül, de legkésőbb 72 órán belül értesíti a Nemzeti Adatvédelmi és Információszabadság Hatóságot (NAIH).</li>
          <li>**Érintettek tájékoztatása:** Amennyiben az incidens valószínűsíthetően magas kockázattal jár az Ön jogaira és szabadságaira nézve, az Adatkezelő indokolatlan késedelem nélkül tájékoztatja Önt az incidensről, a megtett intézkedésekről és az Önre vonatkozó lehetséges következményekről.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">8. Változások az Adatvédelmi Nyilatkozatban</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az Adatkezelő fenntartja a jogot, hogy jelen Adatvédelmi Nyilatkozatot bármikor módosítsa. A módosításokról a weboldalon történő közzététellel, vagy közvetlen tájékoztatással értesítjük Önt. Javasoljuk, hogy rendszeresen tekintse át ezt a Nyilatkozatot, hogy naprakész legyen az adatvédelmi gyakorlatunkkal kapcsolatban. A módosítások a közzétételtől számított 15. napon lépnek hatályba.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">9. Kapcsolat</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Amennyiben kérdése vagy kérése van az adatkezeléssel kapcsolatban, vagy szeretné gyakorolni jogait, kérjük, vegye fel velünk a kapcsolatot az alábbi elérhetőségeken:
        </p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>**Cégnév:** JaniMark Kft.</li>
          <li>**Székhely:** 4031 Debrecen, István út 140.</li>
          <li>**E-mail:** info@markjani.hu</li>
          <li>**Telefon:** +36 20 979 17 19</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Jelen Adatvédelmi Nyilatkozatot 2025. július 23. napján frissítettük.
        </p>
      </motion.div>
    </div>
  );
};

export default PrivacyPolicyPage;