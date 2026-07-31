/* ============================================================
   components.js - Eco Vida
   Version: 1.0
   Funcion: carga el encabezado y el pie de pagina desde la
   carpeta partials/ para no repetirlos en cada pagina del sitio.
   ============================================================ */

// Esperamos a que el documento HTML termine de cargarse
document.addEventListener("DOMContentLoaded", function () {

    // Buscamos todos los contenedores vacios que tengan el atributo data-include
    var contenedores = document.querySelectorAll("[data-include]");

    // Si no hay ninguno, no hay nada que inyectar y salimos de la funcion
    if (contenedores.length === 0) { return; }

    // Obtenemos la ruta actual del navegador (ej. "/servicios.html")
    var rutaActual = window.location.pathname;

    // Tomamos solo el nombre del archivo (ej. "servicios.html")
    var paginaActual = rutaActual.split("/").pop();

    // Si la ruta termina en "/" (caso de la pagina de inicio),
    // usamos "index.html" como nombre de archivo actual
    if (paginaActual === "") {
        paginaActual = "index.html";
    }

    // Contador de parciales pendientes por cargar
    var pendientes = contenedores.length;

    // Recorremos cada contenedor para inyectar su archivo parcial
    contenedores.forEach(function (contenedor) {

        // fetch() pide al servidor el archivo indicado en data-include
        fetch(contenedor.getAttribute("data-include"))

            // Si la respuesta del servidor no es correcta, lanzamos un error
            .then(function (respuesta) {
                if (!respuesta.ok) {
                    throw new Error("No se pudo cargar el parcial");
                }
                return respuesta.text();
            })

            // Cuando se obtiene el texto, lo colocamos dentro del contenedor
            .then(function (html) {
                contenedor.innerHTML = html;
                terminoDeCargar();
            })

            // Si ocurre un error, mostramos un aviso dentro del contenedor
            .catch(function () {
                contenedor.innerHTML =
                    '<p class="text-center my-3">Error al cargar un componente. ' +
                    "Sirve el sitio por HTTP (ej. python3 -m http.server).</p>";
                terminoDeCargar();
            });
    });

    // Funcion que se ejecuta cada vez que un parcial termina de inyectarse
    function terminoDeCargar() {
        // Restamos un pendiente cada vez que un parcial se carga
        pendientes--;

        // Cuando ya se cargaron todos los parciales, marcamos el menu
        if (pendientes === 0) { marcarEnlaceActivo(); }
    }

    // Marca como activo el enlace del menu que apunta a la pagina actual
    function marcarEnlaceActivo() {

        // Recorremos todos los enlaces del menu de navegacion
        document.querySelectorAll(".navbar-nav .nav-link").forEach(function (enlace) {

            // Si el enlace apunta a la pagina actual, le agregamos la clase "active"
            if (enlace.getAttribute("href") === paginaActual) {
                enlace.classList.add("active");
            }
        });
    }
});
