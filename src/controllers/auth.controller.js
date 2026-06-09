import { response, request } from 'express';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Usuario from '../models/User.js';

// =========================
// GENERAR JWT
// =========================
const generarJWT = (uid) => {
    return jwt.sign(
        { uid },
        process.env.JWT_SECRET,
        { expiresIn: '4h' }
    );
};

// =========================
// LOGIN
// =========================
export const login = async (req = request, res = response) => {
    const { email, password } = req.body;

    try {
        // IMPORTANTE: traer password porque está en select:false
        const usuario = await Usuario.findOne({ email }).select('+password');

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            });
        }

        // usar método del modelo (más limpio)
        const validPassword = await usuario.comparePassword(password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos'
            });
        }

        const token = generarJWT(usuario._id);

        res.json({
            msg: 'Login exitoso',
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            },
            token
        });

    } catch (error) {
        console.error('❌ LOGIN ERROR:', error);

        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error.message
        });
    }
};

// =========================
// REGISTRO
// =========================
export const registrarUsuario = async (req = request, res = response) => {
    const { nombre, email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                msg: 'El email ya está registrado'
            });
        }

        // ⚠️ NO se encripta aquí (lo hace el modelo)
        const usuario = new Usuario({
            nombre,
            email,
            password
        });

        await usuario.save();

        const token = generarJWT(usuario._id);

        res.status(201).json({
            msg: 'Usuario creado correctamente',
            usuario: {
                id: usuario._id,
                nombre: usuario.nombre,
                email: usuario.email
            },
            token
        });

    } catch (error) {
        console.error('❌ REGISTER ERROR:', error);

        res.status(500).json({
            msg: 'Error al registrar usuario',
            error: error.message
        });
    }
};

// =========================
// PERFIL PROTEGIDO
// =========================
export const perfilProtegido = async (req = request, res = response) => {
    try {
        const usuario = await Usuario.findById(req.uid);

        if (!usuario) {
            return res.status(404).json({
                msg: 'Usuario no encontrado'
            });
        }

        res.json({
            ok: true,
            usuario
        });

    } catch (error) {
        console.error('❌ PERFIL ERROR:', error);

        res.status(500).json({
            msg: 'Error al obtener perfil',
            error: error.message
        });
    }
};

// =========================
// VERIFICAR TOKEN
// =========================
export const verificarToken = async (req = request, res = response) => {
    try {
        const usuario = await Usuario.findById(req.uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario no existe'
            });
        }

        const token = generarJWT(usuario._id);

        res.json({
            usuario,
            token
        });

    } catch (error) {
        console.error('❌ TOKEN ERROR:', error);

        res.status(500).json({
            msg: 'Error al verificar token',
            error: error.message
        });
    }
};