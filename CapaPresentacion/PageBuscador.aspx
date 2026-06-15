<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="PageBuscador.aspx.cs" Inherits="CapaPresentacion.PageBuscador" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/plugins/select2/select2.min.css" rel="stylesheet" type="text/css" />
    <style>
        /* Pequeño ajuste para que Select2 use la altura de Bootstrap 5 */
        .select2-container .select2-selection--single {
            height: 45px !important;
            padding-top: 8px;
            border: 1px solid #ced4da;
        }
        .select2-container--default .select2-selection--single .select2-selection__arrow {
            top: 9px;
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row justify-content-center mt-4">
        <div class="col-md-8 col-lg-6">
            
            <div class="card shadow-sm border-0">
                <div class="card-header bg-primary text-white py-3">
                    <h5 class="card-title mb-0"><i class="fas fa-search me-2"></i>Consulta Rápida</h5>
                </div>
                
                <div class="card-body p-4">
                    <div class="mb-4">
                        <label class="form-label text-muted fw-bold">Buscar Artículo:</label>
                        <select id="cboBuscarProducto" class="form-control w-100"></select>
                    </div>

                    <div id="detalleProducto" class="alert alert-secondary border d-none text-center p-4">
                        <p class="text-muted mb-1" id="lblCodigoProducto">CÓDIGO</p>
                        <h4 class="text-dark fw-bold mb-3" id="lblNombreProducto">Nombre del Producto</h4>
                        <hr>
                        <span class="text-muted d-block mb-1">Precio de Venta</span>
                        <h1 class="text-success fw-bolder mb-0" id="lblPrecioVenta">0.00 Bs.</h1>
                    </div>
                </div>
            </div>

        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/plugins/select2/select2.min.js"></script>
    <script src="assets/plugins/select2/es.min.js"></script>
    <script src="js/PageBuscador.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
