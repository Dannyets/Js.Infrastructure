import winston from 'winston';
import { logUtils } from '../utils';

function createLogger(name: string) {
    const options = logUtils.createLoggerOptions(name);

    return winston.createLogger(options);
}

export default {
    createLogger
};
