import type { Request, Response, NextFunction } from 'express';
import * as service from '../services/inscripciones.services.ts';


export async function createInscripcion(req: Request, res: Response, next: NextFunction) {
  try {
    const result = await service.create(req.body);
    // Si retorna un número, es la creación única
    if (typeof result === 'number') {
      res.status(201).json({ ok: true, id: result, message: 'Inscripción creada' });
      return;
    }

    // Resultado de batch
    res.status(200).json({ ok: true, summary: result, message: 'Proceso de inscripciones completado' });
  } catch (e) {
    next(e);
  }
}
