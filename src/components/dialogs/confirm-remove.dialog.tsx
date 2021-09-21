import { FC } from 'react';
import { IItem } from '~/store/interfaces.store';
import ConfirmDialog from './confirm.dialog';

const RemoveModal: FC<{
  item?: IItem;
  show: boolean;
  onConfirm?: (isRemove: boolean) => void;
}> = ({ show, onConfirm, item }) => {
  if (!item) {
    return null;
  }

  return (
    <ConfirmDialog
      show={show}
      onYes={onConfirm}
      yesLabel="Remove"
      noLabel="Cancel"
      yesProps={{ appearance: 'primary', color: 'red' }}
    >
      Are you sure you want to remove the key:
      <span className="bg-gray-500 text-xs p-1 rounded-md mx-1">
        {item.key}
      </span>{' '}
      of type:
      <span className="bg-gray-500 text-xs p-1 rounded-md mx-1">
        {item.type}
      </span>
      ?
    </ConfirmDialog>
  );
};

export default RemoveModal;
