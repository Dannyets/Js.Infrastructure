import { Request, Response, NextFunction } from 'express';

export function logMiddleware(req: Request, res: Response, next: NextFunction){
    console.log(`Time: ${Date.now().toLocaleString()}, Request: ${req.url}`);
    next();
}