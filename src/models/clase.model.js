import mongoose from "mongoose";

const claseSchema = new mongoose.Schema(
  {
    detalleClase: {
      type: String,
      required: true,
      trim: true,
    },

    profesor: {
      type: String,
      required: true,
      trim: true,
    },

    fecha: {
      type: String,
      required: true,
    },

    hora: {
      type: String,
      required: true,
    },

    activa: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Clase = mongoose.model("Clase", claseSchema);

export default Clase;