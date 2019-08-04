import { Request, Response, NextFunction } from 'express';

export function joiErrorHandlerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
    if (err && err.isJoi) {
      res.status(400).send(err.details);
    } else {
      next(err);
    }
}
