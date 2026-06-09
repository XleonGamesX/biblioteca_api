import jwt from 'jsonwebtoken';

export const validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET);

        // 🔥 UNIFICAR NOMBRE
        req.uid = payload.uid;

        next();

    } catch (error) {
        return res.status(401).json({
            msg: 'Token no válido'
        });
    }
};