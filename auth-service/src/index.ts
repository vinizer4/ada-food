import dotenv from 'dotenv';
import {Initializer} from "./config/init/initializer";
import {ExpressServer} from "./infra/web/express/server/server";

const main = async () => {
    dotenv.config()

    await Initializer.initialize()

    const server = new ExpressServer()
    await server.start()
}

main().catch(console.error)