import { FC, useEffect, useState } from 'react';
import {
  Button,
  ControlLabel,
  Drawer,
  Form,
  FormGroup,
  InputPicker,
} from 'rsuite';
import { saveItem, setCurrentItem } from '~/store/actions.store';
import { useStore } from '~/store/provider.store';

const Detail: FC = () => {
  const close = () => dispatch(setCurrentItem(-1));

  const [{ current, items }, dispatch] = useStore();
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch('keys.json')
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  if (current < 0) {
    return null;
  }

  const setValue = (key: string, value: any) =>
    dispatch(
      saveItem(
        {
          ...items[current],
          [key]: value,
        },
        current,
      ),
    );

  return (
    <Drawer show={current >= 0} onHide={close}>
      <Drawer.Header>
        <Drawer.Title>Item Detail</Drawer.Title>
      </Drawer.Header>
      <Drawer.Body>
        <Form>
          <FormGroup>
            <ControlLabel>Key</ControlLabel>
            <InputPicker
              data={data}
              groupBy="group"
              value={items[current].key}
              onChange={(value) => setValue('key', value)}
            ></InputPicker>
          </FormGroup>
        </Form>
      </Drawer.Body>
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
