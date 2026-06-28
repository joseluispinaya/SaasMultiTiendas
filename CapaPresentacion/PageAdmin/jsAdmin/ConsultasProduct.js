
let tablaData;
let idEditar = 0;


$(document).ready(function () {

    cargarNegocios();
});

function cargarNegocios() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboNegocio").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "PageNegocios.aspx/ListaNegocios",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">-- Seleccione un Negocio --</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdNegocio}">${row.NombreTienda}</option>`;
                });

                $("#cboNegocio").html(opcionesHTML);

            } else {
                $("#cboNegocio").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboNegocio").html('<option value="">Error de conexión</option>');
        }
    });
}

$("#cboNegocio").on("change", function () {

    // Verificamos si la tabla ya fue inicializada alguna vez
    if ($.fn.DataTable.isDataTable("#tbProductos")) {
        // Si ya existe, simplemente le decimos que se recargue. 
        // ¡Automáticamente leerá el nuevo valor del select!
        tablaData.ajax.reload();
    } else {
        // Si es la primera vez que seleccionan algo, dibujamos la tabla
        listaProductNegocio();
    }

});

function listaProductNegocio() {

    tablaData = $("#tbProductos").DataTable({
        responsive: true,
        //searching: false,
        //info: false,
        "ajax": {
            "url": 'ConsultasProduct.aspx/ListaProductosNegocio',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                // ¡LA MAGIA ESTÁ AQUÍ!
                // En vez de usar una variable estática, leemos el select en tiempo real
                let idNegocioSeleccionada = $("#cboNegocio").val();

                // Si por algún motivo es nulo o vacío, mandamos 0
                let request = {
                    IdNegocio: parseInt(idNegocioSeleccionada) || 0
                };
                return JSON.stringify(request);
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    return json.d.Data;
                } else {
                    return [];
                }
            }
        },
        "columns": [
            // 1. Columna Codigo (Estilo etiqueta)
            {
                "data": "Codigo",
                "className": "text-center align-middle",
                "render": function (data, type, row) {
                    return `<span class="badge badge-success p-2" style="font-size: 0.85rem;">${data}</span>`;
                }
            },
            // 2. Columna Producto (Nombre Arriba + Descripción Abajo)
            {
                "data": "Nombre",
                "className": "align-middle",
                "render": function (data, type, row) {
                    return `<div>
                        <span class="font-weight-bold text-dark" style="font-size: 1.05rem;">${data}</span><br>
                        <small class="text-muted"><i class="fas fa-angle-right mr-1"></i>${row.Descripcion || 'Sin descripcion'}</small>
                    </div>`;
                }
            },
            // 3. Columna Precio Compra
            {
                "data": "PrecioCompra",
                "className": "text-center align-middle",
                "render": function (data) {
                    return `
                <span class="badge badge-light border border-secondary text-dark p-2 shadow-sm" style="font-size: 0.85rem;">
                    <i class="fas fa-money-bill text-success mr-1"></i> ${parseFloat(data).toFixed(2)} Bs.
                </span>`;
                }
            },
            // 4. Columna Precio Venta (Resaltado en verde/success)
            {
                "data": "PrecioVenta",
                "className": "text-center align-middle",
                "render": function (data) {
                    return `
                <span class="badge badge-light border border-secondary text-dark p-2 shadow-sm" style="font-size: 0.85rem;">
                    <i class="fas fa-money-bill text-success mr-1"></i> ${parseFloat(data).toFixed(2)} Bs.
                </span>`;
                }
            }
        ],
        "order": [],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}


$("#btnReportes").on("click", function () {

})

// fin