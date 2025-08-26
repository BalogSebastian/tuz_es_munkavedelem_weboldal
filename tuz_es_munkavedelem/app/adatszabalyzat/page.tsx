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

const AdatkezelesiSzabalyzatPage: React.FC = () => {
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
          Adatkezelési <span className={accentColor.text}>Szabályzat</span>
        </h1>
        
        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">1. A Szabályzat célja</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Trident Shield Group Kft (a továbbiakban: Adatkezelő) jelen Szabályzatot abból a célból bocsátja ki, hogy biztosítsa a személyes adatok kezelése során a jogszabályi megfelelést, különös tekintettel az Európai Parlament és a Tanács (EU) 2016/679. számú általános adatvédelmi rendeletére (GDPR), valamint a 2011. évi CXII. törvényre (Infotv.).
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Szabályzat célja, hogy egyértelműen meghatározza:
        </p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>az Adatkezelő által alkalmazott adatvédelmi elveket és szabályokat,</li>
          <li>az adatkezelés gyakorlati rendjét,</li>
          <li>az érintettek jogainak érvényesülését biztosító mechanizmusokat,</li>
          <li>valamint azokat a kötelezettségeket, amelyeket az Adatkezelő munkatársai és megbízottjai kötelesek követni.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Ez a dokumentum minden olyan személyre nézve kötelező érvényű, aki az Adatkezelő nevében vagy érdekében személyes adatot kezel.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          A szabályzat kiadásának célja továbbá, hogy a munkavállalók és megbízottak az adatkezelési műveletek végrehajtása során következetesen a jogszerűség, tisztességesség, átláthatóság és bizalmasság elvei szerint járjanak el.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">2. Munkáltató (Adatkezelő) adatai</h2>
        <ul className="list-none text-slate-700 leading-relaxed mb-4 bg-slate-50 p-4 rounded-lg">
          <li><strong>Cégnév:</strong> Trident Shield Group Kft</li>
          <li><strong>Weboldal:</strong> https://munkavedelmiszakibeta.vercel.app/</li>
          <li><strong>Cégjegyzékszám:</strong> 15 09 093902</li>
          <li><strong>Székhely:</strong> 4485 Nagyhalász, Jókai utca 18.</li>
          <li><strong>Adószám:</strong> 32873537-1-15</li>
          <li><strong>E-mail:</strong> info.setter.job@gmail.com</li>
          <li><strong>Telefonszám:</strong> +36302722571</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az Adatkezelő a személyes adatok védelmét a hatályos jogszabályokkal összhangban biztosítja. Az adatkezelés kizárólag a feladatellátáshoz szükséges mértékben történik, az érintettek jogainak tiszteletben tartásával.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az Adatkezelő tevékenységének jellege alapján adatvédelmi tisztviselő (DPO) kijelölése nem kötelező, mivel a GDPR 37. cikke szerinti feltételek nem állnak fenn (az Adatkezelő nem végez nagymértékű, különleges adatok kezelését, nem folytat rendszeres, nagyléptékű megfigyelést, és nem minősül közfeladatot ellátó szervnek).
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">3. Lényeges fogalmak, meghatározások</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          A jelen Szabályzat alkalmazása során az alábbi fogalmakat az Európai Unió Általános Adatvédelmi Rendelete (GDPR), valamint a vonatkozó magyar jogszabályok alapján kell értelmezni.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Adatkezelő</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az a természetes vagy jogi személy, hatóság, intézmény vagy más szerv, amely önállóan vagy másokkal együtt meghatározza a személyes adatok kezelésének céljait és eszközeit. Az adatkezelő felelős azért, hogy az adatkezelés minden szakasza megfeleljen a jogszabályi előírásoknak.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Adatkezelés</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A személyes adatokon végzett bármely művelet vagy műveletek összessége, függetlenül attól, hogy automatizált módon történik-e. Ide tartozik különösen az adatok gyűjtése, rögzítése, rendszerezése, tárolása, átalakítása, felhasználása, továbbítása, nyilvánosságra hozatala, törlése vagy megsemmisítése.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Adatfeldolgozó</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az a természetes vagy jogi személy, hatóság, intézmény vagy más szerv, amely az adatkezelő nevében személyes adatokat kezel, és e tevékenységet kizárólag az adatkezelő utasításai alapján végezheti.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Személyes adat</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Minden olyan információ, amely egy azonosított vagy azonosítható természetes személyre (érintettre) vonatkozik. Ide tartozik többek között a név, születési adatok, lakcím, elérhetőségek, valamint bármely online azonosító, amely alapján az érintett közvetlenül vagy közvetve beazonosítható.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Harmadik fél</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Minden olyan természetes vagy jogi személy, hatóság, intézmény vagy más szerv, amely nem azonos az érintettel, az adatkezelővel vagy az adatfeldolgozóval, illetve azokkal a személyekkel, akik az adatkezelő vagy adatfeldolgozó közvetlen irányítása alatt jogosultak a személyes adatok kezelésére.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Adatkezelés korlátozása</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A személyes adatok megjelölése a jövőbeni kezelés korlátozása érdekében. Ez azt jelenti, hogy az adat ideiglenesen csak tárolható, más adatkezelési művelet nem végezhető rajta.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Álnevesítés</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Olyan adatkezelési módszer, amelynek során a személyes adatot további információ felhasználása nélkül nem lehet többé egyértelműen azonosítani. Az álnevesített adatok így csökkentik annak kockázatát, hogy jogosulatlan személyek az érintett azonosítását elvégezhessék.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Nyilvántartási rendszer</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A személyes adatok bármely módon – központosított, decentralizált vagy funkcionális szempontok szerint – szervezett halmaza, amely meghatározott ismérvek alapján hozzáférhető.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Adatvédelmi incidens</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A biztonság olyan sérülése, amelynek következtében a kezelt személyes adatok véletlen vagy jogellenes megsemmisítése, elvesztése, jogosulatlan közlése vagy az azokhoz való jogosulatlan hozzáférés történik.</p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">4. Az adatkezelés elvei (a GDPR 5. cikke alapján)</h2>
        <p className="text-slate-700 leading-relaxed mb-4">Az Adatkezelő a személyes adatok kezelését minden esetben a GDPR és a vonatkozó magyar jogszabályok előírásainak megfelelően végzi. Ennek keretében az alábbi alapelveket tartja irányadónak:</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Jogtisztaság és átláthatóság</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A személyes adatok kezelését jogszerűen, tisztességesen és az érintettek számára átlátható módon kell végezni.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Célhoz kötöttség</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A személyes adatok gyűjtése csak meghatározott, egyértelmű és jogszerű célból történhet, és azok nem kezelhetők a céllal össze nem egyeztethető módon.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Adattakarékosság</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A személyes adatoknak az adatkezelés céljai szempontjából megfelelőnek, relevánsnak és a szükséges mértékre korlátozottnak kell lenniük.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Pontosság</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A kezelt adatoknak pontosnak és naprakésznek kell lenniük. A pontatlan adatokat haladéktalanul helyesbíteni vagy törölni kell.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Korlátozott tárolhatóság</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A személyes adatokat csak addig lehet megőrizni, ameddig az adatkezelés céljának eléréséhez feltétlenül szükséges. Hosszabb megőrzés kizárólag közérdekű archiválási, tudományos vagy statisztikai célból történhet.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Integritás és bizalmas jelleg</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az adatkezelést oly módon kell végezni, hogy megfelelő technikai és szervezési intézkedésekkel biztosítva legyen az adatok megfelelő biztonsága. Ideértve a jogosulatlan vagy jogellenes kezelés, a véletlen elvesztés, megsemmisítés vagy károsodás elleni védelmet is.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">Elszámoltathatóság</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az Adatkezelő felelős az adatkezelési elvek betartásáért, és köteles azoknak való megfelelést igazolni.</p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">5. Adatkezelések leírása</h2>
        <p className="text-slate-700 leading-relaxed mb-4">A szervezetünk által végzett adatkezelések részletes bemutatása megtalálható a Weboldalunkon közzétett Adatkezelési Tájékoztatóban, amely nyilvánosan elérhető minden érintett számára.</p>
        <p className="text-slate-700 leading-relaxed mb-4">A szervezet az alábbi fő adatkezelési tevékenységeket végzi:</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>Munkavállalói adatok kezelése: a foglalkoztatás során szükséges személyes adatok kezelése a munkaügyi nyilvántartások és a vonatkozó jogszabályok alapján.</li>
          <li>Partnerek és alvállalkozók adatainak kezelése: a felek között kötött szerződésekben meghatározott célok érdekében.</li>
          <li>Szolgáltatások nyújtásához kapcsolódó adatkezelések: ügyfelek adatai kizárólag a szolgáltatás teljesítése és jogszabályi kötelezettségek teljesítése érdekében kerülnek kezelésre.</li>
          <li>Eszközhasználat és titoktartás: a munkavállalók számára biztosított eszközök, rendszerek és hozzáférések használatát, valamint a titoktartási kötelezettségeket külön belső szabályzatok tartalmazzák.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">A szervezet a hatályos jogszabályoknak megfelelően – különös tekintettel az Infotv. 5. § (5) bekezdésére – rendszeresen, de legalább háromévente felülvizsgálja adatkezelési folyamatait, annak érdekében, hogy azok célhoz kötötten és jogszerűen történjenek, valamint megfeleljenek az érintettek érdekeinek és a GDPR előírásainak.</p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">6. A szervezet feladatai a megfelelő adatvédelem érdekében</h2>
        <p className="text-slate-700 leading-relaxed mb-4">A szervezet az adatvédelmi megfelelőség biztosítása érdekében az alábbi intézkedéseket alkalmazza:</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>Adatvédelmi tudatosság: gondoskodunk arról, hogy minden munkavállaló megfelelő képzést kapjon a vonatkozó adatvédelmi és adatkezelési előírásokról.</li>
          <li>Célhoz kötött adatkezelés: minden adatkezelési folyamat egyértelmű céllal, jogalappal és megfelelő dokumentációval történik.</li>
          <li>Átláthatóság: az érintettek számára nyújtott tájékoztatás világos, közérthető és könnyen hozzáférhető formában történik.</li>
          <li>Jogérvényesítés: biztosítjuk, hogy az érintettek jogaikat (hozzáférés, helyesbítés, törlés, korlátozás, tiltakozás, adathordozhatóság) bármikor gyakorolhassák.</li>
          <li>Adatvédelmi incidensek kezelése: amennyiben személyes adat jogosulatlan kezelésére, elvesztésére vagy sérülésére kerül sor, azt haladéktalanul jelentjük, és szükség esetén a Nemzeti Adatvédelmi és Információszabadság Hatóságot (NAIH) legkésőbb 72 órán belül értesítjük.</li>
          <li>Biztonsági intézkedések: technikai és szervezési megoldások alkalmazásával gondoskodunk arról, hogy a személyes adatok védettek legyenek az illetéktelen hozzáférés, a jogosulatlan módosítás, a véletlen megsemmisülés vagy károsodás ellen.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">7. Adatbiztonság</h2>
        <p className="text-slate-700 leading-relaxed mb-4">Az Adatkezelő minden szükséges technikai, szervezési és adminisztratív intézkedést megtesz annak érdekében, hogy a kezelt személyes adatok biztonságát garantálja, valamint megakadályozza azokhoz való jogosulatlan hozzáférést, megváltoztatást, továbbítást, nyilvánosságra hozatalt, törlést vagy megsemmisítést.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Az adatbiztonság keretében különös figyelmet fordítunk:</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>a nyilvántartások elektronikus védelmére, beleértve a megfelelő jogosultsági szintek kialakítását és a rendszeres jelszókezelést,</li>
          <li>a tárolt adatok technikai biztonságára, például vírusvédelemmel, tűzfallal és többlépcsős azonosítással,</li>
          <li>a fizikai biztonságra, vagyis arra, hogy az adathordozók és szerverek illetéktelenek számára ne legyenek hozzáférhetők,</li>
          <li>a rendszeres mentésekre és azok biztonságos tárolására,</li>
          <li>valamint a munkavállalók adatbiztonsági képzésére és titoktartási kötelezettségére.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">Az adatbiztonsági intézkedések kiválasztásánál mindig figyelembe vesszük a technológia aktuális fejlettségét és a kockázatok mértékét. Törekvésünk, hogy minden esetben a lehető legmagasabb szintű védelem biztosított legyen, kivéve ha ez az Adatkezelő számára aránytalan nehézséget jelentene.</p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">8. Adatvédelmi incidens</h2>
        <p className="text-slate-700 leading-relaxed mb-4">Adatvédelmi incidensnek minősül minden olyan esemény, amely a személyes adatok biztonságát sérti, így különösen a kezelt adatok jogosulatlan hozzáférése, nyilvánosságra hozatala, módosítása, elvesztése vagy megsemmisülése.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Az adatvédelmi incidens következménye lehet:</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>az érintett jogainak sérelme,</li>
          <li>vagyonában, jó hírnevében vagy személyiségi jogaiban bekövetkező kár,</li>
          <li>személyazonosság-lopás, csalás, jogosulatlan adatfelhasználás.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">Az Adatkezelő köteles az adatvédelmi incidenst indokolatlan késedelem nélkül, de legkésőbb 72 órán belül bejelenteni az illetékes felügyeleti hatóságnak (NAIH), kivéve, ha bizonyítható, hogy az incidens valószínűsíthetően nem jár kockázattal a természetes személyek jogaira és szabadságaira nézve.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Amennyiben az incidens magas kockázattal jár az érintett személyekre nézve, az Adatkezelő haladéktalanul tájékoztatja az érintetteket, világos és közérthető nyelven ismertetve az esemény jellegét, a lehetséges következményeket, valamint azokat az intézkedéseket, amelyeket a kockázatok csökkentése érdekében megtett vagy tervez.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Az incidensekről nyilvántartás készül, amely tartalmazza:</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>az incidens leírását,</li>
          <li>a körülményeket, hatásokat és az érintett adatok körét,</li>
          <li>az incidens elhárítására hozott intézkedéseket.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">9. Ügyviteli és nyilvántartási célú adatkezelés</h2>
        <p className="text-slate-700 leading-relaxed mb-4">A szervezet a működéséhez kapcsolódó ügyviteli és nyilvántartási kötelezettségei teljesítése érdekében bizonyos esetekben személyes adatokat kezel.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Az adatkezelés célja többek között:</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>a munkavállalók adatainak kezelése, amely a munkaviszonyból fakadó jogszabályi és szerződéses kötelezettségeken alapul,</li>
          <li>a szervezethez jelentkezők (pl. pályázók, álláskeresők) adatainak kezelése, a szerződéskötést megelőző eljárás során,</li>
          <li>a szervezettel megbízási vagy egyéb jogviszonyban álló személyek adatainak kezelése kapcsolattartási és elszámolási célból,</li>
          <li>a szervezettel üzleti kapcsolatban álló jogi személyek, intézmények, vállalkozások kapcsolattartóinak adatai, amelyek elengedhetetlenek a kapcsolattartás és az azonosítás biztosításához.</li>
        </ul>
        <p className="text-slate-700 leading-relaxed mb-4">Az ügyviteli és nyilvántartási adatkezelés minden esetben jogszabályi vagy szerződéses kötelezettségen, illetve a szervezet jogos érdekén alapul.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Az érintettek által írásban benyújtott dokumentumok (pl. önéletrajz, pályázati anyag, beadott kérelmek) kezelése során az adatkezelő kizárólag a célhoz kötöttség elvét tartja szem előtt. Az adatok megőrzése a szükséges ideig történik, a megőrzési idő lejártával pedig a dokumentumok megsemmisítésre kerülnek, amelyről jegyzőkönyv készül.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Az ügyviteli célú adatkezelés során kezelt személyes adatok kizárólag az adott ügy irataiban és a szervezet nyilvántartásaiban szerepelnek, azokat csak a szükséges ideig tároljuk. Az adatok felülvizsgálatát évente el kell végezni annak érdekében, hogy a pontatlan vagy felesleges személyes adatok törlésre kerüljenek.</p>
        <p className="text-slate-700 leading-relaxed mb-4">A szervezet minden esetben biztosítja, hogy az ügyviteli és nyilvántartási adatkezelés megfeleljen a jogszabályi követelményeknek, különös tekintettel az átláthatóságra, a célhoz kötöttségre és az adattakarékosság elvére.</p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">10. Milyen jogai vannak az Érintetteknek?</h2>
        <p className="text-slate-700 leading-relaxed mb-4">Az Érintett személyek a GDPR és a vonatkozó magyar jogszabályok alapján számos joggal rendelkeznek személyes adataik kezelésével kapcsolatban. Ezek a jogok biztosítják, hogy az Érintett mindig kontrollt gyakorolhasson adatai felett, és hogy az adatkezelés átlátható, jogszerű és tisztességes módon történjen.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Az Érintett az alábbi jogokat gyakorolhatja:</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">10.1. Hozzáférési jog</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az Érintett jogosult visszajelzést kapni arról, hogy személyes adatainak kezelése folyamatban van-e, és ha igen, jogosult ezen adatokhoz, valamint az adatkezeléssel összefüggő részletes információkhoz hozzáférni.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">10.2. Helyesbítéshez való jog</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az Érintett kérheti a pontatlan személyes adatainak indokolatlan késedelem nélküli helyesbítését, illetve jogosult hiányos adatainak kiegészítését kiegészítő nyilatkozat útján.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">10.3. Törléshez való jog („az elfeledtetéshez való jog”)</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az Érintett kérheti személyes adatainak törlését, ha:</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>az adatokra már nincs szükség abból a célból, amelyből gyűjtötték,</li>
          <li>az Érintett visszavonta hozzájárulását,</li>
          <li>az adatkezelés jogellenes,</li>
          <li>vagy az Érintett tiltakozott az adatkezelés ellen.</li>
        </ul>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">10.4. Az adatkezelés korlátozásához való jog</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az Érintett kérheti személyes adatainak kezelésének korlátozását, például ha vitatja az adatok pontosságát, vagy ha az adatkezelés jogellenes, de nem kívánja az adatok törlését.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">10.5. Adathordozhatósághoz való jog</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az Érintett jogosult az általa a Szolgáltató rendelkezésére bocsátott személyes adatait tagolt, széles körben használt, géppel olvasható formátumban megkapni, illetve jogosult arra is, hogy ezen adatokat egy másik adatkezelőhöz továbbítsa.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">10.6. Tiltakozáshoz való jog</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az Érintett bármikor tiltakozhat személyes adatainak kezelése ellen, ha az adatkezelés jogalapja a Szolgáltató jogos érdeke. Ilyen esetben az adatkezelést meg kell szüntetni, kivéve, ha az adatkezelő bizonyítja, hogy az adatkezelés jogszerű, és az Érintett jogaihoz, szabadságaihoz képest fontosabb jogos indok áll fenn.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">10.7. Panasztétel joga</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Amennyiben az Érintett úgy ítéli meg, hogy adatai kezelése sérti a GDPR-t vagy más vonatkozó jogszabályt, panaszt tehet a Nemzeti Adatvédelmi és Információszabadság Hatóságnál (NAIH, 1055 Budapest, Falk Miksa utca 9-11., postacím: 1363 Budapest, Pf. 9., e-mail: ugyfelszolgalat@naih.hu, web: www.naih.hu).</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">10.8. Bírósági jogorvoslathoz való jog</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az Érintett a polgári perrendtartás szabályai szerint a bíróság előtt is érvényesítheti jogait, ha úgy érzi, hogy az adatkezelés során megsértették a személyes adatai védelméhez való jogát.</p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">11. Értesítési és intézkedési kötelezettség</h2>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">11.1. Címzettek értesítése</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A helyesbítésről, törlésről, adatkezelés-korlátozásról a szervezet minden esetben értesíti azokat a címzetteket, akikkel, illetve amelyekkel az Érintett személyes adatait közölte, kivéve, ha ez lehetetlennek bizonyul, vagy aránytalanul nagy erőfeszítést igényelne. Az Érintett kérésére a szervezet tájékoztatást nyújt az érintett címzettekről.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">11.2. Tájékoztatás módja, határideje</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A 10. ponthoz kapcsolódó kérelmek nyomán hozott intézkedésekről a szervezet legkésőbb a kérelem beérkezésétől számított egy hónapon belül – ha az Érintett másként nem kéri – elektronikus formában tájékoztatást ad.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Indokolt esetben, figyelemmel a kérelem összetettségére és számára, a határidő további két hónappal meghosszabbítható. A határidő meghosszabbításáról, valamint annak indokairól a szervezet a kérelem beérkezésétől számított egy hónapon belül értesíti az Érintettet.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Az Érintett kérésére szóbeli tájékoztatás is adható, amennyiben az Érintett személyazonossága más módon igazolható.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Amennyiben a szervezet nem tesz intézkedést a kérelem nyomán, a kérelem beérkezésétől számított legfeljebb egy hónapon belül indokolnia kell ennek okát, és tájékoztatnia kell az Érintettet a Nemzeti Adatvédelmi és Információszabadság Hatósághoz (NAIH) való panasztételi jogáról, illetve bírósági jogorvoslati lehetőségéről.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">11.3. Ellenőrzés</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Ha a szervezetnek megalapozott kétségei merülnek fel a kérelem benyújtója személyazonosságát illetően, további, személyazonosság megerősítéséhez szükséges információkat kérhet. Ezzel a GDPR 5. cikk (1) bekezdés f) pontjában meghatározott bizalmasság és jogosulatlan hozzáférés-megelőzés követelményét biztosítja.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">11.4. Tájékoztatás és intézkedés költségei</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A kérelem alapján nyújtott tájékoztatás és a hozott intézkedések díjmentesek.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Amennyiben azonban az Érintett kérelme egyértelműen megalapozatlan vagy különösen ismétlődő jellegű, a szervezet – a kérelem teljesítésével járó adminisztratív költségekre figyelemmel – ésszerű díjat számíthat fel, vagy megtagadhatja a kérelem teljesítését.</p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">12. Egyéb célból történő adatkezelés</h2>
        <p className="text-slate-700 leading-relaxed mb-4">Ha a szervezet olyan adatkezelést kíván végezni, amelyet jelen Szabályzat nem tartalmaz, az adatkezelést megelőzően a Szabályzatot ki kell egészíteni, illetve a szükséges részszabályokat hozzá kell kapcsolni. Az adatkezelés csak a jogszerűség, tisztességesség és átláthatóság követelményei mellett végezhető.</p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">13. A szabályzathoz tartozó egyéb dokumentumok</h2>
        <p className="text-slate-700 leading-relaxed mb-4">A szabályzathoz kapcsolódnak mindazon dokumentumok és szabályozások, amelyek az adatkezelés gyakorlati megvalósításához elengedhetetlenek. Ilyenek például:</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>a munkavállalói titoktartási nyilatkozat,</li>
          <li>a munkavállalói adatkezelési tájékoztató,</li>
          <li>a szabályozott adatkezelési folyamatokat leíró belső dokumentumok,</li>
          <li>az adatkezelések felülvizsgálatára vonatkozó jegyzőkönyvek,</li>
          <li>a céges eszközök ellenőrzésére vonatkozó szabályzatok,</li>
          <li>valamint a munkavállalói és megbízotti kör részére kiadott tájékoztatók.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">14. A szabályzat hatálya</h2>
        <p className="text-slate-700 leading-relaxed mb-4">E szabályzat visszavonásig érvényes, hatálya kiterjed a szervezet minden munkavállalójára.</p>
        <p className="text-slate-700 leading-relaxed mb-4"><strong>Dátum:</strong> Debrecen, 2025. Augusztus 25.</p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">15. Egyes speciális adatkezelések</h2>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">15.1. Álláspályázatra jelentkezés adatvédelmi követelményei</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az álláspályázatok során történő adatkezelés során kiemelt figyelmet kell fordítani a jelentkezők információs önrendelkezési jogának védelmére. Nem fogadható el az anonim álláshirdetések gyakorlata, mivel az ilyen esetekben aránytalanul sérülhet a pályázók joga arra, hogy a jelentkezésük megküldése előtt részletes, egyértelmű tájékoztatást kapjanak az adatkezelés körülményeiről, különösen annak céljáról, jogalapjáról, időtartamáról és az adatkezelő személyéről.</p>
        <p className="text-slate-700 leading-relaxed mb-4">A munkáltató köteles minden jelentkezőt előzetesen tájékoztatni arról, hogy a felvételi eljárás során milyen adataikat kezeli, milyen módon történik ezen adatok felhasználása, valamint meddig kerülnek megőrzésre. A pályázati anyagokat kizárólag a kiválasztási folyamat lezárásáig lehet kezelni, ezt követően a nem nyertes jelentkezők dokumentumait törölni vagy meg kell semmisíteni.</p>
        <p className="text-slate-700 leading-relaxed mb-4">A pályázati eljárás során kizárólag olyan információk kezelhetők, amelyek közvetlenül kapcsolódnak a munkaviszony létesítéséhez. Ennek megfelelően nem kérhetők, nem kezelhetők és nem tárolhatók olyan adatok, amelyek a jelentkező magánéletére, családi állapotára, vallási vagy politikai meggyőződésére, egészségi állapotára, genetikai jellemzőire, vagy bármely más, a munkavégzés szempontjából irreleváns tényezőre vonatkoznak. Az érintett közösségi oldalakon nyilvánosan közzétett adataiból a munkáltató következtetéseket csak annyiban vonhat le, amennyiben azok közvetlenül összefüggésben állnak a betöltendő munkakör ellátásához szükséges képességekkel.</p>
        <p className="text-slate-700 leading-relaxed mb-4">Amennyiben a munkáltató bármilyen feljegyzést készít a pályázóról, az a pályázó személyes adatának minősül. Ebben az esetben a munkáltató köteles egyértelműen és világosan tájékoztatni az érintettet arról, hogy a róla készült feljegyzések milyen adatokat tartalmaznak, és azokat milyen célból használja fel. A munkáltató ugyanakkor köteles törölni a kiválasztási eljárás lezárultát követően azokat a feljegyzéseket is, amelyek a pályázóval kapcsolatban készültek.</p>
        <p className="text-slate-700 leading-relaxed mb-4">A személyes adatok kezelésére vonatkozó követelményeket a 2011. évi CXII. törvény (Infotv.), valamint az (EU) 2016/679 számú általános adatvédelmi rendelet (GDPR) rögzíti. Ezek értelmében a pályázók személyes adatai kizárólag a meghatározott célból, jogszerűen, tisztességesen és az átláthatóság elvének megfelelően kezelhetők.</p>
        <p className="text-slate-700 leading-relaxed mb-4">A 118/2001. (VI. 30.) Kormányrendelet 10. § (1) bekezdése kifejezetten tiltja olyan személyes adatok kezelését, amelyek nem kapcsolódnak közvetlenül a munkaviszony létesítéséhez. Ebből következően a munkáltató nem gyűjthet adatot például a pályázó politikai nézeteiről, vallási hovatartozásáról, családi állapotáról, vagy egyéb, munkavégzés szempontjából irreleváns információkról.</p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">15.2. Alkalmassági vizsgálatok adatvédelmi követelményei</h3>
        <p className="text-slate-700 leading-relaxed mb-4">Az alkalmassági vizsgálatok során kizárólag a munkakör ellátásához szükséges képességek, készségek és egészségi alkalmasság vizsgálható.</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
            <li><strong>Tájékoztatás:</strong> A munkavállalót előzetesen tájékoztatni kell a vizsgálat céljáról, módjáról, jogalapjáról és az eredmények kezeléséről.</li>
            <li><strong>Eredmények kezelése:</strong> A vizsgálati eredményeket elsődlegesen a vizsgálatot végző szakember ismeri meg. A munkáltató részére kizárólag az alkalmas / nem alkalmas minősítés adható át.</li>
            <li><strong>Korlátok:</strong> A részletes egészségügyi dokumentáció nem kerülhet a munkáltató birtokába.</li>
        </ul>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">15.3. Munkahelyi tréningek adatvédelmi követelményei</h3>
        <p className="text-slate-700 leading-relaxed mb-4">A munkáltató által szervezett tréningek célja a munkavállalók szakmai fejlődése és készségeik fejlesztése.</p>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
            <li><strong>Adatkör:</strong> A tréning során felvett adatok (pl. tesztlapok, értékelések) kizárólag a képzést vezető szakember kezelésében maradhatnak.</li>
            <li><strong>Munkáltató tájékoztatása:</strong> A munkáltató csupán összesített, személyhez közvetlenül nem köthető információkat kaphat, mint például a tréning általános eredményessége vagy a fejlesztendő kompetenciák.</li>
            <li><strong>Korlátok:</strong> A munkáltató részére nem adható át olyan információ, amely alapján a munkavállaló személyesen azonosítható. Az értékelések személyes adatként védendők, és nem használhatók fel hátrányos megkülönböztetés alapjául.</li>
        </ul>

      </motion.div>
    </div>
  );
};

export default AdatkezelesiSzabalyzatPage;