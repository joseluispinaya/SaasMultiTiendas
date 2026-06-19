using CapaEntidad.Entidades;
using CapaEntidad.Responses;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CapaDatos
{
    public class DNegocios
    {
        #region "PATRON SINGLETON"
        private static DNegocios instancia = null;
        private DNegocios() { }
        public static DNegocios GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DNegocios();
            }
            return instancia;
        }
        #endregion

        public Respuesta<List<ENegocios>> ListaNegocios()
        {
            try
            {
                List<ENegocios> rptLista = new List<ENegocios>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerNegocios", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ENegocios
                                {
                                    IdNegocio = Convert.ToInt32(dr["IdNegocio"]),
                                    NombreTienda = dr["NombreTienda"].ToString(),
                                    NombrePropietario = dr["NombrePropietario"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    FechaInicio = Convert.ToDateTime(dr["FechaInicioSuscripcion"]).ToString("dd/MM/yyyy"),
                                    FechaFin = Convert.ToDateTime(dr["FechaVencimientoSuscripcion"]).ToString("dd/MM/yyyy"),
                                    Activo = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ENegocios>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ENegocios>>()
                {
                    Estado = false,
                    Mensaje = $"Error al obtener la lista: {ex.Message}",
                    Data = null
                };
            }
        }
    }
}
