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
    public class DUsuarios
    {
        #region "PATRON SINGLETON"
        private static DUsuarios conexion = null;

        private DUsuarios() { }

        public static DUsuarios GetInstance()
        {
            if (conexion == null)
            {
                conexion = new DUsuarios();
            }
            return conexion;
        }
        #endregion

        public Respuesta<EUsuarios> LoginUsuario(string UsuarioSis)
        {
            try
            {
                EUsuarios obj = null;

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_LoginUsuario", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@UsuarioSis", UsuarioSis);

                        con.Open();
                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            if (dr.Read())
                            {
                                obj = new EUsuarios
                                {
                                    IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                                    IdNegocio = Convert.ToInt32(dr["IdNegocio"]),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    NroCi = dr["NroCi"].ToString(),
                                    NombreCompleto = dr["NombreCompleto"].ToString(),
                                    UsuarioSis = dr["UsuarioSis"].ToString(),
                                    ClaveHash = dr["ClaveHash"].ToString(),
                                    Permisos = Convert.ToBoolean(dr["Permisos"]),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    NombreTienda = dr["NombreTienda"].ToString(),
                                    RolDescripcion = dr["RolDescripcion"].ToString()
                                };
                            }
                        }
                    }
                }

                return new Respuesta<EUsuarios>
                {
                    Estado = obj != null,
                    Data = obj,
                    Mensaje = obj != null ? "Bienvenido usuario" : "Usuario o Contraseña incorrectos."
                };
            }
            catch (Exception)
            {
                return new Respuesta<EUsuarios>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error en el servidor. Intente más tarde.",
                    Data = null
                };
            }
        }

        public Respuesta<List<EUsuarios>> ListaUsuariosNegocio(int IdNegocio)
        {
            try
            {
                List<EUsuarios> rptLista = new List<EUsuarios>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ListaUsuariosPorNegocio", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdNegocio", IdNegocio);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new EUsuarios
                                {
                                    IdUsuario = Convert.ToInt32(dr["IdUsuario"]),
                                    IdNegocio = Convert.ToInt32(dr["IdNegocio"]),
                                    IdRol = Convert.ToInt32(dr["IdRol"]),
                                    NroCi = dr["NroCi"].ToString(),
                                    NombreCompleto = dr["NombreCompleto"].ToString(),
                                    UsuarioSis = dr["UsuarioSis"].ToString(),
                                    Permisos = Convert.ToBoolean(dr["Permisos"]),
                                    Activo = Convert.ToBoolean(dr["Activo"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<EUsuarios>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<EUsuarios>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<bool> VerificarEstado(int IdNegocio)
        {
            Respuesta<bool> response = new Respuesta<bool>();
            bool result = false;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_VerificarEstado", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdNegocio", IdNegocio);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        result = Convert.ToBoolean(outputParam.Value);
                    }
                }

                response.Data = result;

                // Interpretamos el código que devuelve tu SP
                if (result)
                {
                    response.Estado = true;
                    response.Valor = "success";
                    response.Mensaje = "Suscripcion Activa.";
                }
                else
                {
                    response.Estado = false;
                    response.Valor = "error";
                    response.Mensaje = "Su suscripción ha finalizado. Comuníquese con el administrador.";
                }

            }
            catch (Exception ex)
            {
                response.Estado = false;
                response.Valor = "error";
                response.Mensaje = "Error en Base de Datos: " + ex.Message;
            }

            return response;
        }

        public Respuesta<bool> EstadoPermisos(int IdUsuario, bool Permisos)
        {
            try
            {
                bool respuesta;
                //bool respuesta = false;
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_PermisosModif", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdUsuario", IdUsuario);
                        cmd.Parameters.AddWithValue("@Permisos", Permisos);

                        SqlParameter outputParam = new SqlParameter("@Resultado", SqlDbType.Bit)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respuesta = Convert.ToBoolean(outputParam.Value);
                    }
                }
                return new Respuesta<bool>
                {
                    Estado = respuesta,
                    Mensaje = respuesta ? "El estado se actualizo" : "Error al actualizar intente mas tarde"
                };
            }
            catch (Exception ex)
            {
                return new Respuesta<bool>
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message
                };
            }
        }

    }
}
