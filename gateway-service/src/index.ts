import dotenv from "dotenv";
dotenv.config();

import app from "./infra/http/server/server";

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`API Gateway is running on port ${PORT}`);
});