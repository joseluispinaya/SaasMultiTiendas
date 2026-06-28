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
    public class NUsuarios
    {
        #region "PATRON SINGLETON"
        private static NUsuarios conexion = null;
        private NUsuarios() { }
        public static NUsuarios GetInstance()
        {
            if (conexion == null)
            {
                conexion = new NUsuarios();
            }
            return conexion;
        }
        #endregion

        public Respuesta<int> GuardarOrEditUsuarios(EUsuarios oModel)
        {
            return DUsuarios.GetInstance().GuardarOrEditUsuarios(oModel);
        }

        public Respuesta<EUsuarios> LoginUsuario(string UsuarioSis)
        {
            return DUsuarios.GetInstance().LoginUsuario(UsuarioSis);
        }

        public Respuesta<List<EUsuarios>> ListaUsuariosNegocio(int IdNegocio)
        {
            return DUsuarios.GetInstance().ListaUsuariosNegocio(IdNegocio);
        }

        public Respuesta<bool> VerificarEstado(int IdNegocio)
        {
            return DUsuarios.GetInstance().VerificarEstado(IdNegocio);
        }

        public Respuesta<bool> EstadoPermisos(int IdUsuario, bool Permisos)
        {
            return DUsuarios.GetInstance().EstadoPermisos(IdUsuario, Permisos);
        }

        public Respuesta<List<ERoles>> ListaRoles()
        {
            return DUsuarios.GetInstance().ListaRoles();
        }

        public Respuesta<bool> VerificarPermisoAccion(int IdUsuario)
        {
            return DUsuarios.GetInstance().VerificarPermisoAccion(IdUsuario);
        }

        public Respuesta<EUsuarios> LoginSuperAdmin(string UsuarioSis)
        {
            var usuarioPrueba = "achuquisaque";

            if (usuarioPrueba.ToLower() != UsuarioSis.Trim().ToLower())
            {
                return new Respuesta<EUsuarios>
                {
                    Estado = false,
                    Data = null,
                    Mensaje = "Usuario o Contraseña incorrectos."
                };
            }


            EUsuarios obj = new EUsuarios
            {
                IdUsuario = 1019,
                IdNegocio = 0,
                IdRol = 0,
                NroCi = "7645323",
                NombreCompleto = "Jose Luis Pinaya",
                UsuarioSis = "achuquisaque",
                ClaveHash = "123456789",
                Permisos = true,
                Activo = true,
                NombreTienda = "Desarrollador",
                RolDescripcion = "Administrador"
            };

            return new Respuesta<EUsuarios>
            {
                Estado = true,
                Data = obj,
                Mensaje = "Bienvenido al sistema"
            };

        }

    }
}
