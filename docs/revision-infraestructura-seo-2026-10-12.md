# Revisión de la infraestructura SEO — 2026-10-12

**Estado:** aprobada. El enrutamiento de los hallazgos se confirmó el
2026-10-12: 6 specs del carril completo (11–16) y 7 entradas del carril
ligero en `feature_list.json`.

**Alcance:** todo el SEO técnico del sitio en `dev`, sobre un build local
de 29 páginas: `src/config/seo.ts`, `companyInfo.ts`, `authors.ts`,
`site.ts`, los layouts, las páginas, `ProjectDetail.astro` y los endpoints
`llms`.

**Referencia:** `~/helpers-proyects/seo-schema-org-buenas-practicas-2026.md`
(informe verificado de buenas prácticas, octubre de 2026). En este
documento, "informe § N" remite a ese archivo.

**Cómo leer las líneas citadas:**

- § 2 conserva el hallazgo tal como se registró en la revisión. Las líneas
  de esa tabla corresponden al código **antes** de las specs 11–14.
- § 3 es la **fuente del carril ligero**. Cada corrección se volvió a
  verificar el 2026-10-12 sobre `dev` @ `2928961`, con las specs 11–14 ya
  mergeadas, y sus líneas corresponden a ese commit.

---

## 1. Qué se conserva

- JSON-LD generado en build, centralizado en `seo.ts` y `COMPANY_INFO`.
- `generatePageSEO`: canonical absoluto con barra final; títulos y
  descripciones únicos.
- `robots.txt.ts`, el filtro del sitemap y el `noindex` de las páginas
  legales y del 404.
- `public/_redirects`.
- La convención de `@id`: identificadores opacos, sin barra final. Es
  intencional; no se "corrige" (informe § 7.1).
- Ninguna reseña autoservida en el marcado.
- Migas visibles más su schema en los posts.
- Las FAQ visibles como interfaz.
- Las speculation rules.
- `llms.txt` y WebMCP (son baratos, aunque Google ignora `llms.txt`).

## 2. Hallazgos y destino

### 2.1 Eliminar

| # | Hallazgo | Destino |
|---|----------|---------|
| E1 | `FAQPage` en los posts (`PostLayout.astro:68`): 3 posts, 11 preguntas, ninguna visible. | Spec 11 (mergeada) |
| E2 | `FAQPage` en la home y los servicios: son visibles, pero no generan resultado enriquecido desde el 2026-05-07. | Spec 11 (mergeada) |
| E3 | Código muerto: generadores HowTo y Reviews, `generateFAQSchemaWithPage`, `DEFAULT_SEO`, `DEFAULT_AUTHOR`, `SITE_CONFIG.llms`. | Los generadores FAQ, en la spec 11; el resto, en `remove-dead-seo-generators` (§ 3.6) |
| E4 | `BreadcrumbList` de 1 elemento en la home y migas en las páginas legales. | Spec 14 (mergeada) |
| E5 | `WebSite` en las páginas internas (`MainLayout.astro:55`). | Spec 13 (mergeada) |
| E6 | `Date.now()` en `mockGoogleReviews.ts:28`. | No enrutado (§ 4) |
| E7 | Comentarios "Replace with…" en `companyInfo.ts:35-51`. | Spec 12 (mergeada) |
| E8 | Twitter `@shine_agencia`, si la cuenta no existe. | Spec 12 (mergeada) |
| E9 | `sameAs` de los fundadores (`authors.ts:49-51,65`) mientras no se verifique que los perfiles son suyos. | Spec 12 (mergeada) |

### 2.2 Mejorar: urgente

| # | Hallazgo | Destino |
|---|----------|---------|
| M1 | Organization tipada `ProfessionalService` + `LocalBusiness`, con calle inventada, código postal 110111 de relleno, geo en el centro de Bogotá y horario invisible, mientras la FAQ visible dice "100% remoto". | Spec 12 (mergeada) |
| M2 | Las 14 URL de `/proyectos` son casi duplicadas: cada una renderiza los 13 proyectos (12 ocultos) con el mismo H1. | Spec 15 |
| M3 | El blog está huérfano: ningún enlace contextual desde servicios, home, proyectos u otros posts. | Spec 16 |
| M4 | `llms-full.txt.ts:14` emite 5 URL sin `/blog/`. | `fix-llms-full-blog-urls` (§ 3.1) |

### 2.3 Mejorar: importante

| # | Hallazgo | Destino |
|---|----------|---------|
| M5 | `ContactPage` con propiedades inválidas: `contactOption` TollFree, `telephone`, `email`, `areaServed`. | `fix-contactpage-schema-props` (§ 3.2) |
| M6 | `Service`: `isPartOf` no es válido, `servicePhone` espera `ContactPoint`, `serviceOutput` es una cadena concatenada, `keywords` está rellenado y `serviceUrl` va sin barra final. | `fix-service-schema-props` (§ 3.3) |
| M7 | `knowsAbout` con 18 frases SEO; `alternateName` es un eslogan con palabras clave. | Spec 12 (mergeada) |
| M8 | `BlogPosting`: `about` fijo ("Marketing Digital Auténtico") y sin `author.url`. | `fix-blogposting-about-author-url` (§ 3.4) |
| M9 | Schema de migas en las 29 páginas, visibles solo en los posts; `BlogLayout` con URL relativas. | Spec 14 (mergeada) |
| M10 | Organization completa en todas las páginas, `copyrightHolder` anónimo, `founders` en vez de `founder` con `@id`. `addressCountry` debe ser `"CO"`. | Spec 13 (mergeada); `addressCountry`, spec 12 (mergeada) |
| M11 | Meta `robots` duplicada en las páginas de servicio; `generateServiceSEO` copia `generatePageSEO`. | `dedupe-service-robots-meta` (§ 3.5) |

### 2.4 Mejorar: menor

| # | Hallazgo | Destino |
|---|----------|---------|
| M12 | El `og:image` de ecommerce es la imagen del rediseño anterior; dos nombres de archivo de `og:image` llevan `ñ`. | No enrutado (§ 4) |
| M13 | El sitemap no tiene `lastmod`. | No enrutado (§ 4) |
| M14 | Dos H1 en ecommerce y publicidad digital (`ServicesStepsProcessAlt.astro:28`). | `fix-double-h1-service-pages` (§ 3.7) |
| M15 | El título de `/proyectos` fija "13 casos" y la descripción dice "branding y SEO". | Spec 15 |
| M16 | "Rocio Parra" sin tilde en el schema y "Rocío" en el título de `/nosotros`. | Spec 12 (mergeada) |
| M17 | Fechas a medianoche UTC; deberían ir con `-05:00`. | No enrutado (§ 4) |

---

## 3. Correcciones del carril ligero

Cada subsección es la fuente (`source`) de una entrada de
`feature_list.json`. Todas son correcciones de transcripción: el qué y el
porqué ya los fija schema.org, el informe o el contrato del repo. Ninguna
cambia contenido visible ni introduce una decisión de arquitectura.

### 3.1 `fix-llms-full-blog-urls`

**Verificado en `dev`:**

- `src/pages/llms-full.txt.ts:14` construye el enlace como `` `/${slug}` ``.
  En `dist/llms-full.txt` las 5 líneas `URL:` apuntan a
  `https://shineagencia.com/<slug>`.
- **El mismo defecto aparece en un segundo archivo**, encontrado al
  re-verificar: `src/pages/llms/[slug].txt.ts:19` usa
  `` `/${props.post.data.slug}` ``. Los 5 `dist/llms/<slug>.txt` imprimen
  esa misma URL en su línea 5.
- Esas URL no existen. Los posts viven en `/blog/<slug>/` y
  `public/_redirects` no tiene ninguna regla para ellas, así que devuelven
  404.

**Corrección:** los dos endpoints enlazan cada post a `/blog/<slug>/`, con
barra final, que es su canonical (AGENTS.md § Routing, spec 04).

**Fuera:** `llms.txt`, cuyos enlaces a `/llms/<slug>.txt` son correctos, y
el contenido de los archivos.

### 3.2 `fix-contactpage-schema-props`

**Verificado en `dev`:**

- `CONTACT_PAGE_SCHEMA` (`src/config/seo.ts:497-510`) declara
  `contactOption`, `telephone`, `email` y `areaServed` en `:506-509`.
- `ContactPage` es un `WebPage`, y ninguna de esas 4 propiedades pertenece
  a `WebPage`. En schema.org, `contactOption` es de `ContactPoint`;
  `telephone`, `email` y `areaServed` son de `Organization`, `Person`,
  `Place` o `ContactPoint`.
- Además, `TollFree` es falso: `COMPANY_INFO.phone` es un móvil
  colombiano, no una línea gratuita.
- No se pierde ningún dato: la Organization ya declara `telephone`,
  `email` y `areaServed` (`seo.ts:104`, `:105`, `:122`).

**Corrección:** quitar esas 4 propiedades. Se quedan `@type`, `@id`,
`name`, `description`, `url`, `isPartOf` y `about`.

**Fuera:** el bloque NAP visible de `/contacto` (entrada
`add-contact-page-nap`, ya hecha) y cualquier `ContactPoint` nuevo.

### 3.3 `fix-service-schema-props`

**Verificado en `dev`** en `generateServiceSchema`
(`src/config/seo.ts:374-415`), que alimenta las 3 páginas de servicio:

- **`keywords`** (`:381`) une `service.seoKeywords`. `keywords` no es una
  propiedad de `Service`: en schema.org pertenece a `CreativeWork`,
  `Event`, `Organization`, `Place` y `Product`. El contenido, además, es
  la lista de palabras clave de la página.
- **`availableChannel.serviceUrl`** (`:393`) va sin barra final, así que
  no coincide con el canonical (informe § 7.1: "Los `url` deben coincidir
  exactamente con el `<link rel="canonical">`").
- **`availableChannel.servicePhone`** (`:394`) es texto, pero el rango de
  esa propiedad en schema.org es `ContactPoint`.
- **`serviceOutput`** (`:405-407`) concatena con `", "` las frases de
  `service.benefits`. El rango es `Thing`, y esas frases son beneficios,
  no un resultado del servicio. En el JSON-LD quedan pegadas como
  `"…lo que vendes., Tienen copy…"`.
- **`isPartOf`** (`:409-413`) no es una propiedad de `Service` (es de
  `CreativeWork`). Además declara `…/servicios` como `WebPage`, cuando
  `/servicios/` declara ese mismo `@id` como `CollectionPage`.

**Corrección:**

- Quitar `keywords`, `serviceOutput` e `isPartOf`.
- `serviceUrl` pasa a `${COMPANY_INFO.url}/servicios/${service.slug}/`.
- `servicePhone` pasa a `{ "@type": "ContactPoint", telephone: COMPANY_INFO.phone }`.
- No cambian el `@id` (es opaco, informe § 7.1) ni `serviceLocation`: la
  spec 12 confirmó que su dirección (Bogotá, `"CO"`) es verdadera.

**Fuera:**

- Enlazar la página con el servicio mediante un nodo `WebPage` con
  `about` (informe § 7.2). Es un cambio de arquitectura del grafo, no una
  corrección de propiedades.
- El campo `seoKeywords` de `services.ts`, que se queda aunque deje de
  usarse en el schema.
- Los textos de `description`.

### 3.4 `fix-blogposting-about-author-url`

**Verificado en `dev`:**

- **`about`:** `generateBlogPostSchema` (`src/config/seo.ts:213-293`)
  emite en `:288-291` `about: { "@type": "Thing", name: "Marketing Digital
  Auténtico" }`. Es el mismo en los 5 posts, incluidos los 3 sobre Astro,
  cuyo tema no es ese.
- **`author.url`:** ninguna entrada de `AUTHORS` rellena `url`; el campo
  está declarado en `src/config/authors.ts:31`, pero no se usa en las
  entradas de `:40` y `:57`. Por eso ni el `author` del `BlogPosting` ni
  los `Person` de `/nosotros` llevan `url`.
- **Qué pide el informe** (§ 6.4, líneas 175 y 178): `author.url` es
  recomendado y "debe apuntar a una página que identifique al autor (bio,
  perfil)".
- **Qué página cumple eso:** `/nosotros/`, que muestra el nombre, el cargo
  y la biografía de las dos personas de `AUTHORS` (`AboutBio.astro`).

**Corrección:**

- Quitar `about`.
- Añadir `url: "/nosotros/"` a las dos entradas de `AUTHORS`. Así el
  `author.url` del `BlogPosting` y el `url` de cada `Person` en
  `/nosotros` quedan en `https://shineagencia.com/nosotros/`.
- El `@id` de cada `Person` sigue siendo `…/nosotros#<id>`: es opaco y va
  sin barra a propósito.

**Fuera:**

- Tipar `/nosotros` como `ProfilePage`. El informe solo dice que
  "conviene", y la página describe a dos personas.
- Derivar `about` de los `tags`, que sería un diseño nuevo.
- Convertir en enlace la firma visible "Por:".

### 3.5 `dedupe-service-robots-meta`

**Verificado en `dev`:**

- Las 3 páginas `/servicios/<slug>/` emiten
  `<meta name="robots" content="index, follow">` dos veces. Los otros 27
  archivos HTML de `dist/` (incluido `404.html`) la emiten una sola vez.
- **Causa:** `astro-seo` ya genera esa meta a partir de `noindex: false`
  (`src/config/seo.ts:344`), y `generateServiceSEO` la añade otra vez en
  `extend.meta` (`:367`).

**Corrección:** quitar la entrada `robots` de `extend.meta`. Las entradas
`author` y `Content-Language` se quedan.

**Fuera:** hacer que `generateServiceSEO` llame a `generatePageSEO`. Es
una refactorización que no hace falta para quitar el duplicado.

### 3.6 `remove-dead-seo-generators`

La spec 11 (`:66-69`) y la spec 12 (`:100-103`) delegaron en esta entrada
`DEFAULT_SEO`, `DEFAULT_AUTHOR` y `SITE_CONFIG.llms`. Los dos generadores
FAQ ya los borró la spec 11.

**Verificado en `dev`.** Código sin ninguna llamada (`grep -rn` en
`src/`):

- `src/config/seo.ts:512-583`: `generateReviewsSchema` y
  `generateGoogleReviewsSchema`. Es marcado de reseñas autoservidas, que
  la spec 02 ya dejó de usar.
- `src/config/seo.ts:594-693`: el bloque HowTo (`HowToStep`,
  `HowToOptions`, `generateHowToSchema`, `generateHowToSchemaWithPage`).
  HowTo está retirado desde 2023 (informe, línea 133).
- `src/config/site.ts:12-15`: `SITE_CONFIG.llms`.
- Encontrados al re-verificar:
  - `src/config/site.ts:18-24`: `getServicesForLlms`.
  - `src/config/authors.ts:86-88`: `getAuthorByName`.

**Verificado en `dev`.** Respaldos inalcanzables:

- **`DEFAULT_SEO`** (`src/config/seo.ts:53-91`). Solo se usa como último
  respaldo en `MainLayout.astro:52`, y los 12 sitios que usan
  `MainLayout` le pasan `seoProps`.
- **`DEFAULT_AUTHOR`** (`src/config/authors.ts:74-84`). Se usa en
  `PostLayout.astro:27`, `src/pages/blog/[slug].astro:35`, `seo.ts:233` y
  `authors.ts:87`. El enum de `content.config.ts:51` limita el autor a los
  dos nombres de `AUTHORS`, así que el respaldo nunca se activa.

**Corrección:**

- Borrar el código sin llamadas junto con sus comentarios y banners.
- Borrar las dos constantes de respaldo. Donde se usaba un respaldo, el
  build falla con un mensaje que nombra lo que falta: un `MainLayout` sin
  `seoProps` ni `title` + `description`, o un nombre de autor que no está
  en `AUTHORS`.
- Es la misma convención que `src/utils/jsonLdGraph.ts:132` y el esquema
  de contenido: no se inventa contenido por defecto.
- La salida no cambia.

**Fuera:**

- `Date.now()` de `mockGoogleReviews.ts`: la spec 09 lo conservó a
  propósito.
- `FAQItem`, que siguen usando `FAQ.astro` y `faqs.ts`.
- Las props `title` y `description` de `MainLayout`.

### 3.7 `fix-double-h1-service-pages`

**Verificado en `dev`:**

- `dist/servicios/ecommerce/index.html` y
  `dist/servicios/publicidad-digital/index.html` tienen 2 `<h1>` cada uno.
- `ServicesStepsProcessAlt.astro` renderiza el título del proceso como
  `<h1>` (`:28-33`) y el título de cada paso como `<h2>` (`:52-54`).
- Diseño web tiene un solo `<h1>`, porque su `ServicesStepsProcess` está
  comentado (`diseno-web-estrategico.astro:67`).
- El componente hermano `ServicesStepsProcess.astro` ya usa `<h2>` para el
  título (`:15`) y `<h3>` para los pasos (`:84`).

**Regla:** un solo `<h1>` por página, y jerarquía H1 → H2 → H3 sin saltos
(AGENTS.md § Skill routing; checklist de `seo-guide-lines`).

**Corrección:** el título pasa de `<h1>` a `<h2>` y cada paso de `<h2>` a
`<h3>`, con las mismas clases.

**Fuera:** cualquier cambio visual y `ServicesStepsProcess.astro`.

---

## 4. No enrutado

Estos hallazgos no tienen spec ni entrada. Necesitan una decisión o un
recurso del cliente antes de enrutarse.

- **E6:** `Date.now()` en `mockGoogleReviews.ts:27`. La spec 09 lo
  conservó byte a byte a propósito.
- **M12:** el `og:image` de ecommerce necesita una imagen nueva.
- **M13:** `lastmod` en el sitemap. Requiere decidir de dónde sale la
  fecha de cada página.
- **M17:** las fechas siguen a medianoche UTC
  (`"datePublished":"2026-04-30T00:00:00.000Z"`).

## 5. Orden y solapamientos

- Solo una entrada puede estar `in_progress` a la vez.
- **`fix-blogposting-about-author-url` y `remove-dead-seo-generators`**
  tocan el mismo bloque de autor de `generateBlogPostSchema`
  (`seo.ts:229-233`). La segunda en aterrizar se rebasa sobre la primera.
- **`fix-service-schema-props` y `dedupe-service-robots-meta`** editan
  funciones contiguas (`seo.ts:336-415`).
- **Spec 15:** edita `generatePageSEO`, `generateCollectionPageSchema` y
  `generateProjectSchema` en `seo.ts`. No comparte función con ninguna
  entrada; solo el archivo.
- **Spec 16:** no toca `seo.ts` ni los endpoints `llms`. Su criterio de
  `dist/llms.txt` idéntico es compatible con `fix-llms-full-blog-urls`,
  que no cambia `llms.txt`.
