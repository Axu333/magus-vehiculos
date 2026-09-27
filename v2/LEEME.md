# Magus Vehículos · Versión 2

Sitio estático (HTML + CSS + JS, sin dependencias). Se abre con Live Server sobre `v2/index.html`.

## Estructura
```
v2/
├─ index.html          contenido y textos
├─ favicon.svg
├─ css/
│  ├─ base.css         colores, tipografías y espacios (arriba de todo, en :root)
│  ├─ componentes.css  botones, encabezado, menú, tarjetas, carrusel
│  └─ secciones.css    diseño de cada sección
├─ js/
│  ├─ datos.js         ← UNIDADES Y ENTREGAS (editar acá)
│  └─ main.js          menú, filtros, carrusel, horario "abierto ahora"
└─ img/
   ├─ marca/           logo en SVG y PNG (redibujado en vector)
   ├─ unidades/        fondo animado del inicio (cuadradas): nombre-480.jpg y nombre-800.jpg
   └─ entregas/        fotos: nombre-600.jpg y nombre-1000.jpg
```

## Cambios frecuentes
- **Fotos del fondo del inicio / entregas:** editar `js/datos.js` (listas `unidades` y `entregas`) y subir las fotos con los nombres indicados.
- **Horarios:** tabla en `index.html` (sección Contacto), constante `HORARIO` en `js/main.js` y bloque `openingHoursSpecification` en el `<head>`.
- **WhatsApp:** `whatsapp` en `js/datos.js` y los links `wa.me/5493456521595` en `index.html`.
- **Opiniones:** se cargan solas desde Google con Elfsight.

## Pendiente antes de publicar
- Dominio definitivo: completar URLs absolutas en `og:image` y agregar `<link rel="canonical">`.
- Link de Facebook (agregar al pie y al JSON-LD `sameAs`).
- Dirección exacta (calle y número).
