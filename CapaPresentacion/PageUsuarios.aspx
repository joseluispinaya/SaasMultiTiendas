<%@ Page Title="" Language="C#" MasterPageFile="~/PageMaster.Master" AutoEventWireup="true" CodeBehind="PageUsuarios.aspx.cs" Inherits="CapaPresentacion.PageUsuarios" %>
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
                    <h3 class="card-title m-0"><i class="fas fas fa-id-badge mr-2"></i>Lista de Usuarios Registrados</h3>
                </div>
                <div class="card-body">
                    <div class="border rounded p-3 shadow-sm bg-white mb-4" style="border-left: 4px solid #ffc107 !important;">
                        <div class="d-flex justify-content-between align-items-center flex-wrap">
                            <div class="mb-2 mb-md-0">
                                <h4 class="font-weight-bold text-dark m-0">
                                    <i class="fas fa-info-circle text-primary mr-2"></i>Gestión de Usuarios
                                </h4>
                                <small class="text-muted" style="font-size: 14px;">Presione el botón para registrar un nuevo usuario para el manejo del sistema.</small>
                            </div>
                            <div>
                                <button type="button" id="btnAddNuevoReg" class="btn btn-lg btn-primary">
                                    <i class="fas fa-user-plus mr-2"></i>NUEVO USUARIO
                                </button>
                            </div>
                        </div>
                    </div>


                    <div class="table-responsive">
                        <table class="table table-striped table-bordered table-hover align-middle" id="tbUsuarios" cellspacing="0" width="100%">
                            <thead class="thead-dark">
                                <tr>
                                    <th>Nombre Completo</th>
                                    <th>Usuario</th>
                                    <th class="text-center">Nro CI</th>
                                    <th class="text-center">Permiso</th>
                                    <th class="text-center">Estado</th>
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

    <div class="modal fade" id="modalUsuarios" tabindex="-1" role="dialog" aria-labelledby="tituloLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h4 class="modal-title m-0" id="tituloLabel">Usuario</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">×</button>
                </div>
                <div class="modal-body">

                    <div class="form-row">
                        <div class="form-group col-md-8">
                            <label for="txtNombres">Nombre Completo</label>
                            <input type="text" class="form-control form-new input-validar" id="txtNombres" name="Nombre Completo"
                                placeholder="Nombre Completo" autocomplete="off">
                        </div>
                        <div class="form-group col-md-4">
                            <label for="txtNroci">Nro CI</label>
                            <input type="text" class="form-control form-new input-validar" id="txtNroci" name="Nro CI" autocomplete="off">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="txtNameuser">Nombre de Usuario</label>
                            <input type="text" class="form-control form-new input-validar" id="txtNameuser" name="Nombre Usuario"
                                placeholder="Ej. fercho2000" autocomplete="off">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="cboRoles">Rol</label>
                            <select class="custom-select" id="cboRoles">
                            </select>
                        </div>
                    </div>

                    <div class="row justify-content-center">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label for="cboEstado">Estado</label>
                                <select class="form-control form-new" id="cboEstado">
                                    <option value="1">Activo</option>
                                    <option value="0">Inactivo</option>
                                </select>
                            </div>
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

    <script src="assets/plugins/datatables/jquery.dataTables.min.js"></script>
    <script src="assets/plugins/datatables/dataTables.bootstrap4.min.js"></script>

    <script src="assets/plugins/datatables/dataTables.responsive.min.js"></script>
    <script src="assets/plugins/datatables/responsive.bootstrap4.min.js"></script>

    <script src="js/PageUsuarios.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
