<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="PageBuscador.aspx.cs" Inherits="CapaPresentacion.PageBuscador" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <%--<link href="assets/jquery-ui-1.12.1/jquery-ui.css" rel="stylesheet"/>--%>
    <link href="assets/pluginzero/select2/select2.min.css" rel="stylesheet" type="text/css" />
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

            <div class="card shadow-sm mb-4 border-0" style="border-top: 5px solid #ffc107 !important;">

                <div class="card-body">

                    <h5 class="font-weight-bold text-dark m-0 text-left border-bottom pb-2 mb-3">
                        <i class="fas fa-search mr-2 text-primary"></i>Consulta Rápida
                    </h5>

                    <div class="form-group mb-4 mt-3">
                        <label for="cboBuscarProducto" class="font-weight-bold text-muted mb-1"><i class="fas fa-search mr-1"></i>Buscar Producto</label>
                        <select class="form-control" id="cboBuscarProducto" style="width: 100%;">
                        </select>
                    </div>

                    <div id="detalleProducto" class="alert alert-secondary border d-none text-center p-4">
                        <h4 class="text-dark fw-bold mb-1" id="lblNombreProducto">Nombre del Producto</h4>
                        <p class="text-dark mb-1" id="lblCodigoProducto">DETALLE</p>
                        <span class="text-danger d-block mb-3" id="lblPrecioCompra">0.00 Bs</span>
                        <hr>
                        <span class="text-dark d-block">PRECIO DE VENTA</span>
                        <h1 class="text-success fw-bolder mb-0" id="lblPrecioVenta">0.00 Bs.</h1>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <%--<div class="row justify-content-center mt-3">
    <div class="col-md-8 col-lg-6">

        <div class="card shadow-sm mb-4 border-0" style="border-top: 5px solid #ffc107 !important;">

            <div class="card-body">

                <h5 class="font-weight-bold text-dark m-0 text-left border-bottom pb-2 mb-3">
                    <i class="fas fa-search mr-2 text-primary"></i>Consulta Rápida 2
                </h5>

                <div class="form-group mb-4 mt-3">
                    <label for="txtBuscardos">Buscar Producto</label>
                    <input type="text" class="form-control" id="txtBuscardos">
                </div>

                <div id="detalleProductodos" class="alert alert-secondary border d-none text-center p-4">
                    <h4 class="text-dark fw-bold mb-1" id="lblNombreProductodos">Nombre del Producto</h4>
                    <p class="text-dark mb-1" id="lblCodigoProductodos">DETALLE</p>
                    <span class="text-danger d-block mb-3" id="lblPrecioComprados">0.00 Bs</span>
                    <hr>
                    <span class="text-dark d-block">PRECIO DE VENTA</span>
                    <h1 class="text-success fw-bolder mb-0" id="lblPrecioVentados">0.00 Bs.</h1>
                </div>
            </div>
        </div>

    </div>
</div>--%>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <%--<script src="assets/jquery-ui-1.12.1/jquery-ui.js"></script>--%>
    <script src="assets/pluginzero/select2/select2.min.js"></script>
    <script src="assets/pluginzero/select2/es.min.js"></script>
    <script src="js/PageBuscador.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
