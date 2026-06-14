namespace CapaEntidad.Entidades
{
    public class EUsuarios
    {
        public int IdUsuario { get; set; }
        public int IdNegocio { get; set; }
        public int IdRol { get; set; }
        public string NroCi { get; set; }
        public string NombreCompleto { get; set; }
        public string UsuarioSis { get; set; }
        public string ClaveHash { get; set; }
        public bool Permisos { get; set; }
        public bool Activo { get; set; }
        public string NombreTienda { get; set; }
        public string RolDescripcion { get; set; }
    }
}
