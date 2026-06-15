
let catalogoLocal = [];

$(document).ready(function () {
    cargarBuscadorOffline();
});

// Función principal que orquesta el modo offline/online
function cargarBuscadorOffline() {
    console.log("Iniciando carga del buscador...");
    // 1. Intentar cargar desde la base local (LocalForage)
    localforage.getItem('catalogoTienda').then(function (datosGuardados) {
        if (datosGuardados && datosGuardados.length > 0) {

            // AQUI SABES QUE ESTÁ USANDO LO LOCAL
            console.log("Catálogo cargado desde la memoria interna. Productos encontrados:", datosGuardados.length);

            catalogoLocal = datosGuardados;
            configurarSelect2(catalogoLocal);
        } else {
            console.log("La memoria interna está vacía. Es la primera vez que se abre el sistema.");
        }

        // 2. Independientemente de si había datos o no, intentamos actualizar en segundo plano
        sincronizarConServidor();
    }).catch(function (err) {
        console.log("Error leyendo la memoria IndexedDB:", err);
        sincronizarConServidor();
    });
}

function sincronizarConServidor() {
    // Si la computadora no tiene red, salimos silenciosamente
    // AQUI VALIDAMOS SI EL NAVEGADOR ESTÁ SIN INTERNET
    if (!navigator.onLine) {
        console.log("OFFLINE No hay conexión a Internet. El sistema funciona con los datos locales.");
        return; // Detenemos la función para que no intente hacer el AJAX
    }

    console.log("ONLINE Conexión a Internet detectada. Solicitando datos frescos al servidor...");

    $.ajax({
        type: "POST",
        url: "PageBuscador.aspx/ListaProductosOffline", // El WebMethod que debes crear en C#
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (response) {
            if (response.d.Estado) {
                catalogoLocal = response.d.Data;

                // Actualizamos la base de datos local
                localforage.setItem('catalogoTienda', catalogoLocal);

                // Recargamos el Select2 con los precios más recientes
                configurarSelect2(catalogoLocal);
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Sincronización en pausa. Usando datos locales.");
        }
    });
}

// Configuración del Select2 
function configurarSelect2(datosBase) {
    // 1. Mapeamos la data al formato que Select2 entiende (id y text)
    const datosMapeados = datosBase.map(item => ({
        id: item.IdProducto,
        text: item.Codigo + ' ' + item.Nombre, // Lo usamos para la búsqueda interna
        codigo: item.Codigo,
        nombre: item.Nombre,
        precio: item.PrecioVenta,
        descripcion: item.Descripcion
    }));

    // 2. Limpiamos instancias viejas si es una recarga
    if ($('#cboBuscarProducto').hasClass("select2-hidden-accessible")) {
        $('#cboBuscarProducto').select2('destroy');
        $('#cboBuscarProducto').empty();
    }

    // --- ¡AGREGAR ESTA LÍNEA! ---
    // Añadimos la opción vacía indispensable para que el placeholder y el allowClear funcionen bien
    $('#cboBuscarProducto').append('<option value=""></option>');

    // 3. Inicializamos Select2
    $("#cboBuscarProducto").select2({
        data: datosMapeados,
        language: "es",
        placeholder: 'Escriba un producto o código...',
        allowClear: true,
        templateResult: formatoResultados,
        // Al ser datos en memoria, responde rapidísimo. No hace falta minimumInputLength
    });

    // Dejamos el combo en blanco inicialmente
    $("#cboBuscarProducto").val(null).trigger("change");
}

// 4. Tu diseño de resultados adaptado a productos
function formatoResultados(data) {
    if (!data.id) return data.text; // Evita error con el placeholder

    var contenedor = $(
        `<div class="d-flex align-items-center p-1">
            <div class="bg-light border rounded text-center me-3 d-flex align-items-center justify-content-center" style="height:45px; width:45px;">
                <i class="fas fa-box text-primary fs-5"></i>
            </div>
            <div>
                <div style="font-weight: bold; color: #333; font-size: 1.05em;">${data.nombre}</div>
                <div style="font-size: 0.85em; color: #666;">Cód: ${data.codigo} | <span class="text-success fw-bold">Precio: ${parseFloat(data.precio).toFixed(2)} Bs.</span></div>
            </div>
         </div>`
    );

    return contenedor;
}

// 5. Evento al SELECCIONAR
$("#cboBuscarProducto").on("select2:select", function (e) {
    const data = e.params.data;

    // Llenamos la tarjeta visual
    $("#lblNombreProducto").text(data.nombre);

    let desc = data.descripcion ? ` - ${data.descripcion}` : "";
    $("#lblCodigoProducto").text(`CÓDIGO: ${data.codigo}${desc}`);

    $("#lblPrecioVenta").text(`${parseFloat(data.precio).toFixed(2)} Bs.`);

    // Mostramos la tarjeta
    $("#detalleProducto").removeClass("d-none");
});

// Evento al limpiar el combo (la X de Select2)
$("#cboBuscarProducto").on("select2:unselect", function (e) {
    $("#detalleProducto").addClass("d-none");
});

// fin