import { authFetch } from '@utils/fetch';

const endpoints = {
  getMyMessageList: 'messages/conversations',
  postMessage: 'messages/create',
};

export const getMyMessageList = () => {
  return authFetch(endpoints.getMyMessageList);
};

export const postMessage = (option) => {
  return authFetch(endpoints.postMessage, option);
};
