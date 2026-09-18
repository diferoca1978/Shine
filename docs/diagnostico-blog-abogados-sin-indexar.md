# Diagnóstico — `/blog/marketing-digital-para-abogados/` sin indexar

Por qué Google rastreó este artículo el **3/9/2026** y decidió no indexarlo,
verificado contra la página en producción y contra el código, no inferido del
informe de GSC.

Origen: el pendiente que dejó abierto
[`gsc-acciones-manuales.md`](./gsc-acciones-manuales.md) § "Pendiente, fuera
de este ciclo". Verificación realizada el **17/9/2026** sobre
`https://shineagencia.com/blog/marketing-digital-para-abogados/` con
`agent-browser` (DOM renderizado + JSON-LD) y `grep` sobre `src/`.

> **Qué cambia respecto a la auditoría.** `gsc-acciones-manuales.md` cerró el
> caso como _"calidad/autoridad — necesita contenido"_. El contenido no es el
> problema: son 2067 palabras con estructura correcta. El problema es de
> **topología de enlaces** y de **pruebas verificables**. Eso cambia el
> arreglo: no se reescribe el artículo, se conecta y se documenta.

---

## Lo que ya está bien — no tocar

Confirmado en el DOM renderizado el 17/9/2026. Ninguno de estos puntos
requiere trabajo y ninguno explica la falta de indexación.

| Señal              | Valor verificado                                            |
| ------------------ | ----------------------------------------------------------- |
| Estado HTTP        | 200                                                          |
| `robots`           | `index, follow`                                              |
| Canonical          | `https://shineagencia.com/blog/marketing-digital-para-abogados/` (autorreferente) |
| `<h1>`             | Exactamente 1                                                |
| `<h2>`             | 9, todos en formato pregunta (bueno para AEO)                |
| Palabras           | 2067                                                         |
| JSON-LD            | `ProfessionalService`+`LocalBusiness`, `WebSite`, `BlogPosting`, `BreadcrumbList`, `FAQPage` — todos parsean |
| Caja de autor      | Renderiza nombre, rol, bio, fecha de publicación, fecha de actualización, tiempo de lectura |
| Índice de contenidos | Renderiza, generado desde `headings`                       |

### Trampa conocida: el desajuste de barra final en el JSON-LD

En `BlogPosting`, `url` lleva barra final (`seo.ts:254`) mientras `@id`
(`seo.ts:251`) y `mainEntityOfPage.@id` (`seo.ts:263`) no la llevan.
**Es correcto y no se toca.** `@id` es un identificador opaco, no una URL
navegable; ponerle la barra a un lado del par rompe silenciosamente el grafo
de schema. Ya se documentó este error en una revisión anterior — no volver a
"arreglarlo".

---

## Causa 1 — orfandad total de enlaces internos

**Es la causa principal.** Ninguna página del sitio enlaza a este artículo.

```bash
grep -rn "marketing-digital-para-abogados" --include="*.astro" --include="*.md" --include="*.ts" src/ \
  | grep -v "^src/content/blog/marketing-digital-para-abogados.md"
# → sin resultados
```

Comprobado también en producción: la home y `/servicios/publicidad-digital/`
contienen exactamente tres enlaces a `/blog/` cada una — los de la barra de
navegación y el pie — y **cero** enlaces a un post concreto. El único camino
hacia el artículo es el listado paginado del blog.

Para Google eso se lee como *ninguna página de este sitio considera que este
artículo merezca un enlace*. Es la lectura textual de _Rastreada: actualmente
sin indexar_.

**Esto aplica a los 4 posts del blog, no solo a este.** Ninguno recibe
enlaces profundos.

### Enlaces salientes desde el cuerpo: 2, ambos al mismo sitio

Dentro de `<article>`, descontando las migas de pan (`/`, `/blog/`), el
artículo enlaza a `/contacto/` dos veces
(`marketing-digital-para-abogados.md:223` y `:229`) y a nada más. Cero
enlaces a `/servicios/*`. Cero enlaces a los otros tres posts.

---

## Causa 2 — afirmaciones sin fuente verificable

El artículo no tiene **ni un solo enlace externo**. Hace cuatro afirmaciones
numéricas duras sin respaldo enlazable:

| Afirmación                                       | Dónde        | Estado                              |
| ------------------------------------------------ | ------------ | ----------------------------------- |
| "62% de los consumidores…"                       | `.md:37`     | Atribución en texto plano `(Adobe/Google, 2024)`, sin URL |
| "72% de los clientes… mapa de Google"            | `.md:38`     | Sin fuente                          |
| "solo el 28% de los bufetes en Latinoamérica…"   | `.md:39`     | Sin fuente                          |
| "más de 50 reseñas con 4.7 o superior"           | `.md:88`     | Sin fuente                          |

El 72% se repite además dentro del FAQ (`.md:19`), donde entra al
`FAQPage` schema — una cifra sin fuente que se publica como dato
estructurado.

En un tema adyacente a YMYL (servicios legales), estadísticas no verificables
son exactamente lo que se lee como falta de autoridad.

### El caso Aguilar: el mejor activo, presentado sin pruebas

La sección `.md:141-185` es experiencia de primera mano — el tipo de
contenido que ningún competidor puede replicar y el activo E-E-A-T más fuerte
de la página. Se presenta sin una sola prueba comprobable:

- No enlaza a `aguilarabogadosasociados.com`, pese a que la URL ya está en
  el repo (`src/content/works/aguilarAbogados.md`, campo `link`).
- Menciona `@abogadoalejandroaguilar` (`.md:167`) sin enlazar al perfil.
- "primeras posiciones en Google" (`.md:157`) no dice para qué keyword,
  desde cuándo, ni contra qué línea base.

---

## Causa 3 — dos defectos concretos en el schema del autor

### 3a. El `@id` del autor apunta a un ancla que no existe

`seo.ts:225` construye el identificador del `Person` a partir del nombre:

```ts
"@id": `${COMPANY_INFO.url}/nosotros#${(fullAuthor?.name ?? post.author.name).toLowerCase().replace(/\s+/g, "-")}`,
```

Para "Rocio Parra" eso produce
`https://shineagencia.com/nosotros#rocio-parra`. Verificado en el DOM de
`/nosotros` el 17/9/2026: **no existe ningún elemento con `id="rocio-parra"`**.
Los `id` presentes en esa página son `about`, `wrapper-about`, `about-title`,
`diegorochi`, `diegorochiblack`, entre otros. La identidad declarada del autor
apunta al vacío.

### 3b. El `sameAs` existe en el código pero no llega al artículo

Hay **dos** generadores de `Person` en `seo.ts` y el blog usa el que no emite
`sameAs`:

| Generador                       | Emite `sameAs`                       | Lo usa el post |
| ------------------------------- | ------------------------------------ | -------------- |
| Bloque inline en `BlogPosting`, `seo.ts:221-246` | **No**               | Sí             |
| `generateAuthorSchema`, `seo.ts:685-702`         | **Sí** (`:685-687`, `:702`) | No     |

Los perfiles de Rocío ya están en `src/config/authors.ts:48-50` (Instagram y
LinkedIn) y nunca salen al JSON-LD del artículo. Es la corrección de E-E-A-T
más barata disponible: el dato está, el generador correcto está, solo no se
llaman entre sí.

### 3c. `knowsAbout` no menciona nada jurídico

El `knowsAbout` sale del array `credentials` de `authors.ts`, que para Rocío
es `["Estrategia de marca personal", "Marketing digital", "Comunicación
corporativa"]`. Nada conecta a la autora con el dominio legal, que es el tema
del artículo.

### 3d. `about` está hardcodeado para todos los posts

`seo.ts:272-275` fija el mismo `about` en **todos** los `BlogPosting`:

```ts
about: {
  "@type": "Thing",
  name: "Marketing Digital Auténtico",
},
```

No es la entidad de este artículo, ni la de ninguno de los otros tres.

---

## Causa 4 — no existe el cluster temático que este post debería encabezar

- **No hay sección de posts relacionados.** `src/pages/blog/[slug].astro`
  termina el artículo con el botón "Volver Arriba"; no hay bloque de posts
  relacionados ni CTA hacia servicios.
- **No hay ruta de etiquetas.** `src/pages/blog/` contiene solo
  `index.astro` y `[slug].astro`. Los `tags` del frontmatter no generan
  ningún hub navegable.
- **El blog son 4 posts sobre 4 temas sin relación** (marca personal + IA,
  marketing jurídico, seguridad con Astro, ventajas de Astro). No hay
  profundidad temática en ninguna dirección.

### El vertical legal existe en el portafolio y el sitio no lo dice

De las 13 entradas de `src/content/works/`, **8 son firmas de abogados
confirmadas** por su título o descripción:

`aguilarAbogados` · `cardosoabogado` · `causaypulso` · `emetaion` ·
`montcrest` ("despacho jurídico empresarial") · `munozAbogadosNotariales` ·
`perezAraujoAbogados` · `recurrirabogados`

(`buitragoyvillota` podría ser una novena; su frontmatter no lo confirma.)

Shine es, de hecho, una agencia del vertical legal, y este artículo debería
ser el centro de gravedad de ese vertical. Hoy es una isla.

**Limitación a tener en cuenta:** **no existe ruta `/works/[slug]`.** Las
entradas de `works` solo se renderizan dentro de secciones de la home. Hoy no
hay página de caso a la que el artículo pueda enlazar — cualquier plan que
asuma lo contrario está mal planteado.

---

## Plan de corrección, por impacto

| #   | Acción                                                                                  | Dónde                                              | Esfuerzo | Carril   |
| --- | --------------------------------------------------------------------------------------- | -------------------------------------------------- | -------- | -------- |
| 1   | Enlaces entrantes contextuales desde las 3 páginas de servicio y la home, con anchor descriptivo | `src/pages/servicios/*.astro`, `src/pages/index.astro` | Bajo | Ligero |
| 2   | Enlazar desde el cuerpo a `/servicios/publicidad-digital/`, `/servicios/diseno-web-estrategico/` y a los otros posts | `marketing-digital-para-abogados.md`         | Bajo     | Ligero   |
| 3   | Citar con enlace las 4 estadísticas, o eliminarlas                                        | el `.md` (`:37`, `:38`, `:39`, `:88`, `:19`)       | Bajo     | Ligero   |
| 4   | Añadir `id="rocio-parra"` en `/nosotros` y emitir `sameAs` en el `Person` del `BlogPosting` | `nosotros.astro`, `seo.ts:221-246`                 | Bajo     | Ligero   |
| 5   | Sección de posts relacionados al cierre del artículo                                      | `src/pages/blog/[slug].astro`                      | Medio    | Completo |
| 6   | Pruebas verificables en el caso Aguilar (enlace al sitio, al TikTok, métricas fechadas)   | el `.md:141-185`                                   | Medio    | Completo |
| 7   | Hub o página de servicio "Marketing jurídico" que consolide el vertical legal             | ruta nueva                                         | Alto     | Completo |

### Enrutamiento según AGENTS.md

- **1–4 son carril ligero.** La decisión ya está tomada en este documento;
  implementarlas es transcripción. Añadir entradas a `feature_list.json` con
  `source` apuntando a las secciones de este archivo y `acceptance`
  verificable, luego `/spec-impl feature <id>`.
- **5–7 son carril completo.** Son decisiones arquitectónicas nuevas
  (plantilla, ruta, arquitectura de información). Requieren
  `specs/NN-slug.md` en `Status: Draft` y aprobación humana antes de
  implementar.

> El spec del carril completo **no** debería titularse "mejorar el contenido
> del post". El título correcto es algo como *"topología de enlaces internos
> del vertical legal"* — ese es el problema que resuelve.

### Criterios de aceptación verificables

Escribirlos contra `dist/` después de un build, nunca contra el código
fuente — un grep sobre `src/` no ve lo que Astro genera.

- `grep -rl "marketing-digital-para-abogados" dist/servicios/ dist/index.html`
  devuelve al menos 2 archivos.
- El `<article>` de `dist/blog/marketing-digital-para-abogados/index.html`
  contiene ≥ 3 enlaces internos que no apuntan a `/contacto/`.
- El `BlogPosting` de esa página incluye un array `sameAs` no vacío dentro de
  `author`.
- `dist/nosotros/index.html` contiene `id="rocio-parra"`.

---

## Qué NO arregla esto

- **Solicitar indexación en GSC.** Ya se sabe que la página existe y que es
  técnicamente válida; Google la rastreó el 3/9/2026 y eligió no indexarla.
  Volver a pedirlo sin cambiar las señales reinicia el ciclo sin resultado.
- **Reenviar el sitemap.** La URL ya está en el sitemap.
- **Alargar el artículo.** 2067 palabras ya son suficientes; el problema no
  es el volumen.
- **Cambiar el canonical o el `robots`.** Ambos son correctos.
