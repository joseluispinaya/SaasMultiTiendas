using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using CapaNegocio;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Services;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace CapaPresentacion
{
    public partial class PageUsuarios : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<bool> VerificarPermisoAccion()
        {
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return new Respuesta<bool> { Estado = false, Valor = "error", Mensaje = "Su sesión ha expirado. Recargue la página." };
            }

            try
            {
                EUsuarios usuari = (EUsuarios)HttpContext.Current.Session["UsuarioLogueado"];

                return NUsuarios.GetInstance().VerificarPermisoAccion(usuari.IdUsuario);
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Valor = "error", Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<List<ERoles>> ListaRoles()
        {
            return NUsuarios.GetInstance().ListaRoles();
        }


        [WebMethod(EnableSession = true)]
        public static Respuesta<int> GuardarOrEditUsuarios(EUsuarios objeto)
        {
            // 1. Validar Sesión
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return new Respuesta<int> { Estado = false, Valor = "error", Mensaje = "Su sesión ha expirado. Recargue la página." };
            }

            try
            {
                EUsuarios usuari = (EUsuarios)HttpContext.Current.Session["UsuarioLogueado"];

                objeto.IdNegocio = usuari.IdNegocio;

                var utilidades = Utilidadesj.GetInstance();

                // 2. Manejo de la clave
                if (objeto.IdUsuario == 0)
                {
                    objeto.ClaveHash = utilidades.Hash(objeto.NroCi);
                }
                else
                {
                    objeto.ClaveHash = "";
                }
                return NUsuarios.GetInstance().GuardarOrEditUsuarios(objeto);
            }
            catch (Exception ex)
            {
                return new Respuesta<int> { Estado = false, Valor = "error", Mensaje = "Error en el servidor: " + ex.Message };
            }
        }


        [WebMethod(EnableSession = true)]
        public static Respuesta<List<EUsuarios>> ListaUsuariosNegocio()
        {
            // 1. Validar Sesión
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
            {
                return new Respuesta<List<EUsuarios>> { Estado = false, Mensaje = "Su sesión ha expirado. Recargue la página." };
            }

            try
            {
                EUsuarios usuari = (EUsuarios)HttpContext.Current.Session["UsuarioLogueado"];

                return NUsuarios.GetInstance().ListaUsuariosNegocio(usuari.IdNegocio);
            }
            catch (Exception ex)
            {
                // Captura cualquier error no previsto en la capa de presentación
                return new Respuesta<List<EUsuarios>> { Estado = false, Mensaje = "Ocurrió un error inesperado: " + ex.Message };
            }
        }

        [WebMethod]
        public static Respuesta<bool> EstadoPermisos(int IdUsuario, bool Permisos)
        {
            try
            {
                Respuesta<bool> respuesta = NUsuarios.GetInstance().EstadoPermisos(IdUsuario, Permisos);
                return respuesta;
            }
            catch (Exception ex)
            {
                return new Respuesta<bool> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

    }
}