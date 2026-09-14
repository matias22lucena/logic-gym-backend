import jwt from 'jsonwebtoken';

const jwtVerificacion = (req, res, next) => {
    try {
        const token = req.header['x-token']
        if (!token) {
            return res.status(401).json({ mensaje: 'No hay token en la petición' })
        }
        const payload = payload.usuario
        next()
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token no válido' })
    }
}

export default jwtVerificacion;