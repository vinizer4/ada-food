import {ExpressConfig} from "../config/express.config";

export class ExpressServer {
    private expressApp: ExpressConfig;

    constructor() {
        this.expressApp = new ExpressConfig();
    }

    public async start() {
        try {
            const PORT = Number(process.env.PORT) || 3000;
            this.expressApp.app.listen(PORT, () => {
                console.log(`Express auth server running on port ${PORT}`);
            });
        } catch (error: any) {
            console.error("[ExpressServer] - Erro ao iniciar servidor: ", error);
        }
    }
}