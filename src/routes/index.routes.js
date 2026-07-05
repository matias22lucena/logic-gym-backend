import { Router } from "express";
import usuariosRoutes from "./usuarios.routes.js";
import clasesRoutes from "./clases.routes.js";

const router = Router();

router.use("/usuarios", usuariosRoutes);
router.use("/clases", clasesRoutes);

export default router;