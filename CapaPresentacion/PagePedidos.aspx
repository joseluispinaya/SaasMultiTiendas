<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="PagePedidos.aspx.cs" Inherits="CapaPresentacion.PagePedidos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
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
    <div class="row">
        <div class="col-lg-12">
            <div class="card shadow-sm mb-4 border-0" style="border-top: 5px solid #ffc107 !important;">
                <%--<div class="card-header bg-primary py-2 px-4">
                    <h3 class="card-title m-0"><i class="fas fa-shopping-basket mr-2"></i>Pedidos de Compra</h3>
                </div>--%>
                <div class="card-body">
                    <div class="border rounded p-3 shadow-sm bg-white mb-4" style="border-left: 4px solid #ffc107 !important;">
                        <div class="row">
                            <div class="col-md-6">

                                <div class="alert alert-info mb-4">
                                    <div class="mb-2 mb-md-0">
                                        <h4 class="font-weight-bold">
                                            <i class="fas fa-info-circle text-primary mr-2"></i>Gestión de Pedidos
                                        </h4>
                                        <small class="text-dark" style="font-size: 14px;">Gestion de productos faltantes para realizar compras generando un pdf con la lista necesaria y precios.</small>
                                    </div>
                                </div>

                                <div class="form-group">
                                    <label for="cboBuscarProducto" class="small font-weight-bold text-muted mb-2" style="font-size: 0.85rem;">
                                        <i class="fas fa-search mr-1"></i>Buscar Producto
                                    </label>
                                    <select class="form-control" id="cboBuscarProducto" style="width: 100%;">
                                        <option value=""></option>
                                    </select>
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="alert alert-primary border text-center">

                                    <%--<input type="hidden" id="txtIdProducto">
                                    <input type="hidden" id="txtPrecioCompra">--%>

                                    <h4 class="text-dark fw-bold mb-1" id="lblNombreProducto">Esperando...</h4>
                                    <p class="text-dark mb-3" id="lblDescripcion">Esperando...</p>
                                    <hr>
                                    <span class="text-dark d-block mb-1">Precio de Compra</span>
                                    <h4 class="text-success fw-bolder mb-0" id="lblPrecioCompra">0.00 Bs.</h4>

                                    <p class="m-t-20">
                                        <button id="btnAgregar" type="button" class="btn btn-primary waves-effect waves-light">
                                            <i class="fas fa-cart-plus mr-2"></i>AGREGAR A LISTA
                                        </button>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <%--<div class="table-responsive mb-4">
                        <table class="table table-sm table-striped table-bordered table-hover text-center align-middle m-0" id="tbPedidos">
                            <thead class="thead-dark">
                                <tr>
                                    <th class="text-center">Quitar</th>
                                    <th>Código</th>
                                    <th>Producto</th>
                                    <th>Descripcion</th>
                                    <th class="text-center">P. Compra (Bs.)</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>--%>

                    <div class="table-responsive bg-white p-2 border rounded shadow-sm">
                        <table class="table table-sm table-bordered table-hover text-center align-middle m-0" id="tbPedidosPrue">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Código</th>
                                    <th>Producto</th>
                                    <th>P. Compra</th>
                                    <th>P. Venta</th>
                                    <th style="width: 80px;">Quitar</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>

                    <div class="row justify-content-center mt-4">
                        <div class="col-md-4">
                            <button type="button" id="btnReporte" class="btn btn-warning btn-block btn-lg shadow font-weight-bold">
                                <i class="fas fa-save mr-2"></i>GENERAR LISTA PDF
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="assets/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="assets/plugins/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="assets/plugins/datatables/dataTables.responsive.min.js"></script>
    <script src="assets/plugins/datatables/responsive.bootstrap4.min.js"></script>

    <script src="assets/pluginzero/select2/select2.min.js"></script>
    <script src="assets/pluginzero/select2/es.min.js"></script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/3.5.31/jspdf.plugin.autotable.min.js"></script>

    <script src="js/PagePedidos.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
