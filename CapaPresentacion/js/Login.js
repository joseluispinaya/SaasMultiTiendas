
$(document).ready(function () {

    // Foco inicial automático
    $('#txtUsuario').focus();

    // Lógica para mostrar/ocultar la contraseña
    $('#btnVerClave').on('click', function () {
        let inputClave = $('#txtClave');
        let icono = $(this);

        if (inputClave.attr('type') === 'password') {
            inputClave.attr('type', 'text');
            icono.removeClass('fa-eye').addClass('fa-eye-slash');
            icono.css('color', '#0dcaf0'); // Brilla cuando está visible
        } else {
            inputClave.attr('type', 'password');
            icono.removeClass('fa-eye-slash').addClass('fa-eye');
            icono.css('color', '#94a3b8'); // Se apaga cuando se oculta
        }
    });

    // Lógica para hacer clic en el botón (Aquí irá tu AJAX)
    $('#btnIngresar').on('click', function () {

        $('#btnIngresar').prop('disabled', true);

        let usuario = $('#txtUsuario').val().trim();
        let clave = $('#txtClave').val().trim();

        if (usuario === "" || clave === "") {
            // alert('Por favor, ingrese su usuario y contraseña.')
            Swal.fire({
                icon: 'warning',
                title: 'Datos Incompletos',
                text: 'Por favor, ingrese su usuario y contraseña.',
                confirmButtonColor: '#0dcaf0',
                background: '#1e293b',
                color: '#fff'
            });
            $('#btnIngresar').prop('disabled', false);
            return;
        }

        $.ajax({
            url: "Login.aspx/InicioSesion",
            type: "POST",
            data: JSON.stringify({ Usuario: usuario, Clave: clave }),
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            beforeSend: function () {
                $.LoadingOverlay("show");
            },
            success: function (response) {
                $.LoadingOverlay("hide");
                if (response.d.Estado) {

                    const usuarioData = response.d.Data;

                    sessionStorage.setItem('clienteTienda', JSON.stringify(usuarioData));
                    Swal.fire({
                        title: "Bienvenido",
                        text: `Hola ${usuarioData.UsuarioSis || "Usuario"} 👋`,
                        icon: "success",
                        timer: 2000,
                        background: '#1e293b',
                        color: '#fff',
                        showConfirmButton: false
                    });

                    $("#txtUsuario, #txtClave").val("");

                    setTimeout(() => window.location.href = response.d.Valor, 2200);
                } else {
                    swal("Mensaje", response.d.Mensaje, "warning");
                    $("#txtUsuario, #txtClave").val("");
                }
            },
            error: function (xhr, ajaxOptions, thrownError) {
                console.log(xhr.status + " \n" + xhr.responseText, "\n" + thrownError);
                $.LoadingOverlay("hide");
                Swal.fire({
                    title: "Error",
                    text: "Error de comunicación con el servidor.",
                    icon: "error"
                });
            },
            complete: function () {
                $('#btnIngresar').prop('disabled', false);
            }
        });

    });

    // Permitir ingresar presionando ENTER
    $('#txtClave').on('keypress', function (e) {
        if (e.which === 13) {
            $('#btnIngresar').click();
        }
    });

});

// fin