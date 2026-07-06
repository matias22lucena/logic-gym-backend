import mongoose from "mongoose";

const reservaSchema = new mongoose.Schema(
  {
    clase: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Clase",
      required: true,
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Usuario",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

reservaSchema.index({ clase: 1, usuario: 1 }, { unique: true });

const Reserva = mongoose.model("Reserva", reservaSchema);
export default Reserva;
