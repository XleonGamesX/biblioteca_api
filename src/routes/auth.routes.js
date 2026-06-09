import { Router } from 'express';
import { check } from 'express-validator';
import { login, registrarUsuario, perfilProtegido } from '../controllers/auth.controller.js';
import { validarCampos } from '../middlewares/validar-campos.js';
import { validarJWT } from '../middlewares/validar-jwt.js';

const router = Router();

// LOGIN
router.post('/login', [
    check('email', 'El email es obligatorio y debe ser válido').isEmail().normalizeEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos
], login);

// REGISTRO
router.post('/registro', [
    check('nombre', 'El nombre es obligatorio').not().isEmpty().trim().escape(),
    check('email', 'El email no es válido').isEmail().normalizeEmail(),
    check('password', 'El password debe tener entre 6 y 12 caracteres')
        .isLength({ min: 6, max: 12 }),
    validarCampos
], registrarUsuario);

// PERFIL PROTEGIDO
router.get('/perfil', validarJWT, perfilProtegido);

export default router;