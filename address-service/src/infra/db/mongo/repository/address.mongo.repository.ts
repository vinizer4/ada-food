import {AddressRepository} from "../../../../core/application/repository/address/address.repository.interface";
import AddressModel from "../model/address.model";
import {DatabaseOperationException} from "../../../../core/exception/database.operation.exception";
import Address from "../../../../core/domain/address/entity/address";


export class AddressMongoRepository implements AddressRepository {
    private static instance: AddressMongoRepository;

    private constructor() {}

    public static getInstance(): AddressMongoRepository {
        if (!AddressMongoRepository.instance) {
            AddressMongoRepository.instance = new AddressMongoRepository();
        }
        return AddressMongoRepository.instance;
    }

    async createAddress(address: Address): Promise<Address> {
        try {
            const createdAddress = await AddressModel.create(address);
            return createdAddress.toObject();
        } catch (error) {
            console.error("[AddressMongoRepository] Erro ao criar endereço no banco:", error);
            throw new DatabaseOperationException("Falha ao criar endereço no banco de dados MongoDb.");
        }
    }

    async findAddressesByUserId(userId: string): Promise<Address[] | null> {
        try {
            const addresses = await AddressModel.find({ userId });
            return addresses.map(address => address.toObject());
        } catch (error) {
            console.error("[AddressMongoRepository] Erro ao buscar endereços por userId no banco:", error);
            throw new DatabaseOperationException("Falha ao buscar endereços por userId no banco de dados MongoDb.");
        }
    }

    async updateAddress(id: string, address: Address): Promise<void> {
        try {
            await AddressModel.findByIdAndUpdate(id, address);
        } catch (error) {
            console.error("[AddressMongoRepository] Erro ao atualizar endereço no banco:", error);
            throw new DatabaseOperationException("Falha ao atualizar endereço no banco de dados MongoDb.");
        }
    }

    async deleteAddress(id: string): Promise<void> {
        try {
            await AddressModel.findByIdAndDelete(id);
        } catch (error) {
            console.error("[AddressMongoRepository] Erro ao deletar endereço no banco:", error);
            throw new DatabaseOperationException("Falha ao deletar endereço no banco de dados MongoDb.");
        }
    }
}
