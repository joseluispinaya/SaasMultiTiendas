using System;

namespace CapaEntidad.Entidades
{
    public class EProducto
    {
        public int IdProducto { get; set; }
        public int IdNegocio { get; set; }
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal PrecioCompra { get; set; }
        public decimal PrecioVenta { get; set; }
        public bool Activo { get; set; }
        public string PrecioCompraStr => PrecioCompra.ToString("0.00") + " /BS";
        public string PrecioVentaStr => PrecioVenta.ToString("0.00") + " /BS";
    }
}
