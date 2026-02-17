import { pool } from "../db/mysql.ts";
import type { Estudiante, CreateEstudianteDTO, UpdateEstudianteDTO, QueryResult } from "../types/estudiante.interface.ts";

export const findAll = async (): Promise<Estudiante[]> => {
    const [rows] = await pool.query('SELECT * FROM estudiantes ORDER BY id DESC');
    return rows as Estudiante[];
}

export const findById = async (id: number): Promise<Estudiante | null> => {
    const [rows] = await pool.query('SELECT * FROM estudiantes WHERE id = ?', [id]);
    return (rows as Estudiante[])[0] || null;
}

export const create = async (data: CreateEstudianteDTO): Promise<number> => {
    const sql = `
        INSERT INTO estudiantes (codigo, nombres, apellidos, email, telefono, fecha_nacimiento)
        VALUES (?, ?, ?, ?, ?, ?)
    `;
    const params = [
        data.codigo,
        data.nombres,
        data.apellidos,
        data.email,
        data.telefono || null,
        data.fecha_nacimiento || null
    ];
    const [result] = await pool.query(sql, params);
    return (result as QueryResult).insertId || 0;
}

export const update = async (id: number, data: UpdateEstudianteDTO): Promise<number> => {
    const sql = `
        UPDATE estudiantes
        SET codigo = ?, nombres = ?, apellidos = ?, email = ?, telefono = ?, fecha_nacimiento = ?
        WHERE id = ?
    `;
    const params = [
        data.codigo,
        data.nombres, 
        data.apellidos, 
        data.email,
        data.telefono || null,
        data.fecha_nacimiento || null,
        id
    ];

    const [result] = await pool.query(sql, params);
    return (result as QueryResult).affectedRows;
}

export const remove = async (id: number): Promise<number> => {
    const [result] = await pool.query('DELETE FROM estudiantes WHERE id= ?', [id]);
    return (result as QueryResult).affectedRows;
}

