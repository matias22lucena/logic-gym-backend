import mongoose from "mongoose";

const usuarioSchema = new mongoose.Schema(
  {
/*     nombre: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    },

    apellido: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50,
    }, */

    nombreUsuario: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      minlength: 3,
      maxlength: 30,
    },

    correoUsuario: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      lowercase: true,
    },

/*     telefono: {
      type: String,
      required: true,
      trim: true,
    }, */

    contrasenia: {
      type: String,
      required: true,
      minlength: 8,
    },

/*     planContratado: {
      type: String,
      enum: ["musculacion", "clases", "full", "sin plan"],
      default: "sin plan",
    }, */

    rolUsuario: {
      type: String,
      enum: ["usuario", "admin"],
      default: "usuario",
    }, 

    bloqueo: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;