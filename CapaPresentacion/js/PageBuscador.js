
$(document).ready(function () {

    // Escuchamos los eventos que emite Masterpa.js
    $(document).on("catalogoListo catalogoActualizado", function () {
        // Usamos la variable catalogoGlobal que viene de la Master
        configurarSelect2(catalogoGlobal);
    });

    // Por si la página carga un poco tarde y Masterpa ya había gritado el evento
    if (catalogoGlobal.length > 0) {
        configurarSelect2(catalogoGlobal);
    }
});

// Configuración del Select2 
function configurarSelect2(datosBase) {
    // 1. Mapeamos la data al formato que Select2 entiende (id y text)
    const datosMapeados = datosBase.map(item => ({
        id: item.IdProducto,
        text: item.Codigo + ' ' + item.Nombre, // Lo usamos para la búsqueda interna 
        codigo: item.Codigo,
        nombre: item.Nombre,
        precioCompra: item.PrecioCompra,
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
        templateSelection: formatoSeleccionProduct,
        minimumInputLength: 2
    });

    // Dejamos el combo en blanco inicialmente
    $("#cboBuscarProducto").val(null).trigger("change");
}

// 4. Tu diseño de resultados adaptado a productos
function formatoResultados(data) {
    if (!data.id) return data.text; // Evita error con el placeholder

    var contenedor = $(
        `<div class="d-flex align-items-center p-1">
            <div class="bg-light border rounded text-center mr-3 d-flex align-items-center justify-content-center" style="height:45px; width:45px;">
                <i class="fas fa-tags text-primary" style="font-size: 1.25rem;"></i>
            </div>
            <div>
                <div style="font-weight: bold; color: #333; font-size: 1.05em;">${data.nombre}</div>
                <div style="font-size: 0.85em; color: #666;">Cód: ${data.codigo} | <span class="text-dark fw-bold">Precio: ${parseFloat(data.precio).toFixed(2)} Bs.</span></div>
            </div>
         </div>`
    );

    return contenedor;
}

function formatoSeleccionProduct(data) {
    // Si no tiene id (es el placeholder vacío), devolvemos el texto normal fas fa-shield-alt
    if (!data.id) {
        return data.text;
    }

    // Cómo se verá el cajoncito cerrado (usamos el ícono de escudo de FontAwesome)
    return $(`<span><i class="fas fa-tags text-primary mr-2"></i> <b>${data.codigo} - ${data.nombre}</b></span>`);
}

// 5. Evento al SELECCIONAR
$("#cboBuscarProducto").on("select2:select", function (e) {
    const data = e.params.data;

    // Llenamos la tarjeta visual
    $("#lblNombreProducto").text(data.nombre);

    //let desc = data.descripcion ? ` - ${data.descripcion}` : "";
    $("#lblCodigoProducto").text(`DETALLE: ${data.descripcion}`);
    //$("#lblCodigoProducto").text(`CÓDIGO: ${data.codigo}${desc}`);

    $("#lblPrecioCompra").text(`Precio Compra: ${parseFloat(data.precioCompra).toFixed(2)} Bs.`);

    $("#lblPrecioVenta").text(`${parseFloat(data.precio).toFixed(2)} Bs.`);

    // Mostramos la tarjeta
    $("#detalleProducto").removeClass("d-none");
});

// Evento al limpiar el combo (la X de Select2)
$("#cboBuscarProducto").on("select2:unselect", function (e) {
    $("#detalleProducto").addClass("d-none");
});

// fin