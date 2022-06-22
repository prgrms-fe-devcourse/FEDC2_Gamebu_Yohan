import { authFetch } from '@utils/fetch';

const endpoints = {
  fetchNotifications: 'notifications',
  seenNotificationAll: 'notifications/seen',
};

export const fetchNotifications = () => {
  return authFetch(endpoints.fetchNotifications);
};

export const seenNotificationAll = () => {
  return authFetch(endpoints.seenNotificationAll, {
    method: 'PUT',
  });
};
