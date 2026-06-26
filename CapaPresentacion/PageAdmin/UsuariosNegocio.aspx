<%@ Page Title="" Language="C#" MasterPageFile="~/PageAdmin/AdminMaster.Master" AutoEventWireup="true" CodeBehind="UsuariosNegocio.aspx.cs" Inherits="CapaPresentacion.PageAdmin.UsuariosNegocio" %>
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
                    <h3 class="card-title m-0"><i class="fas fas fa-id-badge mr-2"></i>Lista de Usuarios Registrados</h3>
                </div>
                <div class="card-body">
                    <div class="row mb-4">
                        <div class="col-md-4">
                            <div class="alert alert-warning shadow-sm mb-4" style="border-left: 4px solid #ffc107 !important;">
                                <h5 class="font-weight-bold text-dark mb-1">
                                    <i class="fas fa-info-circle text-primary mr-2"></i>Usuarios Negocio
                                </h5>
                                <p class="m-0 text-dark" style="font-size: 0.8rem;">
                                    <strong>Registro de usuarios.</strong>
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
                                        <button type="button" id="btnAddNuevoReg" class="btn btn-sm btn-primary shadow-sm font-weight-bold">
                                            <i class="fas fa-user-plus mr-2"></i>NUEVO USUARIO
                                        </button>
                                    </div>
                                </div>
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
                            <input type="text" class="form-control input-sm form-new input-validar" id="txtNombres" name="Nombre Completo"
                                placeholder="Nombre Completo" autocomplete="off">
                        </div>
                        <div class="form-group col-md-4">
                            <label for="txtNroci">Nro CI</label>
                            <input type="text" class="form-control input-sm form-new input-validar" id="txtNroci" name="Nro CI" autocomplete="off">
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-6">
                            <label for="txtNameuser">Nombre de Usuario</label>
                            <input type="text" class="form-control input-sm form-new input-validar" id="txtNameuser" name="Nombre Usuario"
                                placeholder="Ej. fercho2000" autocomplete="off">
                        </div>
                        <div class="form-group col-md-6">
                            <label for="cboRoles">Rol</label>
                            <select class="custom-select custom-select-sm" id="cboRoles">
                            </select>
                        </div>
                    </div>

                    <div class="form-row">
                        <div class="form-group col-md-7">
                            <label for="cboNegocioModal">Negocio</label>
                            <select class="custom-select custom-select-sm" id="cboNegocioModal">
                            </select>
                        </div>
                        <div class="form-group col-md-5">
                            <label for="cboEstado">Estado</label>
                            <select class="custom-select custom-select-sm" id="cboEstado">
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

    <script src="jsAdmin/UsuariosNegocio.js?v=<%= DateTime.Now.ToString("yyyyMMddHHmmss") %>" type="text/javascript"></script>
</asp:Content>
