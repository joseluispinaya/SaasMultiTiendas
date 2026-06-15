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
    public partial class Login : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            Response.AppendHeader("Cache-Control", "no-store");
        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<EUsuarios> InicioSesion(string Usuario, string Clave)
        {
            try
            {
                var resp = NUsuarios.GetInstance().LoginUsuario(Usuario);

                if (!resp.Estado || resp.Data == null)
                {
                    return new Respuesta<EUsuarios> { Estado = false, Mensaje = resp.Mensaje };
                }

                var objUser = resp.Data;

                // Validar Estado
                if (!objUser.Activo)
                {
                    return new Respuesta<EUsuarios> { Estado = false, Mensaje = "Su cuenta se encuentra inactiva." };
                }

                // Verificamos la contraseña (BCrypt)
                bool passCorrecta = Utilidadesj.GetInstance().Verify(Clave, objUser.ClaveHash);

                if (!passCorrecta)
                {
                    return new Respuesta<EUsuarios> { Estado = false, Mensaje = "Usuario o Contraseña incorrectos." };
                }

                // Seguridad: Limpiamos la clave antes de guardarla en sesión
                objUser.ClaveHash = "";

                // Guardamos en sesión el objeto limpio
                HttpContext.Current.Session["UsuarioLogueado"] = objUser;
                HttpContext.Current.Session["TipoUsuario"] = "UsuarioTienda";

                return new Respuesta<EUsuarios>
                {
                    Estado = true,
                    Data = objUser,
                    Valor = "Inicio.aspx",
                    Mensaje = "Bienvenido al sistema"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<EUsuarios> { Estado = false, Mensaje = "Ocurrió un error: " + ex.Message };
            }
        }

    }
}