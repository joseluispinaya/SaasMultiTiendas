
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
            {
                "data": "FechaInicio",
                "className": "text-center align-middle",
                "render": function (data) {
                    return `
                        <span class="badge badge-light border border-secondary text-dark p-2 shadow-sm">
                            <i class="fas fa-hourglass-start text-success mr-1"></i> ${data}
                        </span>`;
                }
            },

            // 4. Columna Fecha Fin (Estilo etiqueta con ícono rojo)
            {
                "data": "FechaFin",
                "className": "text-center align-middle",
                "render": function (data) {
                    return `
                        <span class="badge badge-light border border-secondary text-dark p-2 shadow-sm">
                            <i class="fas fa-hourglass-end text-danger mr-1"></i> ${data}
                        </span>`;
                }
            },
            {
                "data": "Activo", "className": "text-center align-middle", render: function (data) {
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

// fin