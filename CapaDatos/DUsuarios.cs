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

    }
}
