# Meta Pixel bloqueado por CORS dentro de Partytown

Hallazgo de una revisión de consola en producción (DevTools) durante un
spot-check manual de navegación/contacto del 16/9/2026. No es un defecto de
SEO ni forma parte del scope de
`specs/04-trailing-slash-and-legacy-redirects.md` — se documenta aquí porque
no hay spec abierto que lo cubra todavía.

## Errores observados

En la consola de producción (`https://shineagencia.com`):

```
Access to fetch at 'https://connect.facebook.net/en_US/fbevents.js' from
origin 'https://shineagencia.com' has been blocked by CORS policy: No
'Access-Control-Allow-Origin' header is present on the requested resource.
```

Aparece dos veces (una directa, otra desde
`partytown-sandbox-sw.tmpl?...`), seguido de:

```
TypeError: Failed to fetch
```

## Causa

- `src/layouts/MainLayout.astro:67-78` carga Google Tag Manager
  (`GTM-KWDKMGBL`) dentro de un Web Worker vía
  `<script type="text/partytown">`, para no bloquear el hilo principal.
- Dentro del contenedor de GTM (configurado en la interfaz de GTM, no en
  este repo) hay una etiqueta de Meta/Facebook Pixel que carga
  `https://connect.facebook.net/en_US/fbevents.js`.
- Partytown intercepta las peticiones de red del worker y las resuelve con
  `fetch()` en vez de una etiqueta `<script>` normal en el hilo principal.
  Eso obliga al navegador a exigir CORS sobre esa petición.
- El servidor de Facebook no responde con `Access-Control-Allow-Origin`
  para ese recurso (no está pensado para cargarse así), así que el
  navegador bloquea la respuesta y el fetch falla.
- Los scripts de Google (GTM, gtag/GA4) sí devuelven headers CORS
  correctos, por lo que no se ven afectados por esta misma ruta — el
  problema es específico del Pixel de Meta.

## Impacto

- **SEO: ninguno.** Es un script de tracking del lado del cliente, corre
  después del renderizado servido a Googlebot. No afecta canonical, meta
  tags, schema, indexación, Core Web Vitals ni ranking.
- **Analítica/Ads: sí, para Meta Ads.** Con el Pixel roto:
  - No se registran eventos de conversión (leads, contacto, compras)
    atribuibles a campañas de Facebook/Instagram Ads.
  - Se rompen los públicos de retargeting y las audiencias personalizadas
    basadas en comportamiento del sitio.
  - El algoritmo de optimización de Meta Ads pierde señales de conversión,
    lo que puede degradar el rendimiento de campaña con el tiempo.
  - Google Analytics/GTM no se ve afectado — sigue funcionando con datos
    íntegros.

Relevante porque uno de los 3 servicios actuales de la agencia es
**Google Ads y Facebook Ads** — este bug importa si hay o habrá campañas
de Meta Ads activas para clientes.

## Salidas posibles (no implementadas)

1. Sacar la etiqueta de Meta Pixel del worker de Partytown — que GTM la
   cargue en el hilo principal en vez de vía Partytown. Se pierde algo de
   rendimiento (bloquea brevemente el hilo principal) pero el Pixel vuelve
   a funcionar.
2. Proxy same-origin: una función/edge function (Netlify) que reenvíe
   `fbevents.js` agregando `Access-Control-Allow-Origin`, y apuntar la
   etiqueta de GTM a esa URL propia en vez de `connect.facebook.net`
   directamente. Mantiene el script dentro de Partytown.

## Pendiente

No routeado todavía por el flujo SDD (no hay spec ni entrada en
`feature_list.json`). Antes de implementar, decidir cuál de las dos
salidas se prefiere — es una decisión de trade-off
(rendimiento vs. complejidad de mantener un proxy), no algo que un
documento existente ya responda, así que iría por el carril completo
(spec `Draft`, aprobación humana) según la regla de enrutamiento de
AGENTS.md.
