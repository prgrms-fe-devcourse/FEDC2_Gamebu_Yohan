import { authFetch } from '@utils/fetch';

const endpoints = {
  getMyMessageList: 'messages/conversations',
  postMessage: 'messages/create',
  getDetailMessage: (userId) => `messages?userId=${userId}`,
  postMessageNotification: 'notifications/create',
};

export const getMyMessageList = () => {
  return authFetch(endpoints.getMyMessageList);
};

export const postMessage = (option) => {
  return authFetch(endpoints.postMessage, option);
};

export const getDetailMessage = (userId) => {
  return authFetch(endpoints.getDetailMessage(userId));
};

export const postMessageNotification = (notificationTypeId, userId) => {
  return authFetch(endpoints.postMessageNotification, {
    method: 'POST',
    data: {
      notificationType: 'MESSAGE',
      notificationTypeId,
      userId,
      postId: null,
    },
  });
};
