// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Itt lehetnek a meglévő beállításaid */
  
  async rewrites() {
    return [
      {
        // Az ÚJ, "titkosított" útvonal:
        source: '/szolgaltatas/s-f3b8a1c9',

        // A cél továbbra is a valódi fájl:
        destination: '/gyorslinkek/VBF',
      },
    ];
  },
};

export default nextConfig;