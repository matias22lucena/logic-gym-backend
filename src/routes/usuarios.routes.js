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
import validarAdmin from "../middlewares/validarAdmin.js";

const router = Router();

router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);

router.get("/", jwtVerificacion, validarAdmin, obtenerUsuarios);
router.get("/:id", jwtVerificacion, validarAdmin, obtenerUsuarioPorId);
router.put("/:id", jwtVerificacion, validarAdmin, actualizarUsuario);
router.delete("/:id", jwtVerificacion, validarAdmin, eliminarUsuario);

export default router;