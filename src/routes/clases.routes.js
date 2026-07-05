import { Router } from "express";
import {
  crearClase,
  obtenerClases,
  eliminarClase,
} from "../controllers/clases.controllers.js";

const router = Router();

router.post("/", crearClase);
router.get("/", obtenerClases);
router.delete("/:id", eliminarClase);
export default router;