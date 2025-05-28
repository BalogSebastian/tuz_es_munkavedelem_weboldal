// app/components/sections/CreativeBlogSection.tsx
'use client';

import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRightIcon, EyeIcon } from '@heroicons/react/24/outline';

const accentColor = {
  bg: 'bg-[#DD520F]',
  text: 'text-white',
  hoverBg: 'hover:bg-orange-700',
  ring: 'focus:ring-orange-500',
};

interface BlogPost {
  id: number;
  imageUrl: string;
  category?: string;
  title: string;
  excerpt: string;
  link: string;
}

const blogPostsData: BlogPost[] = [
  { id: 1, imageUrl: 'bg-gradient-to-br from-purple-400 via-pink-500 to-red-500', category: 'Marketing Tippek', title: 'A Tökéletes Csalétek: 6 Titkos Ötlet Email Címek Szerzéséhez', excerpt: 'Ismerd meg azokat a bevált stratégiákat, amelyekkel növelheted email listádat és hatékonyabban érheted el célközönségedet.', link: '#'},
  { id: 2, imageUrl: 'bg-gradient-to-br from-green-400 via-teal-500 to-cyan-600', category: 'Árazás és Pszichológia', title: 'Az Összehasonlíthatatlan Ajánlat Varázsa: Add El Drágábban!', excerpt: 'Hogyan pozicionáld termékedet vagy szolgáltatásodat úgy, hogy az ügyfelek magasabb áron is téged válasszanak?', link: '#'},
  { id: 3, imageUrl: 'bg-gradient-to-br from-yellow-400 via-amber-500 to-orange-600', category: 'Vállalkozás Indítás', title: '30 Vállalkozási Ötlet, Amit Könnyedén Elindíthatsz Otthonról', excerpt: 'Fedezd fel a legújabb és legnépszerűbb otthonról végezhető vállalkozási lehetőségeket, minimális kezdőtőkével.', link: '#'},
  { id: 4, imageUrl: 'bg-gradient-to-br from-sky-400 via-blue-500 to-indigo-600', category: 'Személyes Fejlődés', title: 'Időmenedzsment Mesterfokon: Több Eredmény, Kevesebb Stressz', excerpt: 'Praktikus tippek és technikák, hogy a legtöbbet hozd ki minden napodból és csökkentsd a rád nehezedő nyomást.', link: '#'},
  { id: 5, imageUrl: 'bg-gradient-to-br from-rose-400 via-red-500 to-fuchsia-600', category: 'Online Marketing', title: 'A Tartalommarketing Új Generációja: Storytelling a Gyakorlatban', excerpt: 'Hogyan építs mélyebb kapcsolatot a közönségeddel lenyűgöző történetek segítségével? Valós példák és esettanulmányok.', link: '#'},
  { id: 6, imageUrl: 'bg-gradient-to-br from-lime-400 via-green-500 to-emerald-600', category: 'Technológia és Innováció', title: 'Mesterséges Intelligencia a Kisvállalkozások Szolgálatában', excerpt: 'Nem csak a nagyok kiváltsága! Ismerd meg, hogyan segíthet az MI a te céged növekedésében is, egyszerű eszközökkel.', link: '#'},
];

const cardVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: "backOut" }
  },
};

const BlogCard: React.FC<{ post: BlogPost }> = ({ post }) => {
  return (
    <motion.div
      className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group relative"
      variants={cardVariants}
      whileHover={{ y: -10, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 280, damping: 18 }}
    >
      <div className={`relative w-full h-52 ${post.imageUrl} bg-cover bg-center transition-transform duration-300 ease-in-out group-hover:scale-105 overflow-hidden`}>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <EyeIcon className="w-12 h-12 text-white opacity-90 transform scale-75 group-hover:scale-100 transition-transform duration-300" />
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        {post.category && (
          <p className={`text-xs font-semibold ${accentColor.text} ${accentColor.bg} inline-block px-3 py-1 rounded-full mb-3 self-start shadow-sm`}>
            {post.category}
          </p>
        )}
        <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-[#DD520F] transition-colors duration-200">{post.title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed mb-6 line-clamp-3 flex-grow">
          {post.excerpt}
        </p>
        <motion.a
          href={post.link}
          className={`
            mt-auto inline-flex items-center justify-center px-6 py-3
            border border-transparent rounded-lg shadow-md
            text-base font-semibold ${accentColor.text} ${accentColor.bg}
            ${accentColor.hoverBg} focus:outline-none focus:ring-2 focus:ring-offset-2 ${accentColor.ring}
            transition-all duration-200 ease-in-out group-hover:scale-110 active:scale-95 transform group-hover:shadow-lg
          `}
        >
          Megnézem
          <ArrowRightIcon className="ml-2.5 h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
        </motion.a>
      </div>
    </motion.div>
  );
};

const WavyLineBackground: React.FC = () => {
  const lineConfigs = [
    { // Eredeti 1
      d: "M -200,150 Q -100,50 0,150 T 200,150 Q 300,250 400,150 T 600,150 Q 700,50 800,150 T 1000,150 Q 1100,250 1200,150 T 1400,150 Q 1500,50 1600,150 T 1800,150 Q 1900,250 2000,150 T 2200,150",
      stroke: "rgba(203, 213, 225, 0.25)", // slate-300, enyhébb opacitás
      strokeWidth: 2.5,
      duration: 80, // Lassabb
      yOffset: "15%",
      animateX: ["0%", "-100%"],
    },
    { // Eredeti 2
      d: "M -200,100 Q -100,200 0,100 T 200,100 Q 300,0 400,100 T 600,100 Q 700,200 800,100 T 1000,100 Q 1100,0 1200,100 T 1400,100 Q 1500,200 1600,100 T 1800,100 Q 1900,0 2000,100 T 2200,100",
      stroke: "rgba(199, 210, 254, 0.2)", // indigo-200, enyhébb opacitás
      strokeWidth: 3,
      duration: 95, // Lassabb
      yOffset: "40%",
      animateX: ["-100%", "0%"],
    },
    { // Eredeti 3
      d: "M -200,200 Q -100,100 0,200 T 200,200 Q 300,300 400,200 T 600,200 Q 700,100 800,200 T 1000,200 Q 1100,300 1200,200 T 1400,200 Q 1500,100 1600,200 T 1800,200 Q 1900,300 2000,200 T 2200,200",
      stroke: "rgba(254, 202, 202, 0.2)", // red-200 (narancsos), enyhébb opacitás
      strokeWidth: 2,
      duration: 110, // Lassabb
      yOffset: "65%",
      animateX: ["0%", "-100%"],
    },
    // --- ÚJ VONALAK ---
    { // Új 4: Gyorsabb, vékonyabb, más y-pozíció
      d: "M -200,120 Q -125,180 -50,120 T 100,120 Q 175,60 250,120 T 400,120 Q 475,180 550,120 T 700,120 Q 775,60 850,120 T 1000,120 Q 1075,180 1150,120 T 1300,120 Q 1375,60 1450,120 T 1600,120 Q 1675,180 1750,120 T 1900,120 Q 1975,60 2050,120 T 2200,120",
      stroke: "rgba(165, 243, 252, 0.25)", // cyan-200 áttetszően
      strokeWidth: 1.5,
      duration: 55, // Gyorsabb
      yOffset: "80%",
      animateX: ["-100%", "0%"],
    },
    { // Új 5: Közepes, más hullámforma, más y-pozíció
      d: "M -200,180 C -100,280 100,-20 200,180 S 300,280 400,180 S 500,-20 600,180 S 700,280 800,180 S 900,-20 1000,180 S 1100,280 1200,180 S 1300,-20 1400,180 S 1500,280 1600,180 S 1700,-20 1800,180 S 1900,280 2000,180 S 2100,-20 2200,180", // 'C' és 'S' görbékkel a nagyobb hullámokért
      stroke: "rgba(221, 214, 254, 0.2)", // violet-200 áttetszően
      strokeWidth: 2.5,
      duration: 70,
      yOffset: "5%", // Közelebb a tetejéhez
      animateX: ["0%", "-100%"],
    }
  ];

  return (
    <>
      {lineConfigs.map((config, index) => (
        <motion.svg
          key={index}
          className="absolute left-0 w-[220%] h-full pointer-events-none" // Kicsit szélesebb, hogy biztosan ne legyen vége látható
          style={{ top: config.yOffset, x: config.animateX[0] }}
          animate={{ x: config.animateX }}
          transition={{
            duration: config.duration,
            ease: "linear",
            repeat: Infinity,
            repeatType: "loop",
          }}
          viewBox="0 0 2200 300" // ViewBox igazítva a path hosszához
          preserveAspectRatio="xMidYMid slice"
        >
          <path
            d={config.d}
            stroke={config.stroke}
            strokeWidth={config.strokeWidth}
            fill="none"
            strokeLinecap="round" // Lekerekített vonalvégek a lágyabb megjelenésért
          />
        </motion.svg>
      ))}
    </>
  );
};


const CreativeBlogSection: React.FC = () => {
  return (
    <section
      className="py-20 lg:py-28 bg-white relative overflow-hidden"
    >
      <WavyLineBackground />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight mb-4">
            Legfrissebb Írásaink
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Inspiráció, tudás és gyakorlati tanácsok egy helyen - olvassa el legújabb blogbejegyzéseinket!
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
        >
          {blogPostsData.map(post => (
            <BlogCard key={post.id} post={post} />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CreativeBlogSection;