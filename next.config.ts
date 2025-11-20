// next.config.ts

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,

  // 🚀 Implementación del Reverse Proxy usando rewrites
  async rewrites() {
    return [
      {
        source: "/api/:path*", // Patrón de solicitud entrante (e.g., /api/users/123)
        destination: `${process.env.NEXT_PUBLIC_SERVER}/:path*`, // Destino al que se reenvía (e.g., http://localhost:8000/api/users/123)
      },
      // Puedes añadir más reglas de reescritura aquí si es necesario
    ];
  },
};

export default nextConfig;
