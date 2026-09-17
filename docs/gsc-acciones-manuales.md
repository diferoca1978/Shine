# Google Search Console — acciones manuales

Acciones que se ejecutan **dentro de la interfaz de Google Search Console**,
no en el código. Se registran aquí porque no son verificables contra un
build y por tanto no caben como criterios de aceptación de un spec.

Origen: revisión del informe de **Indexación de páginas** del **13/9/2026**
(9 indexadas, 31 sin indexar, 6 motivos), realizada el 16/9/2026.

Trabajo de código derivado del mismo informe:
`specs/04-trailing-slash-and-legacy-redirects.md`.

---

## Orden de ejecución

Las acciones 2 y 3 **dependen de que el despliegue esté en producción**.
Ejecutarlas antes hace que Google revalide contra la versión vieja y la
validación falle, lo que reinicia el ciclo de reintentos.

### 1. Desplegar `dev` → `main` (precondición, no es acción de GSC)

A 16/9/2026, `main` va 36 commits por detrás de `dev` y producción sigue
devolviendo 404 en `/servicios/`. Nada de lo que sigue tiene sentido antes
de esto.

- [ ] Despliegue en producción, incluyendo el spec 03 (hub `/servicios/`)
      y el spec 04 (barra final + `_redirects`).

### 2. Solicitar indexación de `/servicios/ecommerce/`

**Prioridad alta.** Es una de las tres páginas de servicio y GSC la reporta
como *Descubierta: actualmente sin indexar* con fecha de rastreo **N/D** —
Google la conoce pero **nunca la ha visitado**.

Verificado el 16/9/2026: responde 200, canonical correcto
(`https://shineagencia.com/servicios/ecommerce/`), `robots: index, follow`,
y está en el sitemap. No hay defecto técnico que corregir; es presupuesto
de rastreo desperdiciado en las variantes con 301 y los 404 legacy — que es
justo lo que arregla el spec 04.

- [ ] Inspección de URLs → pegar `https://shineagencia.com/servicios/ecommerce/`
      → **Solicitar indexación**.

### 3. Validar correcciones del informe 404

**No pulsar "VALIDAR CORRECCIÓN" antes del despliegue.** GSC valida el
grupo completo de las 11 URLs a la vez; si la mayoría sigue en 404 la
validación falla entera.

Tras el despliegue, de las 11 URLs del bucket 404:

| URL | Estado esperado tras el deploy |
| --- | --- |
| `/servicios/` | 200 (spec 03) |
| `/servicios/rediseno-web-estrategico/` | 301 → `/servicios/` |
| `/servicios/rediseño-web-estrategico/` | 301 → `/servicios/` |
| `/servicios/marca-personal/` | 301 → `/servicios/` |
| `/terminos-y-condiciones` | 301 → `/terminosycondiciones/` |
| `/politica-de-privacidad` | 301 → `/politicadeprivacidad/` |
| `/blog/2/` | 301 → `/blog/` |
| `/servicios/*` | Sigue en 404 — ver "Ruido" |
| `/politicadeprivacidad*` | Sigue en 404 — ver "Ruido" |
| `/404*` | Sigue en 404 — ver "Ruido" |
| `/~partytown/` | Sigue en 404 — correcto |

- [ ] Confirmar con `curl -sI` las 7 primeras filas antes de validar.
- [ ] Pulsar **VALIDAR CORRECCIÓN** en el informe 404.

### 4. Reenviar el sitemap (opcional, bajo impacto)

Solo tiene sentido después del despliegue, porque `/servicios/` aparecerá
como URL nueva en el sitemap. Google relee los sitemaps por su cuenta; esto
solo acelera un poco. **No sirve para resolver los 404 ni los 301** — ese
fue el malentendido inicial que originó esta revisión.

- [ ] Sitemaps → reenviar `https://shineagencia.com/sitemap-index.xml`.

---

## Qué NO hay que tocar

Motivos del informe que son configuración correcta y que GSC reporta solo
a título informativo. No validar, no "arreglar", no volver a revisar.

- **Excluida por "noindex" (2)** — `/politicadeprivacidad/` y
  `/terminosycondiciones/`. Deliberado
  (`politicadeprivacidad.astro:16`, `terminosycondiciones.astro:16`) y
  además excluidas del sitemap en `astro.config.mjs`.
- **Ruido de Speculation Rules (3)** — `/servicios/*`,
  `/politicadeprivacidad*`, `/404*`. No son URLs: Googlebot está leyendo
  literalmente los patrones `href_matches` del bloque
  `<script type="speculationrules">` de `src/layouts/MainLayout.astro`.
  Quitar esa optimización de LCP para contentar a un crawler que
  malinterpreta el formato sería un mal intercambio.
- **`/~partytown/`** — directorio de assets de Partytown. El 404 es
  correcto.
- **Variantes `http://` y `www.` (3)** — normalización automática de la
  plataforma, ya resuelta con 301.
- **`/blog`** (bucket *Error de redirección*) — último rastreo 14/5/2026.
  Verificado el 16/9/2026: devuelve `301 → /blog/` correctamente. Dato
  obsoleto, se limpia en el siguiente rastreo.
- **`/lawz/`** (bucket *Rastreada: sin indexar*) — landing antigua que ya
  no existe. El spec 04 le pone un 301; entretanto GSC la reclasificará
  sola.

---

## Pendiente, fuera de este ciclo

- **`/blog/marketing-digital-para-abogados/`** — *Rastreada: actualmente
  sin indexar*, rastreada el 3/9/2026. Técnicamente impecable: 200,
  canonical correcto, `index, follow`. Google decidió no indexarla por
  calidad/autoridad. No se arregla con nada técnico ni con solicitar
  indexación: necesita contenido, señales E-E-A-T y enlaces internos desde
  páginas que sí posicionen. Merece su propio spec.

## Cómo quedará la cuenta

Hoy: **9 indexadas de 11 URLs en el sitemap**. Las 2 que faltan son
`/servicios/ecommerce/` (acción 2) y
`/blog/marketing-digital-para-abogados/` (pendiente de contenido). Con el
hub `/servicios/` desplegado, el sitemap pasa a 12 URLs.
