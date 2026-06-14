
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

// Asumiendo que tu botón de salir tiene el id "btnCerrarSesion" NombreRol
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
        EjecutarCierreSesion();
    });
});

function EjecutarCierreSesion() {
    sessionStorage.clear();
    window.location.replace('Login.aspx');
}

// fin codigo