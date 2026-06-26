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

        public Respuesta<List<NegocioDTO>> ListaNegocios()
        {
            return DNegocios.GetInstance().ListaNegocios();
        }

        public Respuesta<NegocioDTO> DatosNegocio(int IdNegocio)
        {
            return DNegocios.GetInstance().DatosNegocio(IdNegocio);
        }

        public Respuesta<int> GuardarOrEditNegocios(NegocioDTO oModel)
        {
            return DNegocios.GetInstance().GuardarOrEditNegocios(oModel);
        }

    }
}
