import { pool } from "../db/mysql.ts";
import type { CreatePrograma, Programa, UpdatePrograma } from "../models/Programa.ts";
import type { QueryResult } from "../models/Query.ts";

export const findAll = async (): Promise<Programa[]> => {
    const [rows] = await pool.query('SELECT * FROM programas ORDER BY id DESC');
    return rows as Programa[];
}

export const findById = async (id: number): Promise<Programa | null> => {
    const [rows] = await pool.query('SELECT * FROM programas WHERE id = ?', [id]);
    return (rows as Programa[])[0] || null;
}

export const create = async (data: CreatePrograma): Promise<number> => {
    const sql = `
        INSERT INTO programas (nombre, codigo)
        VALUES (?, ?)
    `;
    const params = [
        data.nombre,
        data.codigo
    ];
    const [result] = await pool.query(sql, params);
    return (result as QueryResult).insertId || 0;
}

export const update = async (id: number, data: UpdatePrograma): Promise<number> => {
    const sql = `
        UPDATE programas
        SET nombre = ?, codigo = ?
        WHERE id = ?
    `;
    const params = [
        data.nombre,
        data.codigo,
        id
    ];

    const [result] = await pool.query(sql, params);
    return (result as QueryResult).affectedRows;
}

export const remove = async (id: number): Promise<number> => {
    const [result] = await pool.query('DELETE FROM programas WHERE id= ?', [id]);
    return (result as QueryResult).affectedRows;
}

