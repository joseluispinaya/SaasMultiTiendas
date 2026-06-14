using CapaDatos;
using CapaEntidad.DTOs;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class NProducto
    {
        #region "PATRON SINGLETON"
        private static NProducto instancia = null;
        private NProducto() { }
        public static NProducto GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NProducto();
            }
            return instancia;
        }
        #endregion

        public Respuesta<string> RegistrarProducto(EProducto producto)
        {
            return DProducto.GetInstance().RegistrarProducto(producto);
        }

        public Respuesta<int> ActualizarProducto(EProducto producto)
        {
            return DProducto.GetInstance().ActualizarProducto(producto);
        }

        public Respuesta<List<ProductoListDTO>> ListaProductosPaginado(int IdNegocio, int Omitir, int TamanoPagina, string Buscar)
        {
            return DProducto.GetInstance().ListaProductosPaginado(IdNegocio, Omitir, TamanoPagina, Buscar);
        }
    }
}
