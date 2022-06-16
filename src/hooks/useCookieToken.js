import { useState, useCallback } from 'react';

const useCookieToken = (key, defaultValue = null) => {
  const [storedCookie, setStoredCookie] = useState(() => {
    try {
      const item = document.cookie
        ?.split('; ')
        ?.find((cookies) => cookies.includes(key))
        ?.slice(key.length + 1);
      return item || defaultValue;
    } catch (error) {
      console.error(error);
      return defaultValue;
    }
  });

  const setCookie = useCallback(
    (value) => {
      try {
        setStoredCookie(value);
        document.cookie = `${key}=${value}`;
      } catch (error) {
        console.error(error);
      }
    },
    [key]
  );

  return [storedCookie, setCookie];
};

export default useCookieToken;
