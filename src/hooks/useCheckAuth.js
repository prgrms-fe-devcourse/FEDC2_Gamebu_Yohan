import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useValueContext from './useValueContext';

const useCheckAuth = () => {
  const { initialLoading, isLogin } = useValueContext();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLogin && !initialLoading) {
      navigate('/');
    }
  }, [initialLoading, isLogin, navigate]);
};

export default useCheckAuth;
