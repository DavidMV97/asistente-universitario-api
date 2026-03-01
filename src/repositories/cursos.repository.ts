import { pool } from "../db/mysql.ts";
import type { CreateCurso, Curso, UpdateCurso } from "../models/Curso.ts";
import type { QueryResult } from "../models/Query.ts";


export const findAll = async (): Promise<Curso[]> => {
    const [rows] = await pool.query(`
        SELECT c.*, m.nombre as nombreMateria 
        FROM cursos c 
        LEFT JOIN materias m ON c.materia_id = m.id 
        ORDER BY c.id DESC
    `);
    return rows as Curso[];
}

export const findById = async (id: number): Promise<Curso | null> => {
    const [rows] = await pool.query(`
        SELECT c.*, m.nombre as nombreMateria 
        FROM cursos c 
        LEFT JOIN materias m ON c.materia_id = m.id 
        WHERE c.id = ?
    `, [id]);
    return (rows as Curso[])[0] || null;
}

export const create = async (data: CreateCurso): Promise<number> => {
    const sql = `
        INSERT INTO cursos (materia_id, docente_id, anio, periodo, cupos)
        VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
        data.materia_id,
        data.docente_id,
        data.anio,
        data.periodo,
        data.cupos
    ];
    const [result] = await pool.query(sql, params);
    return (result as QueryResult).insertId || 0;
}

export const update = async (id: number, data: UpdateCurso): Promise<number> => {
    const sql = `
        UPDATE cursos
        SET materia_id = ?, docente_id = ?, anio = ?, periodo = ?, cupos = ?
        WHERE id = ?
    `;
    const params = [
        data.materia_id,
        data.docente_id,
        data.anio,
        data.periodo,
        data.cupos,
        id
    ];

    const [result] = await pool.query(sql, params);
    return (result as QueryResult).affectedRows;
}

export const remove = async (id: number): Promise<number> => {
    const [result] = await pool.query('DELETE FROM cursos WHERE id= ?', [id]);
    return (result as QueryResult).affectedRows;
}

export const findByEstudiante = async (estudianteId: number): Promise<Curso[]> => {
    const [rows] = await pool.query(`
        SELECT c.*, m.nombre as nombreMateria
        FROM cursos c
        JOIN inscripciones i ON c.id = i.curso_id
        LEFT JOIN materias m ON c.materia_id = m.id
        WHERE i.estudiante_id = ?
        ORDER BY c.id DESC
    `, [estudianteId]);
    return rows as Curso[];
}

export const findNotEnrolledByEstudiante = async (estudianteId: number): Promise<Curso[]> => {
    const [rows] = await pool.query(`
        SELECT c.*, m.nombre as nombreMateria
        FROM cursos c
        LEFT JOIN materias m ON c.materia_id = m.id
        LEFT JOIN inscripciones i ON c.id = i.curso_id AND i.estudiante_id = ?
        WHERE i.id IS NULL
        ORDER BY c.id DESC
    `, [estudianteId]);
    return rows as Curso[];
}

