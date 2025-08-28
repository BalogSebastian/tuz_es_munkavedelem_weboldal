// app/page.tsx
import HeaderHero from './components/HeaderHero';
import TestimonialSlider from './components/TestimonialSlider';

// Importáljuk az új, kliens oldalon betöltődő komponenseket tartalmazó fájlt
import HomePageClientContent from './components/HomePageClientContent';

export default function HomePage() {
  return (
    <main>
      {/* Ezek a szerver oldalon renderelődő, statikus komponensek */}
      <HeaderHero />
      <TestimonialSlider />
      
      {/* Ez a komponens tartalmazza a dinamikus, kliens oldali tartalmakat */}
      <HomePageClientContent />
    </main>
  );
}