import { FC, useState } from 'react';
import { Button, FlexboxGrid, Icon, List, Modal } from 'rsuite';

import { removeItem } from '~/store/actions.store';
import { EItemType, IItem } from '~/store/interfaces.store';
import { useStore } from '~/store/provider.store';
import BreadcrumbComponent from './dumb/breadcrumb.dumb';

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
  const [{ items }, dispatch] = useStore();
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
        {items.map((item, index) => (
          <List.Item key={`${item.key}:${index}`} index={index}>
            <FlexboxGrid>
              {/*icon*/}
              <FlexboxGrid.Item
                colspan={2}
                className="flex justify-center items-center h-16"
              >
                <Icon
                  icon={
                    item.type === EItemType.VIDEO ? 'film' : 'code'
                  }
                  className="text-gray-300 text-base"
                />
              </FlexboxGrid.Item>
              {/*base info*/}
              <FlexboxGrid.Item
                colspan={19}
                className="flex justify-center h-16 flex-col items-start overflow-hidden"
              >
                <BreadcrumbComponent
                  path={item.key}
                ></BreadcrumbComponent>
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
        ))}
      </List>
    </>
  );
};

export default ItemsList;
