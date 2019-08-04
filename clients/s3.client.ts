import AWS from 'aws-sdk';
import { UploadClient, Target, File } from '../models';

export class S3Client implements UploadClient {
    s3: AWS.S3;

    constructor() {
        this.s3 = new AWS.S3({ apiVersion: '2006-03-01' });
    }

    uploadFile = async (file: File) => {
        const uploadParams = {
            Bucket: file.metadata.target.name,
            Key: `${file.metadata.source.domain}/${file.metadata.id}`,
            Body: file.content
        };

        try {
            const result = await this.s3.upload(uploadParams).promise();
            const { Location: location } = result;

            file.metadata.target.location = location;

            return location;
        } catch (error) {
            console.log(error);

            return '';
        }
    };

    private getBucketNames = async () => {
        const buckets = await this.s3.listBuckets().promise();

        const bucketNames = buckets.Buckets!.map(b => b.Name) || [];

        return bucketNames;
    }

    private createBucket = async (bucketName: string) => {
        const bucketParams = {
            Bucket: bucketName,
            ACL: 'public-read'
        };

        const bucket = await this.s3.createBucket(bucketParams).promise();

        return bucket.Location;
    }

    private getBucketObjectsKeys = async (bucketName: string) => {
        const bucketParams = {
            Bucket: bucketName
        };

        const result = await this.s3.listObjects(bucketParams).promise();

        return result.Contents!.map(o => o.Key);
    }

    private getObject = async (bucketName: string, key: string) => {
        const getParams = {
            Bucket: bucketName,
            Key: key,
        };

        const result = await this.s3.getObject(getParams).promise();

        return result!.Body;
    }
}