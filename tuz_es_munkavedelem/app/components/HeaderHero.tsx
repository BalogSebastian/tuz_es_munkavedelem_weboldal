'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import {
    ArrowRightIcon,
    FireIcon,
    DocumentCheckIcon,
    ExclamationTriangleIcon
} from '@heroicons/react/24/solid';
import Link from 'next/link';

// --- STÍLUS ÉS KONFIGURÁCIÓS KONSTANSOK ---

const ACCENT_COLOR = {
    baseHex: '#03BABE',
    baseRgb: '3, 186, 190',
    bg: 'bg-[#03BABE]',
    hoverBg: 'hover:bg-cyan-600',
    ring: 'focus-visible:ring-cyan-500',
    textOnAccent: 'text-white',
    textDark: 'text-cyan-800',
    textLight: 'text-cyan-300',
};

const ANIMATION_VARIANTS = {
    sentence: {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.08, delayChildren: 0.8 },
        },
    },
    word: {
        hidden: { opacity: 0, y: 25, filter: 'blur(10px)' },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: { type: 'spring', stiffness: 120, damping: 20 },
        },
    },
};

// --- RÉSZECSKE OSZTÁLY (VÁLTOZATLAN) ---
class Particle {
    x: number; y: number; z: number;
    vx: number; vy: number; vz: number;
    iconPath: Path2D;
    trail: { x: number, y: number, z: number }[];
    baseAlpha: number;

    constructor(canvasWidth: number, canvasHeight: number, iconPaths: Record<string, Path2D>, maxDepth: number) {
        this.x = (Math.random() - 0.5) * canvasWidth;
        this.y = (Math.random() - 0.5) * canvasHeight;
        this.z = Math.random() * maxDepth;
        this.vx = (Math.random() - 0.5) * 1.5;
        this.vy = (Math.random() - 0.5) * 1.5;
        this.vz = (Math.random() - 0.5) * 0.2;
        const iconTypes = Object.keys(iconPaths);
        this.iconPath = iconPaths[iconTypes[Math.floor(Math.random() * iconTypes.length)]];
        this.trail = [];
        this.baseAlpha = 0.3 + Math.random() * 0.5;
    }
    project(fov: number, canvasCenter: { x: number, y: number }): { x: number, y: number, scale: number } {
        const perspective = fov / (fov + this.z);
        return {
            x: canvasCenter.x + this.x * perspective,
            y: canvasCenter.y + this.y * perspective,
            scale: perspective
        };
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

        this.vx -= this.x * centerPull;
        this.vy -= this.y * centerPull;
        this.vx *= 0.97;
        this.vy *= 0.97;
        this.vz *= 0.99;
        this.x += this.vx;
        this.y += this.vy;
        this.z += this.vz;

        if (this.z < 0) { this.z = 0; this.vz *= -1; }
        if (this.z > maxDepth) { this.z = maxDepth; this.vz *= -1; }
        this.trail.push({ x: this.x, y: this.y, z: this.z });
        if (this.trail.length > 8) this.trail.shift();
    }

    draw(ctx: CanvasRenderingContext2D, fov: number, canvasCenter: {x: number, y: number}) {
        const proj = this.project(fov, canvasCenter);
        if (proj.x < 0 || proj.x > canvasCenter.x * 2 || proj.y < 0 || proj.y > canvasCenter.y * 2) return;

        const alpha = this.baseAlpha * proj.scale;

        ctx.shadowColor = `rgba(${ACCENT_COLOR.baseRgb}, ${alpha * 0.8})`;
        ctx.shadowBlur = 8;


        if (this.trail.length > 1) {
            ctx.beginPath();
            const firstProj = new Particle(0,0,{},0).project.call({ ...this.trail[0] }, fov, canvasCenter);
            ctx.moveTo(firstProj.x, firstProj.y);
            for(let i = 1; i < this.trail.length; i++) {
                const currentProj = new Particle(0,0,{},0).project.call({ ...this.trail[i] }, fov, canvasCenter);
                ctx.lineTo(currentProj.x, currentProj.y);
            }
            ctx.strokeStyle = `rgba(${ACCENT_COLOR.baseRgb}, ${alpha * 0.4})`;
            ctx.lineWidth = proj.scale * 1.2;
            ctx.stroke();
        }

        ctx.save();
        ctx.translate(proj.x, proj.y);
        ctx.scale(proj.scale * 1.4, proj.scale * 1.4);
        ctx.translate(-12, -12);
        ctx.fillStyle = `rgba(${ACCENT_COLOR.baseRgb}, ${alpha})`;
        ctx.fill(this.iconPath);
        ctx.restore();

        ctx.shadowBlur = 0;
    }
}

// --- EGYEDI HOOK A VÁSZON ANIMÁCIÓHOZ (VÁLTOZATLAN) ---
function useInteractiveConstellation(canvasRef: React.RefObject<HTMLCanvasElement>) {
    useEffect(() => {
        const iconPaths = {
            fire: new Path2D('M10.828 6.722L10 3L6 14.072A1.996 1.996 0 014 15a2 2 0 11-4 0c0-.898.447-1.716 1.172-2.181L10 0l-3 10h5l-2.457-8.19A3 3 0 0110 3v-.072c-.066-.462-.123-.92-.172-1.372a.001.001 0 00-.001-.001L10 0V.001z'), // Tűz ikon
            check: new Path2D('M9 22l-7-7 2-2 5 5 11-11 2 2z'),
            secure: new Path2D('M12 2L4.5 5v6c0 5.55 3.84 10.74 7.5 12 3.66-1.26 7.5-6.45 7.5-12V5L12 2z')
        };

        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return;

        let animationFrameId: number;
        const particles: Particle[] = [];
        const mouse = { x: 9999, y: 9999 };
        const fov = 350;
        const maxDepth = 450;
        const repelRadius = 160;
        const repelStrength = 0.6;
        const centerPull = 0.0002;

        let canvasCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

        const setCanvasSize = () => {
            const dpr = window.devicePixelRatio || 1;
            canvas.width = window.innerWidth * dpr;
            canvas.height = window.innerHeight * dpr;
            canvas.style.width = `${window.innerWidth}px`;
            canvas.style.height = `${window.innerHeight}px`;
            ctx.scale(dpr, dpr);
            canvasCenter = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        };

        const init = () => {
            particles.length = 0;
            const particleCount = Math.floor(window.innerWidth / 22);
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle(canvas.width, canvas.height, iconPaths, maxDepth));
            }
        };
        setCanvasSize();
        init();

        const connect = () => {
            ctx.shadowColor = `rgba(${ACCENT_COLOR.baseRgb}, 0.5)`;
            ctx.shadowBlur = 5;

            ctx.beginPath();
            for (let i = 0; i < particles.length; i++) {
                for (let j = i + 1; j < particles.length; j++) {
                    const p1 = particles[i];
                    const p2 = particles[j];
                    const dist = Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2) + Math.pow(p1.z - p2.z, 2));

                    if (dist < 180) {
                        const p1Proj = p1.project(fov, canvasCenter);
                        const p2Proj = p2.project(fov, canvasCenter);
                        const opacity = Math.max(0, 1 - dist / 180);
                        ctx.moveTo(p1Proj.x, p1Proj.y);
                        ctx.lineTo(p2Proj.x, p2Proj.y);
                        ctx.strokeStyle = `rgba(${ACCENT_COLOR.baseRgb}, ${opacity * p1Proj.scale * p2Proj.scale * 0.4})`;
                    }
                }
            }
            ctx.lineWidth = 0.7;
            ctx.stroke();
            ctx.shadowBlur = 0;
        };

        let auroraAngle = 0;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            auroraAngle += 0.002;
            
            const pulse = 1 + Math.sin(auroraAngle) * 0.05;
            const gradient = ctx.createRadialGradient(
                canvasCenter.x, canvasCenter.y, 0,
                canvasCenter.x, canvasCenter.y, Math.max(canvasCenter.x, canvasCenter.y) * 1.2 * pulse
            );
            gradient.addColorStop(0, `rgba(${ACCENT_COLOR.baseRgb}, 0.15)`);
            gradient.addColorStop(0.3, `rgba(13, 48, 77, 0.1)`);
            gradient.addColorStop(1, `rgba(8, 20, 39, 0)`);
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            particles.sort((a, b) => b.z - a.z);

            particles.forEach(p => {
                p.update(mouse, repelRadius, repelStrength, maxDepth, window.innerWidth, window.innerHeight, centerPull);
                p.draw(ctx, fov, canvasCenter);
            });

            connect();
            animationFrameId = requestAnimationFrame(animate);
        };
        animate();

        const handleMouseMove = (e: MouseEvent) => { mouse.x = e.clientX; mouse.y = e.clientY; };
        const handleResize = () => { setCanvasSize(); init(); };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [canvasRef]);
}


// --- FŐ KOMPONENS (MÓDOSÍTOTT) ---
const HeaderHero = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // @ts-ignore
    useInteractiveConstellation(canvasRef);

    const mainHeadline = "Biztonság. Megfelelőség. Nyugalom.";
    const mainHeadlineWords = mainHeadline.split(" ");
    const headlineDurationEstimate = 0.8 + mainHeadlineWords.length * 0.08 + 0.8;
    const todoListText = "Eddig megvan: Ügyfél értékelések áthelyezése, Készen áll a biztonságra? - áthelyezése, Főbb szolgáltatások (4 kocka), Eredményeink módosítása, Anyagaink letöltése (3db kell), Kérdőív szélesebbre húzása, Pajzs Matrica csere, Készen áll a következő lépésre nem kell, Question1 elkészítése, PajzsMatrica , TűzésMunkavédelmiSzaki oldalnév.";


    return (
        <>
            <style>
                {`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
                .cta-glow {
                  box-shadow: 0 0 15px ${ACCENT_COLOR.baseHex}40, 0 0 30px ${ACCENT_COLOR.baseHex}30, inset 0 0 10px ${ACCENT_COLOR.baseHex}20;
                }
                /* Statikus "csillagpor" háttér textúra */
                .bg-star-noise::before {
                  content: '';
                  position: absolute;
                  top: 0; left: 0; right: 0; bottom: 0;
                  background-image: url('data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800"%3E%3Crect fill="%230f172a" width="800" height="800"/%3E%3Cg fill-opacity="0.15"%3E%3Ccircle fill="%2303BABE" cx="400" cy="400" r="100"/%3E%3Ccircle fill="%231e293b" cx="400" cy="400" r="30"/%3E%3Ccircle fill="%23e2e8f0" cx="100" cy="100" r="5"/%3E%3Ccircle fill="%23e2e8f0" cx="700" cy="100" r="5"/%3E%3Ccircle fill="%23e2e8f0" cx="100" cy="700" r="5"/%3E%3Ccircle fill="%23e2e8f0" cx="700" cy="700" r="5"/%3E%3Ccircle fill="%23e2e8f0" cx="250" cy="250" r="2"/%3E%3Ccircle fill="%23e2e8f0" cx="550" cy="250" r="2"/%3E%3Ccircle fill="%23e2e8f0" cx="250" cy="550" r="2"/%3E%3Ccircle fill="%23e2e8f0" cx="550" cy="550" r="2"/%3E%3C/g%3E%3C/svg%3E');
                  background-size: 400px;
                  opacity: 0.2;
                  z-index: -1;
                }
                `}
            </style>
            {/* ===== MÓDOSÍTÁS: A fő konténer kap egy padding-top-ot a fix navbar miatt ===== */}
            <div className="min-h-screen w-screen flex flex-col text-white antialiased relative overflow-hidden bg-slate-900 font-['Poppins',_sans-serif] bg-star-noise pt-[60px]">
                {/* Fixed Header/Navbar - EZ MARAD RÖGZÍTVE */}
                <div className="fixed top-0 left-0 right-0 bg-slate-900/50 backdrop-blur-lg py-3 px-4 sm:px-6 flex items-center justify-between text-sm shadow-xl z-50">
                    <div className="font-bold text-lg tracking-wider">
                        <span className={ACCENT_COLOR.textLight}>munka</span><span className="text-white"></span><span className={ACCENT_COLOR.textLight}>védelmi</span><span className="text-white">szaki</span>
                    </div>
                    <div className="hidden md:flex items-center gap-6 font-medium text-slate-300">
                        <a href="mailto:markjani@janimark.hu" className="hover:text-cyan-300 transition-colors duration-300">info@markjani.hu</a>
                        <a href="tel:+36209791719" className="hover:text-cyan-300 transition-colors duration-300 whitespace-nowrap">+36 20 979 17 19</a>
                    </div>
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Link
                            href="https://calendly.com/"
                            className={`
                            ${ACCENT_COLOR.bg} ${ACCENT_COLOR.hoverBg} ${ACCENT_COLOR.textOnAccent}
                            font-bold py-2.5 px-5 rounded-lg text-sm
                            transition-all duration-300 ease-in-out
                            focus:outline-none focus-visible:ring-2 ${ACCENT_COLOR.ring}
                            `}
                        >
                            Ajánlatkérés
                        </Link>
                    </motion.div>
                </div>

                {/* ===== MÓDOSÍTÁS: A "fixed" és "top-[60px]" eltávolítva, így a sávok görgethetővé válnak ===== */}
                <div className="w-full z-40 flex flex-col"> 
                    
                    {/* Eredeti Disclaimer Sáv - NAGYOBB MÉRET */}
                    <div className="bg-red-800 py-4 px-4 sm:px-6 lg:px-8 shadow-md">
                        <div className="max-w-full mx-auto flex items-center justify-center text-center">
                            <motion.div
                                className="flex items-center space-x-3"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: 'easeOut', delay: 1 }}
                            >
                                <ExclamationTriangleIcon className="h-7 w-7 sm:h-8 sm:w-8 text-white animate-pulse" />
                                <p className="text-white font-bold text-lg sm:text-xl md:text-2xl animate-pulse">
                                    Hamarosan elkészül a felületünk. Addig is türelmüket köszönjük!
                                    <br className="sm:hidden" />
                                    <span className="block mt-1 sm:inline sm:ml-2">Státusz változik: Július 13. 23:59-kor</span>
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* ÚJ Disclaimer Sáv - NAGYOBB MÉRET */}
                     <div className="bg-red-800/80 backdrop-blur-sm py-2 px-4 sm:px-6 lg:px-8 shadow-md border-t border-red-700/50">
                        <div className="max-w-full mx-auto flex items-center justify-center text-center">
                            <motion.div
                                className="flex items-center space-x-3"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, ease: 'easeOut', delay: 1.2 }}
                            >
                                <DocumentCheckIcon className="h-6 w-6 text-white flex-shrink-0" />
                                <p className="text-white font-mono text-sm sm:text-base">
                                    {todoListText}
                                </p>
                            </motion.div>
                        </div>
                    </div>
                </div>


                {/* ===== MÓDOSÍTÁS: A "pt-20" eltávolítva, mert a szülő kapott padding-et ===== */}
                <div className="flex-grow flex flex-col items-center justify-center p-4 sm:p-8 text-center relative">
                    <canvas ref={canvasRef} className="absolute top-0 left-0 w-full h-full z-0" />
                    <div className="max-w-5xl relative z-10 flex flex-col items-center">
                        <motion.div
                            animate={{
                                y: [0, -8, 0],
                                scale: [1, 1.03, 1],
                            }}
                            transition={{
                                duration: 4,
                                ease: "easeInOut",
                                repeat: Infinity,
                            }}
                        >
                            <motion.div
                                className="mb-6 p-4 bg-white/10 rounded-full shadow-2xl ring-1 ring-white/10 backdrop-blur-sm"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ type: "spring", stiffness: 150, damping: 15, delay: 0.5 }}
                            >
                                <FireIcon className="w-14 h-14 sm:w-16 sm:h-16 text-cyan-300" />
                            </motion.div>
                        </motion.div>


                        <motion.h1
                            className="text-5xl sm:text-7xl md:text-8xl font-black mb-6 leading-tight tracking-tighter text-white"
                            variants={ANIMATION_VARIANTS.sentence}
                            initial="hidden"
                            animate="visible"
                        >
                            {mainHeadlineWords.map((word, index) => (
                                <motion.span key={index} className="inline-block mr-[0.25em]" variants={ANIMATION_VARIANTS.word}>
                                    {word}
                                </motion.span>
                            ))}
                        </motion.h1>

                        <motion.p
                            className="text-lg md:text-xl mb-12 text-slate-300 max-w-3xl font-medium"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: headlineDurationEstimate, ease: "easeOut" }}
                        >
                            Levesszük válláról a tűz- és munkavédelem komplex terheit. Szakértő megoldásainkkal garantáljuk a jogszabályi megfelelést, hogy Ön nyugodtan a növekedésre koncentrálhasson.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: headlineDurationEstimate + 0.2, ease: "easeOut" }}
                            className="flex flex-col sm:flex-row justify-center items-center gap-5 sm:gap-6"
                        >
                            <motion.button
                                whileHover={{ scale: 1.03, y: -4 }}
                                whileTap={{ scale: 0.98, y: 0 }}
                                className={`inline-flex items-center gap-3 ${ACCENT_COLOR.bg} ${ACCENT_COLOR.textOnAccent} font-bold py-4 px-8 rounded-xl text-lg shadow-lg cta-glow transition-all duration-300 ease-in-out focus:outline-none focus-visible:ring-2 ${ACCENT_COLOR.ring} focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900`}
                            >
                                <DocumentCheckIcon className="w-6 h-6" />
                                Ingyenes Konzultáció Kérése
                            </motion.button>
                            <motion.a
                                href="/#szolgaltatasok"
                                whileHover={{ scale: 1.05, y: -4 }}
                                whileTap={{ scale: 0.95, y: 0 }}
                                className="inline-flex items-center gap-2.5 bg-white/10 hover:bg-white/15 border border-transparent hover:border-cyan-400/50 text-slate-200 font-semibold py-4 px-7 rounded-xl transition-all duration-300"
                            >
                                Szolgáltatásaink
                                <motion.span animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}>
                                    <ArrowRightIcon className="w-5 h-5" />
                                </motion.span>
                            </motion.a>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeaderHero;