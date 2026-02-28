import * as repo from '../repositories/cursos.repository.ts';
import * as docentesRepo from '../repositories/docentes.repository.ts';
import * as materiasRepo from '../repositories/materias.repository.ts';
import type { ApiError } from "../models/Error.ts";
import type { CreateCurso, Curso, UpdateCurso } from '../models/Curso.ts';

export async function getAll(): Promise<Curso[]> {
  return await repo.findAll();
}

export async function getById(id: any): Promise<Curso> {
  const num = Number(id);
  if (!num || Number.isNaN(num)) {
    const err = new Error('ID inválido') as ApiError;
    err.status = 400;
    throw err;
  }

  const row = await repo.findById(num);
  if (!row) {
    const err = new Error('Curso no encontrado') as ApiError;
    err.status = 404;
    throw err;
  }
  return row;
}

export async function create(data: CreateCurso): Promise<number> {
  // Validaciones mínimas
  if (!data.materia_id || !data.docente_id || !data.anio || !data.periodo || !data.cupos) {
    const err = new Error('Faltan campos obligatorios') as ApiError;
    err.status = 400;
    throw err;
  }
  

  // Validar que la materia existe
  const materia = await materiasRepo.findById(data.materia_id);
  if (!materia) {
    const err = new Error(`Materia con ID ${data.materia_id} no existe`) as ApiError;
    err.status = 404;
    throw err;
  }

  // Validar que el docente existe
  const docente = await docentesRepo.findById(data.docente_id);
  if (!docente) {
    const err = new Error(`Docente con ID ${data.docente_id} no existe`) as ApiError;
    err.status = 404;
    throw err;
  }

  const id = await repo.create(data);
  return id;
}

export async function update(id: any, data: UpdateCurso): Promise<number> {
  await getById(id); // valida que existe
  const affected = await repo.update(Number(id), data);
  return affected;
}

export async function remove(id: any): Promise<number> {
  await getById(id); // valida que existe
  const affected = await repo.remove(Number(id));
  return affected;
}
