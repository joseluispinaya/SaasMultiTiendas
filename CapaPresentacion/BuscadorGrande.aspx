<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="BuscadorGrande.aspx.cs" Inherits="CapaPresentacion.BuscadorGrande" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        .input-buscador-gigante {
            font-size: 1.2rem !important; /* Letra muy grande para escribir el producto */
            height: 55px;
            text-transform: uppercase; /* Facilita la lectura */
            border: 2px solid #0d6efd;
            border-radius: 10px;
        }
            .input-buscador-gigante:focus {
                background-color: #ffffff;
                border-color: #80bdff; /* Borde azul claro */
                box-shadow: 0 0 0 0.2rem rgba(50, 146, 224, 0.25) !important;
            }

        .card-producto {
            transition: transform 0.2s ease, box-shadow 0.2s ease;
            border: 1px solid #b8c2cc !important; /* Gris mucho más definido que el por defecto */
            border-top: 4px solid #17a2b8 !important; /* Borde superior grueso color Info (Cyan) */
            border-radius: 10px;
        }

            /* Efecto al pasar el mouse (se eleva un poco y proyecta más sombra) */
            .card-producto:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1) !important;
                border-color: #17a2b8 !important; /* El borde completo se pinta de celeste al tocarlo */
            }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card shadow-sm mb-4 border-0" style="border-top: 5px solid #ffc107 !important;">

                <div class="card-body">
                    <div class="border rounded p-3 shadow-sm bg-white mb-4" style="border-left: 4px solid #ffc107 !important;">
                        <div class="row">
                            <div class="col-md-6">

                                <div class="alert alert-info mb-4">
                                    <div class="mb-2 mb-md-0">
                                        <h4 class="font-weight-bold">
                                            <i class="fas fa-info-circle text-primary mr-2"></i>Busqueda de Productos
                                        </h4>
                                        <small class="text-dark" style="font-size: 14px;">Buscador de productos personalizado con fuente de tamaño grande para el inventario.</small>
                                    </div>
                                </div>
                            </div>
                            <div class="col-md-6 text-center">
                                <h4 class="font-weight-bold text-dark border-bottom pb-2">
                                    <i class="fas fa-search mr-2 text-primary"></i>¿Qué producto buscas?
                                </h4>

                                <input type="text" id="txtBuscarProducto" class="form-control input-lg input-buscador-gigante text-center"
                                    placeholder="Nombre del producto aquí..." autocomplete="off">
                            </div>
                        </div>
                    </div>

                    <%--<div id="alertaObservacion" class="alert alert-warning shadow-sm mb-4" style="display: none; border-left: 4px solid #ffc107 !important;">
                        <h4 class="font-weight-bold text-danger mb-1" id="lblTituloAlerta">
                            <i class="fas fa-exclamation-triangle mr-2"></i>Atención
                        </h4>
                        <p class="m-0 small text-dark" style="font-size: 14px;">
                            <strong>Resultados: </strong>
                            <span id="lblMotivoAuditoria">No se encontro resultados...</span>
                        </p>
                    </div>--%>

                    <div class="row justify-content-center" id="alertaSinresult" style="display: none;">
                        <div class="col-md-8 col-lg-6">
                            <div class="alert alert-warning shadow-sm mb-4" style="border-left: 4px solid #ffc107 !important;">
                                <h4 class="font-weight-bold text-danger mb-1">
                                    <i class="fas fa-exclamation-triangle mr-2"></i>Atención
                                </h4>
                                <p class="m-0 text-dark" style="font-size: 1.1rem;">
                                    <strong>No se encontraron resultados...</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="row mt-3" id="contenedorListProduct">
                    </div>

                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/BuscadorGrande.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
