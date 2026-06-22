<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="PageReportes.aspx.cs" Inherits="CapaPresentacion.PageReportes" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <style>
        /* Efectos para que los planes se vean como botones clickeables */
        .plan-card {
            transition: all 0.3s ease;
            cursor: pointer;
            border: 2px solid #dee2e6; /* Borde gris claro por defecto para todas las tarjetas */
            border-radius: 12px;
        }

            .plan-card:hover {
                transform: translateY(-5px);
                box-shadow: 0 10px 20px rgba(0,0,0,0.1) !important;
                border-color: #0d6efd; /* Borde azul al pasar el mouse */
            }

            .plan-card.plan-destacado {
                border: 2px solid #ffc107; /* Borde dorado resaltado */
                position: relative;
            }

        .badge-recomendado {
            position: absolute;
            top: -14px; /* Subimos el badge para que corte exactamente el borde superior */
            left: 50%;
            transform: translateX(-50%);
            background: #ffc107;
            color: #000;
            padding: 4px 14px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 900;
            box-shadow: 0 4px 6px rgba(0,0,0,0.15); /* Sombra un poco más pronunciada */
        }

        .modal .modal-dialog .modal-content {
            padding: 0 !important;
            border-radius: 0.3rem !important; /* Mantiene los bordes suavemente redondeados */
        }
    </style>
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row" id="cargando">
        
        <div class="col-lg-4 mb-4">
            <div class="card shadow-sm border-0 h-100" style="border-top: 5px solid #17a2b8 !important;">
                <div class="card-body py-2 px-4">
                    <h5 class="font-weight-bold text-dark mb-4 border-bottom pb-2">
                        <i class="fas fa-store mr-2 text-info"></i>Mi Negocio
                    </h5>
                    
                    <div class="mb-3">
                        <small class="text-muted d-block"><i class="fas fa-building mr-1"></i> Tienda:</small>
                        <span class="font-weight-bold text-dark" id="lblInfoTienda" style="font-size: 1.1rem;">Cargando...</span>
                    </div>
                    
                    <div class="mb-3">
                        <small class="text-muted d-block"><i class="fas fa-user-tie mr-1"></i> Propietario:</small>
                        <span class="text-dark" id="lblInfoPropietario">Cargando...</span>
                    </div>

                    <div class="row">
                        <div class="col-md-6">
                            <small class="text-muted d-block"><i class="fas fa-mobile-alt mr-1"></i> Celular:</small>
                            <span class="text-dark" id="lblInfoCelular">Cargando...</span>
                        </div>
                        <div class="col-md-6">
                            <small class="text-muted d-block"><i class="fas fa-id-badge mr-1"></i> Nro User:</small>
                            <span class="text-dark" id="lblNroUser">Cargando...</span>
                        </div>
                    </div>

                    <%--<div class="mb-3">
                        <small class="text-muted d-block"><i class="fas fa-mobile-alt mr-1"></i> Celular:</small>
                        <span class="text-dark" id="lblInfoCelular">Cargando...</span>
                    </div>--%>

                    <hr>

                    <div class="row">
                        <div class="col-md-6">
                            <small class="text-muted d-block"><i class="far fa-calendar-alt mr-1"></i> Vencimiento:</small>
                            <h4 class="text-danger font-weight-bold mt-1" id="lblInfoVencimiento">--/--/----</h4>
                        </div>
                        <div class="col-md-6">
                            <small class="text-muted d-block mb-1">Suscripción:</small>
                            <span class="badge badge-success p-2" id="lblInfoEstado" style="font-size: 0.8rem;">
                                <i class="fas fa-check-circle mr-1"></i> ACTIVA
                            </span>
                        </div>
                    </div>

                    <%--<div class="mb-3">
                        <small class="text-muted d-block"><i class="far fa-calendar-alt mr-1"></i> Vencimiento:</small>
                        <h4 class="text-danger font-weight-bold mt-1" id="lblInfoVencimiento">--/--/----</h4>
                    </div>

                    <div>
                        <small class="text-muted d-block mb-1">Estado de Suscripción:</small>
                        <span class="badge badge-success p-2" id="lblInfoEstado" style="font-size: 0.9rem;">
                            <i class="fas fa-check-circle mr-1"></i> Cargando...
                        </span>
                    </div>--%>

                </div>
            </div>
        </div>

        <div class="col-lg-8 mb-4">
            <div class="card shadow-sm border-0 h-100" style="border-top: 5px solid #ffc107 !important;">
                <div class="card-body py-2 px-4">

                    <h5 class="font-weight-bold text-dark mb-4 border-bottom pb-2">
                        <i class="fas fa-hand-holding-usd mr-2 text-warning"></i>Actualizar Suscripción
                    </h5>

                    <div class="alert alert-info border-0 shadow-sm mb-4">
                        <div class="d-flex align-items-center">
                            <i class="fas fa-info-circle fa-2x mr-3 text-info"></i>
                            <div>
                                <h6 class="font-weight-bold text-dark m-0">Seleccione un Plan</h6>
                                <p class="text-muted m-0 small">Elija el tiempo que desea renovar su sistema. Al hacer clic, le mostraremos los pasos a seguir.</p>
                            </div>
                        </div>
                    </div>

                    <div class="row">

                        <div class="col-md-4 mb-3">
                            <div class="card bg-light plan-card h-100 text-center p-3" data-plan="3 Meses" data-precio="150.00">
                                <h6 class="text-muted font-weight-bold mb-2">BÁSICO</h6>
                                <h3 class="font-weight-bold text-dark mb-1">3 Meses</h3>
                                <h4 class="text-primary font-weight-bold mb-3">150 Bs.</h4>
                                <ul class="list-unstyled text-left small text-muted mb-0">
                                    <li class="mb-1"><i class="fas fa-check text-success mr-2"></i>Soporte Técnico</li>
                                    <li class="mb-1"><i class="fas fa-check text-success mr-2"></i>Actualizaciones</li>
                                    <li><i class="fas fa-times text-danger mr-2"></i>Respaldo en Nube</li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-md-4 mb-3">
                            <div class="card bg-white plan-card plan-destacado shadow-sm h-100 text-center p-3" data-plan="6 Meses" data-precio="280.00">
                                <span class="badge-recomendado">MÁS POPULAR</span>

                                <h6 class="text-muted font-weight-bold mb-2 mt-4">ESTÁNDAR</h6>

                                <h3 class="font-weight-bold text-dark mb-1">6 Meses</h3>
                                <h4 class="text-warning font-weight-bold mb-3">280 Bs.</h4>
                                <ul class="list-unstyled text-left small text-muted mb-0">
                                    <li class="mb-1"><i class="fas fa-check text-success mr-2"></i>Soporte Prioritario</li>
                                    <li class="mb-1"><i class="fas fa-check text-success mr-2"></i>Actualizaciones</li>
                                    <li><i class="fas fa-check text-success mr-2"></i>Respaldo Diario</li>
                                </ul>
                            </div>
                        </div>

                        <div class="col-md-4 mb-3">
                            <div class="card bg-light plan-card h-100 text-center p-3" data-plan="1 Año" data-precio="500.00">
                                <h6 class="text-muted font-weight-bold mb-2">PREMIUM</h6>
                                <h3 class="font-weight-bold text-dark mb-1">1 Año</h3>
                                <h4 class="text-danger font-weight-bold mb-3">540 Bs.</h4>
                                <ul class="list-unstyled text-left small text-muted mb-0">
                                    <li class="mb-1"><i class="fas fa-check text-success mr-2"></i>Soporte 24/7</li>
                                    <li class="mb-1"><i class="fas fa-check text-success mr-2"></i>Nuevas Funciones</li>
                                    <li><i class="fas fa-check text-success mr-2"></i>Ahorro del 10%</li>
                                </ul>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>

    </div>

    <div class="modal fade" id="modalPlan" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow">
                <div class="modal-header bg-primary text-white py-2 px-3">
                    <h5 class="modal-title text-white m-0"><i class="fas fa-shopping-cart mr-2"></i>Confirmar Renovación</h5>
                    <button type="button" class="close text-white" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body text-center p-4">
                    <h6 class="text-muted mb-2">Usted ha seleccionado el plan:</h6>
                    <h2 class="font-weight-bold text-dark mb-1" id="lblModalPlanNombre">--</h2>
                    <h3 class="text-success font-weight-bold mb-4" id="lblModalPlanPrecio">0.00 Bs.</h3>
                    
                    <div class="alert alert-warning text-left small">
                        <i class="fas fa-exclamation-triangle mr-1"></i> 
                        Para activar este plan, por favor realice una transferencia QR o depósito al número de cuenta proporcionado y comuníquese con el administrador enviando su comprobante.
                    </div>
                </div>
                <div class="modal-footer justify-content-center bg-light">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                    <button type="button" class="btn btn-success" id="btnContactarAdmin">
                        <i class="fab fa-whatsapp mr-2"></i>Contactar para Pagar
                    </button>
                </div>
            </div>
        </div>
    </div>
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="js/PageReportes.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
