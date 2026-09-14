import { Router } from "express";
import {
  crearClase,
  obtenerClases,
  editarClase,
  eliminarClase,
} from "../controllers/clases.controllers.js";
import jwtVerificacion from "../middlewares/token.verificacion.js";
import validarAdmin from "../middlewares/validarAdmin.js";

const router = Router();

router.post("/", jwtVerificacion, validarAdmin, crearClase);
router.get("/", obtenerClases);
router.put("/:id", jwtVerificacion, validarAdmin, editarClase);
router.delete("/:id", jwtVerificacion, validarAdmin, eliminarClase);

export default router;