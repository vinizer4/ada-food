import {ExpressServer} from "./infra/web/express/server";
import dotenv from 'dotenv';

dotenv.config();

const main = async () => {
    const server = new ExpressServer()
    await server.start();
}

main().catch(console.error);