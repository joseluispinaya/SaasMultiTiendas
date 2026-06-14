<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="PageProductos.aspx.cs" Inherits="CapaPresentacion.PageProductos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-md-12">
            <div class="card">
                <div class="card-header bg-primary">
                    <h5 class="card-title text-white">Lista de Productos Registrados</h5>
                </div>
                <div class="card-body p-4">
                    <div class="row mb-4">
                        <div class="col-md-6 offset-md-3 text-center">
                            <button type="button" id="btnAddNuevoReg" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#modalProductos">
                                <i class="fas fa-user-plus me-2"></i>Nuevo Registro
                            </button>
                        </div>
                    </div>

                    <div class="table-responsive">
                        <table class="table table-hover table-striped table-bordered" id="tbProductos" style="width: 100%">
                            <thead>
                                <tr>
                                    <th>Codigo</th>
                                    <th>Producto</th>
                                    <th class="text-end">Precio Compra (Bs.)</th>
                                    <th class="text-end">Precio Venta (Bs.)</th>
                                    <th class="text-center">Acción</th>
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
    <script src="js/PageProductos.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
