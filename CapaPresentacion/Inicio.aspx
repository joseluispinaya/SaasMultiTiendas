<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="Inicio.aspx.cs" Inherits="CapaPresentacion.Inicio" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="assets/css/miestiloze.css?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" rel="stylesheet" type="text/css" />
    <%--<link href="assets/css/miestiloze.css" rel="stylesheet" type="text/css"/>--%>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
    <div class="col-12 m-b-30">
        <div class="hero-tienda shadow-lg">
            <div class="hero-overlay p-5 text-center">
                
                <img src="images/Mitienditaze.png" alt="Logo Mi Tienda" class="logo-hero mb-4 shadow">

                <h1 class="text-white font-weight-bold text-uppercase mb-2">
                    Panel Principal de Control
                </h1>
                <h4 class="text-white font-weight-light mb-4">
                    Gestión inteligente de inventario y ventas para tu negocio
                </h4>

                <hr class="divider-tienda">

            </div>
        </div>
    </div>
</div>

<div class="row">
    <div class="col-md-4 m-b-30">
        <div class="card tienda-card border-0 shadow-sm h-100">
            <div class="card-body text-center p-4">
                <div class="icon-circle tienda-bg-light mx-auto mb-3 shadow-sm">
                    <i class="fas fa-user-shield fa-2x tienda-text-primary"></i>
                </div>
                <h5 class="font-weight-bold text-dark">Usuarios del Sistema</h5>
                <p class="text-dark small">Administración de perfiles, permisos y asignación de cajeros.</p>
                <a href="PageUsuarios.aspx" class="btn btn-outline-tienda btn-sm mt-3">
                    Gestionar <i class="fas fa-arrow-right ml-1"></i>
                </a>
            </div>
        </div>
    </div>

    <div class="col-md-4 m-b-30">
        <div class="card tienda-card border-0 shadow-sm h-100">
            <div class="card-body text-center p-4">
                <div class="icon-circle tienda-bg-light mx-auto mb-3 shadow-sm">
                    <i class="fas fa-box-open fa-2x tienda-text-primary"></i>
                </div>
                <h5 class="font-weight-bold text-dark">Inventario y Precios</h5>
                <p class="text-dark small">Configuración de stock, descripción y precios de compra/venta.</p>
                <a href="PageProductos.aspx" class="btn btn-outline-tienda btn-sm mt-3">
                    Configurar <i class="fas fa-arrow-right ml-1"></i>
                </a>
            </div>
        </div>
    </div>

    <div class="col-md-4 m-b-30">
        <div class="card tienda-card border-0 shadow-sm h-100">
            <div class="card-body text-center p-4">
                <div class="icon-circle tienda-bg-light mx-auto mb-3 shadow-sm">
                    <i class="fas fa-search fa-2x tienda-text-primary"></i>
                </div>
                <h5 class="font-weight-bold text-dark">Buscador Rápido</h5>
                <p class="text-dark small">Consulta instantánea de productos registrados en caja.</p>
                <a href="PageBuscador.aspx" class="btn btn-outline-tienda btn-sm mt-3">
                    Buscar <i class="fas fa-arrow-right ml-1"></i>
                </a>
            </div>
        </div>
    </div>
</div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
