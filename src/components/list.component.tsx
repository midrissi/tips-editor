import { FC, useState } from 'react';
import {
  Button,
  FlexboxGrid,
  Icon,
  List,
  Modal,
  Tooltip,
  Whisper,
} from 'rsuite';
import Markdown from 'markdown-to-jsx';

import { removeItem, setFilter } from '~/store/actions.store';
import { EItemType, IItem, TItem } from '~/store/interfaces.store';
import { useStore } from '~/store/provider.store';
import BreadcrumbComponent from './dumb/breadcrumb.dumb';

const IconComponent: FC<{ item: TItem }> = ({ item }) => {
  return (
    <Whisper
      preventOverflow
      placement="auto"
      trigger="click"
      speaker={({ top, left, ...props }) => {
        return (
          <Tooltip style={{ top, left }} {...props}>
            <article className="prose text-left prose-sm overflow-auto p-1 max-h-80 text-sm">
              <Markdown
                options={{
                  overrides: {
                    a: {
                      component: ({ children, ...props }) => {
                        return (
                          <a
                            {...props}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center"
                          >
                            {children}
                            <Icon
                              icon="external-link"
                              className="ml-1"
                            />
                          </a>
                        );
                      },
                    },
                  },
                }}
              >
                {item.body}
              </Markdown>
            </article>
          </Tooltip>
        );
      }}
    >
      <Icon
        icon={item.type === EItemType.VIDEO ? 'film' : 'code'}
        className="text-gray-300 text-base cursor-pointer"
      />
    </Whisper>
  );
};

const RemoveModal: FC<{
  item?: IItem;
  show: boolean;
  onConfirm?: (isRemove: boolean) => void;
}> = ({ show, onConfirm, item }) => {
  if (!item) {
    return null;
  }

  function onHide(isRemove: boolean) {
    if (onConfirm) {
      onConfirm(isRemove);
    }
  }

  return (
    <Modal show={show} onHide={() => onHide(false)}>
      <Modal.Header>
        <Modal.Title>Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to remove the key:
        <span className="bg-gray-500 text-xs p-1 rounded-md mx-1">
          {item.key}
        </span>{' '}
        of type:
        <span className="bg-gray-500 p-1 text-xs rounded-md mx-1">
          {item.type}
        </span>
        ?
      </Modal.Body>
      <Modal.Footer>
        <Button
          onClick={() => onHide(true)}
          appearance="primary"
          color="red"
        >
          Remove
        </Button>
        <Button onClick={() => onHide(false)} appearance="subtle">
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

const ItemsList: FC = () => {
  const [{ items, filter }, dispatch] = useStore();
  const [index, setIndex] = useState<number>(-1);

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
      <List hover>
        {items.map((item, index) => {
          if (filter && !item.key.startsWith(filter)) {
            return null;
          }

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
                  className="flex flex-col justify-center items-start h-16"
                >
                  <BreadcrumbComponent
                    path={item.key}
                    onClick={({ value }) =>
                      dispatch(setFilter(value))
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
                  <Button appearance="link">Edit</Button>
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
