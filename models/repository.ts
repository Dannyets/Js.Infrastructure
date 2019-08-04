import { Entity } from '.';

export interface Repository<T extends Entity> {
    name: string;
    getAll: () => Promise<T[]>;
    getById: (id: string) => Promise<T | null>;
    add: (entity: T) => Promise<T>;
    addMany: (entities: T[]) => Promise<T[]>;
    replace: (entity: T) => Promise<void>;
    patch: (id: string, fieldsToUpdate: any) => Promise<void>;
    remove: (id: string) => Promise<void>;
    removeMany: (ids: string[]) => Promise<void>;
    getFiltered: (filter: (value: T) => boolean) => Promise<T[]>;
}
