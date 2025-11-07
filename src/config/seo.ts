import type { SEOProps } from 'astro-seo';
import type { Service } from './services';
import { services } from './services';

export type JSONLDSchema = Record<string, any>;

// Centralized keyword configuration - Main SEO keywords for Shine
export const MAIN_KEYWORDS = {
  primary: [
    'shine agencia digital',
    'diseño web astro colombia',
    'marketing digital auténtico bogotá'
  ],
  secondary: [
    'agencia diseño web bogotá',
    'rediseño web estratégico',
    'estrategia marca personal',
    'contenidos redes sociales',
    'optimización web colombia'
  ],
  tertiary: [
    'diseño web profesional',
    'marketing digital introvertidos',
    'transformación digital',
    'sitios web alto rendimiento',
    'agencia marketing auténtico'
  ]
};

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
  title: 'Shine | Haz que tu luz brille y atraiga a quienes necesitan tu talento',
  description: 'Transformamos tu presencia digital con estrategia, propósito y autenticidad. Diseño web, marketing digital y contenido que refleja tu verdadera esencia.',
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
      {
        name: 'keywords',
        content: [
          ...MAIN_KEYWORDS.primary,
          ...MAIN_KEYWORDS.secondary,
          ...MAIN_KEYWORDS.tertiary
        ].join(', ')
      },
      { name: 'theme-color', content: '#FFD97D' }, // Dorado acento
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
    addressCountry: 'CO',
    addressCountryName: 'Colombia'
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
  mission: 'Acompañamos a Empresas, empresarios, profesionales y emprendedores a transformar su presencia digital sin sacrificar su esencia, guiados por principios eternos de servicio y excelencia.',
  values: [
    'Autenticidad',
    'Propósito',
    'Servicio con valor',
    'Crecimiento en unidad',
    'Generosidad estratégica'
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Servicios de Transformación Digital Auténtica',
    description: 'Servicios especializados en diseño web estratégico y marketing digital para profesionales y empresas que buscan crecer con autenticidad',
    itemListElement: services.map( service => ({
      '@type': 'Offer',
      itemOffered: {
        '@type': 'Service',
        '@id': `${COMPANY_INFO.url}/servicios/${service.slug}#servicio`,
        name: service.title,
        description: service.content,
        serviceType: service.title,
        category: service.tags?.[0] || 'Marketing Digital y Diseño Web',
        url:`${COMPANY_INFO.url}/servicios/${service.slug}`,
        keywords: service.seoKeywords.join(', '),
        ...(service.benefits && service.benefits.length > 0 && {benefits: service.benefits.join(', ')}),             
      } 
    }))
  },
  slogan: 'No necesitas gritar para ser escuchado',
  brand: {
    '@type': 'Brand',
    name: 'Shine',
    description: 'Marca de transformación digital que ayuda a Empresas, empresarios, profesionales y emprendedores a brillar con autenticidad',
    logo: COMPANY_INFO.url + COMPANY_INFO.logo
  },
  targetAudience: {
    '@type': 'Audience',
    audienceType: 'Empresas, empresarios, profesionales y emprendedores introvertidos',
    description: 'Profesionales brillantes que buscan crecer digitalmente sin perder su esencia auténtica'
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
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: COMPANY_INFO.url + '/buscar?q={search_term_string}'
    },
    'query-input': 'required name=search_term_string'
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
    },
    extend: {
      meta: [
        {
          name: 'keywords',
          content: [
            ...MAIN_KEYWORDS.primary,
            ...MAIN_KEYWORDS.secondary
          ].join(', ')
        }
      ]
    }
  };
}

export function generateServiceSEO(service: Service): SEOProps {
  const serviceUrl = `${COMPANY_INFO.url}/servicios/${service.slug}`;

  const pageTitle = `${service.title} | ${COMPANY_INFO.name}`;

  // Combine service-specific keywords with main brand keywords for consistency
  const allKeywords = [
    ...service.seoKeywords,
    ...MAIN_KEYWORDS.primary
  ];

  const keywordsString = allKeywords.join(', ');

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
        { name: 'keywords', content: keywordsString },
        { name: 'author', content: COMPANY_INFO.name },
        { name: 'robots', content: 'index, follow' },
        { httpEquiv: 'Content-Language', content: 'es-CO' }
      ]
    }

  }
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

// FAQ Schema generator for service pages
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): JSONLDSchema {
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

// Specific generators for different platforms
export function generateGoogleReviewsSchema(reviews: Array<{
  author_name: string;
  text: string;
  rating: number;
  time: number;
  author_url?: string;
  profile_photo_url?: string;
}>): JSONLDSchema {
  const formattedReviews = reviews.map(review => ({
    author: review.author_name,
    text: review.text,
    rating: review.rating,
    date: review.time,
    image: review.profile_photo_url,
    platform: 'Google'
  }));
  
  return generateReviewsSchema(formattedReviews);
}

