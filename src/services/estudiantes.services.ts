import * as repo from '../repositories/estudiantes.repository.ts';
import type { ApiError } from "../models/Error.ts";
import type { Estudiante, CreateEstudiante, UpdateEstudiante } from "../models/Estudiante.ts";
import * as cursosRepo from '../repositories/cursos.repository.ts';

export async function getAll(): Promise<Estudiante[]> {
  return await repo.findAll();
}

export async function getById(id: any): Promise<Estudiante> {
  const num = Number(id);
  if (!num || Number.isNaN(num)) {
    const err = new Error('ID inválido') as ApiError;
    err.status = 400;
    throw err;
  }

  const row = await repo.findById(num);
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
  const id = await repo.create(data);
  return id;
}

export async function update(id: any, data: UpdateEstudiante): Promise<number> {
  await getById(id); // valida que existe
  const affected = await repo.update(Number(id), data);
  return affected;
}

export async function remove(id: any): Promise<number> {
  await getById(id); // valida que existe
  const affected = await repo.remove(Number(id));
  return affected;
}

export async function getCursos(estudianteId: any, enrolled = true) {
  // validar estudiante
  const estudiante = await getById(estudianteId);

  if (enrolled) {
    return await cursosRepo.findByEstudiante(Number(estudiante.id));
  }

  return await cursosRepo.findNotEnrolledByEstudiante(Number(estudiante.id));
}
