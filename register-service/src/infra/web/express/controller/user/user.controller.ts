import {CreateUserUseCase} from "../../../../../core/usecase/user/create/createUserUseCase";
import { Request, Response } from 'express';
import {UserRepositoryAdapter} from "../../../../../config/adapters/db/database.adapter";

export class UserController {
    private static instance: UserController;
    private createUserUseCase: CreateUserUseCase;

    private constructor() {
        this.createUserUseCase = CreateUserUseCase.getInstance(
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
        } catch (error) {
            console.error("[UserController] - Error creating user: ", error);
            res.status(500).json({ error: "Ocorreu um erro inesperado" });
        }
    }

}