import express from 'express';
import dotenv from 'dotenv';
import {authenticateJWT} from "../middleware/authenticate.jwt";
import proxyRequest from "../proxy/proxyRequest";
import e from "express";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/register/user', (req, res) => proxyRequest(req, res, process.env.REGISTER_SERVICE_URL as string));
app.post('/register/userwithaddress', (req, res) => proxyRequest(req, res, process.env.REGISTER_SERVICE_URL as string));


app.post('/order/*', authenticateJWT, (req, res) => proxyRequest(req, res, process.env.ORDER_SERVICE_URL as string));
app.get('/order/*', authenticateJWT, (req, res) => proxyRequest(req, res, process.env.ORDER_SERVICE_URL as string));
app.post('/addresses', authenticateJWT, (req, res) => proxyRequest(req, res, process.env.ADDRESS_SERVICE_URL as string));
app.get('/addresses/*', authenticateJWT, (req, res) => proxyRequest(req, res, process.env.ADDRESS_SERVICE_URL as string));
app.delete('/addresses/*', authenticateJWT, (req, res) => proxyRequest(req, res, process.env.ADDRESS_SERVICE_URL as string));
app.put('/addresses', authenticateJWT, (req, res) => proxyRequest(req, res, process.env.ADDRESS_SERVICE_URL as string));
app.use('/auth/*', (req, res) => proxyRequest(req, res, process.env.AUTH_SERVICE_URL as string));
app.get('/user/*', authenticateJWT, (req, res) => proxyRequest(req, res, process.env.REGISTER_SERVICE_URL as string));
app.get('/user/*', authenticateJWT, (req, res) => proxyRequest(req, res, process.env.REGISTER_SERVICE_URL as string));
app.get('/userwithaddress/*', authenticateJWT, (req, res) => proxyRequest(req, res, process.env.REGISTER_SERVICE_URL as string));
app.put('/user', authenticateJWT, (req, res) => proxyRequest(req, res, process.env.REGISTER_SERVICE_URL as string));
app.delete('/user/*', authenticateJWT, (req, res) => proxyRequest(req, res, process.env.REGISTER_SERVICE_URL as string));

app.delete('/register/*', authenticateJWT, (req, res) => proxyRequest(req, res, process.env.REGISTER_SERVICE_URL as string));

export default app;