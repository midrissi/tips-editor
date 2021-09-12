import { createContext, useContext, useReducer, FC, Dispatch } from 'react';
import { initialState } from './constants.store';
import { IAppState, TAction } from './interfaces.store';
import { appReducer } from './reducer.store';

const Store = createContext<[IAppState, Dispatch<TAction>]>([
  initialState,
  () => {},
]);

Store.displayName = 'Store';

export const useStore = () => useContext(Store);

export const StoreProvider: FC = ({ children }) => {
  const [globalState, dispatch] = useReducer(appReducer, initialState);

  return (
    <Store.Provider value={[globalState, dispatch]}>{children}</Store.Provider>
  );
};
