import type { Request, Response, NextFunction } from 'express';

export default function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const status = err.status || 500;
    const message = err.message || 'Error interno';
    console.error(err);
    
    res.status(status).json({
        ok: false,
        message,
    });
};
