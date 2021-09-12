import {
  EActionType,
  TItem,
  TSetItemsAction,
  TRemoveItemAction,
  TSaveItemAction,
  TSetCurrentItemAction,
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

export function setCurrentItem(
  payload?: TItem,
): TSetCurrentItemAction {
  return {
    type: EActionType.SET_CURRENT_ITEM,
    payload,
  };
}
