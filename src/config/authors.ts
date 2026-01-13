/**
 * Author configuration for the blog
 *
 * This file centralizes author information for:
 * 1. Displaying bio and credentials in posts (E-E-A-T)
 * 2. Generating Person schema for structured SEO
 * 3. Maintaining consistency without depending on CMS
 *
 */

import { COMPANY_INFO } from './seo';

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
export const AUTHORS: Record<string, Author> = {
  'Rocio': {
    name: 'Rocio Parra',
    role: 'Co-fundadora & Estratega de Marca',
    bio: 'Especialista en estrategia de marca personal y comunicación digital. Ayuda a profesionales y empresas a construir una presencia auténtica que conecta con su audiencia.',
    credentials: [
      'Estrategia de marca personal',
      'Marketing digital',
      'Comunicación corporativa'
    ],
    socialMedia: {
      instagram: 'https://www.instagram.com/rocio.parra/',
      linkedin: 'https://www.linkedin.com/in/rocio-parra/'
    }
  },
  'Diego': {
    name: 'Diego Rodriguez',
    role: 'Co-fundador & Desarrollador Web',
    bio: 'Desarrollador web especializado en crear sitios de alto rendimiento con tecnologías modernas. Enfocado en experiencia de usuario y optimización para motores de búsqueda.',
    credentials: [
      'Desarrollo web con Astro',
      'Optimización de rendimiento',
      'SEO técnico'
    ],
    socialMedia: {
      linkedin: 'https://www.linkedin.com/in/diego-rodriguez/'
    }
  }
};

/**
 * Gets author information by name
 * @param name - Author name (must match post.author from CMS)
 * @returns Author data or undefined if not found
 */
export function getAuthor(name: string): Author | undefined {
  // Try exact match first
  if (AUTHORS[name]) {
    return AUTHORS[name];
  }

  // Try partial match (in case CMS sends full name)
  const normalizedName = name.toLowerCase().trim();
  for (const [key, author] of Object.entries(AUTHORS)) {
    if (
      key.toLowerCase() === normalizedName ||
      author.name.toLowerCase().includes(normalizedName) ||
      normalizedName.includes(key.toLowerCase())
    ) {
      return author;
    }
  }

  return undefined;
}

/**
 * Default author when no match is found
 * Uses organization as generic author
 */
export const DEFAULT_AUTHOR: Author = {
  name: COMPANY_INFO.name,
  role: 'Agencia de Marketing Digital',
  bio: COMPANY_INFO.description,
  credentials: ['Marketing digital', 'Diseño web', 'Estrategia de marca'],
  socialMedia: COMPANY_INFO.socialMedia
};
