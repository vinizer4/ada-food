import {CreateUserUsecase} from "../../../../../core/usecase/user/create/create.user.usecase";
import { Request, Response } from 'express';
import {UserRepositoryAdapter} from "../../../../../config/adapters/db/database.adapter";
import {GlobalExceptionHandler} from "../../middleware/exception/global.exception.handler";
import {UpdateUserUsecase} from "../../../../../core/usecase/user/update/update.user.usecase";
import {DeleteUserUseCase} from "../../../../../core/usecase/user/delete/delete.user.usecase";
import {FindUserByIdUseCase} from "../../../../../core/usecase/user/find/find.user.by.id.usecase";
import {FindUserByEmailUseCase} from "../../../../../core/usecase/user/find/find.user.by.email.usecase";
import {MessagerindAdapter} from "../../../../../config/adapters/message/messagerind.adapter";

export class UserController {
    private static instance: UserController;

    private createUserUseCase: CreateUserUsecase;
    private updateUserUseCase: UpdateUserUsecase;
    private deleteUserUseCase: DeleteUserUseCase;
    private findUserByIdUseCase: FindUserByIdUseCase;
    private findUserByEmailUseCase: FindUserByEmailUseCase;

    private constructor() {
        this.createUserUseCase = CreateUserUsecase.getInstance(
            UserRepositoryAdapter.getUserRepository(),
            MessagerindAdapter.getMessagerindAdapter()
        );
        this.updateUserUseCase = UpdateUserUsecase.getInstance(
            UserRepositoryAdapter.getUserRepository()
        );
        this.deleteUserUseCase = DeleteUserUseCase.getInstance(
            UserRepositoryAdapter.getUserRepository()
        );
        this.findUserByIdUseCase = FindUserByIdUseCase.getInstance(
            UserRepositoryAdapter.getUserRepository()
        );
        this.findUserByEmailUseCase = FindUserByEmailUseCase.getInstance(
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
        try {
            const user = req.body;
            await this.updateUserUseCase.execute(user);
            res.status(204)
        } catch (error: any) {
            GlobalExceptionHandler.handleError(error, req, res);
        }
    }

    async findUserById(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const input = {id: userId};
            const user = await this.findUserByIdUseCase.execute(input);
            res.status(200).json(user);
        } catch (error: any) {
            GlobalExceptionHandler.handleError(error, req, res);
        }
    }

    async findUserByEmail(req: Request, res: Response) {
        try {
            const userEmail = req.path;
            const input = {email: userEmail};
            const user = await this.findUserByEmailUseCase.execute(input);
            res.status(200).json(user);
        } catch (error: any) {
            GlobalExceptionHandler.handleError(error, req, res);
        }
    }

    async deleteUser(req: Request, res: Response) {
        try {
            const userId = req.params.id;
            const input = {id: userId};
            await this.deleteUserUseCase.execute(input);
            res.status(204).send();
        } catch (error: any) {
            GlobalExceptionHandler.handleError(error, req, res);
        }
    }

}