export interface CompanyInfo {
  name: string;
  description: string;
  url: string;
  phone: string;
  email: string;
  address: {
    street: string;
    city: string;
    region: string;
    postalCode: string;
    country: string;
  };
  geo: {
    latitude: number;
    longitude: number;
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
  url: "https://shineagencia.com", // Replace with your current domain
  phone: "+57-3162560670", // Replace with actual phone
  email: "rocio.shineagencia@gmail.com", // Replace with actual email
  address: {
    street: "Bogotá, Colombia", // Replace with current address
    city: "Bogotá",
    region: "Cundinamarca",
    postalCode: "110111", // Replace with current postal code
    country: "Colombia",
  },
  geo: {
    latitude: 4.7109886,
    longitude: -74.072092,
  },
  logo: "/images/shine-logo.svg", // Replace with current logo path
  image: "/images/shine-og-image.png", // Replace with current OG image path
  foundingDate: "2025", // Replace with current founding date
  founders: ["Rocio Parra", "Diego Rodriguez"],
  socialMedia: {
    instagram: "https://www.instagram.com/shine.agenciam/",
    linkedin: "https://www.linkedin.com/company/shine-brilla-con-propósito",
    tiktok: "https://www.tiktok.com/@shine.agenciam",
    whatsapp:
      "https://api.whatsapp.com/send?phone=573162560670&text=Hola%20buen%20d%C3%ADa%2C%0AEstoy%20interesado%2Fa%20en%20sus%20servicios",
  },
};
