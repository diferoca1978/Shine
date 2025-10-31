import type { ImageMetadata } from 'astro';

import SocialContent from '@/assets/images/redessociales.webp';
import SocialContentStruggled from '@/assets/images/socialContentStruggled.webp';
import WebDesign from '@/assets/images/diseñoyrediseñoweb.webp';
import Audit from '@/assets/images/auditoriadigital.webp';

export interface Service {
    slug: string;
    title: string;
    subtitle?: string;
    introText?: string;
    tags?: string[];
    problem?: string;
    content: string;
    benefits: string[];
    hurts: string[];
    checkMarks: string[];
    process: {
      title: string;
      description: string;
    }[];
    image: ImageMetadata;
    secondaryImage: ImageMetadata;
    alt: string;
    // SEO fields
    seoDescription: string;
    seoKeywords: string[]; // Primary keywords for meta tags
    secondaryKeywords?: string[]; // Secondary/long-tail keywords for content optimization
    focusKeyword: string;
}

export const services: Service[] = [
  {
    slug: "marca-personal",
    title: "Estrategia de Marca Personal y Contenidos",
    subtitle: "Transforme su experiencia en autoridad y visibilidad.",
    introText: "Entendemos que te preocupa:",
    tags: ["Marca Personal", "Contenidos B2B", "LinkedIn", "Leads Cualificados"],
    problem: "¿Eres brillante pero digitalmente invisible?",
    content: "Para líderes que tienen un valor inmenso, pero luchan por comunicarlo. Desarrollamos su propósito, posicionamiento y un plan de contenidos estratégico para que atraiga clientes ideales y se establezca como el referente de su industria.",
    benefits: [
      "Propósito y Posicionamiento Único: Descubre tu voz.",
      "Plan de Contenidos Estratégico: Atrae, nutre y convierte.",
      "Narrativa (Storytelling) Potente.",
      "Convertir tu audiencia en clientes."
    ],
    hurts: [
      "Contenido sin impacto ni leads.",
      "Dependencia de referidos, limitando el crecimiento.",
      "Dificultad para diferenciarte en el ruido digital.",
      "Tiempo invertido en marketing sin resultados."
    ],
    checkMarks: [
      "Tienes gran valor, pero te falta estrategia para comunicarlo.",
      "Listo para dejar de depender de referidos.",
      "Buscas posicionarte como líder y referente.",
      "Valoras un marketing auténtico y ético a largo plazo.",
      "Dispuesto a invertir en una marca personal sólida."
    ],
    process: [
      {
        title:'Diagnóstico Inicial',
        description: 'Entendemos tu visión, tus desafíos y tus objetivos. Articulamos tu porqué, tu voz y el arquetipo de tu cliente ideal.'
      },
      {
        title:'Arquitectura de Contenidos',
        description: 'Desarrollamos los pilares, temas y formatos que resonarán con tu audiencia.'
      },
      {
        title:'Estrategia Multicanal',
        description: 'Adaptamos tu mensaje para LinkedIn, Instagram, TikTok y tu blog, maximizando tu alcance.'
      },
      {
        title:'Plan de Acción y Medición',
        description: 'Te entregamos una hoja de ruta clara y métricas para seguir tu evolución.'
      }
    ],
    image: SocialContent,
    secondaryImage: SocialContentStruggled,
    alt: "Estrategia de Marca Personal y contenidos - Shine Agencia",
    seoDescription: "Descubre cómo construir una marca personal que atrae clientes ideales. Estrategias de contenido para fundadores y emprendedores",
    seoKeywords: [
      "estrategia de marca personal",
      "estrategia de contenidos B2B",
      "consultoría de marketing en Bogotá",
      "consultoría de marca personal",
      "posicionamiento de autoridad",
      "generación de leads con contenido",
      "marca personal para fundadores"
    ],
    secondaryKeywords: [
      "cómo crear una marca personal",
      "servicios de estrategia de contenidos",
      "posicionamiento en LinkedIn para empresas",
      "aumentar visibilidad online",
      "marketing de contenidos para emprendedores",
      "convertirse en referente del sector",
      "agencia de marca personal Colombia",
      "atraer clientes de alto valor",
      "crear contenido que vende"
    ],
    focusKeyword: "estrategia de marca personal y contenidos"
  },
  {
    slug: "diseno-web-estrategico",
    title: "Diseño Web de Alto Rendimiento",
    subtitle: "Construya su activo digital desde cero.",
    tags: ["Astro Framework", "Alto Rendimiento", "Web Profesional", "SEO"],
    problem: "La mayoría de las páginas web son lentas, difíciles de mantener y no convierten visitantes en clientes de manera efectiva.",
    content: "Para quienes buscan una presencia digital impecable desde el primer día. Creamos sitios web ultrarrápidos, seguros y diseñados para convertir con la tecnología Astro, asegurando una base sólida para su crecimiento online.",
    benefits: [
      "Páginas hasta 40% más rápidas que la competencia",
      "Tecnología moderna con Astro framework para máxima eficiencia",
      "Diseño que convierte visitantes en clientes",
      "Sitio web que trabaja por tu marca las 24 horas"
    ],
    image: WebDesign,
    alt: "Diseño y Optimización Web Estratégica con Astro framework - Shine Agencia",
    seoDescription: "Creamos sitios web ultrarrápidos, seguros y optimizados con Astro framework para líderes que necesitan una presencia digital sólida desde cero.",
    seoKeywords: [
      "diseño web con Astro framework Colombia",
      "desarrollo web de alto rendimiento",
      "agencia de diseño web Bogotá",
      "crear página web profesional desde cero",
      "páginas web rápidas para empresas",
      "desarrollo web seguro para negocios"
    ],
    secondaryKeywords: [
      "alternativas a WordPress en Colombia",
      "cuánto cuesta una página web en Astro",
      "beneficios de Astro para SEO",
      "sitios web estáticos para empresas",
      "mejorar velocidad de carga de mi nueva web",
      "diseño web para startups en Colombia"
    ],
    focusKeyword: "desarrollo web de alto rendimiento"
  },
  {
    slug: "rediseño-web-estrategico",
    title: "Optimización y Rediseño Estratégico",
    subtitle: "Active el potencial oculto de su sitio web actual",
    tags: ["Rediseño Web", "Optimización UX", "Web que No Vende", "Conversiones"],
    problem: "Inviertes en marketing digital pero no ves resultados claros. No sabes qué está fallando ni por dónde empezar a optimizar.",
    content: "Si ya tiene una web, pero no genera los resultados esperados, nosotros la transformamos. Optimizamos su diseño, velocidad, SEO y conversión para que su inversión digital finalmente trabaje para su negocio.",
    benefits: [
      "Auditoría Profunda: Identificamos puntos débiles y oportunidades.",
      "Estrategia de Rediseño: Planificamos la mejora de UX, UI y contenido.",
      "Implementación Técnica: Optimizamos código, velocidad y seguridad (usando Astro/stack si aplica).",
      "Optimización SEO y Contenidos: Ajustamos para mayor visibilidad y relevancia.",
      "Pruebas y Lanzamiento: Aseguramos un rendimiento impecable y medimos los resultados."
    ],
    image: Audit,
    alt: "Optimización y Rediseño Estratégico Web - Shine Agencia",
    seoDescription: "Análisis profundo para mejora, optimización, rediseño y activación de sitios web existentes",
    seoKeywords: [
      "optimización web estratégica",
      "rediseño web estratégico",
      "auditoría web estratégica",
      "mejorar rendimiento web",
      "web que no vende",
      "transformar web existente"
    ],
    secondaryKeywords: [
      "cómo optimizar mi página web",
      "servicio de rediseño web para empresas",
      "aumentar conversiones web",
      "consultoría SEO web existente",
      "hacer mi web más rápida",
      "web lenta solución",
      "web corporativa sin resultados",
      "actualizar diseño web",
      "agencia de optimización web",
      "optimización de la experiencia de usuario (UX)"
    ],
    focusKeyword: "optimización web estratégica"
  }
]

/**
 * Get a service by slug
 * Return undefined if not found
 */
export const getServiceBySlug = (slug: string) => {
  return services.find((service) => service.slug === slug);
}
    