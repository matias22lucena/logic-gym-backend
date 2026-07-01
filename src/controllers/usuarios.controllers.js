import bcrypt from "bcryptjs";
import Usuario from "../models/usuario.model.js";

export const registrarUsuario = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      nombreUsuario,
      correoUsuario,
      telefono,
      contrasenia,
      planContratado,
      rolUsuario,
      bloqueo,
    } = req.body;

    if (
      !nombre ||
      !apellido ||
      !nombreUsuario ||
      !correoUsuario ||
      !telefono ||
      !contrasenia
    ) {
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
      $or: [{ nombreUsuario }, { correoUsuario }],
    });

    if (usuarioExiste) {
      return res.status(400).json({
        mensaje: "El usuario o correo ya existe",
      });
    }

    const contraseniaEncriptada = await bcrypt.hash(contrasenia, 10);

    const nuevoUsuario = new Usuario({
      nombre: nombre.trim(),
      apellido: apellido.trim(),
      nombreUsuario: nombreUsuario.trim(),
      correoUsuario: correoUsuario.trim().toLowerCase(),
      telefono: telefono.trim(),
      contrasenia: contraseniaEncriptada,
      planContratado: planContratado || "sin plan",
      rolUsuario: rolUsuario || "usuario",
      bloqueo: bloqueo || false,
    });

    await nuevoUsuario.save();

    return res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: {
        id: nuevoUsuario._id,
        nombre: nuevoUsuario.nombre,
        apellido: nuevoUsuario.apellido,
        nombreUsuario: nuevoUsuario.nombreUsuario,
        correoUsuario: nuevoUsuario.correoUsuario,
        telefono: nuevoUsuario.telefono,
        planContratado: nuevoUsuario.planContratado,
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
      usuario.contrasenia
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
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        nombreUsuario: usuario.nombreUsuario,
        correoUsuario: usuario.correoUsuario,
        telefono: usuario.telefono,
        planContratado: usuario.planContratado,
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