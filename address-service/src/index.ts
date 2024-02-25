import {ExpressServer} from "./infra/web/express/server";
import dotenv from 'dotenv';
import {Initializer} from "./config/init/initializer";

const main = async () => {

    dotenv.config();

    console.log(process.env.DB_TYPE)

    await Initializer.initialize();
    const server = new ExpressServer()
    await server.start();
}

main().catch(console.error);