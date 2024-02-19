document.addEventListener("DOMContentLoaded", function() {
    const botonIncioSesion = document.getElementById("InicioSesion");
    const botonRegistro = document.getElementById("Registro");

    botonIncioSesion.addEventListener("click", function(){
        window.location.href = "/login";
    });

    botonRegistro.addEventListener("click", function(){
        window.location.href = "/registro";
    });
});
