import { createProxyMiddleware } from 'http-proxy-middleware';

const addressServiceClient = createProxyMiddleware({
    target: process.env.ADDRESS_SERVICE_URL as string,
    changeOrigin: true,
});

export default addressServiceClient;
