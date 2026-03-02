import * as repo from '../repositories/notas.repository.ts';
import * as inscripcionRepo from '../repositories/inscripciones.repository.ts';
import type { ApiError } from "../models/Error.ts";
import type { CreateNota } from '../models/Notas.ts';

export async function create(data: CreateNota): Promise<number> {
    let valor = data.valor;

    if (Number.isNaN(valor) || valor < 0 || valor > 5 ) {
        const err = new Error('Campo valor inválido. Ingrese un valor en un rango entre 0 y 5') as ApiError;
        err.status = 400;
        throw err;
    }


    // Validaciones mínimas
    if (!data.inscripcion_id || !data.tipo ) {
        const err = new Error('Faltan campos obligatorios') as ApiError;
        err.status = 400;
        throw err;
    }

    // Validar que la inscripcion exista
    const inscripcion = await inscripcionRepo.findById(data.inscripcion_id);
    if (!inscripcion) {
        const err = new Error('No existe la inscripción') as ApiError;
        err.status = 404;
        throw err;
    }

    const id = await repo.create(data);
    return id;
}
