import { Router } from "express";
import {
  registrarUsuario,
  loginUsuario,
  obtenerUsuarios,
  obtenerUsuarioPorId,
  actualizarUsuario,
  eliminarUsuario,
} from "../controllers/usuarios.controllers.js";
import jwtVerificacion from "../middlewares/jwt.verificacion.js";

const router = Router();

router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);

router.get("/", jwtVerificacion, obtenerUsuarios);
router.get("/:id", jwtVerificacion, obtenerUsuarioPorId);
router.put("/:id", jwtVerificacion, actualizarUsuario);
router.delete("/:id", jwtVerificacion, eliminarUsuario);

export default router;