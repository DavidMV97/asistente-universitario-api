import type { Request, Response, NextFunction } from 'express';
import * as service from '../services/notas.services.ts';

export async function createNota(req: Request, res: Response, next: NextFunction) {
  try {
    const id = await service.create(req.body);
    res.status(201).json({ ok: true, id, message: 'Nota creada' });
  } catch (e) {
    next(e);
  }
}
