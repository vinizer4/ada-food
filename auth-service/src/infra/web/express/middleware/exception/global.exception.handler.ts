import { Request, Response } from 'express';
import {UsecaseExecutionException} from "../../../../../core/exception/usecase.execution.exception";
import {ResourceNotfoundException} from "../../../../../core/exception/resource.notfound.exception";
import {AuthenticationException} from "../../../../../core/exception/authentication.exception";

export class GlobalExceptionHandler {
    static handleError(error: Error, req: Request, res: Response) {
        if (error instanceof UsecaseExecutionException) {
            return res.status(500).json({ error: error.message });
        }
        if (error instanceof ResourceNotfoundException) {
            return res.status(404).json({ error: error.message });
        }
        if (error instanceof AuthenticationException) {
            return res.status(401).json({ error: error.message });
        }
        else {
            console.error(error);
            return res.status(500).json({ error: "An unexpected error occurred." });
        }
    }
}