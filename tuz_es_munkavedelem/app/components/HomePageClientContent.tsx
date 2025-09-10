'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import FingerprintJS, { Agent, Component, GetResult } from '@fingerprintjs/fingerprintjs';

// Komponensek importálása
import ExitIntentPopup from './ExitIntentPopup';
const ServiceHighlightCards = dynamic(() => import('./ServiceHighlightCards'), { ssr: false });
const StatsCounterSection = dynamic(() => import('./StatsCounterSection'), { ssr: false });
const DownloadableDocsSection = dynamic(() => import('./DownloadableDocsSection'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });
import IntegratedApplication from './IntegratedApplications';
import CombinedSections from './Combined';
import MainPage from './MainPage';
import QuizModal from './QuizModal';

// Segédfüggvény a biztonságos adatkinyeréshez (változatlan)
function getComponentValue<T>(component: Component<T> | undefined): T | string {
  if (component && 'value' in component) {
    return component.value;
  }
  return 'N/A';
}

export default function HomePageClientContent() {
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);

  // A 7 másodperces időzítő a kilépési felugró ablak számára
  useEffect(() => {
    const timer = setTimeout(() => {
      // Csak akkor jelenítjük meg, ha a kvíz pop-up még nem volt látható
      if (!sessionStorage.getItem('quizModalShown')) {
        setShowExitPopup(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    }, 7000);
    
    return () => clearTimeout(timer);
  }, []);

  // Az egér kilépését figyelő eseményfigyelő a kvíz pop-up számára
  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      // Csak akkor jelenítjük meg, ha az egér a böngészőablakon kívülre megy
      // és a kvíz pop-up még nem volt látható
      if (e.clientY < 50 && !sessionStorage.getItem('quizModalShown')) {
        setShowQuizModal(true);
        sessionStorage.setItem('quizModalShown', 'true');
      }
    };
    
    document.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const handleAccept = async () => {
    try {
      const fp: Agent = await FingerprintJS.load();
      const result: GetResult = await fp.get();

      const screenResolutionComponent = result.components.screenResolution;
      let resolutionString = 'N/A';
      if (screenResolutionComponent && 'value' in screenResolutionComponent && Array.isArray(screenResolutionComponent.value)) {
        resolutionString = screenResolutionComponent.value.join('x');
      }

      const detailedData = {
        visitorId: result.visitorId,
        confidenceScore: result.confidence.score,
        platform: getComponentValue(result.components.platform),
        vendor: getComponentValue(result.components.vendor),
        screen: {
          resolution: resolutionString,
          colorDepth: getComponentValue(result.components.colorDepth),
        },
        hardware: {
          cpuCores: getComponentValue(result.components.hardwareConcurrency),
          memory: getComponentValue(result.components.deviceMemory),
        },
        timezone: getComponentValue(result.components.timezone),
        languages: getComponentValue(result.components.languages),
        pageUrl: typeof window !== 'undefined' ? window.location.href : 'N/A',
        referrer: typeof document !== 'undefined' ? document.referrer || 'Direct' : 'N/A',
      };

      await fetch('/api/log-exit-consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(detailedData),
      });

      setShowExitPopup(false);
    } catch (error) {
      console.error('Hiba történt a részletes adatok gyűjtése és küldése közben:', error);
    }
  };

  return (
    <>
      <ExitIntentPopup
        isOpen={showExitPopup}
        onClose={() => setShowExitPopup(false)}
        onAccept={handleAccept}
      />
      
      <QuizModal
        isOpen={showQuizModal}
        onClose={() => setShowQuizModal(false)}
      />

      <MainPage/>
      <ServiceHighlightCards />
      <StatsCounterSection />
      <CombinedSections/>
      <DownloadableDocsSection />
      <Footer />
    </>
  );
}