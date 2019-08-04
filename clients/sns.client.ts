import AWS from 'aws-sdk';
import { NotificationClient, Notification } from '../models';

export class SNSClient implements NotificationClient {
    sns: AWS.SNS;

    constructor() {
        this.sns = new AWS.SNS({ apiVersion: '2010-03-31' });
    }

    notify = async (notification: Notification) => {
        const payload = JSON.stringify(notification.content);

        var params = {
            Message: payload,
            MessageStructure: 'json',
            TopicArn: notification.target
        };

        const response = await this.sns.publish(params).promise();

        return response.MessageId;
    }
}