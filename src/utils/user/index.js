import { fetch, authFetch } from '@utils/fetch';

const endpoints = {
  login: 'login',
  signup: 'signup',
  authUser: 'auth-user',
  changeMyInfo: 'settings/update-user',
  getUserInfo: (userId) => `users/${userId}`,
  getAllUserList: 'users/get-users',
};

export const loginAPI = (option) => {
  return fetch(endpoints.login, option);
};

export const signupAPI = (option) => {
  return fetch(endpoints.signup, option);
};

export const authUserAPI = () => {
  return authFetch(endpoints.authUser);
};

export const changeMyInfoAPI = (option) => {
  return authFetch(endpoints.changeMyInfo, option);
};

export const getUserInfo = (userId) => {
  return fetch(endpoints.getUserInfo(userId));
};

export const getAllUserList = () => {
  return fetch(endpoints.getAllUserList);
};
