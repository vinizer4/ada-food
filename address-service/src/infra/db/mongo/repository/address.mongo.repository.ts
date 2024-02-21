import {AddressRepository} from "../../../../core/application/address/repository/address.repository.interface";
import {Address} from "cluster";
import AddressModel from "../model/address.model";
import {DatabaseOperationException} from "../../../../core/exception/database.operation.exception";


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

    async findAddressByUserId(userId: string): Promise<Address | null> {
        try {
            const address = await AddressModel.findOne({ userId });
            return address ? address.toObject() : null;
        } catch (error) {
            console.error("[AddressMongoRepository] Erro ao buscar endereço por userId no banco:", error);
            throw new DatabaseOperationException("Falha ao buscar endereço por userId no banco de dados MongoDb.");
        }
    }

    async findAddressById(id: string): Promise<Address | null> {
        try {
            const address = await AddressModel.findById(id);
            return address ? address.toObject() : null;
        } catch (error) {
            console.error("[AddressMongoRepository] Erro ao buscar endereço por id no banco:", error);
            throw new DatabaseOperationException("Falha ao buscar endereço por id no banco de dados MongoDb.");
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
