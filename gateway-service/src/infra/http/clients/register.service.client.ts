import { createProxyMiddleware } from 'http-proxy-middleware';

const registerServiceClient = createProxyMiddleware({
    target: process.env.REGISTER_SERVICE_URL as string,
    changeOrigin: true,
});

export default registerServiceClient;
