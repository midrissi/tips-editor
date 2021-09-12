import { FC } from 'react';
import { Button, Drawer } from 'rsuite';
import { setCurrentItem } from '~/store/actions.store';
import { useStore } from '~/store/provider.store';

const Detail: FC = () => {
  const close = () => dispatch(setCurrentItem(undefined));

  const [{ current }, dispatch] = useStore();

  return (
    <Drawer show={!!current} onHide={close}>
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
