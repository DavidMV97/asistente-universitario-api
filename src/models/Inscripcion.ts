import type { Curso } from "./Curso.ts";
import type { Estudiante } from "./Estudiante.ts";

export interface Inscripcion {
  id: number;
  curso_id: Curso['id'];
  estudiante_id: Estudiante['id'];
}

export interface CreateInscripcion extends Omit<Inscripcion, 'id'> {}

export interface UpdateInscripcion extends Omit<Inscripcion, 'id'> {}
