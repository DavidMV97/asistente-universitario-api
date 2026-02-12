import type { Request, Response } from "express";
import { pool } from "../db/mysql.ts";

export const getEstudiantes = async (_req: Request, res: Response) => {
    try {
        const [rows] = await pool.query("SELECT * FROM estudiantes");
        if (Object.keys(rows).length === 0) {
            return res.status(204).json({ message: "No hay registro de estudiantes" });
        }
        res.json(rows);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener estudiantes" });
    }
};

export const getEstudianteById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [rows]: any = await pool.query(
            "SELECT * FROM estudiantes WHERE id = ?",
            [id]
        );

        if (rows.length === 0) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }
        res.json(rows[0]);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener el estudiante" });
    }
};

export const createEstudiante = async (req: Request, res: Response) => {
    const { codigo, nombres, apellidos, email, telefono, fecha_nacimiento } =
        req.body;

    if (!codigo || !nombres || !apellidos) {
        return res.status(400).json({
            message: "codigo, nombres y apellidos son obligatorios",
        });
    }

    try {
        const [result]: any = await pool.query(
            `INSERT INTO estudiantes
            (codigo, nombres, apellidos, email, telefono, fecha_nacimiento)
            VALUES (?, ?, ?, ?, ?, ?)`,
            [codigo, nombres, apellidos, email, telefono, fecha_nacimiento]
        );

        res.status(201).json({
            message: "Estudiante creado",
            id: result.insertId,
        });
    } catch (error: any) {
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Código o email duplicado" });
        }

        res.status(500).json({ message: "Error al crear estudiante" });
    }
};

export const updateEstudiante = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { nombres, apellidos, email, telefono } = req.body;

    try {
        const [result]: any = await pool.query(
            `UPDATE estudiantes
            SET nombres = ?, apellidos = ?, email = ?, telefono = ?
            WHERE id = ?`,
            [nombres, apellidos, email, telefono, id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        res.json({ message: "Estudiante actualizado" });
    } catch (error) {
        console.log(error);
        if (error.code === "ER_DUP_ENTRY") {
            return res.status(409).json({ message: "Código o email duplicado" });
        }
        res.status(500).json({ message: "Error al actualizar estudiante" });
    }
};

export const deleteEstudiante = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const [result]: any = await pool.query(
            "DELETE FROM estudiantes WHERE id = ?",
            [id]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Estudiante no encontrado" });
        }

        res.json({ message: "Estudiante eliminado" });
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar estudiante" });
    }
};
