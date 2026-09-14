import { Router } from "express";
import {
  crearReserva,
  obtenerReservas,
  eliminarReserva,
} from "../controllers/reservas.controllers.js";
import jwtVerificacion from "../middlewares/jwt.verificacion.js";

const router = Router();

router.get("/",jwtVerificacion, obtenerReservas);
router.post("/", jwtVerificacion, crearReserva);
router.delete("/", jwtVerificacion, eliminarReserva);

export default router;