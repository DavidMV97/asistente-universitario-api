export interface Docente {
  id: number;
  nombres: string;
  apellidos: string;
  email: string;
  profesion: string;
  telefono?: string | null;
}

export interface CreateDocente extends Omit<Docente, 'id'> {}

export interface UpdateDocente extends Omit<Docente, 'id'> {}
