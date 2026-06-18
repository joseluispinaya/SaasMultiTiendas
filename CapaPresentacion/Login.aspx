<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Login.aspx.cs" Inherits="CapaPresentacion.Login" %>

<!DOCTYPE html>

<html lang="es">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>Acceso - Mi Tienda</title>
    <link rel="shortcut icon" href="assets/images/favicon.ico">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

    <style>
        /* Fondo de pantalla oscuro para que resalte el neón */
        body {
            background-color: #0f172a; /* Azul noche muy oscuro */
            background-image: radial-gradient(circle at top right, #1e293b, #0f172a);
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        /* La tarjeta principal con borde iluminado */
        .card-neon {
            background: #1e293b;
            border: 2px solid #0dcaf0; /* Color Info de Bootstrap (Celeste) */
            border-radius: 20px;
            box-shadow: 0 0 20px rgba(13, 202, 240, 0.3), inset 0 0 10px rgba(13, 202, 240, 0.1);
            position: relative;
            margin-top: 60px; /* Espacio para que la imagen sobresalga arriba */
            width: 100%;
            max-width: 400px;
        }

        /* Imagen sobresaliendo en la parte superior */
        .img-logo-neon {
            width: 150px;
            position: absolute;
            top: -75px; /* Sube la imagen fuera de la tarjeta */
            left: 50%;
            transform: translateX(-50%);
            /* Una sombra blanca debajo de la imagen para darle efecto de luz */
            filter: drop-shadow(0 10px 15px rgba(255, 255, 255, 0.15)); 
        }

        /* Inputs oscuros que brillan al tocarlos */
        .input-neon {
            background-color: #0f172a !important;
            border: 1px solid #475569;
            color: #f8fafc !important;
            font-size: 1.2rem;
            border-radius: 12px;
            transition: all 0.3s ease;
        }

        /* El brillo de neón cuando el usuario escribe */
        .input-neon:focus {
            border-color: #0dcaf0;
            box-shadow: 0 0 15px rgba(13, 202, 240, 0.6);
            outline: none;
        }

        /* Ajuste para las etiquetas flotantes de Bootstrap en modo oscuro */
        .form-floating > label {
            color: #94a3b8;
        }
        .form-floating > .input-neon:focus ~ label,
        .form-floating > .input-neon:not(:placeholder-shown) ~ label {
            color: #0dcaf0;
            font-weight: bold;
        }

        /* Botón gigante y brillante */
        .btn-neon {
            background-color: #0dcaf0;
            color: #000;
            font-size: 1.3rem;
            font-weight: 800;
            border-radius: 12px;
            border: none;
            box-shadow: 0 0 15px rgba(13, 202, 240, 0.6);
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 1px;
        }

        .btn-neon:hover {
            background-color: #38bdf8;
            box-shadow: 0 0 25px rgba(56, 189, 248, 0.9);
            transform: translateY(-2px);
            color: #000;
        }

        /* Icono para ver/ocultar contraseña */
        .toggle-password {
            position: absolute;
            right: 15px;
            top: 50%;
            transform: translateY(-50%);
            color: #94a3b8;
            cursor: pointer;
            z-index: 10;
        }
        .toggle-password:hover {
            color: #0dcaf0;
        }
    </style>
</head>
<body>
    <div class="container px-3">
        <div class="row justify-content-center">
            <div class="col-12 d-flex justify-content-center">
                
                <div class="card card-neon p-4 pt-5 text-center shadow-lg">
                    
                    <img src="assets/images/mitienda.png" alt="Logo" class="img-logo-neon">
                    
                    <h3 class="mt-4 mb-4 fw-bold" style="color: #e0f2fe; text-shadow: 0 0 8px rgba(224,242,254,0.4);">
                        INICIAR SESIÓN
                    </h3>

                    <div>
                        
                        <div class="form-floating mb-4">
                            <input type="text" class="form-control input-neon" id="txtUsuario" placeholder="Usuario" autocomplete="off" value="wilma1969">
                            <label for="txtUsuario"><i class="fas fa-user me-2"></i>Nombre de Usuario</label>
                        </div>

                        <div class="form-floating mb-4 position-relative">
                            <input type="password" class="form-control input-neon" id="txtClave" placeholder="Contraseña" value="123456789">
                            <label for="txtClave"><i class="fas fa-lock me-2"></i>Contraseña</label>
                            
                            <i class="fas fa-eye toggle-password" id="btnVerClave" title="Mostrar/Ocultar Contraseña"></i>
                        </div>

                        <div class="d-grid mt-5 mb-2">
                            <button type="button" class="btn btn-neon py-3" id="btnIngresar">
                                Entrar <i class="fas fa-sign-in-alt ms-2"></i>
                            </button>
                        </div>
                        
                    </div>

                </div>

            </div>
        </div>
    </div>

    <script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    <script src="assets/plugins/loadingoverlay/loadingoverlay.js"></script>

    <script src="js/Login.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</body>
</html>
