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
            { q: "Kötelező a HACCP minden cégnek?", a: "<strong>Igen</strong>, minden olyan vállalkozásnak, ami élelmiszerrel foglalkozik (pl. étterem, pékség, büfé, kávézó, élelmiszerbolt), rendelkeznie kell HACCP-vel. Ez jogszabályi előírás az EU-ban és Magyarországon is." },
            { q: "Mit tartalmaz egy HACCP dokumentáció?", a: "<ul><li><strong>a technológiai folyamatok leírását,</strong></li><li><strong>a lehetséges veszélyek elemzését,</strong></li><li><strong>a kritikus ellenőrzési pontokat</strong> (pl. hőmérséklet, tisztaság),</li><li><strong>az ellenőrzési módszereket és felelősöket,</strong></li><li><strong>a naplózás és nyomonkövetés módját.</strong></li></ul>" },
            { q: "Milyen előnye van a HACCP-nek a cégem számára?", a: "<ul><li><strong>Biztonságosabb élelmiszert</strong> tudsz előállítani és forgalmazni.</li><li>Elkerülheted a <strong>hatósági bírságokat és bezárást</strong>.</li><li><strong>Növeli a vásárlók bizalmát</strong>, hiszen tudják, hogy szabályozott körülmények között dolgozol.</li><li>Segít rendszerezni a folyamatokat és <strong>csökkenti a hibák esélyét</strong>.</li></ul>" },
            { q: "Mi az a HACCP?", a: "A HACCP (Hazard Analysis and Critical Control Points) egy élelmiszerbiztonsági rendszer, ami segít <strong>azonosítani, megelőzni és ellenőrizni</strong> azokat a veszélyeket, amelyek az élelmiszer előállítása vagy forgalmazása során előfordulhatnak. (pl: fertőzések, gomba megtelepedése, vírusok elkerülése)" },
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