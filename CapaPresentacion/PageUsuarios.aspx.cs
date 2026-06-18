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