// components/sections/Szolgaltatasok.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { 
    ArrowLeftIcon, 
    FireIcon,
    ShieldCheckIcon,
    ClipboardDocumentCheckIcon,
    CalendarDaysIcon,
    CheckBadgeIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

const accentColor = {
  text: 'text-cyan-500',
  gradientFrom: 'from-cyan-500',
  gradientTo: 'to-teal-400',
  bg: 'bg-cyan-500',
  ring: 'focus:ring-cyan-500',
};

const servicesData = [
  {
    category: "Tűzvédelem",
    id: "tuzvedelem",
    icon: FireIcon,
    description: "A tűz nem játék. Szolgáltatásaink biztosítják, hogy vállalkozása minden tűzvédelmi előírásnak megfeleljen, megelőzve a katasztrófákat és a bírságokat.",
    items: [
      { title: "Tűzvédelmi Szabályzat Készítése", content: "Elkészítjük és karbantartjuk a jogszabályoknak megfelelő, cégre szabott Tűzvédelmi Szabályzatot, Tűzriadó Tervet és a szükséges dokumentációt." },
      { title: "Tűzvédelmi Oktatás", content: "Gyakorlatias és interaktív oktatást tartunk munkatársainak, hogy vészhelyzetben is magabiztosan és hatékonyan cselekedjenek." },
      { title: "Érintésvédelmi Felülvizsgálat", content: "Szabványossági felülvizsgálatok és villamos biztonságtechnikai mérések elvégzése, hitelesített jegyzőkönyvvel dokumentálva." },
      { title: "Tűzoltó Készülékek Ellenőrzése", content: "Vállaljuk a tűzoltó készülékek kötelező, időszakos felülvizsgálatát, karbantartását és hitelesítését." }
    ]
  },
  {
    category: "Munkavédelem",
    id: "munkavedelem",
    icon: ShieldCheckIcon,
    description: "A legértékesebb tőke az ember. Munkavédelmi szolgáltatásaink célja a biztonságos munkakörnyezet megteremtése és a balesetek megelőzése.",
    items: [
      { title: "Munkavédelmi Kockázatértékelés", content: "Teljes körű munkahelyi kockázatértékelést végzünk, amely feltárja a potenciális veszélyforrásokat és javaslatokat tesz azok megszüntetésére." },
      { title: "Munkavédelmi Szabályzatok", content: "Kidolgozzuk a cég tevékenységére szabott Munkavédelmi Szabályzatot és az egyéni védőeszközök juttatásának rendjét." },
      { title: "Munkabalesetek Kivizsgálása", content: "Szakszerűen kivizsgáljuk és dokumentáljuk a munkabaleseteket, segítve a jövőbeni esetek megelőzését és a hatósági eljárásokat." },
      { title: "Gépek Üzembe Helyezése", content: "Vállaljuk emelőgépek és egyéb veszélyes gépek szakszerű üzembe helyezését és időszakos biztonsági felülvizsgálatát." }
    ]
  },
  {
    category: "HACCP",
    id: "haccp",
    icon: ClipboardDocumentCheckIcon,
    description: "Az élelmiszer-biztonság nem lehet kompromisszum. HACCP rendszerünkkel garantáljuk a higiénikus működést és a fogyasztók védelmét.",
    items: [
      { title: "HACCP Rendszer Kiépítése", content: "A vendéglátó- és élelmiszeripari egységek számára teljes körű HACCP dokumentációt készítünk, a helyszíni felméréstől a rendszer bevezetéséig." },
      { title: "Higiéniai Oktatás", content: "Célzott oktatást tartunk az élelmiszer-kezeléssel foglalkozó munkatársaknak a helyes higiéniai gyakorlatokról és a kritikus pontok kezeléséről." },
      { title: "Belső Audit és Felügyelet", content: "Rendszeres belső auditokkal és tanácsadással biztosítjuk, hogy a HACCP rendszer a gyakorlatban is hatékonyan működjön." }
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

const ServiceCard = ({ title, content }: { title: string, content: string }) => (
    <motion.div 
        variants={itemVariants}
        whileHover={{ y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' }}
        className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-slate-200/80"
    >
        <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{content}</p>
    </motion.div>
);

const Szolgaltatasok = () => {
  const [activeCategory, setActiveCategory] = useState(servicesData[0].id);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveCategory(entry.target.id);
          }
        });
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );

    sectionRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      sectionRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref);
      });
    };
  }, []);

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
            Szolgáltatások, amelyek <span className={accentColor.text}>nyugalmat</span> adnak.
          </h1>
          <p className="text-2xl text-slate-600 leading-snug">
            Átfogó megoldásainkkal garantáljuk, hogy vállalkozása minden jogszabályi előírásnak megfelel, a munkatársai pedig biztonságban dolgozhatnak.
          </p>
        </motion.header>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">
          <aside className="lg:w-1/3">
            <motion.div variants={itemVariants} className="sticky top-24">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Kategóriák</h2>
              <ul className="space-y-2">
                {servicesData.map((category) => (
                  <li key={category.id}>
                    <a
                      href={`#${category.id}`}
                      className={`block p-4 rounded-lg font-semibold text-lg transition-all duration-300 ${
                        activeCategory === category.id
                          ? `bg-gradient-to-r ${accentColor.gradientFrom} ${accentColor.gradientTo} text-white shadow-lg`
                          : 'text-slate-600 hover:bg-white hover:text-slate-900'
                      }`}
                    >
                      {category.category}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          </aside>

          <main className="lg:w-2/3 space-y-20">
            {servicesData.map((category, index) => {
              const CategoryIcon = category.icon;
              return (
                <motion.section 
                  key={category.id} 
                  id={category.id}
                  ref={(el) => { sectionRefs.current[index] = el; }}
                  variants={itemVariants}
                >
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-4 rounded-xl bg-gradient-to-br ${accentColor.gradientFrom} ${accentColor.gradientTo}`}>
                      <CategoryIcon className="w-8 h-8 text-white" />
                    </div>
                    <div>
                      <h2 className="text-3xl md:text-4xl font-bold text-slate-800">{category.category}</h2>
                      <p className="text-slate-600 text-lg">{category.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {category.items.map(service => (
                      <ServiceCard key={service.title} title={service.title} content={service.content} />
                    ))}
                  </div>
                </motion.section>
              );
            })}
          </main>
        </div>

        <motion.footer variants={itemVariants} className="max-w-4xl mx-auto mt-24 text-center border-t border-slate-200 pt-16">
          <h3 className="text-3xl font-bold text-slate-800 mb-4">Készen áll a biztonságosabb működésre?</h3>
          <p className="text-slate-600 text-lg mb-8">Vegye fel velünk a kapcsolatot egy ingyenes, kötelezettségmentes konzultációért!</p>
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
                Időpontfoglalás
              </motion.div>
            </Link>
          </div>
        </motion.footer>

      </motion.div>
    </div>
  );
};

export default Szolgaltatasok;