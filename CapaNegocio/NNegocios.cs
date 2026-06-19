using CapaDatos;
using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaNegocio
{
    public class NNegocios
    {
        #region "PATRON SINGLETON"
        private static NNegocios instancia = null;
        private NNegocios() { }
        public static NNegocios GetInstance()
        {
            if (instancia == null)
            {
                instancia = new NNegocios();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<ENegocios>> ListaNegocios()
        {
            return DNegocios.GetInstance().ListaNegocios();
        }
    }
}
