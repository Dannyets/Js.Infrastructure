import joi from 'joi';
import { NextFunction } from 'express';

function getOrThrow<T>(value: any, schema: joi.SchemaLike, next?: NextFunction): T {
  const {error, value: v} = joi.validate(value, schema);
  if (error) {
    if (next) {
      next(error);
    } else {
      throw error;
    }
  }

  return v;
}

export default {
  getOrThrow,
};
