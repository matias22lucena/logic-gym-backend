import Usuario from "../models/usuario.model.js";

const validarAdmin= async (req, res, next) => {
    try {
        const usuarioId = req.usuarioId;

        const usuario = await Usuario.findById(usuarioId);

        if (!usuario) {
            return res.status(404).json({ mensaje: "usuario no encontrado en la base de datos",
            });
        }
        if (usuario.rolUsuario !== "admin") {
            return res.status(403).json({ mensaje: "Acceso denegado. Se requiere rol de administrador"});
        }
    }
}