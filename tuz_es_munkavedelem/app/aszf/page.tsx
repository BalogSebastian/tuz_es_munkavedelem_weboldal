'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeftIcon } from '@heroicons/react/24/solid';

// A kiemelő szín beállításai
const accentColor = {
  text: 'text-[#03BABE]',
  bg: 'bg-[#03BABE]',
  hoverBg: 'hover:bg-cyan-600',
  ring: 'focus:ring-cyan-500',
};

const AszfPage: React.FC = () => {
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
          Részletes Általános Szerződési <span className={accentColor.text}>Feltételek</span>
        </h1>

        <div className="space-y-8 text-slate-700 leading-relaxed text-justify">
          <p className="text-sm text-slate-500 text-center">Hatályba lépés napja: 2025. augusztus 26.</p>
          
          <h2 className="text-2xl font-bold text-slate-800 pt-4 border-b pb-2">1. Bevezető Rendelkezések és Fogalommeghatározások</h2>
          <p><strong>1.1. A Szabályzat Célja:</strong> Jelen Általános Szerződési Feltételek (a továbbiakban: <strong>ÁSZF</strong>) a <strong>Trident Shield Group Kft.</strong> (székhely: 4485 Nagyhalász, Jókai utca 18.; cégjegyzékszám: 15 09 093902; adószám: 32873537-1-15; a továbbiakban: <strong>Szolgáltató</strong>) által nyújtott szakértői szolgáltatások (a továbbiakban: <strong>Szolgáltatások</strong>) igénybevételének általános kereteit és feltételeit rögzíti. Az ÁSZF a jogszabályok keretein belül határozza meg a Felek jogait és kötelezettségeit, a szerződéses jogviszony létrejöttét és megszűnését, valamint a díjazásra, teljesítésre és felelősségre vonatkozó szabályokat. Célja a Felek közötti átlátható és kiszámítható együttműködés biztosítása.</p>
          <p><strong>1.2. Fogalommeghatározások:</strong> A jelen ÁSZF-ben használt szavak és kifejezések a következők szerint értelmezendők:</p>
          <ul className="list-disc list-inside pl-4 space-y-2">
            <li><strong>Megrendelő:</strong> Az a természetes személy, jogi személy vagy jogi személyiséggel nem rendelkező szervezet, aki a Szolgáltató szolgáltatásait megrendeli, és a szerződéses jogviszony másik fele.</li>
            <li><strong>Felek:</strong> A Szolgáltató és a Megrendelő együttesen.</li>
            <li><strong>Egyedi Szerződés:</strong> A Felek között létrejött, a szolgáltatás konkrét tartalmát, díját, teljesítési határidejét és ütemezését rögzítő, írásos megállapodás vagy a Szolgáltató által adott és a Megrendelő által írásban elfogadott árajánlat. Az Egyedi Szerződés a jelen ÁSZF-fel együtt érvényes, és az ÁSZF elválaszthatatlan részét képezi.</li>
            <li><strong>Írásbeliség:</strong> Írásbeli formának minősül a postai vagy futárral kézbesített levél, a faxüzenet, valamint a Felek által kölcsönösen visszaigazolt, elektronikus aláírással nem rendelkező e-mail üzenet is, feltéve, hogy a küldő fél beazonosítható és az üzenet integritása biztosított.</li>
            <li><strong>Bizalmas Információ:</strong> Minden olyan, nem nyilvános adat, tény, eljárás, üzleti titok, know-how, pénzügyi információ, ügyféladat vagy bármely egyéb információ, amely a Felek működésével kapcsolatban a szerződés teljesítése során a másik Fél tudomására jut, függetlenül annak hordozójától vagy formájától.</li>
            <li><strong>Vis Maior (Elháríthatatlan Külső Ok):</strong> Olyan, a Felek szerződéskötéskor előre nem látható, rajtuk kívül álló ok (pl. háború, természeti katasztrófa, kormányzati intézkedés), amely a szerződés teljesítését lehetetlenné teszi.</li>
          </ul>

          <h2 className="text-2xl font-bold text-slate-800 pt-4 border-b pb-2">2. A Szolgáltatások Részletes Jellemzői és Korlátai</h2>
          <p><strong>2.1. A Szolgáltatások Jellege:</strong> A Szolgáltató a Megrendelő megbízása alapján komplex tanácsadói, szakértői, auditálási, dokumentáció-készítési és oktatási tevékenységet végez. A Szolgáltatások a teljesítéskor hatályos jogszabályokon, szabványokon és a Szolgáltató által alkalmazott legjobb szakmai ismereteken alapulnak. A Szolgáltató kizárólag szaktanácsadói, képzési és dokumentációs tevékenységet végez, és nem végez hatósági tevékenységet. A Szolgáltató által nyújtott tanácsok nem minősülnek jogi, pénzügyi vagy adótanácsadásnak, kivéve, ha erre vonatkozóan a Felek külön megállapodást kötnek.</p>
          <p><strong>2.2. Szolgáltatási Területek:</strong> A Szolgáltató főbb szakterületei, a teljesség igénye nélkül, az alábbiak:</p>
            <ul className="list-disc list-inside pl-4 space-y-2 mt-4">
                <li><strong>Munkavédelem:</strong> Komplex kockázatértékelések elkészítése és felülvizsgálata (általános, kémiai, biológiai, pszichoszociális kockázatokra vonatkozóan), gépek, technológiák és munkafolyamatok biztonsági felülvizsgálata, a munkavédelmi oktatások tematikáinak kidolgozása, megelőzési stratégia és belső munkavédelmi szabályzatok elkészítése.</li>
                <li><strong>Tűzvédelem:</strong> Tűzvédelmi szabályzatok és tűzriadó tervek készítése és felülvizsgálata, tűzvédelmi műszaki leírások készítése, kiürítés-számítás, tűzoltó készülékek és berendezések nyilvántartása és felülvizsgálatának teljes körű menedzselése, tűzvédelmi hatósági ellenőrzésekre való felkészítés.</li>
                <li><strong>Környezetvédelem:</strong> Teljes körű környezetvédelmi megbízotti szolgáltatás, hulladékgazdálkodási audit és tanácsadás, levegőtisztaság-védelmi és vízjogi engedélyezési eljárásokban való szakmai közreműködés, környezetvédelmi auditok végrehajtása.</li>
                <li><strong>Egyéb szakértői tevékenységek:</strong> Az Egyedi Szerződésben rögzített egyéb, a Szolgáltató profiljába illeszkedő területek, mint például a minőségbiztosítási rendszerek kiépítése vagy belső auditok lefolytatása.</li>
            </ul>
          <p><strong>2.3. A Szolgáltatás Területi Hatálya:</strong> A Szolgáltató a szolgáltatásait Magyarország területén nyújtja. Ettől eltérő helyszínre vonatkozó igény esetén a Felek az utazási és szállásköltségekre vonatkozóan külön megállapodást kötnek. Az Egyedi Szerződésben rögzített díjak – eltérő megállapodás hiányában – nem tartalmazzák a Szolgáltató székhelyétől 50 km-t meghaladó kiszállások utazási és szállásköltségét, melyek külön elszámolás tárgyát képezik a jogszabályoknak megfelelő díjtételek szerint.</p>
          
          <h2 className="text-2xl font-bold text-slate-800 pt-4 border-b pb-2">3. A Szerződéses Jogviszony Létrejötte és Módosítása</h2>
          <p><strong>3.1. Ajánlatkérés:</strong> A Megrendelő írásban, a feladat minél pontosabb leírásával és a szükséges dokumentumok megküldésével kérhet ajánlatot a Szolgáltatótól. A Szolgáltató jogosult további információkat bekérni a pontos és reális ajánlattételhez.</p>
          <p><strong>3.2. Ajánlattétel:</strong> A Szolgáltató a megadott információk alapján készíti el írásos árajánlatát, melynek érvényességi idejét (ajánlati kötöttség) az ajánlat tartalmazza. Az ajánlat a Szolgáltató részéről az érvényességi idő alatt nem visszavonható. Az ajánlat tartalmazza a szolgáltatás körét, a díjazást, a fizetési feltételeket, a teljesítési határidőt és az egyéb, a szerződéses jogviszonyra vonatkozó lényeges elemeket.</p>
          <p><strong>3.3. Szerződéskötés:</strong> A szerződéses jogviszony az ajánlat Megrendelő általi, az ajánlati kötöttség ideje alatti, írásos, változatlan tartalmú elfogadásával jön létre. A szóbeli megállapodások csak akkor válnak a szerződés részévé, ha azokat a Felek írásban megerősítik. A szerződés módosítására is kizárólag írásban, a Felek kölcsönös megegyezésével kerülhet sor.</p>
          <p><strong>3.4. Szolgáltatás Módosítása:</strong> Ha a Megrendelő a teljesítés során a feladat módosítását kéri, amely az eredeti ajánlatban nem szerepelt, a Szolgáltató jogosult új ajánlatot tenni a módosított feladatra. A módosításból eredő többletköltségeket és a teljesítési határidő esetleges meghosszabbítását a Megrendelő köteles elfogadni.</p>
          
          <h2 className="text-2xl font-bold text-slate-800 pt-4 border-b pb-2">4. Díjazás, Fizetési Kondíciók és Késedelmes Fizetés</h2>
          <p><strong>4.1. Szolgáltatási díj:</strong> A díjazás lehet projektalapú fix díj, óradíjas elszámolás vagy havi átalánydíj, az Egyedi Szerződésben rögzítettek szerint. Az ÁFA a mindenkor hatályos jogszabályok szerint kerül felszámításra. A díj magában foglalja a szolgáltatás teljesítéséhez szükséges valamennyi költséget, kivéve azokat, amelyeket a Felek az Egyedi Szerződésben kifejezetten külön tételként jelölnek meg (pl. utazási költségek, hatósági díjak).</p>
          <p><strong>4.2. Előleg:</strong> A Szolgáltató 1.000.000 Ft nettó díjértéket meghaladó projektek esetén jogosult a teljes díj 30-50%-ának megfelelő előleget kérni, melynek megfizetése a munka megkezdésének feltétele. Az előlegről a Szolgáltató előlegszámlát állít ki, amelynek ellenértékét a végszámlából levonja.</p>
          <p><strong>4.3. Számlázás és Fizetési Határidő:</strong> A számlázás a teljesítést követően, vagy tartós megbízás esetén havonta, a tárgyhónap végén történik. A fizetési határidő 8 naptári nap. A Megrendelő a számlával kapcsolatos esetleges kifogásait a kézhezvételtől számított 3 munkanapon belül írásban köteles jelezni. Ennek hiányában a számla teljes egészében elfogadottnak tekintendő.</p>
          <p><strong>4.4. Késedelmes Fizetés:</strong> Késedelmes fizetés esetén a Szolgáltató a Ptk. szerinti késedelmi kamaton felül jogosult a behajtással kapcsolatos költségeinek megtérítésére is. A fizetési kötelezettség teljesítéséig a Szolgáltató minden, a Megrendelőnek készített szellemi termékre vonatkozó felhasználási jogot felfüggeszthet, és a további szolgáltatásnyújtást megtagadhatja. A Megrendelő 30 napot meghaladó fizetési késedelme súlyos szerződésszegésnek minősül.</p>

          <h2 className="text-2xl font-bold text-slate-800 pt-4 border-b pb-2">5. Teljesítés, Együttműködés és Szolgáltatás Szintű Megállapodás (SLA)</h2>
          <p><strong>5.1. Teljesítési Határidő:</strong> A teljesítési határidőket az Egyedi Szerződés rögzíti. A határidők a szerződés hatálybalépésétől és a Megrendelő által biztosítandó adatok hiánytalan, határidőben történő átadásától számítandók. A Megrendelő érdekkörében felmerülő késedelem (pl. adatszolgáltatás hiánya, döntéshozatal elhúzódása, a helyszíni felmérés akadályozása) a teljesítési határidőt a késedelem időtartamával meghosszabbítja.</p>
          <p><strong>5.2. Teljesítés Igazolása:</strong> A teljesítés igazolása a munkaanyagok (dokumentumok, jegyzőkönyvek) e-mail útján történő átadásával, vagy a Felek által aláírt teljesítésigazolással történik. A Megrendelő a kézhezvételtől számított 5 munkanapon belül köteles a teljesítést elfogadni, vagy kifogásait írásban, indokoltan megtenni. Ennek hiányában a teljesítés elfogadottnak minősül.</p>
          <p><strong>5.3. A Megrendelő Kötelezettségei:</strong> A Megrendelő köteles a Szolgáltató munkatársai számára a biztonságos munkavégzés feltételeit a helyszínen biztosítani, valamint a Szolgáltató által kért minden információt, dokumentumot és nyilatkozatot határidőre rendelkezésre bocsátani. Ezen túlmenően a Megrendelő kijelöl egy kapcsolattartó személyt, aki a Szolgáltatóval a feladatok teljesítése során együttműködik.</p>
          <p><strong>5.4. Szolgáltatás Szintű Megállapodás (SLA):</strong> Amennyiben a Felek tartós megbízásban állapodnak meg, az Egyedi Szerződés tartalmazhatja a szolgáltatás minőségére és rendelkezésre állására vonatkozó részletes szabályokat (SLA), beleértve a válaszidőket, a hibaelhárítási határidőket és az esetleges kötbér-kikötéseket. Az SLA az ÁSZF kiegészítő részét képezi.</p>

          <h2 className="text-2xl font-bold text-slate-800 pt-4 border-b pb-2">6. Felelősségvállalás, Kárfelelősség és Felelősségkorlátozás</h2>
          <p><strong>6.1. Szolgáltatói Felelősség:</strong> A Szolgáltató szakmai felelősséget vállal az általa nyújtott szolgáltatások jogszabályi és szakmai megfelelőségéért. A Szolgáltató rendelkezik a tevékenységére vonatkozó, megfelelő összegű szakmai felelősségbiztosítással, amely fedezi az esetleges szakmai mulasztásokból eredő károkat. A Szolgáltató a szolgáltatásnyújtás során minden tőle elvárható gondossággal és szakértelemmel jár el.</p>
          <p><strong>6.2. Felelősségkorlátozás:</strong> A Szolgáltató felelőssége kizárólag a saját hibás teljesítésével okozott, közvetlen és bizonyított károkra terjed ki. A Szolgáltató kizárja a felelősségét minden közvetett vagy következményi kárért (pl. elmaradt haszon, termeléskiesés, üzleti hírnév sérelme, pénzbírság). A kártérítés maximális mértéke nem haladhatja meg a Szolgáltató szakmai felelősségbiztosításának limitjét, de legfeljebb az Egyedi Szerződés szerinti nettó díj kétszeresét. A Szolgáltató nem felel a Megrendelő által tévesen vagy hiányosan szolgáltatott adatokból eredő károkért.</p>
          <p><strong>6.3. Megrendelői Felelősség:</strong> A Megrendelő teljes körűen felel az általa szolgáltatott adatok és információk helytállóságáért, teljességéért és pontosságáért. A Megrendelő feladata és felelőssége a Szolgáltató által elkészített dokumentumok (pl. szabályzatok) szervezetén belüli bevezetése, a munkavállalók megfelelő oktatása és a szabályzatok betartatása. A Megrendelő felel a Szolgáltató munkavállalóinak biztonságáért a helyszíni munkavégzés során.</p>
          
          <h2 className="text-2xl font-bold text-slate-800 pt-4 border-b pb-2">7. Szellemi Tulajdon és Felhasználási Jog</h2>
          <p><strong>7.1. Tulajdonjog:</strong> A Szolgáltató által a teljesítés során létrehozott minden dokumentum, tananyag, szoftveres megoldás, módszertan és egyéb szellemi alkotás a Szolgáltató kizárólagos szellemi tulajdonát képezi, függetlenül attól, hogy az a szerzői jogi védelem alá esik-e.</p>
          <p><strong>7.2. Felhasználási Jog (Licenc):</strong> A szolgáltatási díj hiánytalan megfizetését követően a Megrendelő az átadott szellemi termékekre vonatkozóan belső használati, időben korlátlan, nem kizárólagos és át nem ruházható felhasználási jogot (licencet) szerez. Ez a jog feljogosítja a Megrendelőt a dokumentumok belső működése során történő alkalmazására és sokszorosítására, de nem terjed ki azok módosítására, átdolgozására, nyilvánosságra hozatalára vagy harmadik felek részére történő értékesítésére. Harmadik fél részére csak abban az esetben adhatók át, ha a Szolgáltató előzetesen, írásban ehhez hozzájárul.</p>
          <p><strong>7.3. Titoktartási Kötelezettség:</strong> A Megrendelő tudomásul veszi, hogy a Szolgáltató által átadott információk és dokumentumok bizalmas természetűek, és kötelezettséget vállal azok bizalmas kezelésére.</p>

          <h2 className="text-2xl font-bold text-slate-800 pt-4 border-b pb-2">8. A Szerződés Megszűnése, Felmondás és Jogkövetkezmények</h2>
          <p><strong>8.1. Rendes Felmondás:</strong> Határozatlan idejű szerződést a Felek 30 napos felmondási idővel, írásban, indokolás nélkül felmondhatnak. A felmondási idő az írásbeli felmondás kézbesítésének napján kezdődik.</p>
          <p><strong>8.2. Rendkívüli Felmondás:</strong> Súlyos szerződésszegés esetén a sérelmet szenvedő Fél jogosult a szerződést azonnali hatállyal, írásban, indokolással felmondani. Súlyos szerződésszegésnek minősül különösen: a 30 napot meghaladó fizetési késedelem; a titoktartási kötelezettség ismételt vagy súlyos megsértése; a teljesítést lehetetlenné tevő magatartás; vagy ha bármelyik fél felszámolási vagy csődeljárás alá kerül.</p>
          <p><strong>8.3. Elszámolás Megszűnéskor:</strong> A szerződés bármely okból történő megszűnésekor a Megrendelő köteles a Szolgáltató által a megszűnés napjáig elvégzett és igazolt munka arányos díját megtéríteni, a már megfizetett előleg beszámításával. A Szolgáltató köteles minden, a Megrendelőtől kapott, a Megrendelő tulajdonát képező dokumentumot és eszközt visszaszolgáltatni.</p>
          
          <h2 className="text-2xl font-bold text-slate-800 pt-4 border-b pb-2">9. Vegyes és Záró Rendelkezések</h2>
          <p><strong>9.1. Adatvédelem:</strong> A Szolgáltató a Megrendelő adatait a GDPR és a vonatkozó magyar jogszabályok szerint, a honlapján elérhető Adatkezelési Tájékoztatóban foglaltaknak megfelelően kezeli. Amennyiben a Szolgáltató a Megrendelő nevében személyes adatokat kezel, a Felek külön Adatfeldolgozási Szerződést kötnek, amely részletesen szabályozza a személyes adatok kezelésének feltételeit.</p>
          <p><strong>9.2. Alkalmazandó Jog és Vitarendezés:</strong> A szerződéses jogviszonyra a magyar jog az irányadó. A Felek megállapodnak abban, hogy a szerződésből eredő vitás kérdéseket elsősorban békés úton, tárgyalások útján próbálják rendezni. Ennek sikertelensége esetén a Debreceni Járásbíróság, illetve a Debreceni Törvényszék kizárólagos illetékességét kötik ki.</p>
          <p><strong>9.3. Értesítések:</strong> A Felek a szerződéssel kapcsolatos hivatalos értesítéseiket írásban, a másik Fél székhelyére vagy az Egyedi Szerződésben megadott e-mail címére küldik meg. Az e-mail útján küldött értesítés a küldés napján kézbesítettnek minősül, kivéve, ha a küldő fél nem kap kézbesítési hibajelzést.</p>
          <p><strong>9.4. Részleges Érvénytelenség:</strong> Ha a szerződés bármely rendelkezése érvénytelennek vagy érvényesíthetetlennek minősülne, ez nem érinti a többi rendelkezés érvényességét. Az érvénytelen rész helyett a Ptk. vonatkozó szabályai vagy a Felek eredeti szándékához legközelebb álló, jogszerű rendelkezés az irányadó.</p>
          <p><strong>9.5. Teljes Megállapodás:</strong> Jelen ÁSZF és az Egyedi Szerződés alkotja a Felek közötti teljes és egyedüli megállapodást, és felülír minden korábbi szóbeli vagy írásbeli egyeztetést, megállapodást és nyilatkozatot.</p>
          <p><strong>9.6. Egyéb:</strong> Az ÁSZF a Szolgáltató honlapján folyamatosan elérhető, és a Szolgáltató fenntartja a jogot annak egyoldalú módosítására, a már létrejött szerződéseket azonban a módosítás nem érinti, kivéve, ha a Felek erről külön megállapodnak.</p>

          <p className="mt-8 pt-4 text-center font-semibold border-t">Trident Shield Group Kft.</p>
          <p className="text-center text-sm text-slate-500">Kelt: Debrecen, 2025. augusztus 26.</p>
        </div>
      </motion.div>
    </div>
  );
};

export default AszfPage;