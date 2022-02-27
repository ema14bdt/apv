import Veterinario from '../models/Veterinario.js';
import generarJWT from '../helpers/generarJWT.js';
import generarId from '../helpers/generarId.js';
import emailRegistro from '../helpers/emailRegistro.js';

const registrar = async (req, res) => {
    const {nombre, email} = req.body;
    const existeVeterinario = await Veterinario.findOne({email});

    if (existeVeterinario) {
        return res.status(400).json({
            message: 'El email ya está registrado',
        });
    }

    try {
        const veterinario = new Veterinario(req.body);
        await veterinario.save();

        emailRegistro({
            nombre,
            email,
            token: veterinario.token,
        })

        res.status(201).json({
            message: 'Veterinario registrado correctamente',
            data: veterinario,
        });
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const confirmar = async (req, res) => {
    const {token} = req.params;
    const usuarioConfirmar = await Veterinario.findOne({token});
    if (!usuarioConfirmar) {
        return res.status(404).json({message: 'Token inválido'});
    }

    try {
        usuarioConfirmar.token = null;
        usuarioConfirmar.confirmado = true;
        await usuarioConfirmar.save();
        res.status(200).json({
            message: 'Veterinario confirmado correctamente',
        });
    } catch (error) {
        console.error(error);
    }
};

const autenticar = async (req, res) => {
    const {email, password} = req.body;

    const usuario = await Veterinario.findOne({email});

    if (!usuario) {
        return res.status(404).json({message: 'Email no encontrado'});
    } else if (!usuario.confirmado) {
        return res.status(403).json({message: 'Usuario no confirmado'});
    } else if (await usuario.comprobarPassword(password)) {
        return res.json({
            token: generarJWT(usuario._id),
        });
    } else {
        return res.status(401).json({message: 'Password incorrecto'});
    }
};

const perfil = async (req, res) => {
    const {veterinario} = req;

    res.json({
        title: 'Perfil de veterinario',
        nombre: veterinario.nombre,
        email: veterinario.email,
    });
};

const olvidePassword = async (req, res) => {
    const {email} = req.body;
    const existeVeterinario = await Veterinario.findOne({email});
    if (!existeVeterinario) {
        return res.status(404).json({message: 'Email no encontrado'});
    }

    try {
        existeVeterinario.token = generarId();
        await existeVeterinario.save();
        res.status(200).json({
            message: 'Se ha enviado un email a su cuenta de correo',
        });
    } catch (error) {
        console.error(error);
    }
};

const comprobarToken = async (req, res) => {
    const {token} = req.params;

    const tokenValido = await Veterinario.findOne({token});

    if (tokenValido) {
        return res.status(200).json({
            message: 'Token válido',
        });
    } else {
        return res.status(404).json({
            message: 'Token no encontrado',
        });
    }
};

const nuevoPassword = async (req, res) => {
    const {token} = req.params;
    const {password} = req.body;

    const veterinario = await Veterinario.findOne({token});
    if (!veterinario) {
        return res.status(404).json({message: 'Token no encontrado'});
    }

    try {
        veterinario.token = null;
        veterinario.password = password;
        await veterinario.save();
        res.status(200).json({
            message: 'Contraseña actualizada correctamente',
        });
    } catch (error) {
        console.error(error);
    }
};

export {registrar, confirmar, autenticar, perfil, olvidePassword, comprobarToken, nuevoPassword};
