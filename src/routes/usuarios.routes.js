import { Router } from "express";
import {
  registrarUsuario,
  loginUsuario,
  obtenerUsuarios,
} from "../controllers/usuarios.controllers.js";

const router = Router();

router.post("/register", registrarUsuario);
router.post("/login", loginUsuario);
router.get("/", obtenerUsuarios);

export default router;