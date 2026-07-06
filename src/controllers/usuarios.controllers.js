import bcrypt from "bcryptjs";
import Usuario from "../models/usuario.model.js";

export const registrarUsuario = async (req, res) => {
  try {
    const { nombreUsuario, correoUsuario, contrasenia, rolUsuario, bloqueo } =
      req.body;

    if (!nombreUsuario || !correoUsuario || !contrasenia) {
      return res.status(400).json({
        mensaje: "Todos los campos obligatorios deben estar completos",
      });
    }

    if (contrasenia.length < 8) {
      return res.status(400).json({
        mensaje: "La contraseña debe tener al menos 8 caracteres",
      });
    }

    const usuarioExiste = await Usuario.findOne({
      $or: [
        { nombreUsuario: nombreUsuario.trim() },
        { correoUsuario: correoUsuario.trim().toLowerCase() },
      ],
    });

    if (usuarioExiste) {
      return res.status(400).json({
        mensaje: "El usuario o correo ya existe",
      });
    }

    const contraseniaEncriptada = await bcrypt.hash(contrasenia, 10);

    const nuevoUsuario = new Usuario({
      nombreUsuario: nombreUsuario.trim(),
      correoUsuario: correoUsuario.trim().toLowerCase(),
      contrasenia: contraseniaEncriptada,
      rolUsuario: rolUsuario || "usuario",
      bloqueo: bloqueo || false,
    });

    await nuevoUsuario.save();

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: {
        id: nuevoUsuario._id,
        nombreUsuario: nuevoUsuario.nombreUsuario,
        correoUsuario: nuevoUsuario.correoUsuario,
        rolUsuario: nuevoUsuario.rolUsuario,
        bloqueo: nuevoUsuario.bloqueo,
      },
    });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      return res.status(400).json({
        mensaje: "Datos inválidos. Revisá los campos enviados.",
      });
    }

    return res.status(500).json({
      mensaje: "Error al registrar usuario",
    });
  }
};

export const loginUsuario = async (req, res) => {
  try {
    const { nombreUsuario, contrasenia } = req.body;

    if (!nombreUsuario || !contrasenia) {
      return res.status(400).json({
        mensaje: "Usuario y contraseña son obligatorios",
      });
    }

    const usuario = await Usuario.findOne({
      nombreUsuario: nombreUsuario.trim(),
    });

    if (!usuario) {
      return res.status(400).json({
        mensaje: "Usuario o contraseña incorrectos",
      });
    }

    const contraseniaCorrecta = await bcrypt.compare(
      contrasenia,
      usuario.contrasenia,
    );

    if (!contraseniaCorrecta) {
      return res.status(400).json({
        mensaje: "Usuario o contraseña incorrectos",
      });
    }

    if (usuario.bloqueo) {
      return res.status(403).json({
        mensaje: "Usuario bloqueado",
      });
    }

    return res.status(200).json({
      mensaje: "Login correcto",
      usuario: {
        id: usuario._id,
        nombreUsuario: usuario.nombreUsuario,
        correoUsuario: usuario.correoUsuario,
        rolUsuario: usuario.rolUsuario,
        bloqueo: usuario.bloqueo,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensaje: "Error al iniciar sesión",
    });
  }
};

export const obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select("-contrasenia");

    return res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensaje: "Error al obtener usuarios",
    });
  }
};

export const obtenerUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findById(id).select("-contrasenia");

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    return res.status(200).json(usuario);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensaje: "Error al obtener el usuario",
    });
  }
};

export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const { nombreUsuario, correoUsuario, contrasenia, rolUsuario, bloqueo } =
      req.body;

    const usuario = await Usuario.findById(id);

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    // Verificar que el nombre de usuario no esté repetido
    if (nombreUsuario) {
      const existeNombre = await Usuario.findOne({
        nombreUsuario: nombreUsuario.trim(),
        _id: { $ne: id },
      });

      if (existeNombre) {
        return res.status(400).json({
          mensaje: "Ese nombre de usuario ya está registrado",
        });
      }

      usuario.nombreUsuario = nombreUsuario.trim();
    }

    // Verificar que el correo no esté repetido
    if (correoUsuario) {
      const existeCorreo = await Usuario.findOne({
        correoUsuario: correoUsuario.trim().toLowerCase(),
        _id: { $ne: id },
      });

      if (existeCorreo) {
        return res.status(400).json({
          mensaje: "Ese correo ya está registrado",
        });
      }

      usuario.correoUsuario = correoUsuario.trim().toLowerCase();
    }

    if (typeof rolUsuario !== "undefined") {
      usuario.rolUsuario = rolUsuario;
    }

    if (typeof bloqueo !== "undefined") {
      usuario.bloqueo = bloqueo;
    }

    if (contrasenia) {
      if (contrasenia.length < 8) {
        return res.status(400).json({
          mensaje: "La contraseña debe tener al menos 8 caracteres",
        });
      }

      usuario.contrasenia = await bcrypt.hash(contrasenia, 10);
    }

    await usuario.save();

    return res.status(200).json({
      mensaje: "Usuario actualizado correctamente",
      usuario: {
        id: usuario._id,
        nombreUsuario: usuario.nombreUsuario,
        correoUsuario: usuario.correoUsuario,
        rolUsuario: usuario.rolUsuario,
        bloqueo: usuario.bloqueo,
      },
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensaje: "Error al actualizar usuario",
    });
  }
};

export const eliminarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findByIdAndDelete(id);

    if (!usuario) {
      return res.status(404).json({
        mensaje: "Usuario no encontrado",
      });
    }

    return res.status(200).json({
      mensaje: "Usuario eliminado correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensaje: "Error al eliminar usuario",
    });
  }
};
