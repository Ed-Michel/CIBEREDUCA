import express from "express";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
import {methods as autenticacion} from "./controllers/authentication.controller.js"
import {methods as authorization} from "./middlewares/authorization.js"

// server
const app = express();
app.set("port", 3000);
app.listen(app.get("port"));
console.log("servidor corriendo en puerto", app.get("port"))

// configuración
app.use(express.static(__dirname + "/public"));
app.use(express.json());
app.use(cookieParser());

// rutas
app.get("/", (req,res) => res.sendFile(__dirname + "/pages/home.html"))
app.get("/login", authorization.soloPublico, (req,res) => res.sendFile(__dirname + "/pages/login.html"))
app.get("/registro", authorization.soloPublico, (req,res) => res.sendFile(__dirname + "/pages/registro.html"))
app.get("/cibereduca", authorization.soloAdmin, (req,res) => res.sendFile(__dirname + "/pages/admin/cibereduca.html"))

app.post("/api/login", autenticacion.login );
app.post("/api/registro", autenticacion.registro );

// configuración para el tipo MIME del archivo CSS
app.get("/public/estilos.css", (req, res) => {
    res.setHeader("Content-Type", "text/css");
    res.sendFile(__dirname + "/public/estilos.css");
})