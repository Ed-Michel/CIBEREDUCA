import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";
import {usuarios} from "../controllers/authentication.controller.js";

dotenv.config();

function soloAdmin(req,res,next){
    const logueado = revisarCookie(req);
    if (logueado) return next();
    return res.redirect("/");
}

function soloPublico(req,res,next){
    const logueado = revisarCookie(req);
    if (!logueado) return next();
    return res.redirect("/cibereduca");
}

function revisarCookie(req){
    try{
        const cookieJWT = req.headers.cookie.split("; ").find(cookie => cookie.startsWith("jwt="));
        const token = cookieJWT.slice(4);
        const decodificada = jsonwebtoken.verify(token, process.env.JWT_SECRET);
        const usuarioARevisar = usuarios.find(usuario => usuario.correo == decodificada.user);
        
        if (!usuarioARevisar){
            return false;
        }
        return true;
    }
    catch(error){
        console.error("Error al decodificar o verificar el token: ",error);
        return false;
    }
}

export const methods ={
    soloAdmin,
    soloPublico
} 