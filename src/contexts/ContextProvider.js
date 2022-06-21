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
import { authUserAPI } from '@utils/user';

export const valueContext = createContext();
export const actionContext = createContext();

function ContextProvider({ children }) {
  const [token, setToken] = useCookieToken(GAMEBU_TOKEN);
  const [state, setState] = useState({
    test: 100,
    user: null,
    isLogin: false,
    initialLoading: !!token,
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
          initialLoading: false,
          user,
        }));
      },
      favorites(user) {
        setState((prevState) => ({
          ...prevState,
          user,
        }));
      },
      logout() {
        setState((prevState) => ({
          ...prevState,
          isLogin: false,
          user: null,
        }));
        setToken('');
      },
    }),
    [setToken]
  );

  const getAuthUser = useCallback(async () => {
    authUserAPI().then((result) => result && actions.login(result));
  }, [actions]);

  useEffect(() => {
    const { initialLoading } = state;
    if (initialLoading) {
      getAuthUser();
      return;
    }
  }, [state, getAuthUser]);

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
