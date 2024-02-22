import {DatabaseAdapter} from "../adapters/db/database.adapter";
import {CreateAddressUsecase} from "../../core/application/usecase/address/create/create.address.usecase";
import {UpdateAddressUsecase} from "../../core/application/usecase/address/update/update.address.usecase";
import {DeleteAdressUsecase} from "../../core/application/usecase/address/delete/delete.address.usecase";
import {FindAddressByUserUsecase} from "../../core/application/usecase/address/find/find.address.by.user.usecase";

export class Initializer {
    static async initialize() {
        DatabaseAdapter.createAddressRepository();
        CreateAddressUsecase.getInstance(DatabaseAdapter.getAddressRepository());
        UpdateAddressUsecase.getInstance(DatabaseAdapter.getAddressRepository());
        DeleteAdressUsecase.getInstance(DatabaseAdapter.getAddressRepository());
        FindAddressByUserUsecase.getInstance(DatabaseAdapter.getAddressRepository());
    }
}
