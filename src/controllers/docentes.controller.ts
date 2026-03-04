import type { Request, Response, NextFunction } from 'express';
import * as service from '../services/docentes.services.ts';

export async function getDocentes(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.getAll();
    res.json({ ok: true, data });
  } catch (e) { next(e); }
}

export async function getDocenteById(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.getById(req.params.id);
    res.json({ ok: true, data });
  } catch (e) { next(e); }
}

export async function createDocente(req: Request, res: Response, next: NextFunction) {
  try {
    const id = await service.create(req.body);
    res.status(201).json({ ok: true, id, message: 'Docente creado' });
  } catch (e) {
    next(e);
  }
}

export async function updateDocente(req: Request, res: Response, next: NextFunction) {
  try {
    await service.update(req.params.id, req.body);
    res.json({ ok: true, message: 'Docente actualizado' });
  } catch (e) { next(e); }
}

export async function deleteDocente(req: Request, res: Response, next: NextFunction) {
  try {
    await service.remove(req.params.id);
    res.json({ ok: true, message: 'Docente eliminado' });
  } catch (e) { next(e); }
}

export async function docenteCursos(req: Request, res: Response, next: NextFunction) {
  try {
    const data = await service.docenteCursos();
    res.json({ ok: true, data });
  } catch (e) { next(e); }
}