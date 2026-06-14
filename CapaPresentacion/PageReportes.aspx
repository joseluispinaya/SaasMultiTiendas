<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="PageReportes.aspx.cs" Inherits="CapaPresentacion.PageReportes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row justify-content-center">
        <div class="col-md-10">

            <div class="card shadow-sm border-0 mb-4">
                <div class="card-body p-4 text-center">
                    <h2 class="mb-4">¿Qué producto buscas?</h2>
                    <input type="text" id="txtBuscarProducto"
                        class="form-control form-control-lg input-buscador-gigante text-center"
                        placeholder="Escribe el nombre aquí..." autocomplete="off">

                    <div class="row mt-4">
                        <div class="col-md-6 offset-md-3">
                            <button type="button" class="btn btn-primary me-2" data-bs-toggle="modal" data-bs-target="#modalDetalle">Modal ejemplo</button>
                            <button type="button" class="btn btn-outline-warning">Warning</button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card shadow-sm border-0">
                <div class="card-body p-0">
                    <div class="table-responsive">
                        <table class="table table-hover table-striped tabla-precios m-0" id="tbResultados">
                            <thead class="table-dark">
                                <tr>
                                    <th>Producto</th>
                                    <th class="text-end">Precio Venta (Bs.)</th>
                                    <th class="text-center">Acción</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td colspan="3" class="text-center py-4 text-muted">Comienza a escribir para ver
                                                    resultados...</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <div class="modal fade" id="modalDetalle" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header bg-primary text-white">
                    <h5 class="modal-title" id="tituloModal">Detalle del Producto</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close">
                    </button>
                </div>
                <div class="modal-body text-center">
                    <h3 id="lblModalNombre">Coca Cola 2L</h3>
                    <p class="text-muted" id="lblModalDescripcion">Retornable</p>
                    <hr />
                    <h1 class="text-success fw-bold" id="lblModalPrecio">12.00 Bs.</h1>
                </div>
                <div class="modal-footer justify-content-center">
                    <button type="button" class="btn btn-secondary btn-lg" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
