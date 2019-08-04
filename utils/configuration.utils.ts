import AWS from "aws-sdk";

const configureAws = () => {
    const config = {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY,
        region: process.env.AWS_REGION || 'us-east-1',
    };

    console.log(`Configuring AWS with args: ${JSON.stringify(config)}`);

    AWS.config.update(config);
}

export default  {
    configureAws
};
