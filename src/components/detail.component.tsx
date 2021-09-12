import { FC, useState } from 'react';
import { Button, Drawer } from 'rsuite';

const Detail: FC = () => {
  const [show, setShow] = useState(false);
  const close = () => setShow(false);

  return (
    <Drawer show={show} onHide={close}>
      <Drawer.Header>
        <Drawer.Title> Item Detail </Drawer.Title>
      </Drawer.Header>
      <Drawer.Body></Drawer.Body>
      <Drawer.Footer>
        <Button onClick={close} appearance="primary">
          Save
        </Button>
        <Button onClick={close} appearance="subtle">
          Cancel
        </Button>
      </Drawer.Footer>
    </Drawer>
  );
};

export default Detail;
