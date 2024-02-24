import {UserRepositoryAdapter} from "../adapters/db/database.adapter";
import {CreateUserUsecase} from "../../core/usecase/user/create/create.user.usecase";
import {UpdateUserUsecase} from "../../core/usecase/user/update/update.user.usecase";
import {DeleteUserUseCase} from "../../core/usecase/user/delete/delete.user.usecase";
import {FindUserByIdUseCase} from "../../core/usecase/user/find/find.user.by.id.usecase";
import {FindUserByEmailUseCase} from "../../core/usecase/user/find/find.user.by.email.usecase";
import {MessagerindAdapter} from "../adapters/message/messagerind.adapter";
import {AddressApiIntegrationImpl} from "../../infra/integration/api/address/address.api.integration.impl";
import {CreateUserWithAddressUsecase} from "../../core/usecase/user/create/create.user.with.address.usecase";

export class Initializer {
    static async initialize() {
        UserRepositoryAdapter.createUserRepository();

        MessagerindAdapter.createMessagerindAdapter();
        const messagerindAdapter = MessagerindAdapter.getMessagerindAdapter();
        await messagerindAdapter.connect();

        CreateUserUsecase.getInstance(
            UserRepositoryAdapter.getUserRepository(),
            messagerindAdapter
        );
        CreateUserWithAddressUsecase.getInstance(
            UserRepositoryAdapter.getUserRepository(),
            messagerindAdapter,
            AddressApiIntegrationImpl.getInstance()
        );
        UpdateUserUsecase.getInstance(UserRepositoryAdapter.getUserRepository());
        DeleteUserUseCase.getInstance(UserRepositoryAdapter.getUserRepository());
        FindUserByIdUseCase.getInstance(UserRepositoryAdapter.getUserRepository());
        FindUserByEmailUseCase.getInstance(UserRepositoryAdapter.getUserRepository());
    }
}
