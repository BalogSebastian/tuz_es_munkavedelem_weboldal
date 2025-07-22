// components/sections/GyakoriKerdesek.tsx
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    ArrowLeftIcon, 
    ChevronDownIcon,
    MagnifyingGlassIcon,
    CalendarDaysIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const accentColor = {
  text: 'text-cyan-500',
  gradientFrom: 'from-cyan-500',
  gradientTo: 'to-teal-400',
  bg: 'bg-cyan-500',
  ring: 'focus:ring-cyan-500',
};

const faqData = [
    { 
        category: "Általános Kérdések", 
        questions: [
            { q: "Mikor van szükségem tűz- és munkavédelmi szakemberre?", a: "Gyakorlatilag minden vállalkozásnak szüksége van valamilyen szintű szakértői támogatásra, amint akár csak egy alkalmazottja is van. A kötelezettségek mértéke a cég méretétől, tevékenységi körétől és a munkavállalók számától függ. Egy ingyenes konzultáció során segítünk felmérni az Önre vonatkozó konkrét előírásokat." },
            { q: "Milyen dokumentumokat kell mindig a telephelyen tartanom?", a: "Ez tevékenységfüggő, de általánosságban elmondható, hogy a Munkavédelmi Szabályzatot, a Kockázatértékelést, a Tűzvédelmi Szabályzatot, a Tűzriadó Tervet, valamint az oktatásokról és felülvizsgálatokról szóló jegyzőkönyveket mindig elérhetővé kell tenni egy hatósági ellenőrzés során." },
            { q: "Mennyibe kerülnek a szolgáltatásaik?", a: "Minden vállalkozás más, ezért árainkat mindig egyedi igényekre szabjuk. Egy díjmentes igényfelmérés után egy teljesen átlátható, tételes árajánlatot adunk, rejtett költségek nélkül. Célunk a hosszú távú, kölcsönösen előnyös partnerség." },
            { q: "Csak Debrecenben és környékén dolgoznak?", a: "Bár központunk Debrecenben található, országos lefedettséggel rendelkezünk. Modern kommunikációs eszközeinknek köszönhetően a távolság nem akadály, és szükség esetén az ország bármely pontjára el tudunk utazni." },
        ]
    },
    { 
        category: "Tűzvédelem", 
        questions: [
            { q: "Milyen gyakran kell a tűzoltó készülékeket ellenőriztetni?", a: "A tűzoltó készülékeket évente legalább egyszer felül kell vizsgáltatni szakemberrel (ez az alapkarbantartás). Ezen felül a tulajdonosnak negyedévente szemrevételezéssel kell ellenőriznie azok állapotát. A készülék típusától függően közép- és teljes körű karbantartás is kötelező 5, illetve 10 évente." },
            { q: "Kötelező minden cégnek Tűzvédelmi Szabályzatot készíteni?", a: "Nem. Tűzvédelmi Szabályzatot akkor kell készíteni, ha a munkavégzésben részt vevő családtagokkal együtt ötnél több munkavállalót foglalkoztatnak, vagy ha ötvennél több személy befogadására alkalmas létesítményt működtetnek, illetve fokozottan tűz- vagy robbanásveszélyes besorolású anyaggal dolgoznak." },
            { q: "Mi az a Tűzriadó Terv és kinek kell?", a: "A Tűzriadó Terv a Tűzvédelmi Szabályzat melléklete, amely részletesen leírja a teendőket tűz esetén: kiürítési útvonalak, riasztási lánc, felelős személyek. Minden olyan helyen kötelező, ahol Tűzvédelmi Szabályzat készítése is előírás." },
        ]
    },
    { 
        category: "Munkavédelem", 
        questions: [
            { q: "Mi az a kockázatértékelés és miért kötelező?", a: "A kockázatértékelés egy dokumentum, amelyben a munkáltató felméri a munkahelyen előforduló veszélyeket és az azokból származó kockázatokat. Célja a megelőzés. A Munkavédelmi Törvény értelmében minden szervezett munkavégzést folytató vállalkozás számára kötelező az elkészítése, már egyetlen munkavállaló esetén is." },
            { q: "Minden munkavállalónak kötelező az orvosi alkalmassági vizsgálat?", a: "Igen, a munkába lépés előtt minden munkavállalónak kötelező előzetes orvosi alkalmassági vizsgálaton részt vennie. Bizonyos munkakörökben időszakos és soron kívüli vizsgálatok is előírtak." },
            { q: "Mi a teendő munkabaleset esetén?", a: "Az első és legfontosabb a sérült ellátása és a további veszély elhárítása. Ezt követően minden munkabalesetet azonnal jelenteni kell a munkáltatónak. A munkáltató kötelessége a balesetet kivizsgálni, jegyzőkönyvet felvenni, és a súlyosságtól függően bejelenteni az illetékes hatóságnak." },
        ]
    },
    { 
        category: "HACCP", 
        questions: [
            { q: "Kinek kötelező a HACCP rendszer kiépítése?", a: "Minden vállalkozásnak, amely élelmiszerrel foglalkozik – a termeléstől a forgalmazáson át a vendéglátásig – kötelező HACCP rendszert működtetnie. Ez vonatkozik a legkisebb büfére és a legnagyobb élelmiszer-üzemre is." },
            { q: "Milyen gyakran kell felülvizsgálni a HACCP rendszert?", a: "A HACCP rendszert évente legalább egyszer kötelező felülvizsgálni, de soron kívüli felülvizsgálat is szükséges lehet például a technológia, a termékkör vagy a jogszabályok változása esetén." },
        ]
    }
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
            <div className="pb-6 text-slate-600 text-lg leading-relaxed prose max-w-none">{a}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const GyakoriKerdesek = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [openQuestion, setOpenQuestion] = useState<string | null>(null);

  // JAVÍTÁS: A szűrési logika robusztusabbra cserélve
  const filteredData = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();

    return faqData
      .map(cat => ({
        ...cat,
        questions: cat.questions.filter(
          q => searchTerm.trim() === '' || q.q.toLowerCase().includes(searchLower) || q.a.toLowerCase().includes(searchLower)
        )
      }))
      .filter(cat => activeCategory === 'All' || cat.category === activeCategory)
      .filter(cat => cat.questions.length > 0);

  }, [activeCategory, searchTerm]);

  // JAVÍTÁS: A nyitott kérdés állapotának nullázása szűréskor
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
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter mb-4">
            Tudásbázis: <span className={accentColor.text}>Válaszok</span> a kérdéseire.
          </h1>
          <p className="text-2xl text-slate-600 leading-snug">
            Keressen a leggyakoribb kérdések között, vagy böngésszen kategóriák szerint, hogy megtalálja a szükséges információt.
          </p>
          <div className="mt-8 max-w-2xl mx-auto relative">
            <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-slate-400" />
            <input 
              type="text"
              placeholder="Keressen kulcsszóra... (pl. 'kockázatértékelés')"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-slate-200 focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/50 transition-all text-lg"
            />
          </div>
        </motion.header>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <aside className="lg:w-1/3">
            <motion.div variants={itemVariants} className="sticky top-24">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Kategóriák</h2>
              <ul className="space-y-2">
                {["All", ...faqData.map(c => c.category)].map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setActiveCategory(category)}
                      className={`w-full text-left p-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                        activeCategory === category
                          ? `bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo} text-white shadow-lg`
                          : 'text-slate-600 hover:bg-white hover:text-slate-900'
                      }`}
                    >
                      {category === "All" ? "Összes Kérdés" : category}
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
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">{category.category}</h2>
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
          <h3 className="text-3xl font-bold text-slate-800 mb-4">Nem találta a választ?</h3>
          <p className="text-slate-600 text-lg mb-8">Szakértő csapatunk készen áll, hogy személyesen válaszoljon minden felmerülő kérdésére.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/">
              <motion.div
                className="w-full sm:w-auto text-center font-semibold py-3 px-8 rounded-xl bg-slate-200 text-slate-700 hover:bg-slate-300 transition-colors cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ArrowLeftIcon className="w-5 h-5 inline-block mr-2" />
                Vissza a főoldalra
              </motion.div>
            </Link>
            <Link href="https://calendly.com/">
              <motion.div
                className={`w-full sm:w-auto text-center font-bold py-3 px-8 rounded-xl bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo} text-white shadow-lg shadow-cyan-500/30 cursor-pointer`}
                whileHover={{ scale: 1.05, y: -2, boxShadow: '0 10px 30px -10px rgba(3, 186, 190, 0.5)' }}
                whileTap={{ scale: 0.95 }}
              >
                <CalendarDaysIcon className="w-5 h-5 inline-block mr-2" />
                Konzultációt Kérek
              </motion.div>
            </Link>
          </div>
        </motion.footer>

      </motion.div>
    </div>
  );
};

export default GyakoriKerdesek;