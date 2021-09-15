import { IAppState, TItem } from './interfaces.store';

export const TIPS_STORAGE_KEY = '__TIPS__';

let items: TItem[] = [];

try {
  items = JSON.parse(
    localStorage.getItem(TIPS_STORAGE_KEY) || '[]',
  ) as TItem[];
} catch (e) {
  items = [];
}

if (!Array.isArray(items)) {
  items = [];
}

export const initialState: IAppState = {
  filter: '',
  items,
  current: -1,
};
