import {
  EActionType,
  IKeyItem,
  TItem,
  TRemoveItemAction,
  TSaveItemAction,
  TSetCurrentItemAction,
  TSetFilterAction,
  TSetItemsAction,
  TSetKeysAction,
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

export function setFilter(payload: string): TSetFilterAction {
  return {
    type: EActionType.SET_FILTER,
    payload,
  };
}
