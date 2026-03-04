import { pool } from "../db/mysql.ts";
import type { CreateDocente, Docente, UpdateDocente } from "../models/Docente.ts";
import type { QueryResult } from "../models/Query.ts";

export const findAll = async (): Promise<Docente[]> => {
    const [rows] = await pool.query('SELECT * FROM docentes ORDER BY id DESC');
    return rows as Docente[];
}

export const findById = async (id: number): Promise<Docente | null> => {
    const [rows] = await pool.query('SELECT * FROM docentes WHERE id = ?', [id]);
    return (rows as Docente[])[0] || null;
}

export const create = async (data: CreateDocente): Promise<number> => {
    const sql = `
        INSERT INTO docentes (nombres, apellidos, email, telefono, profesion)
        VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
        data.nombres,
        data.apellidos,
        data.email,
        data.telefono || null,
        data.profesion || null
    ];
    const [result] = await pool.query(sql, params);
    return (result as QueryResult).insertId || 0;
}

export const update = async (id: number, data: UpdateDocente): Promise<number> => {
    const sql = `
        UPDATE docentes
        SET nombres = ?, apellidos = ?, email = ?, telefono = ?, profesion = ?
        WHERE id = ?
    `;
    const params = [
        data.nombres, 
        data.apellidos, 
        data.email,
        data.telefono || null,
        data.profesion || null,
        id
    ];

    const [result] = await pool.query(sql, params);
    return (result as QueryResult).affectedRows;
}

export const docenteCursos = async (): Promise<number> => {
    const sql = `
        SELECT 
            d.id,
            d.nombres,
            JSON_ARRAYAGG(
                JSON_OBJECT(
                    'id', c.id,
                    'materia', m.nombre
                )
            ) AS cursos
        FROM docentes d
        LEFT JOIN cursos c 
            ON c.docente_id = d.id
        LEFT JOIN materias m 
            ON m.id = c.materia_id
        GROUP BY d.id, d.nombres
    `;
    
    const [rows] = await pool.query(sql);
    return rows as any;
}

export const remove = async (id: number): Promise<number> => {
    const [result] = await pool.query('DELETE FROM docentes WHERE id= ?', [id]);
    return (result as QueryResult).affectedRows;
}

