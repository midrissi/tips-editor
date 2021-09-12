import { EItemType, IAppState } from './interfaces.store';

export const initialState: IAppState = {
  items: [
    {
      type: EItemType.TEXT,
      body: 'Just a test',
      key: 'components:button',
    },
    {
      type: EItemType.TEXT,
      body: 'Just a test',
      key: 'components:button',
    },
    {
      type: EItemType.TEXT,
      body: 'Just a test',
      key: 'components:button',
    },
    {
      type: EItemType.TEXT,
      body: 'Just a test',
      key: 'components:button',
    },
    {
      type: EItemType.VIDEO,
      body: 'Just a test',
      key: 'components:button',
      title: 'Some title',
      video: {
        provider: 'youtube',
        link: 'https://www.youtube.com/watch?v=fPkSUladrYo',
      },
    },
  ],
};
