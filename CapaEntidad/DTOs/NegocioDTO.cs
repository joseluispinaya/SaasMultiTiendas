using System;

namespace CapaEntidad.DTOs
{
    public class NegocioDTO
    {
        public int IdNegocio { get; set; }
        public string NombreTienda { get; set; }
        public string NombrePropietario { get; set; }
        public string Celular { get; set; }
        public string FechaInicio { get; set; }
        public DateTime FechaInicioDate { get; set; }
        public string FechaFin { get; set; }
        public DateTime FechaFinDate { get; set; }
        public bool Activo { get; set; }
        public int NroUsuarios { get; set; }

        // NUEVA PROPIEDAD DE SOLO LECTURA
        public string TiempoRestante
        {
            get
            {
                // Tomamos solo la fecha (sin horas) para hacer un cálculo exacto de días
                DateTime hoy = DateTime.Today;
                DateTime fechaVencimiento = FechaFinDate.Date;

                TimeSpan diferencia = fechaVencimiento - hoy;
                int diasTotales = diferencia.Days;

                if (diasTotales < 0)
                {
                    return $"Vencida hace {Math.Abs(diasTotales)} día(s)";
                }
                else if (diasTotales == 0)
                {
                    return "Vence hoy";
                }
                else if (diasTotales == 1)
                {
                    return "Queda 1 día";
                }
                else if (diasTotales < 30)
                {
                    return $"Quedan {diasTotales} días";
                }
                else
                {
                    // Aproximación de meses y días para lecturas largas
                    int meses = diasTotales / 30;
                    int diasSueltos = diasTotales % 30;

                    if (diasSueltos == 0)
                        return $"Quedan {meses} mes(es)";
                    else
                        return $"Quedan {meses} mes(es) y {diasSueltos} día(s)";
                }
            }
        }
    }
}
