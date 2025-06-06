// app/components/FaqAccordion.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDownIcon, ExclamationCircleIcon } from '@heroicons/react/24/solid';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// --- A HÁTTÉR LOGIKÁJÁHOZ SZÜKSÉGES KONSTANS ÉS OSZTÁLY ---
const ACCENT_COLOR_CANVAS = {
    baseRgb: '3, 186, 190',
};

class Particle {
    x: number; y: number; z: number;
    vx: number; vy: number; vz: number;
    trail: { x: number, y: number, z: number }[];
    baseAlpha: number;

    constructor(canvasWidth: number, canvasHeight: number, maxDepth: number) {
        this.x = (Math.random() - 0.5) * canvasWidth;
        this.y = (Math.random() - 0.5) * canvasHeight;
        this.z = Math.random() * maxDepth;
        this.vx = (Math.random() - 0.5) * 0.8;
        this.vy = (Math.random() - 0.5) * 0.8;
        this.vz = (Math.random() - 0.5) * 0.1;
        this.trail = [];
        this.baseAlpha = 0.4 + Math.random() * 0.5;
    }
    project(fov: number, canvasCenter: { x: number, y: number }): { x: number, y: number, scale: number } {
        const perspective = fov / (fov + this.z);
        return { x: canvasCenter.x + this.x * perspective, y: canvasCenter.y + this.y * perspective, scale: perspective };
    }
    update(mouse: { x: number, y: number }, repelRadius: number, repelStrength: number, maxDepth: number, canvasWidth: number, canvasHeight: number, centerPull: number) {
        const dxMouse = this.x - (mouse.x - canvasWidth / 2);
        const dyMouse = this.y - (mouse.y - canvasHeight / 2);
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < repelRadius) {
            const force = (repelRadius - distMouse) / repelRadius;
            this.vx += (dxMouse / distMouse) * force * repelStrength;
            this.vy += (dyMouse / distMouse) * force * repelStrength;
        }
        this.vx -= this.x * centerPull; this.vy -= this.y * centerPull;
        this.vx *= 0.98; this.vy *= 0.98; this.vz *= 0.99;
        this.x += this.vx; this.y += this.vy; this.z += this.vz;
        if (this.z < 0) { this.z = 0; this.vz *= -1; }
        if (this.z > maxDepth) { this.z = maxDepth; this.vz *= -1; }
        this.trail.push({ x: this.x, y: this.y, z: this.z });
        if (this.trail.length > 5) this.trail.shift();
    }
    draw(ctx: CanvasRenderingContext2D, fov: number, canvasCenter: {x: number, y: number}) {
        const proj = this.project(fov, canvasCenter);
        if (proj.x < 0 || proj.x > canvasCenter.x * 2 || proj.y < 0 || proj.y > canvasCenter.y * 2) return;
        const alpha = this.baseAlpha * proj.scale * 0.8;
        ctx.beginPath();
        ctx.arc(proj.x, proj.y, proj.scale * 1.5, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${ACCENT_COLOR_CANVAS.baseRgb}, ${alpha})`;
        ctx.fill();
    }
}

// --- FŐ KOMPONENS ---
const accentColor = {
  text: 'text-[#03BABE]', textDark: 'text-cyan-800', hoverBg: 'hover:bg-cyan-600', ring: 'focus-visible:ring-cyan-500',
  borderLightOpen: 'border-cyan-400', ringLightOpen: 'ring-cyan-500/20', textHover: 'group-hover:text-cyan-600',
  iconOpen: 'text-cyan-600', iconHover: 'group-hover:text-cyan-500', iconBgHover: 'group-hover:bg-cyan-100/60',
  questionBgHover: 'group-hover:bg-slate-50/50',
};

const faqItems = [
    { question: "Milyen gyakran kell munkavédelmi oktatást tartani?", answer: "A munkavédelmi oktatást munkába álláskor, munkahely vagy munkakör megváltozásakor, valamint legalább évente ismétlődően meg kell tartani. Bizonyos esetekben (pl. technológia változás) soron kívüli oktatás is szükséges lehet.", isImportant: true },
    { question: "Kötelező minden vállalkozásnak tűzvédelmi szabályzatot készíteni?", answer: "Nem minden esetben. Tűzvédelmi szabályzatot kell készíteni, ha a munkavállalók létszáma meghaladja az 5 főt, vagy ha 50 főnél több személy befogadására alkalmas létesítményt üzemeltetnek, illetve fokozottan tűz- vagy robbanásveszélyes besorolású anyagot használnak." },
    { question: "Mi az a kockázatértékelés és miért fontos?", answer: "A kockázatértékelés egy olyan folyamat, amely során felmérjük a munkahelyen előforduló potenciális veszélyeket és értékeljük az azokból adódó kockázatokat. Célja a munkabalesetek és egészségkárosodások megelőzése, valamint a szükséges védőintézkedések meghatározása. Minden munkáltatónak kötelező elvégeznie.", isImportant: true },
    { question: "Mennyi idő alatt készül el egy munkavédelmi szabályzat?", answer: "Ez nagyban függ a vállalkozás méretétől, tevékenységétől és a meglévő dokumentáció állapotától. Egy alapos felmérés után tudunk pontosabb időbecslést adni, de általában néhány naptól 1-2 hétig terjedhet." },
    { question: "Milyen szankciókra számíthatok, ha nem felelek meg az előírásoknak?", answer: "A hatóságok a hiányosságok súlyosságától függően figyelmeztetéstől kezdve a tevékenység felfüggesztésén át a jelentős összegű bírság kiszabásáig terjedő szankciókat alkalmazhatnak. A megelőzés mindig költséghatékonyabb." },
];

const sectionVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
const faqItemVariants = { hidden: { opacity: 0, y: 30, scale: 0.95 }, visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } };
const answerVariants = { hidden: { opacity: 0, height: 0, y: -15, transition: { duration: 0.35, ease: "easeOut" } }, visible: { opacity: 1, height: 'auto', y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } };

const FaqAccordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // A teljes animációs logika a komponensen belül, egy useEffect hook-ban
  useEffect(() => {
      if (typeof window === 'undefined') return;
      const canvas = canvasRef.current;
      if (!canvas || !canvas.parentElement) return;

      const ctx = canvas.getContext('2d', { alpha: true });
      if (!ctx) return;

      let animationFrameId: number;
      const particles: Particle[] = [];
      const mouse = { x: 9999, y: 9999 };
      const fov = 300, maxDepth = 400, repelRadius = 150, repelStrength = 0.5, centerPull = 0.0001;
      let canvasCenter = { x: canvas.parentElement.clientWidth / 2, y: canvas.parentElement.clientHeight / 2 };

      const setCanvasSize = () => {
          if (!canvas.parentElement) return;
          const dpr = window.devicePixelRatio || 1;
          canvas.width = canvas.parentElement.clientWidth * dpr;
          canvas.height = canvas.parentElement.clientHeight * dpr;
          canvas.style.width = `${canvas.parentElement.clientWidth}px`;
          canvas.style.height = `${canvas.parentElement.clientHeight}px`;
          ctx.scale(dpr, dpr);
          canvasCenter = { x: canvas.parentElement.clientWidth / 2, y: canvas.parentElement.clientHeight / 2 };
      };

      const init = () => {
          particles.length = 0;
          const particleCount = Math.floor(window.innerWidth / 40);
          for (let i = 0; i < particleCount; i++) {
              particles.push(new Particle(canvas.width, canvas.height, maxDepth));
          }
      };

      const connect = () => {
          ctx.beginPath();
          for (let i = 0; i < particles.length; i++) { for (let j = i + 1; j < particles.length; j++) { const p1 = particles[i]; const p2 = particles[j]; const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2)); if (dist < 200) { const p1Proj = p1.project(fov, canvasCenter); const p2Proj = p2.project(fov, canvasCenter); const opacity = Math.max(0, 1 - dist / 200); ctx.moveTo(p1Proj.x, p1Proj.y); ctx.lineTo(p2Proj.x, p2Proj.y); ctx.strokeStyle = `rgba(${ACCENT_COLOR_CANVAS.baseRgb}, ${opacity * p1Proj.scale * p2Proj.scale * 0.5})`; } } }
          ctx.lineWidth = 0.5;
          ctx.stroke();
      };

      const animate = () => {
          if (!ctx) return;
          ctx.clearRect(0, 0, canvas.width, canvas.height);
          particles.sort((a, b) => b.z - a.z);
          particles.forEach(p => { p.update(mouse, repelRadius, repelStrength, maxDepth, window.innerWidth, window.innerHeight, centerPull); p.draw(ctx, fov, canvasCenter); });
          connect();
          animationFrameId = requestAnimationFrame(animate);
      };

      setCanvasSize();
      init();
      animate();

      const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
      const handleResize = () => { setCanvasSize(); init(); };

      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('resize', handleResize);

      return () => {
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('resize', handleResize);
          if (animationFrameId) {
              cancelAnimationFrame(animationFrameId);
          }
      };
  }, []); // Üres dependency array -> csak egyszer fut le

  const toggleItem = (index: number) => { setOpenIndex(openIndex === index ? null : index); };

  return (
    <>
    <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
        .bg-grid-pattern { background-color: #f8fafc; background-image: linear-gradient(rgba(3, 186, 190, 0.06) 1px, transparent 1px), linear-gradient(to right, rgba(3, 186, 190, 0.06) 1px, transparent 1px); background-size: 3.5rem 3.5rem; }
    `}</style>
    <motion.section 
      className="py-24 lg:py-32 bg-grid-pattern font-['Poppins',_sans-serif] relative"
      initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.1 }} variants={sectionVariants}
    >
      <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full -z-10" />
      <div className="container mx-auto px-6">
        <motion.div className="text-center mb-16 lg:mb-20" variants={faqItemVariants}>
          <h2 className={`text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-4`}>
            Gyakran Ismételt <span className={accentColor.text}>Kérdések</span>
          </h2>
          <p className={`text-xl text-slate-600 max-w-3xl mx-auto`}>Válaszok a leggyakoribb munka- és tűzvédelemmel kapcsolatos kérdésekre.</p>
        </motion.div>

        <div className="max-w-3xl mx-auto space-y-5">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <motion.div
                key={index} variants={faqItemVariants}
                className={`rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out border overflow-hidden backdrop-blur-md
                            ${isOpen ? `bg-white/80 ${accentColor.borderLightOpen} ring-4 ${accentColor.ringLightOpen}` : 'bg-white/60 border-transparent'}`}
              >
                <motion.button
                  onClick={() => toggleItem(index)}
                  className={`w-full flex justify-between items-center p-5 sm:p-6 text-left focus:outline-none ${accentColor.ring} focus-visible:ring-offset-2 group ${accentColor.questionBgHover} transition-colors duration-150`}
                  aria-expanded={isOpen} whileTap={{ scale: 0.98 }}
                >
                  <span className={`flex items-center text-md sm:text-lg font-semibold transition-colors duration-200 ${isOpen ? accentColor.textDark : `text-slate-800 ${accentColor.textHover}`}`}>
                    {item.isImportant && (
                        <motion.span 
                            className="mr-3"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1, transition: { delay: 0.3, type: 'spring', stiffness: 200, damping: 10 } }}
                        >
                            <ExclamationCircleIcon className="w-6 h-6 text-red-500/80" />
                        </motion.span>
                    )}
                    {item.question}
                  </span>
                  <motion.div
                    className={`ml-4 flex-shrink-0 p-2 ${isOpen ? 'bg-cyan-100/80' : 'bg-slate-100/80'} ${accentColor.iconBgHover} rounded-full shadow-sm group-hover:shadow-md transition-all duration-200`}
                    whileHover={{scale:1.1}}
                  >
                    <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ease-in-out ${isOpen ? `transform rotate-180 ${accentColor.iconOpen}` : `text-gray-500 ${accentColor.iconHover}`}`} />
                  </motion.div>
                </motion.button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div key="content" initial="hidden" animate="visible" exit="hidden" variants={answerVariants} className="overflow-hidden">
                      <div className="px-6 pb-6 pt-2 text-slate-700 leading-relaxed prose prose-cyan max-w-none">
                        <p>{item.answer}</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div> 
            );
          })}
        </div>

        <motion.div className="text-center mt-16 lg:mt-20" variants={faqItemVariants}>
            <p className="text-lg text-slate-600 mb-6">Nem találta a választ? Vegye fel velünk a kapcsolatot!</p>
            <motion.div whileHover={{ scale: 1.05, y: -5 }} whileTap={{ scale: 0.98 }} >
                <Link href="/kapcsolat" 
                    className={`inline-block bg-[#03BABE] hover:bg-cyan-600 text-white font-semibold py-4 px-10 rounded-xl text-lg shadow-lg shadow-cyan-500/30 hover:shadow-cyan-500/50 transition-all duration-300 ease-in-out focus:outline-none focus:ring-4 ${accentColor.ring} focus:ring-offset-2`}
                >
                    Kapcsolatfelvétel
                </Link>
            </motion.div>
        </motion.div>
      </div>
    </motion.section>
    </>
  );
};

export default FaqAccordion;