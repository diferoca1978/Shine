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
}

export const services: Service[] = [
  {
    slug: "diseno-web-estrategico",
    title: "Diseño Web con Astro framework",
    subtitle: "Construimos tu sitio web desde cero con Astro Framework — la tecnología que supera a WordPress en velocidad, seguridad y posicionamiento en Google.",
    introText: "Sin presencia digital sólida, te enfrentas a desafíos que frenan tu crecimiento:",
    tags: ["Astro Framework", "PageSpeed 95–100", "Sin WordPress", "SEO Técnico"],
    problem: "¿Estás dejando pasar oportunidades por no tener la base digital adecuada?",
    content: "Creamos sitios web ultrarrápidos, seguros y optimizados con Astro Framework para empresas y emprendedores en Colombia que necesitan una presencia digital que sí vende — no una tarjeta de presentación bonita que nadie encuentra.",
    benefitsTitle: "Tu web, tu mejor vendedor 24/7",
    benefitsIntro: "En Shine construimos sitios que:",
    audienceTitle: "¿Para quién es este servicio?",
    audienceIntro: "Este servicio es para ti si:",
    benefits: [
      "Cargan en menos de 1 segundo — PageSpeed 95 a 100 garantizado.",
      "Pasan los Core Web Vitals de Google sin ajustes posteriores.",
      "No dependen de plugins que se rompen con cada actualización.",
      "Tienen SEO técnico integrado desde el día uno.",
      "Son administrables por ti, sin necesitar un técnico para cada cambio."
    ],
    checkMarks: [
      "No tienes web profesional o estás empezando de cero.",
      "Buscas una inversión estratégica en una nueva web.",
      "Quieres una web que sea una herramienta de ventas activa.",
      "Valoras velocidad, seguridad y eficiencia al máximo.",
      "Deseas posicionar tu negocio en Google con resultados medibles."
    ],
    hurts: [
      "Invisibilidad: Tu talento y tus soluciones no llegan a quienes las necesitan.",
      "Credibilidad comprometida: Una primera impresión digital deficiente erosiona la confianza antes de que hablen contigo.",
      "Frenos al crecimiento: WordPress lento, plugins que se rompen y costos ocultos de mantenimiento que nunca terminan."
    ],
    process: [
      {
        title: 'Estrategia y Arquitectura',
        description: 'Antes de diseñar una sola pantalla, entendemos tu negocio: quién es tu cliente ideal, qué lo hace decidir, qué hace tu competencia y cómo tu sitio puede diferenciarte. Definimos la arquitectura completa: páginas, estructura, jerarquía de contenido y mapa de conversión. Entregable: blueprint del sitio aprobado por ti antes de escribir una línea de código.'
      },
      {
        title: 'Desarrollo con Astro',
        description: 'Construimos el sitio con Astro Framework — sin templates genéricos. Cada componente se desarrolla a medida, pensando en velocidad de carga, accesibilidad y estructura semántica que Google puede leer perfectamente. Sin plugins. Sin puntos de falla.'
      },
      {
        title: 'Diseño UX/UI y Contenido',
        description: 'Aplicamos tu identidad visual y optimizamos cada sección para que el visitante entienda qué haces, por qué tú y qué tiene que hacer a continuación. Probamos en móvil, tablet y escritorio, tu sitio totalmente responsive.'
      },
      {
        title: 'SEO, Pruebas y Lanzamiento',
        description: 'Configuramos meta tags, schema markup, sitemap XML, Google Search Console y Analytics. Corremos el checklist de lanzamiento completo y medimos velocidad (objetivo: 90+ en Google PageSpeed).'
      }
    ],
    image: WebDesign,
    secondaryImage: InvisibilityProblem,
    alt: "Diseño Web con Astro Framework - Shine Agencia Colombia",
    seoDescription: "Creamos sitios web ultrarrápidos con Astro Framework para empresas y emprendedores en Colombia. Sin WordPress. Sin plugins. PageSpeed 95–100 garantizado. Agenda tu diagnóstico gratuito.",
    seoKeywords: [
      "diseño web con Astro Colombia",
      "diseño web profesional Bogotá",
      "agencia de diseño web Colombia",
      "crear página web profesional",
      "páginas web rápidas Colombia",
      "desarrollo web sin WordPress"
    ],
    secondaryKeywords: [
      "alternativas a WordPress en Colombia",
      "cuánto cuesta una página web en Colombia",
      "beneficios de Astro para SEO",
      "sitios web estáticos para empresas",
      "mejorar velocidad de carga web",
      "diseño web para startups Colombia",
      "web profesional Bogotá precio",
      "página web empresarial Colombia"
    ],
  },
  {
    slug: "publicidad-digital",
    title: "Google Ads y Facebook Ads",
    subtitle: "Gestionamos tus campañas en Google Ads y Facebook Ads para que cada peso invertido traiga clientes reales, no solo clics",
    introText: "¿Estás invirtiendo en pauta sin ver resultados claros? Estos son los problemas más comunes que vemos:",
    tags: ["Google Ads", "Facebook Ads", "Meta Ads", "Campañas que convierten"],
    problem: "¿Estás invirtiendo en pauta sin ver resultados claros?",
    content: "Diseñamos, configuramos y optimizamos campañas publicitarias en Google y Meta para empresas y emprendedores en Colombia que quieren resultados medibles — no reportes llenos de datos sin contexto.",
    benefitsTitle: "Publicidad digital que trabaja por tu negocio, no contra tu bolsillo",
    benefitsIntro: "En Shine gestionamos campañas que:",
    audienceTitle: "¿Para quién es este servicio?",
    audienceIntro: "Este servicio es para ti si:",
    benefits: [
      "Llegan exactamente a las personas que pueden comprar lo que vendes.",
      "Tienen copy e imágenes probadas para generar clics de calidad.",
      "Se optimizan semana a semana según los datos reales.",
      "Incluyen seguimiento de conversiones — sabes exactamente qué anuncio genera ventas.",
      "Te dan reportes claros en lenguaje humano, no en dashboards imposibles de leer."
    ],
    checkMarks: [
      "Ya invertiste en pauta y no viste resultados claros.",
      "Quieres empezar a pautar pero no sabes por dónde.",
      "Tienes una tienda online y necesitas tráfico que compre.",
      "Ofreces un servicio y quieres generar leads calificados.",
      "Quieres dejar de depender 100% del voz a voz o el contenido orgánico."
    ],
    hurts: [
      "Pauta activa pero sin conversiones reales — solo clics que no compran.",
      "Presupuesto mensual que se agota sin saber exactamente en qué.",
      "Anuncios que llegan a las personas equivocadas.",
      "Sin píxel instalado — no sabes qué pasa después del clic.",
      "Reportes que no explican nada accionable."
    ],
    process: [
      {
        title: 'Diagnóstico y estrategia',
        description: 'Auditamos tu situación actual (si ya tienes cuentas) o definimos la estrategia desde cero. Identificamos a tu cliente ideal, los mensajes que resuenan y los objetivos medibles.'
      },
      {
        title: 'Configuración y lanzamiento',
        description: 'Instalamos el píxel de conversión, configuramos públicos, creamos los anuncios y lanzamos las campañas con estructura probada.'
      },
      {
        title: 'Optimización continua',
        description: 'Cada semana revisamos los datos: pausamos lo que no funciona, escalamos lo que sí, probamos nuevas variaciones de anuncios y ajustamos la segmentación.'
      },
      {
        title: 'Reporte mensual claro',
        description: 'Cada mes recibes un reporte en lenguaje humano: qué funcionó, qué no, cuánto costó cada conversión y qué vamos a hacer diferente el siguiente mes.'
      }
    ],
    image: SocialContent,
    secondaryImage: InvisibilityProblem,
    alt: "Google Ads y Facebook Ads en Colombia - Shine Agencia",
    seoDescription: "Gestionamos tus campañas en Google Ads y Facebook Ads para que cada peso invertido genere clientes reales. Bogotá, Colombia. Agenda tu diagnóstico gratuito.",
    seoKeywords: [
      "Google Ads Colombia",
      "Facebook Ads Colombia",
      "agencia de publicidad digital Bogotá",
      "gestión de campañas Google Ads",
      "Meta Ads Colombia",
      "publicidad digital para empresas Colombia"
    ],
    secondaryKeywords: [
      "cuánto cuesta Google Ads en Colombia",
      "agencia Google Ads Bogotá",
      "campañas de Facebook para negocios",
      "publicidad en Instagram Colombia",
      "cómo generar leads con Google Ads",
      "gestión de pauta digital Colombia"
    ],
  },
  {
    slug: "ecommerce",
    title: "Ecommerce con Tienda Nube",
    subtitle: "Creamos tu tienda online con Tienda Nube: diseño personalizado, medios de pago colombianos y lista para vender desde el primer día",
    introText: "¿Sigues vendiendo por WhatsApp y perdiendo ventas que podrías automatizar? Estos son los problemas de no tener tu propia tienda:",
    tags: ["Tienda Nube", "Ecommerce Colombia", "PSE", "Vender Online"],
    problem: "¿Sigues vendiendo por WhatsApp y perdiendo ventas que podrías automatizar?",
    content: "Pasá de vender por WhatsApp e Instagram a tener tu propia tienda online profesional. Sin depender de intermediarios, sin perder comisión en cada venta, con el control total de tu negocio.",
    benefitsTitle: "Tu tienda online trabajando por ti las 24 horas, los 7 días",
    benefitsIntro: "Con Shine y Tienda Nube, tu ecommerce:",
    audienceTitle: "¿Para quién es este servicio?",
    audienceIntro: "Este servicio es para ti si:",
    benefits: [
      "Acepta pagos con PSE, tarjeta, MercadoPago y efectivo — sin que tengas que gestionar nada manualmente.",
      "Muestra tu catálogo completo con fotos, precios, variantes y stock actualizado.",
      "Calcula los envíos automáticamente con Servientrega, Coordinadora y otras transportadoras.",
      "Genera pedidos organizados que puedes ver desde el celular.",
      "Se posiciona en Google para que nuevos clientes te encuentren sin pagar pauta."
    ],
    checkMarks: [
      "Vendes productos físicos y quieres dejar de depender de WhatsApp e Instagram.",
      "Tienes un negocio físico y quieres abrir un canal de ventas online.",
      "Ya tienes una tienda en otra plataforma pero quieres migrar a algo más simple y económico.",
      "Quieres una tienda profesional que puedas administrar tú mismo sin necesitar un técnico cada vez.",
      "Buscas vender en toda Colombia, no solo en tu ciudad."
    ],
    hurts: [
      "Cada venta depende de que estés disponible para responder.",
      "No tienes forma de mostrar tu catálogo completo de forma profesional.",
      "Pierdes ventas en horarios en que no puedes atender.",
      "Instagram o WhatsApp pueden limitarte o borrarte la cuenta en cualquier momento.",
      "No tienes datos de tus compradores ni forma de hacer remarketing."
    ],
    process: [
      {
        title: 'Diagnóstico y estrategia',
        description: 'Analizamos tu catálogo, tu público objetivo y tu modelo de envíos. Definimos la estructura de categorías, las páginas necesarias y los medios de pago que más le convienen a tu negocio.'
      },
      {
        title: 'Diseño y configuración',
        description: 'Diseñamos tu tienda con tu identidad de marca, cargamos tus productos con fotos y descripciones optimizadas, y configuramos los medios de pago y las transportadoras.'
      },
      {
        title: 'SEO y pruebas',
        description: 'Optimizamos cada página de producto y categoría para que Google pueda indexarlas. Hacemos pruebas de compra completas — desde que el cliente agrega al carrito hasta que recibe la confirmación del pedido.'
      },
      {
        title: 'Entrega y capacitación',
        description: 'Te entregamos la tienda lista para vender y te capacitamos en cómo agregar productos, gestionar pedidos, aplicar descuentos y revisar tus estadísticas. Sales operando desde el primer día.'
      }
    ],
    image: Audit,
    secondaryImage: InvisibilityProblem,
    alt: "Ecommerce con Tienda Nube en Colombia - Shine Agencia",
    seoDescription: "Creamos tu tienda online con Tienda Nube: diseño personalizado, medios de pago colombianos y listo para vender desde el primer día. Agenda tu diagnóstico gratuito.",
    seoKeywords: [
      "ecommerce Colombia",
      "tienda online Tienda Nube Colombia",
      "crear tienda online Colombia",
      "ecommerce Bogotá",
      "Tienda Nube vs Shopify Colombia",
      "vender online Colombia"
    ],
    secondaryKeywords: [
      "cómo crear una tienda online en Colombia",
      "Tienda Nube Colombia precio",
      "ecommerce con PSE Colombia",
      "tienda online con MercadoPago",
      "migrar tienda a Tienda Nube",
      "ecommerce para pequeñas empresas Colombia"
    ],
  }
]

/**
 * Get a service by slug
 * Return undefined if not found
 */
export const getServiceBySlug = (slug: string) => {
  return services.find((service) => service.slug === slug);
}
