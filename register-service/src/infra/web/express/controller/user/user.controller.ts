import {CreateUserUsecase} from "../../../../../core/usecase/user/create/create.user.usecase";
import { Request, Response } from 'express';
import {UserRepositoryAdapter} from "../../../../../config/adapters/db/database.adapter";
import {GlobalExceptionHandler} from "../../middleware/exception/global.exception.handler";

export class UserController {
    private static instance: UserController;
    private createUserUseCase: CreateUserUsecase;

    private constructor() {
        this.createUserUseCase = CreateUserUsecase.getInstance(
            UserRepositoryAdapter.getUserRepository()
        );
    }

    public static getInstance(): UserController {
        if (!UserController.instance) {
            UserController.instance = new UserController();
        }
        return UserController.instance;
    }

    async createUser(req: Request, res: Response) {
        try {
            const user = req.body;
            const createdUser = await this.createUserUseCase.execute(user);
            res.status(201).json(createdUser);
        } catch (error: any) {
            GlobalExceptionHandler.handleError(error, req, res);
        }
    }

    async updateUser(req: Request, res: Response) {

    }

}