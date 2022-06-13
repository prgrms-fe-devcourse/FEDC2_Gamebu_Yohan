import axios from 'axios';

const API_END_POINT = process.env.REACT_APP_API_END_POINT;

export const fetch = async (url, options) => {
  try {
    const result = await axios(`${API_END_POINT}${url}`, options);
    return result.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};

export const authFetch = async (url, options) => {
  // TODO: 저장 방식 정한 뒤 수정하기.
  const token = window.localStorage.getItem('token');
  try {
    const result = await axios(`${API_END_POINT}${url}`, {
      ...options,
      Authorization: `bearer ${token}`,
    });
    return result.data;
  } catch (error) {
    console.error(error);
    return error;
  }
};
