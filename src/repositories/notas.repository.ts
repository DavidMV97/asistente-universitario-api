import { pool } from "../db/mysql.ts";
import type { QueryResult } from "../models/Query.ts";
import type { CreateNota } from "../models/Notas.ts";

export const create = async (data: CreateNota): Promise<number> => {
    const sql = `
        INSERT INTO notas (inscripcion_id, tipo, valor)
        VALUES (?, ?, ?)
    `;
    const params = [
        data.inscripcion_id,
        data.tipo,
        data.valor
    ];
    const [result] = await pool.query(sql, params);
    return (result as QueryResult).insertId || 0;
}
