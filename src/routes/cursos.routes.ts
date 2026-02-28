import { Router } from "express";
import {
    getCursos,
    getCursoById,
    createCurso,
    updateCurso,
    deleteCurso,

} from "../controllers/cursos.controller.ts";
import errorHandler from "../middlewares/errorHandler.ts";

const router = Router();

router.get("/cursos", getCursos, errorHandler);
router.get("/curso/:id", getCursoById, errorHandler);
router.post("/cursos", createCurso, errorHandler);
router.put("/curso/:id", updateCurso, errorHandler);
router.delete("/curso/:id", deleteCurso, errorHandler);

export default router;
