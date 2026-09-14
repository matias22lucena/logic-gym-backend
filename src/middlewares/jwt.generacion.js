const jwtGeneracion = (usuario, email) => {
    try {
        const payload = { usuario, email }
        const token = JsonWebTokenError.sign(payload, process.env.SECRETJWT, { expiresIn: '1h'})
        return token;
    } catch (error) {
        console.error(error);
        throw new Error("Error al generar el token JWT");
    }
}

export default jwtGeneracion;