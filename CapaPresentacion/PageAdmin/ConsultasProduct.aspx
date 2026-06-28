<%@ Page Title="" Language="C#" MasterPageFile="~/PageAdmin/AdminMaster.Master" AutoEventWireup="true" CodeBehind="ConsultasProduct.aspx.cs" Inherits="CapaPresentacion.PageAdmin.ConsultasProduct" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">
        <div class="col-lg-12">
            <div class="card">
                <div class="card-header bg-primary py-2 px-4">
                    <h3 class="card-title m-0"><i class="fas fas fa-id-badge mr-2"></i>Lista de Productos Registrados</h3>
                </div>
                <div class="card-body">
                    <div class="row mb-4">
                        <div class="col-md-4">
                            <div class="alert alert-warning shadow-sm mb-4" style="border-left: 4px solid #ffc107 !important;">
                                <h5 class="font-weight-bold text-dark mb-1">
                                    <i class="fas fa-info-circle text-primary mr-2"></i>Productos - Negocio
                                </h5>
                                <p class="m-0 text-dark" style="font-size: 0.8rem;">
                                    <strong>Productos por Negocio.</strong>
                                </p>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="alert alert-warning shadow-sm mb-4" style="border-left: 4px solid #ffc107 !important;">
                                <div class="row align-items-end">
                                    <div class="col-md-8">
                                        <label class="small font-weight-bold text-dark mb-1">Seleccione un Negocio</label>
                                        <div class="input-group input-group-sm shadow-sm">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text bg-white"><i class="fas fa-store text-primary"></i></span>
                                            </div>
                                            <select class="custom-select custom-select-sm" id="cboNegocio">
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-md-4">
                                        <button type="button" id="btnReportes" class="btn btn-sm btn-primary shadow-sm font-weight-bold">
                                            <i class="fas fa-user-plus mr-2"></i>REPORTES
                                        </button>
                                    </div>
                                </div>
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
</asp:Content>
<asp:Content ID="Content3" ContentPlaceHolderID="footer" runat="server">
    <script src="../assets/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="../assets/plugins/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="../assets/plugins/datatables/dataTables.responsive.min.js"></script>
    <script src="../assets/plugins/datatables/responsive.bootstrap4.min.js"></script>

    <script src="jsAdmin/ConsultasProduct.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
