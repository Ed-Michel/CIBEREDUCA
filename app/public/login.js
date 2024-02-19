const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();

    const res = await fetch("http://localhost:3000/api/login",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email: e.target.children.email.value,
            contrasena: e.target.children.contrasena.value
        })
    });

    if (!res.ok) return mensajeError.classList.toggle("escondido",false);
    const resJson = await res.json();
    
    if (resJson.redirect){
        window.location.href = resJson.redirect;
    }
})