import { Router } from "express";
import {
  crearClase,
  obtenerClases,
} from "../controllers/clases.controllers.js";

const router = Router();

router.post("/", crearClase);
router.get("/", obtenerClases);

export default router;