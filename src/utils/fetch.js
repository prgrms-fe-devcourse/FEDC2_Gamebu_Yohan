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

const DONG_TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYyOWYwN2ZhN2UwMWFkMWNiNzI1MDEzMSIsImVtYWlsIjoiZG9uZ2VvbiJ9LCJpYXQiOjE2NTUxOTM5NTF9.GtiQO30CJg2VQQT4CCKOz3yZYjwzEw66aqlwe-ZC8GQ';

export const authFetch = async (url, options) => {
  try {
    // const token = document.cookie
    //   ?.split(';')
    //   ?.find((cookies) => cookies.includes('GAMEBU_TOKEN'))
    //   ?.slice(13);

    // if (token) {
    //   const result = await axios(`${API_END_POINT}${url}`, {
    //     ...options,
    //     headers: {
    //       Authorization: `bearer ${token}`,
    //     },
    //   });
    //   return result.data;
    // }
    const result = await axios(`${API_END_POINT}${url}`, {
      ...options,
      headers: {
        Authorization: `bearer ${DONG_TOKEN}`,
      },
    });
    return result.data;

    // throw new Error('token is not found in cookie');
  } catch (error) {
    console.error(error);
    return error;
  }
};
