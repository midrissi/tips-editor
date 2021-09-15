import {
  createContext,
  useContext,
  useReducer,
  FC,
  Dispatch,
  useEffect,
} from 'react';
import { initialState, TIPS_STORAGE_KEY } from './constants.store';
import { IAppState, TAction } from './interfaces.store';
import { appReducer } from './reducer.store';

const Store = createContext<[IAppState, Dispatch<TAction>]>([
  initialState,
  () => {},
]);

Store.displayName = 'Store';

export const useStore = () => useContext(Store);

export const StoreProvider: FC = ({ children }) => {
  const [globalState, dispatch] = useReducer(
    appReducer,
    initialState,
  );

  useEffect(() => {
    localStorage.setItem(
      TIPS_STORAGE_KEY,
      JSON.stringify(globalState.items),
    );
  }, [globalState.items]);

  return (
    <Store.Provider value={[globalState, dispatch]}>
      {children}
    </Store.Provider>
  );
};
