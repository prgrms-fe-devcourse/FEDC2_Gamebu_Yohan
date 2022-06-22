import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useOurSnackbar from './useOurSnackbar';
import useValueContext from './useValueContext';

const useCheckAuth = () => {
  const { initialLoading, isLogin } = useValueContext();
  const navigate = useNavigate();
  const renderSnackbar = useOurSnackbar();

  useEffect(() => {
    if (!isLogin && !initialLoading) {
      renderSnackbar('로그인 유저만 접속 가능한 페이지입니다');
      navigate('/');
    }
  }, [initialLoading, isLogin, navigate, renderSnackbar]);
};

export default useCheckAuth;
