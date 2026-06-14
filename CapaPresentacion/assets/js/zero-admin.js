(function($) {
    "use strict"; // Exige buenas prácticas de codificación

    $(document).ready(function() {
        
        // 1. Condición inicial para celulares
        if ($(window).width() < 768) {
            $('#sidebar').addClass('colapsado');
        }

        // 2. Comportamiento del botón azul
        $('#btnToggleSidebar').on('click', function(e) {
            e.preventDefault(); // Evita que el botón haga submit o recargue la página
            
            var anchoPantalla = $(window).width();
            
            if (anchoPantalla < 768) {
                $('#sidebar').toggleClass('d-none');
            } else {
                $('#sidebar').toggleClass('colapsado');
            }
        });
        
        // 3. Comportamiento al redimensionar la ventana
        $(window).resize(function() {
            if ($(window).width() < 768) {
                $('#sidebar').addClass('colapsado');
            } else {
                $('#sidebar').removeClass('d-none'); 
            }
        });

    });

})(jQuery);