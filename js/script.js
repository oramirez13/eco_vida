document.addEventListener("DOMContentLoaded", function () {
  // Esta línea espera a que el HTML termine de cargar antes de ejecutar el código.

  function limpiarTexto(texto) {
    // Esta función recibe un texto y lo deja con espacios más ordenados.

    if (texto === null || texto === undefined) {
      // Esta condición evita errores si el valor recibido viene vacío o no existe.

      return "";
      // Esta línea devuelve un texto vacío para poder seguir trabajando sin romper el script.
    }

    return String(texto).replace(/\s+/g, " ").trim();
    // Esta línea convierte el valor a texto, elimina espacios repetidos y quita espacios al inicio y al final.
  }

  function textoSeguro(texto) {
    // Esta función limpia caracteres que no conviene guardar ni mostrar directamente.

    return limpiarTexto(texto).replace(/[<>"]/g, "");
    // Esta línea elimina símbolos que podrían afectar el HTML visible.
  }

  function obtenerElemento(idElemento) {
    // Esta función busca un elemento por su atributo id.

    return document.getElementById(idElemento);
    // Esta línea devuelve el elemento encontrado o null si no existe en la página actual.
  }

  function guardarServicioTemporal(servicio) {
    // Esta función intenta guardar el servicio elegido en el navegador.

    try {
      // Este bloque intenta usar localStorage, que guarda datos entre páginas.

      localStorage.setItem("servicioTemporalEcoVida", servicio);
      // Esta línea guarda el nombre del servicio con una clave propia del proyecto.
    } catch (error) {
      // Este bloque se ejecuta si el navegador bloquea localStorage.
    }
  }

  function leerServicioTemporal() {
    // Esta función intenta obtener el servicio seleccionado desde localStorage o desde la URL.

    var servicioGuardado = "";
    // Esta variable empieza vacía y luego recibirá el servicio encontrado.

    try {
      // Este bloque intenta leer el dato guardado en localStorage.

      servicioGuardado = localStorage.getItem("servicioTemporalEcoVida");
      // Esta línea recupera el servicio guardado desde servicios.html.
    } catch (error) {
      // Este bloque se ejecuta si el navegador no permite leer localStorage.

      servicioGuardado = "";
      // Esta línea mantiene la variable vacía para intentar el segundo método.
    }

    if (!servicioGuardado) {
      // Esta condición se cumple si localStorage no tenía ningún servicio.

      var parametros = new URLSearchParams(window.location.search);
      // Esta línea lee los parámetros que vienen después del signo ? en la URL.

      servicioGuardado = parametros.get("servicio");
      // Esta línea intenta leer una URL como cotizacion.html?servicio=Corte.
    }

    return textoSeguro(servicioGuardado);
    // Esta línea devuelve el servicio limpio para mostrarlo en pantalla.
  }

  function borrarServicioTemporal() {
    // Esta función elimina el servicio temporal después de generar el resumen.

    try {
      // Este bloque intenta borrar el dato de localStorage.

      localStorage.removeItem("servicioTemporalEcoVida");
      // Esta línea evita que una cotización vieja quede guardada.
    } catch (error) {
      // Este bloque se ejecuta si localStorage está bloqueado.
    }
  }

  // ============================================================
  // RESPALDO DEL MENÚ MÓVIL
  // ============================================================

  if (typeof window.jQuery === "undefined" || typeof window.jQuery.fn.collapse === "undefined") {
    // Esta condición revisa si Bootstrap no pudo cargar su función para abrir el menú móvil.

    var botonMenu = document.querySelector(".navbar-toggler");
    // Esta variable guarda el botón de menú que aparece en celulares.

    var menuPrincipal = obtenerElemento("menuPrincipal");
    // Esta variable guarda el contenedor de enlaces del menú.

    if (botonMenu !== null && menuPrincipal !== null) {
      // Esta condición evita errores si la página no tiene menú.

      botonMenu.addEventListener("click", function () {
        // Este evento se activa cuando el usuario toca el botón del menú.

        menuPrincipal.classList.toggle("show");
        // Esta línea abre el menú si está cerrado o lo cierra si está abierto.

        if (menuPrincipal.classList.contains("show")) {
          // Esta condición revisa si el menú quedó abierto.

          botonMenu.setAttribute("aria-expanded", "true");
          // Esta línea informa a tecnologías de asistencia que el menú está abierto.
        } else {
          // Este bloque se ejecuta si el menú quedó cerrado.

          botonMenu.setAttribute("aria-expanded", "false");
          // Esta línea informa a tecnologías de asistencia que el menú está cerrado.
        }
      });
    }
  }

  // ============================================================
  // CONTADOR DE CARACTERES DEL FORMULARIO DE CONTACTO
  // ============================================================

  var campoMensaje = obtenerElemento("mensaje");
  // Esta variable guarda el textarea del mensaje si existe en la página actual.

  var contador = obtenerElemento("contador");
  // Esta variable guarda el elemento que muestra la cantidad de caracteres.

  if (campoMensaje !== null && contador !== null) {
    // Esta condición evita errores en páginas que no tienen formulario de contacto.

    campoMensaje.addEventListener("keyup", function () {
      // Este evento se activa cada vez que el usuario suelta una tecla en el mensaje.

      var cantidadDeCaracteres = campoMensaje.value.length;
      // Esta variable cuenta cuántos caracteres escribió el usuario.

      contador.textContent = cantidadDeCaracteres;
      // Esta línea actualiza el número visible del contador.
    });
  }

  // ============================================================
  // RESALTADO DE CAMPOS AL RECIBIR Y PERDER EL FOCO
  // ============================================================

  var camposFormulario = document.querySelectorAll("input, select, textarea");
  // Esta variable guarda todos los campos de formulario de la página actual.

  camposFormulario.forEach(function (campoActual) {
    // Este ciclo recorre cada campo encontrado.

    campoActual.addEventListener("focus", function () {
      // Este evento se activa cuando el usuario entra a un campo.

      campoActual.classList.add("campo-activo");
      // Esta línea agrega una clase CSS para resaltar el campo activo.
    });

    campoActual.addEventListener("blur", function () {
      // Este evento se activa cuando el usuario sale de un campo.

      campoActual.classList.remove("campo-activo");
      // Esta línea quita la clase CSS para volver al estilo normal.
    });
  });

  // ============================================================
  // FORMULARIO DE CONTACTO (contacto.html)
  // ============================================================

  var formContacto = obtenerElemento("formContacto");
  // Esta variable guarda el formulario de contacto si existe en la página actual.

  if (formContacto !== null) {
    // Esta condición hace que este bloque solo trabaje en contacto.html.

    formContacto.addEventListener("submit", function (evento) {
      // Este evento se activa cuando el usuario intenta enviar el formulario de contacto.

      var nombre = obtenerElemento("nombre");
      // Esta variable guarda el campo del nombre.

      var correo = obtenerElemento("correo");
      // Esta variable guarda el campo del correo.

      var telefono = obtenerElemento("telefono");
      // Esta variable guarda el campo del teléfono.

      var mensaje = obtenerElemento("mensaje");
      // Esta variable guarda el campo del mensaje.

      nombre.value = textoSeguro(nombre.value);
      // Esta línea reemplaza el nombre por su versión limpia.

      correo.value = limpiarTexto(correo.value).toLowerCase();
      // Esta línea limpia el correo y lo convierte a minúsculas.

      telefono.value = limpiarTexto(telefono.value);
      // Esta línea limpia los espacios extra del teléfono.

      mensaje.value = textoSeguro(mensaje.value);
      // Esta línea reemplaza el mensaje por su versión limpia.

      if (!formContacto.checkValidity()) {
        // Esta condición revisa si los campos cumplen las reglas del HTML.

        evento.preventDefault();
        // Esta línea evita enviar el formulario si hay datos inválidos.

        formContacto.reportValidity();
        // Esta línea muestra el aviso del navegador sobre el campo incorrecto.

        return;
        // Esta línea detiene el proceso para no continuar con datos inválidos.
      }

      evento.preventDefault();
      // Esta línea evita que la página se recargue cuando el formulario es válido.

      obtenerElemento("mensajeConfirmacion").classList.remove("d-none");
      // Esta línea muestra el mensaje de confirmación.

      formContacto.reset();
      // Esta línea limpia todos los campos del formulario.

      contador.textContent = "0";
      // Esta línea reinicia el contador de caracteres.
    });
  }

  // ============================================================
  // SELECCIÓN DE SERVICIO (servicios.html)
  // ============================================================

  function seleccionarServicio(tarjetaActual) {
    // Esta función recibe la tarjeta que el cliente eligió.

    var servicioSeleccionado = tarjetaActual.getAttribute("data-servicio");
    // Esta variable lee el atributo data-servicio de la tarjeta seleccionada.

    servicioSeleccionado = textoSeguro(servicioSeleccionado);
    // Esta línea limpia el nombre del servicio antes de guardarlo o enviarlo.

    if (servicioSeleccionado === "") {
      // Esta condición evita avanzar si una tarjeta no tiene data-servicio.

      alert("No se pudo identificar el servicio seleccionado.");
      // Esta línea informa el problema al usuario.

      return;
      // Esta línea detiene el proceso porque no hay servicio válido.
    }

    guardarServicioTemporal(servicioSeleccionado);
    // Esta línea guarda el servicio para que cotizacion.html pueda leerlo.

    window.location.href = "cotizacion.html?servicio=" + encodeURIComponent(servicioSeleccionado);
    // Esta línea lleva al cliente a cotizacion.html y también envía el servicio por la URL como respaldo.
  }

  var tarjetasServicio = document.querySelectorAll(".tarjeta-servicio");
  // Esta variable guarda todas las tarjetas de servicios.

  tarjetasServicio.forEach(function (tarjetaActual) {
    // Este ciclo recorre cada tarjeta disponible.

    tarjetaActual.addEventListener("click", function () {
      // Este evento se activa cuando el cliente hace clic en una tarjeta.

      seleccionarServicio(tarjetaActual);
      // Esta línea guarda el servicio elegido y abre la página de cotización.
    });

    tarjetaActual.addEventListener("keydown", function (evento) {
      // Este evento se activa cuando la tarjeta tiene foco y el usuario presiona una tecla.

      if (evento.key === "Enter" || evento.key === " ") {
        // Esta condición permite seleccionar con Enter o con la barra espaciadora.

        evento.preventDefault();
        // Esta línea evita que la barra espaciadora mueva la página hacia abajo.

        seleccionarServicio(tarjetaActual);
        // Esta línea usa la misma lógica del clic.
      }
    });
  });

  // ============================================================
  // FORMULARIO Y RESUMEN DE COTIZACIÓN (cotizacion.html)
  // ============================================================

  var nombreServicioFormulario = obtenerElemento("nombreServicioFormulario");
  // Esta variable guarda el lugar donde se muestra el servicio seleccionado.

  if (nombreServicioFormulario !== null) {
    // Esta condición hace que este bloque solo trabaje en cotizacion.html.

    var servicioPendiente = leerServicioTemporal();
    // Esta variable lee el servicio elegido desde localStorage o desde la URL.

    if (servicioPendiente === "") {
      // Esta condición se cumple si el cliente entró sin seleccionar un servicio.

      obtenerElemento("sinCotizacion").classList.remove("d-none");
      // Esta línea muestra la alerta que pide regresar a servicios.
    } else {
      // Este bloque se ejecuta cuando sí hay un servicio seleccionado.

      nombreServicioFormulario.textContent = servicioPendiente;
      // Esta línea muestra el nombre del servicio arriba del formulario.

      obtenerElemento("contenedorFormularioCotizacion").classList.remove("d-none");
      // Esta línea muestra el formulario de cotización.
    }

    var formCalcularCotizacion = obtenerElemento("formCalcularCotizacion");
    // Esta variable guarda el formulario de datos numéricos.

    formCalcularCotizacion.addEventListener("submit", function (evento) {
      // Este evento se activa cuando el cliente genera el resumen de cotización.

      evento.preventDefault();
      // Esta línea evita que la página se recargue.

      if (!formCalcularCotizacion.checkValidity()) {
        // Esta condición revisa las reglas HTML como required, min, max y step.

        formCalcularCotizacion.reportValidity();
        // Esta línea muestra el aviso del navegador sobre el campo incorrecto.

        return;
        // Esta línea detiene el proceso hasta que los datos sean válidos.
      }

      var tamanoIngresado = textoSeguro(obtenerElemento("tamanoPropiedad").value);
      // Esta variable captura el tamaño escrito por el cliente.

      var largoIngresado = textoSeguro(obtenerElemento("largoZacate").value);
      // Esta variable captura el largo del zacate escrito por el cliente.

      var expresionDecimal = /^[0-9]+(\.[0-9]+)?$/;
      // Esta expresión acepta números enteros y decimales con punto.

      if (!expresionDecimal.test(tamanoIngresado)) {
        // Esta condición se activa si el tamaño no tiene formato numérico válido.

        alert("El tamaño de la propiedad debe ser un número válido. Ejemplo: 250 o 180.5");
        // Esta línea explica el formato correcto.

        return;
        // Esta línea detiene el proceso para corregir el dato.
      }

      if (!expresionDecimal.test(largoIngresado)) {
        // Esta condición se activa si el largo del zacate no tiene formato numérico válido.

        alert("El largo del zacate debe ser un número válido. Ejemplo: 15 o 8.5");
        // Esta línea explica el formato correcto.

        return;
        // Esta línea detiene el proceso para corregir el dato.
      }

      obtenerElemento("servicioCotizacion").textContent = servicioPendiente;
      // Esta línea muestra el servicio elegido en el resumen final.

      obtenerElemento("tamanoCotizacion").textContent = tamanoIngresado + " m2";
      // Esta línea muestra el tamaño con su unidad.

      obtenerElemento("zacateCotizacion").textContent = largoIngresado + " cm";
      // Esta línea muestra el largo del zacate con su unidad.

      obtenerElemento("fechaCotizacion").textContent = new Date().toLocaleDateString("es-CR");
      // Esta línea muestra la fecha actual con formato de Costa Rica.

      obtenerElemento("contenedorFormularioCotizacion").classList.add("d-none");
      // Esta línea oculta el formulario después de generar el resumen.

      obtenerElemento("plantillaCotizacion").classList.remove("d-none");
      // Esta línea muestra el resumen final.

      borrarServicioTemporal();
      // Esta línea borra el dato temporal para evitar reutilizar una selección vieja.
    });
  }
});
