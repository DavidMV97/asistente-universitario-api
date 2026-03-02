import { Router } from "express";
import {
    createNota
} from "../controllers/notas.controller.ts";
import errorHandler from "../middlewares/errorHandler.ts";

const router = Router();

router.post("/notas", createNota, errorHandler);


export default router;
