import { pool } from "../db/mysql.ts";
import type { Curso } from "../models/Curso.ts";
import type { Estudiante, CreateEstudiante, UpdateEstudiante } from "../models/Estudiante.ts";
import type { QueryResult } from "../models/Query.ts";

export const findAll = async (): Promise<Estudiante[]> => {
    const [rows] = await pool.query('SELECT * FROM estudiantes WHERE deleted_at IS NULL ORDER BY id DESC');
    return rows as Estudiante[];
}

export const findById = async (id: number): Promise<Estudiante | null> => {
    const [rows] = await pool.query('SELECT * FROM estudiantes WHERE id = ?', [id]);
    return (rows as Estudiante[])[0] || null;
}

export const create = async (data: CreateEstudiante): Promise<number> => {
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

export const update = async (id: number, data: UpdateEstudiante): Promise<number> => {
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

export const softRemove = async (id: number): Promise<number> => {
    const sql = `
        UPDATE estudiantes
        SET deleted_at = NOW()
        WHERE id = ? AND deleted_at IS NULL
    `;
    const params = [
        id
    ];

    const [result] = await pool.query(sql, params);
    return (result as QueryResult).affectedRows;
}

export const getNotasPorCurso = async (estudianteId: number): Promise<Curso[]> => {
    const [rows] = await pool.query(`
        SELECT 
        c.id AS cursoId,
        m.nombre AS nombreMateria,
        m.codigo,
        JSON_ARRAYAGG(
            JSON_OBJECT(
            'valor', n.valor,
            'tipo', n.tipo
            )
        ) AS notas,
        ROUND(AVG(n.valor), 1) AS promedio
        FROM cursos c
        JOIN inscripciones i ON c.id = i.curso_id
        LEFT JOIN notas n ON i.id = n.inscripcion_id 
        LEFT JOIN materias m ON c.materia_id = m.id
        WHERE i.estudiante_id = ?
        GROUP BY c.id, m.nombre
        ORDER BY c.id DESC
    `, [estudianteId]);
    return rows as Curso[];
}

