import type { ManifestOptions } from "vite-plugin-pwa";

/** 
 * SEO configuration for the app
 */


export const seoConfig = {
  baseURL:"https://example.com", // Change this to your production URL.
  description: "Shine | Consultora de presencia digital para emprendedores y profesionales sin experiencia online. Servicios personalizados de gestión de redes sociales, diseño web, estrategia de contenidos y posicionamiento online para hacer brillar tu negocio con autenticidad en el mundo digital. ",
  type: "website",
  image: {
    url: "https://picsum.photos/1200/630", // Change this to the actual image URL
    alt: "Shine | Consultora de presencia digital para emprendedores y profesionales sin experiencia online. Servicios personalizados de gestión de redes sociales, diseño web, estrategia de contenidos y posicionamiento online para hacer brillar tu negocio con autenticidad en el mundo digital.",
    width: 1200,
    height: 630,
  },
  siteName: "Shine",
  twitter: {
    card: "summary_large_image",
  },
}    

/**
 * PWA webmanifest configuration for the app
 */

export const manifestConfig: Partial <ManifestOptions> = {
  name: "Shine",
  short_name: "Shine",
  description: "Shine | Consultora de presencia digital para emprendedores y profesionales sin experiencia online. Servicios personalizados de gestión de redes sociales, diseño web, estrategia de contenidos y posicionamiento online para hacer brillar tu negocio con autenticidad en el mundo digital.",
  theme_color: "#F5F3EE",
  background_color: "#2F2F2F",
  display: "minimal-ui",
  icons: [
    {
      src: "/favicons/android-chrome-192x192.png",
      sizes: "192x192",
      type: "image/png",
    },
    {
      src: "/favicons/android-chrome-512x512.png",
      sizes: "512x512",
      type: "image/png",
    },
    {
      src: "/favicons/andriod-chrome-512x512.png",
    },
    {
      src: "/favicons/apple-touch-icon.png",
      sizes: "180x180",
      type: "image/png",
    },
    
  ]
}