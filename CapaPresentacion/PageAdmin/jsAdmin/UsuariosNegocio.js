
let tablaData;
let idEditar = 0;


$(document).ready(function () {

    cargarTodosNegocios();
    cargarRoles();
});

function cargarRoles() {

    // Mostramos un texto de "Cargando..." mientras esperamos la respuesta
    $("#cboRoles").html('<option value="">Cargando...</option>');

    $.ajax({
        url: "/PageUsuarios.aspx/ListaRoles",
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

function cargarTodosNegocios() {

    let combosNegocios = $("#cboNegocio, #cboNegocioModal");

    // 2. Mostramos el mensaje de carga en todos a la vez
    combosNegocios.html('<option value="">Cargando...</option>');

    $.ajax({
        url: "PageNegocios.aspx/ListaNegocios",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                let opcionesHTML = '<option value="">-- Seleccione un Negocio --</option>';

                $.each(response.d.Data, function (i, row) {
                    opcionesHTML += `<option value="${row.IdNegocio}">${row.NombreTienda}</option>`;
                });

                // 3. ¡LA MAGIA! Inyectamos el HTML en los 4 selects al mismo tiempo
                combosNegocios.html(opcionesHTML);

            } else {
                combosNegocios.html('<option value="">Error al cargar</option>');
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            combosNegocios.html('<option value="">Error de conexión</option>');
        }
    });
}

$("#cboNegocio").on("change", function () {

    // Verificamos si la tabla ya fue inicializada alguna vez
    if ($.fn.DataTable.isDataTable("#tbUsuarios")) {
        // Si ya existe, simplemente le decimos que se recargue. 
        // ¡Automáticamente leerá el nuevo valor del select!
        tablaData.ajax.reload();
    } else {
        // Si es la primera vez que seleccionan algo, dibujamos la tabla
        listaUsuariosNegocio();
    }

});

// Ya NO recibe parámetro
function listaUsuariosNegocio() {

    tablaData = $("#tbUsuarios").DataTable({
        responsive: true,
        //searching: false,
        info: false,
        "ajax": {
            "url": 'UsuariosNegocio.aspx/ObtenerUsuariosNegocio',
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

$('#tbUsuarios tbody').on('click', '.btn-editar', function () {

    let fila = $(this).closest('tr');
    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();

    idEditar = data.IdUsuario;

    $("#txtNombres").val(data.NombreCompleto);
    $("#txtNroci").val(data.NroCi);
    $("#txtNameuser").val(data.UsuarioSis);
    $("#cboRoles").val(data.IdRol);

    $("#cboNegocioModal").val(data.IdNegocio);

    $("#cboEstado").val(data.Activo ? 1 : 0).prop("disabled", false);

    $("#tituloLabel").text("Editar Registro");
    $("#modalUsuarios").modal("show");
});

$('#tbUsuarios tbody').on('click', '.btn-detalle', function () {

    let fila = $(this).closest('tr');

    if (fila.hasClass('child')) {
        fila = fila.prev();
    }

    let data = tablaData.row(fila).data();
    let idNegocio = data.IdNegocio;

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
                    url: "/PageUsuarios.aspx/EstadoPermisos",
                    data: JSON.stringify(request),
                    contentType: 'application/json; charset=utf-8',
                    dataType: "json",
                    success: function (response) {

                        AlertaTimerTipo(
                            response.d.Estado ? '¡Excelente!' : 'Atención',
                            response.d.Mensaje,
                            response.d.Estado ? 'success' : 'warning'
                        );

                        if (response.d.Estado) {

                            $("#cboNegocio").val(idNegocio);
                            $("#cboNegocio").trigger("change");

                            //if (tablaData) {
                            //    tablaData.ajax.reload(null, false);
                            //}
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

$("#btnAddNuevoReg").on("click", function () {

    idEditar = 0;

    $("#txtNombres").val("");
    $("#txtNroci").val("");
    $("#txtNameuser").val("");
    $("#cboRoles").val("");
    $("#cboNegocioModal").val("");

    $("#cboEstado").val(1).prop("disabled", true);

    $("#tituloLabel").text("Nuevo Registro");

    $("#modalUsuarios").modal("show");

})

function habilitarBoton() {
    $('#btnGuardarCambios').prop('disabled', false);
}

$("#btnGuardarCambios").on("click", function () {

    // 1. Bloqueo inmediato
    $('#btnGuardarCambios').prop('disabled', true);

    let idNegocio = $("#cboNegocioModal").val();
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

    if (idNegocio === "") {
        MostrarToastZer("Por favor, seleccione un Negocio.", "Atención", "warning");
        $("#cboNegocioModal").focus();
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
        IdNegocio: parseInt(idNegocio),
        IdRol: parseInt(idRol),
        NroCi: $("#txtNroci").val().trim(),
        NombreCompleto: $("#txtNombres").val().trim(),
        UsuarioSis: $("#txtNameuser").val().trim(),
        Activo: ($("#cboEstado").val() === "1" ? true : false)
    }

    $("#modalUsuarios").find("div.modal-content").LoadingOverlay("show");

    $.ajax({
        type: "POST",
        url: "UsuariosNegocio.aspx/GuardarOrEditUsuarios",
        data: JSON.stringify({ objeto: objeto }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            $("#modalUsuarios").find("div.modal-content").LoadingOverlay("hide");
            AlertaTimerTipo(
                response.d.Estado ? '¡Excelente!' : 'Atención',
                response.d.Mensaje,
                response.d.Valor
            );

            if (response.d.Estado) {
                $("#modalUsuarios").modal("hide");

                // 1. Asignamos el idNegocio al combo filtro
                $("#cboNegocio").val(idNegocio);

                // 2. Disparamos el evento 'change' simulando que el usuario hizo clic.
                // Esto ejecutará la validación que tienes arriba (isDataTable) 
                // y recargará o dibujará la tabla según corresponda.
                $("#cboNegocio").trigger("change");

                //if (tablaData) {
                //    tablaData.ajax.reload(null, false);
                //}
                idEditar = 0;
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            $("#modalUsuarios").find("div.modal-content").LoadingOverlay("hide");
            MostrarToastZer("¡Atención!", "Error de comunicación con el servidor.", "error");
        },
        complete: function () {
            habilitarBoton();
        }
    });

});

// fin