import type { Inscripcion } from "./Inscripcion.ts";

export type TipoNota = 'parcial' | 'taller' | 'proyecto';

export interface Nota {
  id: number;
  inscripcion_id: Inscripcion['id'];
  tipo: TipoNota;
  valor: number;
}
export interface CreateNota extends Omit<Nota, 'id'> {}

export interface UpdateNota extends Omit<Nota, 'id'> {}
