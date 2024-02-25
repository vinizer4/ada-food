import express from 'express';
import {authenticateJWT} from "../middleware/authenticate.jwt";
import orderServiceClient from "../clients/order.service.client";
import addressServiceClient from "../clients/address.service.client";
import authServiceClient from "../clients/auth.service.client";


const server = express();

server.use(express.json());

server.get('/health', (req, res) => {
    res.status(200).send('OK');
});
server.use('/order/*', authenticateJWT, orderServiceClient);
server.use('/addresses/*', authenticateJWT, addressServiceClient);
server.use('/register/*', authenticateJWT, orderServiceClient);
server.use('/auth/*', authServiceClient);

export default server;
