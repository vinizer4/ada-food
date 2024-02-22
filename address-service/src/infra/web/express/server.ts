import {MongoConnection} from "../../db/mongo/config/mongo-connection";
import {ExpressConfig} from "./config/express.config";


export class ExpressServer {
    private expressApp: ExpressConfig;

    constructor() {
        this.expressApp = new ExpressConfig();
    }

    public async start(): Promise<void> {
        try {
            await MongoConnection.connect();
            const PORT = Number(process.env.PORT) || 3000;
            this.expressApp.app.listen(PORT, () => {
                console.log(`Express register server running on port ${PORT}`);
            });
        } catch (error) {
            console.error('Failed to start express register server:', error);
        }
    }
}