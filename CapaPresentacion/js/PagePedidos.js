
const { jsPDF } = window.jspdf;
let tablaData;

$(document).ready(function () {
    cargarBuscadorProductos();
});

// Configuración del Select2 para productos
function cargarBuscadorProductos() {
    $("#cboBuscarProducto").select2({

        ajax: {
            type: "POST",
            url: "PagePedidos.aspx/BuscarProductosSelect2",
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            delay: 250,
            data: function (params) {
                // params.term es lo que el usuario va escribiendo
                return JSON.stringify({ busqueda: params.term || "" });
            },
            processResults: function (data) {
                // 1. VALIDACIÓN: ¿Respondió bien el WebMethod? (Estado == true)
                if (!data.d.Estado) {
                    // Mostramos el mensaje que mandó C# (Ej: "Su sesión ha expirado" o error del Catch)
                    MostrarAlertaZeo("Atención", data.d.Mensaje, "warning");

                    // Retornamos un array vacío para que Select2 no colapse
                    return { results: [] };
                }

                // 2. Si todo está bien, mapeamos los datos
                return {
                    results: data.d.Data.map((item) => ({
                        id: item.IdProducto,
                        text: item.Codigo + ' ' + item.Nombre,
                        codigo: item.Codigo,
                        nombre: item.Nombre,
                        precio: item.PrecioCompra,
                        descripcion: item.Descripcion,
                        dataCompleta: item // Guardamos todo el objeto por si lo ocupas al seleccionar
                    }))
                };
            },
            // 3. VALIDACIÓN DE RED: Por si se corta el internet o falla el servidor
            error: function (xhr, ajaxOptions, thrownError) {
                // IGNORAR SI EL ERROR ES PORQUE SELECT2 CANCELÓ LA PETICIÓN VIEJA
                if (xhr.status === 0 || thrownError === 'abort') {
                    return; // Salimos silenciosamente sin mostrar alerta
                }

                // Si es un error real (500, 404, etc.), sí mostramos la alerta
                console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
                MostrarAlertaZeo("Error de Conexión", "No se pudo comunicar con el servidor.", "error");
            }
        },
        language: "es",
        placeholder: 'Buscar por Codigo o Nombre...',
        minimumInputLength: 3, // Muy buena práctica para no saturar la BD
        templateResult: formatoResultados
    });
}

// 4. Tu diseño de resultados adaptado a productos
function formatoResultados(data) {
    if (data.loading) return data.text;

    var contenedor = $(
        `<div class="d-flex align-items-center p-1">
            <div class="bg-light border rounded text-center mr-3 d-flex align-items-center justify-content-center" style="height:45px; width:45px;">
                <i class="fas fa-shopping-basket text-primary" style="font-size: 1.25rem;"></i>
            </div>
            <div>
                <div style="font-weight: bold; color: #333; font-size: 1.05em;">${data.nombre}</div>
                <div style="font-size: 0.85em; color: #666;">Cód: ${data.codigo} | <span class="text-dark fw-bold">Precio: ${parseFloat(data.precio).toFixed(2)} Bs.</span></div>
            </div>
         </div>`
    );

    return contenedor;
}

//$("#cboBuscarProducto").on("select2:select", function (e) {
//    const data = e.params.data;

//    $("#lblNombreProducto").text(`CÓDIGO: ${data.codigo} - ${data.nombre}`);

//    $("#lblDescripcion").text(data.descripcion);
//    $("#lblPrecioCompra").text(`${parseFloat(data.precio).toFixed(2)} Bs.`);

//    $("#cboBuscarProducto").val(null).trigger("change");
//});

let productoSelect = null;

$("#cboBuscarProducto").on("select2:select", function (e) {
    const data = e.params.data.dataCompleta;

    productoSelect = data;

    //console.log(productoSelect);

    //$("#txtIdProducto").val(data.IdProducto);
    //$("#txtPrecioCompra").val(data.PrecioCompra);

    // Llenamos la tarjeta visual
    $("#lblNombreProducto").text(`CÓDIGO: ${data.Codigo} - ${data.Nombre}`);

    $("#lblDescripcion").text(data.Descripcion);
    $("#lblPrecioCompra").text(`${parseFloat(data.PrecioCompra).toFixed(2)} Bs.`);

    $("#cboBuscarProducto").val(null).trigger("change");
});

let productosParaComprar = [];
let productosParaComprarPrue = [];

$('#btnAgregar').on('click', function () {

    if (!productoSelect) {
        MostrarAlertaZeo("Mensaje", "Debe seleccionar un Producto antes de agregar.", "error");
        return;
    }

    //let producto_encontrado = productosParaComprar.filter(p => p.IdProducto === productoSelect.IdProducto)

    //if (producto_encontrado.length > 0) {
    //    AlertaTimerTipo('Advertencia', "El Producto seleccionado ya fue agregado", "warning");
    //    return;
    //}

    let existe = productosParaComprarPrue.find(p => p.IdProducto === productoSelect.IdProducto);

    if (existe) {
        AlertaTimerTipo('Advertencia', "El Producto seleccionado ya fue agregado Tb2", "warning");
        return;
    }

    let pedidoPro = {
        IdProducto: productoSelect.IdProducto,
        Codigo: productoSelect.Codigo,
        Nombre: productoSelect.Nombre,
        Descripcion: productoSelect.Descripcion,
        PrecioCompra: productoSelect.PrecioCompra,
        PrecioVenta: productoSelect.PrecioVenta
        //ImporteTotal: (parseFloat(cantidadStr) * precioStr)
    };

    //productosParaComprar.push(pedidoPro);
    productosParaComprarPrue.push(pedidoPro);

    productoSelect = null;

    $("#lblNombreProducto").text("Esperando...");
    $("#lblDescripcion").text("Esperando...");
    $("#lblPrecioCompra").text("0.00 Bs.");

    //AlertaTimerTipo('¡Operación Exitosa!', "Se agrego el producto seleccionado", "success");

    // limpio la tarjeta detalle
    //mostrarListaEnTable();
    mostrarListaEnTablePrueba();

})

function mostrarListaEnTable() {

    $("#tbPedidos tbody").html("");

    productosParaComprar.forEach((item, index) => {

        $("#tbPedidos tbody").append(
            $("<tr>").append(
                $("<td>").append(
                    $("<button>").addClass("btn btn-danger")
                        .attr("onclick", `eliminarProducto(${index})`) // Llamada directa
                        .append($("<i>").addClass("fas fa-trash-alt"))
                ),
                $("<td>").text(item.Codigo),
                $("<td>").text(item.Nombre),
                $("<td>").text(item.Descripcion),
                $("<td>").text(item.PrecioCompra)
            )
        )
    })
}

// 6. Función para eliminar de la lista <i class="fas fa-trash-alt"></i>
window.eliminarProducto = function (index) {
    productosParaComprar.splice(index, 1); // Quitar del array
    mostrarListaEnTable(); // Repintar tabla
}

function mostrarListaEnTablePrueba() {

    $("#tbPedidosPrue tbody").html("");

    $.each(productosParaComprarPrue, function (index, est) {

        // Construimos la fila completa respetando tu estructura HTML exacta
        let filaHTML = `
            <tr data-idproducto="${est.IdProducto}">
                <td class="align-middle"><span class="badge badge-primary p-2" style="font-size: 0.85rem;">${est.Codigo}</span></td>
                <td class="align-middle">
                    <div>
                        <span class="font-weight-bold text-dark" style="font-size: 1.05rem;">${est.Nombre}</span><br>
                        <small class="text-muted"><i class="fas fa-angle-right mr-1"></i>${est.Descripcion}</small>
                    </div>
                </td>
                <td class="align-middle">
                    <span class="badge badge-light border border-secondary text-dark p-2 shadow-sm" style="font-size: 0.85rem;">
                        <i class="fas fa-money-bill text-success mr-1"></i> ${parseFloat(est.PrecioCompra).toFixed(2)} Bs.
                    </span>
                </td>
                <td class="align-middle">
                    <span class="badge badge-light border border-secondary text-dark p-2 shadow-sm" style="font-size: 0.85rem;">
                        <i class="fas fa-money-bill text-success mr-1"></i> ${parseFloat(est.PrecioVenta).toFixed(2)} Bs.
                    </span>
                </td>
                <td class="align-middle">
                    <button type="button" class="btn btn-sm btn-danger btn-quitar-product shadow-sm" title="Quitar producto">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>`;

        // Agregamos la fila al cuerpo de la tabla
        $("#tbPedidosPrue tbody").append(filaHTML);
    });
}

$("#tbPedidosPrue tbody").on("click", ".btn-quitar-product", function () {

    let idProducto = $(this).closest("tr").data("idproducto");

    productosParaComprarPrue = productosParaComprarPrue.filter(
        p => p.IdProducto !== idProducto
    );

    mostrarListaEnTablePrueba();

});

$("#btnReporte").on("click", function () {
    if (productosParaComprarPrue.length > 0) {
        generarReportePDF();
    } else {
        MostrarAlertaZeo("Atención", "No hay productos en la lista para generar el PDF.", "warning");
    }
});

function generarReportePDF() {
    // 1. Configuración Inicial (Vertical / Portrait es mejor para listas de compras)
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
    const pageWidth = doc.internal.pageSize.width;  // Aprox 210mm
    const pageHeight = doc.internal.pageSize.height; // Aprox 297mm
    const fechaActual = new Date().toLocaleDateString("es-BO");

    // Obtenemos el nombre del negocio de tu variable global (si la tienes, sino usa un texto por defecto)
    const nombreTienda = usuarioGlobal ? usuarioGlobal.NombreTienda : "Mi Tienda";

    // Cálculos de resumen
    const totalRegistros = productosParaComprarPrue.length;

    // ==========================================
    // 2. ENCABEZADO
    // ==========================================

    // Logo (Izquierda) - Asegúrate de que la ruta sea correcta
    var img = new Image();
    img.src = "/images/mitiendita.png";
    try {
        doc.addImage(img, 'PNG', 15, 10, 35, 20);
    } catch (e) {
        console.warn("Logo no disponible");
    }

    // Título Principal (Derecha)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.setTextColor(13, 110, 253); // Azul Bootstrap (Primary)
    doc.text("LISTA DE COMPRAS", pageWidth - 15, 18, { align: "right" });

    // Subtítulos
    doc.setTextColor(50, 50, 50); // Gris oscuro
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    doc.text(`Negocio: ${nombreTienda.toUpperCase()}`, pageWidth - 15, 24, { align: "right" });
    doc.text(`Fecha de emisión: ${fechaActual}`, pageWidth - 15, 29, { align: "right" });

    // Línea divisoria decorativa
    doc.setDrawColor(13, 110, 253);
    doc.setLineWidth(0.5);
    doc.line(15, 34, pageWidth - 15, 34);

    doc.setTextColor(0);

    // ==========================================
    // 3. TABLA DE PRODUCTOS
    // ==========================================

    const headers = [["NRO", "PRODUCTO", "DESCRIPCIÓN", "P. COMPRA", "P. VENTA"]];

    // Mapeamos los datos de tu array global de compras
    const data = productosParaComprarPrue.map((item, index) => [
        (index + 1).toString().padStart(2, '0'),
        item.Nombre,
        item.Descripcion ? item.Descripcion : "Sin descripción", // Por si viene vacío
        parseFloat(item.PrecioCompra).toFixed(2) + " Bs.",
        parseFloat(item.PrecioVenta).toFixed(2) + " Bs."
    ]);

    doc.autoTable({
        startY: 40,
        head: headers,
        body: data,
        theme: 'grid',
        styles: { fontSize: 9, cellPadding: 3, valign: 'middle' },
        headStyles: {
            fillColor: [13, 110, 253], // Azul para combinar con tu sistema
            textColor: 255,
            halign: 'center',
            fontStyle: 'bold'
        },
        columnStyles: {
            0: { cellWidth: 13, halign: 'center' }, // Nro
            1: { cellWidth: 45, halign: 'left', fontStyle: 'bold' }, // Producto
            2: { cellWidth: 'auto', halign: 'left' }, // Descripción (Toma el espacio sobrante)
            3: { cellWidth: 25, halign: 'right', textColor: [0, 100, 0] }, // P. Compra (Alineado a la derecha)
            4: { cellWidth: 25, halign: 'right' }  // P. Venta (Alineado a la derecha)
        },
        margin: { left: 15, right: 15 },
        didDrawPage: function (data) {
            // Pie de página
            const str = "Página " + doc.internal.getNumberOfPages();
            doc.setFontSize(8);
            doc.setTextColor(150);
            // Número de página a la derecha
            doc.text(str, pageWidth - 25, pageHeight - 10);
            // Info a la izquierda
            doc.text(`Generado desde Sistema de Inventario - Total Productos: ${totalRegistros}`, 15, pageHeight - 10);
        }
    });

    // ==========================================
    // 4. GUARDAR PDF
    // ==========================================

    // Quitamos los espacios y caracteres raros de la fecha para el nombre del archivo
    const fechaArchivo = fechaActual.replace(/\//g, "-");
    const nombreArchivo = `Lista_Compras_${fechaArchivo}.pdf`;

    doc.save(nombreArchivo);
    productosParaComprarPrue = [];
    mostrarListaEnTablePrueba();
}

// fin