// =============================================================================
// FAQS CONFIGURATION
// src/config/faqs.ts
// =============================================================================

import type { FAQItem as BaseFAQItem } from "@/config/seo";

export interface FAQItem extends BaseFAQItem {
  category?: string;
}

// General FAQs - about Shine Agencia as a whole
export const generalFAQs: FAQItem[] = [
  {
    question: "¿Qué es Shine Agencia y qué hacen?",
    answer:
      "Shine es una agencia digital colombiana especializada en tres servicios: diseño web con Astro Framework, gestión de campañas en Google Ads y Facebook Ads, y creación de tiendas online con Tienda Nube. Trabajamos con empresas y emprendedores que quieren vender más a través de internet, con herramientas concretas y resultados medibles.",
    category: "general",
  },
  {
    question: "¿En qué ciudades de Colombia trabajan?",
    answer:
      "Trabajamos de forma remota con negocios en todo el territorio colombiano y otros países. Nuestro proceso es 100% digital: reuniones por videollamada, entregas y comunicación fluida sin importar la distancia.",
    category: "general",
  },
  {
    question: "¿Cómo es el proceso para empezar a trabajar con Shine?",
    answer:
      "Todo empieza con un diagnóstico gratuito de 30 minutos. En esa sesión entendemos tu negocio, tus objetivos y tus recursos actuales. Al finalizar te decimos con claridad qué servicio te conviene, qué resultados puedes esperar y cuánto cuesta. Si decides avanzar, firmamos un contrato con alcance definido y tiempos de entrega claros antes de cobrar un solo peso.",
    category: "general",
  },
  {
    question: "¿Puedo contratar más de un servicio al mismo tiempo?",
    answer:
      "Sí, y muchas veces tiene sentido combinarlos. Por ejemplo, tener un sitio web rápido con Astro y correr campañas de Google Ads en paralelo maximiza el retorno de cada inversión. O lanzar una tienda con Tienda Nube y acompañarla con Facebook Ads desde el primer día. En el diagnóstico te recomendamos la combinación que más le conviene a tu etapa de negocio.",
    category: "general",
  },
  {
    question: "¿Cuánto cuesta trabajar con Shine Agencia?",
    answer:
      "Los precios varían según el servicio y el alcance del proyecto. No publicamos tarifas fijas porque cada negocio tiene necesidades distintas. Lo que sí garantizamos es transparencia total: en el diagnóstico gratuito te damos un presupuesto detallado sin costos ocultos, con lo que incluye y lo que no incluye cada servicio.",
    category: "general",
  },
  {
    question: "¿Qué pasa en el diagnóstico gratuito?",
    answer:
      "Es una sesión de 30 minutos por videollamada donde analizamos tu situación digital actual, tus objetivos de negocio y los obstáculos que te están frenando. Al finalizar recibes una recomendación concreta: qué hacer, por qué y cuánto costaría. No es una presentación de ventas — es un diagnóstico real que te sirve aunque decidas no contratar con nosotros.",
    category: "general",
  },
  {
    question: "¿Trabajan con negocios que están empezando desde cero?",
    answer:
      "Sí. Trabajamos tanto con emprendedores que están arrancando como con empresas establecidas que necesitan modernizar su presencia digital. Si estás empezando, te orientamos en qué priorizar según tu presupuesto y etapa. No te vamos a vender algo que todavía no necesitas.",
    category: "general",
  },
  {
    question: "¿Qué tan rápido entrega Shine sus proyectos?",
    answer:
      "Depende del servicio: un sitio web informativo (Landing page) tarda entre 1 y 2 semanas dependiendo del feedback, un sitio web mas complejo o tienda online entre 2 y 4 semanas, y las campañas de publicidad digital se lanzan dentro de los primeros 7 días hábiles tras el inicio. En todos los casos entregamos un cronograma con fechas por etapa antes de comenzar. Cumplir los tiempos acordados es parte de nuestro compromiso.",
    category: "general",
  },
];

// Diseño Web con Astro FAQs
export const disenoWebFAQs: FAQItem[] = [
  {
    question: "¿Qué es Astro y por qué es mejor que WordPress?",
    answer:
      "Astro es la tecnología con la que construimos tu sitio web. Piénsalo así: WordPress es como una navaja suiza — hace de todo, pero viene cargada de herramientas que probablemente nunca vas a usar, y eso hace que tu sitio sea lento y más vulnerable a ataques. Astro, en cambio, entrega solo lo que tu visitante necesita ver, sin peso extra. El resultado es un sitio que carga entre 2 y 10 veces más rápido, que Google premia con mejor posición en los resultados de búsqueda, y que no depende de actualizaciones constantes para mantenerse seguro.",
    category: "diseno-web",
  },
  {
    question: "¿Qué tan rápido carga un sitio hecho con Astro?",
    answer:
      "Los sitios que construimos con Astro alcanzan puntajes de 95 a 100 en Google PageSpeed Insights y cargan en menos de 1 segundo en condiciones normales de red. Un sitio WordPress promedio carga entre 3 y 6 segundos. Esa diferencia le importa a Google y le importa a tus visitantes.",
    category: "diseno-web",
  },
  {
    question: "¿El servicio de diseño web incluye SEO?",
    answer:
      "Sí, está incluido desde el principio — no es un extra. SEO es básicamente todo lo que le dice a Google que tu sitio existe, de qué trata y por qué merece aparecer en los primeros resultados. Nosotros configuramos eso correctamente mientras construimos tu sitio, velocidad de carga optimizada y configuración de Google Search Console. No lo cobramos aparte porque para nosotros es parte de hacer bien el trabajo, no un servicio adicional.",
    category: "diseno-web",
  },
  {
    question: "¿Mi web va a funcionar bien en celular?",
    answer:
      "Todos nuestros sitios son 100% responsive y están diseñados primero para móvil. Más del 70% del tráfico web en Colombia llega desde celular, así que el diseño mobile no es un extra — es el estándar base de todo proyecto.",
    category: "diseno-web",
  },
  {
    question: "¿Cuántas páginas incluye el sitio web?",
    answer:
      "Un sitio básico informativo típico incluye: Tres paginas (Home, nosotros y/o dos paginas de servicios). Si necesitas más páginas o funcionalidades especiales, las cotizamos desde el diagnóstico. El alcance queda definido antes de empezar — sin cambios de precio a mitad del proyecto.",
    category: "diseno-web",
  },
  {
    question: "¿Necesito comprar dominio y hosting por separado?",
    answer:
      "El hosting te lo damos gratis — no tienes que buscarlo ni pagarlo por separado. Para el dominio (el nombre de tu sitio, como tunegocio.com), te asesoramos en elegirlo y lo configuramos nosotros. Lo único que necesitas decidir es el nombre; nosotros nos encargamos del resto.",
    category: "diseno-web",
  },
  {
    question: "¿Qué pasa si necesito cambios después de la entrega?",
    answer:
      "Incluimos un período de ajustes post-entrega para corregir detalles del proyecto. Después de ese período, acosejamos realizar mantenimiento trimestral al sitio web. Para cambios puntuales según los necesites la tarifa se acuerda segun la cantidad de horas que requiere el trabajo. Todo queda establecido en el contrato desde el inicio — sin cobros sorpresa.",
    category: "diseno-web",
  },
];

// Google Ads y Facebook Ads FAQs
export const publicidadDigitalFAQs: FAQItem[] = [
  {
    question: "¿Cuánto presupuesto mínimo necesito para Google Ads o Facebook Ads?",
    answer:
      "Recomendamos un presupuesto mínimo de inversión en pauta de $500.000 COP mensuales para Google Ads y $300.000 COP para Facebook e Instagram Ads. Ese presupuesto va directo a la plataforma — es independiente de nuestra tarifa de gestión.",
    category: "publicidad-digital",
  },
  {
    question: "¿En cuánto tiempo empiezo a ver resultados con publicidad digital?",
    answer:
      "Google Ads puede generar resultados desde la primera semana, porque apareces exactamente cuando alguien está buscando lo que vendes. Facebook Ads puede tardar de 2 a 4 semanas mientras el algoritmo aprende la audiencia. Los resultados mejoran con la optimización mensual.",
    category: "publicidad-digital",
  },
  {
    question: "¿Qué es mejor para mi negocio: Google Ads o Facebook Ads?",
    answer:
      "Depende de tu objetivo. Google Ads es ideal para capturar demanda existente: personas que ya están buscando tu producto o servicio. Facebook e Instagram Ads son mejores para generar demanda: mostrarle tu oferta a personas que todavía no te conocen. Muchos negocios se benefician de usar ambas plataformas juntas.",
    category: "publicidad-digital",
  },
  {
    question: "¿Cómo sé si mis campañas están funcionando?",
    answer:
      "Cada mes recibes un reporte claro con las métricas que importan: clics, costo por clic, conversiones, costo por conversión y ROAS (retorno sobre inversión publicitaria). No reportes llenos de datos sin contexto — te explicamos qué significa cada número y qué vamos a ajustar el siguiente mes.",
    category: "publicidad-digital",
  },
  {
    question: "¿El presupuesto de pauta está incluido en la tarifa de Shine Agencia?",
    answer:
      "No. La tarifa de Shine Agencia cubre la gestión, estrategia y optimización de las campañas. El presupuesto de pauta lo pagas directamente a Google o Meta. Esto garantiza transparencia total: cada peso de tu presupuesto va a la plataforma, no a la agencia.",
    category: "publicidad-digital",
  },
  {
    question: "¿Pueden gestionar mis Ads si ya tengo una cuenta creada?",
    answer:
      "Sí. Si ya tienes una cuenta en Google Ads o Meta Business, hacemos primero una auditoría para identificar qué está fallando. Muchas veces el problema no es el presupuesto sino la configuración, la segmentación o el copy de los anuncios.",
    category: "publicidad-digital",
  },
  {
    question: "¿Trabajan con ecommerces o solo con negocios de servicios?",
    answer:
      "Trabajamos con ambos. Para ecommerces gestionamos campañas de Shopping en Google y campañas de catálogo en Meta. Para negocios de servicios, campañas de búsqueda y generación de leads. La estrategia cambia según el modelo de negocio.",
    category: "publicidad-digital",
  },
  {
    question: "¿Qué necesito tener listo para empezar con Ads?",
    answer:
      "Necesitas: acceso a tu cuenta de Google Ads o Meta Business (si ya existe), acceso a tu sitio web para instalar el píxel de conversión, y claridad sobre tu producto o servicio principal. Si no tienes nada de eso, te ayudamos a configurarlo desde cero.",
    category: "publicidad-digital",
  },
];

// Ecommerce con Tienda Nube FAQs
export const ecommerceFAQs: FAQItem[] = [
  {
    question: "¿Qué es Tienda Nube y por qué la recomiendan?",
    answer:
      "Tienda Nube es la plataforma de ecommerce líder en Latinoamérica, con más de 130.000 tiendas activas en la región. Está diseñada para el mercado latinoamericano: integra medios de pago locales como PSE y MercadoPago, el soporte es en español y no cobra comisión por venta en sus planes pagos. A diferencia de Shopify, fue pensada desde el inicio para Colombia y la región.",
    category: "ecommerce",
  },
  {
    question: "¿Cuánto cuesta crear una tienda online con Tienda Nube en Colombia?",
    answer:
      "El costo tiene dos partes: el desarrollo e implementación de tu tienda (pago único a Shine Agencia) y el plan mensual de Tienda Nube (pagado directamente a la plataforma). Te damos el desglose completo en el diagnóstico, sin costos ocultos.",
    category: "ecommerce",
  },
  {
    question: "¿Qué medios de pago puedo integrar en mi tienda online?",
    answer:
      "Integramos PSE, MercadoPago, tarjetas de crédito y débito, pagos en efectivo (Efecty, Baloto) y transferencias bancarias. También configuramos pago contra entrega si aplica para tu modelo de negocio.",
    category: "ecommerce",
  },
  {
    question: "¿Tienda Nube cobra comisión por cada venta?",
    answer:
      "En los planes pagos de Tienda Nube no hay comisión por venta. Pagas el plan mensual de la plataforma y conservas el 100% de tus ventas, descontando únicamente lo que cobren los medios de pago por transacción, que es estándar en cualquier plataforma.",
    category: "ecommerce",
  },
  {
    question: "¿Cuánto tiempo tarda en estar lista mi tienda online?",
    answer:
      "Una tienda con hasta 50 productos está lista entre 2 y 4 semanas (estos tiempos pueden cambiar según el feedback). Tiendas con catálogos grandes o integraciones especiales pueden tomar más tiempo. Te damos un cronograma claro desde el inicio, con fechas de entrega por etapa.",
    category: "ecommerce",
  },
  {
    question: "¿Cómo gestiono los envíos desde mi tienda?",
    answer:
      "Tienda Nube se integra con las principales transportadoras en Colombia: Servientrega, Coordinadora, Envia y otras. Configuramos tarifas de envío, zonas de cobertura y opciones de recogida en punto si lo necesitas.",
    category: "ecommerce",
  },
  {
    question: "¿Necesito conocimientos técnicos para administrar mi tienda después de la entrega?",
    answer:
      "No. Tienda Nube tiene un panel de administración muy intuitivo: puedes agregar productos, gestionar pedidos, aplicar descuentos y ver tus estadísticas sin saber nada de programación. Además, te capacitamos antes de la entrega para que quedes operando con confianza desde el primer día.",
    category: "ecommerce",
  },
];

// All FAQs combined
export const allFAQs: FAQItem[] = [
  ...generalFAQs,
  ...disenoWebFAQs,
  ...publicidadDigitalFAQs,
  ...ecommerceFAQs,
];

// Helper function to get FAQs by category
export function getFAQsByCategory(category: string): FAQItem[] {
  return allFAQs.filter((faq) => faq.category === category);
}
