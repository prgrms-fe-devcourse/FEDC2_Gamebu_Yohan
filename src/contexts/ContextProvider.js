import {
  createContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import useCookieToken from '@hooks/useCookieToken';
import { GAMEBU_TOKEN } from '@utils/constants';
import { authUserAPI } from '../utils/user/index';

export const valueContext = createContext();
export const actionContext = createContext();

function ContextProvider({ children }) {
  const [token] = useCookieToken(GAMEBU_TOKEN);
  const [state, setState] = useState({
    test: 100,
    user: null,
    isLogin: false,
  });

  const actions = useMemo(
    () => ({
      changeTest(newValue) {
        setState((prevState) => ({ ...prevState, test: newValue }));
      },
      login(user) {
        setState((prevState) => ({
          ...prevState,
          isLogin: true,
          user,
        }));
      },
      favorites(user) {
        console.log('favorite is run');
        setState((prevState) => ({
          ...prevState,
          user,
        }));
      },
    }),
    []
  );

  const getAuthUser = useCallback(async () => {
    authUserAPI().then((result) => actions.login(result));
  }, [actions]);

  useEffect(() => {
    const { isLogin } = state;
    if (isLogin) {
      console.log('정상 로그인');
      return;
    }
    if (token) {
      console.log('새로고침');
      getAuthUser();
      return;
    }
    console.log('로그인 X');
  }, [state, token, getAuthUser]);

  useEffect(() => {
    console.log('state');
    console.log(state);
  }, [state]);

  return (
    <actionContext.Provider value={actions}>
      <valueContext.Provider value={state}>{children}</valueContext.Provider>
    </actionContext.Provider>
  );
}

ContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ContextProvider;
