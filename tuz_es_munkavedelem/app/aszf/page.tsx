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

const AszfPage: React.FC = () => {
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
          Általános Szerződési <span className={accentColor.text}>Feltételek</span> (ÁSZF)
        </h1>
        
        <p className="text-slate-700 leading-relaxed mb-4">
          Jelen Általános Szerződési Feltételek (a továbbiakban: **ÁSZF**) tartalmazza a JaniMark Kft. (székhely: 4031 Debrecen, István út 140., adószám: [Cég adószáma], cégjegyzékszám: [Cégjegyzékszám], a továbbiakban: **Szolgáltató**) által nyújtott tűz-, munka- és környezetvédelmi, valamint HACCP tanácsadási, dokumentáció-készítési, oktatási és egyéb kapcsolódó szolgáltatások (a továbbiakban együtt: **Szolgáltatások**) igénybevételének feltételeit.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az ÁSZF elválaszthatatlan részét képezi a Szolgáltató és a Megrendelő (a továbbiakban: **Megrendelő**) között létrejövő egyedi szolgáltatási szerződésnek (a továbbiakban: **Szerződés**). Az ÁSZF rendelkezéseit a Szerződés eltérő rendelkezése hiányában kell alkalmazni.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Megrendelő a Szolgáltatások igénybevételével elismeri, hogy jelen ÁSZF rendelkezéseit megismerte, megértette és elfogadja, valamint magára nézve kötelezőnek ismeri el.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">1. A Szolgáltatások Tárgya</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Szolgáltató a Szerződésben meghatározott, egyedi igényekre szabott tűz-, munka- és környezetvédelmi, valamint HACCP szolgáltatásokat nyújtja. Ezek a szolgáltatások magukban foglalhatják, de nem kizárólagosan:
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">1.1. Tűzvédelmi Szolgáltatások:</h3>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>Tűzvédelmi Szabályzat, Tűzriadó Terv és egyéb szükséges tűzvédelmi dokumentációk elkészítése és aktualizálása a hatályos jogszabályoknak megfelelően.</li>
          <li>Tűzvédelmi szakmai felülvizsgálatok, szemlék és ellenőrzések elvégzése telephelyeken és létesítményekben.</li>
          <li>Tűzvédelmi oktatások megtartása munkavállalók részére (munkakörhöz, kockázatokhoz igazítva), beleértve a gyakorlati bemutatókat is.</li>
          <li>Tűzoltó készülékek, tűzjelző rendszerek és egyéb tűzvédelmi berendezések időszakos felülvizsgálatának és karbantartásának koordinálása, nyilvántartása.</li>
          <li>Hatósági ellenőrzések során képviselet, szakmai támogatás nyújtása, a Megrendelő érdekeinek képviselete.</li>
          <li>Tűzvédelmi előadó, megbízott szolgáltatás biztosítása, folyamatos rendelkezésre állás.</li>
          <li>Tűzvédelmi szaktanácsadás új létesítmények tervezése, átalakítása során.</li>
        </ul>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">1.2. Munkavédelmi Szolgáltatások:</h3>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>Munkavédelmi Kockázatértékelés elkészítése és felülvizsgálata, a munkahelyi veszélyek és kockázatok azonosítása, értékelése.</li>
          <li>Munkavédelmi Szabályzat, egyéni védőeszköz juttatási rend, foglalkozás-egészségügyi alapszolgáltatási szerződés és egyéb munkavédelmi dokumentációk kidolgozása, aktualizálása.</li>
          <li>Munkavédelmi oktatások lebonyolítása (munkába álláskori, ismétlődő, rendkívüli oktatás), interaktív módon, a Megrendelő specifikus tevékenységére szabva.</li>
          <li>Munkabalesetek kivizsgálása, jegyzőkönyvek elkészítése, statisztikai jelentések, a balesetek okainak feltárása és megelőző intézkedések javaslata.</li>
          <li>Gépek, berendezések üzembe helyezési eljárásainak felügyelete, biztonsági felülvizsgálatok koordinálása, megfelelőségi nyilatkozatok ellenőrzése.</li>
          <li>Munkavédelmi képviselői tevékenység támogatása, tanácsadás a képviselők számára.</li>
          <li>Munkahelyi elsősegélynyújtás szervezése, segédeszközök biztosítása, elsősegélynyújtó képzés koordinálása.</li>
          <li>Ergonómiai felmérések és tanácsadás a munkahelyi kényelem és hatékonyság növelése érdekében.</li>
        </ul>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">1.3. HACCP Szolgáltatások (Élelmiszerbiztonság):</h3>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>HACCP rendszer kiépítése, dokumentáció elkészítése élelmiszeripari és vendéglátó-ipari egységek számára, a jogszabályi előírásoknak és a Codex Alimentarius elveinek megfelelően.</li>
          <li>HACCP rendszer felülvizsgálata, aktualizálása és karbantartása, a változó körülményekhez és jogszabályokhoz igazítva.</li>
          <li>Higiéniai oktatások lebonyolítása élelmiszer-kezeléssel foglalkozó személyzet részére, a helyes gyakorlatok és a kritikus pontok kezelésének hangsúlyozásával.</li>
          <li>Belső HACCP auditok elvégzése, felkészítés hatósági ellenőrzésekre, a hiányosságok feltárása és javítási javaslatok tétele.</li>
          <li>Élelmiszer-biztonsági tanácsadás új termékek bevezetése, technológiai változások esetén.</li>
        </ul>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">1.4. Egyéb Kiegészítő Szolgáltatások:</h3>
        <ul className="list-disc list-inside text-slate-700 leading-relaxed mb-4 pl-4">
          <li>Környezetvédelmi tanácsadás, környezetvédelmi megbízott szolgáltatás.</li>
          <li>Veszélyes áruk szállításának biztonsági tanácsadása (ADR), biztonsági tanácsadó biztosítása.</li>
          <li>Szaktanácsadás jogszabályi megfelelésben, folyamatos tájékoztatás a változó előírásokról.</li>
          <li>Auditok és belső ellenőrzések elvégzése a Megrendelő igényei szerint.</li>
        </ul>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">2. Megrendelés és Szerződéskötés</h2>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">2.1. Ajánlatkérés:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Megrendelő a Szolgáltatótól írásban (e-mailben), telefonon, vagy a Szolgáltató honlapján található űrlapon keresztül kérhet ajánlatot a Szolgáltatásokra. Az ajánlatkérésnek tartalmaznia kell a Megrendelő alapadatait (cégnév, székhely, adószám, kapcsolattartó neve, elérhetőségei), valamint a kért szolgáltatásokra vonatkozó részletes leírást, igényeket. A Megrendelő köteles az ajánlatkérésben valós és pontos adatokat szolgáltatni.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">2.2. Igényfelmérés és Ajánlattétel:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az ajánlatkérést követően a Szolgáltató kapcsolatba lép a Megrendelővel egy díjmentes előzetes konzultáció és igényfelmérés céljából. Ez történhet személyesen (helyszíni bejárással is, amennyiben szükséges és előzetesen egyeztetett), telefonon vagy online. Az igényfelmérés alapján a Szolgáltató írásos, részletes árajánlatot készít, amely tartalmazza a Szolgáltatások pontos leírását, a díjazást, a fizetési feltételeket, a teljesítési határidőket és az egyéb lényeges feltételeket. Az árajánlat a kiállításától számított 15 napig érvényes, ettől eltérő érvényességi időt az ajánlat feltüntethet. Az ajánlat kizárólag az abban rögzített feltételekkel érvényes.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">2.3. Szerződéskötés:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Megrendelő az árajánlat elfogadását írásban (e-mailben vagy aláírt ajánlat visszaküldésével) vagy a felek által aláírt Szerződés útján erősíti meg. A Szerződés a felek kölcsönös akaratnyilatkozata alapján jön létre. Az egyedi Szerződés eltérhet az ÁSZF egyes pontjaitól, ilyen esetben az egyedi Szerződésben foglaltak az irányadók. A Szerződés létrejöttével a Megrendelő elfogadja az ÁSZF valamennyi rendelkezését.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">2.4. Teljesítési előkészületek:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Szerződés létrejöttét követően a Megrendelő köteles a Szolgáltató részére a Szolgáltatások teljesítéséhez szükséges minden releváns információt, adatot és dokumentumot (pl. alaprajzok, korábbi dokumentációk, dolgozói létszám, tevékenységi körök részletes leírása, gépek listája, veszélyes anyagok jegyzéke, stb.) hiánytalanul és valósághűen a Szolgáltató rendelkezésére bocsátani a Szerződésben meghatározott határidőig. Amennyiben a Megrendelő ezen kötelezettségének nem tesz eleget, vagy késedelmesen teljesíti, a Szolgáltató jogosult a teljesítési határidők módosítására, vagy a Szerződéstől való elállásra, a Megrendelő kártérítési kötelezettsége mellett. A Megrendelő köteles biztosítani a Szolgáltató munkatársai számára a hozzáférést a telephelyekhez és a szükséges személyekhez a felmérések és oktatások céljából.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">3. Díjazás és Fizetési Feltételek</h2>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">3.1. Díjazás:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Szolgáltatások díja az egyedi Szerződésben vagy a Megrendelő által elfogadott árajánlatban rögzített összeg. A díj tartalmazza az esetlegesen felmerülő kiszállási díjakat, utazási költségeket és egyéb járulékos költségeket, amennyiben az ajánlat vagy a Szerződés ezt kifejezetten nem zárja ki, vagy nem külön tételként tünteti fel. Az árak nettó árak, az ÁFA-t nem tartalmazzák, az ÁFA mértéke a jogszabályok szerint kerül felszámításra.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">3.2. Fizetési mód:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          A díjazás banki átutalással történik, a Szolgáltató által kiállított számla alapján. A számlát a Szolgáltató a Szerződésben rögzített ütemezés szerint, vagy a Szolgáltatások teljesítését követően állítja ki. A számla kiállításának dátuma a teljesítés igazolásának dátuma.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">3.3. Fizetési határidő:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          A számlák fizetési határideje 8 (nyolc) naptári nap, amennyiben az egyedi Szerződés eltérő fizetési határidőt nem rögzít. A fizetési határidő a számla kiállításának napjától számítandó.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">3.4. Késedelmi kamat:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Késedelmes fizetés esetén a Megrendelő a Ptk. szerinti késedelmi kamat megfizetésére köteles. A Szolgáltató fenntartja a jogot, hogy a késedelmes fizetés esetén a Szolgáltatások további nyújtását felfüggessze a tartozás rendezéséig. A felfüggesztésből eredő károkért a Szolgáltató nem felel. A Szolgáltató jogosult a késedelembe esett Megrendelőtől a behajtási költségátalányt is követelni a hatályos jogszabályok szerint.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">3.5. Előleg:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Egyes nagyobb terjedelmű vagy hosszabb ideig tartó projektek esetén a Szolgáltató előleg megfizetését kérheti, amelynek összege és fizetési ütemezése az egyedi Szerződésben kerül rögzítésre. Az előleg megfizetéséig a Szolgáltató nem köteles megkezdeni a Szerződés szerinti munkát. Az előleg nem visszatérítendő, amennyiben a Szerződés a Megrendelő hibájából hiúsul meg.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">4. Felelősségvállalás és Garancia</h2>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">4.1. Szolgáltató felelőssége:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Szolgáltató szavatolja, hogy a Szolgáltatásokat a jogszabályi előírásoknak, a szakmai sztenderdeknek, valamint a Szerződésben foglaltaknak megfelelően, a tőle elvárható legnagyobb gondossággal és szakértelemmel teljesíti. A Szolgáltató a Szolgáltatások keretében elkészített dokumentációk, tanácsok és oktatások pontosságáért és jogszabályi megfelelőségéért felelős, amennyiben a Megrendelő minden szükséges információt és adatot hiánytalanul és valósághűen a rendelkezésére bocsátott. A Szolgáltató folyamatosan figyelemmel kíséri a jogszabályi változásokat, és azokról tájékoztatja a Megrendelőt.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">4.2. Megrendelő felelőssége:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Megrendelő felelős az általa szolgáltatott adatok és információk valóságáért, teljességéért és pontosságáért. A Szolgáltató nem vállal felelősséget olyan károkért, amelyek a Megrendelő által tévesen, hiányosan vagy késedelmesen szolgáltatott információkból, adatokból erednek, vagy ha a Megrendelő nem tartja be a Szolgáltató által javasolt intézkedéseket és előírásokat.
          A Megrendelő kizárólagosan felelős a Szolgáltató által elkészített dokumentációk belső implementálásáért, betartatásáért és a gyakorlati végrehajtásáért. A Szolgáltató tanácsadói szerepet tölt be, a jogszabályoknak való megfelelés végső felelőssége a Megrendelőt terheli. A Megrendelő köteles a Szolgáltató által javasolt intézkedéseket haladéktalanul bevezetni, és azokról a Szolgáltatót tájékoztatni.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">4.3. Kármegosztás:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Szolgáltató felelőssége kizárólag a Szerződéses jogviszony keretében nyújtott szolgáltatások hibás teljesítéséből eredő, bizonyíthatóan közvetlen károkra korlátozódik. A Szolgáltató nem felelős elmaradt haszonért, következményi károkért, közvetett károkért, valamint harmadik féllel szembeni követelésekért. A Szolgáltató teljes kártérítési felelőssége semmilyen esetben sem haladhatja meg az adott Szerződés alapján Megrendelő által a Szolgáltató részére ténylegesen megfizetett díj összegét.
          A Szolgáltató nem felelős a Megrendelő által a jogszabályi kötelezettségek be nem tartásából, vagy a Szolgáltató által javasolt intézkedések figyelmen kívül hagyásából eredő bírságokért, szankciókért vagy egyéb károkért.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">4.4. Szavatosság és Garancia:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Szolgáltató a Ptk. szerinti szavatossággal tartozik a Szolgáltatások hibátlan teljesítéséért. Amennyiben a Szolgáltatás a teljesítés időpontjában nem felel meg a Szerződésben vagy a jogszabályokban foglaltaknak, a Megrendelő jogosult a hiba kijavítását kérni. A hiba kijavítására a Szolgáltató ésszerű határidőn belül köteles. A Megrendelő köteles a hibát annak felfedezését követően haladéktalanul, de legkésőbb 8 napon belül írásban jelezni a Szolgáltató felé. A jelzési határidő elmulasztása jogvesztéssel jár.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">5. Adatkezelés</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Szolgáltató a Megrendelők személyes adatait az Adatvédelmi Nyilatkozatában (amely a honlapon elérhető és jelen ÁSZF elválaszthatatlan részét képezi) foglaltak szerint kezeli, szigorúan betartva a vonatkozó jogszabályokat, különösen az Európai Parlament és a Tanács (EU) 2016/679 rendeletét (általános adatvédelmi rendelet, a továbbiakban: GDPR) és az információs önrendelkezési jogról és az információszabadságról szóló 2011. évi CXII. törvényt.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Az adatkezelés célja a Szerződés teljesítése, a kapcsolattartás, a számlázás, valamint a jogszabályi kötelezettségek teljesítése. A Megrendelő által megadott adatok harmadik fél részére kizárólag a Szerződés teljesítése céljából (pl. hatósági bejelentés) vagy a Megrendelő előzetes írásbeli hozzájárulásával adhatók át.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Megrendelő bármikor tájékoztatást kérhet a Szolgáltató által kezelt adatairól, kérheti azok helyesbítését, törlését vagy kezelésének korlátozását.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">6. Titoktartás</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Szolgáltató és a Megrendelő kölcsönösen kötelezettséget vállalnak arra, hogy a Szerződés teljesítése során tudomásukra jutott valamennyi üzleti titkot, bizalmas információt, adatot és tényt (különösen, de nem kizárólagosan: gyártási eljárások, technológiák, ügyféladatok, pénzügyi információk, belső működési rend, stb.) szigorúan bizalmasan kezelnek.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Ezen információkat kizárólag a Szerződés teljesítése céljából használhatják fel, és harmadik fél részére nem tehetik hozzáférhetővé a másik fél előzetes írásbeli hozzájárulása nélkül, kivéve, ha jogszabály írja elő az adatszolgáltatást.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          A titoktartási kötelezettség a Szerződés megszűnését követően is fennmarad, időbeli korlátozás nélkül.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">7. Szerződés Módosítása és Megszüntetése</h2>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">7.1. Szerződés módosítása:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Szerződés módosítására kizárólag a felek közös, írásbeli megegyezésével kerülhet sor. A módosítások csak akkor érvényesek, ha azt mindkét fél aláírta. Jogszabályi változások esetén a Szolgáltató jogosult az ÁSZF-et és az egyedi Szerződést is egyoldalúan módosítani, erről azonban köteles a Megrendelőt előzetesen, írásban tájékoztatni. A módosítások a tájékoztatást követő 15. napon lépnek hatályba.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">7.2. Felmondás:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          A határozatlan idejű Szerződéseket bármelyik fél felmondhatja írásban, 30 napos felmondási idővel. Határozott idejű Szerződés csak súlyos szerződésszegés esetén mondható fel azonnali hatállyal. Súlyos szerződésszegésnek minősül különösen: a fizetési késedelem, a titoktartási kötelezettség megsértése, a Szolgáltató munkájának ellehetetlenítése.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">7.3. Elállás:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Amennyiben a Szerződés teljesítése bármely okból ellehetetlenül, vagy a felek között a bizalmi viszony helyrehozhatatlanul megromlik, bármelyik fél jogosult a Szerződéstől elállni. Az elállás jogát írásban, indoklással kell gyakorolni. Az elállás esetén a már teljesített szolgáltatások díja és az addig felmerült költségek a Megrendelőt terhelik.
        </p>
        <h3 className="text-xl font-bold text-slate-800 mb-2 mt-4">7.4. Vis maior:</h3>
        <p className="text-slate-700 leading-relaxed mb-4">
          Egyik fél sem felelős a Szerződésben vállalt kötelezettségeinek nem teljesítéséért, amennyiben az olyan vis maior esemény (pl. természeti katasztrófa, háború, járvány, terrorcselekmény, hatósági intézkedés) következménye, amely a felek ellenőrzési körén kívül esik, és amelyet ésszerű erőfeszítéssel nem lehetett elhárítani vagy előre látni. A vis maior eseményről a felek kötelesek egymást haladéktalanul, írásban tájékoztatni.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">8. Jogviták Rendezése</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          A felek igyekeznek a jelen ÁSZF-ből vagy a Szerződésből eredő, illetve azzal kapcsolatos valamennyi vitás kérdést, nézeteltérést elsősorban békés úton, tárgyalások útján rendezni.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Amennyiben a békés rendezés 30 (harminc) naptári napon belül nem vezet eredményre, a felek a jogvita eldöntésére kikötik a Debreceni Járásbíróság, illetve a Debreceni Törvényszék kizárólagos illetékességét, a perérték függvényében.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Szerződésre és az ÁSZF-re a magyar jogszabályok az irányadók.
        </p>

        <h2 className="text-2xl font-bold text-slate-800 mb-3 mt-6">9. Záró Rendelkezések</h2>
        <p className="text-slate-700 leading-relaxed mb-4">
          Jelen ÁSZF 2025. július 23. napján lép hatályba és visszavonásig érvényes. A Szolgáltató fenntartja a jogot az ÁSZF egyoldalú módosítására, melyről a Megrendelőket a honlapon történő közzététellel, vagy közvetlen tájékoztatással értesíti. A módosítások a közzétételtől számított 15. napon lépnek hatályba.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Amennyiben az ÁSZF bármely rendelkezése érvénytelennek vagy végrehajthatatlannak bizonyul, az nem érinti az ÁSZF többi rendelkezésének érvényességét és végrehajthatóságát. Az érvénytelen vagy végrehajthatatlan rendelkezés helyébe a jogszabályoknak megfelelő, a felek eredeti szándékát leginkább tükröző rendelkezés lép.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          A Szerződés és az ÁSZF együttesen tartalmazza a felek közötti teljes megállapodást, és felülír minden korábbi szóbeli vagy írásbeli megállapodást, nyilatkozatot vagy ígéretet.
        </p>
        <p className="text-slate-700 leading-relaxed mb-4">
          Kelt: Debrecen, 2025. július 23.
        </p>
      </motion.div>
    </div>
  );
};

export default AszfPage;