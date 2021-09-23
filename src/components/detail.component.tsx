import { FC, useEffect, useMemo, useRef, useState } from 'react';
import {
  AutoComplete,
  Button,
  ControlLabel,
  Drawer,
  Form,
  FormControl,
  FormGroup,
  Icon,
  Input,
  Radio,
  RadioGroup,
  Schema,
} from 'rsuite';
import { FormInstance } from 'rsuite/lib/Form';
import {
  removeItem,
  saveItem,
  setCurrentItem,
} from '~/store/actions.store';
import { EItemType, TItem } from '~/store/interfaces.store';
import { useStore } from '~/store/provider.store';
import { flattenObj, ObjectType, unflattenObj } from '~/utils/utils';
import BreadcrumbComponent from './dumb/breadcrumb.dumb';
import MdWithPreviewComponent from './dumb/md-preview.dumb';

const { StringType } = Schema.Types;

const Hr: FC = () => (
  <hr style={{ width: '80%', margin: '15px auto' }} />
);

const model = Schema.Model({
  key: StringType()
    .isRequired('The key is required')
    .pattern(/^[0-9a-z]+(?::[0-9a-z]+)*$/),
  type: StringType()
    .isOneOf(
      [EItemType.VIDEO, EItemType.TEXT],
      'The specified type is unsupported',
    )
    .isRequired('The type is required'),
  body: StringType().isRequired('The content is required'),
  'video.link': StringType(),
});

const Detail: FC = () => {
  const [{ current, items, keys }, dispatch] = useStore();
  const [error, setError] = useState({});
  const [value, setValue] = useState<ObjectType>();
  const formRef = useRef<FormInstance>();

  const KEYS = useMemo(
    () => keys.map(({ value }) => value),
    [keys.length],
  );

  useEffect(() => {
    const item = items[current];

    if (!item) {
      return;
    }

    setValue(flattenObj(item));
    setError({});
  }, [items, current]);

  if (current < 0 || !items[current]) {
    return null;
  }

  const close = () => {
    if (!value?.key) {
      dispatch(removeItem(current));
    }

    dispatch(setCurrentItem(-1));
  };

  return (
    <Drawer show={current >= 0} onHide={close}>
      <Drawer.Header>
        {value?.key ? (
          <Drawer.Title>
            <BreadcrumbComponent path={value.key} />
          </Drawer.Title>
        ) : null}
      </Drawer.Header>
      <Drawer.Body>
        <Form
          ref={(ref: any) => (formRef.current = ref)}
          model={model}
          autoComplete="off"
          formValue={value}
          formError={error}
          onChange={(value) => setValue(value as TItem)}
          onCheck={setError}
        >
          <FormGroup>
            <ControlLabel>Key</ControlLabel>
            <FormControl
              name="key"
              accepter={AutoComplete}
              data={KEYS}
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Type</ControlLabel>
            <FormControl
              name="type"
              accepter={RadioGroup}
              appearance="picker"
              style={{
                display: 'flex',
                width: 'fit-content',
                paddingRight: 10,
              }}
            >
              <Radio value={EItemType.TEXT}>
                <Icon icon="code" className="mr-4" />
                Text
              </Radio>
              <Radio value={EItemType.VIDEO}>
                <Icon icon="code" className="mr-4" />
                Video
              </Radio>
            </FormControl>
          </FormGroup>
          {value?.type === EItemType.VIDEO ? (
            <>
              <Hr />
              <FormGroup>
                <ControlLabel>Url</ControlLabel>
                <FormControl
                  name="video.link"
                  accepter={Input}
                  style={{ width: '100%' }}
                />
              </FormGroup>
            </>
          ) : null}
          <FormGroup>
            <FormControl
              name="body"
              accepter={MdWithPreviewComponent}
              rows={10}
              style={{ width: '100%', minHeight: 280 }}
              className="w-full min-h-[326px]"
            />
          </FormGroup>
        </Form>
      </Drawer.Body>
      <Drawer.Footer>
        <Button
          onClick={() =>
            formRef.current?.check((err) => {
              if (Object.keys(err || {}).length) {
                return;
              }

              const item = unflattenObj(value!) as TItem;
              dispatch(saveItem(item, current));
            })
          }
          appearance="primary"
        >
          Confirm
        </Button>
        <Button appearance="subtle" onClick={close}>
          Cancel
        </Button>
      </Drawer.Footer>
    </Drawer>
  );
};

export default Detail;
