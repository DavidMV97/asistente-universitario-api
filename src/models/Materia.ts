export interface Materia {
  id: string;
  nombre: string;
  codigo: string;
  creditos: number;
}

export interface CreateMateria extends Omit<Materia, 'id'> {}

export interface UpdateMateria extends Omit<Materia, 'id'> {}
