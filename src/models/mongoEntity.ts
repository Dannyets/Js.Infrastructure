import { Entity } from '.';
import { ObjectID } from 'mongodb';

export interface MongoEntity extends Entity {
    _id: ObjectID;
}
