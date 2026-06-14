namespace CapaEntidad.DTOs
{
    public class ProductoListDTO
    {
        public int IdProducto { get; set; }
        public int IdNegocio { get; set; }
        public string Codigo { get; set; }
        public string Nombre { get; set; }
        public string Descripcion { get; set; }
        public decimal PrecioCompra { get; set; }
        public decimal PrecioVenta { get; set; }
        public bool Activo { get; set; }
        public int TotalRegistros { get; set; }
        public int TotalFiltrados { get; set; }
    }
}
