<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="CapaPresentacion.Inicio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/css/inicio.css" rel="stylesheet">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row align-items-center tarjeta-bienvenida p-4 p-md-5 mb-5 mx-0 mt-1">

        <div class="col-lg-7 text-center text-lg-start mb-4 mb-lg-0">
            <h1 class="display-4 fw-bolder text-primary mb-2">¡Hola, Bienvenido!</h1>
            <p class="fs-4 text-secondary mb-5">Escriba el nombre o el código del producto para ver su precio al instante.</p>

            <div class="position-relative px-lg-0 px-3">
                <input type="text" id="txtBuscarPrecio" class="form-control buscador-inicio text-uppercase" placeholder="🔍 BUSCAR PRODUCTO..." autocomplete="off">
            </div>
        </div>

        <div class="col-lg-5 text-center">
            <img src="assets/images/minegocio.jpg" alt="Mi Tienda" class="img-bienvenida">
        </div>

    </div>

    <div class="row justify-content-center" id="seccionResultados" style="display: none;">
        <div class="col-lg-10">
            <div class="card border-0 shadow-sm rounded-4 overflow-hidden">
                <div class="card-header bg-dark text-white py-3">
                    <h4 class="mb-0 fw-bold"><i class="fas fa-list-ul me-2"></i>Resultados</h4>
                </div>
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-striped table-hover mb-0" id="tbResultados">
                            <thead class="table-light">
                                <tr>
                                    <th class="fs-5 py-3 ps-4">Código</th>
                                    <th class="fs-5 py-3">Producto</th>
                                    <th class="fs-5 py-3 text-end pe-4">Precio (Bs.)</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script>
        $(document).ready(function () {

            // Efecto visual amigable: La tabla de resultados solo aparece 
            // cuando el usuario empieza a escribir en el buscador.
            $('#txtBuscarPrecio').on('keyup', function () {
                var texto = $(this).val().trim();

                if (texto.length > 0) {
                    $('#seccionResultados').fadeIn(300);
                    // Aquí irá tu llamada AJAX al WebMethod
                } else {
                    $('#seccionResultados').fadeOut(300);
                    // Limpiar la tabla si borran el texto
                    $('#tbResultados tbody').empty();
                }
            });

            // Para que el cursor se ponga automáticamente en el buscador al abrir la página
            setTimeout(function () {
                $('#txtBuscarPrecio').focus();
            }, 500);

        });
    </script>
</asp:Content>
