// components/HomePageClientContent.tsx
'use client'; // <-- EZ KULCSFONTOSSÁGÚ: Ez egy kliens komponens!

import React from 'react';
import dynamic from 'next/dynamic';

// Dinamikusan importált komponensek, most már egy kliens komponensben vannak
const IntroSection = dynamic(() => import('./IntroSection'), { ssr: false });
const CallToActionSection = dynamic(() => import('./CallToActionSection'), { ssr: false });
const ServiceHighlightCards = dynamic(() => import('./ServiceHighlightCards'), { ssr: false });
const ProcessSteps = dynamic(() => import('./ProcessSteps'), { ssr: false });
const StatsCounterSection = dynamic(() => import('./StatsCounterSection'), { ssr: false });
const DownloadableDocsSection = dynamic(() => import('./DownloadableDocsSection'), { ssr: false });
const FreeConsultationCtaSection = dynamic(() => import('./FreeConsultationCtaSection'), { ssr: false });
const FaqAccordion = dynamic(() => import('./FaqAccordion'), { ssr: false });
const TestimonialSlider = dynamic(() => import('./TestimonialSlider'), { ssr: false });
const Footer = dynamic(() => import('./Footer'), { ssr: false }); // A Footer is mehet dinamikusan

// Azonnali betöltésű komponensek (ha mégis ide kerülnek)
import HeaderHero from './HeaderHero'; // A HeaderHero valószínűleg nem ide tartozik majd, hanem a page.tsx-be
import PreConsultationForm from './PreConsultationForm'; // A PreConsultationForm valószínűleg nem ide tartozik majd, hanem a page.tsx-be

export default function HomePageClientContent() {
  return (
    <>
      {/* Azok a komponensek, amiknek azonnal meg kell jelenniük, és nincsenek ssr:false opcióval */}
      {/* Ide rakhatsz olyan komponenseket, amikben nincs ssr:false dynamic import,
          vagy amiknek muszáj kliens komponensnek lenniük, de nem dinamikusan betöltve.
          A HeaderHero és PreConsultationForm valószínűleg az app/page.tsx-ben marad,
          hogy szerver oldalon renderelődjön, ha lehetséges. */}

      <IntroSection />
      
      <ServiceHighlightCards />
      <ProcessSteps />
      <StatsCounterSection />
      <DownloadableDocsSection />
      <CallToActionSection />
      <FaqAccordion/>
      <Footer />
    </>
  );
}