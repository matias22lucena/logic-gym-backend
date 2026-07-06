import { Router } from "express";
import {
  crearReserva,
  obtenerReservas,
  eliminarReserva,
} from "../controllers/reservas.controllers.js";

const router = Router();

router.get("/", obtenerReservas);
router.post("/", crearReserva);
router.delete("/", eliminarReserva);

export default router;