export interface CompanyInfo {
  name: string;
  description: string;
  url: string;
  phone: string;
  email: string;
  address: {
    city: string;
    region: string;
    country: string;
    countryCode: string;
  };
  logo: string;
  image: string;
  foundingDate: string;
  founders: string[];
  socialMedia: {
    instagram: string;
    linkedin: string;
    tiktok: string;
    whatsapp: string;
  };
}

// Company base information
export const COMPANY_INFO: CompanyInfo = {
  name: "Shine Agencia",
  description:
    "Diseño web con Astro, campañas Google Ads y Facebook Ads y ecommerce con Tienda Nube para empresas en Colombia. Bogotá. Agenda tu diagnóstico gratuito hoy.",
  url: "https://shineagencia.com",
  phone: "+57-3162560670",
  email: "rocio.shineagencia@gmail.com",
  address: {
    city: "Bogotá",
    region: "Cundinamarca",
    country: "Colombia",
    countryCode: "CO",
  },
  logo: "/images/shine-logo.svg",
  image: "/images/shine-og-image.png",
  foundingDate: "2025",
  founders: ["Rocío Parra", "Diego Rodríguez"],
  socialMedia: {
    instagram: "https://www.instagram.com/shine.agenciam/",
    linkedin: "https://www.linkedin.com/company/shine-brilla-con-propósito",
    tiktok: "https://www.tiktok.com/@shine.agenciam",
    whatsapp:
      "https://api.whatsapp.com/send?phone=573162560670&text=Hola%20buen%20d%C3%ADa%2C%0AEstoy%20interesado%2Fa%20en%20sus%20servicios",
  },
};
