<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="PageProductos.aspx.cs" Inherits="CapaPresentacion.PageProductos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="https://cdn.datatables.net/2.2.2/css/dataTables.bootstrap5.css" rel="stylesheet" type="text/css" />
    <link href="https://cdn.datatables.net/responsive/3.0.4/css/responsive.bootstrap5.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-primary">
                    <h5 class="card-title text-white">Lista de Productos Registrados</h5>
                </div>
                <div class="card-body p-4">
                    <div class="row mb-4 align-items-center bg-light p-3 rounded-3 border">
                        <div class="col-md-8 mb-3 mb-md-0">
                            <div class="d-flex align-items-center">
                                <i class="fas fa-info-circle fa-3x text-primary me-3"></i>
                                <div>
                                    <h5 class="mb-1 fw-bold text-dark">Gestión de Inventario</h5>
                                    <span class="text-muted">Presione el botón para registrar nueva mercadería o use la tabla para ver y editar los precios actuales.</span>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 text-md-end text-center">
                            <button type="button" id="btnAddNuevoReg" class="btn btn-primary btn-lg shadow-sm">
                                <i class="fas fa-box-open me-2"></i>Nuevo Producto
                            </button>
                        </div>
                    </div>

                    <div class="shadow-sm rounded">
                        <table class="table table-hover table-striped align-middle" id="tbProductos" style="width: 100%; font-size: 15px;">
                            <thead class="table-dark">
                                <tr>
                                    <th style="width: 15%;">Código</th>
                                    <th style="width: 35%;">Producto</th>
                                    <th class="text-end" style="width: 15%;">P. Compra (Bs.)</th>
                                    <th class="text-end" style="width: 15%;">P. Venta (Bs.)</th>
                                    <th class="text-center" style="width: 20%;">Acción</th>
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

    <div class="modal fade" id="modalProductos" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="tituloLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h1 class="modal-title fs-5" id="tituloLabel">Producto</h1>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label for="txtNombre" class="form-label">Nombre del Producto</label>
                        <input type="text" class="form-control input-validar" id="txtNombre" name="Nombre Producto">
                    </div>

                    <div class="row mb-3">
                        <div class="col-md-6">
                            <label for="txtPrecioCompra" class="form-label">Precio Compra</label>
                            <input type="number" class="form-control input-validar" id="txtPrecioCompra" name="Precio Compra" min="0" value="0">
                        </div>
                        <div class="col-md-6">
                            <label for="txtPrecioVenta" class="form-label">Precio Venta</label>
                            <input type="number" class="form-control input-validar" id="txtPrecioVenta" name="Precio Venta" min="0" value="0">
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="txtDescripcion" class="form-label">Descripcion del producto</label>
                        <input type="text" class="form-control input-validar" id="txtDescripcion" name="Descripcion del producto">
                    </div>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                    <button type="button" id="btnGuardarCambios" class="btn btn-primary">Guardar Cambios</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="https://cdn.datatables.net/2.2.2/js/dataTables.js"></script>
    <script src="https://cdn.datatables.net/2.2.2/js/dataTables.bootstrap5.js"></script>
    <script src="https://cdn.datatables.net/responsive/3.0.4/js/dataTables.responsive.js"></script>
    <script src="https://cdn.datatables.net/responsive/3.0.4/js/responsive.bootstrap5.js"></script>

    <script src="js/PageProductos.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
