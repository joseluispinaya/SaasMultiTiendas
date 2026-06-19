
let tablaData;
let idEditar = 0;

$(document).ready(function () {
    cargarRoles();
    listaUsuarios();
});

function cargarRoles() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboRoles").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "PageUsuarios.aspx/ListaRoles",
        type: "POST",
        data: "{}", // <-- Mejor compatibilidad con WebMethods sin parámetros
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                // 1. Empezamos con la opción por defecto
                let opcionesHTML = '<option value="">Seleccione Rol</option>';

                // 2. Concatenamos todas las opciones en la variable (en memoria)
                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdRol}">${row.Descripcion}</option>`;
                });

                $("#cboRoles").html(opcionesHTML);

            } else {
                $("#cboRoles").html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cboRoles").html('<option value="">Error de conexión</option>');
        }
    });
}

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
                    <button class="btn btn-outline-info btn-detalle shadow-sm" title="Privilegio">
                        <i class="fas fa-shield-alt"></i>
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

    if (usuarioGlobal.IdRol !== 1 && !permiso) {
        MostrarAlertaZeo("Atención", "No está habilitado para realizar Modificaciones.", "warning");
        return;
    }

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

$('#tbUsuarios tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');
    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();

    if (usuarioGlobal.IdRol !== 1 && !permiso) {
        MostrarAlertaZeo("Atención", "No está habilitado para realizar Modificaciones.", "warning");
        return;
    }

    idEditar = data.IdUsuario;

    $("#txtNombres").val(data.NombreCompleto);
    $("#txtNroci").val(data.NroCi);
    $("#txtNameuser").val(data.UsuarioSis);
    $("#cboRoles").val(data.IdRol);

    $("#cboEstado").val(data.Activo ? 1 : 0).prop("disabled", false);

    $("#tituloLabel").text("Editar Registro");
    $("#modalUsuarios").modal("show");
});

$("#btnAddNuevoReg").on("click", function () {

    if (usuarioGlobal.IdRol !== 1 && !permiso) {
        MostrarAlertaZeo("Atención", "No está habilitado para realizar Modificaciones.", "warning");
        return;
    }

    idEditar = 0;

    $("#txtNombres").val("");
    $("#txtNroci").val("");
    $("#txtNameuser").val("");
    $("#cboRoles").val("");

    $("#cboEstado").val(1).prop("disabled", true);

    $("#tituloLabel").text("Nuevo Registro");

    $("#modalUsuarios").modal("show");

})

function habilitarBoton() {
    $('#btnGuardarCambios').prop('disabled', false);
}

$("#btnGuardarCambios").on("click", function () {

    $('#btnGuardarCambios').prop('disabled', true);
    let idRol = $("#cboRoles").val();

    const inputs = $("#modalUsuarios input.input-validar").serializeArray();
    const inputs_sin_valor = inputs.filter(item => item.value.trim() === "");

    if (inputs_sin_valor.length > 0) {
        const mensaje = `Debe completar el campo: "${inputs_sin_valor[0].name}"`;
        MostrarToastZer(mensaje, "Atención", "warning");

        $(`input[name="${inputs_sin_valor[0].name}"]`).focus();
        habilitarBoton();
        return;
    }

    if (idRol === "") {
        MostrarToastZer("Por favor, seleccionar un Rol.", "Atención", "warning");
        $("#cboRoles").focus();
        habilitarBoton();
        return;
    }

    const objeto = {
        IdUsuario: idEditar,
        IdRol: parseInt(idRol),
        NroCi: $("#txtNroci").val().trim(),
        NombreCompleto: $("#txtNombres").val().trim(),
        UsuarioSis: $("#txtNameuser").val().trim(),
        Activo: ($("#cboEstado").val() === "1" ? true : false)
    }

    $("#modalUsuarios").find("div.modal-content").LoadingOverlay("show");

    // 2. Enviar al Servidor
    $.ajax({
        type: "POST",
        url: "PageUsuarios.aspx/GuardarOrEditUsuarios",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalUsuarios").find("div.modal-content").LoadingOverlay("hide");
            AlertaTimerTipo(
                response.d.Estado ? '¡Excelente!' : 'Atención', // Título dinámico
                response.d.Mensaje, // Texto del servidor
                response.d.Valor // Icono (success/error/warning)
            );

            if (response.d.Estado) {
                $("#modalUsuarios").modal("hide");
                listaUsuarios();
                idEditar = 0;
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#modalUsuarios").find("div.modal-content").LoadingOverlay("hide");
            MostrarToastZer("No se pudo conectar con el servidor.", "Atención", "error");
        },
        complete: function () {
            habilitarBoton();
        }
    });

})

// fin