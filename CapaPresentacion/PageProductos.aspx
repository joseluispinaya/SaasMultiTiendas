<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="PageProductos.aspx.cs" Inherits="CapaPresentacion.PageProductos" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header bg-primary py-2 px-4">
                    <h3 class="card-title m-0"><i class="fas fa-shopping-basket mr-2"></i>Lista de Productos Registrados</h3>
                </div>
                <div class="card-body">
                    <div class="border rounded p-3 shadow-sm bg-white mb-4" style="border-left: 4px solid #ffc107 !important;">
                        <div class="d-flex justify-content-between align-items-center flex-wrap">
                            <div class="mb-2 mb-md-0">
                                <h4 class="font-weight-bold text-dark m-0">
                                    <i class="fas fa-info-circle text-primary mr-2"></i>Gestión de Inventario
                                </h4>
                                <small class="text-muted" style="font-size: 14px;">Presione el botón para registrar nueva mercadería o use la tabla para ver y editar los precios actuales.</small>
                            </div>
                            <div>
                                <button type="button" id="btnAddNuevoReg" class="btn btn-lg btn-primary">
                                    <i class="fas fa-box-open mr-2"></i>NUEVO PRODUCTO
                                </button>
                            </div>
                        </div>
                    </div>


                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-hover align-middle" id="tbProductos" cellspacing="0" width="100%">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Código</th>
                                    <th>Producto</th>
                                    <th class="text-center">P. Compra (Bs.)</th>
                                    <th class="text-center">P. Venta (Bs.)</th>
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

    <div class="modal fade" id="modalProductos" tabindex="-1" role="dialog" aria-labelledby="tituloLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="tituloLabel">Producto</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">

                    <div class="form-group">
                        <label for="txtNombre">Nombre del Producto</label>
                        <input type="text" class="form-control form-new input-validar" id="txtNombre" name="Nombre Producto"
                            placeholder="Nombre del Porducto" autocomplete="off">
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="txtPrecioCompra">Precio Compra</label>
                            <input type="number" class="form-control form-new input-validar" id="txtPrecioCompra" name="Precio Compra" min="0" value="0" step="0.01">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="txtPrecioVenta">Precio Venta</label>
                            <input type="number" class="form-control form-new input-validar" id="txtPrecioVenta" name="Precio Venta" min="0" value="0" step="0.01">
                        </div>
                    </div>

                    <div class="form-group">
                        <label for="txtDescripcion">Descripcion del producto</label>
                        <input type="text" class="form-control form-new input-validar" id="txtDescripcion" name="Descripcion del producto"
                            placeholder="Descripcion del producto" autocomplete="off">
                    </div>

                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-sm btn-warning" data-dismiss="modal"><i class="fas fa-times-circle mr-2"></i>Cerrar</button>
                    <button id="btnGuardarCambios" type="button" class="btn btn-sm btn-primary"><i class="fas fa-save mr-2"></i>Guardar Cambios</button>
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

    <script src="js/PageProductos.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
