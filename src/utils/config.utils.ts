import AWS from "aws-sdk";

declare const process: NodeJS.Process;

function get<T>(key: string): T | undefined {
    const configValue: any = process.env[key];

    if (!configValue) {
        return;
    }

    try {
        const parsedValue = JSON.parse(configValue);
        return parsedValue as T;
    } catch (error) {
        return configValue;
    }
}

const configureAws = () => {
    const config = {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION || 'us-east-1',
    };

    console.log(`Configuring AWS with args: ${JSON.stringify(config)}`);

    AWS.config.update(config);
}

export default {
    get,
    configureAws
};
