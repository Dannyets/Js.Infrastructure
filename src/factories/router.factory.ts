import express from 'express';
import { SchemaLike } from 'joi';
import { Logger } from 'winston';
import { CrudService } from '../services';
import { Entity, Repository, UserRole } from '../models';
import { validationMiddleware, securityMiddleware } from '../middlewares';

function createDefaultRouter<T extends Entity>(repository: Repository<T>,
                                               logger: Logger,
                                               validationSchema?: SchemaLike) {
    const crudService = new CrudService<T>(repository, logger);

    const router = express.Router();

    if (validationSchema) {
        router.use((req, res, next) => validationMiddleware(req, res, next, validationSchema));
    }

    router.get('/', crudService.get);

    router.get('/:id', crudService.getById);

    router.post('/', securityMiddleware([UserRole.Admin]), crudService.post);

    router.put('/:id', securityMiddleware([UserRole.Admin]), crudService.put);

    router.delete('/:id', securityMiddleware([UserRole.Admin]), crudService.remove);

    return {
        crudService,
        router,
    };
}

export default {
    createDefaultRouter
};
