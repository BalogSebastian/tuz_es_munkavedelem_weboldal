// app/page.tsx
import HeaderHero from './components/HeaderHero';
import IntroSection from './components/IntroSection';
import CallToActionSection from './components/CallToActionSection'; // Új komponens importálása
import ServiceHighlightCards from './components/ServiceHighlightCards';
import ProcessSteps from './components/ProcessSteps';
export default function HomePage() {
  return (
    <main>
      <HeaderHero />
      <IntroSection />
      <CallToActionSection />
      <ServiceHighlightCards/>
      <ProcessSteps/>
      {/*
        Ide jöhetnek majd további szakaszok vagy komponensek.
      */}
    </main>
  );
}