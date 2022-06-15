import { useContext } from 'react';
import { actionContext } from '@contexts/ContextProvider';

const useActionContext = () => useContext(actionContext);

export default useActionContext;
