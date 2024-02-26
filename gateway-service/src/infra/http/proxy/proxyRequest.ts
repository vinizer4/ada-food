import axios, { AxiosRequestConfig } from 'axios';
import { Request, Response } from 'express';

const proxyRequest = async (req: Request, res: Response, target: string) => {
    try {
        const config: AxiosRequestConfig = {
            method: req.method,
            url: `${target}${req.originalUrl}`,
            ...(req.body && { data: req.body }),
            headers: {
                ...req.headers,
                host: new URL(target).host,
            },
        };


        if (config.headers) {
            delete config.headers['content-length'];
            delete config.headers['content-encoding'];
            delete config.headers['host'];
        }

        const response = await axios(config);

        res.status(response.status).json(response.data);
    } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
            res.status(error.response.status).json(error.response.data);
        } else {
            res.status(500).json({ message: 'Erro ao processar a requisição.' });
        }
    }
};

export default proxyRequest;