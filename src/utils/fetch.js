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
  try {
    const token = document.cookie
      ?.split('; ')
      ?.find((cookies) => cookies.includes('GAMEBU_TOKEN'))
      ?.slice(13);

    if (token) {
      const result = await axios(`${API_END_POINT}${url}`, {
        ...options,
        headers: {
          Authorization: `bearer ${token}`,
        },
      });
      return result.data;
    }

    throw new Error('token is not found in cookie');
  } catch (error) {
    console.error(error);
    return error;
  }
};
