import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

export const authenticateJWT = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        try {
            const authServiceResponse = await axios.get(`${process.env.AUTH_SERVICE_URL}/auth/verifytoken`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (authServiceResponse.data === true) {
                next();
            } else {
                res.sendStatus(403);
            }
        } catch (error) {
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(401);
    }
};
