# Plan: Simplificación a 2 Servicios con SEO/AEO/GEO Optimizado

## Contexto

Shine pasa de 3 servicios a 2 servicios estratégicos:
1. **Diseño y Creación de Páginas Web con Astro** (servicio de mayor conversión + SEO técnico incluido)
2. **Campañas de Ads en Google y Meta** (nuevo servicio para posicionamiento orgánico)

El servicio `marca-personal` se elimina. El servicio `rediseño-web-estrategico` se elimina (su audiencia se absorbe en el servicio de diseño web).

**ICP objetivo**: Pymes, abogados, firmas de abogados en Colombia (alcance global sin exclusión).

**Propuesta de valor diferencial a comunicar**:
- Atención personalizada
- Velocidad de carga (<2s)
- Hosting gratuito en Netlify
- Dominio $11–15 USD/año
- SEO técnico incluido desde la arquitectura
- Precios transparentes: Landing $300 USD · Corporativo pequeño $350 · Corporativo completo $500–$700 USD

---

## Archivos a modificar

| Archivo | Acción |
|---|---|
| `src/config/services.ts` | Reemplazar array `services[]` con 2 nuevos servicios |
| `src/utils/navigation.ts` | Actualizar `servicesLinksConst` a 2 links |
| `src/pages/servicios/diseno-web-estrategico.astro` | Renombrar a `diseno-web-astro.astro` + actualizar slug y copy del hero |
| `src/pages/servicios/marca-personal.astro` | **Eliminar** |
| `src/pages/servicios/rediseno-web-estrategico.astro` | **Eliminar** |
| `src/pages/servicios/campanas-ads.astro` | **Crear nuevo** |
| `src/config/seo.ts` | Actualizar `COMPANY_INFO.description` y `DEFAULT_SEO` |
| `src/config/site.ts` | Actualizar `llms.topics` y `targetAudience` |
| `src/data/mockGoogleReviews.ts` | Actualizar tags de reseñas (quitar "marca personal", "rediseño web") |
| `src/components/section/landing/ServicesLanding.astro` | Cambiar `lg:grid-cols-3` → `lg:grid-cols-2` |
| `src/pages/index.astro` | Actualizar descripción SEO de homepage |
| `astro.config.mjs` | Agregar redirects 301 para las 3 URLs viejas |

---

## Paso 1 — `src/config/services.ts`

Reemplazar el array completo con 2 servicios. Los imports de imágenes cambian:

```typescript
import SocialContent from '@/assets/images/redessociales.webp';  // eliminar
import Audit from '@/assets/images/diseñoyrediseñoweb.webp';      // eliminar
import Marketing from '@/assets/images/marketing.webp';           // agregar
// Mantener:
import InvisibilityProblem from '@/assets/images/invisibility.webp';
import WebDesign from '@/assets/images/diseñoWebAltoRen.webp';
```

### Servicio 1: `diseno-web-astro`

```typescript
{
  slug: "diseno-web-astro",
  title: "Diseño y Creación de Páginas Web con Astro",
  subtitle: "Páginas web ultrarrápidas, optimizadas para buscadores y con hosting gratuito incluido. Tu presencia digital lista para vender desde el primer día.",
  introText: "Sin una presencia web profesional, tu negocio enfrenta estos obstáculos:",
  tags: ["Astro Framework", "Páginas Web", "SEO Incluido", "Hosting Gratis"],
  problem: "¿Tu negocio está perdiendo clientes porque no tienes una página web profesional — o porque la que tienes no aparece en Google?",
  content: "Shine diseña y construye páginas web para pymes, abogados y firmas de abogados en Colombia usando Astro Framework, la tecnología que genera sitios ultrarrápidos con SEO técnico incluido desde el primer día. Landing pages desde $300 USD, sitios corporativos desde $350 USD hasta $700 USD, con dominio por $11–15 USD/año y hosting gratuito en Netlify.",
  benefitsTitle: "Tu página web, tu mejor vendedor disponible 24/7",
  benefitsIntro: "En Shine, construimos una web que:",
  audienceTitle: "¿Para quién es este servicio?",
  audienceIntro: "Este servicio es para ti si...",
  benefits: [
    "Carga en menos de 2 segundos — la velocidad que Google y tus clientes exigen.",
    "Incluye SEO técnico desde la arquitectura: schema markup, meta tags, sitemap automático y URLs semánticas.",
    "Tiene diseño 100% personalizado, no plantillas genéricas que parecen iguales a las de tu competencia.",
    "Funciona en hosting gratuito en Netlify — tu costo anual se reduce al dominio ($11–15 USD/año).",
    "Es segura: sin plugins vulnerables, sin bases de datos expuestas, sin mantenimiento constante.",
    "Se ve perfecta en celular, tablet y computador (diseño mobile-first).",
    "Está preparada para aparecer en respuestas de Google, ChatGPT y otros motores de IA."
  ],
  checkMarks: [
    "Eres una pyme, abogado o firma de abogados sin presencia web o con una desactualizada.",
    "Quieres una página que genere contactos y consultas reales, no solo visitas.",
    "Buscas una inversión inteligente: precio justo, sin costos ocultos de hosting ni plataforma.",
    "Valoras la velocidad, la seguridad y el SEO desde el inicio — no como extras.",
    "Quieres diferenciarte de competidores que usan plantillas genéricas de WordPress."
  ],
  hurts: [
    "Invisibilidad en Google: tu negocio existe, pero nadie lo encuentra cuando busca lo que ofreces.",
    "Credibilidad comprometida: clientes potenciales desconfían de empresas sin presencia web o con sitios desactualizados.",
    "Oportunidades perdidas: cada día sin web profesional es un cliente que eligió a tu competencia.",
    "Costos ocultos de WordPress: hosting, plugins de seguridad, actualizaciones constantes que suman más de lo que esperas."
  ],
  process: [
    { title: "Estrategia y Arquitectura", description: "Definimos los objetivos, la estructura de contenido y la experiencia de usuario ideal para tu negocio, tu industria y tu cliente objetivo." },
    { title: "Diseño UX/UI de Alta Conversión", description: "Creamos interfaces atractivas y funcionales diseñadas para convertir visitantes en contactos y clientes, con tu identidad de marca." },
    { title: "Desarrollo con Astro Framework", description: "Construimos tu sitio con tecnología de vanguardia para máxima velocidad, seguridad y rendimiento en buscadores." },
    { title: "SEO, Pruebas y Lanzamiento", description: "Optimización SEO técnica completa, pruebas en todos los dispositivos, publicación en Netlify con tu dominio personalizado. Tu web en vivo." }
  ],
  image: WebDesign,
  secondaryImage: InvisibilityProblem,
  alt: "Diseño y creación de páginas web con Astro Framework para pymes y abogados en Colombia — Shine Agencia",
  seoDescription: "Páginas web ultrarrápidas con Astro para pymes, abogados y firmas en Colombia. SEO incluido, hosting gratis, dominio desde $11 USD/año. Landing page desde $300 USD. Agenda gratis.",
  seoKeywords: [
    "diseño web para pymes Colombia",
    "páginas web para abogados Colombia",
    "diseño web con Astro Colombia",
    "agencia web Colombia",
    "crear página web profesional Colombia",
    "diseño web Bogotá",
    "páginas web para firmas de abogados"
  ],
  secondaryKeywords: [
    "cuánto cuesta una página web en Colombia",
    "página web para abogados Bogotá",
    "alternativa a WordPress Colombia",
    "hosting gratuito para páginas web",
    "diseño web barato Colombia",
    "páginas web rápidas para empresas",
    "SEO para pymes Colombia",
    "agencia de diseño web para abogados"
  ],
  faqs: [
    {
      question: "¿Cuánto cuesta una página web en Colombia?",
      answer: "En Shine, una landing page profesional cuesta desde $300 USD, un sitio corporativo pequeño desde $350 USD, y un sitio corporativo completo entre $500 y $700 USD. El único costo recurrente es el dominio ($11–15 USD/año). El hosting es gratuito en Netlify. Sin costos ocultos."
    },
    {
      question: "¿Por qué usar Astro Framework en lugar de WordPress para mi página web?",
      answer: "Astro genera sitios estáticos que cargan en menos de 2 segundos, sin bases de datos que hackear ni plugins que actualizar constantemente. WordPress tarda entre 3 y 8 segundos en promedio y requiere mantenimiento continuo. Para SEO, Google premia la velocidad: un sitio en Astro tiene ventaja técnica desde el primer día, y el hosting es gratuito en Netlify."
    },
    {
      question: "¿Qué diferencia a Shine de otras agencias de diseño web en Colombia?",
      answer: "Tres diferencias concretas: atención personalizada — trabajas directamente con el equipo que construye tu web; tecnología de primer nivel — usamos Astro Framework, no plantillas genéricas de WordPress; precio transparente — te decimos exactamente qué cuesta desde el inicio, sin sorpresas."
    },
    {
      question: "¿Cuánto tiempo toma crear una página web con Shine?",
      answer: "Una landing page toma entre 2 y 3 semanas. Un sitio corporativo pequeño entre 3 y 5 semanas. Un sitio corporativo completo entre 5 y 8 semanas. El tiempo incluye estrategia, diseño, desarrollo, optimización SEO y pruebas. Antes de iniciar, te entregamos un cronograma exacto."
    },
    {
      question: "¿Las páginas web que crean aparecen en Google?",
      answer: "Sí. El SEO técnico está integrado desde la arquitectura: URLs semánticas, meta tags optimizados, schema markup para rich snippets, velocidad de carga inferior a 2 segundos, estructura de encabezados correcta y sitemap automático. Tu sitio nace listo para que Google lo indexe correctamente."
    },
    {
      question: "¿Pueden crear una página web específica para mi firma de abogados?",
      answer: "Sí, tenemos experiencia trabajando con firmas de abogados en Colombia. Entendemos las necesidades del sector legal: proyectar autoridad y confianza, destacar áreas de práctica, facilitar el contacto para consultas, y comunicar credenciales profesionales de forma efectiva."
    },
    {
      question: "¿Qué pasa con mi página web después de que la entregan?",
      answer: "Te entregamos el código fuente completo y acceso total a tu repositorio. Te capacitamos para actualizar contenido básico sin programar. Para cambios técnicos, ofrecemos planes de mantenimiento mensual o por proyecto según tus necesidades. Tu web es tuya — no estás atado a ninguna plataforma propietaria."
    }
  ]
}
```

### Servicio 2: `campanas-ads`

```typescript
{
  slug: "campanas-ads",
  title: "Campañas de Publicidad en Google y Meta Ads",
  subtitle: "Gestión profesional de publicidad digital para pymes y profesionales en Colombia. Resultados medibles, presupuesto controlado, sin contratos eternos.",
  introText: "Gestionar publicidad digital sin experiencia genera estos problemas costosos:",
  tags: ["Google Ads", "Meta Ads", "Publicidad Digital", "ROI Medible"],
  problem: "¿Estás invirtiendo en publicidad digital pero no sabes si realmente está generando clientes — o si solo está quemando tu presupuesto?",
  content: "Shine gestiona campañas de Google Ads y Meta Ads (Facebook e Instagram) para pymes, abogados y profesionales en Colombia que necesitan resultados medibles con presupuestos controlados. Diseñamos, lanzamos y optimizamos cada campaña con foco en conversiones reales — llamadas, formularios de contacto, WhatsApp — no solo en clics e impresiones.",
  benefitsTitle: "Publicidad que trabaja para tu negocio, no para inflar métricas",
  benefitsIntro: "Con Shine Ads, obtienes:",
  audienceTitle: "¿Para quién es este servicio?",
  audienceIntro: "Este servicio es para ti si...",
  benefits: [
    "Campañas configuradas para generar conversiones reales: llamadas, WhatsApp, formularios — no solo clics.",
    "Segmentación precisa por ubicación, edad, intereses y comportamiento para llegar a tu cliente ideal en Colombia.",
    "Presupuesto controlado: tú decides cuánto inviertes, nosotros maximizamos cada peso.",
    "Reportes claros y comprensibles — sabes exactamente qué resultados generó tu inversión.",
    "Gestión continua con optimizaciones semanales basadas en datos reales de tu campaña.",
    "Atención personalizada: un equipo que conoce tu negocio, no un ejecutivo que gestiona 50 clientes a la vez."
  ],
  checkMarks: [
    "Eres una pyme o profesional con presupuesto de publicidad y quieres invertirlo con estrategia.",
    "Ya intentaste manejar tus propias campañas y los resultados fueron decepcionantes.",
    "Quieres clientes nuevos de forma predecible, no depender solo de referidos o tráfico orgánico.",
    "Necesitas transparencia total: reportes reales, sin métricas vacías que se ven bien pero no generan ventas.",
    "Buscas una agencia que te trate como persona, no como un número más en su cartera."
  ],
  hurts: [
    "Presupuesto desperdiciado: campañas mal configuradas que generan clics de audiencias que nunca comprarán.",
    "Métricas confusas: muchos 'likes' e impresiones pero ningún cliente nuevo real.",
    "Falta de control: no sabes en qué se está gastando tu dinero ni qué resultados esperar.",
    "Competencia que sí usa publicidad paga y capta los clientes que deberían ser tuyos."
  ],
  process: [
    { title: "Diagnóstico y Estrategia", description: "Analizamos tu negocio, tu competencia y tu cliente ideal para definir qué plataformas, audiencias y mensajes generarán mejores resultados con tu presupuesto." },
    { title: "Configuración y Lanzamiento", description: "Creamos las campañas desde cero: estructura de cuentas, segmentación, creativos, textos de anuncio y configuración de conversiones para rastrear resultados reales." },
    { title: "Optimización Continua", description: "Monitoreamos el rendimiento semanalmente, ajustamos pujas, pausamos anuncios que no convierten y escalamos los que sí funcionan." },
    { title: "Reportes y Reunión Mensual", description: "Cada mes recibes un reporte claro con métricas de conversión reales y una reunión para revisar resultados, ajustar estrategia y planear el siguiente periodo." }
  ],
  image: Marketing,
  secondaryImage: InvisibilityProblem,
  alt: "Campañas de publicidad en Google Ads y Meta Ads para pymes y abogados en Colombia — Shine Agencia",
  seoDescription: "Gestión de campañas Google Ads y Meta Ads para pymes y abogados en Colombia. Resultados medibles, presupuesto controlado y atención personalizada. Solicita diagnóstico gratis.",
  seoKeywords: [
    "campañas Google Ads Colombia",
    "publicidad Meta Ads Colombia",
    "agencia de publicidad digital Colombia",
    "Google Ads para pymes Colombia",
    "Meta Ads para abogados Colombia",
    "gestión de campañas publicitarias Bogotá"
  ],
  secondaryKeywords: [
    "cuánto cuesta hacer publicidad en Google en Colombia",
    "agencia Google Ads Bogotá",
    "publicidad en Instagram para empresas Colombia",
    "campañas Facebook Ads para pymes",
    "publicidad digital para abogados Colombia",
    "agencia SEM Colombia",
    "resultados medibles publicidad digital"
  ],
  faqs: [
    {
      question: "¿Cuánto debo invertir en publicidad digital para ver resultados en Colombia?",
      answer: "Para Google Ads en Colombia, el presupuesto mínimo recomendado es de $500.000 COP mensuales para obtener datos estadísticamente significativos. Para Meta Ads (Facebook e Instagram), desde $400.000 COP mensuales. Nuestro cobro por gestión es adicional y varía según el alcance de las campañas."
    },
    {
      question: "¿Cuál es la diferencia entre Google Ads y Meta Ads — cuál necesito?",
      answer: "Google Ads captura demanda existente: aparece cuando alguien busca activamente lo que ofreces — ideal para abogados y servicios profesionales. Meta Ads crea demanda: muestra tu oferta a personas que coinciden con el perfil de tu cliente ideal. Lo óptimo es usar ambas de forma complementaria. Definimos la estrategia correcta según tu negocio y presupuesto."
    },
    {
      question: "¿En cuánto tiempo empiezo a ver resultados con campañas de publicidad digital?",
      answer: "Google Ads puede generar los primeros resultados en la primera semana. Meta Ads requiere 2 a 4 semanas para que el algoritmo optimice la entrega. Los resultados consistentes y predecibles se logran entre el segundo y tercer mes, cuando ya hay suficientes datos para optimizar correctamente."
    },
    {
      question: "¿Cómo sé si mis campañas están generando resultados reales y no solo clics?",
      answer: "Configuramos conversiones rastreadas desde el inicio: llamadas directas desde el anuncio, envíos de formulario, mensajes de WhatsApp y visitas a páginas clave. En el reporte mensual ves exactamente cuántos contactos nuevos generó cada campaña, no solo impresiones o clics."
    },
    {
      question: "¿Pueden gestionar publicidad digital para mi firma de abogados?",
      answer: "Sí. Tenemos experiencia en publicidad digital para el sector legal en Colombia. Entendemos las restricciones éticas de la publicidad para abogados, sabemos cómo comunicar credibilidad en los anuncios y conocemos las palabras clave con las que los clientes buscan servicios legales en Google."
    },
    {
      question: "¿Puedo pausar o cancelar las campañas cuando quiera?",
      answer: "Sí, tienes control total de tu presupuesto en todo momento. Las cuentas de Google Ads y Meta Ads son tuyas — te damos acceso completo. Puedes pausar campañas, ajustar presupuestos o cancelar el servicio de gestión con un mes de aviso. Sin contratos de largo plazo."
    }
  ]
}
```

---

## Paso 2 — `src/utils/navigation.ts`

```typescript
export const servicesLinksConst = [
  { name: "Diseño Web con Astro", path: "/servicios/diseno-web-astro/" },
  { name: "Campañas de Ads", path: "/servicios/campanas-ads/" },
]
```

---

## Paso 3 — Operaciones de archivos en `src/pages/servicios/`

1. **Eliminar** `marca-personal.astro`
2. **Eliminar** `rediseno-web-estrategico.astro`
3. **Renombrar** `diseno-web-estrategico.astro` → `diseno-web-astro.astro`
4. **Crear** `campanas-ads.astro`

### `diseno-web-astro.astro` — cambios al renombrar

- Cambiar línea 15: `getServiceBySlug("diseno-web-estrategico")` → `getServiceBySlug("diseno-web-astro")`
- Actualizar hero copy:

```astro
<GlobalHero
  titleLine1="Tu negocio merece una página web que realmente funcione:"
  titleLine2="ultrarrápida, posicionada y lista para vender"
  subtitleBefore="Diseñamos y construimos tu presencia digital con"
  subtitleHighlight="Astro Framework"
  subtitleAfter="SEO incluido, hosting gratuito, sin costos ocultos"
  descriptionLine1="Para pymes, abogados y firmas en Colombia que necesitan una página web profesional que aparezca en Google y convierta visitantes en clientes."
>
```

- Actualizar CTABanner:
  - `title`: `"Tu competencia ya tiene presencia web. ¿Cuándo arrancas tú?"`
  - `description`: `"Una página profesional, ultrarrápida y posicionada en Google. Sin WordPress, sin costos ocultos, sin complicaciones."`
  - `buttonText`: `"Empecemos a construir tu presencia digital"`

### `campanas-ads.astro` — nueva página

Misma estructura que `diseno-web-astro.astro` pero **sin** `<ServiceTechStack />`. Hero y CTA propios:

```astro
// Hero
titleLine1="Publicidad digital que genera clientes,"
titleLine2="no solo clics"
subtitleBefore="Campañas de"
subtitleHighlight="Google Ads y Meta Ads"
subtitleAfter="gestionadas con estrategia, datos y atención personalizada"
descriptionLine1="Para pymes, abogados y profesionales en Colombia que quieren invertir su presupuesto publicitario con inteligencia — y medir cada peso invertido."

// SocialProof: filterTag="all"

// CTABanner
title="Tu competencia está anunciando. ¿Estás dejando que te quiten clientes?"
description="Gestión profesional de Google Ads y Meta Ads con resultados medibles. Sin contratos eternos, sin métricas vacías."
buttonText="Empecemos con tus campañas hoy"
```

---

## Paso 4 — `src/config/seo.ts`

```typescript
// COMPANY_INFO.description:
description: "Agencia de marketing digital en Colombia especializada en diseño web con Astro Framework y gestión de campañas de Google Ads y Meta Ads para pymes, abogados y firmas de abogados.",

// DEFAULT_SEO.description:
description: "Shine crea páginas web ultrarrápidas con Astro y gestiona campañas de Google Ads y Meta Ads para pymes, abogados y firmas de abogados en Colombia. Presencia digital que vende.",
```

El `ORGANIZATION_SCHEMA` se actualiza automáticamente (consume `services` dinámicamente).

---

## Paso 5 — `src/config/site.ts`

```typescript
llms: {
  topics: ['diseño web con Astro', 'páginas web para pymes', 'páginas web para abogados', 'campañas Google Ads Colombia', 'Meta Ads Colombia', 'SEO Colombia'],
  targetAudience: 'Pymes, Abogados y Firmas de Abogados en Colombia'
}
```

---

## Paso 6 — `src/data/mockGoogleReviews.ts`

Remover tags `"marca personal"` y `"rediseño web"` de todas las reseñas. Las de diseño web mantienen `"diseño web"`. Las demás usan `"all"`.

---

## Paso 7 — `src/components/section/landing/ServicesLanding.astro`

Línea 45: `lg:grid-cols-3` → `lg:grid-cols-2`.

---

## Paso 8 — `src/pages/index.astro`

```typescript
description: "Shine crea páginas web ultrarrápidas con Astro y gestiona campañas de Google Ads y Meta Ads para pymes, abogados y firmas de abogados en Colombia. Presencia digital que vende.",
```

---

## Paso 9 — `astro.config.mjs` — Redirects 301

```javascript
redirects: {
  "/servicios/marca-personal/": "/servicios/diseno-web-astro/",
  "/servicios/marca-personal": "/servicios/diseno-web-astro/",
  "/servicios/rediseno-web-estrategico/": "/servicios/diseno-web-astro/",
  "/servicios/rediseno-web-estrategico": "/servicios/diseno-web-astro/",
  "/servicios/diseno-web-estrategico/": "/servicios/diseno-web-astro/",
  "/servicios/diseno-web-estrategico": "/servicios/diseno-web-astro/",
}
```

---

## Verificación

```bash
npm run build    # Sin errores TypeScript
npm run dev      # Verificar visualmente
```

- `/servicios/diseno-web-astro/` → carga correctamente, hero actualizado
- `/servicios/campanas-ads/` → nueva página funcional
- `/servicios/diseno-web-estrategico/` → redirect 301
- `/servicios/marca-personal/` → redirect 301
- `/servicios/rediseno-web-estrategico/` → redirect 301
- Homepage → grid muestra 2 servicios en 2 columnas
- Navbar → dropdown con 2 servicios

**Schema validation**: Google Rich Results Test en ambas páginas para verificar `Service`, `FAQPage` y `BreadcrumbList`.
