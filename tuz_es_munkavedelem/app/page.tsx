// app/page.tsx
// Itt már csak a HeaderHero és PreConsultationForm marad
import HeaderHero from './components/HeaderHero';
import PreConsultationForm from './components/PreConsultationForm';

// Az új kliens komponenst importáljuk, ami a dinamikus betöltéseket tartalmazza
import HomePageClientContent from './components/HomePageClientContent';

export default function HomePage() {
  return (
    <main>
      {/* Ezek maradnak szerver komponensek, így a leggyorsabban renderelődnek */}
      <HeaderHero />
      <PreConsultationForm/>

      {/* A többi komponenst a kliens komponens rendereli, dinamikusan */}
      <HomePageClientContent />
    </main>
  );
}