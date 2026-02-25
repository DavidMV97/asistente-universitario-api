import type { Request, Response, NextFunction } from 'express';
import * as service from '../services/programas.services.ts';

export async function getProgramas(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.getAll();
    if (data.length === 0) {
      return res.json({ ok: true, data: [], message: 'No hay programas registrados' });
    }
    res.json({ ok: true, data });
  } catch (e) { next(e); }
}

export async function getProgramaById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.getById(req.params.id);
    res.json({ ok: true, data });
  } catch (e) { next(e); }
}

export async function createPrograma(req: Request, res: Response, next: NextFunction) {
  try {
    const id = await service.create(req.body);
    res.status(201).json({ ok: true, id, message: 'Programa creado' });
  } catch (e) {
    next(e);
  }
}

export async function updatePrograma(req: Request, res: Response, next: NextFunction) {
  try {
    await service.update(req.params.id, req.body);
    res.json({ ok: true, message: 'Programa actualizado' });
  } catch (e) { next(e); }
}

export async function deletePrograma(req: Request, res: Response, next: NextFunction) {
  try {
    await service.remove(req.params.id);
    res.json({ ok: true, message: 'Programa eliminado' });
  } catch (e) { next(e); }
}