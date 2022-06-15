import { useContext } from 'react';
import { valueContext } from '@contexts/ContextProvider';

const useValueContext = () => useContext(valueContext);

export default useValueContext;
