import type { ApiError } from "../models/Error.ts";
import type { CreateInscripcion } from "../models/Inscripcion.ts";
import * as repo from '../repositories/inscripciones.repository.ts';
import * as estudiantesRepo from '../repositories/estudiantes.repository.ts';
import * as cursosRepo from '../repositories/cursos.repository.ts';

type BatchResult = {
  created: number[];
  conflicts: { curso_id: number; message: string }[];
};

export async function create(data: any): Promise<number | BatchResult> {
  // Soporta dos formas:
  // 1) { curso_id, estudiante_id } => crea una sola inscripción
  // 2) { estudiante_id, curso_ids: number[] } => crea varias inscripciones y devuelve resumen

  // Validación mínima común
  if (!data.estudiante_id) {
    const err = new Error('Faltan campos obligatorios: estudiante_id') as ApiError;
    err.status = 400;
    throw err;
  }

  // Validar que el estudiante existe
  const estudiante = await estudiantesRepo.findById(data.estudiante_id);
  if (!estudiante) {
    const err = new Error(`Estudiante con ID ${data.estudiante_id} no existe`) as ApiError;
    err.status = 404;
    throw err;
  }

  // Caso batch
  if (Array.isArray(data.curso_ids)) {
    if (data.curso_ids.length === 0) {
      const err = new Error('La lista curso_ids no puede estar vacía') as ApiError;
      err.status = 400;
      throw err;
    }

    // Validar que todos los cursos existen antes de intentar crear
    const missing: number[] = [];
    for (const cid of data.curso_ids) {
      const c = await cursosRepo.findById(cid);
      if (!c) missing.push(cid);
    }
    if (missing.length > 0) {
      const err = new Error(`Los siguientes cursos no existen: ${missing.join(', ')}`) as ApiError;
      err.status = 404;
      throw err;
    }

    const created: number[] = [];
    const conflicts: { curso_id: number; message: string }[] = [];

    for (const cid of data.curso_ids) {
      try {
        const id = await repo.create({ curso_id: cid, estudiante_id: data.estudiante_id });
        created.push(id);
      } catch (error: any) {
        if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
          conflicts.push({ curso_id: cid, message: 'Ya existe una inscripción para este estudiante y curso' });
          continue;
        }
        // Para cualquier otro error, relanzamos (interrumpe el batch)
        throw error;
      }
    }

    return { created, conflicts };
  }

  // Caso single (mantener compatibilidad)
  if (!data.curso_id) {
    const err = new Error('Faltan campos obligatorios: curso_id') as ApiError;
    err.status = 400;
    throw err;
  }

  // Validar que el curso existe
  const curso = await cursosRepo.findById(data.curso_id);
  if (!curso) {
    const err = new Error(`Curso con ID ${data.curso_id} no existe`) as ApiError;
    err.status = 404;
    throw err;
  }

  try {
    const id = await repo.create({ curso_id: data.curso_id, estudiante_id: data.estudiante_id });
    return id;
  } catch (error: any) {
    // Capturar error de constraint UNIQUE (código 1062 en MySQL)
    if (error.code === 'ER_DUP_ENTRY' || error.errno === 1062) {
      const err = new Error('Ya existe una inscripción para este estudiante y curso') as ApiError;
      err.status = 409;
      throw err;
    }
    // Relanzar cualquier otro error
    throw error;
  }
}