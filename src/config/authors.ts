/**
 * Author configuration for the blog
 *
 * This file centralizes author information for:
 * 1. Displaying bio and credentials in posts (E-E-A-T)
 * 2. Generating Person schema for structured SEO
 *
 */

export interface Author {
  /** Author's full name */
  name: string;
  /** Role in the company */
  role: string;
  /** Short bio (1-2 sentences) to display in posts */
  bio: string;
  /** Author's image URL (optional) */
  image?: string;
  /** Credentials or specialties */
  credentials: string[];
  /** Author's social media links */
  socialMedia?: {
    linkedin?: string;
    instagram?: string;
  };
  /** Author's profile URL on the site (optional) */
  url?: string;
}

/**
 * Authors map indexed by name
 * The key must exactly match post.author from CMS
 */
export const AUTHORS: Author[] = [
  {
    name: "Rocio Parra",
    role: "Co-fundadora & Estratega de Marca",
    bio: "Especialista en estrategia de marca personal y comunicación digital. Ayuda a profesionales y empresas a construir una presencia auténtica que conecta con su audiencia.",
    credentials: [
      "Estrategia de marca personal",
      "Marketing digital",
      "Comunicación corporativa",
    ],
    socialMedia: {
      instagram: "https://www.instagram.com/rocio.parra/",
      linkedin: "https://www.linkedin.com/in/rocio-parra/",
    },
  },
  {
    name: "Diego Rodriguez",
    role: "Co-fundador & Desarrollador Web",
    bio: "Desarrollador web especializado en crear sitios de alto rendimiento con tecnologías modernas. Enfocado en experiencia de usuario y optimización para motores de búsqueda.",
    credentials: [
      "Desarrollo web con Astro",
      "Optimización de rendimiento",
      "SEO técnico",
    ],
    socialMedia: {
      linkedin: "https://www.linkedin.com/in/diego-rodriguez/",
    },
  },
];

export const DEFAULT_AUTHOR: Author = {
  name: "Shine Agencia",
  role: "Agencia de Marketing Digital y Diseño Web",
  bio: "Transformamos tu presencia digital con estrategia, propósito y autenticidad. Diseño web, marketing digital y contenido que refleja tu verdadera esencia.",
  credentials: ["Marketing digital", "Diseño web", "Estrategia de marca"],
  socialMedia: {
    linkedin: "https://www.linkedin.com/company/shine-agencia",
    instagram: "https://www.instagram.com/shine.agencia",
  },
};

export function getAuthorByName(name: string): Author {
  return AUTHORS.find((author) => author.name === name) || DEFAULT_AUTHOR;
}
