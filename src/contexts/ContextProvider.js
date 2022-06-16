import {
  createContext,
  useMemo,
  useState,
  useEffect,
  useCallback,
} from 'react';
import PropTypes from 'prop-types';
import useCookieToken from '@hooks/useCookieToken';
import { authFetch } from '@utils/fetch';

export const valueContext = createContext();
export const actionContext = createContext();

function ContextProvider({ children }) {
  const { token } = useCookieToken();
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
        setState((prevState) => ({
          ...prevState,
          user,
        }));
      },
    }),
    []
  );

  const getAuthUser = useCallback(async () => {
    return authFetch('auth-user').then((result) => actions.login(result));
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
