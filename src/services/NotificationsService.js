import 'react-notifications/lib/notifications.css';
import { NotificationManager } from 'react-notifications';

const TITLE = 'Reddit app';

export const success = (message) => {
  NotificationManager.success(message, TITLE);
}

export const info = (message) => {
  NotificationManager.info(message, TITLE);
}