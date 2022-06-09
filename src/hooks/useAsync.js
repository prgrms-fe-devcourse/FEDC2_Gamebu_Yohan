import { useEffect } from 'react';
import useAsyncFn from '@hooks/useAsyncFn';

const useAsync = (fn, deps) => {
  const [state, callback] = useAsyncFn(fn, deps);
  useEffect(() => {
    callback();
  }, [callback]);
  return state;
};

export default useAsync;
