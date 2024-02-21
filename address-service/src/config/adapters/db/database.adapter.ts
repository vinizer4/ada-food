import {AddressRepository} from "../../../core/application/address/repository/address.repository.interface";

export class DatabaseAdapter {
    private static addressRepository: AddressRepository;

    static getAddressRepository(): AddressRepository {
        if (!this.addressRepository) {
            throw new Error("Initializer not run.");
        }
        return this.addressRepository;
    }

    static createAddressRepository() {
        // if (process.env.DB_TYPE === 'mongo') {
        //     this.addressRepository = AddressMongoRepository.getInstance();
        // } else {
        //     throw new Error('Invalid database');
        // }
    }
}