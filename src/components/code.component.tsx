import { FC, useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import { Button, Icon, IconButton } from 'rsuite';
import {
  saveItem,
  setCurrentItem,
  setFilter,
  setItems,
} from '~/store/actions.store';
import { TIPS_STORAGE_KEY, TIPS_URL } from '~/store/constants.store';
import { EItemType, TItem } from '~/store/interfaces.store';
import { useStore } from '~/store/provider.store';
import ConfirmDialog from './dialogs/confirm.dialog';
import BreadcrumbComponent from './dumb/breadcrumb.dumb';

const Code: FC = () => {
  const [{ items, filter }, dispatch] = useStore();
  const [showCode, setShowCode] = useState<boolean>(false);
  const [showRefresh, setShowRefresh] = useState<boolean>(false);

  useEffect(() => {
    const cache = localStorage.getItem(TIPS_STORAGE_KEY);
    let items: TItem[] = [];

    if (cache) {
      try {
        items = JSON.parse(
          localStorage.getItem(TIPS_STORAGE_KEY) || '[]',
        ) as TItem[];
      } catch (e) {
        items = [];
      }

      dispatch(setItems(items));
      return;
    }

    refresh();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const refresh = () =>
    fetch(TIPS_URL)
      .then((res) => res.json() as Promise<TItem[]>)
      .then((json) => dispatch(setItems(json)));

  return (
    <>
      <ConfirmDialog
        show={showRefresh}
        yesProps={{ color: 'red' }}
        onYes={(isYes) => {
          if (isYes) {
            refresh();
          }

          setShowRefresh(false);
        }}
      >
        Reloading the view will fetch the items from:
        <div className="flex justify-center my-5">
          <a
            target="_blank"
            href={TIPS_URL}
            className="bg-gray-500 text-xs p-1 rounded-md mx-1"
            rel="noreferrer"
          >
            {TIPS_URL}
          </a>
        </div>
        <span className="text-red-400 underline">
          All your changes will be lost. Do you want to proceed?
        </span>
      </ConfirmDialog>
      <div className="w-full flex justify-between flex-row my-3">
        <div className="flex justify-center align-middle">
          <Button
            className="mr-4"
            onClick={() => setShowRefresh(true)}
          >
            <Icon icon="refresh"></Icon>
          </Button>
          <Button
            className="mr-4"
            onClick={() => {
              dispatch(
                saveItem(
                  {
                    body: '',
                    key: '',
                    type: EItemType.TEXT,
                  },
                  items.length,
                ),
              );

              dispatch(setCurrentItem(items.length));
            }}
          >
            <Icon icon="plus"></Icon>
          </Button>
          {filter ? (
            <>
              <BreadcrumbComponent
                path={filter}
                onClick={({ value }) => dispatch(setFilter(value))}
              />
              <Button
                appearance="link"
                onClick={() => dispatch(setFilter(''))}
              >
                Clear
              </Button>
            </>
          ) : null}
        </div>
        <div className="block">
          <IconButton
            appearance={showCode ? 'primary' : 'default'}
            onClick={() => setShowCode(!showCode)}
            icon={<Icon icon="code" />}
          />
        </div>
      </div>
      {showCode ? (
        <ReactJson
          style={{
            padding: 10,
            borderRadius: 6,
            marginBottom: 12,
            border: '1px dashed gray',
          }}
          src={items}
          theme="solarized"
        />
      ) : null}
    </>
  );
};

export default Code;
