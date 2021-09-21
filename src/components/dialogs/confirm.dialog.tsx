import { FC } from 'react';
import { Button, ButtonProps, Modal } from 'rsuite';

const ConfirmDialog: FC<
  Partial<{
    show: boolean;
    title: string;
    yesLabel: string;
    noLabel: string;
    yesProps: ButtonProps;
    noProps: ButtonProps;
    onYes: (isYes: boolean) => void;
  }>
> = ({
  show,
  onYes,
  title = 'Confirm',
  children,
  yesLabel = 'Yes',
  noLabel = 'No',
  yesProps = {},
  noProps = {},
}) => {
  function onHide(isYes: boolean) {
    if (onYes) {
      onYes(isYes);
    }
  }

  return (
    <Modal show={show} onHide={() => onHide(false)}>
      <Modal.Header>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button
          appearance="primary"
          {...yesProps}
          onClick={() => onHide(true)}
        >
          {yesLabel}
        </Button>
        <Button
          appearance="subtle"
          {...noProps}
          onClick={() => onHide(false)}
        >
          {noLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDialog;
