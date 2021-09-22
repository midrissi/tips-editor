export enum EItemType {
  TEXT = 'text',
  VIDEO = 'video',
}

export interface IItem {
  key: string;
  body: string;
  type: EItemType;
}

export interface IVideoItem extends IItem {
  type: EItemType.VIDEO;
  video: {
    provider: string;
    link: string;
  };
  title: string;
}

export interface ITextItem extends IItem {
  type: EItemType.TEXT;
}

export type TItem = IVideoItem | ITextItem;

export interface IKeyItem {
  label: string;
  group: string;
  value: string;
}

export type TFilterType = '*' | EItemType;

export interface IAppState {
  items: TItem[];
  current: number;
  filter: {
    key: string;
    type: TFilterType;
  };
  keys: IKeyItem[];
}

export enum EActionType {
  SET_CURRENT_ITEM = 'Edit item',
  REMOVE_ITEM = 'Remove item',
  SAVE_ITEM = 'SAVE item',
  SET_KEYS = 'Set Keys',
  SET_ITEMS = 'Set Items',
  FILTER_BY_KEY = 'Filter by key',
  FILTER_BY_TYPE = 'Filter by type',
}

export interface TSetCurrentItemAction {
  type: EActionType.SET_CURRENT_ITEM;
  payload: number;
}

export interface TSetKeysAction {
  type: EActionType.SET_KEYS;
  payload: IKeyItem[];
}

export interface TRemoveItemAction {
  type: EActionType.REMOVE_ITEM;
  payload: number;
}

export interface TSaveItemAction {
  type: EActionType.SAVE_ITEM;
  payload: {
    item: TItem;
    index: number;
  };
}

export interface TSetItemsAction {
  type: EActionType.SET_ITEMS;
  payload: TItem[];
}

export interface TFilterByKeyAction {
  type: EActionType.FILTER_BY_KEY;
  payload: string;
}

export interface TFilterByTypeAction {
  type: EActionType.FILTER_BY_TYPE;
  payload: TFilterType;
}

export type TAction =
  | TSetCurrentItemAction
  | TSetKeysAction
  | TRemoveItemAction
  | TSaveItemAction
  | TFilterByKeyAction
  | TFilterByTypeAction
  | TSetItemsAction;
