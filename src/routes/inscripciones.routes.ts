import { Router } from "express";
import {
    createInscripcion
} from "../controllers/inscripciones.controller.ts";
import errorHandler from "../middlewares/errorHandler.ts";

const router = Router();

router.post("/inscripciones", createInscripcion, errorHandler);


export default router;
