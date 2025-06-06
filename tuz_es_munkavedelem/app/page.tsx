// app/page.tsx
import HeaderHero from './components/HeaderHero';
import IntroSection from './components/IntroSection';
import CallToActionSection from './components/CallToActionSection';
import ServiceHighlightCards from './components/ServiceHighlightCards';
import ProcessSteps from './components/ProcessSteps';
import StatsCounterSection from './components/StatsCounterSection';
import DownloadableDocsSection from './components/DownloadableDocsSection';
import FreeConsultationCtaSection from './components/FreeConsultationCtaSection'; // ÚJ KOMPONENS IMPORTÁLÁSA
import FaqAccordion from './components/FaqAccordion';
import PreConsultationForm from './components/PreConsultationForm';
import TestimonialSlider from './components/TestimonialSlider';
import Footer from './components/Footer';

export default function HomePage() {
  return (
    <main>
      <HeaderHero />
      <PreConsultationForm/>
      <IntroSection />
      <CallToActionSection /> {/* Általános ajánlatkérés */}
      <ServiceHighlightCards />

      
      <ProcessSteps />
      <StatsCounterSection />
      <DownloadableDocsSection />
      <FreeConsultationCtaSection />
      <FaqAccordion/>
      <TestimonialSlider/>
      <Footer/>
       {/* Ingyenes konzultáció CTA */}
      {/*
        Ide jöhetnek majd további szakaszok vagy komponensek.
      */}
    </main>
  );
}