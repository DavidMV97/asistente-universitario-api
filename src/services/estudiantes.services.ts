import { 
  findAll as repoFindAll, 
  findById as repoFindById, 
  create as repoCreate, 
  update as repoUpdate, 
  remove as repoRemove 
} from "../repositories/estudiantes.repository.ts";
import type { ApiError } from "../models/Error.ts";
import type { Estudiante, CreateEstudiante, UpdateEstudiante } from "../models/Estudiante.ts";

export async function getAll(): Promise<Estudiante[]> {
  return await repoFindAll();
}

export async function getById(id: any): Promise<Estudiante> {
  const num = Number(id);
  if (!num || Number.isNaN(num)) {
    const err = new Error('ID inválido') as ApiError;
    err.status = 400;
    throw err;
  }

  const row = await repoFindById(num);
  if (!row) {
    const err = new Error('Estudiante no encontrado') as ApiError;
    err.status = 404;
    throw err;
  }
  return row;
}

export async function create(data: CreateEstudiante): Promise<number> {
  // Validaciones mínimas
  if (!data.codigo || !data.nombres || !data.apellidos || !data.email) {
    const err = new Error('Faltan campos obligatorios') as ApiError;
    err.status = 400;
    throw err;
  }
  const id = await repoCreate(data);
  return id;
}

export async function update(id: any, data: UpdateEstudiante): Promise<number> {
  await getById(id); // valida que existe
  const affected = await repoUpdate(Number(id), data);
  return affected;
}

export async function remove(id: any): Promise<number> {
  await getById(id); // valida que existe
  const affected = await repoRemove(Number(id));
  return affected;
}
