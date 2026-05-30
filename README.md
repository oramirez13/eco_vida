# Eco Vida

Eco Vida es un sitio web estático de muestra para una empresa de jardinería, mantenimiento de zonas verdes y paisajismo.

El sitio está pensado como MVP publicable en Netlify. Incluye páginas informativas, selección de servicios, una cotización de muestra y un formulario de contacto demostrativo.

## Páginas

- `index.html`: página principal.
- `servicios.html`: lista de servicios disponibles.
- `cotizacion.html`: cotización de muestra que se abre después de seleccionar un servicio.
- `acerca.html`: información general del proyecto.
- `contacto.html`: formulario de contacto de muestra.
- `404.html`: página para rutas no encontradas.

## Importante

El formulario de contacto no envía información a un servidor todavía. Por ahora solo valida los campos y muestra un mensaje de confirmación de muestra.

La cotización tampoco guarda datos en una base de datos. Usa JavaScript del navegador para mostrar un resumen temporal.

## Publicación en Netlify

Para publicar este MVP:

1. Entra a Netlify.
2. Crea un nuevo sitio.
3. Sube la carpeta `eco_vida` completa.
4. No uses comando de build.
5. Usa la carpeta raíz del proyecto como carpeta de publicación.

Si conectas el proyecto desde Git y la raíz del repositorio es `eco_vida`, Netlify puede usar la configuración de `netlify.toml`.

## Dependencias externas

El sitio usa CDN para:

- Bootstrap CSS.
- jQuery.
- Popper.
- Bootstrap JavaScript.

El usuario final necesita conexión a Internet para cargar esos recursos externos.

## Estructura

```text
eco_vida/
├── 404.html
├── README.md
├── acerca.html
├── contacto.html
├── cotizacion.html
├── index.html
├── netlify.toml
├── robots.txt
├── servicios.html
├── css/
│   └── style.css
├── img/
└── js/
    └── script.js
```
