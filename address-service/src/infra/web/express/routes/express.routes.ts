import {AddressController} from "../controller/address/address.controller";
import {Express} from "express";

export class ExpressRoutesConfig {
    private app: Express;
    private addressController: AddressController;

    constructor(app: Express) {
        this.app = app;
        this.addressController = AddressController.getInstance();
    }

    public initializeRoutes(): void {
        this.app.get('/addresses:userId', this.addressController.findAddressByUser.bind(this.addressController));
        this.app.post('/addresses', this.addressController.createAddress.bind(this.addressController));
        this.app.put('/addresses', this.addressController.updateAddress.bind(this.addressController));
        this.app.delete('/addresses/:id', this.addressController.deleteAddress.bind(this.addressController));
        this.app.get('/addresses/cep/:cep', this.addressController.findAddressByCep.bind(this.addressController));
    }
}