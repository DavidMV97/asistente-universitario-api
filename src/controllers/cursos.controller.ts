import type { Request, Response, NextFunction } from 'express';
import * as service from '../services/cursos.services.ts';

export async function getCursos(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.getAll();
    if (data.length === 0) {
      return res.json({ ok: true, data: [], message: 'No hay cursos registrados' });
    }
    res.json({ ok: true, data });
  } catch (e) { next(e); }
}

export async function getCursoById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.getById(req.params.id);
    res.json({ ok: true, data });
  } catch (e) { next(e); }
}

export async function createCurso(req: Request, res: Response, next: NextFunction) {
  try {
    const id = await service.create(req.body);
    res.status(201).json({ ok: true, id, message: 'Curso creado' });
  } catch (e) {
    next(e);
  }
}

export async function updateCurso(req: Request, res: Response, next: NextFunction) {
  try {
    await service.update(req.params.id, req.body);
    res.json({ ok: true, message: 'Curso actualizado' });
  } catch (e) { next(e); }
}

export async function deleteCurso(req: Request, res: Response, next: NextFunction) {
  try {
    await service.remove(req.params.id);
    res.json({ ok: true, message: 'Curso eliminado' });
  } catch (e) { next(e); }
}