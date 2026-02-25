import { Router } from "express";
import {
    getMaterias,
    getMateriaById,
    createMateria,
    updateMateria,
    deleteMateria,

} from "../controllers/materias.controller.ts";
import errorHandler from "../middlewares/errorHandler.ts";

const router = Router();

router.get("/materias", getMaterias, errorHandler);
router.get("/materia/:id", getMateriaById, errorHandler);
router.post("/materias", createMateria, errorHandler);
router.put("/materia/:id", updateMateria, errorHandler);
router.delete("/materia/:id", deleteMateria, errorHandler);

export default router;
