import { authFetch } from '@utils/fetch';

const endpoints = {
  getMyMessageList: 'messages/conversations',
  postMessage: 'messages/create',
  getDetailMessage: (userId) => `messages?userId=${userId}`,
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
