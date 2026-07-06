import { Router } from "express";
import {
  crearClase,
  obtenerClases,
  editarClase,
  eliminarClase,
} from "../controllers/clases.controllers.js";

const router = Router();

router.post("/", crearClase);
router.get("/", obtenerClases);
router.put("/:id", editarClase);
router.delete("/:id", eliminarClase);

export default router;