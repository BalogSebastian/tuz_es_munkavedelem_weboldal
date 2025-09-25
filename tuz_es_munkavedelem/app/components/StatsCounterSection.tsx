'use client';

import React, { useEffect, useRef, useState } from 'react';
import { UserGroupIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import { IoArrowUndoSharp } from "react-icons/io5";
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

// --- Natív Intersection Observer Hook ---
const useInViewObserver = (ref: React.RefObject<any>, options: IntersectionObserverInit) => {
    const [isInView, setIsInView] = useState<boolean>(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                setIsInView(true);
                observer.unobserve(entry.target);
            }
        }, options);

        if (ref.current) {
            observer.observe(ref.current);
        }

        return () => {
            if (ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, [ref, options]);

    return isInView;
};

// --- ÁTALAKÍTVA: Nincs Animáció, Azonnali Érték megjelenítése ---
function StaticCounter({ value, isInView }: { value: number; isInView: boolean }) {
    return <>{isInView ? value : 0}</>;
}

const stats = [
    { value: 150, label: "Elégedett Ügyfél", suffix: "", icon: UserGroupIcon },
    { value: 150, label: "Elkerült Büntetés", suffix: "", icon: ShieldCheckIcon },
];

const ACCENT_COLOR_RED = {
    baseHex: '#DC2626',
    bg: 'bg-red-600',
    textOnAccent: 'text-white',
    ring: 'focus-visible:ring-red-500',
    shadow: 'shadow-red-500/40',
    hoverShadow: 'hover:shadow-red-400/60',
};

const StatsCounterSection = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInViewObserver(sectionRef, { threshold: 0.3 });

    return (
        <>
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500;700;900&display=swap');
            `}</style>
            <style jsx>{`
                .cta-grid-pattern {
                    background-image: linear-gradient(rgba(203, 213, 225, 0.05) 1px, transparent 1px),
                                      linear-gradient(to right, rgba(203, 213, 225, 0.05) 1px, transparent 1px);
                    background-size: 4rem 4rem;
                }

                .stat-card {
                    opacity: 0;
                    transform: translateY(50px);
                    transition: opacity 0.7s cubic-bezier(0.22, 1, 0.36, 1), transform 0.7s cubic-bezier(0.22, 1, 0.36, 1), scale 0.3s, box-shadow 0.3s;
                }
                .stat-card.visible {
                    opacity: 1;
                    transform: translateY(0);
                }
                .stat-card:hover {
                    transform: scale(1.08) translateY(-8px);
                }

                .cta-card {
                    opacity: 0;
                    transform: scale(0.8);
                    transition: opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1), box-shadow 0.3s;
                }
                .cta-card.visible {
                    opacity: 1;
                    transform: scale(1);
                }

                @media (min-width: 768px) {
                    .cta-card:hover {
                        transform: scale(1.02);
                        box-shadow: 0 0 40px rgba(239, 68, 68, 0.8);
                    }
                }

                @media (max-width: 767px) {
                    .stat-card:hover {
                        transform: scale(1.02) translateY(-4px);
                    }
                    .cta-card:active {
                        transform: scale(0.95);
                    }
                    .mobile-hide-arrows {
                        display: none !important;
                    }
                }
            `}</style>
            <section ref={sectionRef} className="pt-16 sm:pt-24 sm:pt-32 pb-16 sm:pb-24 sm:pb-32 font-['Poppins',_sans-serif] bg-slate-900 text-white relative">
                {/* A nyíl - mobilon elrejtve */}
                <div className="mobile-hide-arrows absolute w-20 sm:w-36 h-20 sm:h-36 text-cyan-500 pointer-events-none z-20"
                    style={{
                        top: '1%',
                        left: '10%',
                        transform: 'translateY(-50%) rotate(210deg)'
                    }}
                >
                    <IoArrowUndoSharp className="w-full h-full" />
                </div>
                <div className="absolute inset-0 cta-grid-pattern z-0"></div>

                <div className="container mx-auto px-4 sm:px-6 relative z-10">
                    <div className="text-center mb-12 sm:mb-16 lg:mb-20">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-sky-400 mb-3 sm:mb-4 px-2">
                            Eredményeink <span className='text-white'>számokban:</span>
                        </h2>
                        <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto px-4">
                            Fontos számunkra, hogy az ügyfeleink ne stresszeljenek egy ellenőrzés során.
                        </p>
                    </div>

                    <div className="max-w-2xl mx-auto">
                        <div className="grid grid-cols-2 gap-y-12 sm:gap-y-16 sm:gap-y-12 gap-x-8 text-center">
                            {stats.map((stat, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col items-center stat-card ${isInView ? 'visible' : ''}`}
                                    style={{ transitionDelay: `${index * 0.15 + 0.4}s` }}
                                >
                                    <div className="relative mb-4 sm:mb-5 p-3 sm:p-4 bg-white/10 rounded-full ring-2 ring-white/20 shadow-lg">
                                        <stat.icon className="w-8 h-8 sm:w-10 sm:h-10 text-cyan-400" />
                                    </div>

                                    <div className="text-4xl sm:text-5xl lg:text-7xl font-extrabold mb-1 text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-300">
                                        <StaticCounter value={stat.value} isInView={isInView} />
                                        {stat.suffix}
                                    </div>
                                    <div className="text-base sm:text-lg lg:text-xl font-medium text-slate-400 px-2">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* CTA kártya mobilra optimalizálva */}
                    <Link
                        href="https://app.minup.io/book/munkavedelmiszaki/service/46358"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`mt-16 sm:mt-20 p-6 sm:p-8 sm:p-10 bg-gradient-to-br from-red-600 to-red-800 rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-red-500 text-center relative overflow-hidden cta-card block cursor-pointer ${isInView ? 'visible' : ''} mx-2 sm:mx-0`}
                    >
                        <div className="absolute inset-0 bg-white/5 opacity-20 transform -skew-y-12 scale-150"></div>
                        <p className="text-white text-2xl sm:text-2xl sm:text-3xl lg:text-4xl font-black leading-tight relative z-10">
                            Egyetlen büntetés akár
                        </p>
                        <p className="text-white text-3xl sm:text-4xl sm:text-5xl lg:text-6xl font-black mt-2 relative z-10">
                            <span className="text-yellow-300 drop-shadow-lg">2 000 000 Ft</span> is lehet!
                        </p>
                        <p className="text-red-200 text-base sm:text-lg mt-3 sm:mt-4 relative z-10 px-2">
                            Ne kockáztass - legyél felkészült!
                        </p>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default StatsCounterSection;