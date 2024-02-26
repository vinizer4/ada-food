import { createProxyMiddleware } from 'http-proxy-middleware';

const orderServiceClient = createProxyMiddleware({
    target: process.env.ORDER_SERVICE_URL as string,
    changeOrigin: true,
});

export default orderServiceClient;
