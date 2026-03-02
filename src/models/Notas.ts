import type { Inscripcion } from "./Inscripcion.ts";

export interface Nota {
  id: number;
  inscripcion_id: Inscripcion['id'];
}

export interface CreateNota extends Omit<Nota, 'id'> {}

export interface UpdateNota extends Omit<Nota, 'id'> {}
