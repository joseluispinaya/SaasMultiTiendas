
let tablaData;
let idEditar = 0;

function ObtenerFecha() {
    const d = new Date();
    const month = (d.getMonth() + 1).toString().padStart(2, '0');
    const day = d.getDate().toString().padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
}

$(document).ready(function () {

    $("#txtFechaIni").datepicker({
        todayHighlight: true,
        language: "es",        // Activa el archivo de idioma que agregaste
        format: "dd/mm/yyyy",   // Define el formato visual de la fecha
        autoclose: true
    });

    $("#txtFechaFin").datepicker({
        todayHighlight: true,
        language: "es",        // Activa el archivo de idioma que agregaste
        format: "dd/mm/yyyy",   // Define el formato visual de la fecha
        autoclose: true
    });

    $("#txtFechaIni").val(ObtenerFecha());
    $("#txtFechaFin").val(ObtenerFecha());

    listaNegocios();
});

function listaNegocios() {
    if ($.fn.DataTable.isDataTable("#tbNegocios")) {
        $("#tbNegocios").DataTable().destroy();
        $('#tbNegocios tbody').empty();
    }

    tablaData = $("#tbNegocios").DataTable({
        responsive: true,
        "ajax": {
            "url": 'PageNegocios.aspx/ListaNegocios',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function (d) {
                return JSON.stringify(d);
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
            { "data": "IdNegocio", "visible": false, "searchable": false },
            {
                "data": "NombreTienda",
                "className": "align-middle",
                "render": function (data, type, row) {
                    return `<div>
                    <span class="font-weight-bold text-dark" style="font-size: 1.05rem;">${data}</span><br>
                    <small class="text-muted"><i class="fas fa-angle-right mr-1"></i>${row.NombrePropietario}</small>
                </div>`;
                }
            },
            {
                "data": "Celular",
                "className": "text-center align-middle",
                "render": function (data) {
                    return `
                        <span class="badge badge-light border border-secondary text-dark p-2 shadow-sm" style="font-size: 0.8rem;">
                            <i class="fas fa-phone text-success mr-1"></i> ${data}
                        </span>`;
                }
            },
            // 1. COLUMNA RUTA (Fusionada: Origen -> Destino)
            {
                "data": null, // Usamos null para tener acceso a toda la fila (row)
                "className": "text-center align-middle",
                "render": function (data, type, row) {
                    return `
                        <div class="d-flex align-items-center text-dark">
                            <i class="fas fa-hourglass-start text-primary mr-1"></i> ${row.FechaInicio}
                            <i class="fas fa-arrow-right text-muted px-2"></i>
                            <i class="fas fa-hourglass-end text-success mr-1"></i> ${row.FechaFin}
                        </div>`;
                }
            },
            {
                "data": "TiempoRestante",
                "className": "text-center align-middle",
                "render": function (data) {
                    return `
                        <span class="badge badge-light border border-secondary text-dark p-2 shadow-sm" style="font-size: 0.8rem;">
                            <i class="far fa-clock text-success mr-1"></i> ${data}
                        </span>`;
                }
            },
            //{
            //    "data": "FechaInicio",
            //    "className": "text-center align-middle",
            //    "render": function (data) {
            //        return `
            //            <span class="badge badge-light border border-secondary text-dark p-2 shadow-sm">
            //                <i class="fas fa-hourglass-start text-success mr-1"></i> ${data}
            //            </span>`;
            //    }
            //},
            //{
            //    "data": "FechaFin",
            //    "className": "text-center align-middle",
            //    "render": function (data) {
            //        return `
            //            <span class="badge badge-light border border-secondary text-dark p-2 shadow-sm">
            //                <i class="fas fa-hourglass-end text-danger mr-1"></i> ${data}
            //            </span>`;
            //    }
            //},
            {
                "data": "Activo", "className": "text-center align-middle", "render": function (data) {
                    if (data === true)
                        return '<span class="badge badge-primary p-2" style="font-size: 0.8rem;">Activo</span>';
                    else
                        return '<span class="badge badge-danger p-2" style="font-size: 0.8rem;">Inactivo</span>';
                }
            },
            {
                "defaultContent": '<button class="btn btn-primary btn-editar btn-sm mr-2"><i class="fas fa-pencil-alt"></i></button>' +
                    '<button class="btn btn-success btn-detalle btn-sm"><i class="fas fa-address-book"></i></button>',
                "orderable": false,
                "searchable": false,
                "className": "text-center align-middle"
            }
        ],
        "order": [[0, "desc"]],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#tbNegocios tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    idEditar = data.IdNegocio;
    $("#txtNombre").val(data.NombreTienda);
    $("#txtNombrePropi").val(data.NombrePropietario);
    $("#txtNroCel").val(data.Celular);

    $("#txtFechaIni").val(data.FechaInicio);
    $("#txtFechaFin").val(data.FechaFin);

    $("#cboEstado").val(data.Activo ? 1 : 0).prop("disabled", false);

    // Cambiamos el título
    $("#myModalLabel").text("Editar Negocio");
    $("#mdData").modal("show");

});

$('#tbNegocios tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    // Obtenemos los datos de la fila
    let data = tablaData.row(fila).data();
    const textoSms = `Tienda: ${data.NombreTienda}.`;

    MostrarAlerta("¡Mensaje!", textoSms, "info");

});

$("#btnAddNuevoReg").on("click", function () {

    idEditar = 0;

    $("#txtNombre").val("");
    $("#txtNombrePropi").val("");
    $("#txtNroCel").val("");

    $("#txtFechaIni").val(ObtenerFecha());
    $("#txtFechaFin").val(ObtenerFecha());

    $("#cboEstado").val(1).prop("disabled", true);

    $("#myModalLabel").text("Nuevo Registro");

    $("#mdData").modal("show");

})

function habilitarBoton() {
    $('#btnGuardarCambios').prop('disabled', false);
}

$("#btnGuardarCambios").on("click", function () {

    // 1. Bloqueo inmediato
    $('#btnGuardarCambios').prop('disabled', true);

    const inputs = $("#mdData input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter(item => item.value.trim() === "");

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        MostrarToastZer(mensaje, "Atención", "warning");

        $(`input[name="${inputs_sin_valor[0].name}"]`).focus();
        habilitarBoton();
        return;
    }


    let fechaInicioStr = $("#txtFechaIni").val().trim();
    let fechaFinStr = $("#txtFechaFin").val().trim();

    if (fechaInicioStr === "" || fechaFinStr === "") {
        MostrarToastZer("Las fechas son obligatorias.", "Atención", "warning");
        habilitarBoton();
        return;
    }

    // Dividimos las cadenas usando la barra '/'
    let partesInicio = fechaInicioStr.split('/');
    let partesFin = fechaFinStr.split('/');

    let fInicio = new Date(partesInicio[2], partesInicio[1] - 1, partesInicio[0]);
    let fFin = new Date(partesFin[2], partesFin[1] - 1, partesFin[0]);

    if (fInicio > fFin) {
        MostrarToastZer("La Fecha de Inicio no puede ser mayor a la Fecha Fin.", "Atención", "warning");
        habilitarBoton();
        return;
    }

    const objeto = {
        IdNegocio: idEditar,
        NombreTienda: $("#txtNombre").val().trim(),
        NombrePropietario: $("#txtNombrePropi").val().trim(),
        Celular: $("#txtNroCel").val().trim(),
        FechaInicio: fechaInicioStr,
        FechaFin: fechaFinStr,
        Activo: ($("#cboEstado").val() === "1" ? true : false)
    }

    $("#mdData").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "PageNegocios.aspx/GuardarOrEditNegocios",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#mdData").find("div.modal-content").LoadingOverlay("hide");
            AlertaTimerTipo(
                response.d.Estado ? '¡Excelente!' : 'Atención',
                response.d.Mensaje,
                response.d.Valor
            );

            if (response.d.Estado) {
                $("#mdData").modal("hide");
                listaNegocios();
                idEditar = 0;
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#mdData").find("div.modal-content").LoadingOverlay("hide");
            MostrarToastZer("¡Atención!", "Error de comunicación con el servidor.", "error");
        },
        complete: function () {
            habilitarBoton();
        }
    });

});

// fin