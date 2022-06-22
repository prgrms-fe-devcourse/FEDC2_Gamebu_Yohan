import { useState, useRef, useEffect, useCallback } from 'react';

const useInterval = (fn, delay) => {
  const [count, setCount] = useState(0);
  const intervalId = useRef(null);

  useEffect(() => {
    fn();
    if (intervalId.current !== null) {
      clearInterval(intervalId);
    }
    intervalId.current = setInterval(fn, delay);

    return () => {
      intervalId.current && clearInterval(intervalId.current);
    };
  }, [delay, fn, intervalId, count]);

  const keepInterval = useCallback(() => {
    setCount((prevCount) => prevCount + 1);
  }, []);

  return keepInterval;
};

export default useInterval;
