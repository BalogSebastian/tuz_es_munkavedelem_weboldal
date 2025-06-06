// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      './app/**/*.{js,ts,jsx,tsx,mdx}',
      './pages/**/*.{js,ts,jsx,tsx,mdx}',
      './components/**/*.{js,ts,jsx,tsx,mdx}',
      // Győződj meg róla, hogy minden forrásfájl elérhető itt
    ],
    theme: {
      extend: {
        fontFamily: {
          // Itt definiáljuk a Poppins-t mint a 'sans' font stack elsődleges elemét,
          // felhasználva a --font-poppins CSS változót
          sans: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
          // Ha szeretnél egy külön 'poppins' osztályt is, azt is hozzáadhatod:
          poppins: ['var(--font-poppins)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        },
      },
    },
    plugins: [],
  }