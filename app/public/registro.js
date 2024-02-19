const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("registro-form").addEventListener("submit", async(e) =>{
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/registro",{
        method: "POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            nombre: e.target.children.nombre.value,
            apellidoPat: e.target.children.apellidoPat.value,
            apellidoMat: e.target.children.apellidoMat.value,
            email: e.target.children.email.value,
            contrasena: e.target.children.contrasena.value
        })
    });

    if (!res.ok) return mensajeError.classList.toggle("escondido", false);
    const resJson = await res.json();

    if (resJson.redirect){
        window.location.href = resJson.redirect;
    }
})