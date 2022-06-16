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
    }),
    []
  );

  const getAuthUser = useCallback(async () => {
    authUserAPI().then((result) => actions.login(result));
  }, [actions]);

  useEffect(() => {
    const { isLogin } = state;
    if (isLogin) {
      return;
    }
    if (token) {
      getAuthUser();
    }
  }, [state, token, getAuthUser]);

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
