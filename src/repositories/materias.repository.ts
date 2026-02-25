import { pool } from "../db/mysql.ts";
import type { CreateMateria, Materia, UpdateMateria } from "../models/Materia.ts";
import type { QueryResult } from "../models/Query.ts";

export const findAll = async (): Promise<Materia[]> => {
    const [rows] = await pool.query('SELECT * FROM materias ORDER BY id DESC');
    return rows as Materia[];
}

export const findById = async (id: number): Promise<Materia | null> => {
    const [rows] = await pool.query('SELECT * FROM materias WHERE id = ?', [id]);
    return (rows as Materia[])[0] || null;
}

export const create = async (data: CreateMateria): Promise<number> => {
    const sql = `
        INSERT INTO materias (nombre, codigo, creditos)
        VALUES (?, ?, ?)
    `;
    const params = [
        data.nombre,
        data.codigo,
        data.creditos
    ];
    const [result] = await pool.query(sql, params);
    return (result as QueryResult).insertId || 0;
}

export const update = async (id: number, data: UpdateMateria): Promise<number> => {
    const sql = `
        UPDATE materias
        SET nombre = ?, codigo = ?, creditos = ?
        WHERE id = ?
    `;
    const params = [
        data.nombre, 
        data.codigo, 
        data.creditos,
        id
    ];

    const [result] = await pool.query(sql, params);
    return (result as QueryResult).affectedRows;
}

export const remove = async (id: number): Promise<number> => {
    const [result] = await pool.query('DELETE FROM materias WHERE id= ?', [id]);
    return (result as QueryResult).affectedRows;
}

