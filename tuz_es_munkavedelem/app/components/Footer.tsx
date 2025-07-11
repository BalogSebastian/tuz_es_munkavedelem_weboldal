// components/Footer.tsx
'use client'; // Marad a 'use client' direktíva, mert Canvas animációt tartalmaz!

import React, { useRef, useEffect } from 'react';
import { motion, Variants, useScroll, useTransform, useMotionValue } from 'framer-motion';
import {
  PhoneIcon,
  EnvelopeIcon,
  MapPinIcon,
  BuildingOfficeIcon,
  ShieldCheckIcon,
  BookOpenIcon,
  ScaleIcon, // Ezt az ikont nem használtad, de itt hagytam, ha valaha mégis kellene
  SparklesIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';

// --- SZÍNPALETTA ÉS KONSTANSOK ---
const accentColor = {
  base: '#03BABE',
  baseRgb: '3, 186, 190',
  bg: 'bg-[#03BABE]',
  hoverBg: 'hover:bg-cyan-600',
  text: 'text-[#03BABE]',
  lightText: 'text-cyan-200',
  darkBg: 'bg-slate-900',
  gradient: 'bg-gradient-to-r from-cyan-400 to-teal-500',
  gridLines: 'rgba(3, 186, 190, 0.08)',
  contactHoverBg: 'bg-white/5',
};

// --- GLOBÁLIS ANIMÁCIÓS VARIÁNSOK ---
const footerVariants: Variants = {
  hidden: { opacity: 0, y: 80 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.85, 0.45, 1],
      delayChildren: 0.4,
      staggerChildren: 0.15,
    },
  },
};

const sectionItemVariants: Variants = {
  hidden: { opacity: 0, y: 40, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

const linkItemVariants: Variants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
};

// --- CTA GOMB ANIMÁCIÓK ---
const buttonGlowStyles = {
    boxShadow: [
        `0 0 10px rgba(${accentColor.baseRgb}, 0.3)`,
        `0 0 20px rgba(${accentColor.baseRgb}, 0.5)`,
        `0 0 30px rgba(${accentColor.baseRgb}, 0.6)`,
        `0 0 20px rgba(${accentColor.baseRgb}, 0.5)`,
        `0 0 10px rgba(${accentColor.baseRgb}, 0.3)`,
    ],
};

const buttonGlowTransition = {
    duration: 4,
    repeat: Infinity,
    ease: "easeInOut"
};

// --- HÁTTÉR ANIMÁCIÓ (PONT ÉS VONAL) ---
class Particle {
    x: number; y: number; z: number;
    vx: number; vy: number; vz: number;
    baseAlpha: number;

    constructor(canvasWidth: number, canvasHeight: number, maxDepth: number) {
        this.x = Math.random() * canvasWidth;
        this.y = Math.random() * canvasHeight;
        this.z = Math.random() * maxDepth;
        this.vx = (Math.random() - 0.5) * 0.1; // Nagyon lassú mozgás
        this.vy = (Math.random() - 0.5) * 0.1;
        this.vz = (Math.random() - 0.5) * 0.01;
        this.baseAlpha = 0.08 + Math.random() * 0.1; // Nagyon finom áttetszőség
    }

    update(scrollFactor: number, mouseX: number, mouseY: number, repelRadius: number, canvasWidth: number, canvasHeight: number, maxDepth: number) {
        // Finom görgetés-alapú parallax
        this.y += this.vy + scrollFactor * 0.05;
        this.x += this.vx;
        this.z += this.vz;

        // Egér taszító hatás
        const dxMouse = this.x - mouseX;
        const dyMouse = this.y - mouseY;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < repelRadius) {
            const force = (repelRadius - distMouse) / repelRadius;
            this.x += (dxMouse / distMouse) * force * 0.05;
            this.y += (dyMouse / distMouse) * force * 0.05;
        }

        // Részecskék "újrahasznosítása" a képernyőn kívül
        if (this.y > canvasHeight + 50) this.y = -50;
        if (this.x > canvasWidth + 50) this.x = -50;
        if (this.y < -50) this.y = canvasHeight + 50;
        if (this.x < -50) this.x = canvasWidth + 50;
        if (this.z < 0) this.z = 0;
        if (this.z > maxDepth) this.z = maxDepth;
    }

    draw(ctx: CanvasRenderingContext2D, fov: number) {
        // Ellenőrizze, hogy a ctx létezik-e, mielőtt használná
        if (!ctx) return; 

        const perspective = fov / (fov + this.z);
        const x = this.x * perspective;
        const y = this.y * perspective;
        const radius = perspective * 1.5;

        ctx.beginPath();
        ctx.arc(x, y, radius, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(${accentColor.baseRgb}, ${this.baseAlpha * perspective})`;
        ctx.fill();
    }
}

// JAVÍTVA: A hook paraméterei elfogadják a null-t.
const useFooterBackgroundAnimation = (canvasRef: React.RefObject<HTMLCanvasElement | null>, footerRef: React.RefObject<HTMLElement | null>) => {
    useEffect(() => {
        const canvas = canvasRef.current;
        const footerElement = footerRef.current;
        if (!canvas || !footerElement) return;

        // JAVÍTVA: Eltávolítva a willReadFrequently: true, ami lassíthatja. alpha: true maradt.
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        const particles: Particle[] = [];
        const fov = 150;
        const maxDepth = 200;
        // JAVÍTVA: Csökkentett részecskeszám a jobb teljesítményért
        const particleCount = 30; // Eredetileg 40
        const repelRadius = 100;

        let mouseX = 0;
        let mouseY = 0;

        const setCanvasSize = () => {
            if (!footerElement) return; // Második ellenőrzés a függvényen belül
            const dpr = window.devicePixelRatio || 1;
            canvas.width = footerElement.clientWidth * dpr;
            canvas.height = footerElement.clientHeight * dpr;
            canvas.style.width = `${footerElement.clientWidth}px`;
            canvas.style.height = `${footerElement.clientHeight}px`;
            ctx.scale(dpr, dpr);
        };

        const init = () => {
            particles.length = 0;
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas.width, canvas.height, maxDepth));
            }
        };

        setCanvasSize();
        init();

        const connect = () => {
            ctx.beginPath();
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

                    if (dist < 100) {
                        const opacity = Math.max(0, 0.5 - dist / 200);
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(${accentColor.baseRgb}, ${opacity * Math.min(p1.baseAlpha, p2.baseAlpha)})`;
                    }
                }
            }
            ctx.lineWidth = 0.5;
            ctx.stroke();
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!footerElement) return; // Fontos ellenőrzés itt is
            const rect = footerElement.getBoundingClientRect();
            mouseX = e.clientX - rect.left;
            mouseY = e.clientY - rect.top;
        };

        const handleResize = () => {
            // Hozzáadtam ezt a null ellenőrzést, mielőtt a setCanvasSize-t hívjuk resize esetén is.
            if (!canvasRef.current || !footerRef.current) return; 
            setCanvasSize();
            init();
        };

        footerElement.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        const animateCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const scrollY = window.scrollY;
            const footerTop = footerElement.offsetTop;
            const footerHeight = footerElement.clientHeight;
            const viewportHeight = window.innerHeight;

            let scrollFactor = 0;
            if (scrollY + viewportHeight > footerTop && scrollY < footerTop + footerHeight) {
                const scrollProgress = (scrollY + viewportHeight - footerTop) / (viewportHeight + footerHeight);
                scrollFactor = scrollProgress * 0.05;
            }

            particles.forEach(p => p.update(scrollFactor, mouseX, mouseY, repelRadius, canvas.width, canvas.height, maxDepth));
            connect();
            particles.forEach(p => p.draw(ctx, fov));

            animationFrameId = requestAnimationFrame(animateCanvas);
        };

        animateCanvas();

        return () => {
            cancelAnimationFrame(animationFrameId);
            footerElement.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, [canvasRef, footerRef]); // footerRef is dependency, hogy frissüljön a hook ha változik a ref
};


// --- FŐ KOMPONENS ---
const Footer: React.FC = () => {
  const footerRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useFooterBackgroundAnimation(canvasRef, footerRef);

  const logoTextPart1 = "Tűz";
  const logoTextPart2 = "És";
  const logoTextPart3 = "Munka";
  const logoTextPart4 = "védelem";

  return (
    <>
      <style>{`
        /* A betűtípus importálását eltávolítottuk, a layout.tsx kezeli. */
        .footer-grid-pattern {
            background-image: linear-gradient(${accentColor.gridLines} 1px, transparent 1px),
                              linear-gradient(to right, ${accentColor.gridLines} 1px, transparent 1px);
            background-size: 3.5rem 3.5rem;
        }
        .text-glow-shadow {
            text-shadow: 0 0 8px rgba(${accentColor.baseRgb}, 0.6), 0 0 15px rgba(${accentColor.baseRgb}, 0.4);
        }
        .text-gradient {
            background: linear-gradient(to right, ${accentColor.lightText}, ${accentColor.base});
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent; /* Fallback for non-webkit */
        }
      `}</style>
      <motion.footer
        ref={footerRef}
        className={`relative ${accentColor.darkBg} text-slate-300 py-16 sm:py-20 font-['Poppins',_sans-serif] overflow-hidden`}
        variants={footerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {/* Háttér rács és ANIMÁLT PONTOK/VONALAK (Canvas) */}
        <div className="absolute inset-0 footer-grid-pattern z-0 opacity-10"></div>
        <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-50"></canvas>

        {/* Lebegő Kiemelő Buborék 1 */}
        <motion.div
            className="absolute top-1/4 left-1/4 w-72 h-72 bg-cyan-400/5 rounded-full filter blur-3xl -z-10"
            animate={{ x: [0, 50, 0], y: [0, -30, 0], rotate: [0, 180, 360] }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        ></motion.div>
        {/* Lebegő Kiemelő Buborék 2 */}
        <motion.div
            className="absolute bottom-1/3 right-1/4 w-60 h-60 bg-teal-400/5 rounded-xl filter blur-3xl -z-10"
            animate={{ x: [0, -40, 0], y: [0, 20, 0], rotate: [0, -180, -360] }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear", delay: 5 }}
        ></motion.div>
        {/* Új, pulzáló fénykör a háttérben */}
        <motion.div
            className="absolute inset-0 flex items-center justify-center -z-10"
            animate={{ opacity: [0.05, 0.15, 0.05] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        >
            <div className="w-1/2 h-1/2 bg-gradient-to-br from-cyan-500/10 to-teal-500/0 rounded-full filter blur-3xl"></div>
        </motion.div>

        {/* Lebegő Biztonsági Pajzs Ikon */}
        <motion.div
            className="absolute top-8 right-8 lg:top-12 lg:right-12 w-24 h-24 lg:w-32 lg:h-32 text-cyan-400/20 opacity-30 -z-10 hidden md:block"
            animate={{
                y: [0, 10, 0],
                rotate: [0, 5, 0],
                scale: [1, 1.05, 1],
            }}
            transition={{
                duration: 10,
                repeat: Infinity,
                repeatType: 'mirror',
                ease: 'easeInOut'
            }}
            variants={sectionItemVariants}
        >
             <ShieldCheckIcon className="w-full h-full text-glow-shadow" />
        </motion.div>


        <div className="container mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 sm:gap-y-16 gap-x-12">
            {/* Cég Logó és Rövid Leírás */}
            <motion.div className="md:col-span-2 lg:col-span-1" variants={sectionItemVariants}>
              <Link href="/" className="font-bold text-3xl tracking-wider mb-4 block text-gradient">
                {/* Logó szöveg animálva szavanként */}
                <motion.span
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8, type: 'spring', stiffness: 100 }}
                    className={accentColor.lightText}
                >
                    {logoTextPart1}
                </motion.span>
                <motion.span
                    className="text-white mx-0.5"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8, duration: 0.6, ease: 'easeOut' }}
                >
                    {logoTextPart2}
                </motion.span>
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.8, type: 'spring', stiffness: 100 }}
                    className={accentColor.lightText}
                >
                    {logoTextPart3}
                </motion.span>
                <motion.span
                    className="text-white"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.4, duration: 0.6, ease: 'easeOut' }}
                >
                    {logoTextPart4}
                </motion.span>
              </Link>
              <p className="text-base text-slate-400 leading-relaxed max-w-xs sm:max-w-none">
                Szakértő megoldások tűz- és munkavédelemben. Gondoskodunk a biztonságról, hogy Ön a növekedésre fókuszálhasson.
              </p>
            </motion.div>

            {/* Gyorslinkek */}
            <motion.div variants={sectionItemVariants}>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <BookOpenIcon className={`w-6 h-6 mr-3 ${accentColor.text}`} />
                Gyorslinkek
              </h3>
              <ul className="space-y-3 text-slate-400 text-base">
                <motion.li variants={linkItemVariants}><Link href="/#bemutatkozas" className="hover:text-white transition-colors duration-200">Bemutatkozás</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/#szolgaltatasok" className="hover:text-white transition-colors duration-200">Szolgáltatások</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/#folyamat" className="hover:text-white transition-colors duration-200">Folyamatunk</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/#eredmenyek" className="hover:text-white transition-colors duration-200">Eredmények</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/#gyik" className="hover:text-white transition-colors duration-200">GYIK</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/kapcsolat" className="hover:text-white transition-colors duration-200">Kapcsolat</Link></motion.li>
              </ul>
            </motion.div>

            {/* Szolgáltatások kiemelése */}
            <motion.div variants={sectionItemVariants}>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <ShieldCheckIcon className={`w-6 h-6 mr-3 ${accentColor.text}`} />
                Kiemelt Szolgáltatások
              </h3>
              <ul className="space-y-3 text-slate-400 text-base">
                <motion.li variants={linkItemVariants}><Link href="/szolgaltatasok/kockazatertekeles" className="hover:text-white transition-colors duration-200">Kockázatértékelés</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/szolgaltatasok/munkavedelem" className="hover:text-white transition-colors duration-200">Munkavédelem</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/szolgaltatasok/tuzvedelem" className="hover:text-white transition-colors duration-200">Tűzvédelem</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/szolgaltatasok/haccp" className="hover:text-white transition-colors duration-200">HACCP Rendszer</Link></motion.li>
                <motion.li variants={linkItemVariants}><Link href="/szolgaltatasok/oktatas" className="hover:text-white transition-colors duration-200">Oktatások</Link></motion.li>
              </ul>
            </motion.div>

            {/* Kapcsolat Infók és CTA */}
            <motion.div variants={sectionItemVariants}>
              <h3 className="text-xl font-semibold text-white mb-6 flex items-center">
                <PhoneIcon className={`w-6 h-6 mr-3 ${accentColor.text}`} />
                Kapcsolat
              </h3>
              <address className="not-italic space-y-3 text-slate-400 text-base mb-8">
                {/* Interaktív kapcsolati sorok */}
                <motion.p
                    whileHover={{ x: 5, backgroundColor: accentColor.contactHoverBg }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex items-center p-2 -ml-2 rounded-lg transition-colors duration-200"
                >
                  <EnvelopeIcon className="w-5 h-5 mr-3 text-cyan-400" />
                  <a href="mailto:info@markjani.hu" className="hover:text-white transition-colors duration-200">info@markjani.hu</a>
                </motion.p>
                <motion.p
                    whileHover={{ x: 5, backgroundColor: accentColor.contactHoverBg }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex items-center p-2 -ml-2 rounded-lg transition-colors duration-200"
                >
                  <PhoneIcon className="w-5 h-5 mr-3 text-cyan-400" />
                  <a href="tel:+36209791719" className="hover:text-white transition-colors duration-200 whitespace-nowrap">+36 20 979 17 19</a>
                </motion.p>
                <motion.p
                    whileHover={{ x: 5, backgroundColor: accentColor.contactHoverBg }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex items-start p-2 -ml-2 rounded-lg transition-colors duration-200"
                >
                  <MapPinIcon className="w-5 h-5 mr-3 mt-1 text-cyan-400 flex-shrink-0" />
                  <span>4031 Debrecen, István út 140.</span>
                </motion.p>
                <motion.p
                    whileHover={{ x: 5, backgroundColor: accentColor.contactHoverBg }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="flex items-center p-2 -ml-2 rounded-lg transition-colors duration-200"
                >
                  <BuildingOfficeIcon className="w-5 h-5 mr-3 text-cyan-400" />
                  <span>JaniMark Kft.</span>
                </motion.p>
              </address>

              {/* Emelt, animált CTA gomb terület */}
              <motion.div
                className="mt-8 relative p-1 rounded-xl bg-gradient-to-br from-cyan-500/10 to-teal-500/0 shadow-xl ring-1 ring-cyan-500/20 backdrop-blur-sm"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
                whileHover={{ scale: 1.03, boxShadow: `0 0 40px rgba(${accentColor.baseRgb}, 0.4)` }}
              >
                 <Link href="/#ajanlatkeres">
                    <motion.button
                        className={`
                            relative inline-flex items-center justify-center w-full
                            ${accentColor.gradient} text-white
                            font-bold py-3 px-8 rounded-xl text-lg
                            shadow-inner shadow-black/20
                            transition-all duration-300 ease-in-out
                            focus:outline-none focus:ring-4 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-slate-900
                            hover:shadow-xl hover:shadow-cyan-500/50
                        `}
                        animate={buttonGlowStyles}
                        transition={buttonGlowTransition}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98, y: 0 }}
                    >
                        <SparklesIcon className="w-6 h-6 mr-3 text-yellow-300 animate-pulse" />
                        Ingyenes Ajánlatkérés
                    </motion.button>
                 </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Alsó sáv (Copyright, Jogi infók) */}
          <motion.div
            className="border-t border-slate-700/60 pt-8 mt-12 text-center text-xs text-slate-500"
            variants={sectionItemVariants}
          >
            <p>&copy; {new Date().getFullYear()} JaniMark Kft. Minden jog fenntartva.</p>
            <div className="mt-2 flex flex-col sm:flex-row justify-center items-center space-y-1 sm:space-y-0 sm:space-x-4">
              <Link href="/adatvedelmi-nyilatkozat" className="hover:text-white transition-colors duration-200">Adatvédelmi Nyilatkozat</Link>
              <Link href="/aszf" className="hover:text-white transition-colors duration-200">Általános Szerződési Feltételek</Link>
            </div>
          </motion.div>
        </div>
      </motion.footer>
    </>
  );
};

export default Footer;