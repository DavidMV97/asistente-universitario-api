export interface Programa {
  id: string;
  nombre: string;
  codigo: string;
}

export interface CreatePrograma extends Omit<Programa, 'id'> {}

export interface UpdatePrograma extends Omit<Programa, 'id'> {}
