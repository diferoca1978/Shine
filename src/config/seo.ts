import type { SEOProps } from 'astro-seo';
import type { ImageMetadata } from 'astro';
import type { Service } from './services';
import { services } from './services';
import { mockGoogleReviews } from '@/data/mockGoogleReviews';

export type JSONLDSchema = Record<string, any>;

// Company base information
export const COMPANY_INFO = {
  name: 'Shine',
  description: 'Transformamos tu presencia digital con estrategia, propósito y autenticidad. Diseño web, marketing digital y contenido que refleja tu verdadera esencia.',
  url: 'https://shineagencia.com', // Replace with your current domain
  phone: '+57-3162560670', // Replace with actual phone
  email: 'rocio.shineagencia@gmail.com', // Replace with actual email
  address: {
    street: 'Bogotá, Colombia', // Replace with current address
    city: 'Bogotá',
    region: 'Cundinamarca',
    postalCode: '110111', // Replace with current postal code
    country: 'Colombia'
  },
  logo: '/images/shine-logo.svg', // Replace with current logo path
  image: '/images/shine-og-image.png', // Replace with current OG image path
  foundingDate: '2025', // Replace with current founding date
  founders: ['Rocío', 'Diego'],
  socialMedia: {
    instagram: 'https://www.instagram.com/rochi.diego',
    linkedin: 'https://www.linkedin.com/company/shine-brilla-con-propósito',
    tiktok: 'https://www.tiktok.com/@rochi..diego',
    whatsapp: 'https://api.whatsapp.com/send?phone=573162560670&text=Hola%20buen%20d%C3%ADa%2C%0AEstoy%20interesado%2Fa%20en%20sus%20servicios'
  }
};

// Default SEO configuration
export const DEFAULT_SEO: SEOProps = {
  title: 'Shine | Agencia de Marketing Digital y Diseño Web en Colombia',
  description: 'En Shine, unimos estrategia de marketing y tecnología web de punta para ayudar a líderes y empresas en Colombia a brillar con propósito.',
  canonical: COMPANY_INFO.url,
  openGraph: {
    basic: {
      title: 'Shine | Transformamos tu presencia digital con propósito',
      type: 'website',
      image: COMPANY_INFO.url + COMPANY_INFO.image,
      url: COMPANY_INFO.url
    },
    optional: {
      description: COMPANY_INFO.description,
      siteName: COMPANY_INFO.name,
      locale: 'es_CO'
    }
  },
  twitter: {
    card: 'summary_large_image',
    site: '@shine_agencia',
    creator: '@shine_agencia',
    title: 'Shine | Transformamos tu presencia digital con propósito',
    description: COMPANY_INFO.description,
    image: COMPANY_INFO.url + COMPANY_INFO.image
  },
  extend: {
    meta: [
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: COMPANY_INFO.name },
      { name: 'theme-color', content: '#FFD97D' },
      { name: 'msapplication-TileColor', content: '#FFD97D' },
      { httpEquiv: 'Content-Language', content: 'es-CO' }
    ]
  }
};

// JSON-LD Schema for Organization
export const ORGANIZATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  '@id': COMPANY_INFO.url + '#organizacion',
  name: COMPANY_INFO.name,
  alternateName: 'Shine Agencia | Transformamos tu presencia digital con propósito',
  description: COMPANY_INFO.description,
  url: COMPANY_INFO.url,
  logo: COMPANY_INFO.url + COMPANY_INFO.logo,
  image: COMPANY_INFO.url + COMPANY_INFO.image,
  foundingDate: COMPANY_INFO.foundingDate,
  telephone: COMPANY_INFO.phone,
  email: COMPANY_INFO.email,
  address: {
    '@type': 'PostalAddress',
    streetAddress: COMPANY_INFO.address.street,
    addressLocality: COMPANY_INFO.address.city,
    addressRegion: COMPANY_INFO.address.region,
    postalCode: COMPANY_INFO.address.postalCode,
    addressCountry: {
      '@type': 'Country',
      name: 'Colombia'
    }
  },
  founders: COMPANY_INFO.founders.map(founder => ({
    '@type': 'Person',
    name: founder
  })),
  sameAs: [
    COMPANY_INFO.socialMedia.instagram,
    COMPANY_INFO.socialMedia.linkedin,
    COMPANY_INFO.socialMedia.tiktok
  ],
  serviceType: 'Servicios de Marketing Digital y Diseño Web',
  areaServed: {
    '@type': 'Country',
    name: 'Colombia',
    sameAs: 'https://es.wikipedia.org/wiki/Colombia'
  },
  knowsAbout: [
    'Diseño Web Estratégico',
    'Marketing Digital Auténtico',
    'Rediseño Web',
    'Optimización Web',
    'Estrategia de Contenido',
    'Redes Sociales',
    'Auditoría Digital',
    'Branding Auténtico',
    'SEO',
    'Experiencia de Usuario',
    'Conversión Web'
  ],
  slogan: 'No necesitas gritar para ser escuchado',
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Transformación Digital Auténtica',
    description: 'Servicios especializados en diseño web estratégico y marketing digital para profesionales y empresas que buscan crecer con autenticidad',
    itemListElement: services.map(service => ({
      '@type': 'Offer',
      itemOffered: {
        '@id': `${COMPANY_INFO.url}/servicios/${service.slug}#service`
      }
    }))
  }
};

// JSON-LD Schema for Website
export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': COMPANY_INFO.url + '#website',
  name: COMPANY_INFO.name,
  alternateName: 'Shine Agencia | Transformamos tu presencia digital con propósito',
  description: COMPANY_INFO.description,
  url: COMPANY_INFO.url,
  inLanguage: 'es-CO',
  copyrightYear: new Date().getFullYear(),
  copyrightHolder: {
    '@type': 'Organization',
    name: COMPANY_INFO.name
  },
  publisher: {
    '@id': COMPANY_INFO.url + '#organizacion'
  },
  mainEntity: {
    '@id': COMPANY_INFO.url + '#organizacion'
  }
};

// Dynamic Blog Schema Generator
export function generateBlogSchema(posts: Array<{
  id: string;
  title: string;
  description: string;
  publishDate: Date;
  tags?: string[];
  image?: string;
}>): JSONLDSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': COMPANY_INFO.url + '/blog#blog',
    name: 'Blog - ' + COMPANY_INFO.name,
    description: 'Guías prácticas, reflexiones honestas y consejos estratégicos para construir tu presencia digital con paz y propósito',
    url: COMPANY_INFO.url + '/blog',
    inLanguage: 'es-CO',
    author: {
      '@id': COMPANY_INFO.url + '#organizacion'
    },
    publisher: {
      '@id': COMPANY_INFO.url + '#organizacion'
    },
    blogPost: posts.map(post => ({
      '@type': 'BlogPosting',
      '@id': `${COMPANY_INFO.url}/blog/${post.id}#article`,
      headline: post.title,
      description: post.description,
      url: `${COMPANY_INFO.url}/blog/${post.id}`,
      datePublished: post.publishDate.toISOString(),
      image: post.image ? COMPANY_INFO.url + post.image : COMPANY_INFO.url + COMPANY_INFO.image,
      keywords: post.tags?.join(', ') || 'diseño web, marketing digital, autenticidad, transformación digital',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': `${COMPANY_INFO.url}/blog/${post.id}`
      }
    }))
  };
}

// Function to generate JSON-LD for individual blog posts
export function generateBlogPostSchema(post: {
  title: string;
  description: string;
  publishDate: Date;
  tags?: string[];
  image?: string;
  id: string;
}): JSONLDSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${COMPANY_INFO.url}/blog/${post.id}#article`,
    headline: post.title,
    description: post.description,
    url: `${COMPANY_INFO.url}/blog/${post.id}`,
    datePublished: post.publishDate.toISOString(),
    publisher: {
      '@id': COMPANY_INFO.url + '#organizacion'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${COMPANY_INFO.url}/blog/${post.id}`
    },
    image: post.image ? COMPANY_INFO.url + post.image : COMPANY_INFO.url + COMPANY_INFO.image,
    keywords: post.tags?.join(', ') || 'diseño web, marketing digital, autenticidad, transformación digital',
    inLanguage: 'es-CO',
    isPartOf: {
      '@id': COMPANY_INFO.url + '/blog#blog'
    },
    about: {
      '@type': 'Thing',
      name: 'Marketing Digital Auténtico'
    }
  };
}

// Function to generate SEO props for pages
export function generatePageSEO(options: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
}): SEOProps {
  const fullUrl = COMPANY_INFO.url + options.path;
  const fullTitle = `${options.title} | ${COMPANY_INFO.name}`;

  return {
    title: fullTitle,
    description: options.description,
    canonical: fullUrl,
    noindex: options.noindex || false,
    openGraph: {
      basic: {
        title: fullTitle,
        type: 'website',
        image: COMPANY_INFO.url + (options.image || COMPANY_INFO.image),
        url: fullUrl
      },
      optional: {
        description: options.description,
        siteName: COMPANY_INFO.name,
        locale: 'es_CO'
      }
    },
    twitter: {
      card: 'summary_large_image',
      site: '@shine_agencia',
      creator: '@shine_agencia',
      title: fullTitle,
      description: options.description,
      image: COMPANY_INFO.url + (options.image || COMPANY_INFO.image)
    }
  };
}

export function generateServiceSEO(service: Service): SEOProps {
  const serviceUrl = `${COMPANY_INFO.url}/servicios/${service.slug}`;
  const pageTitle = `${service.title} | ${COMPANY_INFO.name}`;

  return {
    title: pageTitle,
    description: service.seoDescription,
    canonical: serviceUrl,
    noindex: false,
    openGraph: {
      basic: {
        title: pageTitle,
        type: 'website',
        image: COMPANY_INFO.url + (service.image.src || COMPANY_INFO.image),
        url: serviceUrl
      },
      optional: {
        description: service.seoDescription,
        siteName: COMPANY_INFO.name,
        locale: 'es_CO'
      }
    },
    twitter: {
      card: 'summary_large_image',
      site: '@shine_agencia',
      creator: '@shine_agencia',
      title: pageTitle,
      description: service.seoDescription,
      image: COMPANY_INFO.url + (service.image.src || COMPANY_INFO.image)
    },
    extend: {
      meta: [
        { name: 'author', content: COMPANY_INFO.name },
        { name: 'robots', content: 'index, follow' },
        { httpEquiv: 'Content-Language', content: 'es-CO' }
      ]
    }
  };
}

export function generateServiceSchema(service: Service): JSONLDSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${COMPANY_INFO.url}/servicios/${service.slug}#service`,
    name: service.title,
    description: service.content,
    serviceType: service.title,
    provider: {
      '@id': COMPANY_INFO.url + '#organizacion'
    },

    areaServed: {
      '@type': 'Country',
      name: 'Colombia'
    },

    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: `${COMPANY_INFO.url}/servicios/${service.slug}`,
      servicePhone: COMPANY_INFO.phone,
      serviceLocation: {
        '@type': 'Place',
        address: {
          '@type': 'PostalAddress',
          addressLocality: COMPANY_INFO.address.city,
          addressCountry: 'CO'
        }
      }
    },

    keywords: service.seoKeywords.join(', '),

    ...(service.benefits && {
      serviceOutput: service.benefits.join(', ')
    }),

    isPartOf: {
      '@type': 'WebPage',
      '@id': COMPANY_INFO.url + '/servicios',
      name: 'Servicios'
    }
  };
}

// Breadcrumb schema generator
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>): JSONLDSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  };
}

// Internal helper for reviews schema generation
function generateReviewsSchema(reviews: Array<{
  author: string;
  text: string;
  rating: number;
  datePublished: number;
  image?: string;
  platform: string;
}>): JSONLDSchema {
  // Calculate aggregate rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': COMPANY_INFO.url + '#organizacion-reviews',
    name: COMPANY_INFO.name,
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: '5',
      worstRating: '1'
    },
    review: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
        ...(review.image && { image: review.image })
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5',
        worstRating: '1'
      },
      reviewBody: review.text,
      datePublished: new Date(review.datePublished * 1000).toISOString(),
      publisher: {
        '@type': 'Organization',
        name: review.platform
      }
    }))
  };
}

// Specific generators for different platforms
export function generateGoogleReviewsSchema(reviews: Array<{
  author_name: string;
  text: string;
  rating: number;
  datePublished: number;
  author_url?: string;
  profile_photo_url: ImageMetadata;
}>): JSONLDSchema {
  const formattedReviews = reviews.map(review => ({
    author: review.author_name,
    text: review.text,
    rating: review.rating,
    datePublished: review.datePublished,
    image: review.profile_photo_url.src,
    platform: 'Google'
  }));

  return generateReviewsSchema(formattedReviews);
}

/**
 * Pre-generated reviews schema using mockGoogleReviews data.
 * Use this constant in layouts/pages that include SocialProof component.
 */
export const REVIEWS_SCHEMA = generateGoogleReviewsSchema(mockGoogleReviews);

// ============================================================================
// FAQ Page Schema - For AEO (Answer Engine Optimization)
// ============================================================================

export interface FAQItem {
  question: string;
  answer: string;
}

/**
 * Generates FAQPage schema for rich snippets in Google and AI citation.
 * Use this on service pages, landing pages, or any page with Q&A content.
 *
 * @example
 * const faqSchema = generateFAQSchema([
 *   { question: '¿Qué incluye el diseño web?', answer: 'Incluye diseño, desarrollo...' },
 *   { question: '¿Cuánto tiempo toma?', answer: 'Entre 4-8 semanas...' }
 * ]);
 */
export function generateFAQSchema(faqs: FAQItem[]): JSONLDSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };
}

/**
 * Combines FAQPage schema with a specific page reference.
 * Useful for linking FAQs to a specific service or page.
 */
export function generateFAQSchemaWithPage(
  faqs: FAQItem[],
  pageUrl: string,
  pageName: string
): JSONLDSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    name: `Preguntas Frecuentes - ${pageName}`,
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    })),
    isPartOf: {
      '@type': 'WebPage',
      '@id': pageUrl
    }
  };
}

// ============================================================================
// HowTo Schema - For instructional content and step-by-step guides
// ============================================================================

export interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export interface HowToOptions {
  name: string;
  description: string;
  steps: HowToStep[];
  totalTime?: string; // ISO 8601 duration format (e.g., 'PT30M' for 30 minutes)
  estimatedCost?: {
    currency: string;
    value: string;
  };
  image?: string;
  supply?: string[]; // Tools or materials needed
}

/**
 * Generates HowTo schema for step-by-step guides.
 * Perfect for blog posts with tutorials or process explanations.
 *
 * @example
 * const howToSchema = generateHowToSchema({
 *   name: 'Cómo preparar tu rediseño web',
 *   description: 'Guía paso a paso para preparar tu negocio...',
 *   steps: [
 *     { name: 'Audita tu sitio', text: 'Analiza métricas actuales...' },
 *     { name: 'Define objetivos', text: 'Establece metas claras...' }
 *   ],
 *   totalTime: 'P2W' // 2 weeks
 * });
 */
export function generateHowToSchema(options: HowToOptions): JSONLDSchema {
  const schema: JSONLDSchema = {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: options.name,
    description: options.description,
    step: options.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: COMPANY_INFO.url + step.image }),
      ...(step.url && { url: COMPANY_INFO.url + step.url })
    }))
  };

  // Add optional properties if provided
  if (options.totalTime) {
    schema.totalTime = options.totalTime;
  }

  if (options.estimatedCost) {
    schema.estimatedCost = {
      '@type': 'MonetaryAmount',
      currency: options.estimatedCost.currency,
      value: options.estimatedCost.value
    };
  }

  if (options.image) {
    schema.image = COMPANY_INFO.url + options.image;
  }

  if (options.supply && options.supply.length > 0) {
    schema.supply = options.supply.map(item => ({
      '@type': 'HowToSupply',
      name: item
    }));
  }

  return schema;
}

/**
 * Generates HowTo schema linked to a specific blog post or page.
 */
export function generateHowToSchemaWithPage(
  options: HowToOptions,
  pageUrl: string
): JSONLDSchema {
  const baseSchema = generateHowToSchema(options);

  return {
    ...baseSchema,
    '@id': `${pageUrl}#howto`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl
    }
  };
}
