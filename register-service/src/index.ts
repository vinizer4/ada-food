import {ExpressServer} from "./infra/web/express/server";


const main = async () => {
    const server = new ExpressServer()
    await server.start();
}

main().catch(console.error);