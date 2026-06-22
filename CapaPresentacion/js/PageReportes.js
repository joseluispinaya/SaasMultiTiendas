
$(document).ready(function () {

    // 1. Cargar los datos del negocio al iniciar la página
    cargarDatosNegocio();

    //setTimeout(function () {
    //    cargarDatosNegocio();
    //}, 3000);

    // 2. Evento al hacer clic en cualquier tarjeta de plan
    $(".plan-card").on("click", function () {

        // Extraemos los datos ocultos en la tarjeta seleccionada
        let nombrePlan = $(this).data("plan");
        let precioPlan = $(this).data("precio");

        // Llenamos el Modal
        $("#lblModalPlanNombre").text(`Suscripción por ${nombrePlan}`);
        $("#lblModalPlanPrecio").text(`${precioPlan} Bs.`);

        // Mostramos el Modal
        $("#modalPlan").modal("show");
    });

    // 3. Botón del modal (Contactar al Administrador)
    $("#btnContactarAdmin").on("click", function () {
        let planElegido = $("#lblModalPlanNombre").text();
        let nombreNegocio = $("#lblInfoTienda").text();
        let mensaje = `Hola El_Zero_Byte, deseo renovar mi sistema de ${nombreNegocio} con la ${planElegido}. Aquí envío mi comprobante.`;

        // Cierra el modal
        $("#modalPlan").modal("hide");

        // Si lo deseas, puedes usar SweetAlert aquí o abrir el enlace de WhatsApp
        //window.open(`https://wa.me/59175103050?text=${encodeURIComponent(mensaje)}`, '_blank');

        MostrarAlertaZeo("¡Excelente!", mensaje, "success");
    });
});

function cargarDatosNegocio() {

    $("#cargando").LoadingOverlay("show");

    $.ajax({
        url: "PageReportes.aspx/DatosNegocio",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {
            $("#cargando").LoadingOverlay("hide");

            if (response.d.Estado) {
                let data = response.d.Data;

                $("#lblInfoTienda").text(data.NombreTienda);
                $("#lblInfoPropietario").text(data.NombrePropietario);
                $("#lblInfoCelular").text(data.Celular);
                $("#lblInfoVencimiento").text(data.FechaFin);

                let nroUsuarios = `${data.NroUsuarios} Usuarios.`;
                $("#lblNroUser").text(nroUsuarios);

                let icono = data.Activo
                    ? '<i class="fas fa-check-circle mr-1"></i>'
                    : '<i class="fas fa-times-circle mr-1"></i>';

                let texto = data.Activo ? 'ACTIVA' : 'INACTIVA';

                $("#lblInfoEstado")
                    .toggleClass('badge-success', data.Activo)
                    .toggleClass('badge-danger', !data.Activo)
                    .html(`${icono} ${texto}`);

                let textoDetalle =
                    "Negocio: " + data.NombreTienda + "\n" +
                    "Estado Actual: " + texto + "\n" +
                    "-----------------------------------\n" +
                    "Suscripción: " + data.TiempoRestante;

                setTimeout(function () {
                    swal({
                        title: "Informacion de Suscripcion",
                        text: textoDetalle,
                        imageUrl: "assets/images/mitienda.png",
                        confirmButtonText: "Entendido",
                        confirmButtonColor: "#004F9F"
                    });
                }, 2000);

                //MostrarAlertaZeo("Mensaje", data.TiempoRestante, "info");

            } else {
                AlertaTimerTipo("Atención", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            $("#cargando").LoadingOverlay("hide");
            MostrarToastZer("No se pudo conectar con el servidor.", "Atención", "error");
        }
    });
}

function cargarDatosNegocioOriginal() {
    // Aquí puedes usar tu variable global (usuarioGlobal) si ya tiene estos datos,
    // o hacer una llamada AJAX a tu servidor para traerlos de la tabla Negocios.
    $("#cargando").LoadingOverlay("show");
    setTimeout(function () {
        $("#cargando").LoadingOverlay("hide");

        if (typeof usuarioGlobal !== 'undefined' && usuarioGlobal !== null) {
            $("#lblInfoTienda").text(usuarioGlobal.NombreTienda);
            $("#lblInfoPropietario").text(usuarioGlobal.NombreCompleto);
            $("#lblInfoCelular").text("76321458");
            //$("#lblInfoCelular").text(usuarioGlobal.Celular || "No registrado");

            // Asegúrate de formatear la fecha correctamente según como llegue de SQL Server
            // $("#lblInfoVencimiento").text(usuarioGlobal.FechaVencimientoSuscripcion);
        }

    }, 3000);

    
}


// fin