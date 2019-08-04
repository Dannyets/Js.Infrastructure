import uuid from 'uuid/v1';
import { MongoEntity, Repository } from '../models';
import mongodb, { Collection, ObjectID } from 'mongodb';

export class MongoRepository<T extends MongoEntity> implements Repository<T> {
    public name: string;
    private collection: Collection<T> | undefined;

    constructor(name: string, connectionString: string) {
        this.name = name;

        this.init(name, connectionString);
    }

    public getAll = async () => {
        return await this.collection!.find({}).toArray();
    }

    public getById = async (id: string) => {
        const objectId = new ObjectID(id);

        return await this.collection!.findOne({ _id: objectId });
    }

    public add = async (entity: T) => {
        this.assignId(entity);

        this.collection!.insertOne(entity);

        return entity;
    }

    public addMany = async (entities: T[]) => {
        entities.forEach(this.assignId);

        this.collection!.insertMany(entities);

        return entities;
    }

    public replace = async (entity: T) => {
        const objectId = new ObjectID(entity.id);

        await this.collection!.replaceOne(
            { _id: objectId },
            entity,
            { upsert: true}, // update or insert if not exists (can be used with update methods too)
        );
    }

    public patch =  async (id: string, fieldsToUpdate: any) => {
        await this.collection!.updateOne(
            { _id: new ObjectID(id) },
            {
                $set: { ...fieldsToUpdate },
                $currentDate: { lastModified: true },
            },
        );
    }

    public remove = async (id: string) => {
        const objectId = new ObjectID(id);

        await this.collection!.deleteOne({ _id: objectId });
    }

    public removeMany = async (ids: string[]) => {
        const objectIds = ids.map(id => new ObjectID(id));

        await this.collection!.deleteMany({ _id : { $in : objectIds } });
    }

    public getFiltered = async (filter: (value: T) => boolean) => {
        return [];
    }

    private init = async (name: string, connectionString: string) => {
        const options = { useNewUrlParser: true };

        const client = await mongodb.MongoClient.connect(connectionString, options);

        const db = client.db();

        this.collection = db.collection<T>(name);
    }

    private generateId = () => {
        const id = uuid();

        const objectId = new ObjectID(id);

        return objectId;
    }

    private assignId = (entity: T) => {
        entity._id = this.generateId();
        entity.id = entity._id.toHexString();
    }
}
