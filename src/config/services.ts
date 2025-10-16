import type { ImageMetadata } from 'astro';

import SocialContent from '@/assets/images/redessociales.webp';
import WebDesign from '@/assets/images/diseñoyrediseñoweb.webp';
import Audit from '@/assets/images/auditoriadigital.webp';

export interface Service {
    slug: string;
    title: string;
    subtitle?: string;
    tags?: string[];
    problem?: string;
    content: string;
    benefits: string[];
    image: ImageMetadata;
    alt: string;
    // SEO fileds
    seoDescription: string;
    seoKeywords: string[];
    focusKeyword: string;
}

export const services: Service[] = [
  {
    slug: "marca-personal",
    title: "Estrategia de Marca Personal",
    subtitle: "Lidera tu sector con autoridad digital",
    tags: ["Marca Personal", "Contenidos", "Autoridad Digital"],
    problem: "Muchos profesionales tienen experiencia valiosa pero luchan por destacar en el ruido digital y atraer clientes de alto valor.",
    content: "Convertimos tu experiencia y tu historia en autoridad digital. Diseñamos la estrategia de contenidos y marca personal para que lideres tu sector, atrayendo clientes de alto valor que realmente conecten con tu propósito",
    benefits: [
      "Posicionamiento como líder de opinión en tu sector",
      "Atracción de clientes de alto valor que conectan con tu propósito",
      "Estrategia de contenidos personalizada y sostenible",
      "Mayor visibilidad y reconocimiento profesional"
    ],
    image: SocialContent,
    alt: "Estrategia de Marca Personal - Shine Agencia",
    seoDescription: "Diseñamos estrategias de marca personal y contenidos para que lideres tu sector y atraigas clientes de alto valor que conecten con tu propósito.",
    seoKeywords: ["marca personal", "estrategia de contenidos", "autoridad digital", "personal branding", "liderazgo digital"],
    focusKeyword: "marca personal"
  },
  {
    slug: "diseno-web-estrategico",
    title: "Diseño y Optimización Web Estratégica",
    subtitle: "Tu página web como tu mejor vendedor",
    tags: ["Diseño Web", "Astro", "Performance", "Optimización"],
    problem: "La mayoría de las páginas web son lentas, difíciles de mantener y no convierten visitantes en clientes de manera efectiva.",
    content: "Tu página web como tu mejor vendedor. Construimos activos digitales con tecnología Astro, hasta un 40% más rápidos, seguros y eficientes. Ten una página web que hable por tu marca 24/7.",
    benefits: [
      "Páginas hasta 40% más rápidas que la competencia",
      "Tecnología moderna con Astro framework para máxima eficiencia",
      "Diseño que convierte visitantes en clientes",
      "Sitio web que trabaja por tu marca las 24 horas"
    ],
    image: WebDesign,
    alt: "Diseño y Optimización Web Estratégica con Astro - Shine Agencia",
    seoDescription: "Construimos páginas web con Astro framework, hasta 40% más rápidas, seguras y eficientes. Tu sitio web como el mejor vendedor de tu marca 24/7.",
    seoKeywords: ["diseño web", "desarrollo web astro", "optimización web", "páginas web rápidas", "diseño web colombia"],
    focusKeyword: "diseño web"
  },
  {
    slug: "auditoria-marketing-digital",
    title: "Auditoría de Marketing Digital Estratégica",
    subtitle: "Claridad antes de la acción",
    tags: ["Auditoría Digital", "ROI", "Análisis", "Estrategia"],
    problem: "Inviertes en marketing digital pero no ves resultados claros. No sabes qué está fallando ni por dónde empezar a optimizar.",
    content: "¿No sabes por qué tu marketing no funciona? Realizamos un análisis profundo de tu presencia digital actual para identificar las fugas, oportunidades clave y la hoja de ruta precisa para maximizar tu impacto y el ROI (Return on Investment.). Claridad antes de la acción.",
    benefits: [
      "Identificación precisa de fugas y oportunidades perdidas",
      "Diagnóstico completo de tu presencia digital actual",
      "Hoja de ruta clara para maximizar ROI",
      "Decisiones basadas en datos, no en suposiciones"
    ],
    image: Audit,
    alt: "Auditoría de Marketing Digital Estratégica - Shine Agencia",
    seoDescription: "Análisis profundo de tu presencia digital para identificar fugas, oportunidades clave y la hoja de ruta precisa para maximizar tu impacto y ROI.",
    seoKeywords: ["auditoría digital", "análisis marketing digital", "auditoría seo", "consultoría digital", "diagnóstico digital"],
    focusKeyword: "auditoría digital"
  }
]

/**
 * Get a service by slug
 * Return undefined if not found
 */
export const getServiceBySlug = (slug: string) => {
  return services.find((service) => service.slug === slug);
}
    