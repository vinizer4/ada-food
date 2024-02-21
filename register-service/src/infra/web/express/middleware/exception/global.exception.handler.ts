import { Request, Response } from 'express';
import {DatabaseOperationException} from "../../../../../core/exception/database.operation.exception";

export class GlobalExceptionHandler {
    static handleError(error: Error, req: Request, res: Response) {
        if (error instanceof DatabaseOperationException) {
            res.status(500).json({ error: error.message });
        } else {
            console.error(error);
            res.status(500).json({ error: "Ocorreu um erro inesperado." });
        }
    }
}