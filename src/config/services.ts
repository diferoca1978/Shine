import type { ImageMetadata } from 'astro';

import SocialContent from '@/assets/images/redessociales.webp';
import InvisibilityProblem from '@/assets/images/invisibility.webp';
import WebDesign from '@/assets/images/diseñoWebAltoRen.webp';
import Audit from '@/assets/images/diseñoyrediseñoweb.webp';

export interface Service {
    slug: string;
    title: string;
    subtitle?: string;
    introText?: string;
    tags?: string[];
    problem?: string;
    content: string;
    benefitsTitle?: string;
    benefitsIntro?: string;
    audienceTitle?: string;
    audienceIntro?: string;
    benefits: string[];
    checkMarks: string[];
    hurts: string[];
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
    benefitsTitle: "Tu estrategia para transformar tu experiencia en autoridad digital.",
    benefitsIntro: "En Shine, trabajamos contigo para:",
    audienceTitle: "¿Para quién es este servicio?",
    audienceIntro: "Este servicio es para ti si...",
    benefits: [
      "Propósito y Posicionamiento Único: Descubre tu voz.",
      "Plan de Contenidos Estratégico: Atrae, nutre y convierte.",
      "Narrativa (Storytelling) Potente.",
      "Convertir tu audiencia en clientes."
    ],
    checkMarks: [
      "Tienes gran valor, pero te falta estrategia para comunicarlo.",
      "Listo para dejar de depender de referidos.",
      "Buscas posicionarte como líder y referente.",
      "Valoras un marketing auténtico y ético a largo plazo.",
      "Dispuesto a invertir en una marca personal sólida."
    ],
    hurts: [
      "Contenido sin impacto ni leads.",
      "Dependencia de referidos, limitando el crecimiento.",
      "Dificultad para diferenciarte en el ruido digital.",
      "Tiempo invertido en marketing sin resultados."
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
    secondaryImage: InvisibilityProblem,
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
    title: "Diseño Web de Alto Rendimiento (Astro)",
    subtitle: "Diseñamos y construimos tu activo digital desde cero con Astro Framework, ultrarrápido, seguro y eficiente, tu punto de partida para brillar.",
    introText: "Sin presencia digital, te enfrentas a desafíos que frenan tu crecimiento:",
    tags: ["Astro Framework", "Alto Rendimiento", "Web Profesional", "SEO"],
    problem: "¿Estás dejando pasar oportunidades por no tener la base digital adecuada?",
    content: "Creamos sitios web ultrarrápidos, seguros y optimizados con Astro Framework para empresas/emprendedores que necesitan una presencia digital sólida desde cero.",
    benefitsTitle: "Tu web, tu mejor vendedor 24/7",
    benefitsIntro: "En shine te ayudamos a construir una web que:",
    audienceTitle: "¿Para quién es este servicio?",
    audienceIntro: "Este servicio es para ti si:",
    benefits: [
      "Sea una herramienta de ventas activa.",
      "Tenga un rendimiento excepcional, la velocidad y la experiencia fluida se traducen directamente en más conversiones.",
      "Tenga SEO potenciado para que los motores de búsqueda puedan rastrear e indexar tu contenido instantáneamente.",
      "Tenga un diseño 100% personalizado.",
      "Sea segura y confiable.",
      "Sea facilmente mantenible en el tiempo sin costos ocultos."
    ],
    checkMarks: [
      "No tienes web profesional o estás empezando de cero.",
      "Buscas una inversión estratégica en una nueva web.",
      "Quieres una web que sea una herramienta de ventas activa.",
      "Valoras velocidad, seguridad y eficiencia al máximo.",
      "Deseas posicionar tu marca como innovadora."
    ],
    hurts: [
      "Invisibilidad y Oportunidades Perdidas: Tu talento y tus soluciones no llegan a quienes las necesitan.",
      "Credibilidad Comprometida: Una primera impresión digital deficiente erosiona la confianza.",
      "Frenos al Crecimiento: Soluciones rápidas o de baja calidad te condenan a problemas técnicos constantes y altos costos ocultos."
    ],
    process: [
      {
        title: 'Estrategia y Arquitectura',
        description: 'Definimos los objetivos, estructura de contenidos y experiencia de usuario ideal para tu negocio.'
      },
      {
        title: 'Desarrollo Ágil Con Astro',
        description: 'Construimos tu sitio con tecnología de vanguardia para máxima velocidad y rendimiento.'
      },
      {
        title: 'Diseño UX/UI Conversión',
        description: 'Creamos interfaces atractivas y funcionales diseñadas para convertir visitantes en clientes.'
      },
      {
        title: 'SEO, Pruebas y Lanzamiento',
        description: 'Optimización SEO para buscadores, Test de funcionalidad en diferentes dispositivos, Publicamos tu sitio.'
      }
    ],
    image: WebDesign,
    secondaryImage: InvisibilityProblem,
    alt: "Diseño Web de Alto Rendimiento con Astro framework - Shine Agencia",
    seoDescription: "Creamos sitios web ultrarrápidos, seguros y optimizados con Astro Framework para líderes que necesitan una presencia digital sólida desde cero. ¡Agenda tu diagnóstico gratuito!",
    seoKeywords: [
      "diseño web con Astro Framework Colombia",
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
    focusKeyword: "diseño web con Astro Framework"
  },
  {
    slug: "rediseño-web-estrategico",
    title: "Optimización y Rediseño Estratégico",
    subtitle: "Transformamos tu sitio web actual en una máquina de leads y ventas, sin empezar de cero.",
    introText: "¿Invertiste en una web pero no ves resultados? No necesitas una nueva, necesitas una estrategia.",
    tags: ["Rediseño Web", "Optimización UX", "Web que No Vende", "Conversiones"],
    problem: "¿Tu web actual es un gasto, no una inversión?",
    content: "Si ya tiene una web, pero no genera los resultados esperados, nosotros la transformamos. Optimizamos su diseño, velocidad, SEO y conversión para que su inversión digital finalmente trabaje para su negocio.",
    benefitsTitle: "Transforma tu web de un gasto a tu mejor vendedor 24/7",
    benefitsIntro: "En Shine, te ayudamos a:",
    audienceTitle: "Este servicio es ideal para líderes que...",
    audienceIntro: "",
    benefits: [
      "Conversión Optimizada: Convertimos más visitantes en leads y clientes.",
      "Diseño Moderno y Funcional: Actualiza tu imagen y mejora la experiencia del usuario.",
      "Velocidad y Seguridad Mejoradas: Impulsa tu SEO y la confianza de tus visitantes.",
      "Estrategia de Contenidos y SEO: Atrae tráfico cualificado y relevante.",
      "Deja los problemas técnicos en manos expertas y enfócate en tu negocio."
    ],
    checkMarks: [
      "Ya tienen una web, pero no les está generando el ROI esperado.",
      "Sienten que el diseño o la funcionalidad de su sitio están desactualizados.",
      "Experimentan problemas de velocidad, seguridad o rendimiento técnico.",
      "Buscan maximizar su inversión existente en lugar de empezar de cero.",
      "Quieren una estrategia clara para atraer y convertir clientes a través de su web."
    ],
    hurts: [
      "Bajo Rendimiento: Visitas sin conversiones, objetivos no alcanzados.",
      "Diseño Obsoleto: No proyecta profesionalismo ni confianza.",
      "Lentitud y Problemas Técnicos: Mal SEO, usuarios frustrados, mantenimiento constante.",
      "Falta de Estrategia: Contenido sin impacto, llamadas a la acción ineficaces.",
      "Pérdida de Inversión: Sientes que tu dinero en la web no ha valido la pena."
    ],
    process: [
      {
        title: 'Auditoría Profunda',
        description: 'Identificamos puntos débiles y oportunidades en tu sitio actual.'
      },
      {
        title: 'Estrategia de Rediseño',
        description: 'Planificamos la mejora de UX, UI y contenido basándonos en los hallazgos.'
      },
      {
        title: 'Implementación Técnica',
        description: 'Optimizamos código, velocidad y seguridad (usando Astro/stack si aplica).'
      },
      {
        title: 'Optimización SEO y Contenidos',
        description: 'Ajustamos para mayor visibilidad y relevancia en buscadores.'
      },
      {
        title: 'Pruebas y Lanzamiento',
        description: 'Aseguramos un rendimiento impecable y medimos los resultados.'
      }
    ],
    image: Audit,
    secondaryImage: InvisibilityProblem,
    alt: "Optimización y Rediseño Estratégico Web - Shine Agencia",
    seoDescription: "¿Tu web no genera resultados? En Shine, optimizamos y rediseñamos tu plataforma actual para mejorar conversiones, velocidad y SEO. ¡Agenda tu auditoría gratuita!",
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
    