import * as repo from '../repositories/materias.repository.ts';
import type { ApiError } from "../models/Error.ts";
import type { CreateMateria, Materia, UpdateMateria } from '../models/Materia.ts';

export async function getAll(): Promise<Materia[]> {
  return await repo.findAll();
}

export async function getById(id: any): Promise<Materia> {
  const num = Number(id);
  if (!num || Number.isNaN(num)) {
    const err = new Error('ID inválido') as ApiError;
    err.status = 400;
    throw err;
  }

  const row = await repo.findById(num);
  if (!row) {
    const err = new Error('Materia no encontrada') as ApiError;
    err.status = 404;
    throw err;
  }
  return row;
}

export async function create(data: CreateMateria): Promise<number> {
  // Validaciones mínimas
  if (!data.codigo || !data.nombre || !data.creditos) {
    const err = new Error('Faltan campos obligatorios') as ApiError;
    err.status = 400;
    throw err;
  }
  const id = await repo.create(data);
  return id;
}

export async function update(id: any, data: UpdateMateria): Promise<number> {
  await getById(id); // valida que existe
  const affected = await repo.update(Number(id), data);
  return affected;
}

export async function remove(id: any): Promise<number> {
  await getById(id); // valida que existe
  const affected = await repo.remove(Number(id));
  return affected;
}
