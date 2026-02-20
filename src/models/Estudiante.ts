export interface Estudiante {
  id: number;
  codigo: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono?: string | null;
  fecha_nacimiento?: string | null;
}

export interface CreateEstudiante extends Omit<Estudiante, 'id'> {}

export interface UpdateEstudiante extends Omit<Estudiante, 'id'> {}
