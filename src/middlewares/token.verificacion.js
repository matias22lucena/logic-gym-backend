import jwt from 'jsonwebtoken';

const jwtVerificacion = (req, res, next) => {
    try {
        const token = req.headers['x-token']
        
        if (!token) {
            return res.status(401).json({ mensaje: 'No hay token en la petición' })
        }

        const payload = jwt.verify(token, process.env.SECRETJWT);

        req.usuarioId = payload.usuario;
        req.usuarioEmail = payload.email;

        next()
    } catch (error) {
        return res.status(401).json({ mensaje: 'Token no válido' })
    }
}

export default jwtVerificacion;