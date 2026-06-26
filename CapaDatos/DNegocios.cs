using CapaEntidad.DTOs;
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

        public Respuesta<int> GuardarOrEditNegocios(NegocioDTO oModel)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;
            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_GuardarOrEditNegocio", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdNegocio", oModel.IdNegocio);
                        cmd.Parameters.AddWithValue("@NombreTienda", oModel.NombreTienda);
                        cmd.Parameters.AddWithValue("@NombrePropietario", oModel.NombrePropietario);
                        cmd.Parameters.AddWithValue("@Celular", oModel.Celular);
                        cmd.Parameters.AddWithValue("@FechaInicioSuscripcion", oModel.FechaInicioDate);
                        cmd.Parameters.AddWithValue("@FechaVencimientoSuscripcion", oModel.FechaFinDate);
                        cmd.Parameters.AddWithValue("@Activo", oModel.Activo);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Int)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);
                        con.Open();
                        cmd.ExecuteNonQuery();
                        resultadoCodigo = Convert.ToInt32(outputParam.Value);
                    }
                }
                response.Data = resultadoCodigo;
                switch (resultadoCodigo)
                {
                    case 1: // Duplicado
                        response.Estado = false;
                        response.Valor = "warning";
                        response.Mensaje = "Ya existe un negocio con el mismo nombre.";
                        break;

                    case 2: // Registro Nuevo
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Registrado correctamente.";
                        break;

                    case 3: // Actualización
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Actualizado correctamente.";
                        break;

                    case 0: // Error
                    default:
                        response.Estado = false;
                        response.Valor = "error";
                        response.Mensaje = "No se pudo completar la operación.";
                        break;
                }
            }
            catch (Exception ex)
            {
                response.Estado = false;
                response.Valor = "error";
                response.Mensaje = $"Error interno: {ex.Message}";
            }
            return response;
        }

        public Respuesta<List<NegocioDTO>> ListaNegocios()
        {
            try
            {
                List<NegocioDTO> rptLista = new List<NegocioDTO>();

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
                                rptLista.Add(new NegocioDTO
                                {
                                    IdNegocio = Convert.ToInt32(dr["IdNegocio"]),
                                    NombreTienda = dr["NombreTienda"].ToString(),
                                    NombrePropietario = dr["NombrePropietario"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    FechaInicio = Convert.ToDateTime(dr["FechaInicioSuscripcion"]).ToString("dd/MM/yyyy"),
                                    FechaInicioDate = Convert.ToDateTime(dr["FechaInicioSuscripcion"]),
                                    FechaFin = Convert.ToDateTime(dr["FechaVencimientoSuscripcion"]).ToString("dd/MM/yyyy"),
                                    FechaFinDate = Convert.ToDateTime(dr["FechaVencimientoSuscripcion"]),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    NroUsuarios = Convert.ToInt32(dr["NroUsuarios"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<NegocioDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<NegocioDTO>>()
                {
                    Estado = false,
                    Mensaje = $"Error al obtener la lista: {ex.Message}",
                    Data = null
                };
            }
        }

        public Respuesta<NegocioDTO> DatosNegocio(int IdNegocio)
        {
            try
            {
                NegocioDTO obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerDatosNegocio", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdNegocio", IdNegocio);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                obj = new NegocioDTO
                                {
                                    IdNegocio = Convert.ToInt32(dr["IdNegocio"]),
                                    NombreTienda = dr["NombreTienda"].ToString(),
                                    NombrePropietario = dr["NombrePropietario"].ToString(),
                                    Celular = dr["Celular"].ToString(),
                                    FechaInicio = Convert.ToDateTime(dr["FechaInicioSuscripcion"]).ToString("dd/MM/yyyy"),
                                    FechaInicioDate = Convert.ToDateTime(dr["FechaInicioSuscripcion"]),
                                    FechaFin = Convert.ToDateTime(dr["FechaVencimientoSuscripcion"]).ToString("dd/MM/yyyy"),
                                    FechaFinDate = Convert.ToDateTime(dr["FechaVencimientoSuscripcion"]),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    NroUsuarios = Convert.ToInt32(dr["NroUsuarios"])
                                };
                            }
                        }
                    }
                }

                return new Respuesta<NegocioDTO>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Informacion Negocio" : "No se encontro informacion del Negocio."
                };
            }
            catch (Exception)
            {
                return new Respuesta<NegocioDTO>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error en el servidor. Intente más tarde.",
                    Data = null
                };
            }
        }

    }
}
