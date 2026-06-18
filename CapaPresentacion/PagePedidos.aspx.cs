using CapaEntidad.DTOs;
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
    public partial class PagePedidos : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

        }

        [WebMethod(EnableSession = true)]
        public static Respuesta<List<ListaProdOfflineDTO>> BuscarProductosSelect2(string busqueda)
        {
            if (HttpContext.Current.Session["UsuarioLogueado"] == null)
                return new Respuesta<List<ListaProdOfflineDTO>> { Estado = false, Mensaje = "Sesión expirada" };

            EUsuarios usuari = (EUsuarios)HttpContext.Current.Session["UsuarioLogueado"];

            // Llamamos a la capa de datos
            return NProducto.GetInstance().ObtenerFiltroProductoNegocio(usuari.IdNegocio, busqueda);
        }

    }
}