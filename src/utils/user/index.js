import { fetch, authFetch } from '@utils/fetch';

const endpoints = {
  login: 'login',
  signup: 'signup',
  authUser: 'auth-user',
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
