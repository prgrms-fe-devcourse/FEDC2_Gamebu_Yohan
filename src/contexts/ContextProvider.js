import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import useCookieToken from '@hooks/useCookieToken';
import { GAMEBU_TOKEN } from '@utils/constants';

export const valueContext = createContext();
export const actionContext = createContext();

function ContextProvider({ children }) {
  const [token, setToken] = useCookieToken(GAMEBU_TOKEN);
  const [state, setState] = useState({
    user: null,
    isLogin: false,
    initialLoading: !!token,
    ref: null,
  });

  const actions = useMemo(
    () => ({
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
      setRef(ref) {
        state.ref = ref;
      },
    }),
    [setToken, state]
  );

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
