// app/page.tsx
// Itt már csak a HeaderHero és PreConsultationForm marad
import HeaderHero from './components/HeaderHero';
import PreConsultationForm from './components/PreConsultationForm';
import TestimonialSlider from './components/TestimonialSlider';

// Az új kliens komponenst importáljuk, ami a dinamikus betöltéseket tartalmazza
import HomePageClientContent from './components/HomePageClientContent';

export default function HomePage() {
  return (
    <main>
      {/* Ezek maradnak szerver komponensek, így a leggyorsabban renderelődnek */}
      <HeaderHero />
      <TestimonialSlider/>
      <PreConsultationForm/>

      {/* A többi komponenst a kliens komponens rendereli, dinamikusan */}
      <HomePageClientContent />
    </main>
  );
}