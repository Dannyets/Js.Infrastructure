import { Notification } from './notification';

export interface NotificationClient {
    notify: (notification: Notification) => void;
}