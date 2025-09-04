'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
// JAVÍTVA: A hibás 'ScreenResolution' import eltávolítva
import FingerprintJS, { Agent, Component, GetResult } from '@fingerprintjs/fingerprintjs';

// Komponensek importálása
import ExitIntentPopup from './ExitIntentPopup';
const ServiceHighlightCards = dynamic(() => import('./ServiceHighlightCards'), { ssr: false });
const StatsCounterSection = dynamic(() => import('./StatsCounterSection'), { ssr: false });
const DownloadableDocsSection = dynamic(() => import('./DownloadableDocsSection'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false });
import IntegratedApplication from './IntegratedApplications';
import CombinedSections from './Combined';

// Segédfüggvény a biztonságos adatkinyeréshez (változatlan)
function getComponentValue<T>(component: Component<T> | undefined): T | string {
  if (component && 'value' in component) {
    return component.value;
  }
  return 'N/A';
}

export default function HomePageClientContent() {
  const [showExitPopup, setShowExitPopup] = useState(false);

  useEffect(() => {
    const triggerPopup = () => {
      if (!sessionStorage.getItem('exitIntentShown')) {
        setShowExitPopup(true);
        sessionStorage.setItem('exitIntentShown', 'true');
      }
    };
    
    // --- JAVÍTVA: Az eseményfigyelők helyett egy 7 másodperces időzítő indítása ---
    const timer = setTimeout(triggerPopup, 7000);
    
    // A cleanup funkció eltávolítja az időzítőt, ha a komponens elhagyásra kerül
    return () => {
      clearTimeout(timer);
    };
  }, []);

  const handleAccept = async () => {
    try {
      const fp: Agent = await FingerprintJS.load();
      const result: GetResult = await fp.get();

      // --- JAVÍTVA: Biztonságos és helyes képernyőfelbontás-kezelés ---
      const screenResolutionComponent = result.components.screenResolution;
      let resolutionString = 'N/A';
      if (screenResolutionComponent && 'value' in screenResolutionComponent && Array.isArray(screenResolutionComponent.value)) {
        // Csak akkor hívjuk a .join()-t, ha biztosan egy tömb
        resolutionString = screenResolutionComponent.value.join('x');
      }

      const detailedData = {
        visitorId: result.visitorId,
        confidenceScore: result.confidence.score,
        platform: getComponentValue(result.components.platform),
        vendor: getComponentValue(result.components.vendor),
        screen: {
          resolution: resolutionString, // A biztonságosan létrehozott string
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
      
      <IntegratedApplication/>
      <ServiceHighlightCards />
      <StatsCounterSection />
      <DownloadableDocsSection />
      <CombinedSections/>
      <Footer />
    </>
  );
}