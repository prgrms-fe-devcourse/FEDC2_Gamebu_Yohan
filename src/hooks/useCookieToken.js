import { useState, useCallback } from 'react';
import { GAMEBU_TOKEN } from '@utils/constants';

const useCookieToken = () => {
  const [storedCookie, setStoredCookie] = useState(() => {
    try {
      const item = document.cookie
        ?.split(';')
        ?.find((cookies) => cookies.includes(GAMEBU_TOKEN))
        ?.slice(13);
      return item || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  });

  const setCookie = useCallback((value) => {
    try {
      setStoredCookie(value);
      document.cookie = `${GAMEBU_TOKEN}=${value}`;
    } catch (error) {
      console.error(error);
    }
  }, []);

  return {
    token: storedCookie,
    setCookie,
  };
};

export default useCookieToken;
