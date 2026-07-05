import Clase from "../models/clase.model.js";

export const crearClase = async (req, res) => {
  try {
    const { detalleClase, profesor, fecha, hora } = req.body;

    if (!detalleClase || !profesor || !fecha || !hora) {
      return res.status(400).json({
        mensaje: "Todos los campos son obligatorios",
      });
    }

    const nuevaClase = new Clase({
      detalleClase: detalleClase.trim(),
      profesor: profesor.trim(),
      fecha,
      hora,
    });

    await nuevaClase.save();

    return res.status(201).json({
      mensaje: "Clase creada correctamente",
      clase: nuevaClase,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensaje: "Error al crear la clase",
    });
  }
};

export const obtenerClases = async (req, res) => {
  try {
    const clases = await Clase.find().sort({ fecha: 1, hora: 1 });

    return res.status(200).json(clases);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensaje: "Error al obtener las clases",
    });
  }
};

export const eliminarClase = async (req, res) => {
  try {
    const { id } = req.params;

    const claseEliminada = await Clase.findByIdAndDelete(id);

    if (!claseEliminada) {
      return res.status(404).json({
        mensaje: "Clase no encontrada",
      });
    }

    return res.status(200).json({
      mensaje: "Clase eliminada correctamente",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      mensaje: "Error al eliminar la clase",
    });
  }
};