import type { SEOProps } from 'astro-seo';
import type { Service } from './services';
import { services } from './services';

export type JSONLDSchema = Record<string, any>;

// Company base information
export const COMPANY_INFO = {
  name: 'Shine',
  description: 'Transformamos tu presencia digital con estrategia, propósito y autenticidad. Diseño web, marketing digital y contenido que refleja tu verdadera esencia.',
  url: 'https://shineagencia.com', // Replace with current domain
  phone: '+57-3162560670', // Replace with current phone
  email: 'rocio.shineagencia@gmail.com', // Replace with current email
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
    site: '@shine_web',
    creator: '@shine_web',
    title: 'Shine | Transformamos tu presencia digital con propósito',
    description: COMPANY_INFO.description,
    image: COMPANY_INFO.url + COMPANY_INFO.image
  },
  extend: {
    meta: [
      
      { name: 'robots', content: 'index, follow' },
      { name: 'author', content: COMPANY_INFO.name },
      { name: 'keywords', content: 'diseño web estratégico, marketing digital auténtico, rediseño web, optimización web, estrategia contenido redes sociales, auditoría marketing digital, presencia digital, branding auténtico, desarrollo web Bogotá, marketing digital introvertidos, transformación digital, sitios web profesionales, SEO, conversión web' },
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
  alternateName: 'Shine Web',
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
  mission: 'Acompañamos a profesionales brillantes a transformar su presencia digital sin sacrificar su esencia, guiados por principios eternos de servicio y excelencia.',
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
    description: 'Marca de transformación digital que ayuda a profesionales a brillar con autenticidad',
    logo: COMPANY_INFO.url + COMPANY_INFO.logo
  },
  targetAudience: {
    '@type': 'Audience',
    audienceType: 'Profesionales y emprendedores introvertidos',
    description: 'Profesionales brillantes que buscan crecer digitalmente sin perder su esencia auténtica'
  }
};

// JSON-LD Schema for Website
export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': COMPANY_INFO.url + '#website',
  name: COMPANY_INFO.name,
  alternateName: 'Shine Web',
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
      site: '@shine_web',
      creator: '@shine_web',
      title: fullTitle,
      description: options.description,
      image: COMPANY_INFO.url + (options.image || COMPANY_INFO.image)
    }
  };
}

export function generateServiceSEO(service: Service): SEOProps {
  const serviceUrl = `${COMPANY_INFO.url}/servicios/${service.slug}`;
  
  const pageTitle = `${service.title} | ${COMPANY_INFO.name}`;

  const keywordsString = service.seoKeywords.join(', ');

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
      site: '@shine_web',
      creator: '@shine_web',
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

// Universal Reviews Schema Generator
export function generateReviewsSchema(reviews: Array<{
  author: string;
  text: string;
  rating: number;
  date?: Date | string | number; // Flexible date handling
  position?: string;
  company?: string;
  image?: string;
  platform?: string; // e.g., 'Google', 'Facebook', 'LinkedIn', 'Website'
  verified?: boolean;
}>): JSONLDSchema {
  // Calculate aggregate rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = reviews.length > 0 ? (totalRating / reviews.length) : 0;

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': COMPANY_INFO.url + '#organizacion',
    aggregateRating: reviews.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: 5,
      worstRating: 1
    } : undefined,
    review: reviews.map(review => {
      // Handle different date formats
      let publishedDate: string | undefined;
      if (review.date) {
        if (review.date instanceof Date) {
          publishedDate = review.date.toISOString();
        } else if (typeof review.date === 'string') {
          publishedDate = new Date(review.date).toISOString();
        } else if (typeof review.date === 'number') {
          // Assume Unix timestamp
          publishedDate = new Date(review.date * 1000).toISOString();
        }
      }

      return {
        '@type': 'Review',
        author: {
          '@type': 'Person',
          name: review.author,
          image: review.image,
          jobTitle: review.position,
          worksFor: review.company ? {
            '@type': 'Organization',
            name: review.company
          } : undefined
        },
        reviewBody: review.text,
        reviewRating: {
          '@type': 'Rating',
          ratingValue: review.rating,
          bestRating: 5,
          worstRating: 1
        },
        datePublished: publishedDate,
        publisher: review.platform ? {
          '@type': 'Organization',
          name: review.platform
        } : {
          '@type': 'Organization',
          name: COMPANY_INFO.name
        }
      };
    })
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

export function generateLinkedInRecommendationsSchema(recommendations: Array<{
  recommender: string;
  text: string;
  position?: string;
  company?: string;
  date?: string;
}>) {
  const formattedReviews = recommendations.map(rec => ({  
    author: rec.recommender,
    text: rec.text,
    rating: 5, // LinkedIn recommendations don't have ratings, assume 5 stars
    date: rec.date,
    position: rec.position,
    company: rec.company,
    platform: 'LinkedIn'
  }));
  
  return generateReviewsSchema(formattedReviews);
}

// For manual/website testimonials
export function generateTestimonialsSchema(testimonials: Array<{
  author: string;
  text: string;
  rating?: number;
  date?: Date;
  position?: string;
  company?: string;
  image?: string;
  verified?: boolean;
}>): JSONLDSchema {
  const formattedReviews = testimonials.map(testimonial => ({
    author: testimonial.author,
    text: testimonial.text,
    rating: testimonial.rating || 5, // Default to 5 if no rating provided
    date: testimonial.date,
    position: testimonial.position,
    company: testimonial.company,
    image: testimonial.image,
    platform: 'Website',
    verified: testimonial.verified
  }));
  
  return generateReviewsSchema(formattedReviews);
}