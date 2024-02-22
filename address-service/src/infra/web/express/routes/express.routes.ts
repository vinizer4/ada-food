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
        this.app.get('/addresses:userId', this.addressController.findAddressByUser);
        this.app.post('/addresses', this.addressController.createAddress);
        this.app.put('/addresses', this.addressController.updateAddress);
        this.app.delete('/addresses/:id', this.addressController.deleteAddress);
    }
}