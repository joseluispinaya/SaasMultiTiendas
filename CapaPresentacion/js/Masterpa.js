
// VARIABLE GLOBAL DEL USUARIO (Disponible para páginas hijas)
let usuarioGlobal = null;

$(document).ready(function () {
    const usuarioLog = sessionStorage.getItem('clienteTienda');

    // 1. Verificamos si existe el token local
    if (!usuarioLog) {
        window.location.replace('Login.aspx');
        return;
    }

    // 2. Si existe, validamos con el servidor antes de pintar la interfaz
    verificarEstado();
});

function verificarEstado() {
    $.ajax({
        url: "Inicio.aspx/VerificarEstado",
        type: "POST",
        data: "{}",
        contentType: 'application/json; charset=utf-8',
        dataType: "json",
        success: function (response) {

            // SI ESTÁ INACTIVO O SUSPENDIDO
            if (!response.d.Estado) {
                swal({
                    title: "Acceso Denegado",
                    text: response.d.Mensaje,
                    type: response.d.Valor,
                    showConfirmButton: false,
                    timer: 2000
                });

                setTimeout(function () {
                    cerrarSesionSis();
                }, 2200);

            }
            // SI ESTÁ ACTIVO Y TODO ESTÁ BIEN
            else {
                try {
                    const usua = JSON.parse(sessionStorage.getItem('clienteTienda'));

                    // Asignamos el valor a la variable global
                    usuarioGlobal = usua;

                    // Pintamos la interfaz
                    $("#lblNombreRol").text(usua.RolDescripcion);
                    $("#lblUsuarioname").text(usua.UsuarioSis);
                    $("#lblNombreRoldos").text(usua.RolDescripcion);
                    $("#lblNombreNegocio").text(usua.NombreTienda);

                    // Mensaje de prueba (Lo puedes quitar después)
                    //MostrarToastZer(response.d.Mensaje, "Excelente", response.d.Valor);

                } catch (error) {
                    console.error("El formato de la sesión local es inválido.", error);
                    cerrarSesionSis();
                }
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            // Error de red o servidor 500
            console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
            MostrarToastZer("No se pudo verificar el estado de su suscripción.", "Error de conexión", "error");
        }
    });
}

$("#btnCerrarSesion").on("click", function (e) {
    e.preventDefault();

    // Opcional: Un SweetAlert preguntando si está seguro (Mejora de UX)
    swal({
        title: "¿Cerrar Sesión?",
        text: "¿Estás seguro que deseas salir del sistema?",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc3545",
        confirmButtonText: "Sí, salir",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false
    }, function () {

        // Llamada AJAX a tu WebMethod perfecto
        $.ajax({
            type: "POST",
            url: "Inicio.aspx/CerrarSesion",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                if (response.d.Estado) {

                    sessionStorage.clear();

                    // Redirigimos al Login
                    window.location.replace('Login.aspx');
                } else {
                    sessionStorage.clear();

                    // Redirigimos al Login
                    window.location.replace('Login.aspx');
                    //swal("Error", "No se pudo cerrar la sesión correctamente.", "error");
                }
            },
            error: function (xhr) {
                console.log(xhr.responseText);
                sessionStorage.clear();

                // Redirigimos al Login
                window.location.replace('Login.aspx');
                //swal("Error", "Fallo de comunicación con el servidor.", "error");
            }
        });
    });
});

function cerrarSesionSis() {
    $.ajax({
        type: "POST",
        url: "Inicio.aspx/CerrarSesion",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            if (response.d.Estado) {

                sessionStorage.clear();

                // Redirigimos al Login
                window.location.replace('Login.aspx');
            } else {
                sessionStorage.clear();

                // Redirigimos al Login
                window.location.replace('Login.aspx');
                //swal("Error", "No se pudo cerrar la sesión correctamente.", "error");
            }
        },
        error: function (xhr) {
            console.log(xhr.responseText);
            sessionStorage.clear();

            // Redirigimos al Login
            window.location.replace('Login.aspx');
            //swal("Error", "Fallo de comunicación con el servidor.", "error");
        }
    });
}

function MostrarAlerta(titulo, mensaje, tipo) {
    // Si no se envía un tipo, por defecto será 'success'
    swal(titulo, mensaje, tipo || "success");
}

// Ejemplo de uso:
// MostrarAlerta("¡Guardado!", "El registro se guardó correctamente.", "success");

function MostrarAlertaZeo(titulo, mensaje, tipo) {
    let btnClass = 'btn-default';

    // Asignamos el color del botón según el estilo de Color Admin
    if (tipo === 'success') btnClass = 'btn-success';
    else if (tipo === 'warning') btnClass = 'btn-warning';
    else if (tipo === 'error') btnClass = 'btn-danger';
    else if (tipo === 'info') btnClass = 'btn-info';

    // swal(titulo, mensaje, tipo || "success");

    swal({
        title: titulo,
        text: mensaje,
        type: tipo,
        //showCancelButton: true,
        confirmButtonClass: btnClass,
        confirmButtonText: "Aceptar"
    });
}

function AlertaTimerTipo(titulo, mensaje, tipo, timer) {
    swal({
        title: titulo,
        text: mensaje,
        type: tipo,
        // Si le pasas un valor a timer lo usa; si no, usa 2000 por defecto
        timer: timer || 3000,
        showConfirmButton: false
    });
}

function MostrarAlertaTimer(titulo, mensaje, timer) {
    swal({
        title: titulo,
        text: mensaje,
        type: "success",
        // Si le pasas un valor a timer lo usa; si no, usa 2000 por defecto
        timer: timer || 2000,
        showConfirmButton: false
    });
}
//MostrarAlertaTimer("¡Guardado automático!", "Tus respuestas se han guardado.", 3000);
//MostrarAlertaTimer("Cargando...", "Preparando tu test vocacional.");


function MostrarToastZer(mensaje, titulo, tipo) {

    toastr.options = {
        "closeButton": true,          // Muestra una "X" para cerrar manualmente
        "progressBar": true,          // Muestra una barra de tiempo agotándose
        "positionClass": "toast-top-right", // Posición en pantalla
        "preventDuplicates": false,   // Evita que el mismo mensaje se repita varias veces seguidas
        "timeOut": "3000",            // Tiempo que dura en pantalla (3 segundos)
        "extendedTimeOut": "1000"     // Tiempo extra si el usuario pasa el mouse por encima
    };

    // Si no se envía un tipo, por defecto será 'info'
    let tipoToast = tipo || "info";

    // Ejecutamos la función dinámica de toastr
    toastr[tipoToast](mensaje, titulo || "");
}

function MostrarToastFijo(mensaje, titulo) {
    // Le pasamos configuraciones específicas solo a esta alerta
    toastr.error(mensaje, titulo || "Error Crítico", {
        "timeOut": "0",             // 0 significa que no se cierra solo
        "extendedTimeOut": "0",     // No se cierra al quitar el mouse
        "closeButton": true,        // Obligamos a que tenga el botón de cerrar
        "progressBar": false        // Quitamos la barra porque el tiempo es infinito
    });
}

// fin codigo