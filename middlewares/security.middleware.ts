import { Request, Response, NextFunction } from 'express';
import { authClient } from '../clients';
import { configUtils } from '../utils';
import { ConfigKey } from '../models';

export const securityMiddleware = (accessibleForRoles: string[]) =>
                                  (req: Request, res: Response, next: NextFunction) => {
    const shouldAuthenticate = configUtils.get<boolean>(ConfigKey.ShouldAuthenticate);

    if (!shouldAuthenticate) {
        next();
        return;
    }

    const authToken = req.headers.authorization;

    if (!authToken) {
        next(new Error('Empty token'));
        return;
    }

    authClient.isAuthenticated(accessibleForRoles, authToken)
         .then(() => { next(); })
         .catch(next);
};
