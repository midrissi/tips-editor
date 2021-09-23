import { IAppState } from './interfaces.store';

export const TIPS_STORAGE_KEY = '__TIPS__';
export const TIPS_URL =
  'https://raw.githubusercontent.com/4d/Web-studio-TIPS/main/tips.json';

export const initialState: IAppState = {
  filter: {
    key: '',
    type: '*',
  },
  items: [],
  current: -1,
  keys: [],
};
