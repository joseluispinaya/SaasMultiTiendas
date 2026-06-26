<%@ Page Title="" Language="C#" MasterPageFile="~/PageAdmin/AdminMaster.Master" AutoEventWireup="true" CodeBehind="PageNegocios.aspx.cs" Inherits="CapaPresentacion.PageAdmin.PageNegocios" %>
<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <link href="../assets/plugins/datatables/jquery.dataTables.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/responsive.bootstrap.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/datatables/dataTables.bootstrap4.min.css" rel="stylesheet" type="text/css" />
    <link href="../assets/plugins/bootstrap-datepicker/css/bootstrap-datepicker.min.css" rel="stylesheet">
</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="body" runat="server">
    <div class="row">

        <div class="col-lg-12">
            <div class="card">
                <div class="card-header bg-primary py-2 px-4">
                    <h3 class="card-title m-0 text-white"><i class="fas fa-bookmark mr-2"></i>Lista de Negocios</h3>
                </div>
                <div class="card-body">
                    <div class="border rounded p-3 shadow-sm bg-white mb-4" style="border-left: 4px solid #ffc107 !important;">
                        <div class="d-flex justify-content-between align-items-center flex-wrap">
                            <div class="mb-2 mb-md-0">
                                <h5 class="font-weight-bold text-dark m-0">
                                    <i class="fas fa-info-circle text-primary mr-2"></i>Gestión de Negocios
                                </h5>
                                <small class="text-muted">Presione el botón para registrar nuevo negocio</small>
                            </div>
                            <div>
                                <button type="button" id="btnAddNuevoReg" class="btn btn-sm btn-primary">
                                    <i class="fas fa-box-open mr-2"></i>NUEVO NEGOCIO
                                </button>
                            </div>
                        </div>
                    </div>
                    <div class="table-responsive">
                        <table id="tbNegocios" class="table table-sm table-striped table-bordered table-hover" cellspacing="0" width="100%">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Id</th>
                                    <th>Datos del Negocio</th>
                                    <th>Celular</th>
                                    <th>Fecha Suscripcion</th>
                                    <th>Vigencia</th>
                                    <th>Estado</th>
                                    <th>Opciones</th>
                                </tr>
                            </thead>
                            <tbody></tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <div class="modal fade" id="mdData" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="myModalLabel">Negocios</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="txtNombre">Nombre del Negocio</label>
                            <input type="text" class="form-control form-new input-validar" id="txtNombre" name="Nombre Negocio"
                                placeholder="Nombre del Negocio" autocomplete="off">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="txtNombrePropi">Nombre Propietario</label>
                            <input type="text" class="form-control form-new input-validar" id="txtNombrePropi" name="Nombre Completo"
                                placeholder="Nombre Completo" autocomplete="off">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="txtFechaIni">Fecha Inicio</label>
                            <input type="text" class="form-control form-new" id="txtFechaIni" readonly style="cursor: pointer;">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="txtFechaFin">Fecha Fin</label>
                            <input type="text" class="form-control form-new" id="txtFechaFin" readonly style="cursor: pointer;">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="txtNroCel">Nro Cel</label>
                            <input type="text" class="form-control form-new input-validar" id="txtNroCel" name="Nro cel">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="cboEstado">Estado</label>
                            <select class="form-control form-new" id="cboEstado">
                                <option value="1">Activo</option>
                                <option value="0">Inactivo</option>
                            </select>
                        </div>
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
    <script src="../assets/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="../assets/plugins/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="../assets/plugins/datatables/dataTables.responsive.min.js"></script>
    <script src="../assets/plugins/datatables/responsive.bootstrap4.min.js"></script>
    <script src="../assets/plugins/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>
    <script src="../assets/plugins/bootstrap-datepicker/datepicker-es.js"></script>
    <script src="jsAdmin/PageNegocios.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
