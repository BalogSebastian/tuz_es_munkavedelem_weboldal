// components/sections/GyakoriKerdesek.tsx
'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeftIcon, 
    ChevronDownIcon,
    MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { FaFire, FaHardHat, FaUtensils } from 'react-icons/fa';

const faqData = [
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
            { q: "Miért kötelező a kockázatértékelés?", a: "Azért, mert a <strong>munkavédelmi törvények előírják</strong>. Neked, mint munkáltatónak, jogi kötelességed gondoskodni a <strong>dolgozóid</strong> biztonságáról. Ha rendben van a kockázatértékelés, nemcsak a törvényi megfelelést <strong>biztosítod</strong>, hanem <strong>csökkented a munkahelyi balesetek és megbetegedések esélyét</strong> is." },
            { q: "Minden munkavállalónak kötelező az orvosi alkalmassági vizsgálat?", a: "<strong>Igen, kötelező</strong>. Munkába állás előtt minden munkavállalónak részt kell vennie előzetes orvosi alkalmassági vizsgálaton, hogy kiderüljön, végezheti-e biztonságosan a munkáját." },
            { q: "Mikor kell orvosi vizsgálatra menni?", a: "<ul><li><strong>Munkába állás előtt:</strong> mindig kötelező.</li><li><strong>Időszakosan:</strong> a munkakör és a kockázatok alapján meghatározott időközönként (pl. évente vagy 2-3 évente).</li><li><strong>Rendkívüli esetben:</strong> ha a munkavállaló egészségi állapota megváltozik, vagy a munkakörülmények indokolják.</li></ul>" },
            { q: "Mi a teendő munkabaleset esetén?", a: "Ha munkabaleset történik, a legfontosabb, hogy <strong>azonnal gondoskodj a sérült ellátásáról</strong> – ha kell, hívj mentőt. Ezután a következőket kell megtenni:<ul><li><strong>1. Elsősegély biztosítása</strong> – ha szükséges, azonnal.</li><li><strong>2. A baleset jelentése</strong> – a sérültnek vagy a szemtanúnak jeleznie kell a közvetlen vezetőnek.</li><li><strong>3. A helyszín biztosítása</strong> – lehetőség szerint ne változtasd meg a baleset körülményeit, amíg a kivizsgálás meg nem történik.</li><li><strong>4. Baleseti jegyzőkönyv készítése</strong> – a munkáltató feladata, minden munkabalesetet ki kell vizsgálni és dokumentálni.</li><li><strong>5. Hatósági bejelentés</strong> – ha a baleset súlyos (pl. halálos, több napos munkaképtelenséget okoz), kötelező az illetékes hatóság felé is jelenteni.</li></ul>" },
            { q: "Mikortól kell egy cégnek a munkavédelem?", a: "A munkavédelem már az <strong>első munkavállaló belépésétől kezdve kötelező</strong>. Tehát ha egy cég alkalmazásban tart akár csak egy embert, onnantól gondoskodnia kell a munkavédelmi előírások betartásáról." },
            { q: "Ki kötelezi a munkavédelmet?", a: "A munkavédelmet a <strong>munkavédelmi törvény (1993. évi XCIII. törvény a munkavédelemről)</strong> írja elő. Ez a jogszabály határozza meg, milyen kötelezettségeid vannak munkáltatóként, és milyen jogai vannak a munkavállalóknak a biztonságos munkavégzéshez. A törvény betartását a <strong>munkavédelmi hatóság</strong> (jelenleg a Kormányhivatalok Munkavédelmi és Munkaügyi Ellenőrzési Osztályai) ellenőrzi. Ha hiányosságot találnak, bírságot szabhatnak ki, vagy akár le is állíthatják a munkát." },
            { q: "Ki készítheti el a kockázatértékelést?", a: "<strong>Csak olyan szakember</strong>, aki rendelkezik a megfelelő munkavédelmi végzettséggel (pl. munkavédelmi technikus, mérnök). Te saját magad nem készítheted el, ha nincs hozzá képesítésed – ez hatósági előírás." },
            { q: "Milyen gyakran kell frissíteni a kockázatértékelést?", a: "Általában <strong>3-5 évente</strong>, de ha a munkahelyen változás történik (pl. új gép, új technológia, munkabaleset), akkor <strong>azonnal frissíteni kell</strong>." },
            { q: "Mi az a Munkahelyi Szabályzat?", a: "A Munkahelyi Szabályzat (vagy más néven Munkavédelmi Szabályzat) egy belső dokumentum, ami rögzíti a cég munkavédelmi előírásait, szabályait és eljárásait. Tulajdonképpen a munkavédelmi törvény gyakorlati „fordítása” a te cégedre szabva.<ul><li><strong>a munkahelyi veszélyek és kockázatok ismertetését,</strong></li><li><strong>a védőfelszerelések használatának előírásait,</strong></li><li><strong>a munkavállalók és a munkáltató feladatait, felelősségét,</strong></li><li><strong>az oktatás, ellenőrzés és balesetkezelés rendjét.</strong></li></ul>" },
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

const pageVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
};

const itemVariants = {
  initial: { opacity: 0, y: 40 },
  in: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
};

const FaqItem = ({ q, a, isOpen, onClick }: { q: string, a: string, isOpen: boolean, onClick: () => void }) => {
  return (
    <div className="border-b border-slate-200">
      <button
        onClick={onClick}
        className="w-full flex justify-between items-center py-5 text-left group"
      >
        <span className="text-xl font-semibold text-slate-800 group-hover:text-cyan-600 transition-colors">{q}</span>
        <motion.div
          className="p-2 bg-slate-100 rounded-full group-hover:bg-cyan-100 transition-colors"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDownIcon className={`w-6 h-6 transition-colors ${isOpen ? 'text-cyan-600' : 'text-slate-500'}`} />
        </motion.div>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial="collapsed"
            animate="open"
            exit="collapsed"
            variants={{
              open: { opacity: 1, height: 'auto', transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] } },
              collapsed: { opacity: 0, height: 0, transition: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] } },
            }}
            className="overflow-hidden"
          >
            <motion.div
              variants={itemVariants}
              className="text-lg text-slate-600 pb-5"
            >
              <div dangerouslySetInnerHTML={{ __html: a }} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const GyakoriKerdesek = () => {
  const [activeCategory, setActiveCategory] = useState<string>('Tűzvédelem');
  const [activeQuestion, setActiveQuestion] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);

  const displayedQuestions = useMemo(() => {
    if (searchQuery) {
      const allQuestions = faqData.flatMap(cat => cat.questions.map(q => ({
        ...q,
        category: cat.category
      })));
      return allQuestions.filter(q => 
        q.q.toLowerCase().includes(searchQuery.toLowerCase()) || 
        q.a.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    const currentCategory = faqData.find(cat => cat.category === activeCategory);
    return currentCategory ? currentCategory.questions : [];
  }, [activeCategory, searchQuery]);

  const handleCategoryClick = (categoryName: string) => {
      setActiveCategory(categoryName);
      setActiveQuestion(null);
      setIsMobileNavOpen(false);
      setSearchQuery('');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const query = event.target.value;
      setSearchQuery(query);
      if (query) {
          setIsSearchActive(true);
      } else {
          setIsSearchActive(false);
      }
      setActiveQuestion(null);
      setActiveCategory(faqData[0].category);
  };

  const handleBackToCategories = () => {
      setIsSearchActive(false);
      setSearchQuery('');
      setActiveQuestion(null);
  };

  const handleQuestionClick = (q: string) => {
      setActiveQuestion(activeQuestion === q ? null : q);
  };

  return (
    <section id="gyik" className="relative py-12 md:py-24 bg-slate-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <motion.div
          initial="initial"
          animate="in"
          variants={pageVariants}
          className="max-w-7xl mx-auto"
        >
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4"
              variants={itemVariants}
            >
              Gyakran Ismételt Kérdések
            </motion.h2>
            <motion.p 
              className="text-lg text-slate-600 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Összegyűjtöttük a leggyakrabban felmerülő kérdéseket és válaszokat, hogy segítsünk eligazodni a tűzvédelem, munkavédelem és HACCP világában.
            </motion.p>
          </div>

          <motion.div 
            className="relative mb-8"
            variants={itemVariants}
          >
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Keresés..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 transition-colors shadow-sm"
              />
            </div>
            {isSearchActive && (
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    onClick={handleBackToCategories}
                    className="mt-4 flex items-center text-sm text-cyan-600 hover:text-cyan-800 transition-colors"
                >
                    <ArrowLeftIcon className="w-4 h-4 mr-1" /> Vissza a kategóriákhoz
                </motion.button>
            )}
          </motion.div>

          {!isSearchActive && (
            <motion.div
              className="mb-8"
              variants={itemVariants}
            >
              <nav className="hidden lg:flex justify-center space-x-4 p-2 bg-white rounded-full shadow-lg">
                {faqData.map(category => (
                  <button
                    key={category.category}
                    onClick={() => handleCategoryClick(category.category)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300
                      ${activeCategory === category.category 
                        ? 'bg-gradient-to-r from-cyan-500 to-teal-400 text-white shadow-lg transform scale-105' 
                        : 'text-slate-700 hover:bg-slate-100 hover:text-cyan-600'
                      }
                    `}
                  >
                    <category.icon className="w-5 h-5" />
                    <span className="font-semibold">{category.category}</span>
                  </button>
                ))}
              </nav>

              <div className="lg:hidden">
                <button
                  onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                  className="w-full flex justify-between items-center px-4 py-3 bg-white border border-slate-200 rounded-xl shadow-sm text-slate-700"
                >
                  <span className="font-semibold">{activeCategory}</span>
                  <ChevronDownIcon className={`w-5 h-5 transition-transform ${isMobileNavOpen ? 'transform rotate-180' : ''}`} />
                </button>
                <AnimatePresence>
                  {isMobileNavOpen && (
                    <motion.nav
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-2 bg-white border border-slate-200 rounded-xl shadow-lg"
                    >
                      {faqData.map(category => (
                        <button
                          key={category.category}
                          onClick={() => handleCategoryClick(category.category)}
                          className="w-full text-left px-4 py-3 text-slate-700 hover:bg-slate-100 transition-colors rounded-xl"
                        >
                          <span className="font-semibold">{category.category}</span>
                        </button>
                      ))}
                    </motion.nav>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          <div className="bg-white rounded-3xl shadow-xl p-6 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={isSearchActive ? 'search-results' : activeCategory}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {displayedQuestions.length > 0 ? (
                  displayedQuestions.map((item, index) => (
                    <FaqItem
                      key={index}
                      q={item.q}
                      a={item.a}
                      isOpen={activeQuestion === item.q}
                      onClick={() => handleQuestionClick(item.q)}
                    />
                  ))
                ) : (
                  <div className="text-center py-10 text-slate-500">
                    <p>Nincs találat a keresési feltételeknek megfelelően.</p>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default GyakoriKerdesek;