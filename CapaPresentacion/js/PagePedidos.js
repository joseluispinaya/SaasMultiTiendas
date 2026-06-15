

let tablaData;
let idEditar = 0;

$(document).ready(function () {
    listaProductosPrueba();
});

function listaProductosPrueba() {
    // 1. Creamos un arreglo con datos falsos simulando lo que devolvería tu WebMethod
    const datosPrueba = [
        { IdProducto: 1, Codigo: "PRO-1-1", Nombre: "Coca Cola 2L", Descripcion: "Envase Retornable", PrecioCompra: 10.00, PrecioVenta: 12.00, Activo: true },
        { IdProducto: 2, Codigo: "PRO-1-2", Nombre: "Arroz Grano de Oro", Descripcion: "Bolsa de 1 Kilo", PrecioCompra: 6.50, PrecioVenta: 8.00, Activo: true },
        { IdProducto: 3, Codigo: "PRO-1-3", Nombre: "Aceite Fino 1L", Descripcion: "Botella de plástico", PrecioCompra: 13.00, PrecioVenta: 15.00, Activo: true },
        { IdProducto: 4, Codigo: "PRO-1-4", Nombre: "Fideo Lazzaroni", Descripcion: "Fideo tallarín 400g", PrecioCompra: 4.50, PrecioVenta: 6.00, Activo: true },
        { IdProducto: 5, Codigo: "PRO-1-5", Nombre: "Azúcar Guabirá", Descripcion: "Bolsa de 1 Kilo", PrecioCompra: 5.50, PrecioVenta: 7.00, Activo: true }
    ];

    // 2. Inicializamos DataTables usando los datos locales
    tablaData = $("#tbProductos").DataTable({
        "data": datosPrueba, // Le pasamos nuestro arreglo manual
        "responsive": true,
        "serverSide": false, // APAGADO porque no estamos usando el WebMethod paginado aún
        "columns": [
            // 1. Columna Codigo (Estilo etiqueta)
            {
                "data": "Codigo",
                "render": function (data, type, row) {
                    return `<span class="badge bg-secondary fs-6 p-2">${data}</span>`;
                }
            },
            // 2. Columna Producto (Nombre Arriba + Descripción Abajo)
            {
                "data": "Nombre",
                "render": function (data, type, row) {
                    // Si tiene descripción, la ponemos debajo en gris y más pequeña
                    let descripcion = row.Descripcion
                        ? `<br><small class="text-muted"><i class="fas fa-angle-right me-1"></i>${row.Descripcion}</small>`
                        : '';

                    return `<span class="fw-bold fs-6 text-dark">${data}</span>${descripcion}`;
                }
            },
            // 3. Columna Precio Compra
            {
                "data": "PrecioCompra",
                "className": "text-end",
                "render": function (data) {
                    return `<span class="text-secondary fs-5">${parseFloat(data).toFixed(2)} Bs.</span>`;
                }
            },
            // 4. Columna Precio Venta (Resaltado en verde/success)
            {
                "data": "PrecioVenta",
                "className": "text-end",
                "render": function (data) {
                    return `<span class="fw-bold text-success fs-5">${parseFloat(data).toFixed(2)} Bs.</span>`;
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
                                <button class="btn btn-outline-primary btn-editar me-2 shadow-sm" title="Editar">
                                    <i class="fas fa-pencil-alt"></i>
                                </button>
                                <button class="btn btn-outline-info btn-detalle shadow-sm" title="Ver Detalles">
                                    <i class="fas fa-eye"></i>
                                </button>
                            </div>`;
                }
            }
        ],
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
    $("#txtPrecioCompra").val(data.PrecioCompra);
    $("#txtPrecioVenta").val(data.PrecioVenta);
    $("#txtDescripcion").val(data.Descripcion);

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
    $("#txtPrecioCompra").val("0");
    $("#txtPrecioVenta").val("0");
    $("#txtDescripcion").val("");

    $("#tituloLabel").text("Nuevo Registro");

    $("#modalProductos").modal("show");
})



// fin