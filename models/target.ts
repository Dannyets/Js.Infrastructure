export interface Target {
    source: TargetSource
    name: string,
    location?: string;
}

export enum TargetSource {
    S3 = 'S3Bucket'
}