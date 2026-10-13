import type { SEOProps } from "astro-seo";
import type { ImageMetadata } from "astro";
import type { Service } from "./services";
import { services } from "./services";
import { AUTHORS, DEFAULT_AUTHOR } from "./authors";
import type { Author } from "./authors";
import { COMPANY_INFO } from "./companyInfo";

export type JSONLDSchema = Record<string, any>;

const SITE_URL = `${COMPANY_INFO.url}/`;
const ORGANIZATION_ID = `${COMPANY_INFO.url}#organization`;
const WEBSITE_ID = `${COMPANY_INFO.url}#website`;
const BLOG_ID = `${COMPANY_INFO.url}/blog#blog`;
const SERVICES_ID = `${COMPANY_INFO.url}/servicios`;
const PROJECTS_ID = `${COMPANY_INFO.url}/proyectos`;

export const JSONLD_STUB_REGISTRY: Record<string, JSONLDSchema> = {
  [ORGANIZATION_ID]: {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: COMPANY_INFO.name,
    url: SITE_URL,
    logo: COMPANY_INFO.url + COMPANY_INFO.logo,
  },
  [WEBSITE_ID]: {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: COMPANY_INFO.name,
    url: SITE_URL,
  },
  [BLOG_ID]: {
    "@type": "Blog",
    "@id": BLOG_ID,
    name: "Blog - " + COMPANY_INFO.name,
    url: `${COMPANY_INFO.url}/blog/`,
  },
  [SERVICES_ID]: {
    "@type": "CollectionPage",
    "@id": SERVICES_ID,
    name: "Servicios",
    url: `${COMPANY_INFO.url}/servicios/`,
  },
  [PROJECTS_ID]: {
    "@type": "CollectionPage",
    "@id": PROJECTS_ID,
    name: "Proyectos",
    url: `${COMPANY_INFO.url}/proyectos/`,
  },
};

// Default SEO configuration
export const DEFAULT_SEO: SEOProps = {
  title: "Shine | Agencia de Marketing Digital y Diseño Web en Colombia",
  description:
    "Diseño web con Astro, Google Ads, Facebook Ads y ecommerce con Tienda Nube para empresas en Colombia. Bogotá. Agenda tu diagnóstico gratuito hoy.",
  canonical: COMPANY_INFO.url,
  openGraph: {
    basic: {
      title: "Shine | Agencia de Marketing Digital y Diseño Web en Colombia",
      type: "website",
      image: COMPANY_INFO.url + COMPANY_INFO.image,
      url: COMPANY_INFO.url,
    },
    optional: {
      description: COMPANY_INFO.description,
      siteName: COMPANY_INFO.name,
      locale: "es_CO",
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "Shine | Agencia de Marketing Digital y Diseño Web en Colombia",
    description: COMPANY_INFO.description,
    image: COMPANY_INFO.url + COMPANY_INFO.image,
  },
  extend: {
    meta: [
      { name: "robots", content: "index, follow" },
      { name: "author", content: COMPANY_INFO.name },
      { name: "theme-color", content: "#FFD97D" },
      { name: "msapplication-TileColor", content: "#FFD97D" },
      { httpEquiv: "Content-Language", content: "es-CO" },
      { name: "geo.region", content: "CO-DC" },
      {
        name: "geo.placename",
        content: `${COMPANY_INFO.address.city}, ${COMPANY_INFO.address.country}`,
      },
    ],
  },
};

// JSON-LD Schema for Organization (merged ProfessionalService + LocalBusiness)
export const ORGANIZATION_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": COMPANY_INFO.url + "#organization",
  name: COMPANY_INFO.name,
  description: COMPANY_INFO.description,
  url: SITE_URL,
  logo: COMPANY_INFO.url + COMPANY_INFO.logo,
  image: COMPANY_INFO.url + COMPANY_INFO.image,
  foundingDate: COMPANY_INFO.foundingDate,
  telephone: COMPANY_INFO.phone,
  email: COMPANY_INFO.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: COMPANY_INFO.address.city,
    addressRegion: COMPANY_INFO.address.region,
    addressCountry: COMPANY_INFO.address.countryCode,
  },
  founder: AUTHORS.map((author) => ({
    "@type": "Person",
    "@id": `${COMPANY_INFO.url}/nosotros#${author.id}`,
    name: author.name,
  })),
  sameAs: [
    COMPANY_INFO.socialMedia.instagram,
    COMPANY_INFO.socialMedia.linkedin,
    COMPANY_INFO.socialMedia.tiktok,
  ],
  areaServed: {
    "@type": "Country",
    name: "Colombia",
    sameAs: "https://es.wikipedia.org/wiki/Colombia",
  },
  knowsAbout: services.map((s) => s.title),
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Servicios de Marketing Digital y Diseño Web",
    description:
      "Diseño web con Astro, Google Ads y Facebook Ads, y ecommerce con Tienda Nube para empresas y emprendedores en Colombia",
    itemListElement: services.map((service) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        "@id": `${COMPANY_INFO.url}/servicios/${service.slug}#service`,
        name: service.title,
        description: service.seoDescription,
        url: `${COMPANY_INFO.url}/servicios/${service.slug}/`,
        provider: {
          "@id": COMPANY_INFO.url + "#organization",
        },
      },
    })),
  },
};

// JSON-LD Schema for Website
export const WEBSITE_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": COMPANY_INFO.url + "#website",
  name: COMPANY_INFO.name,
  description: COMPANY_INFO.description,
  url: SITE_URL,
  inLanguage: "es-CO",
  copyrightYear: new Date().getFullYear(),
  copyrightHolder: { "@id": ORGANIZATION_ID },
  publisher: {
    "@id": COMPANY_INFO.url + "#organization",
  },
  mainEntity: {
    "@id": COMPANY_INFO.url + "#organization",
  },
};

// Dynamic Blog Schema Generator
export function generateBlogSchema(
  posts: Array<{
    id: string;
    title: string;
    description: string;
    publishDate: Date;
    tags?: string[];
    image?: string;
  }>,
): JSONLDSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": COMPANY_INFO.url + "/blog#blog",
    name: "Blog - " + COMPANY_INFO.name,
    description:
      "Consejos prácticos sobre diseño web, publicidad digital y ecommerce para empresas y emprendedores en Colombia",
    url: COMPANY_INFO.url + "/blog/",
    inLanguage: "es-CO",
    author: {
      "@id": COMPANY_INFO.url + "#organization",
    },
    publisher: {
      "@id": COMPANY_INFO.url + "#organization",
    },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${COMPANY_INFO.url}/blog/${post.id}#article`,
      headline: post.title,
      description: post.description,
      url: `${COMPANY_INFO.url}/blog/${post.id}/`,
      datePublished: post.publishDate.toISOString(),
      image: post.image
        ? COMPANY_INFO.url + post.image
        : COMPANY_INFO.url + COMPANY_INFO.image,
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${COMPANY_INFO.url}/blog/${post.id}`,
      },
    })),
  };
}

// Function to generate JSON-LD for individual blog posts
export function generateBlogPostSchema(post: {
  title: string;
  sanitizedSlug: string;
  description: string;
  publishDate: Date;
  modifiedDate?: Date;
  tags?: string[];
  image?: string;
  id: string;
  author?: {
    name: string;
    role?: string;
    url?: string;
    credentials?: string[];
  };
}): JSONLDSchema {
  // Resolve full author data from AUTHORS registry for richer E-E-A-T signals
  const fullAuthor: Author | undefined = post.author?.name
    ? AUTHORS.find((a) => a.name === post.author!.name)
    : undefined;
  const schemaAuthor = fullAuthor ?? DEFAULT_AUTHOR;
  const sameAs = fullAuthor ? getAuthorSameAs(fullAuthor) : [];

  // Build author schema - uses Person with @id if found in registry, falls back to Organization
  const authorSchema = post.author
    ? {
      "@type": "Person",
      "@id": `${COMPANY_INFO.url}/nosotros#${schemaAuthor.id}`,
      name: fullAuthor?.name ?? post.author.name,
      ...((fullAuthor?.role ?? post.author.role) && {
        jobTitle: fullAuthor?.role ?? post.author.role,
      }),
      ...(fullAuthor?.bio && { description: fullAuthor.bio }),
      ...(fullAuthor?.image && {
        image: COMPANY_INFO.url + fullAuthor.image,
      }),
      ...((fullAuthor?.url ?? post.author.url) && {
        url: COMPANY_INFO.url + (fullAuthor?.url ?? post.author.url),
      }),
      ...((fullAuthor?.credentials ?? post.author.credentials) && {
        knowsAbout: fullAuthor?.credentials ?? post.author.credentials,
      }),
      ...(sameAs.length > 0 && { sameAs }),
      worksFor: {
        "@id": COMPANY_INFO.url + "#organization",
      },
    }
    : {
      "@id": COMPANY_INFO.url + "#organization",
    };

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${COMPANY_INFO.url}/blog/${post.id}#article`,
    headline: post.title,
    description: post.description,
    url: `${COMPANY_INFO.url}/blog/${post.id}/`,
    datePublished: post.publishDate.toISOString(),
    ...(post.modifiedDate && { dateModified: post.modifiedDate.toISOString() }),
    author: authorSchema,
    publisher: {
      "@id": COMPANY_INFO.url + "#organization",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${COMPANY_INFO.url}/blog/${post.id}`,
    },
    image: post.image
      ? COMPANY_INFO.url + post.image
      : COMPANY_INFO.url + COMPANY_INFO.image,
    inLanguage: "es-CO",
    isPartOf: {
      "@id": COMPANY_INFO.url + "/blog#blog",
    },
    about: {
      "@type": "Thing",
      name: "Marketing Digital Auténtico",
    },
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
  const normalizedPath = options.path.endsWith("/")
    ? options.path
    : options.path + "/";
  const fullUrl = COMPANY_INFO.url + normalizedPath;
  const fullTitle = `${options.title} | ${COMPANY_INFO.name}`;

  return {
    title: fullTitle,
    description: options.description,
    canonical: fullUrl,
    noindex: options.noindex || false,
    openGraph: {
      basic: {
        title: fullTitle,
        type: "website",
        image: COMPANY_INFO.url + (options.image || COMPANY_INFO.image),
        url: fullUrl,
      },
      optional: {
        description: options.description,
        siteName: COMPANY_INFO.name,
        locale: "es_CO",
      },
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: options.description,
      image: COMPANY_INFO.url + (options.image || COMPANY_INFO.image),
    },
  };
}

export function generateServiceSEO(service: Service): SEOProps {
  const serviceUrl = `${COMPANY_INFO.url}/servicios/${service.slug}/`;
  const pageTitle = `${service.title} | ${COMPANY_INFO.name}`;

  return {
    title: pageTitle,
    description: service.seoDescription,
    canonical: serviceUrl,
    noindex: false,
    openGraph: {
      basic: {
        title: pageTitle,
        type: "website",
        image: COMPANY_INFO.url + (service.image.src || COMPANY_INFO.image),
        url: serviceUrl,
      },
      optional: {
        description: service.seoDescription,
        siteName: COMPANY_INFO.name,
        locale: "es_CO",
      },
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: service.seoDescription,
      image: COMPANY_INFO.url + (service.image.src || COMPANY_INFO.image),
    },
    extend: {
      meta: [
        { name: "author", content: COMPANY_INFO.name },
        { name: "robots", content: "index, follow" },
        { httpEquiv: "Content-Language", content: "es-CO" },
      ],
    },
  };
}

export function generateServiceSchema(service: Service): JSONLDSchema {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${COMPANY_INFO.url}/servicios/${service.slug}#service`,
    name: service.title,
    description: service.seoDescription,
    keywords: service.seoKeywords.join(", "),
    provider: {
      "@id": COMPANY_INFO.url + "#organization",
    },

    areaServed: {
      "@type": "Country",
      name: "Colombia",
    },

    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${COMPANY_INFO.url}/servicios/${service.slug}`,
      servicePhone: COMPANY_INFO.phone,
      serviceLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: COMPANY_INFO.address.city,
          addressCountry: "CO",
        },
      },
    },

    ...(service.benefits && {
      serviceOutput: service.benefits.join(", "),
    }),

    isPartOf: {
      "@type": "WebPage",
      "@id": COMPANY_INFO.url + "/servicios",
      name: "Servicios",
    },
  };
}

// CollectionPage schema generator — for index pages listing sub-items (services, projects, etc.)
export function generateCollectionPageSchema(options: {
  name: string;
  path: string;
  description?: string;
  hasPart: Array<{
    id: string;
    "@type": string;
    name: string;
    url: string;
  }>;
}): JSONLDSchema {
  const normalizedPath = options.path.endsWith("/")
    ? options.path.slice(0, -1)
    : options.path;

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": COMPANY_INFO.url + normalizedPath,
    name: options.name,
    description: options.description,
    url: COMPANY_INFO.url + normalizedPath + "/",
    isPartOf: { "@id": COMPANY_INFO.url + "#website" },
    about: { "@id": COMPANY_INFO.url + "#organization" },
    hasPart: options.hasPart.map((item) => ({
      "@type": item["@type"],
      "@id": item.id,
      name: item.name,
      url: item.url,
    })),
  };
}

// CreativeWork schema generator — for individual project/case-study detail pages
export function generateProjectSchema(project: {
  data: {
    slug: string;
    title: string;
    description: string;
    result?: string;
    image: ImageMetadata;
    pubDate: Date;
    updatedDate: Date;
    tags?: string[];
  };
}): JSONLDSchema {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${COMPANY_INFO.url}/proyectos/${project.data.slug}#project`,
    name: project.data.title,
    description: project.data.result ?? project.data.description,
    url: `${COMPANY_INFO.url}/proyectos/${project.data.slug}/`,
    image: COMPANY_INFO.url + project.data.image.src,
    datePublished: project.data.pubDate.toISOString(),
    dateModified: project.data.updatedDate.toISOString(),
    creator: { "@id": COMPANY_INFO.url + "#organization" },
    isPartOf: { "@id": COMPANY_INFO.url + "/proyectos" },
    ...(project.data.tags && { keywords: project.data.tags.join(", ") }),
  };
}

// Breadcrumb schema generator
export function generateBreadcrumbSchema(
  breadcrumbs: Array<{ name: string; path: string }>,
): JSONLDSchema {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: COMPANY_INFO.url + crumb.path,
    })),
  };
}

// ContactPage Schema - signals to Google and LLMs that this is the official contact entry point
export const CONTACT_PAGE_SCHEMA: JSONLDSchema = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": COMPANY_INFO.url + "/contacto#contactpage",
  name: "Contacto — " + COMPANY_INFO.name,
  description: "Agenda tu sesión de diagnóstico digital gratuita con el equipo de Shine Agencia. Respuesta garantizada en 24 horas.",
  url: COMPANY_INFO.url + "/contacto/",
  isPartOf: { "@id": COMPANY_INFO.url + "#website" },
  about: { "@id": COMPANY_INFO.url + "#organization" },
  contactOption: "https://schema.org/TollFree",
  telephone: COMPANY_INFO.phone,
  email: COMPANY_INFO.email,
  areaServed: { "@type": "Country", name: "Colombia" },
};

// Internal helper for reviews schema generation
function generateReviewsSchema(
  reviews: Array<{
    author: string;
    text: string;
    rating: number;
    datePublished: number;
    image?: string;
    platform: string;
  }>,
): JSONLDSchema {
  // Calculate aggregate rating
  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  const averageRating = reviews.length > 0 ? totalRating / reviews.length : 0;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": COMPANY_INFO.url + "#organization-reviews",
    name: COMPANY_INFO.name,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: averageRating.toFixed(1),
      reviewCount: reviews.length,
      bestRating: "5",
      worstRating: "1",
    },
    review: reviews.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
        ...(review.image && { image: review.image }),
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: review.text,
      datePublished: new Date(review.datePublished * 1000).toISOString(),
      publisher: {
        "@type": "Organization",
        name: review.platform,
      },
    })),
  };
}

// Specific generators for different platforms
export function generateGoogleReviewsSchema(
  reviews: Array<{
    author_name: string;
    text: string;
    rating: number;
    datePublished: number;
    author_url?: string;
    profile_photo_url: ImageMetadata;
  }>,
): JSONLDSchema {
  const formattedReviews = reviews.map((review) => ({
    author: review.author_name,
    text: review.text,
    rating: review.rating,
    datePublished: review.datePublished,
    image: review.profile_photo_url.src,
    platform: "Google",
  }));

  return generateReviewsSchema(formattedReviews);
}

// ============================================================================
// FAQ Content Types - For AEO (Answer Engine Optimization)
// ============================================================================

export interface FAQItem {
  question: string;
  answer: string;
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
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: options.name,
    description: options.description,
    step: options.steps.map((step, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: step.name,
      text: step.text,
      ...(step.image && { image: COMPANY_INFO.url + step.image }),
      ...(step.url && { url: COMPANY_INFO.url + step.url }),
    })),
  };

  // Add optional properties if provided
  if (options.totalTime) {
    schema.totalTime = options.totalTime;
  }

  if (options.estimatedCost) {
    schema.estimatedCost = {
      "@type": "MonetaryAmount",
      currency: options.estimatedCost.currency,
      value: options.estimatedCost.value,
    };
  }

  if (options.image) {
    schema.image = COMPANY_INFO.url + options.image;
  }

  if (options.supply && options.supply.length > 0) {
    schema.supply = options.supply.map((item) => ({
      "@type": "HowToSupply",
      name: item,
    }));
  }

  return schema;
}

/**
 * Generates HowTo schema linked to a specific blog post or page.
 */
export function generateHowToSchemaWithPage(
  options: HowToOptions,
  pageUrl: string,
): JSONLDSchema {
  const baseSchema = generateHowToSchema(options);

  return {
    ...baseSchema,
    "@id": `${pageUrl}#howto`,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
  };
}

// ============================================================================
// Author / Person Schema - For E-E-A-T on /nosotros and blog posts
// ============================================================================

function getAuthorSameAs(author: Author): string[] {
  const sameAs: string[] = [];
  if (author.socialMedia?.linkedin) sameAs.push(author.socialMedia.linkedin);
  if (author.socialMedia?.instagram) sameAs.push(author.socialMedia.instagram);
  return sameAs;
}

/**
 * Generates a Person schema for a single author.
 * Use on /nosotros page to establish author authority as a named entity in Google's Knowledge Graph.
 */
export function generateAuthorSchema(author: Author): JSONLDSchema {
  const sameAs = getAuthorSameAs(author);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${COMPANY_INFO.url}/nosotros#${author.id}`,
    name: author.name,
    description: author.bio,
    jobTitle: author.role,
    ...(author.image && { image: COMPANY_INFO.url + author.image }),
    ...(author.url && { url: COMPANY_INFO.url + author.url }),
    worksFor: {
      "@id": COMPANY_INFO.url + "#organization",
    },
    knowsAbout: author.credentials,
    ...(sameAs.length > 0 && { sameAs }),
  };
}

/**
 * Generates Person schemas for all registered authors.
 * Pass the result as `aditionalSchemas` to MainLayout on the /nosotros page.
 */
export function generateAllAuthorsSchemas(): JSONLDSchema[] {
  return AUTHORS.map((author) => generateAuthorSchema(author));
}
