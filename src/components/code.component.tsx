import { FC, useEffect, useState } from 'react';
import ReactJson from 'react-json-view';
import { Button, ButtonGroup, Icon, IconButton } from 'rsuite';
import { fetchItems } from '~/api.service';
import {
  filterByKey,
  filterByType,
  saveItem,
  setCurrentItem,
  setItems,
} from '~/store/actions.store';
import { TIPS_STORAGE_KEY, TIPS_URL } from '~/store/constants.store';
import {
  EItemType,
  TFilterType,
  TItem,
} from '~/store/interfaces.store';
import { useStore } from '~/store/provider.store';
import ConfirmDialog from './dialogs/confirm.dialog';
import SaveComponent from './dialogs/save.dialog';
import BreadcrumbComponent from './dumb/breadcrumb.dumb';

const Code: FC = () => {
  const [{ items, filter }, dispatch] = useStore();
  const [showCode, setShowCode] = useState<boolean>(false);
  const [showRefresh, setShowRefresh] = useState<boolean>(false);
  const [showSave, setShowSave] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);

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
  }, []);

  const refresh = () => {
    setIsFetching(true);
    fetchItems()
      .then((json) => dispatch(setItems(json)))
      .finally(() => setIsFetching(false));
  };

  const ALL_TYPES: TFilterType[] = [
    '*',
    EItemType.TEXT,
    EItemType.VIDEO,
  ];

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
      <SaveComponent
        show={showSave}
        onYes={() => setShowSave(false)}
      />
      <div className="w-full flex justify-between flex-row my-3">
        <div className="flex justify-center align-middle">
          <Button
            className="mr-4"
            onClick={() => setShowRefresh(true)}
          >
            <Icon icon="refresh" spin={isFetching}></Icon>
          </Button>
          <Button onClick={() => setShowSave(true)}>
            <Icon icon="save"></Icon>
          </Button>
          <ButtonGroup className="mx-4">
            {ALL_TYPES.map((type) => (
              <Button
                appearance={
                  filter.type === type ? 'primary' : 'default'
                }
                onClick={() => dispatch(filterByType(type))}
              >
                {type === '*' ? (
                  'All'
                ) : (
                  <Icon
                    icon={type === EItemType.TEXT ? 'code' : 'film'}
                  />
                )}
              </Button>
            ))}
          </ButtonGroup>
          <IconButton
            className="mr-4"
            icon={<Icon icon="plus" />}
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
          />
          {filter.key ? (
            <>
              <BreadcrumbComponent
                path={filter.key}
                onClick={({ value }) => dispatch(filterByKey(value))}
              />
              <Button
                appearance="link"
                onClick={() => dispatch(filterByKey(''))}
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
