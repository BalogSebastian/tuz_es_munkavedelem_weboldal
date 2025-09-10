'use client';

import React, { useState, useMemo, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChevronDownIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { FaFire, FaHardHat, FaUtensils } from 'react-icons/fa';

// --- TÍPUSDEFINÍCIÓK (JAVÍTVA) ---
interface FaqItemData {
  q: string;
  a: string;
  category?: string; // JAVÍTÁS: A 'category' mező opcionális
}

interface FaqCategory {
  category: string;
  icon: React.ComponentType<{ className?: string }>;
  questions: { q: string; a: string }[];
}

const faqData : FaqCategory[] = [
    { 
        category: "Tűzvédelem",
        icon: FaFire,
        questions: [
          { q: "Kell-e tűzvédelmi szabályzat, ha csak 3 alkalmazottam van?", a: "Igen, bizonyos esetekben kell. <strong>Ha a cég tűzveszélyes tevékenységet végez, vagy 50 főnél több ember tartózkodik rendszeresen az épületben, </strong>kötelező a szabályzat. Három alkalmazott esetén általában nem kell, de a tevékenység jellege ezt felülírhatja." },
          { q: "Milyen esetben kötelező tűzriadó tervet készíteni?", a : "Tűzriadó tervet kell készíteni <strong>ha az épület befogadóképessége meghaladja az 50 főt,</strong> vagy ha <strong>veszélyes anyagokat tárolnak,</strong> illetve <strong>oktatási, egészségügyi, szórakoztató intézményekben.</strong> A terv célja, hogy vészhelyzetben mindenki tudja, hogyan kell elhagyni az épületet."},
          { q: "Milyen gyakran kell tűzvédelmi oktatást tartani?", a: "A tűzvédelmi oktatás <strong>évente egyszer kötelező</strong> minden munkavállalónak. Új belépőknek <strong>belépéskor azonnal</strong> kell oktatást tartani. Ha a tevékenység vagy a munkakör megváltozik, akkor rendkívüli oktatás szükséges. Az oktatás célja, hogy minden dolgozó tisztában legyen a teendőkkel." },
          { q: "Hol kell dokumentálni a tűzvédelmi oktatást?", a: "Az oktatásról <strong>írásos dokumentációt kell vezetni</strong>, amely tartalmazza az oktatás időpontját, a résztvevők nevét és aláírását, valamint az oktatást tartó személy nevét. Ezt a nyilvántartást a cégnek meg kell őriznie, mert az ellenőrzés során <strong>a hatóság mindig kéri</strong>." },
          { q: "Ki tarthat tűzvédelmi oktatást a dolgozóknak?", a: "Tűzvédelmi oktatást csak <strong>tűzvédelmi szakvizsgával rendelkező szakember</strong> tarthat. Ez lehet külsős cég vagy saját munkavállaló, ha van megfelelő végzettsége. Az ügyvezető önállóan nem tarthat oktatást, kivéve ha rendelkezik a szükséges képesítéssel." },
          { q: "Milyen tűzvédelmi eszközök kellenek egy irodába?", a: "Egy irodában kötelező a <strong>tűzoltó készülék</strong>, menekülési útvonal jelzések, valamint szükség esetén <strong>füstjelzők és vészvilágítás</strong>. A pontos eszközök a helyiség méretétől és a dolgozók számától függenek. A lényeg, hogy egy esetleges tűz esetén gyorsan és biztonságosan lehessen reagálni." },
          { q: "Kell-e tűzoltó készülék egy kisebb üzletbe?", a: "Igen. A jogszabály szerint <strong>minden gazdálkodó egységben</strong> kötelező a tűzoltó készülék elhelyezése, mérettől függetlenül. Még egy kisebb boltban is előfordulhat tűzveszélyes helyzet, ezért legalább <strong>egy darab megfelelő típusú készüléket</strong> mindig biztosítani kell, jól látható és elérhető helyen." },
          { q: "Hány darab tűzoltó készülék szükséges?", a: "A készülékek számát a <strong>helyiség alapterülete és a tűzveszélyességi osztály</strong> határozza meg. Általános szabály, hogy <strong>50 m²-enként</strong> legalább egy tűzoltó készülék szükséges. Emellett minden szinten és kiemelten veszélyes munkahelyeken külön is kell elhelyezni készülékeket a gyors beavatkozás érdekében." },
          { q: "Mennyi ideig jó egy tűzoltó készülék?", a: "Egy tűzoltó készülék általában <strong>10–15 évig használható</strong>, ha rendszeresen karbantartják. Azonban <strong>évente kötelező felülvizsgálat</strong> szükséges, amelyet szakember végez. Ha a készülék sérült, lejárt vagy nem működőképes, akkor azonnali csere szükséges, különben bírság is kiszabható ellenőrzéskor." },
          { q: "Ki tölti fel a tűzoltó készülékeket?", a: "A tűzoltó készülékek karbantartását és újratöltését csak <strong>engedéllyel rendelkező szakember vagy cég</strong> végezheti. A cégvezető felelőssége, hogy időben gondoskodjon erről. Saját kezűleg nem lehet után­tölteni, mert a hibás feltöltés életveszélyes lehet, és jogszabályellenes is." },
          { q: "Milyen gyakran kell a tűzoltó készülékeket ellenőrizni?", a: "A <strong>tűzoltó készülékeket évente kötelező</strong> szakemberrel felülvizsgáltatni. Az ellenőrzés során a <strong>működőképességet, töltöttséget és érvényességet</strong> nézik. Ötévente nagyobb karbantartás vagy csere szükséges. Enélkül a készülék <strong>nem biztos, hogy működik</strong>, és a hatóság <strong>bírságot</strong> szabhat ki." },
          { q: "Mit vizsgál a katasztrófavédelem egy ellenőrzés során?", a: "A katasztrófavédelem ellenőrzi a <strong>tűzvédelmi szabályzatot</strong>, a <strong>tűzriadó tervet</strong>, a kihelyezett <strong>tűzoltó készülékeket</strong>, a <strong>menekülési útvonalakat</strong> és az <strong>oktatás dokumentációját</strong>. Azt is vizsgálják, hogy minden eszköz <strong>megfelelően karbantartott</strong>-e. Hiányosság esetén figyelmeztetés vagy bírság jár." },
          { q: "Mi történik, ha nincs tűzvédelmi szabályzat?", a: "Ha a cégnek kötelező lenne, de <strong>nincs tűzvédelmi szabályzata</strong>, a hatóság <strong>bírságot</strong> szabhat ki, és kötelezi annak pótlására. Hiányában nem csak <strong>anyagi szankció</strong> fenyeget, hanem <strong>tűzesetnél a cég vezetője személyesen is felelős</strong>, mert nem biztosította a szükséges megelőző intézkedéseket." },
          { q: "Mekkora bírságot kaphatok tűzvédelmi hiányosságok miatt?", a: "A <strong>tűzvédelmi bírság összege 50 000 Ft-tól több millió forintig</strong> terjedhet, a hiányosság súlyosságától függően. Például egy <strong>lejárt tűzoltó készülék kisebb bírság</strong> , míg egy <strong>hiányzó szabályzat vagy nem működő menekülési útvonal</strong> több százezres vagy milliós bírságot vonhat maga után." },
          {
            q: "Mi a következménye, ha nincs tűzvédelmi oktatás dokumentálva?",
            a: "A <strong>tűzvédelmi oktatás megtartása és írásos dokumentálása kötelező</strong>. Ha ez hiányzik, a hatóság <strong>bírságot szabhat ki</strong> és előírja az oktatás pótlását. <strong>Tűzesetnél</strong> pedig a <strong> cégvezetőt személyesen felelőssé tehetik</strong>, mert nem bizonyítható, hogy a dolgozók <strong>felkészültek</strong> voltak a veszélyhelyzetek kezelésére."
          },
          {
            q: "Ki felel a tűzvédelemért a cégnél? Az ügyvezető vagy a munkavédelmis?",
            a : "A <strong>végső felelősség mindig az ügyvezetőé, </strong> hiszen ő képviseli a céget. A kijelölt <strong>tűzvédelmi szakember </strong> vagy <strong>munkavédelmis</strong> csak segíti a feladatok elvégzésében, de a hatóság előtt <strong>az ügyvezető felel.</strong> Ezért fontos, hogy a vezető <strong> biztosítsa a megfelelő szakember bevonását.</strong>"
          },
          {
            q : "Hogyan kell kijelölni a menekülési útvonalakat?",
            a : "A menekülési útvonalakat úgy kell kijelölni, hogy <strong>minden helyiségből gyorsan és biztonságosan elérhető legyen a kijárat. </strong>Ezeket <strong>  jól látható zöld táblákkal</strong>  kell jelölni, és mindig <strong> szabadon kell hagyni.</strong> Nem lehet rajtuk <strong>akadály, lezárt ajtó vagy tárolt áru,</strong> mert veszélyhelyzetben azonnal használhatónak kell lenniük."
          },
          {
            q: "Kell-e biztonsági világítás a cégembe?",
            a : "<strong>Igen, ha a helyiségben nincs természetes fény</strong> vagy az épület mérete és funkciója megköveteli. A biztonsági világítás biztosítja, hogy <strong> áramszünet vagy füst</strong> esetén is látható maradjon a menekülési útvonal. Kis alapterületű üzleteknél ez nem mindig kötelező, de <strong>szakemberrel kell ellenőriztetni</strong> a szükségességét."
          },
          {
            q : "Milyen jelzőtáblákat kötelező kitenni?",
            a : "Kötelező a <strong> menekülési útvonalakat, a vészkijáratokat </strong> a <strong> tűzoltó készülékek helyét</strong> és a <strong> tűzjelző berendezéseket</strong> jól látható táblákkal megjelölni. Ezen felül a <strong> dohányzási tilalom</strong> és a <strong>veszélyes anyagok jelölése</strong> is előírás lehet. A tábláknak <strong> MSZ szabvány szerintieknek</strong> kell lenniük, nem helyben készített verzióknak."
          },
          {
            q: "Ki készítheti el a tűzvédelmi szabályzatot?",
            a : "A tűzvédelmi szabályzatot csak <strong> szakképesített tűzvédelmi szakember</strong> készítheti el. Az ügyvezető nem írhatja meg saját maga, mert a szabályzatnak <strong>jogszabályi követelményeknek </strong> kell megfelelnie. A szakember biztosítja, hogy minden <strong> előírás, menekülési útvonal és tűzoltó eszköz </strong> előírásszerűen szerepeljen benne."
          },
          {
            q : "Mi a különbség a tűzvédelmi szabályzat és a tűzriadó terv között?",
            a : "A <strong>tűzvédelmi szabályzat</strong> egy átfogó dokumentum, amely tartalmazza a <strong> cég tűzvédelmi előírásait, kötelezettségeit és ellenőrzési rendjét.</strong> A <strong> tűzriadó terv </strong> viszont egy <strong> gyakorlati útmutató </strong> amely leírja, hogy <strong> űz esetén pontosan mit kell tenni, </strong>hogyan kell elhagyni az épületet, és kik az érintett felelősök. "
          },
          {
            q : "Meddig érvényes egy elkészített tűzvédelmi szabályzat?",
            a : "A tűzvédelmi szabályzatnak <strong> nincs lejárati ideje </strong> de <strong> módosítani kell,</strong> ha a cég tevékenysége, létszáma vagy épülete változik. Például új telephely, több dolgozó, vagy átalakítás esetén <strong> kötelező frissíteni.</strong> Ha nincs naprakészen tartva, a hatóság <strong> bírságot szabhat ki.</strong>"
          },
          {
            q : "Mikor kell frissíteni a tűzvédelmi szabályzatot?",
            a : "A szabályzatot <strong> minden jelentős változásnál </strong> frissíteni kell: ha <strong> új telephely</strong> nyílik, változik a <strong> létszám </strong>  átalakítják az épületet, vagy új <strong>technológiát</strong> vezetnek be. Ha nincs naprakészen tartva, a hatóság <strong> bírságot szabhat ki,</strong>  mert elavult szabályzat nem véd megfelelően."
          },
          {
            q : "Ha költözik a cégem, kell új szabályzatot készíteni?",
            a : "Igen. Költözéskor a <strong>korábbi szabályzat érvényét veszti,</strong> mert más a <strong>  menekülési útvonal,</strong> a <strong> helyiségek elrendezése</strong> és az <strong> eszközök helye</strong> Új telephelyen mindig<strong> új szabályzat</strong> kell, hogy megfeleljen az adott körülményeknek és jogszabályi előírásoknak."
          },
          {
            q : "A bérelt irodában nekem vagy a tulajdonosnak kell gondoskodni a tűzvédelemről?",
            a : "A <strong> bérlő felel a saját tevékenységéért </strong> és a dolgozók biztonságáért, így  a <strong> tűzvédelmi szabályzatot és oktatást</strong> neki kell biztosítania. Az épület <strong> közös részeinek tűzvédelméről</strong> viszont a <strong> tulajdonos vagy üzemeltető</strong> gondoskodik. Fontos, hogy a felelősségi körök tisztázva legyenek."
          },
          {
            q : "Hogyan tudom tesztelni a füstérzékelőt?",
            a : "Minden készüléken van egy <strong> teszt gomb</strong>  amelyet megnyomva a riasztónak sípolnia kell. Ez a próba <strong>havonta ajánlott.</strong> Léteznek <strong> teszt spray-k</strong> amelyekkel füstöt szimulálhatunk. Ha nem ad hangot a gombnyomásra, az eszközt <strong>azonnal cserélni kell.</strong>"
          },
          {
            q : "Kell-e szén-monoxid érzékelő a munkahelyen?",
            a : "Ott kötelező, ahol <strong>nyílt lánggal működő berendezés</strong> van (pl. gázkazán, vízmelegítő). Az érzékelő életet menthet, mert a szén-monoxid <strong>színtelen és szagtalan gáz,</strong> amit nem lehet észrevenni. Ha az irodában nincs ilyen berendezés, akkor nem szükséges, de <strong>ajánlott</strong>."
          },
          {
            q : "Mennyi időt vesz igénybe a tűzvédelmi ellenőrzés?",
            a : "Egy hatósági ellenőrzés általában <strong>  1–2 órát vesz igénybe,</strong> a cég méretétől és a dokumentációtól függően. Az ellenőr átnézi a szabályzatokat, naplókat, tűzoltó készülékeket és menekülési útvonalakat. Ha minden rendben, gyorsan lezajlik, hiányosság esetén azonban <strong>további vizsgálat </strong> is lehet."
          },
          {
            q: "Ki jogosult tűzvédelmi bírságot kiszabni?",
            a : "A <strong>katasztrófavédelem</strong> jogosult tűzvédelmi bírság kiszabására. A bírság mértéke függ a hiányosság súlyától, akár <strong>több százezer forint</strong> is lehet. Az ellenőr mérlegelhet, de jogszabály szerint minden hiányosság rögzítésre kerül, ezért fontos a dokumentáció és az eszközök naprakészen tartása."
          },
          {
            q : "Ha van munkavédelmi szakemberem, akkor kell külön tűzvédelmi is?",
            a : "Igen. A <strong>munkavédelem és a tűzvédelem külön szakterület</strong> ezért külön szakember szükséges hozzájuk. Van, aki mindkettőre rendelkezik képesítéssel, ilyenkor egy személy is elláthatja a feladatot. Ha viszont csak munkavédelmis van, akkor <strong> tűzvédelmi szakembert is kell bevonni.</strong>"
          },
          {
            q : "Mennyi idő alatt készül el egy tűzvédelmi szabályzat?",
            a : "Általában <strong> 1–1,5 hét alatt</strong> elkészíthető, ha minden adat rendelkezésre áll (pl. alaprajz, dolgozói létszám, tevékenységi kör). Sürgős esetben akár pár nap alatt is megoldható, de fontos, hogy a dokumentum pontosan a cég saját működésére legyen szabva, különben nem elfogadható."
          },
          {
            q : "Kell-e oktatást tartani a diákoknak/gyakornokoknak is?",
            a : "Igen. <strong>Minden dolgozó, beleértve a diákokat és gyakornokokat is,</strong> köteles részt venni tűzvédelmi oktatáson. A jogszabály nem tesz különbséget. Nekik is tudniuk kell, hogyan kell viselkedni tűz esetén, merre van a menekülési útvonal, és hogyan használhatók az eszközök."
          },
          { 
            q : "Kötelező a dolgozóknak tudni a tűzoltó készülék használatát?",
            a : "Igen. A tűzvédelmi oktatás során <strong>meg kell ismertetni a tűzoltó készülék kezelését.</strong> Nem elég elméletben, szükség esetén gyakorlatban is bemutatható. A cél, hogy minden dolgozó képes legyen <strong> veszélyhelyzetben azonnal reagálni,</strong> és biztonságosan elfojtani egy kezdeti tüzet."
          },
          { 
            q : "Hogyan tudom bizonyítani, hogy a dolgozók részt vettek a tűzvédelmi oktatáson?",
            a : "Az oktatásról <strong> írásos dokumentáció </strong>készül: jelenléti ív és oktatási tematika. Ezeket meg kell őrizni, és ellenőrzéskor bemutatni. Ha nincs dokumentálva, a hatóság úgy tekinti, mintha az oktatás <strong> meg sem történt volna,</strong> még akkor is, ha a dolgozók valóban részt vettek. "
          },
          { 
            q : "Kell-e naplózni a tűzvédelmi eszközök ellenőrzését?",
            a : "Igen. A tűzoltó készülékek és egyéb eszközök ellenőrzését <strong> nyilvántartásban kell vezetni.</strong> Ez tartalmazza az ellenőrzés dátumát, a felelős nevét és a készülék állapotát. Enélkül a hatóság nem tudja igazoltnak tekinteni, hogy az eszközök karbantartottak."
          },
          {
            q : "Mi a teendő, ha tűzvédelmi hiányosságot találok a cégemnél?",
            a : "Azonnal intézkedni kell a hiányosság megszüntetésére. Például ha lejárt egy tűzoltó készülék, gondoskodni kell a <strong>felülvizsgálatról vagy cseréről. </strong> Ha dokumentum hiányzik, azt pótolni kell. A hatóság a javító szándékot értékeli, de halogatás esetén <strong> bírságot szabhat ki.</strong>"
          },
          {
            q : "Van-e lehetőség bírság helyett figyelmeztetésre első alkalommal?",
            a : "Igen, előfordulhat. A katasztrófavédelem mérlegelheti, hogy <strong>figyelmeztetést adjon</strong> első alkalommal, főleg kisebb hiányosságoknál. Ez azonban nem garantált. Súlyos vagy veszélyes hiányosságoknál (pl. használhatatlan menekülési útvonal, hiányzó készülék) a bírság  <strong>kötelező.</strong>"
          }

        ]
    },
    { 
        category: "Munkavédelem",
        icon: FaHardHat,
        questions: [
          {
            q: "Miért kötelező a munkavédelem minden cégnek?",
            a : "A <strong> munkavédelem célja </strong> a dolgozók biztonságának és egészségének megőrzése. Nem csak <strong> jogi kötelezettség, </strong>  hanem a <strong> munkahelyi balesetek és betegségek megelőzésének alapja.</strong> Ha nincs megfelelő munkavédelem, az <strong> bírságot, jogi felelősséget</strong>és akár<strong>  komoly anyagi károkat </strong> is okozhat a cégnek. "
          },
          {
            q : "Mikortól kell egy cégnek munkavédelmi szakembert alkalmaznia?",
            a : "<strong>  Már egy fő alkalmazása esetén </strong> kötelező munkavédelmi szakember bevonása. A feladatokat kizárólag <strong> megfelelő végzettséggel rendelkező szakember </strong> láthatja el. Ő végzi a <strong> kockázatértékelést,</strong> a szükséges <strong> dokumentációk elkészítését, </strong>  valamint segít a munkáltatónak a <strong> törvényi előírások betartásában. </strong>"
          },
          {
            q : "Ki felelős a munkavédelemért a cégnél: az ügyvezető vagy a szakember?",
            a : "A <strong>jogi felelősség mindig az ügyvezetőt terheli.</strong> A munkavédelmi szakember szakmai támogatást nyújt: elkészíti a <strong> szabályzatot,</strong> elvégzi a  <strong> kockázatértékelést</strong> és megtartja az <strong> oktatásokat. </strong> De a szabályok <strong>  betartatásáért </strong> és a munkavállalók biztonságáért <strong> az ügyvezető felel.</strong>"
          },
          {
             q : "Mi történik, ha nincs munkavédelmi szabályzat?",
             a : "Szabályzat hiányában a <strong>  hatóság súlyos bírságot szabhat ki,</strong>  vagy akár <strong> felfüggesztheti a cég működését. </strong> Ha <strong>baleset</strong> történik, a munkáltató teljes körű <strong>anyagi és jogi felelősséget </strong>visel . A munkavédelmi szabályzat megléte a <strong>biztonság alapfeltétele,</strong> minden cég számára kötelező."
          },
          {
            q : "Mi a különbség a munkavédelmi szabályzat és a kockázatértékelés között?",
            a : "A <strong> munkavédelmi szabályzat </strong> tartalmazza a cég <strong> feladatait, felelősségi köröket és előírásokat. </strong> A <strong> kockázatértékelés </strong>ezzel szemben a  <strong> konkrét veszélyek felmérését, </strong> azok <strong> értékelését</strong> valamint a <strong> megelőző intézkedések meghatározását</strong> szolgálja. Együtt alkotják a teljes munkavédelmi rendszert."
          },
          {
             q : "Milyen jogszabály írja elő a munkavédelmet?",
             a : "A munkavédelem alapját az <strong> 1993. évi XCIII. törvény a munkavédelemről</strong> 1993. évi XCIII. törvény a munkavédelemről <strong> munkáltatók kötelezettségeit, </strong> a <strong> munkavállalók jogait </strong> és a <strong> biztonságos munkavégzés feltételeit.</strong> A törvényt további <strong> rendeletek és szabványok </stong> egészítik ki, amelyek részletes előírásokat tartalmaznak."
          },
          {
            q : "Kell munkavédelmi szabályzat, ha csak 1 alkalmazottam van?",
            a : "Igen, <strong> már egyetlen alkalmazott esetén is kötelező </strong> a munkavédelmi szabályzat. A törvény nem tesz különbséget a cég mérete alapján: minden munkáltató köteles gondoskodni a dolgozói biztonságáról. A dokumentáció hiánya <strong> bírságot és jogi felelősséget </strong>  von maga után."
          },
          {
            q : "Kötelező-e a munkavédelem a részmunkaidős vagy alkalmi dolgozóknál is?",
            a : "Igen, a munkavédelem <strong> minden munkaviszonyban álló dolgozóra vonatkozik, </strong> legyen az teljes-, részmunkaidős vagy alkalmi. A munkáltató kötelessége, hogy a dolgozók biztonságos körülmények között dolgozzanak, függetlenül a ledolgozott órák számától."
          },
          {
            q : " Kinek a kötelessége biztosítani a munkavédelmet: a munkáltatónak vagy a dolgozónak?",
            a : "A <strong> munkáltató kötelessége </strong> biztosítani a biztonságos munkafeltételeket, elkészíteni a dokumentációt és megtartani az oktatásokat. A <strong>  munkavállalónak pedig kötelessége betartani </strong> az előírásokat és helyesen használni a védőeszközöket. A felelősség tehát megoszlik, de a fő felelősség a munkáltatóé."
          },
          {
            q: "Mekkora bírság járhat munkavédelmi hiányosságokért?",
            a: "A munkavédelmi bírság <strong>200.000 Ft-tól akár több millió forintig</strong> terjedhet, a hiányosság súlyosságától függően. Súlyos mulasztás esetén a hatóság <strong>felfüggesztheti a cég működését</strong> is. Ha baleset történik, a munkáltató <strong>teljes körű kártérítési felelősséggel</strong> tartozik."
          },
          {
            q: "Ki készítheti el a kockázatértékelést?",
            a: "A kockázatértékelést kizárólag <strong>szakképzett munkavédelmi szakember</strong> készítheti el. Ő rendelkezik a szükséges ismeretekkel ahhoz, hogy felmérje a munkahelyi veszélyeket, meghatározza a kockázatok mértékét, és előírja a megfelelő megelőző intézkedéseket."
          },
          {
            q: "Milyen gyakran kell frissíteni a kockázatértékelést?",
            a: "A kockázatértékelést <strong>legalább 5 évente</strong> kötelező frissíteni. Emellett mindig újra kell készíteni, ha <strong>változik a munkakörnyezet</strong>, új technológiát vezetnek be, vagy baleset történik. Így biztosítható, hogy a dokumentum mindig <strong>naprakész és érvényes</strong> legyen."
          },
          {
            q: "Kötelező-e kockázatértékelés egy irodában is?",
            a: "Igen, <strong>minden munkahelyen kötelező</strong>, még akkor is, ha csak irodai munkavégzés zajlik. Bár itt kevesebb a veszélyforrás, a dokumentumban szerepelnie kell például az <strong>ergonómiai kockázatoknak, elektromos berendezések használatának, tűz- és menekülési előírásoknak</strong>."
          },
          {
            q: "Mennyi ideig érvényes a kockázatértékelés?",
            a: "A kockázatértékelés <strong>5 évig érvényes</strong>, de előbb is frissíteni kell, ha baleset történik, új technológia kerül bevezetésre, vagy jelentősen megváltozik a munkakörnyezet. A dokumentum naprakészsége kulcsfontosságú, mivel <strong>ellenőrzéskor mindig az aktuális állapotot</strong> vizsgálják."
          },
          {
            q : "Mi történik, ha nincs kockázatértékelés?",
            a : "Ha nincs kockázatértékelés, a munkáltató <strong> jogi felelősséggel tartozik </strong> és munkavédelmi bírságot kaphat, amely akár több százezer forint is lehet. Súlyosabb esetben a hatóság a cég működését is felfüggesztheti. Emellett balesetnél a munkáltató teljes <strong> kártérítési felelősséggel </strong> tartozik."
          },
          {
            q : "Milyen területekre kell kiterjednie a kockázatértékelésnek?",
            a : "A kockázatértékelésnek minden munkaterületre ki kell terjednie: <strong> munkakörnyezet, munkaeszközök, gépek, munkafolyamatok, vegyi anyagok, fizikai tényezők (pl. zaj, rezgés, hőmérséklet), ergonómia és pszichoszociális kockázatok.</strong> Az átfogó vizsgálat biztosítja a dolgozók teljes körű védelmét."
          },
          {
            q : "Kötelező-e zaj- vagy rezgésmérés a kockázatértékelésben?",
            a : "Igen, ha a munkahelyen a dolgozókat <strong> zaj- vagy rezgésterhelés éri, </strong> kötelező a mérés. Például gyárakban, műhelyekben, építkezéseken. Irodai környezetben általában nem szükséges, de a szakembernek mindig dokumentálnia kell, hogy az adott munkahelyen milyen mértékű kockázat áll fenn."
          },
          {
            q : "Kell-e veszélyes anyagokra külön kockázatértékelés?",
            a : "Igen, a veszélyes anyagok esetében mindig <strong> külön kockázatértékelést </strong> kell készíteni. Ez tartalmazza az anyagok azonosítását, tárolását, kezelési módját, valamint a dolgozók egészségére gyakorolt hatásait. A munkáltató köteles <strong> biztonsági adatlapot biztosítani </strong> minden ilyen anyagról."
          },
          {
            q : "Minden munkavállalónak kötelező az orvosi alkalmassági vizsgálat?",
            a : "Igen, <strong> minden dolgozó számára kötelező </strong> a munkába állás előtt. Ez biztosítja, hogy a munkavállaló egészségi állapota megfelel az adott munkakör követelményeinek. Az orvosi alkalmasság nélkül a munkáltató <strong>  nem foglalkoztathatja jogszerűen</strong> a dolgozót."
          },
          {
            q : "Mikor kell orvosi vizsgálatra menni?",
            a : "Az orvosi vizsgálatot a munkába állás előtt kell elvégezni, majd <strong> időszakosan </strong> a jogszabály által meghatározott gyakorisággal. Bizonyos munkaköröknél soron kívül is szükséges lehet, például baleset, betegség után vagy ha a munkakörülmények megváltoznak."
          },
          {
            q : "Mennyi ideig érvényes az orvosi alkalmassági igazolás?",
            a : "Az orvosi igazolás általában <strong> 1–3 évig érvényes, </strong> a munkakör veszélyességi besorolásától függően. Veszélyesebb munkakörökben gyakrabban, akár évente szükséges a vizsgálat. Az érvényesség lejárta után új vizsgálat nélkül <strong>nem dolgozhat tovább a munkavállaló. </strong>"
          },
          {
            q: "Ki fizeti a dolgozók orvosi alkalmassági vizsgálatát?",
            a: "Az orvosi alkalmassági vizsgálat költsége <strong>minden esetben a munkáltatót terheli.</strong> A dolgozónak nem kell fizetnie érte, mivel ez a munkavégzés feltétele. A vizsgálat díja a munkáltató kötelező munkavédelmi kiadásai közé tartozik."
          },
          {
            q: "Milyen vizsgálat kell élelmiszeripari dolgozóknak?",
            a: "Az élelmiszeriparban dolgozóknak kötelező a <strong>higiénés alkalmassági vizsgálat</strong>, amely kizárja a fertőző betegségekben szenvedő személyek foglalkoztatását. Emellett rendszeres időszakos vizsgálatokat is kell végezni, hogy a dolgozók megfeleljenek a <strong>közegészségügyi előírásoknak.</strong>"
          },
          {
            q: "Kötelező-e pszichológiai alkalmassági vizsgálat bizonyos munkaköröknél?",
            a: "Igen, bizonyos munkaköröknél, például <strong>fegyveres biztonsági őrök, gépjárművezetők vagy fokozott figyelmet igénylő munkát végzők</strong> esetében kötelező a pszichológiai alkalmassági vizsgálat. Ez biztosítja, hogy a dolgozó mentálisan is alkalmas a feladat biztonságos ellátására."
          },
          {
            q: "Kötelező-e a munkavédelmi oktatás minden dolgozónak?",
            a: "Igen, a munkavédelmi oktatás <strong>minden munkavállaló számára kötelező.</strong> Ide tartoznak a teljes munkaidős, részmunkaidős és alkalmi dolgozók is. Az oktatás biztosítja, hogy a munkavállaló tisztában legyen a <strong>munkahelyi veszélyekkel, előírásokkal és saját felelősségével.</strong>"
          },
          {
            q: "Milyen gyakran kell munkavédelmi oktatást tartani?",
            a: "Az oktatásnak három típusa van: <strong>belépéskor</strong> (munkába állás előtt), <strong>ismétlődő oktatás</strong> (általában évente) és <strong>rendkívüli oktatás</strong>, ha új gépet, technológiát vezetnek be vagy baleset történik. Az időszakos ismétlés gyakoriságát a jogszabály és a cég kockázatai határozzák meg."
          },
          {
            q: "Ki tarthat munkavédelmi oktatást?",
            a: "A munkavédelmi oktatást <strong>csak munkavédelmi szakember</strong> vagy megfelelő képesítéssel rendelkező személy tarthatja. Az ügyvezető önmagában nem jogosult rá, ha nincs szakirányú képesítése. Ez biztosítja, hogy az oktatás <strong>szakmailag helyes és jogszerű</strong> legyen."
          },
          {
            q: "Hogyan kell dokumentálni a munkavédelmi oktatást?",
            a: "Az oktatásról <strong>írásos dokumentációt</strong> kell készíteni, amely tartalmazza az oktatás témáit, időpontját, az oktató és a résztvevők adatait, valamint a dolgozók aláírását. Enélkül az oktatás <strong>érvénytelennek számít</strong>, és egy ellenőrzés során bírságot vonhat maga után."
          },
          {
            q: "Kötelező-e oktatást tartani gyakornokoknak és diákoknak?",
            a: "Igen, minden munkát végző személynek, így a gyakornokoknak és diákoknak is kötelező a munkavédelmi oktatás. Ők ugyanúgy részt vesznek a munkafolyamatokban, ezért tisztában kell lenniük a <strong>veszélyekkel és a biztonsági szabályokkal</strong>, mielőtt bármilyen munkát végeznek."
          },
          {
            q: "Mennyi ideig tart egy munkavédelmi oktatás?",
            a: "Az oktatás időtartama a munkakörök veszélyességéről függ. Egy egyszerű irodai munka esetén <strong>30–60 perc is elegendő</strong>, míg veszélyes üzemeknél több órás képzés szükséges lehet. A lényeg, hogy az oktatás alatt a dolgozó <strong>teljes körű tájékoztatást kapjon.</strong>"
          },
          {
            q: "Mit tartalmazzon egy munkavédelmi oktatás?",
            a: "Az oktatásnak tartalmaznia kell a munkakör veszélyeit, a szükséges <strong>védőeszközök használatát</strong>, a vészhelyzeti teendőket, valamint a cég belső szabályait. Fontos, hogy a dolgozó tisztában legyen a <strong>jogszabályi előírásokkal</strong> és a saját felelősségével is."
          },
          {
            q: "Mi történik, ha nincs dokumentálva az oktatás?",
            a: "Ha az oktatás nincs dokumentálva, az olyan, mintha meg sem történt volna. Ellenőrzéskor a hatóság ezt <strong>súlyos hiányosságnak</strong> tekinti, és bírságot szabhat ki. Emellett baleset esetén a munkáltató <strong>teljes felelősséget visel</strong>, mert nem tudja igazolni a dolgozó felkészítését."
          },
          {
            q: "Ki biztosítja a védőfelszereléseket?",
            a: "A védőfelszerelések biztosítása a <strong>munkáltató kötelezettsége.</strong> Ő köteles gondoskodni arról, hogy a dolgozók a munkavégzéshez megfelelő védőeszközöket kapjanak. Ez jogszabályi előírás, és a hiánya esetén a munkáltató felelős minden balesetért vagy egészségkárosodásért."
          },
          {
            q: "Ingyenes a védőfelszerelés a dolgozóknak?",
            a: "Igen, a védőfelszereléseket a munkáltatónak <strong>ingyen kell biztosítania</strong> a munkavállalók számára. Az eszközök költségét nem lehet levonni a dolgozó béréből, és nem lehet elvárni, hogy saját pénzen vásárolja meg. Ez a munkáltató alapvető kötelezettsége."
          },
          {
            q: "Mi számít egyéni védőeszköznek?",
            a: "Egyéni védőeszköznek számít minden olyan eszköz, amelyet a dolgozó <strong>saját védelme érdekében visel vagy használ.</strong> Például: sisak, védőszemüveg, kesztyű, fülvédő, légzésvédő, láthatósági mellény. A lényeg, hogy az adott munkakör veszélyeinek megfelelő védelmet biztosítson."
          },
          {
            q: "Kell-e munkaruhát adni minden dolgozónak?",
            a: "Nem minden esetben kötelező. <strong>Munkaruhát akkor kell biztosítani,</strong> ha a munkavégzés során a dolgozó ruhája elszennyeződik, sérülhet, vagy a munka jellege miatt egységes megjelenés szükséges. Egyszerű irodai munkánál nem, de élelmiszeriparban vagy ipari területen kötelező."
          },
          {
            q: "Ki felel a védőeszközök állapotáért?",
            a: "A védőeszközök állapotáért <strong>elsődlegesen a munkáltató felel,</strong> hiszen neki kell biztosítania, hogy azok megfelelőek és biztonságosak legyenek. A munkavállaló kötelessége az eszközök rendeltetésszerű használata, és jeleznie kell, ha azok megsérülnek vagy elhasználódnak."
          },
          {
            q: "Hogyan kell nyilvántartani a védőfelszerelések kiadását?",
            a: "A védőfelszerelések kiadását <strong>írásban kell dokumentálni,</strong> általában védőeszköz-átadási jegyzőkönyvben vagy nyilvántartásban. Ebben szerepelnie kell, hogy ki, mikor, milyen eszközt kapott, és az aláírásával igazolja az átvételt. Ez az ellenőrzéskor is bizonyíték."
          },
          {
            q: "Mi a teendő munkabaleset esetén?",
            a: "Munkabalesetkor az első lépés az <strong>életmentés és elsősegélynyújtás.</strong> Ezt követően a munkáltatónak azonnal intézkednie kell a veszélyhelyzet megszüntetéséről, a baleset kivizsgálásáról és jegyzőkönyv felvételéről. A súlyos baleseteket kötelező bejelenteni a hatóságnak."
          },
          {
            q: "Hogyan kell kivizsgálni egy munkahelyi balesetet?",
            a: "A balesetet a munkáltató köteles kivizsgálni. Ez magában foglalja a <strong>körülmények felderítését, a tanúk meghallgatását, a dokumentáció elkészítését és a megelőző intézkedések meghatározását.</strong> A kivizsgálás célja, hogy a hasonló balesetek megelőzhetők legyenek."
          },
          {
            q: "Ki köteles bejelenteni a munkabalesetet?",
            a: "A munkabalesetet a <strong>munkáltatónak kell bejelentenie</strong> a hatóság felé, ha súlyos vagy halálos balesetről van szó. A dolgozó feladata, hogy azonnal jelezze a balesetet a felettesének, aki intézkedik a továbbiakról."
          },
          {
            q: "Mit tartalmaz a munkabaleseti jegyzőkönyv?",
            a: "A munkabaleseti jegyzőkönyv tartalmazza a <strong>baleset időpontját, helyszínét, a sérült adatait, a baleset leírását, a tanúk nyilatkozatait és a kivizsgálás megállapításait.</strong> Rögzíteni kell a felelősséget és a megtett intézkedéseket is."
          },
          {
            q: "Kell-e jegyzőkönyv kisebb balesetekről is?",
            a: "Igen, minden munkabalesetről kötelező jegyzőkönyvet készíteni, <strong>akkor is, ha kisebb sérülés történt</strong> (pl. vágás, horzsolás). Ennek célja, hogy nyoma legyen az eseménynek, és szükség esetén jogi vagy biztosítási eljárásban felhasználható legyen."
          },
          {
            q: "Ki fizeti a dolgozó táppénzét baleset esetén?",
            a: "Munkabalesetnél a dolgozó <strong>100%-os táppénzre jogosult,</strong> amit a társadalombiztosítás (TB) fedez. A munkáltatónak nincs külön kötelezettsége a táppénz kifizetésére, de a baleseti jegyzőkönyv és bejelentés elengedhetetlen a jogosultsághoz."
          },
          {
            q: "Mi a különbség a munkabaleset és az üzemi baleset között?",
            a: "A munkabaleset a munkahelyen vagy munkavégzés közben történik. Az <strong>üzemi baleset fogalma tágabb:</strong> ide tartozik a munkába járás közben bekövetkező baleset is. Tehát minden munkabaleset üzemi baleset is, de nem minden üzemi baleset számít munkabalesetnek."
          },
          {
            q: "Mit vizsgál a munkavédelmi hatóság egy ellenőrzés során?",
            a: "A hatóság ellenőrzi a <strong>munkavédelmi szabályzatok, kockázatértékelést, oktatási dokumentációt, orvosi alkalmassági vizsgálatokat és a védőfelszerelések meglétét.</strong> Emellett helyszíni szemlét tartanak, vizsgálják a munkaeszközök állapotát és a munkavállalók biztonsági feltételeit."
          },
          {
            q: "Milyen dokumentumokat kell bemutatni ellenőrzéskor?",
            a: "Kötelező bemutatni a <strong>munkavédelmi szabályzatot, kockázatértékelést, oktatási naplót, munkabaleseti jegyzőkönyveket, orvosi alkalmassági igazolásokat, védőeszköz nyilvántartást.</strong> Ha ezek hiányoznak, a hatóság bírságot szabhat ki, ezért fontos a naprakész dokumentáció."
          },
          {
            q: "Mennyi ideig tart egy munkavédelmi ellenőrzés?",
            a: "Az ellenőrzés időtartama a cég méretétől és tevékenységétől függ. Egy kisebb irodánál <strong>akár 1–2 óra alatt lezajlik,</strong> míg egy nagyobb termelő üzemnél több napot is igénybe vehet. A hatóság a dokumentumok és a helyszíni körülmények alapján dolgozik."
          },
          {
            q: "Van-e lehetőség figyelmeztetésre bírság helyett?",
            a: "Igen, bizonyos esetekben a hatóság <strong>először figyelmeztetést ad</strong> és határidőt szab a hiányosságok pótlására. Ha azonban súlyos vagy életveszélyes mulasztás történik, azonnali bírságot szabhatnak ki, amelynek mértéke több százezer forint is lehet."
          },
          {
            q: "Hogyan készülhetek fel egy munkavédelmi ellenőrzésre?",
            a: "A legfontosabb a <strong>naprakész dokumentáció, érvényes kockázatértékelés, oktatási jegyzőkönyvek és orvosi vizsgálatok megléte.</strong> Ellenőrizd a védőeszközök állapotát, a menekülési útvonalakat, és tarts egy belső ellenőrzést, így a hatósági vizsgálat során nem érhet meglepetés."
          }
          
          
          
          
          
          
           
        ]
    },
    { 
        category: "HACCP",
        icon: FaUtensils,
        questions: [
          {
            q : "Mi az a HACCP és miért kötelező minden vendéglátó egységben?",
            a : "A <strong>  HACCP (Veszélyelemzés és Kritikus Szabályozási Pontok rendszere) </strong> egy élelmiszerbiztonsági előírás, amely a szennyeződések és ételmérgezések megelőzését szolgálja. Minden vendéglátó egységnek kötelező, mert a fogyasztók egészségét védi, és a hatóság (NÉBIH) ellenőrzi a meglétét."
          },
          {
            q : "Mely jogszabály írja elő a HACCP rendszer meglétét?",
            a : "A HACCP-t az <strong>852/2004/EK rendelet</strong> és a hozzá kapcsolódó magyar élelmiszerbiztonsági jogszabályok írják elő. Ezek kimondják, hogy minden élelmiszert előállító vagy forgalmazó vállalkozás köteles a rendszert működtetni és dokumentálni. Ez tehát <strong>nem választható, </strong>hanem kötelező."
          },
          {
            q : "Kinek a felelőssége a HACCP működtetése a cégnél?",
            a : "A HACCP betartásáért mindig a <strong>vállalkozás vezetője (ügyvezető, üzletvezető)</strong> felel. Kijelölhet felelős személyt, de jogilag ő vonható felelősségre. Ezért fontos, hogy a dokumentáció naprakész legyen, és a dolgozók ismerjék az előírt szabályokat."
          },
          { 
            q : "Kell-e HACCP dokumentáció egy kisebb büfének vagy kávézónak?",
            a : "Igen, <strong> minden vendéglátó egységnek kötelező</strong> a HACCP, függetlenül a mérettől. Egy kisebb büfé vagy kávézó esetében egyszerűsített dokumentáció is elegendő lehet, de teljesen mellőzni nem lehet. Az ellenőrzésen a NÉBIH ezt ugyanúgy számon kéri."
          },
          { 
            q : "Mi történik, ha nincs HACCP a vállalkozásnál?",
            a : "Ha egy vállalkozás nem rendelkezik HACCP dokumentációval, a hatóság <strong>bírságot szab ki,</strong> súlyos esetben akár a működést is felfüggesztheti. A bírság mértéke több százezer forint is lehet, ezért mindig jobb előre gondoskodni a szabályos dokumentumról."
          },
          {
            q : "Mi a különbség a HACCP és a GHP között?",
            a : "A <strong>GHP (Helyes Higiéniai Gyakorlat)</strong> az alapvető tisztasági és higiéniai előírásokat tartalmazza. A <strong>HACCP </strong>ehhez képest egy kockázatelemző rendszer, amely konkrét veszélyeket és kritikus pontokat jelöl ki. A GHP az alap, a HACCP pedig a rendszer erre épülve."
          },
          {
            q : "Mennyi ideig érvényes a HACCP dokumentáció?",
            a : "A HACCP dokumentáció addig érvényes, amíg a vállalkozás tevékenysége és működése nem változik. Ha új technológia, új termék vagy nagyobb átalakítás történik, a dokumentációt <strong>frissíteni kell. </strong>Általában ajánlott <strong>évente átnézni.</strong>"
          },
          {
            q : "Milyen gyakran kell felülvizsgálni a HACCP-t?",
            a :"A HACCP rendszer felülvizsgálata <strong> évente egyszer kötelező,</strong> vagy minden olyan változásnál, ami az élelmiszerbiztonságot érinti. Például új étel felvétele a kínálatba, új előkészítő helyiség nyitása, vagy technológiai változtatás."
          },
          {
            q : "Ki készítheti el a HACCP rendszert?",
            a : "A HACCP dokumentációt elkészítheti <strong>szakértő tanácsadó, </strong> vagy olyan személy, aki megfelelő tapasztalattal rendelkezik élelmiszerbiztonság terén. A vezető felelőssége viszont akkor is megmarad. A sablonok önmagukban nem elegendőek, mindig a cégre kell szabni."
          },
          { 
            q : "Milyen költségei lehetnek a HACCP bevezetésének?",
            a : "A költségek nagysága a cég méretétől és tevékenységétől függ. Egy kisebb büfé esetében a dokumentáció ára <strong>pár tízezer forint</strong> míg egy nagy étterem vagy élelmiszerüzem esetében ennek sokszorosa lehet. A bírságnál azonban mindig <strong> olcsóbb megelőzni. </strong>"
          },
          {
            q : " Milyen dokumentumokat kell tartalmaznia egy HACCP-nek?",
            a : "Egy HACCP-ben szerepelnie kell a <strong>veszélyelemzésnek, a kritikus pontok meghatározásának, a folyamatábráknak, az ellenőrzési és naplózási rendszernek</strong>  (pl. hőmérsékletnapló, áruátvétel, takarítás). Ezek mellett a felelősök kijelölése és a szükséges intézkedési tervek is fontos részei."
          },
          { 
            q : "Kötelező-e vezetni áruátvételi naplót?",
            a : "Igen, <strong>kötelező.</strong> Az áruátvételi naplóban rögzíteni kell a beszállító nevét, az átvétel időpontját, a termékek állapotát és a hőmérsékletet, ha az előírt. Ez bizonyítja, hogy a vállalkozás ellenőrizte az alapanyagok minőségét és megfelelőségét."
          },
          {
            q : "Hogyan kell vezetni a hűtő hőmérséklet naplót?",
            a : "A hűtők hőmérsékletét <strong>naponta legalább egyszer, mindig azonos időpontban</strong> kell rögzíteni. A naplóban fel kell tüntetni a dátumot, a mért értéket és az aláírást. Ha eltérés tapasztalható, a szükséges intézkedést is dokumentálni kell."
          },
          {
            q : "Kell-e takarítási napló a HACCP-ben?",
            a : "Igen, a takarítási napló kötelező része a HACCP-nek. Ebben kell rögzíteni a <strong> akarítás dátumát, a helyiséget, az elvégzett feladatokat és a felelős személy nevét. </strong> Ez igazolja, hogy a higiéniai előírásokat rendszeresen betartják."
          },
          { 
            q : "Mit kell dokumentálni a kártevőirtással kapcsolatban?",
            a : "A kártevőirtási naplóban fel kell tüntetni az <strong>alkalmazott módszert, a felhasznált szereket, az ellenőrzés időpontját és az irtást végző személy adatait.</strong> Szerződés is kell egy hivatalos irtócéggel, és minden beavatkozásról jegyzőkönyvet kell vezetni."
          },
          { 
            q : "Hogyan kell vezetni az oktatási naplót?",
            a : "Az oktatási naplóban rögzíteni kell az <strong> oktatás dátumát, témáját, a résztvevők nevét és aláírását.</strong> Ez bizonyítja, hogy a dolgozók ismerik a higiéniai és élelmiszerbiztonsági előírásokat. Oktatást új dolgozó belépésekor és évente ismételni kell."
          },
          {
            q : "Mennyi ideig kell megőrizni a HACCP naplókat?",
            a : "A naplókat legalább <strong> 2 évig meg kell őrizni, </strong> de egyes dokumentumoknál (pl. veszélyes anyagok, kártevőirtás) hosszabb megőrzés is előírt lehet. A hatósági ellenőrzés során mindig a legutóbbi időszak naplóit kérik be először."
          },
          {
            q : "Mi történik, ha hiányosan van vezetve a dokumentáció?",
            a : "Ha a naplók hiányosak, a hatóság <strong> hiányosságot állapít meg </strong>és felszólít a pótlásra. Ismételt ellenőrzéskor bírság is lehet, amely akár több százezer forint. A naplók pontos vezetése tehát a cég jogi és anyagi biztonságát is védi."
          },
          {
            q : "Kell-e külön napló a használt étolaj elszállításáról?",
            a : "Igen, a használt étolaj elszállítását dokumentálni kell. A szerződés és a szállítólevelek bizonyítják, hogy a vállalkozás szabályosan kezeli a veszélyes hulladékot. Ez általában külön <strong> olajnyilvántartási naplóban</strong> szerepel."
          },
          { 
            q : "Hogyan kell rögzíteni az ételminta eltevését?",
            a : "Ha egy ételből 29 adagnál több készül, <strong>kötelező ételmintát eltenni.</strong> A naplóban fel kell tüntetni az étel nevét, a dátumot, a mintavétel időpontját, a mennyiséget és az aláírást. A mintát <strong> 72 óráig -18 °C-on</strong> kell tárolni."
          },
          {
            q : "Mikor kell folyamatábrát készíteni a HACCP-hez?",
            a : "Folyamatábrát kell készíteni minden olyan tevékenységhez, ahol <strong> élelmiszer előállítás, feldolgozás vagy kezelés történik.</strong> A folyamatábra a teljes technológiai sort mutatja, az áruátvételtől a tálalásig. Ez segít azonosítani a kritikus pontokat, ahol veszély léphet fel."
          },
          {
            q : "Milyen folyamatokra kötelező folyamatábrát készíteni?",
            a : "Kötelező ábrázolni az <strong>áruátvételt, tárolást, előkészítést, ételkészítést, hőkezelést, hűtést, tálalást és kiszállítást.</strong> Minden folyamatot úgy kell bemutatni, hogy látszódjon a termék útja, és meg lehessen határozni a veszélyeket, CCP-ket."
          },
          {
            q : "Kell-e külön folyamatábra a kiszállításhoz?",
            a : "Igen, ha az egység végez kiszállítást, akkor <strong> külön folyamatábra szükséges a szállítási lépésekhez. </strong>  Ebben szerepelnie kell a csomagolásnak, a szállító jármű hőmérsékletének és a kiszállítás módjának (pl. saját autó, Wolt, Foodora)."
          },
          { 
            q : "Hogyan kell ábrázolni a raktározási folyamatot?",
            a : "A raktározás folyamatát <strong>külön dobozban, nyilakkal kapcsolva</strong> kell feltüntetni. Fontos jelezni a hőmérsékleti előírásokat (pl. +2–5 °C, -18 °C), a polcok elkülönítését, valamint a FIFO-elvet („first in – first out”), amely a lejárati idők figyelését biztosítja."
          },
          {
            q : "Miért fontos a termékek nyomon követhetősége a HACCP-ben?",
            a : "A nyomon követhetőség lehetővé teszi, hogy <strong> egy alapanyag vagy késztermék útja teljesen visszakövethető legyen. </strong>Ha probléma merül fel (pl. fertőzés, lejárt termék), így azonnal azonosítható, melyik szállítmány vagy tétel érintett, és visszahívás indítható."
          },
          {
            q : "Mi a teendő, ha visszahívás történik egy alapanyagra?",
            a : "Visszahívás esetén a vállalkozásnak<strong> azonnal ki kell vonnia a forgalomból vagy a raktárból az érintett alapanyagot, </strong>dokumentálni a folyamatot, és értesíteni a beszállítót. A HACCP-ben külön eljárásleírás szükséges a visszahívások kezelésére."
          },
          {
            q : "Hogyan kell kezelni a keresztszennyeződés veszélyét?",
            a : "A keresztszennyeződés elkerüléséhez biztosítani kell az <strong> elkülönített tárolást, külön vágódeszkákat és eszközöket, valamint a dolgozók higiéniai szabályainak betartását.</strong> A takarítási és fertőtlenítési rend is fontos eszköz a szennyeződések megelőzésében."
          },
          {
            q : "Kell-e külön szabály a nyers hús és a késztermék kezelésére?",
            a : "Igen, a HACCP-ben mindig szerepelnie kell annak, hogy a <strong>nyers hús és a késztermék kezelése teljesen elkülönítve történik.</strong> Ez külön hűtőt, elkülönített eszközöket és munkafolyamatokat jelent, a keresztszennyeződés megelőzése érdekében."
          },
          {
            q : "Hogyan kell szabályozni a tojás felhasználását?",
            a : "A tojás nagy kockázatú alapanyag, ezért a HACCP-ben meg kell határozni a <strong>elhasználás módját.</strong> Fertőtlenített tojást vagy tojáslevet ajánlott használni, nyers tojásos ételek (pl. majonéz) esetén külön szabályozás szükséges, mert Salmonella veszély áll fenn."
          },
          {
            q : "Mik a legfontosabb higiéniai szabályok a konyhában?",
            a : "A dolgozóknak <strong>rendszeresen kezet kell mosniuk, </strong>tiszta munkaruhát kell viselniük, tilos ékszert hordaniuk, és csak egészséges állapotban dolgozhatnak. Az eszközöket tisztán kell tartani, a takarítási ütemtervet be kell tartani, és mindig kerülni kell a keresztszennyeződést."
          },
          {
            q : "Kell-e szerződés rágcsáló- és rovarirtó céggel?",
            a : "Igen, minden vendéglátó egységnek kötelező <strong>szerződést kötnie egy engedéllyel rendelkező kártevőirtó céggel. </strong>Ez biztosítja a folyamatos megelőzést, a csapdák karbantartását és az éves irtási tervet. A szerződés meglétét a NÉBIH ellenőrzi."
          },
          {
            q : "Mit vizsgál a NÉBIH a kártevőirtás kapcsán?",
            a : "A NÉBIH ellenőrzi, hogy van-e  <strong> érvényes kártevőirtási szerződés, dokumentált irtási napló, kihelyezett csapdák térképe,</strong> és azok folyamatosan karban vannak-e tartva. A vizsgálat célja, hogy az egységben ne fordulhasson elő rágcsáló vagy rovar."
          },
          {
            q : "Hogyan kell dokumentálni a rovarirtást?",
            a : "Az irtást végző cég minden alkalommal <strong> jegyzőkönyvet állít ki,</strong> amelyben szerepel a dátum, a használt szerek, a kihelyezett csapdák helyei és az eredmény. Ezeket a jegyzőkönyveket a HACCP dokumentációhoz kell csatolni és megőrizni."
          },
          {
            q : "Mit kell biztosítani a személyi higiénia kapcsán a dolgozóknak?",
            a : "A dolgozóknak biztosítani kell <strong> mosdót, kézmosót, szappant, fertőtlenítőt, papírtörlőt és tiszta munkaruhát. </strong>Emellett szükséges az egészségügyi alkalmassági vizsgálat, és kötelező a rendszeres higiéniai oktatás a helyes kézmosásról, öltözködésről és munkavégzésről."
          },
          {
            q : "Kötelező-e külön öltöző és mosdó a dolgozóknak?",
            a : "A jogszabály előírja, hogy a dolgozóknak <strong>külön öltöző és mosdóhelyiség</strong>  álljon rendelkezésre. Kisebb egységeknél, ahol ez nem megoldható, befogadó nyilatkozat vagy közös használatú helyiség is elfogadott, de mindenképp dokumentálni kell."
          },
          {
            q : "Hogyan kell elhelyezni a kézmosókat a HACCP szerint?",
            a : "A kézmosókat úgy kell elhelyezni, hogy <strong>minden előkészítő és konyhai területen közvetlenül hozzáférhetők legyenek</strong> A kézmosónál mindig legyen folyékony szappan, fertőtlenítőszer és egyszer használatos papírtörlő. Lábpedálos vagy szenzoros működtetés előnyös."
          },
          {
            q : "Milyen fertőtlenítőszereket kell használni?",
            a : "Csak olyan <strong> élelmiszeriparban engedélyezett tisztító- és fertőtlenítőszereket </strong> szabad használni, amelyek rendelkeznek hatósági engedéllyel. Fontos, hogy a felhasználási koncentrációt és behatási időt mindig betartsák, és ezekről dokumentációt vezessenek."
          },
          {
            q : "Hogyan kell nyilvántartani a tisztítószereket?",
            a : "A tisztítószerekről <strong>anyagbiztonsági adatlapot kell tartani, </strong>és nyilván kell tartani a felhasználásukat. A takarítási naplóban rögzíteni kell, hogy mikor, milyen helyiséget takarítottak, milyen szerrel és ki végezte a munkát."
          },
          {
            q : "Kötelező-e allergén kezelési szabályzat?",
            a : "Igen, az EU rendeletek alapján minden vendéglátó egységnek kötelező <strong>allergén információt adnia a vendégeknek.</strong> Ezért a HACCP részeként allergén kezelési szabályzatot kell készíteni, amely bemutatja, hogyan kezelik és jelölik az allergéneket."
          },
          {
            q : "Hogyan kell eljárni ételallergiás vendég esetén?",
            a : "Ételallergiás vendég esetén a dolgozónak <strong>tájékoztatnia kell a vendéget az allergén összetevőkről</strong>, és biztosítani a keresztszennyeződés elkerülését. Ha nem garantálható a teljes biztonság, azt is egyértelműen jelezni kell a vendég felé."
          },
          {
            q : "Mit vizsgál a NÉBIH egy HACCP ellenőrzés során?",
            a : "A NÉBIH ellenőrzi a <strong>HACCP dokumentáció meglétét, naplók vezetését, higiéniai szabályok betartását, kártevőirtási jegyzőkönyveket és a dolgozók oktatását.</strong> Emellett a helyszínen megnézik, hogy a gyakorlatban is a leírtak szerint működik-e az egység."
          },
          {
            q : "Mennyi ideig tart egy HACCP ellenőrzés?",
            a : "Az ellenőrzés időtartama a vendéglátóhely méretétől függ: egy kis büfében <strong>1–2 óra alatt lezajlik,</strong> míg egy nagy étteremben akár fél napig is tarthat. A folyamat részletes: dokumentumellenőrzés, helyszíni bejárás és dolgozók kikérdezése."
          },
          {
            q : "Mi történik, ha hiányosságot talál az ellenőrzésen a hatóság?",
            a : "Ha a NÉBIH kisebb hiányosságot talál, általában <strong>felszólítást ad a javításra</strong>  és határidőt szab. Súlyosabb esetben <strong>  bírság, ideiglenes bezárás</strong> vagy az élelmiszer-forgalmazás korlátozása is lehetséges. Minden hiányosságot dokumentálnak."
          },
          { 
            q : "Mekkora bírságot szabhat ki a NÉBIH HACCP hiányosságért?",
            a : "A bírság mértéke függ a hiányosság súlyától: kisebb hibák esetén néhány tízezer forint, komoly szabálytalanságoknál <strong>több százezer vagy akár milliós nagyságrendű bírság</strong>  is lehet. Ismételt hiányosság esetén a szankciók súlyosbodnak."
          },
          {
            q : "Mikor kell új HACCP dokumentációt készíteni?",
            a : "Új HACCP dokumentáció szükséges <strong> telephelyváltáskor, profilbővítéskor, nagyobb átalakítás után vagy új technológia bevezetésekor</strong> Ha jelentősen megváltozik az ételkínálat, az alapanyagok vagy a munkafolyamat, akkor is kötelező az aktualizálás."
          },
          {
             q : "Kell-e külön HACCP minden telephelyre?",
             a : "Igen, minden telephelyre <strong>külön HACCP dokumentáció szükséges,</strong> mert az eltérő helyszínek más-más kockázatokat és technológiákat tartalmazhatnak. Nem elegendő egyetlen központi dokumentum, a NÉBIH telephelyenként ellenőrzi a rendszert."
          },
          {
            q : "Elfogadja-e a hatóság a sablon HACCP-t?",
            a : "A NÉBIH nem fogadja el a <strong>módosítás nélküli sablon HACCP-t. </strong> A sablon csak kiindulópont lehet, de minden dokumentációt <strong> az adott cégre, telephelyre és tevékenységre kell testre szabni.</strong> Ha sablon marad, az hiányosságnak számít."
          },
          {
            q : "Mi a leggyakoribb hiba, amiért bírságot kapnak a vendéglátósok?",
            a : "A leggyakoribb hibák: <strong>hiányos naplóvezetés, lejárt engedélyek, elavult HACCP dokumentáció, nem megfelelő hőmérséklet-nyilvántartás, hiányzó ételminták és nem dokumentált oktatás. </strong> Ezek jellemzően könnyen javíthatók, de bírsághoz vezethetnek."
          },
          {
            q : "Hogyan tudok felkészülni egy HACCP ellenőrzésre?",
            a : "Felkészüléshez: ellenőrizd a <strong> naplók (hűtő, áruátvétel, takarítás) vezetését, kártevőirtási szerződést, oktatási jegyzőkönyveket és az ételminta eltételt. </strong> A dolgozókat érdemes átismételtetni a higiéniai szabályokkal, mert az ellenőr kérdezheti őket."
          },
          {
            q : "Milyen előnyei vannak a jól működő HACCP rendszernek?",
            a : "Egy jól működő HACCP nemcsak a hatósági megfelelést segíti, hanem <strong> biztonságosabbá teszi az élelmiszereket, megelőzi az ételfertőzéseket, csökkenti a kockázatokat és erősíti a vendégek bizalmát. </strong>Emellett jogilag is védelmet nyújt a cégnek."
          },
          {
            q : "Mennyi idő alatt lehet elkészíteni egy HACCP dokumentációt?",
            a : "A HACCP dokumentáció elkészítése általában <strong> 1–2 hét</strong> alatt megoldható, ha minden szükséges információ rendelkezésre áll. A pontos idő függ a vállalkozás méretétől és tevékenységétől. Fontos, hogy a dokumentum <strong> személyre szabott legyen,</strong> ne csak sablon."
          },
          {
            q : "Minden változást (pl. új étel, új gép) be kell írni a HACCP-be?",
            a : "Igen. Ha új étel, technológia vagy gép kerül bevezetésre, azt <strong>módosítani kell a HACCP-ben. </strong> Az ellenőrzéskor vizsgálják, hogy a dokumentáció naprakész-e. A változások átvezetése a jogszabály szerint kötelező."
          },
          {
            q : "Kell HACCP, ha csak italokat árusítok?",
            a : "Igen, minden élelmiszerrel kapcsolatos tevékenységhez kell HACCP, még ha csak kávét, üdítőt vagy alkoholt árulsz is. Ebben az esetben a dokumentáció <strong>egyszerűbb,</strong> de az alapvető higiéniai szabályokat és ellenőrzéseket tartalmaznia kell."
          },
          {
            q : "Mi a különbség a HACCP és az ISO 22000 között?",
            a : "A <strong>HACCP</strong> jogszabályban előírt kötelező rendszer az élelmiszerbiztonságra. Az <strong> ISO 22000 </strong> egy nemzetközi szabvány, amely a HACCP elveire épül, de sokkal részletesebb, és <strong> minőségirányítási rendszerként </strong> működik. ISO csak akkor kell, ha a partnerek vagy piac igényli. "
          },
          {
            q : "Melyik hatóság ellenőrzi a HACCP meglétét?",
            a : "Magyarországon a <strong> NÉBIH </strong> (Nemzeti Élelmiszerlánc-biztonsági Hivatal) és a helyi <strong> járási hivatalok </strong> ellenőrzik a HACCP meglétét és betartását. Az ellenőrzések előzetes bejelentés nélkül is történhetnek."
          },
          {
            q : "Kötelező-e a HACCP-t a dolgozóknak ismerni?",
            a : "Igen. A dolgozóknak <strong> meg kell ismerniük </strong> a HACCP alapvető szabályait, különösen a higiéniai és biztonsági előírásokat. Az oktatásról naplót kell vezetni. Ha a dolgozó nem ismeri a szabályokat, a felelősség a munkáltatót terheli."
          },
          {
            q : "Hogyan kell kezelni a hűtő meghibásodását a HACCP szerint?",
            a : "Ha a hűtő meghibásodik, azonnal rögzíteni kell a hibát a naplóban, és intézkedni kell az élelmiszerek <strong>biztonságos áthelyezéséről.</strong> A hőmérsékleti eltérés kockázatot jelenthet, ezért a HACCP előírja a <strong>vészhelyzeti eljárás</strong> meglétét."
          },
          {
            q : "Kell külön HACCP a kitelepülésekre (pl. fesztivál, rendezvény)?",
            a : "Nem kell külön teljes HACCP, de a meglévő rendszerben szerepeltetni kell a kitelepülést mint <strong>külön tevékenységet. </strong>Ez azt jelenti, hogy a veszélyelemzésben és a folyamatábrában is meg kell jelenjen a kiszállítás és a helyszíni értékesítés."
          },
          {
            q : "Elég egy sablon HACCP, vagy személyre kell szabni?",
            a : "A hatóság nem fogadja el a sima sablont. A HACCP-nek mindig <strong> személyre szabottan, </strong>az adott vállalkozásra kell vonatkoznia. A sablon jó kiindulópont, de ki kell egészíteni a <strong>cég telephelyére, termékeire és folyamataira</strong>  vonatkozó adatokkal."
          },
          {
            q : "Milyen dokumentumokat kell a helyszínen tartani HACCP ellenőrzéskor?",
            a : "Az ellenőrzéskor kérhetik a teljes HACCP dokumentációt, valamint a <strong>naplókat</strong> (áruátvételi, hőmérséklet, takarítás, kártevőirtás, oktatás). Ezeket mindig <strong>naprakészen </strong> kell vezetni, mert hiányosság esetén bírságot szabhatnak ki."
          }
        ]
    },
];

// --- ANIMÁCIÓS VARIANSOK ---
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0, transition: { duration: 0.6, staggerChildren: 0.15, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } } // Kilépési animáció hozzáadva
};

const itemVariants = {
  initial: { opacity: 0, y: 30 },
  in: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const fadeAndSlideIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.3, ease: 'easeOut' } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2, ease: 'easeIn' } },
};


// --- ALKOMPONENS: FaqItem ---
const FaqItem = ({ item, isOpen, onClick }: { item: FaqItemData; isOpen: boolean; onClick: () => void }) => {
  return (
    <motion.div
        layout // Segít a Framer Motion-nek kezelni az elemek átrendeződését
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
        className="bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 mb-5 overflow-hidden border border-gray-100"
    >
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center p-5 md:p-6 text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded-2xl"
      >
        <div className="flex-1 pr-4">
            {item.category && (
                 <span className="inline-block bg-emerald-50 text-emerald-700 text-xs font-semibold mb-2 px-3 py-1 rounded-full border border-emerald-100 uppercase tracking-wide">
                    {item.category}
                </span>
            )}
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 group-hover:text-cyan-700 transition-colors leading-relaxed">
                {item.q}
            </h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center transition-colors ${isOpen ? 'bg-cyan-100 text-cyan-600' : 'bg-gray-100 text-gray-500 group-hover:bg-cyan-50 group-hover:text-cyan-500'}`}
        >
          <ChevronDownIcon className="w-5 h-5" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                className="px-5 md:px-6 pb-6 text-gray-600 text-base leading-relaxed prose max-w-none text-left"
                dangerouslySetInnerHTML={{ __html: item.a }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};


// --- FŐ KOMPONENS: GyakoriKerdesek ---
const GyakoriKerdesek = () => {
  const [activeCategory, setActiveCategory] = useState<string>(faqData[0].category);
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  
  const isSearchActive = !!searchQuery;

  const allQuestions = useMemo(() => {
    return faqData.flatMap(cat => cat.questions.map(q => ({
      ...q,
      category: cat.category,
    }))) as FaqItemData[];
  }, []);

  const displayedQuestions: FaqItemData[] = useMemo(() => {
    if (isSearchActive) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      return allQuestions.filter(q =>
        q.q.toLowerCase().includes(lowerCaseQuery) ||
        q.a.toLowerCase().includes(lowerCaseQuery) ||
        q.category?.toLowerCase().includes(lowerCaseQuery) // Keresés a kategóriában is
      );
    }
    const currentCategory = faqData.find(cat => cat.category === activeCategory);
    // Kategória nézetben a FAQItem-nek is átadjuk a kategóriát, hogy az megjelenhessen
    return currentCategory ? currentCategory.questions.map(q => ({ ...q, category: currentCategory.category })) : [];
  }, [activeCategory, searchQuery, allQuestions, isSearchActive]);
  
  const handleCategoryClick = (categoryName: string) => {
    setActiveCategory(categoryName);
    setActiveQuestion(null);
    setIsMobileNavOpen(false);
    setSearchQuery(''); // Kategóriaváltáskor töröljük a keresést
  };

  const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
    setActiveQuestion(null); // Kereséskor zárjuk be az összes kérdést
    setIsMobileNavOpen(false); // Kereséskor zárjuk be a mobil nav-ot
  }

  const handleClearSearch = () => {
    setSearchQuery('');
    setActiveQuestion(null);
  }

  const handleQuestionClick = (q: string) => setActiveQuestion(prev => (prev === q ? null : q));

  return (
    <section id="gyik" className="py-16 lg:py-24 bg-gradient-to-br from-indigo-50 to-purple-50 font-['Poppins',_sans-serif] text-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
            initial="initial"
            animate="in"
            variants={pageVariants}
        >
            <motion.div variants={itemVariants} className="text-center mb-12 lg:mb-16">
              <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 mb-5 leading-tight tracking-tight">
                Gyakran Ismételt Kérdések
              </h2>
              <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto font-light">
                Találj gyorsan választ a leggyakoribb felvetésekre munkavédelem, tűzvédelem és HACCP témákban.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:grid lg:grid-cols-12 lg:gap-10 lg:items-start">
              {/* --- Bal oldali, "sticky" kategória navigáció (Desktop) --- */}
              <aside className="hidden lg:block lg:col-span-4 xl:col-span-3">
                <div className="sticky top-28 bg-white p-6 rounded-2xl shadow-xl border border-gray-100">
                  <h3 className="text-xl font-bold text-gray-800 mb-5">Kategóriák</h3>
                  <nav className="flex flex-col space-y-3">
                    {faqData.map(category => (
                      <button
                        key={category.category}
                        onClick={() => handleCategoryClick(category.category)}
                        className={`flex items-center space-x-4 w-full text-left px-5 py-3 rounded-xl transition-all duration-300 transform group
                          ${activeCategory === category.category && !isSearchActive
                            ? 'bg-cyan-600 text-white shadow-lg font-semibold scale-105'
                            : 'text-gray-700 hover:bg-gray-50 hover:text-cyan-700 hover:scale-103'
                          }
                        `}
                      >
                        <category.icon className={`w-6 h-6 flex-shrink-0 transition-colors duration-300 
                          ${activeCategory === category.category && !isSearchActive ? 'text-white' : 'text-gray-500 group-hover:text-cyan-500'}
                        `} />
                        <span className="text-lg">{category.category}</span>
                      </button>
                    ))}
                  </nav>
                </div>
              </aside>

              {/* --- Jobb oldali tartalom: Kereső és kérdések --- */}
              <main className="lg:col-span-8 xl:col-span-9">
                <div className="mb-8">
                  <div className="relative mb-5">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={handleSearchChange}
                      placeholder="Keress a kérdések között..."
                      className="w-full pl-12 pr-10 py-3.5 rounded-full border border-gray-200 bg-white focus:outline-none focus:ring-3 focus:ring-cyan-200 focus:border-cyan-400 transition-all duration-300 shadow-sm text-gray-700 text-base"
                    />
                    <AnimatePresence>
                        {searchQuery && (
                            <motion.button
                                {...fadeAndSlideIn}
                                onClick={handleClearSearch}
                                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                                aria-label="Keresés törlése"
                            >
                                <XMarkIcon className="w-5 h-5" />
                            </motion.button>
                        )}
                    </AnimatePresence>
                  </div>

                  {/* Mobil kategóriaválasztó */}
                  <div className="lg:hidden mt-4">
                     <button
                        onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                        className="w-full flex justify-between items-center px-5 py-3.5 bg-white border border-gray-200 rounded-xl shadow-md text-gray-800 font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 transition-all duration-300"
                      >
                        <span className="text-lg">{isSearchActive ? 'Keresési találatok' : activeCategory}</span>
                        {!isSearchActive && <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${isMobileNavOpen ? 'rotate-180 text-cyan-600' : 'text-gray-500'}`} />}
                      </button>
                    <AnimatePresence>
                        {isMobileNavOpen && !isSearchActive && (
                            <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeOut' }}
                            className="mt-3 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden"
                            >
                            {faqData.map(category => (
                                <button
                                    key={category.category}
                                    onClick={() => handleCategoryClick(category.category)}
                                    className="w-full text-left px-5 py-3 flex items-center space-x-4 text-gray-700 hover:bg-gray-50 hover:text-cyan-700 transition-colors text-lg"
                                >
                                    <category.icon className="w-6 h-6 text-gray-500" />
                                    <span>{category.category}</span>
                                </button>
                            ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                  </div>
                </div>

                {/* --- Kérdések listája --- */}
                <AnimatePresence mode="wait">
                  <motion.div
                    key={isSearchActive ? 'search-results' : activeCategory}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {displayedQuestions.length > 0 ? (
                      <motion.div layout> {/* layout prop a simább átrendeződéshez */}
                        {displayedQuestions.map((item) => (
                          <FaqItem
                            key={item.q}
                            item={item}
                            isOpen={activeQuestion === item.q}
                            onClick={() => handleQuestionClick(item.q)}
                          />
                        ))}
                      </motion.div>
                    ) : (
                      <motion.div
                        key="no-results"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="text-center py-20 bg-white rounded-2xl shadow-md border border-gray-100"
                      >
                        <p className="text-gray-500 text-lg font-medium">Nincs a keresésnek megfelelő találat. Próbálj másik kifejezést!</p>
                      </motion.div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </main>
            </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default GyakoriKerdesek;






