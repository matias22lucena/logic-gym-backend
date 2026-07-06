import Reserva from "../models/reserva.model.js";
import Clase from "../models/clase.model.js";

const obtenerCapacidadPorDetalle = (detalle) => {
  const det = (detalle || "").toLowerCase();
  if (det.includes("crossfit")) return 15;
  if (det.includes("yoga")) return 20;
  if (det.includes("spinning")) return 18;
  if (det.includes("hiit")) return 15;
  if (det.includes("funcional")) return 25;
  return 20; 
};

export const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate("clase").populate("usuario");
    return res.status(200).json(reservas);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Error al obtener las reservas",
    });
  }
};

export const crearReserva = async (req, res) => {
  try {
    const { claseId, usuarioId } = req.body;

    if (!claseId || !usuarioId) {
      return res.status(400).json({
        mensaje: "El ID de la clase y del usuario son requeridos",
      });
    }

   
    const claseObj = await Clase.findById(claseId);
    if (!claseObj) {
      return res.status(404).json({
        mensaje: "La clase seleccionada no existe.",
      });
    }

    
    const reservaExistente = await Reserva.findOne({ clase: claseId, usuario: usuarioId });
    if (reservaExistente) {
      return res.status(400).json({
        mensaje: "Ya estás anotado/a en esta clase.",
      });
    }

    
    const capacidadMax = obtenerCapacidadPorDetalle(claseObj.detalleClase);
    const reservasActuales = await Reserva.countDocuments({ clase: claseId });

    if (reservasActuales >= capacidadMax) {
      return res.status(400).json({
        mensaje: "No quedan cupos disponibles para esta clase.",
      });
    }

    const nuevaReserva = new Reserva({
      clase: claseId,
      usuario: usuarioId,
    });

    await nuevaReserva.save();

    return res.status(201).json({
      mensaje: "Tu turno fue reservado con éxito.",
      reserva: nuevaReserva,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Ocurrió un error al procesar tu reserva.",
    });
  }
};

export const eliminarReserva = async (req, res) => {
  try {
    const { claseId, usuarioId } = req.query;

    if (!claseId || !usuarioId) {
      return res.status(400).json({
        mensaje: "El ID de la clase y del usuario son requeridos",
      });
    }

    const reservaEliminada = await Reserva.findOneAndDelete({
      clase: claseId,
      usuario: usuarioId,
    });

    if (!reservaEliminada) {
      return res.status(404).json({
        mensaje: "No estás anotado/a en esta clase.",
      });
    }

    return res.status(200).json({
      mensaje: "Liberaste tu cupo correctamente.",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      mensaje: "Ocurrió un error al cancelar la reserva.",
    });
  }
};