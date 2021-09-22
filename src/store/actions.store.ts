import {
  EActionType,
  IKeyItem,
  TFilterType,
  TItem,
  TRemoveItemAction,
  TSaveItemAction,
  TSetCurrentItemAction,
  TFilterByKeyAction,
  TSetItemsAction,
  TSetKeysAction,
  TFilterByTypeAction,
} from './interfaces.store';

export function setItems(payload: TItem[]): TSetItemsAction {
  return {
    type: EActionType.SET_ITEMS,
    payload,
  };
}

export function removeItem(index: number): TRemoveItemAction {
  return {
    type: EActionType.REMOVE_ITEM,
    payload: index,
  };
}

export function saveItem(
  item: TItem,
  index: number,
): TSaveItemAction {
  return {
    type: EActionType.SAVE_ITEM,
    payload: { item, index },
  };
}

export function setKeys(keys: IKeyItem[]): TSetKeysAction {
  return {
    type: EActionType.SET_KEYS,
    payload: keys,
  };
}

export function setCurrentItem(
  payload: number,
): TSetCurrentItemAction {
  return {
    type: EActionType.SET_CURRENT_ITEM,
    payload,
  };
}

export function filterByKey(payload: string): TFilterByKeyAction {
  return {
    type: EActionType.FILTER_BY_KEY,
    payload,
  };
}

export function filterByType(
  payload: TFilterType,
): TFilterByTypeAction {
  return {
    type: EActionType.FILTER_BY_TYPE,
    payload,
  };
}
