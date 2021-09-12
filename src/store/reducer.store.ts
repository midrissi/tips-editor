import { Reducer } from 'react';
import { remove, isUndefined } from 'lodash';

import { initialState } from './constants.store';
import { EActionType, IAppState, TAction } from './interfaces.store';

export const appReducer: Reducer<IAppState, TAction> = (
  state: IAppState = initialState,
  action: TAction,
): IAppState => {
  switch (action.type) {
    case EActionType.SET_FILTER:
      return {
        ...state,
        filter: action.payload,
      };
    case EActionType.SET_ITEMS:
      return {
        ...state,
        items: action.payload,
      };
    case EActionType.REMOVE_ITEM:
      return {
        ...state,
        items: remove(
          state.items,
          (item, index) => index !== action.payload,
        ),
      };
    case EActionType.SAVE_ITEM: {
      const { index, item } = action.payload;

      if (isUndefined(index)) {
        return {
          ...state,
          items: [...state.items, item],
        };
      }

      return {
        ...state,
        items: state.items.map((current, i) =>
          index === i ? item : current,
        ),
      };
    }
    case EActionType.SET_CURRENT_ITEM:
      return {
        ...state,
        current: action.payload,
      };
    default:
      return state;
  }
};
