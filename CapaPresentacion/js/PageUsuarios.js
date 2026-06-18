
let tablaData;
let idEditar = 0;

$(document).ready(function () {
    listaUsuarios();
});

function listaUsuarios() {
    if ($.fn.DataTable.isDataTable("#tbUsuarios")) {
        $("#tbUsuarios").DataTable().destroy();
        $('#tbUsuarios tbody').empty();
    }

    tablaData = $("#tbUsuarios").DataTable({
        "responsive": true,
        "ajax": {
            "url": 'PageUsuarios.aspx/ListaUsuariosNegocio',
            "type": "POST",
            "contentType": "application/json; charset=utf-8",
            "dataType": "json",
            "data": function () {
                return "{}"; // Como tu WebMethod usa Sesión, no necesita parámetros de entrada
            },
            "dataSrc": function (json) {
                if (json.d.Estado) {
                    return json.d.Data;
                } else {
                    MostrarToastZer(json.d.Mensaje, "Atención", "error");
                    return [];
                }
            }
        },
        "columns": [
            { "data": "NombreCompleto", "className": "align-middle" },
            {
                "data": "UsuarioSis",
                "className": "align-middle",
                "render": function (data) {
                    return `
                        <div class="font-weight-bold text-dark" style="font-size: 0.95rem;">
                            <i class="fas fa-user-lock text-primary mr-2"></i>${data}
                        </div>`;
                }
            },
            {
                "data": "NroCi",
                "className": "text-center align-middle",
                "render": function (data, type, row) {
                    return `<span class="badge badge-success px-2 py-1" style="font-size: 0.85rem;">${data}</span>`;
                }
            },
            {
                "data": "Permisos", "className": "text-center align-middle", "render": function (data) {
                    if (data === true)
                        return '<span class="badge badge-success px-2 py-1 shadow-sm" style="font-size: 0.85rem;">Activo</span>';
                    else
                        return '<span class="badge badge-secondary px-2 py-1 shadow-sm" style="font-size: 0.85rem;">No Activo</span>';
                }
            },
            {
                "data": "Activo", "className": "text-center align-middle", "render": function (data) {
                    if (data === true)
                        return '<span class="badge badge-success px-2 py-1 shadow-sm" style="font-size: 0.85rem;">Activo</span>';
                    else
                        return '<span class="badge badge-secondary px-2 py-1 shadow-sm" style="font-size: 0.85rem;">Inactivo</span>';
                }
            },
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
        "order": [],
        "language": {
            "url": "https://cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json"
        }
    });
}

$('#tbUsuarios tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    let estatus = !data.Permisos;
    let permisoTexto = estatus ? "✅ ACTIVAR" : "❌ INACTIVAR";

    swal({
        title: "¿Está seguro de modificar los permisos?",
        text: `Se Modificara a estado: ${permisoTexto} permisos.`,
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#004F9F",
        confirmButtonText: "Sí, Aceptar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false, // Mantenemos el modal abierto
        closeOnCancel: true
    },
        function (isConfirm) {
            // Solo procesamos si el usuario confirmó
            if (isConfirm) {

                var request = {
                    IdUsuario: data.IdUsuario,
                    Permisos: estatus
                };

                $.ajax({
                    type: "POST",
                    url: "PageUsuarios.aspx/EstadoPermisos",
                    data: JSON.stringify(request),
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    success: function (response) {
                        if (response.d.Estado) {
                            listaUsuarios();
                            AlertaTimerTipo("Mensaje", response.d.Mensaje, "success");
                        } else {
                            AlertaTimerTipo("Atención", response.d.Mensaje, "warning");
                        }
                    },
                    error: function (xhr) {
                        console.log(xhr.responseText);
                        swal("Error Crítico", "Ocurrió un problema de conexión con el servidor.", "error");
                    }
                });
            }
        });

});

// fin