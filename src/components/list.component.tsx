import { FC, useMemo, useState } from 'react';
import {
  Button,
  FlexboxGrid,
  Icon,
  List,
  Popover,
  Tooltip,
  Whisper,
} from 'rsuite';
import { IconNames } from 'rsuite/lib/Icon';
import {
  filterByKey,
  removeItem,
  setCurrentItem,
} from '~/store/actions.store';
import { EItemType, TItem } from '~/store/interfaces.store';
import { useStore } from '~/store/provider.store';
import RemoveModal from './dialogs/confirm-remove.dialog';
import BreadcrumbComponent from './dumb/breadcrumb.dumb';
import MdComponent from './dumb/md.dumb';

const IconComponent: FC<{ item: TItem }> = ({ item }) => {
  return (
    <Whisper
      preventOverflow
      placement="auto"
      trigger="click"
      speaker={({ top, left, ...props }) => {
        return (
          <Popover
            title={(item as any).title || ''}
            style={{ top, left }}
            {...props}
          >
            <article className="prose text-left prose-sm overflow-auto p-1 max-h-80 text-sm">
              {item.type === EItemType.VIDEO && item.video.link ? (
                <iframe
                  height={200}
                  width={'100%'}
                  src={item.video.link}
                  title={item.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : null}
              <MdComponent value={item.body} />
            </article>
          </Popover>
        );
      }}
    >
      <Icon
        icon={((): IconNames => {
          switch (item.type) {
            case EItemType.TEXT:
              return 'code';
            case EItemType.VIDEO:
              return 'film';
            default:
              return 'question';
          }
        })()}
        className="text-gray-300 text-base cursor-pointer"
      />
    </Whisper>
  );
};

const ItemsList: FC = () => {
  const [{ items, filter, keys }, dispatch] = useStore();
  const [index, setIndex] = useState<number>(-1);

  const keysString = useMemo<string[]>(() => {
    return keys.map(({ value }) => value);
  }, [keys]);

  return (
    <>
      <RemoveModal
        item={items[index]}
        show={!!items[index]}
        onConfirm={(isRemove) => {
          if (isRemove) {
            dispatch(removeItem(index));
          }

          setIndex(-1);
        }}
      ></RemoveModal>
      {items.length === 0 ? (
        <div className="text-center bg-[#292d33] border-dashed rounded-md border border-gray-200 p-3">
          The list is empty. Please upload a valid{' '}
          <span className="bg-gray-500 p-1 text-xs rounded-md mx-1">
            JSON file
          </span>{' '}
          or use{' '}
          <a href="tips.json" target="_blank">
            this example
          </a>
        </div>
      ) : null}
      <List hover>
        {items.map((item, index) => {
          if (
            !item.key.startsWith(filter.key) ||
            (filter.type !== '*' && item.type !== filter.type)
          ) {
            return null;
          }

          const keyExists = keysString.includes(item.key);

          return (
            <List.Item key={`${item.key}:${index}`} index={index}>
              <FlexboxGrid>
                {/*icon*/}
                <FlexboxGrid.Item
                  colspan={2}
                  className="flex justify-center items-center h-16"
                >
                  <IconComponent item={item} />
                </FlexboxGrid.Item>
                {/*base info*/}
                <FlexboxGrid.Item
                  colspan={19}
                  className="flex flex-row h-16"
                >
                  {!keyExists && (
                    <Whisper
                      trigger="hover"
                      placement="left"
                      speaker={
                        <Tooltip>
                          <div className="p-2">Key not supported</div>
                        </Tooltip>
                      }
                    >
                      <Icon
                        icon="info"
                        className="flex items-center mr-2 text-red-400 cursor-pointer"
                      />
                    </Whisper>
                  )}
                  <BreadcrumbComponent
                    style={{
                      marginLeft: keyExists ? 22 : 'unset',
                    }}
                    path={item.key}
                    onClick={({ value }) =>
                      dispatch(filterByKey(value))
                    }
                  />
                </FlexboxGrid.Item>
                <FlexboxGrid.Item
                  colspan={2}
                  className="flex justify-center items-center h-16"
                >
                  <Button
                    color="orange"
                    appearance="link"
                    onClick={() => setIndex(index)}
                  >
                    Remove
                  </Button>
                  <span className="p-1">|</span>
                  <Button
                    appearance="link"
                    onClick={() => dispatch(setCurrentItem(index))}
                  >
                    Edit
                  </Button>
                </FlexboxGrid.Item>
              </FlexboxGrid>
            </List.Item>
          );
        })}
      </List>
    </>
  );
};

export default ItemsList;
