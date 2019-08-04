import { Entity, Repository } from '../models';
import { classFactory } from '.';

function createRepository<T extends Entity>(type: (new (...args: any[]) => Repository<T>),
                                            ...args: any[]): Repository<T> {
    const repo =  classFactory.createClass(type, ...args);

    return repo;
}

export default {
    createRepository
};
