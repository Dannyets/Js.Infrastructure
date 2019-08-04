import { Target, UploadClient, NotificationClient, ConfigKey, DownloadClient } from "../models";
import { S3Client, SNSClient, LambdaClient, AuthClient } from "../clients";
import { configUtils } from '../utils';

const createUploadClient = (target: Target) : UploadClient | undefined => {
    return new S3Client();
}

const createDownloadClient = (target: Target) : DownloadClient | undefined => {
    return new S3Client();
}

const createNotificationClient = () : NotificationClient => {
    return new SNSClient();
}

const createLambdaClient = () => {
    return new LambdaClient();
}

const createAuthClient = () => {
    const baseUrl = configUtils.get<string>(ConfigKey.AuthClientBaseUrl) || '';

    return new AuthClient(baseUrl);
}

export default {
    createUploadClient,
    createDownloadClient,
    createNotificationClient,
    createLambdaClient,
    createAuthClient
};