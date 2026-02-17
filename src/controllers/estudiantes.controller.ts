import type { Request, Response, NextFunction } from 'express';
import * as service from '../services/estudiantes.services.ts';

export async function getEstudiantes(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.getAll();
    res.json({ ok: true, data });
  } catch (e) { next(e); }
}

export async function getEstudianteById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.getById(req.params.id);
    res.json({ ok: true, data });
  } catch (e) { next(e); }
}

export async function createEstudiante(req: Request, res: Response, next: NextFunction) {
  try {
    const id = await service.create(req.body);
    res.status(201).json({ ok: true, id, message: 'Estudiante creado' });
  } catch (e) {
    //res.status(400).json({ ok: false, message: 'Error al crear estudiante', error: (e as any).message });
    next(e);
  }
}

export async function updateEstudiante(req: Request, res: Response, next: NextFunction) {
  try {
    await service.update(req.params.id, req.body);
    res.json({ ok: true, message: 'Estudiante actualizado' });
  } catch (e) { next(e); }
}

export async function deleteEstudiante(req: Request, res: Response, next: NextFunction) {
  try {
    await service.remove(req.params.id);
    res.json({ ok: true, message: 'Estudiante eliminado' });
  } catch (e) { next(e); }
}