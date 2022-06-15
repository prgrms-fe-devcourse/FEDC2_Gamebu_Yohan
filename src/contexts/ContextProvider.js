import { createContext, useMemo, useState } from 'react';
import PropTypes from 'prop-types';

export const valueContext = createContext();
export const actionContext = createContext();

function ContextProvider({ children }) {
  const [state, setState] = useState({
    test: 100,
  });

  const actions = useMemo(
    () => ({
      changeTest(newValue) {
        setState((prevState) => ({ ...prevState, test: newValue }));
      },
    }),
    []
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
