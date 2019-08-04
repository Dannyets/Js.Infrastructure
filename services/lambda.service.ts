import { LambdaClient } from '../clients';
import { File, LambdaType, FileMetada, LambdaParams } from '../models';

export class LambdaService {
    constructor(private lambdaClient: LambdaClient) {
    }

    crawl = async (file: File) => {
        const params = this.createLambdaParams(file.metadata, LambdaType.Crawler)
        
        return await this.trigger(params);
    }

    extractData = async (file: File) => {
        const params = this.createLambdaParams(file.metadata, LambdaType.DataExtracter)

        return await this.trigger(params);
    }

    private trigger = async (lambdaParams: LambdaParams) => {
        console.log(`Triggering lambda ${lambdaParams.functionName} with payload: ${JSON.stringify(lambdaParams.payload)}`)

        return await this.lambdaClient.trigger(lambdaParams);
    }

    private createLambdaParams = (fileMetadata: FileMetada, lambdaType: LambdaType) : LambdaParams => {
        const source = fileMetadata.source;
        const functionName = `${source.domain}${source.sourceType}${lambdaType}`;
        
        return {
            functionName,
            payload: fileMetadata
        };
    };
}