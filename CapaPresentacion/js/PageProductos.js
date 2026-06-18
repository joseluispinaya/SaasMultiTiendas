

let tablaData;
let idEditar = 0;

$(document).ready(function () {
    listaProductos();
});

function listaProductos() {
    //if ($.fn.DataTable.isDataTable("#tbProductos")) {
    //    $("#tbProductos").DataTable().destroy();
    //    $('#tbProductos tbody').empty();
    //}

    tablaData = $("#tbProductos").DataTable({
        // Muestra el mensaje "Procesando..." nativo de DataTables
        "processing": true,
        "serverSide": true,  // ACTIVA EL MODO PAGINACIÓN EN EL SERVIDOR
        "responsive": true,
        "ajax": {
            "url": 'PageProductos.aspx/ListaProductosPaginado',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {

                // GUARDAMOS EL DRAW EN UNA VARIABLE GLOBAL TEMPORAL (o en el mismo 'd')
                // para poder leerlo después en el dataFilter
                window.currentDraw = d.draw;

                // 'd' es el objeto gigante que DataTables intenta enviar por defecto.
                // Aquí lo transformamos para que encaje EXACTAMENTE con los parámetros de tu WebMethod en C#
                var parametros = {
                    Omitir: d.start,               // Cuántos registros saltar (Página actual)
                    TamanoPagina: d.length,        // Cuántos registros mostrar (Ej: 10, 25, 50)
                    Buscar: d.search.value || ""   // Lo que el usuario escribió en la caja de búsqueda
                };
                return JSON.stringify(parametros);
            },
            "dataFilter": function (data) {
                // Aquí interceptamos la respuesta cruda de tu WebMethod antes de que DataTables la lea
                var json = JSON.parse(data);

                // Extraemos los totales de la primera fila (si hay datos)
                var totalRecords = 0;
                var totalFiltered = 0;

                if (json.d.Estado && json.d.Data.length > 0) {
                    totalRecords = json.d.Data[0].TotalRegistros;
                    totalFiltered = json.d.Data[0].TotalFiltrados;
                }

                // Transformamos tu objeto "Respuesta" al formato que DataTables exige
                var respuestaDataTables = {
                    // No es estrictamente necesario en WebForms, pero es buena práctica
                    //draw: 0,
                    draw: window.currentDraw, // <-- ¡AHORA SÍ LE DEVOLVEMOS SU DRAW ORIGINAL!
                    recordsTotal: totalRecords,       // Total real en BD
                    recordsFiltered: totalFiltered,   // Total después de aplicar el buscador
                    data: json.d.Estado ? json.d.Data : [] // La lista de productos real
                };

                return JSON.stringify(respuestaDataTables);
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
            },
            // 5. Columna Acción
            {
                "data": null,
                "orderable": false,
                "searchable": false,
                "className": "text-center",
                "render": function (data, type, row) {
                    return `<div class="d-flex justify-content-center">
                                <button class="btn btn-outline-primary btn-editar mr-2 shadow-sm" title="Editar">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button class="btn btn-outline-info btn-detalle shadow-sm" title="Ver Detalles">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>`;
                }
            }
        ],
        // IMPORTANTE: En modo Server-Side con tu SP actual, no estamos manejando ordenamiento dinámico por columnas,
        // así que desactivamos el ordenamiento inicial para que no choque con el ORDER BY DESC de tu SP.
        "order": [],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}


$('#tbProductos tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');
    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdProducto;

    $("#txtNombre").val(data.Nombre);
    $("#txtDescripcion").val(data.Descripcion);

    // SOLUCIÓN AL CARGAR: Forzamos a que sea un número con punto decimal
    $("#txtPrecioCompra").val(Number(data.PrecioCompra).toFixed(2));
    $("#txtPrecioVenta").val(Number(data.PrecioVenta).toFixed(2));

    //$("#txtPrecioCompra").val(data.PrecioCompra);
    //$("#txtPrecioVenta").val(data.PrecioVenta);

    let textoSms = `Editar el Producto: ${data.Codigo}.`;

    $("#tituloLabel").text(textoSms);
    $("#modalProductos").modal("show");
});

$('#tbProductos tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    let estadoTexto = data.Activo ? "✅ ACTIVO" : "❌ INACTIVO";

    let textoDetalle =
        "Producto: " + data.Nombre + "\n\n" +
        "Precio Compra: " + data.PrecioCompra + "\n" +
        "Precio Venta: " + data.PrecioVenta + "\n\n" +
        "Estado Actual: " + estadoTexto + "\n" +
        "-----------------------------------\n" +
        "Descripcion: " + data.Descripcion;

    swal({
        title: "Detalle del Producto",
        text: textoDetalle,
        imageUrl: "assets/images/mitienda.png",
        confirmButtonText: "Entendido",
        confirmButtonColor: "#004F9F"
    });

});

$("#btnAddNuevoReg").on("click", function () {

    idEditar = 0;

    $("#txtNombre").val("");
    $("#txtPrecioCompra").val("");
    $("#txtPrecioVenta").val("");
    $("#txtDescripcion").val("");

    $("#tituloLabel").text("Nuevo Registro");

    $("#modalProductos").modal("show");
})

function habilitarBoton() {
    $('#btnGuardarCambios').prop('disabled', false);
}

// Guardar o editar al hacer clic
$('#btnGuardarCambios').on('click', function () {
    $('#btnGuardarCambios').prop('disabled', true);

    const inputs = $("#modalProductos input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter(item => item.value.trim() === "");

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        MostrarToastZer(mensaje, "Atención", "warning");

        $(`input[name="${inputs_sin_valor[0].name}"]`).focus();
        habilitarBoton();
        return;
    }

    // SOLUCIÓN AL LEER: Reemplazamos cualquier coma por un punto antes de validar
    let strPrecioVenta = $("#txtPrecioVenta").val().trim().replace(',', '.');
    let strPrecioCompra = $("#txtPrecioCompra").val().trim().replace(',', '.');

    let precioVenta = parseFloat(strPrecioVenta);
    let precioCompra = parseFloat(strPrecioCompra);

    if (isNaN(precioVenta) || precioVenta <= 0) {
        MostrarToastZer("El Precio de venta debe ser un número válido mayor a 0.", "Atención", "warning");
        $("#txtPrecioVenta").focus();
        habilitarBoton();
        return;
    }

    if (isNaN(precioCompra) || precioCompra <= 0) {
        MostrarToastZer("El Precio de compra debe ser un número válido mayor a 0.", "Atención", "warning");
        $("#txtPrecioCompra").focus();
        habilitarBoton();
        return;
    }

    const objeto = {
        IdProducto: idEditar,
        Nombre: $("#txtNombre").val().trim(),
        Descripcion: $("#txtDescripcion").val().trim(),
        PrecioCompra: precioCompra, // Ya es un número limpio con punto
        PrecioVenta: precioVenta // Ya es un número limpio con punto
    }

    if (idEditar === 0) {
        registrarProducto(objeto);
    } else {
        editarProducto(objeto);
    }

});

function registrarProducto(objeto) {

    $("#modalProductos").find("div.modal-content").LoadingOverlay("show");
    $.ajax({
        type: "POST",
        url: "PageProductos.aspx/Guardar",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalProductos").find("div.modal-content").LoadingOverlay("hide");

            let mensajeServidor = response.d.Estado ? `✅ Codigo del Producto: ${response.d.Data}.` : `❌ Ocurrio un Error: ${response.d.Mensaje}.`;

            MostrarAlertaZeo(
                response.d.Estado ? '¡Excelente!' : 'Atención', // Título dinámico
                mensajeServidor,
                response.d.Valor // Icono (success/error/warning)
            );

            if (response.d.Estado) {
                $("#modalProductos").modal("hide");
                if (tablaData) {
                    tablaData.ajax.reload(null, false);
                }
                idEditar = 0;
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#modalProductos").find("div.modal-content").LoadingOverlay("hide");
            MostrarToastZer("No se pudo conectar con el servidor.", "Atención", "error");
        },
        complete: function () {
            habilitarBoton();
        }
    });
}

function editarProducto(objeto) {

    $("#modalProductos").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "PageProductos.aspx/Editar",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalProductos").find("div.modal-content").LoadingOverlay("hide");

            AlertaTimerTipo(
                response.d.Estado ? '¡Excelente!' : 'Atención', // Título dinámico
                response.d.Mensaje, // Texto del servidor
                response.d.Valor // Icono (success/error/warning)
            );

            if (response.d.Estado) {
                $("#modalProductos").modal("hide");
                if (tablaData) {
                    tablaData.ajax.reload(null, false);
                }
                idEditar = 0;
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#modalProductos").find("div.modal-content").LoadingOverlay("hide");
            MostrarToastZer("No se pudo conectar con el servidor.", "Atención", "error");
        },
        complete: function () {
            habilitarBoton();
        }
    });
}

// fin