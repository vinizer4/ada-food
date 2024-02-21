import {DatabaseAdapter} from "../adapters/db/database.adapter";

export class Initializer {
    static async initialize() {
        DatabaseAdapter.createAddressRepository();
    }
}
