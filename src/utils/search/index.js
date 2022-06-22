import { fetch } from '@utils/fetch';

const endpoints = {
  userList: (keyword) => `search/users/${keyword}`,
  userAndPostList: (keyword) => `search/all/${keyword}`,
};

export const searchAll = (keyword) => {
  return fetch(endpoints.userAndPostList(keyword));
};

export const searchUser = (keyword) => {
  return fetch(endpoints.userList(keyword));
};
