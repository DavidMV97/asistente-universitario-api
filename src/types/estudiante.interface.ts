export interface Estudiante {
  id_estudiante: number;
  codigo: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono?: string | null;
  fecha_nacimiento?: string | null;
}

export interface CreateEstudianteDTO {
  codigo: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono?: string | null;
  fecha_nacimiento?: string | null;
}

export interface UpdateEstudianteDTO {
  codigo: string;
  nombres?: string;
  apellidos?: string;
  email?: string;
  telefono?: string | null;
  fecha_nacimiento?: string | null;
}

export interface QueryResult {
  insertId?: number;
  affectedRows: number;
}

export interface ApiError extends Error {
  status: number;
}
