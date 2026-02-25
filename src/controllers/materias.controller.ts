import type { Request, Response, NextFunction } from 'express';
import * as service from '../services/materias.services.ts';

export async function getMaterias(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.getAll();
    if (data.length === 0) {
      return res.json({ ok: true, data: [], message: 'No hay materias registradas' });
    }
    res.json({ ok: true, data });
  } catch (e) { next(e); }
}

export async function getMateriaById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.getById(req.params.id);
    res.json({ ok: true, data });
  } catch (e) { next(e); }
}

export async function createMateria(req: Request, res: Response, next: NextFunction) {
  try {
    const id = await service.create(req.body);
    res.status(201).json({ ok: true, id, message: 'Materia creada' });
  } catch (e) {
    next(e);
  }
}

export async function updateMateria(req: Request, res: Response, next: NextFunction) {
  try {
    await service.update(req.params.id, req.body);
    res.json({ ok: true, message: 'Materia actualizada' });
  } catch (e) { next(e); }
}

export async function deleteMateria(req: Request, res: Response, next: NextFunction) {
  try {
    await service.remove(req.params.id);
    res.json({ ok: true, message: 'Materia eliminada' });
  } catch (e) { next(e); }
}