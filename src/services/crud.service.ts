import { Request, Response, NextFunction } from 'express';
import { Entity, Repository } from '../models';
import { Logger } from 'winston';

class CrudService<T extends Entity> {
    constructor(private repository: Repository<T>,
                private logger: Logger) {
    }

    public get = (req: Request, res: Response, next: NextFunction) => {
        this.logger.info(`Getting all ${this.repository.name} entries.`);

        this.repository
            .getAll()
            .then((data) => {
                res.send(data);
            })
            .catch(next);
    }

    public getById = (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        this.logger.info(`Getting ${this.repository.name} entry by id ${id}.`);

        this.repository
            .getById(id)
            .then((entry) => {
                res.status(200).send(entry);
            })
            .catch(next);
    }

    public post = (req: Request, res: Response, next: NextFunction) => {
        this.logger.info(`Adding new ${this.repository.name} entry.`);

        const entry = req.body as T;

        this.repository
            .add(entry)
            .then((newEntry) => {
                res.status(201).send(newEntry);
            })
            .catch(next);
    }

    public put = (req: Request, res: Response, next: NextFunction) => {
        this.logger.info(`Updating ${this.repository.name} entry.`);

        const entry = req.body as T;

        this.repository
            .replace(entry)
            .then((updatedEntry) => {
                res.status(200).send(updatedEntry);
            })
            .catch(next);
    }

    public remove = (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        this.logger.info(`Deleting ${this.repository.name} entry with id ${id}.`);

        this.repository
            .remove(id)
            .then(() => {
                res.sendStatus(204);
            })
            .catch(next);
    }

    public tryFindById = (req: Request, res: Response, next: NextFunction) => {
        const { id } = req.params;
        this.logger.info(`Trying to find ${this.repository.name} entry with id ${id}.`);

        this.repository
            .getById(id)
            .then((entity) => {
                if (!entity) {
                    res.sendStatus(404);
                    return;
                }

                res.locals.entity = entity;

                next();
            })
            .catch(next);
    }
}

export {
    CrudService
};
