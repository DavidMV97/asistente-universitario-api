import type { Docente } from "./Docente.ts";
import type { Materia } from "./Materia.ts";

export interface Curso {
  id: number;
  materia_id: Materia['id'];
  docente_id: Docente['id'];
  anio: number;
  periodo: number;
  cupos: number;
  nombreMateria?: string;
  inscripcion_id?: number;
}

export interface CreateCurso extends Omit<Curso, 'id'> {}

export interface UpdateCurso extends Omit<Curso, 'id'> {}
