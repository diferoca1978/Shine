**AUDITORÍA SEO + AEO**

**shineagencia.com**

Estructura, encabezados, metadescripciones, technical SEO

y visibilidad en motores de respuesta de IA (AEO/GEO)

*Shine Agencia — 30 de julio de 2026*

# **Resumen Ejecutivo**

Se auditaron la home y las páginas internas principales de shineagencia.com: Inicio, Nosotros, Diseño Web, Publicidad Digital, Ecommerce, Blog, los 4 artículos del blog y Contacto, además de robots.txt, sitemap-index.xml y llms.txt. También se identificó un enlace interno roto hacia /servicios/, URL que el sitio nunca construyó como página.

El sitio parte de una base técnica sólida — está construido en Astro, tiene metadatos únicos en cada página, Open Graph y Twitter Cards completos, FAQ redactadas con respuestas directas (ideal para IA generativa) y un llms.txt bien estructurado, algo que muy pocas agencias en Colombia implementan en su propio sitio. Es una ventaja competitiva real para AEO.

**Sin embargo, hay tres hallazgos críticos que conviene resolver esta semana, en este orden de prioridad: la indexación del sitio en Google es muy limitada (la mayoría de páginas no aparecen en búsquedas de prueba), el archivo robots.txt contiene reglas contradictorias que pueden estar bloqueando a los mismos bots de IA que el llms.txt busca atraer, y el menú del sitio incluye un enlace a /servicios/ — una URL que nunca se construyó como página. A esto se suma un patrón de encabezados (H1/H2) que conviene limpiar — detalle en la sección dedicada.**

| **Área** | **Estado** | **Comentario** |
| --- | --- | --- |
| Metadatos (title/meta description) | **Bien** | Únicos por página, presentes en todas las páginas revisadas; algunos títulos exceden el largo ideal |
| Estructura de encabezados (H1/H2) | **Atención** | H1 duplicado en 3 de 4 posts del blog; FAQ sin heading semántico en 5 páginas; 1 post salta de H1 a H3 sin H2 |
| robots.txt / acceso de bots de IA | **Crítico** | Reglas contradictorias: un bloque bloquea GPTBot/ClaudeBot/Google-Extended y otro los permite |
| llms.txt | **Excelente** | Implementado y bien estructurado — poco común, ventaja competitiva real |
| Contenido citable / extraíble (AEO) | **Bien** | Bloques de respuesta directa, tablas comparativas, estadísticas con fuente |
| Datos estructurados (schema) | **Sin verificar** | No detectable con las herramientas de este análisis; requiere Rich Results Test |
| Enlace roto /servicios/ | **Crítico** | Link huérfano en el menú mobile apunta a una URL que nunca se construyó como página |
| Indexación en Google | **Crítico** | Solo 2 de ~10 páginas auditadas aparecen indexadas en búsquedas de prueba (site:shineagencia.com) |
| Sitemap y canonical | **Bien** | sitemap-index.xml presente y referenciado; canonical correcto en todas las páginas |

# **Metodología y Alcance**

Auditoría manual mediante fetch en vivo de cada URL (renderizado del HTML servido, incluyendo metadatos, encabezados, Open Graph, canonical y robots meta). Se aplicó el marco de las tres Q's de AEO/GEO (Estructura, Autoridad, Presencia) para la parte de visibilidad en IA, y buenas prácticas estándar de SEO on-page y técnico para la parte tradicional.

**Páginas revisadas**

* Inicio — https://shineagencia.com/
* Nosotros — /nosotros/
* Diseño Web — /servicios/diseno-web-estrategico/
* Publicidad Digital — /servicios/publicidad-digital/
* Ecommerce — /servicios/ecommerce/
* Blog (listado) — /blog/
* Artículo: Marketing Digital para Abogados — /blog/marketing-digital-para-abogados
* Artículo: Ventajas de Astro Framework 2026 — /blog/ventajas-astro-framework-2026
* Artículo: Seguridad Web en 2026 — /blog/seguridad-web-astro-framework
* Artículo: Marca Personal en la Era de la IA — /blog/marca-personal-ai
* Contacto — /contacto/
* robots.txt, sitemap-index.xml, llms.txt
* Búsquedas de verificación de indexación: site:shineagencia.com y variantes de marca/categoría

**Nota de alcance:** *no fue posible inspeccionar directamente el código fuente (JSON-LD/schema.org) ni ejecutar mediciones de velocidad reales (Core Web Vitals de campo) desde este entorno. Esas dos verificaciones se listan como pendientes recomendadas en la sección de acciones.*

# **Hallazgos Técnicos a Nivel de Sitio**

| **Elemento** | **Estado** | **Detalle** |
| --- | --- | --- |
| HTTPS | **OK** | Todo el sitio sirve sobre HTTPS. |
| Viewport meta | **OK** | width=device-width, initial-scale=1 presente en todas las páginas — mobile-friendly. |
| Canonical | **OK** | Etiqueta canonical correcta y autorreferenciada en cada página revisada. |
| meta robots | **OK** | index, follow en todas las páginas públicas revisadas. |
| Open Graph / Twitter Cards | **OK** | og:title, og:description, og:image, twitter:card completos y consistentes. |
| Sitemap | **OK** | https://shineagencia.com/sitemap-index.xml declarado en robots.txt y accesible (200). |
| llms.txt | **Excelente** | https://shineagencia.com/llms.txt presente, con resumen del negocio y enlaces a versiones .txt de posts y servicios. |
| robots.txt — bots de IA | **Crítico** | Instrucciones contradictorias para GPTBot, ClaudeBot, Google-Extended y CCBot (ver sección dedicada más abajo). |
| Indexación real en Google | **Crítico** | Solo 2 de ~10 páginas auditadas aparecen en búsquedas site:shineagencia.com; ver Hallazgo Crítico #1. |
| Core Web Vitals / PageSpeed real | **Sin verificar** | El sitio afirma PageSpeed 95-100 en varias páginas; no se pudo confirmar con datos de campo desde este entorno. Recomendado correr PageSpeed Insights / CrUX report para validar la afirmación que usan como diferenciador de marketing. |
| Anchor text interno | **Atención** | CTAs repetidos como "Ver Servicio" y "Continuar leyendo" usan anchor text genérico en vez de texto descriptivo con keyword (ej. "Diseño web con Astro"). |
| Idioma | **OK** | Sitio en español (es\_CO) consistente vía og:locale; no requiere hreflang al no haber versiones en otros idiomas. |
| Datos estructurados (JSON-LD) | **Sin verificar** | No visible con las herramientas de este análisis; se recomienda confirmar con Google Rich Results Test, especialmente Organization/LocalBusiness y FAQPage. |

# **Auditoría Página por Página**

Longitudes de referencia: title ideal aprox. 50-60 caracteres (Google trunca alrededor de 580px / ~60 car.); meta description ideal aprox. 120-158 caracteres (mobile trunca antes que desktop).

| **Página** | **Title (long.)** | **Meta description (long.)** | **H1** | **Observaciones** |
| --- | --- | --- | --- | --- |
| **Inicio** | Agencia de Marketing Digital y Diseño Web | Shine Agencia  *(57 car.)* | Diseño web con Astro, Google Ads, Facebook Ads y ecommerce con Tienda Nube para empresas en Colombia. Bogotá. Agenda tu diagnóstico gratuito hoy.  *(145 car.)* | Diseño web, publicidad digital y e-commerce para negocios que quieren vender más | Title y meta óptimos. H1 único y claro. FAQ candidata a schema, pero sus preguntas están en negrita, no en H3 real (ver sección H1/H2). |
| **Nosotros** | Rocío Parra y Diego Rodríguez | Equipo Shine Agencia Colombia | Shine Agencia  *(77 car.)* | Rocío y Diego fundadores Shine Agencia: más de 10 años en marketing digital, desarrollo web con Astro y tiendas online con Tienda Nube en Bogotá, Colombia.  *(155 car.)* | La estrategia de marketing y la tecnología detrás de Shine Agencia | **Title excede ~60 car.** (77), se truncará en Google. Buena jerarquía H2/H3, buen contenido E-E-A-T. |
| **Servicios (link roto)** | — no es una página —  *(0 car.)* | — no es una página —  *(0 car.)* | — n/a — | **CRÍTICO:** no es una página del sitio, es un enlace huérfano en el menú (probablemente el mobile) hacia una URL nunca construida. |
| **Diseño Web** | Diseño Web con Astro framework | Shine Agencia  *(46 car.)* | Sitios web ultrarrápidos con Astro en Colombia. Sin WordPress. PageSpeed 95-100 garantizado. SEO técnico integrado. Agenda tu diagnóstico gratuito.  *(147 car.)* | Diseño web con Astro en Colombia: sitios que cargan en menos de 1 segundo | **ATENCIÓN:** los 4 H2 del proceso (Estrategia, Desarrollo, Diseño, SEO) aparecen duplicados dos veces en el HTML. FAQ en negrita, no en H3. |
| **Publicidad Digital** | Google Ads y Facebook Ads | Shine Agencia  *(41 car.)* | Gestionamos tus campañas en Google Ads y Facebook Ads para que cada peso invertido genere clientes reales. Bogotá, Colombia. Agenda tu diagnóstico gratuito.  *(156 car.)* | Deja de invertir en pauta y no saber si funciona | Meta al límite (156 car.). H2 "¿Para quién es este servicio?" repetido igual en las 3 páginas de servicio. FAQ en negrita, no en H3. |
| **Ecommerce** | Ecommerce con Tienda Nube | Shine Agencia  *(41 car.)* | Tienda online con Tienda Nube: diseño personalizado, medios de pago colombianos y lista para vender desde el día uno. Agenda tu diagnóstico gratuito.  *(149 car.)* | Tu negocio ya está listo para vender por internet | Buena tabla comparativa. H2 "¿Para quién es este servicio?" repetido igual en las 3 páginas de servicio. FAQ en negrita, no en H3. |
| **Blog (listado)** | Blog de Marketing Digital y Diseño Web | Shine Agencia  *(54 car.)* | Guías prácticas de marketing digital, diseño web y marca personal para líderes y empresas que quieren crecer con estrategia, propósito y visibilidad digital.  *(157 car.)* | Shine Blog | H1 genérico (Shine Blog), sin keyword. Meta en el límite superior (157 car.). Los H2 de cada post listado son descriptivos y únicos, correcto. |
| **Blog: Marketing Legal** | Marketing Digital para Abogados: Guía Completa 2026 | Shine Agencia  *(67 car.)* | Estrategias de marketing digital para abogados en 2026: SEO, Google My Business y redes sociales para atraer clientes calificados a tu despacho jurídico.  *(153 car.)* | Marketing Digital para Abogados: Guía Completa 2026 | El mejor ejemplo del sitio: cada H2 es una pregunta con respuesta directa en negrita, jerarquía H2>H3 impecable, sin H1 duplicado. |
| **Blog: Astro Framework** | Por qué usar Astro Framework en 2026: Guía Técnica | Shine Agencia  *(66 car.)* | Descubre por qué Astro Framework supera a otros frameworks en 2026. Arquitectura Zero JS, carga ultrarrápida y optimización AEO para liderar en Google.  *(153 car.)* | Por qué usar Astro Framework en 2026: Guía Técnica | **IMPORTANTE:** H1 duplicado en el cuerpo del artículo. Resto de la jerarquía correcta, FAQ sí usa H3 real. |
| **Blog: Seguridad Web** | Seguridad Web en 2026: Cómo Astro Protege tu Sitio | Shine Agencia  *(67 car.)* | Por qué la arquitectura de Astro Framework reduce el riesgo de hackeo frente a WordPress y qué significa eso para la seguridad de tu negocio online.  *(150 car.)* | Seguridad Web en 2026: Cómo Astro Protege tu Sitio | **IMPORTANTE:** H1 duplicado en el cuerpo del artículo. H2 en formato pregunta, FAQ con H3 real — buena estructura aparte de eso. |
| **Blog: Marca Personal** | Marca Personal en la Era de la IA: Tu Ventaja Competitiva | Shine Agencia  *(74 car.)* | La inteligencia artificial está transformando cómo los profesionales se posicionan. Descubre por qué construir una marca personal auténtica es tu ventaja competitiva.  *(158 car.)* | Marca Personal en la Era de la IA: Tu Ventaja Competitiva | **CRÍTICO:** H1 duplicado en el cuerpo Y salto de jerarquía: pasa de H1 directo a H3 sin ningún H2 en toda la página. FAQ en negrita, no en H3. |
| **Contacto** | Contacto | Diagnóstico Digital Gratuito | Shine Agencia  *(55 car.)* | Contáctanos y agenda tu sesión de diagnóstico gratuita. Te ayudamos a transformar tu presencia digital con estrategia y propósito. Respuesta en 24 horas.  *(153 car.)* | Contacto | H1 muy escueto (Contacto), sin keyword. El H2 de apoyo sí es descriptivo. Sin dirección física/mapa embebido. |

# **Hallazgo Crítico #1 — Indexación muy limitada en Google**

Se probó la presencia real del sitio en resultados de búsqueda con consultas "site:shineagencia.com", "site:shineagencia.com diseño web" y variantes de marca/categoría ("agencia diseño web Astro Framework Colombia"). De las aproximadamente 10 páginas auditadas, Google solo devuelve dos URLs indexadas de forma consistente: la home y un artículo del blog. Nosotros, las tres páginas de servicio, el listado del blog, los otros tres artículos y Contacto no aparecen en ninguna de las búsquedas realizadas.

**Esto es relevante antes que cualquier otra recomendación de AEO/GEO: la correlación entre el Top 10 de Google y las citas de motores de IA es de aproximadamente 75%. Rankear — y antes que rankear, estar indexado — en Google es el prerrequisito para ser citado por IA, no un paso paralelo. Mientras la mayoría de páginas del sitio no estén indexadas, el trabajo de llms.txt, FAQ estructuradas y tablas comparativas tiene un techo bajo de impacto real, aunque sea técnicamente excelente.**

Ninguna página revisada tiene meta robots noindex ni bloqueo de Googlebot en robots.txt — la causa más probable no es un bloqueo técnico deliberado, sino una combinación de: sitio relativamente joven, pocos enlaces externos (backlinks) apuntando al dominio, y posible falta de verificación/envío activo del sitemap en Google Search Console.

**Acción recomendada**

* Verificar en Google Search Console (Cobertura / Páginas) el estado real de cada URL.
* Confirmar que el sitemap-index.xml esté efectivamente enviado dentro de Search Console.
* Usar la herramienta de "Inspección de URLs" para solicitar indexación manual de las páginas faltantes.
* Construir enlaces externos de calidad hacia el dominio — directorios de agencias, backlinks desde los sitios de clientes entregados.
* Priorizar este punto antes que pulir más la estructura AEO: sin indexación de base, el resto de recomendaciones de este informe tienen impacto limitado.

# **Hallazgo Crítico #2 — Reglas contradictorias en robots.txt**

El archivo https://shineagencia.com/robots.txt contiene dos bloques de reglas para los mismos user-agents de IA, con instrucciones opuestas:

**Bloque 1 — "Cloudflare Managed content" (aparece primero)**

User-agent: ClaudeBot

Disallow: /

User-agent: Google-Extended

Disallow: /

User-agent: GPTBot

Disallow: /

User-agent: CCBot

Disallow: /

**Bloque 2 — "AI Crawlers" (aparece después, en la sección personalizada)**

User-agent: GPTBot

Allow: /

User-agent: ClaudeBot

Allow: /

User-agent: Google-Extended

Allow: /

User-agent: CCBot

Allow: /

**Por qué importa:** cuando un mismo user-agent aparece en dos grupos con reglas opuestas de igual especificidad, el comportamiento no está garantizado, y muchos bots simplemente respetan el primer bloque que coincide con su nombre. ClaudeBot, GPTBot, Google-Extended y CCBot corren un riesgo real de estar bloqueados en la práctica, exactamente los mismos bots que el llms.txt del sitio está tratando de atraer.

**Acción recomendada**

* Eliminar el bloque "Cloudflare Managed content" con Disallow para GPTBot, ClaudeBot, Google-Extended y CCBot, dejando una única regla por bot sin ambigüedad.
* Revisar si el bloqueo a Amazonbot, Applebot-Extended, Bytespider y meta-externalagent es intencional (bloquear solo entrenamiento).
* Validar con el Content-Signal actual (ai-train=no, use=reference) que la intención declarada sea coherente en todo el archivo.

# **Hallazgo Crítico #3 — Enlace roto a /servicios/**

La URL https://shineagencia.com/servicios/ no es una página que Shine haya diseñado ni publicado. El problema es que el sitio sí enlaza a ella: en el bloque de navegación que se repite en cada página (compatible con el menú mobile/hamburguesa) "Servicios" tiene un href apuntando a /servicios/, un enlace huérfano hacia una URL inexistente.

**Acción recomendada**

* Opción rápida (recomendada): agregar un redirect 301 a nivel de Netlify — "/servicios/ /servicios/diseno-web-estrategico/ 301".
* Opción de código: en el componente de navegación, quitar el href de "Servicios" en el menú mobile.
* Opción de mayor inversión: construir una página real en /servicios/ como hub temático.

# **Análisis AEO / GEO (Visibilidad en IA)**

Se evaluó el sitio con el marco de tres pilares, Estructura, Autoridad, Presencia, usado para optimización en ChatGPT, Perplexity, Claude, Gemini y AI Overviews de Google.

| **Pilar AEO** | **Estado** | **Evidencia observada** |
| --- | --- | --- |
| **1. Estructura (extraíble)** | **Bien** | - Respuestas directas en negrita al inicio de cada sección de FAQ y de cada H2 tipo pregunta.  - 3 tablas comparativas (Astro vs. WordPress, Google Ads vs. Facebook Ads, Tienda Nube vs. Shopify/WooCommerce).  - Listas numeradas para procesos. |
| **2. Autoridad (citable)** | **Bien** | - Estadísticas con fuente y año citados explícitamente (Adobe/Google, 2024).  - Autores con nombre, cargo y bio en cada artículo del blog.  - Fecha de publicación y tiempo de lectura visibles.  - Caso de éxito documentado con cliente real y cita textual. |
| **3. Presencia (dónde te ve la IA)** | **Atención** | - llms.txt implementado correctamente, pero ver Hallazgo Crítico #2.  - Perfiles activos en Instagram, LinkedIn, TikTok enlazados desde el footer.  - Sin evidencia de presencia en Wikipedia o reseñas de terceros verificable desde el sitio.  - Solo 4 artículos de blog, volumen aún bajo para autoridad temática amplia. |

## **Otros hallazgos AEO específicos**

* **Pricing.md ausente:** el FAQ del sitio declara explícitamente que no publican tarifas fijas. Considerar publicar al menos un rango orientativo en formato citable.
* **Datos estructurados sin verificar:** confirmar que el propio sitio de Shine tenga schema implementado (Organization, FAQPage, Article) con el Rich Results Test de Google.
* **Imágenes de testimonios inconsistentes:** el testimonio de Daniela Rodriguez usa la misma foto que Alejandro Aguilar, Yohanna Ramirez muestra un logo en vez de foto de persona, y Luis Pinilla usa un avatar genérico — señal de confianza débil.

# **Evaluación de H1 y H2**

Se revisó el H1 y la jerarquía de H2/H3 de las 10 páginas auditadas (home, 3 páginas de servicio, Nosotros, Contacto, blog y sus 4 artículos). El balance general es positivo — la mayoría de H1 son únicos, con keyword y longitud razonable, y los H2 en formato pregunta de los artículos del blog son el mejor ejemplo de estructura AEO de todo el sitio. Pero hay cinco patrones que se repiten en varias páginas y que conviene corregir antes que pulir títulos individuales.

## **Patrones detectados**

| **Patrón detectado** | **Detalle y páginas afectadas** |
| --- | --- |
| **H1 duplicado en 3 de 4 posts del blog** | El H1 real viene del template (título de página) y el cuerpo del artículo repite otro "#" al inicio:  - /blog/ventajas-astro-framework-2026  - /blog/seguridad-web-astro-framework  - /blog/marca-personal-ai  Solo "Marketing Digital para Abogados" está bien. Es un hábito de redacción, no un bug de template: al escribir, el primer encabezado del cuerpo debe ser "##", nunca "#". |
| **FAQ sin heading semántico** | Las preguntas de FAQ están en \*\*negrita\*\*, no en encabezado H3 real, en: Inicio, Diseño Web, Publicidad Digital, Ecommerce y el post "Marca Personal en la Era de la IA".  En cambio, los posts "Ventajas de Astro", "Seguridad Web" y "Marketing para Abogados" sí usan H3 real en sus preguntas.  Esto resta peso a exactamente el contenido más útil para featured snippets y FAQPage schema. Revisar el componente de acordeón de FAQ (probablemente usa <strong> en vez de <h3>). |
| **Salto de jerarquía (H1 → H3, sin H2)** | El post "Marca Personal en la Era de la IA" no tiene ningún H2 en toda la página: pasa del H1 (duplicado) directo a H3, con 3 H4 anidados bajo un H3. Es el único post con este problema. |
| **H2 idéntico repetido en 3 páginas** | "¿Para quién es este servicio?" aparece palabra por palabra en Diseño Web, Publicidad Digital y Ecommerce — oportunidad perdida de meter keyword específico de cada servicio. |
| **H2 de proceso duplicados en la misma página** | En Diseño Web, los 4 H2 del proceso ("Estrategia y Arquitectura", "Desarrollo con Astro", "Diseño UX/UI y Contenido", "SEO, Pruebas y Lanzamiento") aparecen duplicados dos veces en el HTML — posible renderizado doble desktop/mobile sin diferenciar. Revisar con Diego en el componente. |

## **H1 que conviene reescribir**

Para los H1 duplicados del blog, la opción más simple es borrar la segunda línea "#" del cuerpo del artículo — el H1 del template ya cumple esa función. Si se quiere conservar esa frase como refuerzo visual, bajarla a "##".

| **Página** | **H1 actual** | **Problema** | **Opciones de reemplazo** |
| --- | --- | --- | --- |
| **Contacto** | Contacto | Genérico, sin keyword ni valor | 1) Agenda tu Diagnóstico Digital Gratuito  2) Contáctanos: Diagnóstico Gratuito en 24 Horas  3) Hablemos de tu Proyecto Digital |
| **Blog (listado)** | Shine Blog | Sin keyword, no dice de qué trata | 1) Blog de Marketing Digital y Diseño Web  2) Guías de Marketing Digital para Empresas en Colombia  3) Blog Shine Agencia: Diseño Web, SEO y Publicidad |

Para diferenciar el H2 "¿Para quién es este servicio?" repetido: en Diseño Web, "¿Este servicio de diseño web es para ti?"; en Publicidad Digital, "¿Necesitas gestión de Google Ads o Facebook Ads?"; en Ecommerce, "¿Tu negocio está listo para una tienda online?".

# **Problemas Priorizados**

## **Críticos, resolver esta semana**

* **1.** Indexación muy limitada en Google — verificar Search Console y solicitar indexación manual de las páginas faltantes. Es prerrequisito de todo lo demás.
* **2.** Reglas contradictorias en robots.txt para GPTBot, ClaudeBot, Google-Extended y CCBot.
* **3.** Enlace roto a /servicios/ en el menú mobile — corregir con redirect 301 o quitando el href.

## **Importantes, resolver este mes**

* **4.** H1 duplicado en 3 de 4 posts del blog (Astro Framework, Seguridad Web, Marca Personal) — quitar el "#" redundante al inicio del cuerpo.
* **5.** Convertir las preguntas de FAQ en H3 real (no negrita) en Inicio, Diseño Web, Publicidad Digital, Ecommerce y el post "Marca Personal".
* **6.** Corregir el salto de jerarquía (H1→H3 sin H2) en el post "Marca Personal en la Era de la IA".
* **7.** Title de "Nosotros" excede el largo recomendado (77 car.) y se truncará en Google.
* **8.** Confirmar implementación real de schema markup (Organization, FAQPage, Article).
* **9.** Corregir imágenes de testimonios mal asignadas/reutilizadas.
* **10.** Validar la afirmación de PageSpeed 95-100 con datos reales (PageSpeed Insights / CrUX).

## **Menores, mejora continua**

* **11.** Reescribir H1 genéricos: "Contacto" y "Shine Blog" (ver opciones en la sección de H1/H2).
* **12.** Diferenciar el H2 "¿Para quién es este servicio?" repetido igual en las 3 páginas de servicio.
* **13.** Revisar la duplicación de los H2 del proceso en la página de Diseño Web.
* **14.** Ajustar meta descriptions al límite superior (Publicidad Digital 156, Blog 157, Nosotros 155, Marca Personal 158 caracteres).
* **15.** Ampliar volumen de contenido del blog (actualmente 4 artículos) para ganar autoridad temática.
* **16.** Evaluar publicar un rango de precios orientativo en formato citable para IA (pricing.md o sección visible).
* **17.** Cambiar anchor text genérico ("Ver Servicio", "Continuar leyendo") por texto descriptivo con keyword.

# **Conclusión**

shineagencia.com está mejor preparado para AEO que la gran mayoría de sitios de agencias en Colombia: llms.txt propio, contenido con respuestas directas, tablas comparativas y estadísticas citadas son exactamente lo que premian los motores de IA. La base técnica (Astro, HTTPS, metadatos completos, sitemap) también está sólida.

**El mayor riesgo no es la falta de buenas prácticas de contenido, sino descuidos puntuales y corregibles: la mayoría de páginas del sitio aún no están indexadas en Google (el paso previo obligatorio a cualquier cita de IA), las reglas de robots.txt pueden estar bloqueando a los mismos bots que el resto del sitio fue diseñado para atraer, el menú mobile enlaza a una página /servicios/ que nunca se construyó, y un patrón de encabezados (H1 duplicado, FAQ sin heading semántico) se repite en varias páginas. Resolver estos puntos, en ese orden, es el camino de mayor impacto por menor esfuerzo.**
