import { Router } from "express";

import errorHandler from "../middlewares/errorHandler.ts";
import { createDocente, deleteDocente, getDocenteById, getDocentes, updateDocente } from "../controllers/docentes.controller.ts";

const router = Router();

router.get("/docentes", getDocentes, errorHandler);
router.get("/docente/:id", getDocenteById, errorHandler);
router.post("/docentes", createDocente, errorHandler);
router.put("/docente/:id", updateDocente, errorHandler);
router.delete("/docente/:id", deleteDocente, errorHandler);

export default router;
