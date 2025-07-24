import type { Metadata } from "next";
// Eddigi betűtípus importja (pl. Inter) helyett jön a Poppins
import { Poppins } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"

// Poppins konfigurálása a kívánt súlyokkal és stílusokkal
// A 'variable' opcióval CSS változót hozunk létre, amit a Tailwind könnyen használhat
const poppins = Poppins({
  subsets: ["latin", "latin-ext"], // Szükséges karakterkészletek (latin-ext a magyar ékezetekhez is jó)
  weight: ["300", "400", "500", "600", "700", "800"], // Válaszd ki a szükséges vastagságokat
  style: ["normal", "italic"], // Ha szükséged van dőlt stílusra is
  display: 'swap', // Biztosítja a szöveg láthatóságát betöltés közben
  variable: '--font-poppins', // Létrehoz egy CSS változót a betűtípusnak
});

export const metadata: Metadata = {
  // Optimalizált Title: Maximálisan kihasználva a karaktereket, kulcsszavakkal dúsítva
  title: "Tűz- és Munkavédelem Országosan | HACCP, Oktatás, Kockázatértékelés - tuz-munkavedelmiszaki.hu",
  // Optimalizált Description: Részletes, kulcsszavakkal teli, cselekvésre ösztönző
  description: "Professzionális tűzvédelem és munkavédelem Magyarországon. Szakértői HACCP rendszer kiépítés, kötelező oktatások, kockázatértékelés és jogszabályi megfelelés KKV-knak, ipari vállalatoknak. Ingyenes konzultáció!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // A CSS változót itt adjuk hozzá a html elemhez, hogy globálisan elérhető legyen
    // A 'font-sans' osztályt a body-n hagyjuk, ezt majd a Tailwind konfigurációban állítjuk be Poppins-ra
    <html lang="hu" className={`${poppins.variable} scroll-smooth`}>
      <body className={`font-sans antialiased bg-white`}>
        <Analytics/>
        {children}
      </body>
    </html>
  );
}