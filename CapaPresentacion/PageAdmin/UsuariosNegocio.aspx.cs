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

namespace CapaPresentacion.PageAdmin
{
    public partial class UsuariosNegocio : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod]
        public static Respuesta<List<EUsuarios>> ObtenerUsuariosNegocio(int IdNegocio)
        {
            return NUsuarios.GetInstance().ListaUsuariosNegocio(IdNegocio);
        }

        [WebMethod]
        public static Respuesta<int> GuardarOrEditUsuarios(EUsuarios objeto)
        {
            try
            {
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


    }
}