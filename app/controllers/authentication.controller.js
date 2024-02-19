import bcryptjs from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const usuarios = [{
    nombre: "a",
    apellidoPat: "b",
    apellidoMat: "c",
    correo: "a@a.com",
    contrasena: "a"
}]

async function login(req,res){
    console.log(req.body);
    const correo = req.body.email;
    const contrasena = req.body.contrasena;

    if (!correo || !contrasena){
        return res.status(400).send({status:"Error", message:"Los campos están incompletos!"})
    }

    const usuarioARevisar = usuarios.find(usuario => usuario.correo == correo);
    if (!usuarioARevisar){
        return res.status(400).send({status:"Error", message:"Error durante login"})
    }
    
    const loginCorrecto = await bcryptjs.compare(contrasena, usuarioARevisar.contrasena);
    if (!loginCorrecto){
        return res.status(400).send({status:"Error", message:"Error durante login"})
    }
    const token = jsonwebtoken.sign({user:usuarioARevisar.correo}, 
        process.env.JWT_SECRET, 
        {expiresIn: process.env.JWT_EXPIRATION})

    const cookieOption = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        path: "/",
        sameSite: "None",
        secure: true
    }

    res.cookie("jwt",token,cookieOption);
    res.send({ status:"ok", message: "Usuario loggeado", redirect: "/cibereduca"})
}

async function registro(req,res){
    console.log(req.body);
    const nombre = req.body.nombre;
    const apellidoPat = req.body.apellidoPat;
    const apellidoMat = req.body.apellidoMat;
    const correo = req.body.email;
    const contrasena = req.body.contrasena;
    
    if (!nombre || !apellidoPat || !correo || !contrasena){
        return res.status(400).send({status:"Error", message:"Los campos están incompletos!"})
    }

    const usuarioARevisar = usuarios.find(usuario => usuario.correo == correo);
    if(usuarioARevisar){
        return res.status(400).send({status:"Error", message:"Este usuario ya existe!"})
    }

    const salt = await bcryptjs.genSalt();
    const hashPassword = await bcryptjs.hash(contrasena,salt);
    const nuevoUsuario = {
        nombre, apellidoPat, apellidoMat, correo, contrasena: hashPassword
    }
    
    console.log(nuevoUsuario);
    usuarios.push(nuevoUsuario);
    return res.status(201).send({ status: "ok", message: `Usuario ${nuevoUsuario.nombre} agregado!`, redirect: "/login"})
}

export const methods ={
    login, 
    registro
} 