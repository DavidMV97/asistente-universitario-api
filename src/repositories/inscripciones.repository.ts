import { pool } from "../db/mysql.ts";
import type { Curso } from "../models/Curso.ts";
import type { CreateInscripcion, Inscripcion } from "../models/Inscripcion.ts";
import type { QueryResult } from "../models/Query.ts";


export const findById = async (id: number): Promise<Inscripcion | null> => {
    const [rows] = await pool.query(`
        SELECT * FROM inscripciones WHERE id = ?
    `, [id]);
    return (rows as Inscripcion[])[0] || null;
}



export const create = async (data: CreateInscripcion): Promise<number> => {
    const sql = `
        INSERT INTO inscripciones (curso_id, estudiante_id)
        VALUES (?, ?)
    `;
    const params = [
        data.curso_id,
        data.estudiante_id
    ];
    const [result] = await pool.query(sql, params);
    return (result as QueryResult).insertId || 0;
}
