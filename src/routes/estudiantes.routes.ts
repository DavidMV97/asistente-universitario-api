import { Router } from "express";
import {
  getEstudiantes,
  getEstudianteById,
  createEstudiante,
  updateEstudiante,
  deleteEstudiante,
  getCursosByEstudiante,
  softDeleteEstudiante,
  getNotasPorCurso
} from "../controllers/estudiantes.controller.ts";
import errorHandler from "../middlewares/errorHandler.ts";

const router = Router();

router.get("/estudiantes", getEstudiantes, errorHandler);
router.get("/estudiante/:id", getEstudianteById, errorHandler);
router.get("/estudiante/:id/cursos", getCursosByEstudiante, errorHandler);
router.get("/estudiantes", getEstudiantes, errorHandler);
router.get("/estudiante/:id/notas", getNotasPorCurso, errorHandler);

router.post("/estudiantes", createEstudiante, errorHandler);
router.put("/estudiante/:id", updateEstudiante, errorHandler);
router.delete("/estudiante/:id", deleteEstudiante, errorHandler);
router.patch("/estudiante/:id", softDeleteEstudiante, errorHandler);

export default router;
