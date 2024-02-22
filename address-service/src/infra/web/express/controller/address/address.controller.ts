import {CreateAddressUsecase} from "../../../../../core/application/usecase/address/create/create.address.usecase";
import {UpdateAddressUsecase} from "../../../../../core/application/usecase/address/update/update.address.usecase";
import {DeleteAdressUsecase} from "../../../../../core/application/usecase/address/delete/delete.address.usecase";
import {
    FindAddressByUserUsecase
} from "../../../../../core/application/usecase/address/find/find.address.by.user.usecase";
import {DatabaseAdapter} from "../../../../../config/adapters/db/database.adapter";
import { Request, Response } from 'express';
import {GlobalExceptionHandler} from "../../middleware/exception/global.exception.handler";

export class AddressController {
    private static _instance: AddressController;

    private createAddressUseCase: CreateAddressUsecase;
    private updateAddressUseCase: UpdateAddressUsecase;
    private deleteAddressUseCase: DeleteAdressUsecase;
    private findAddressByIdUseCase: FindAddressByUserUsecase;

    private constructor() {
        this.createAddressUseCase = CreateAddressUsecase.getInstance(
            DatabaseAdapter.getAddressRepository()
        );
        this.updateAddressUseCase = UpdateAddressUsecase.getInstance(
            DatabaseAdapter.getAddressRepository()
        );
        this.deleteAddressUseCase = DeleteAdressUsecase.getInstance(
            DatabaseAdapter.getAddressRepository()
        );
        this.findAddressByIdUseCase = FindAddressByUserUsecase.getInstance(
            DatabaseAdapter.getAddressRepository()
        );
    }

    public static getInstance(): AddressController {
        if (!AddressController._instance) {
            AddressController._instance = new AddressController();
        }
        return AddressController._instance;
    }

    async createAddress(req: Request, res: Response) {
        try {
            const address = req.body;
            const createdAddress = await this.createAddressUseCase.execute(address);
            res.status(201).json(createdAddress);
        } catch (error: any) {
            GlobalExceptionHandler.handleError(error, req, res);
        }
    }

    async updateAddress(req: Request, res: Response) {
        try {
            const address = req.body;
            await this.updateAddressUseCase.execute(address);
            res.status(204).send();
        } catch (error: any) {
            GlobalExceptionHandler.handleError(error, req, res);
        }
    }

    async deleteAddress(req: Request, res: Response) {
        try {
            const id = req.params.id;
            await this.deleteAddressUseCase.execute(id);
            res.status(204).send();
        } catch (error: any) {
            GlobalExceptionHandler.handleError(error, req, res);
        }
    }

    async findAddressByUser(req: Request, res: Response) {
        try {
            const userId = req.params.userId;
            const addresses = await this.findAddressByIdUseCase.execute(userId);
            res.status(200).json(addresses);
        } catch (error: any) {
            GlobalExceptionHandler.handleError(error, req, res);
        }
    }
}