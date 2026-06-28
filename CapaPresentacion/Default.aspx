<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="CapaPresentacion.Default" %>

<!DOCTYPE html>

<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cargando Sistema...</title>
    
    <style>
        body, html {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at center, #0a1930 0%, #020c1b 100%);
            display: flex;
            align-items: center;
            justify-content: center;
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            overflow: hidden; /* Evita scroll durante la carga */
        }

        /* =========================================
           Contenedor Principal de Animación
           ========================================= */
        .loader-container {
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        /* Anillo exterior tecnológico (gira a la izquierda) */
        .tech-ring {
            position: absolute;
            top: -20px;
            left: -20px;
            width: calc(100% + 40px);
            height: calc(100% + 40px);
            border-radius: 50%;
            border: 3px solid transparent;
            border-top-color: #00c4ff; /* Cian */
            border-bottom-color: #FFD700; /* Dorado */
            animation: spin-reverse 3s linear infinite;
            z-index: 1;
        }

        /* Contenedor circular para la imagen */
        .logo-wrapper {
            width: 150px;
            height: 150px;
            border-radius: 50%;
            position: relative;
            z-index: 2;
            /* Resplandor IA */
            box-shadow: 0 0 30px rgba(0, 196, 255, 0.5);
            /* Animación de giro principal (gira a la derecha) */
            animation: spin 4s linear infinite;
        }

        /* La imagen adaptada a círculo */
        .logo-wrapper img {
            width: 100%;
            height: 100%;
            border-radius: 50%; /* Obliga a la imagen cuadrada a ser redonda */
            object-fit: cover;
            border: 4px solid #112240;
        }

        /* =========================================
           Textos y Barras de Progreso
           ========================================= */
        .loading-text {
            margin-top: 3rem;
            color: #64ffda;
            font-size: 1.2rem;
            font-weight: 600;
            letter-spacing: 2px;
            text-transform: uppercase;
            animation: pulse 1.5s ease-in-out infinite;
        }

        /* Barra de progreso de 5 segundos */
        .progress-bar-container {
            width: 200px;
            height: 4px;
            background-color: #112240;
            border-radius: 10px;
            margin-top: 15px;
            overflow: hidden;
            position: relative;
        }

        .progress-bar {
            height: 100%;
            background: linear-gradient(90deg, #00c4ff 0%, #FFD700 100%);
            width: 0%;
            /* La animación dura exactamente los 5 segundos que pediste */
            animation: fill-bar 5s linear forwards; 
        }

        /* =========================================
           Keyframes (Las Animaciones)
           ========================================= */
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }

        @keyframes spin-reverse {
            0% { transform: rotate(360deg); }
            100% { transform: rotate(0deg); }
        }

        @keyframes pulse {
            0%, 100% { opacity: 0.6; }
            50% { opacity: 1; text-shadow: 0 0 10px rgba(100, 255, 218, 0.5); }
        }

        @keyframes fill-bar {
            0% { width: 0%; }
            100% { width: 100%; }
        }
    </style>
</head>
<body>

    <div class="loader-container">
        <div class="logo-wrapper">
            <div class="tech-ring"></div>
            <img src="images/Mitienditaze.png" alt="Cargando Sistema...">
        </div>
        
        <div class="loading-text" id="statusText">Inicializando...</div>
        
        <div class="progress-bar-container">
            <div class="progress-bar"></div>
        </div>
    </div>

    <script>
        // Array con mensajes dinámicos para darle realismo
        const messages = [
            "Inicializando...",
            "Cargando Componentes...",
            "Preparando Entorno...",
            "Listo para empezar"
        ];
        
        let textElement = document.getElementById('statusText');
        let index = 0;

        // Cambiar el texto cada 1.2 segundos
        let textInterval = setInterval(() => {
            index++;
            if(index < messages.length) {
                textElement.innerText = messages[index];
            }
        }, 1250);

        // Lógica de Redirección (5000 milisegundos = 5 segundos)
        setTimeout(() => {
            clearInterval(textInterval); // Detenemos el cambio de texto
            // Aquí cambias "Login.aspx" por la URL real a la que quieres que vaya
            window.location.href = 'Login.aspx'; 
        }, 5000);
    </script>
</body>
</html>
