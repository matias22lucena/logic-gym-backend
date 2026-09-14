import { Router } from "express";
import {
  crearClase,
  obtenerClases,
  editarClase,
  eliminarClase,
} from "../controllers/clases.controllers.js";
import jwtVerificacion from "../middlewares/token.verificacion.js";

const router = Router();

router.post("/", jwtVerificacion, crearClase);
router.get("/", obtenerClases);
router.put("/:id", jwtVerificacion, editarClase);
router.delete("/:id", jwtVerificacion, eliminarClase);

export default router;