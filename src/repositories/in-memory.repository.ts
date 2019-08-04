import uuid from 'uuid/v1';
import fs from 'fs';
import { Entity, Repository } from '../models';
import { generalUtils } from '../utils';

export class InMemoryRepository<T extends Entity> implements Repository<T> {
    public name: string;
    private data: T[];
    private idToEntity: any;

    constructor(name: string, dataFilePath: string) {
        this.data = [];
        this.idToEntity = {};
        this.name = name;
        this.init(dataFilePath);
    }

    public getAll = async () => {
        await generalUtils.delay(1000);

        return [ ...this.data ];
    }

    public getById = async (id: string) => {
        await generalUtils.delay(1000);

        return { ...this.idToEntity[id] };
    }

    public add = async (entity: T) => {
        await generalUtils.delay(1000);

        entity.id = uuid();

        this.data.push(entity);

        this.idToEntity[entity.id] = entity;

        return { ...entity };
    }

    public addMany = async (entities: T[]) => {
        const addPromises = entities.map(e => this.add(e));

        const createdEntities = await Promise.all(addPromises);

        return createdEntities;
    }

    public replace = async (entity: T) => {
        await generalUtils.delay(1000);

        const index = await this.findEntityIndex(entity.id);

        if (index < 0) {
            return;
        }

        this.data[index] = entity;
    }

    public patch = async (id: string, fieldsToUpdate: any) => {
        await generalUtils.delay(1000);

        const index = await this.findEntityIndex(id);

        this.data[index] = {
            ...fieldsToUpdate,
            ...this.data[index]
        };
    }

    public remove = async (id: string) => {
        await generalUtils.delay(1000);

        const index = await this.findEntityIndex(id);

        this.data.splice(index, 1);

        this.idToEntity[id] = undefined;
    }

    public removeMany = async (ids: string[]) => {
        const removePromises = ids.map(id => this.remove(id));

        await Promise.all(removePromises);
    }

    public getFiltered = async (filter: (value: T) => boolean) => {
        await generalUtils.delay(1000);

        return this.data.filter(filter);
    }

    private findEntityIndex = async (id: string) => {
        return this.data.findIndex(e => e.id === id);
    }

    private init = (dataFilePath: string) => {
        fs.readFile(dataFilePath, 'utf8', (err, rawData) => {
            if (err) throw err;
            const parsedData: T[] = JSON.parse(rawData);
            this.data = parsedData;

            parsedData.forEach(e => {
                this.idToEntity[e.id] = e;
            });
        });
    }
}
