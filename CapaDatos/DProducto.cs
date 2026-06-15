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
    public class DProducto
    {
        #region "PATRON SINGLETON"
        private static DProducto instancia = null;
        private DProducto() { }
        public static DProducto GetInstance()
        {
            if (instancia == null)
            {
                instancia = new DProducto();
            }
            return instancia;
        }
        #endregion

        public Respuesta<string> RegistrarProducto(EProducto producto)
        {
            Respuesta<string> response = new Respuesta<string>();
            var respt = string.Empty;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_InsertarProducto", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdNegocio", producto.IdNegocio);
                        cmd.Parameters.AddWithValue("@Nombre", producto.Nombre);
                        cmd.Parameters.AddWithValue("@Descripcion", producto.Descripcion);
                        cmd.Parameters.AddWithValue("@PrecioCompra", producto.PrecioCompra);
                        cmd.Parameters.AddWithValue("@PrecioVenta", producto.PrecioVenta);

                        SqlParameter outputParam = new SqlParameter("@Codigo", SqlDbType.NVarChar, 50)
                        {
                            Direction = ParameterDirection.Output
                        };
                        cmd.Parameters.Add(outputParam);

                        con.Open();
                        cmd.ExecuteNonQuery();
                        respt = outputParam.Value.ToString();
                    }
                }

                response.Data = respt;

                // Interpretamos el código que devuelve tu SP
                if (!string.IsNullOrEmpty(respt))
                {
                    response.Estado = true;
                    response.Valor = "success";
                    response.Mensaje = "Registrado correctamente.";
                }
                else
                {
                    response.Estado = false;
                    response.Valor = "error";
                    response.Mensaje = "No se pudo guardar el producto. Es posible que los datos estén corruptos.";
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

        public Respuesta<int> ActualizarProducto(EProducto producto)
        {
            Respuesta<int> response = new Respuesta<int>();
            int resultadoCodigo = 0;

            try
            {
                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ActualizarProducto", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;

                        cmd.Parameters.AddWithValue("@IdProducto", producto.IdProducto);
                        cmd.Parameters.AddWithValue("@IdNegocio", producto.IdNegocio);
                        cmd.Parameters.AddWithValue("@Nombre", producto.Nombre);
                        cmd.Parameters.AddWithValue("@Descripcion", producto.Descripcion);
                        cmd.Parameters.AddWithValue("@PrecioCompra", producto.PrecioCompra);
                        cmd.Parameters.AddWithValue("@PrecioVenta", producto.PrecioVenta);

                        // Parámetro de salida
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
                    case 1:
                        response.Estado = true;
                        response.Valor = "success";
                        response.Mensaje = "Actualizado correctamente.";
                        break;

                    case 2:
                        response.Estado = false;
                        response.Valor = "warning";
                        response.Mensaje = "Producto no encontrado o intento de acceso no autorizado";
                        break;

                    case 0:
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
                response.Mensaje = "Error interno: " + ex.Message;
            }

            return response;
        }

        public Respuesta<List<ProductoListDTO>> ListaProductosPaginado(int IdNegocio, int Omitir, int TamanoPagina, string Buscar)
        {
            try
            {
                List<ProductoListDTO> rptLista = new List<ProductoListDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand cmd = new SqlCommand("usp_ListarProductosNegocioPaginado", con))
                    {
                        cmd.CommandType = CommandType.StoredProcedure;
                        cmd.Parameters.AddWithValue("@IdNegocio", IdNegocio);
                        cmd.Parameters.AddWithValue("@Omitir", Omitir);
                        cmd.Parameters.AddWithValue("@TamanoPagina", TamanoPagina);
                        // Si Buscar es null, mandamos cadena vacía para evitar errores en SQL
                        cmd.Parameters.AddWithValue("@Buscar", Buscar ?? "");

                        con.Open();

                        using (SqlDataReader dr = cmd.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ProductoListDTO
                                {
                                    IdProducto = Convert.ToInt32(dr["IdProducto"]),
                                    IdNegocio = Convert.ToInt32(dr["IdNegocio"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    Nombre = dr["Nombre"].ToString(),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    PrecioCompra = Convert.ToDecimal(dr["PrecioCompra"]),
                                    PrecioVenta = Convert.ToDecimal(dr["PrecioVenta"]),
                                    Activo = Convert.ToBoolean(dr["Activo"]),
                                    // Mapeo de los campos de paginación
                                    TotalRegistros = Convert.ToInt32(dr["TotalRegistros"]),
                                    TotalFiltrados = Convert.ToInt32(dr["TotalFiltrados"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ProductoListDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ProductoListDTO>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

        public Respuesta<List<ListaProdOfflineDTO>> ListaProductosOffline(int IdNegocio)
        {
            try
            {
                List<ListaProdOfflineDTO> rptLista = new List<ListaProdOfflineDTO>();

                using (SqlConnection con = ConexionBD.GetInstance().ConexionDB())
                {
                    using (SqlCommand comando = new SqlCommand("usp_ObtenerCatalogoOffline", con))
                    {
                        comando.CommandType = CommandType.StoredProcedure;
                        comando.Parameters.AddWithValue("@IdNegocio", IdNegocio);
                        con.Open();

                        using (SqlDataReader dr = comando.ExecuteReader())
                        {
                            while (dr.Read())
                            {
                                rptLista.Add(new ListaProdOfflineDTO
                                {
                                    IdProducto = Convert.ToInt32(dr["IdProducto"]),
                                    Codigo = dr["Codigo"].ToString(),
                                    Nombre = dr["Nombre"].ToString(),
                                    Descripcion = dr["Descripcion"].ToString(),
                                    PrecioVenta = Convert.ToDecimal(dr["PrecioVenta"])
                                });
                            }
                        }
                    }
                }
                return new Respuesta<List<ListaProdOfflineDTO>>()
                {
                    Estado = true,
                    Data = rptLista,
                    Mensaje = "Lista obtenidos correctamente"
                };
            }
            catch (Exception ex)
            {
                // Maneja cualquier error inesperado
                return new Respuesta<List<ListaProdOfflineDTO>>()
                {
                    Estado = false,
                    Mensaje = "Ocurrió un error: " + ex.Message,
                    Data = null
                };
            }
        }

    }
}
