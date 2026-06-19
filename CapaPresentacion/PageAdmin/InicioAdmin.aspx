<%@ Page Title="" Language="C#" MasterPageFile="~/PageAdmin/AdminMaster.Master" AutoEventWireup="true" CodeBehind="InicioAdmin.aspx.cs" Inherits="CapaPresentacion.PageAdmin.InicioAdmin" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../assets/css/miestiloze.css" rel="stylesheet" type="text/css"/>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-12 m-b-30">
            <div class="hero-emi shadow">
                <div class="hero-overlay p-5 text-center">
                    <img src="../assets/images/mitienda.png" alt="Logo EMI" class="logo-hero mb-4 shadow-sm">

                    <h1 class="text-white font-weight-bold text-uppercase mb-2">Sistema de Gestión de Productos
                    </h1>
                    <h4 class="text-warning font-weight-light mb-4">Sistema de control de inventario de productos multi-tienda
                    </h4>

                    <hr class="divider-emi">

                    <%--<p class="text-white-50 mt-4 mb-4" style="font-size: 1.1rem;">
                        Automatización, control y precisión en el consulta de productos.
                    </p>--%>

                    <%--<button type="button" class="btn btn-emi-warning btn-lg px-5 shadow font-weight-bold">
                        <i class="fas fa-calendar-check mr-2"></i>Ir al Buscador de Productos
                    </button>--%>
                </div>
            </div>
        </div>
    </div>

    <div class="row">

        <div class="col-md-4 m-b-30">
            <div class="card emi-card border-0 shadow-sm h-100">
                <div class="card-body text-center p-4">
                    <div class="icon-circle emi-bg-light mx-auto mb-3 shadow-sm">
                        <i class="fas fa-chalkboard-teacher fa-2x emi-text-primary"></i>
                    </div>
                    <h5 class="font-weight-bold text-dark">Usuarios Sis</h5>
                    <p class="text-muted small">Administración de perfiles, datos personales y asignaciones de roles.</p>
                    <button class="btn btn-outline-emi btn-sm mt-2">Gestionar <i class="fas fa-arrow-right ml-1"></i></button>
                </div>
            </div>
        </div>

        <div class="col-md-4 m-b-30">
            <div class="card emi-card border-0 shadow-sm h-100">
                <div class="card-body text-center p-4">
                    <div class="icon-circle emi-bg-light mx-auto mb-3 shadow-sm">
                        <i class="fas fa-clock fa-2x emi-text-primary"></i>
                    </div>
                    <h5 class="font-weight-bold text-dark">Productos y Precios</h5>
                    <p class="text-muted small">Configuración de productos descripcion y precios de compra y venta</p>
                    <button class="btn btn-outline-emi btn-sm mt-2">Configurar <i class="fas fa-arrow-right ml-1"></i></button>
                </div>
            </div>
        </div>

        <div class="col-md-4 m-b-30">
            <div class="card emi-card border-0 shadow-sm h-100">
                <div class="card-body text-center p-4">
                    <div class="icon-circle emi-bg-light mx-auto mb-3 shadow-sm">
                        <i class="fas fa-dollar-sign fa-2x emi-text-primary"></i>
                    </div>
                    <h5 class="font-weight-bold text-dark">Buscador de Productos</h5>
                    <p class="text-muted small">Consulta rapida de productos registrados en el sistema.</p>
                    <button class="btn btn-outline-emi btn-sm mt-2">Buscar <i class="fas fa-arrow-right ml-1"></i></button>
                </div>
            </div>
        </div>

    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
</asp:Content>
