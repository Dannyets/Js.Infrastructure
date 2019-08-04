import { LambdaService, HtmlParserService } from "../services";
import { clientFactory } from '.';

const lambdaClient = clientFactory.createLambdaClient();

const createLambdaService = () => {
    return new LambdaService(lambdaClient);
}

const createHtmlParserService = () => {
    return new HtmlParserService();
}

export default {
    createLambdaService,
    createHtmlParserService
}