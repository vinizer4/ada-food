import { Request, Response } from 'express';
import {DatabaseOperationException} from "../../../../../core/exception/database.operation.exception";
import {UsecaseExecutionException} from "../../../../../core/exception/usecase.execution.exception";
import {ResourceNotfoundException} from "../../../../../core/exception/resource.notfound.exception";

export class GlobalExceptionHandler {
    static handleError(error: Error, req: Request, res: Response) {
        if (error instanceof DatabaseOperationException) {
            res.status(500).json({ error: error.message });
        }
        if (error instanceof UsecaseExecutionException) {
            res.status(500).json({ error: error.message });
        }
        if (error instanceof ResourceNotfoundException) {
            res.status(404).json({ error: error.message });
        }
        else {
            console.error(error);
            res.status(500).json({ error: "An unexpected error occurred." });
        }
    }
}