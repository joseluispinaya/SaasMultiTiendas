
let catalogoProductos = [];

$(document).ready(function () {
    cargarProductos();

    // Evento de búsqueda en tiempo real (mientras el usuario teclea)
    $("#txtBuscarProducto").on("keyup", function () {
        let textoBusqueda = $(this).val().toLowerCase().trim();

        // Filtramos el arreglo original buscando coincidencias en Nombre o Código
        let productosFiltrados = catalogoProductos.filter(function (prod) {
            let nombre = prod.Nombre.toLowerCase();
            let codigo = prod.Codigo.toLowerCase();
            return nombre.includes(textoBusqueda) || codigo.includes(textoBusqueda);
        });

        // Mostramos u ocultamos la alerta de "Sin resultados"
        if (productosFiltrados.length === 0 && textoBusqueda !== "") {
            $("#alertaSinresult").show();
        } else {
            $("#alertaSinresult").hide();
        }

        // Renderizamos las tarjetas con la lista filtrada
        renderizarListCardProductos(productosFiltrados);
    });
});

function cargarProductos() {
    // Puedes poner tu LoadingOverlay aquí si lo deseas
    $.ajax({
        type: "POST",
        url: "PageBuscador.aspx/ListaProductosOffline",
        data: "{}",
        contentType: "application/json; charset=utf-8",
        dataType: 'json',
        success: function (response) {
            if (response.d.Estado) {
                catalogoProductos = response.d.Data;

                // Primera carga: mandamos todo el catálogo a dibujar
                renderizarListCardProductos(catalogoProductos);
            } else {
                AlertaTimerTipo("Atención", response.d.Mensaje, "warning");
            }
        },
        error: function (xhr, ajaxOptions, thrownError) {
            console.log("Error en la conexión.");
            MostrarToastZer("No se pudo conectar con el servidor.", "Atención", "error");
        }
    });
}

function renderizarListCardProductos(listaDibujar) {
    // 1. Limpiamos el contenedor antes de dibujar
    let contenedor = $("#contenedorListProduct");
    contenedor.empty();

    // 2. Recorremos el arreglo que nos pasaron
    listaDibujar.forEach(function (prod) {

        // Formateamos el precio para asegurar los dos decimales
        let precioFormat = parseFloat(prod.PrecioVenta).toFixed(2);

        // 3. Creamos el HTML de la tarjeta (Usando clases de Bootstrap 4)
        let cardHTML = `
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 mb-4">
                <div class="card shadow-sm card-producto">
                    <div class="card-body p-3 d-flex flex-column">
                        
                        <div class="d-flex align-items-start">
                            <div class="mr-3">
                                <i class="fas fa-box-open text-warning fa-2x"></i>
                            </div>
                            <div>
                                <span class="badge badge-info px-2 py-1" style="font-size: 0.85rem;">${prod.Codigo}</span>
                            </div>
                        </div>

                        <div class="text-center mb-1">
                             <h5 class="font-weight-bold text-dark mb-0 line-height-normal">${prod.Nombre}</h5>
                        </div>
                        
                        <hr class="w-100 mt-auto mb-2" style="border-color: #e2e8f0;">
                        
                        <div class="text-right">
                            <span class="text-dark mr-2">Precio:</span>
                            <span class="text-success font-weight-bold" style="font-size: 1.5rem;">${precioFormat} Bs.</span>
                        </div>

                    </div>
                </div>
            </div>
        `;

        // 4. Agregamos la tarjeta al contenedor
        contenedor.append(cardHTML);
    });
}

// fin