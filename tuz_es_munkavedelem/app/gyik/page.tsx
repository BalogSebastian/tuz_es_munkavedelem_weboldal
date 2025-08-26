// components/sections/GyakoriKerdesek.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeftIcon, 
    ChevronDownIcon,
    MagnifyingGlassIcon,
    CalendarDaysIcon,
    SparklesIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { FaFire, FaHardHat, FaUtensils, FaQuestionCircle } from 'react-icons/fa';

const accentColor = {
  text: 'text-cyan-500',
  gradientFrom: 'from-cyan-500',
  gradientTo: 'to-teal-400',
  bg: 'bg-cyan-500',
  ring: 'focus:ring-cyan-500',
};

const faqData = [
    { 
        category: "Tűzvédelem",
        icon: FaFire,
        questions: [
          { 
            q: "Mikor kötelező tűzvédelmi szakembert alkalmaznod?",
            a: "Röviden, akkor van rá szükséged, ha a vállalkozásod az alábbi kategóriák valamelyikébe esik:<ul>" +
               "<li><strong>Több mint 5 főt</strong> foglalkoztatsz (beleértve a családtagokat is, ha segítenek).</li>" +
               "<li>Olyan helyet üzemeltetsz, aminek a befogadóképessége <strong>meghaladja az 500 főt</strong>, vagy van benne egy <strong>50 főnél nagyobb terem</strong>.</li>" +
               "<li><strong>Tűz- vagy robbanásveszélyes</strong> anyagokkal dolgozol.</li>" +
               "<li><strong>Speciális</strong> intézményt működtetsz, mint például <strong>iskola, óvoda, kórház, idősotthon, szálloda vagy irodaház</strong>.</li>" +
               "</ul>"
          },
          
            { q: "Pontosan mit csinál egy tűzvédelmi szakember?", a: "Lényegében leveszi a válladról a tűzvédelemmel kapcsolatos terheket és felelősséget. A főbb feladatai:<ul><li>Elkészíti és frissen tartja a <strong>Tűzvédelmi Szabályzatodat</strong> és a Tűzriadó Tervet.</li><li>Megtartja a <strong>munkavállalóidnak</strong> a <strong>kötelező éves tűzvédelmi oktatást</strong>.</li><li>Tartja a kapcsolatot a <strong>hatósággal</strong> (katasztrófavédelem).</li><li>Segít neked megelőzni a <strong>bírságokat</strong> és – ami a legfontosabb – a valódi tűzeseteket.</li></ul>" },
            { q: "Milyen jogszabályban találhatóak a Tűzvédelmi követelmények?", a: "Ha érdekel a pontos háttér, ezt a két jogszabályt keresd:<ul><li><strong>A tűz elleni védekezésről szóló 1996. évi XXXI. törvény</strong>.</li><li><strong>A tűzvédelmi szakemberek foglalkoztatásáról szóló 9/2015. (III. 25.) BM rendelet</strong>.</li></ul>" },
            { q: "Kötelező a munkahelyi tűzvédelmi oktatás?", a: "Igen, a törvény szerint <strong>minden munkavállaló számára kötelező évente legalább egyszer</strong> részt venni tűzvédelmi oktatáson. Az oktatás célja, hogy pontosan tudd, mit kell tenned vészhelyzetben az adott épületben:<ul><li><strong>Hol vannak a menekülési útvonalak?</strong></li><li><strong>Hol találod a tűzoltó készülékeket és a fali tűzcsapokat?</strong></li><li><strong>Ki a menekülési csoportvezető az adott területen?</strong></li><li><strong>Hogyan tudod áramtalanítani a gépeket?</strong></li></ul>Egy éles helyzetben ezek az információk életeket menthetnek." },
            { q: "Miért kezd el sípolni a füstérzékelő, ha nincs is füst?", a: "A legtöbb esetben a rövid, szabályos időközönként hallható csipogás az <strong>elem merülését jelzi</strong>. Ez a készülék figyelmeztetése, hogy cseréld ki az elemet, mielőtt teljesen lemerülne és működésképtelenné válna. Más okok is lehetnek, például:<ul><li><strong>Pára vagy gőz:</strong> A fürdőszobából kiáramló forró gőz vagy a konyhai pára is beindíthatja.</li><li><strong>Por:</strong> Ha a készülék érzékelő kamrája poros, az is okozhat téves riasztást. Érdemes évente egyszer óvatosan kiporszívózni.</li></ul>" },
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
              collapsed: { opacity: 0, height: 0, transition: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] } }
            }}
            className="overflow-hidden"
          >
            {/* A dangerouslySetInnerHTML használata a HTML tartalom megjelenítéséhez */}
            <div 
              className="pb-6 text-slate-600 text-lg leading-relaxed prose max-w-none prose-ul:list-disc prose-ul:pl-6 prose-ul:space-y-2 prose-strong:font-bold"
              dangerouslySetInnerHTML={{ __html: a }} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const GyakoriKerdesek = () => {
  const [activeCategory, setActiveCategory] = useState("Összes");
  const [searchTerm, setSearchTerm] = useState("");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  const filteredData = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    const isSearchActive = searchLower.length > 0;

    return faqData
      .map(cat => ({
        ...cat,
        questions: cat.questions.filter(
          q => q.q.toLowerCase().includes(searchLower) || q.a.toLowerCase().includes(searchLower)
        )
      }))
      .filter(cat => activeCategory === 'Összes' || cat.category === activeCategory)
      .filter(cat => cat.questions.length > 0);

  }, [activeCategory, searchTerm]);

  useEffect(() => {
    setOpenQuestion(null);
  }, [activeCategory, searchTerm]);

  return (
    <div className="min-h-screen bg-slate-50 font-['Poppins',_sans-serif]">
      <motion.div 
          className="absolute inset-0 z-0"
          animate={{ 
              background: [
                  "radial-gradient(circle at 10% 20%, rgba(3, 186, 190, 0.07), transparent 40%)",
                  "radial-gradient(circle at 90% 80%, rgba(3, 186, 190, 0.07), transparent 40%)",
                  "radial-gradient(circle at 50% 50%, rgba(3, 186, 190, 0.07), transparent 40%)",
                  "radial-gradient(circle at 10% 20%, rgba(3, 186, 190, 0.07), transparent 40%)",
              ]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />

      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 relative"
        variants={pageVariants}
        initial="initial"
        animate="in"
      >
        <motion.header variants={itemVariants} className="text-center max-w-4xl mx-auto mb-20">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4">
            <span className={accentColor.text}>Tudásbázis</span>
          </h1>
          <p className="text-3xl text-slate-800 font-black mb-2">
            Válaszok a kérdéseidre!
          </p>
          <p className="text-xl text-slate-600 leading-snug max-w-2xl mx-auto">
            Keressen a leggyakoribb kérdések között, hogy megtaláld a szükséges információt.
          </p>
        </motion.header>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <aside className="lg:w-1/3">
            <motion.div variants={itemVariants} className="sticky top-24">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Kategóriák</h2>
              <ul className="space-y-2">
                {["Összes", ...faqData.map(c => c.category)].map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left p-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                        activeCategory === category
                          ? `bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo} text-white shadow-lg`
                          : 'text-slate-600 hover:bg-white hover:text-slate-900'
                      }`}
                    >
                      {category === "Összes" ? "Összes Kérdés" : category}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          </aside>

          <main className="lg:w-2/3 space-y-12">
            <AnimatePresence mode="wait">
              {filteredData.length > 0 ? (
                <motion.div key={activeCategory + searchTerm}>
                  {filteredData.map((category) => (
                    <motion.section 
                      key={category.category}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, ease: 'easeOut' }}
                      className="mb-12"
                    >
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6 flex items-center">
                        {category.icon && <category.icon className="w-8 h-8 mr-4" />}
                        {category.category}
                      </h2>
                      <div className="bg-white/70 backdrop-blur-md p-2 sm:p-4 rounded-2xl shadow-xl border border-slate-200/80">
                        {category.questions.map((q, index) => (
                          <FaqItem
                            key={q.q}
                            q={q.q}
                            a={q.a}
                            isOpen={openQuestion === `${category.category}-${index}`}
                            onClick={() => setOpenQuestion(openQuestion === `${category.category}-${index}` ? null : `${category.category}-${index}`)}
                          />
                        ))}
                      </div>
                    </motion.section>
                  ))}
                </motion.div>
              ) : (
                <motion.div 
                    key="no-results"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-16"
                >
                    <p className="text-xl text-slate-600">Nincs a keresésnek megfelelő találat.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>

        <motion.footer variants={itemVariants} className="max-w-4xl mx-auto mt-24 text-center border-t border-slate-200 pt-16">
          <h3 className="text-3xl font-bold text-slate-800 mb-4">Ha nem találod a választ vagy lenne még speciálisabb kérdésed, foglalj egy online megbeszélést!</h3>
          <p className="text-slate-600 text-lg mb-8">Szakértő csapatunk készen áll, hogy személyesen válaszoljon minden felmerülő kérdésére.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="https://app.minup.io/book/munkavedelmiszaki/service/46358" target="_blank" rel="noopener noreferrer">
              <motion.div
                className={`w-full sm:w-auto text-center font-bold py-3 px-8 rounded-xl bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo} text-white shadow-lg shadow-cyan-500/30 cursor-pointer`}
                whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 30px -10px rgba(3, 186, 190, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <CalendarDaysIcon className="w-5 h-5 inline-block mr-2" />
                Konzultációt kérek!
              </motion.div>
            </Link>
          </div>
        </motion.footer>

      </motion.div>
    </div>
  );
};

export default GyakoriKerdesek;