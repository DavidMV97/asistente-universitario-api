import * as repo from '../repositories/programas.repository.ts';
import type { ApiError } from "../models/Error.ts";
import type { CreatePrograma, Programa, UpdatePrograma } from '../models/Programa.ts';

export async function getAll(): Promise<Programa[]> {
  return await repo.findAll();
}

export async function getById(id: any): Promise<Programa> {
  const num = Number(id);
  if (!num || Number.isNaN(num)) {
    const err = new Error('ID inválido') as ApiError;
    err.status = 400;
    throw err;
  }

  const row = await repo.findById(num);
  if (!row) {
    const err = new Error('Programa no encontrado') as ApiError;
    err.status = 404;
    throw err;
  }
  return row;
}

export async function create(data: CreatePrograma): Promise<number> {
  // Validaciones mínimas
  if (!data.codigo || !data.nombre) {
    const err = new Error('Faltan campos obligatorios') as ApiError;
    err.status = 400;
    throw err;
  }
  const id = await repo.create(data);
  return id;
}

export async function update(id: any, data: UpdatePrograma): Promise<number> {
  await getById(id); // valida que existe
  const affected = await repo.update(Number(id), data);
  return affected;
}

export async function remove(id: any): Promise<number> {
  await getById(id); // valida que existe
  const affected = await repo.remove(Number(id));
  return affected;
}
