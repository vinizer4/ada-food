import { createProxyMiddleware } from 'http-proxy-middleware';

const authServiceClient = createProxyMiddleware({
    target: process.env.AUTH_SERVICE_URL as string,
    changeOrigin: true,
});

export default authServiceClient;
