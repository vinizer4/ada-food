import dotenv from "dotenv";
dotenv.config();

import server from "./infra/http/server/server";

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});