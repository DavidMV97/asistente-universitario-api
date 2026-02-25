import { Router } from "express";
import {
  getProgramas,
  getProgramaById,
  createPrograma,
  updatePrograma,
  deletePrograma,
} from "../controllers/programas.controller.ts";
import errorHandler from "../middlewares/errorHandler.ts";

const router = Router();

router.get("/programas", getProgramas, errorHandler);
router.get("/programa/:id", getProgramaById, errorHandler);
router.post("/programas", createPrograma, errorHandler);
router.put("/programa/:id", updatePrograma, errorHandler);
router.delete("/programa/:id", deletePrograma, errorHandler);

export default router;
