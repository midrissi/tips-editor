import { FC, useEffect, useRef, useState } from 'react';
import {
  ControlLabel,
  Form,
  FormControl,
  FormGroup,
  Input,
  Schema,
} from 'rsuite';
import { FormInstance } from 'rsuite/lib/Form';
import HelpBlock from 'rsuite/lib/HelpBlock';
import { update } from '~/api.service';
import { useStore } from '~/store/provider.store';
import { getFilePath } from '~/utils/utils';
import PasswordComponent from '../dumb/password.dumb';
import ConfirmDialog, { ConfirmDialogProps } from './confirm.dialog';

const { StringType } = Schema.Types;

const model = Schema.Model({
  token: StringType().isRequired('The access key is required'),
  message: StringType().isRequired('The message is required'),
});

interface IValue {
  message: string;
  token: string;
}

const SaveComponent: FC<ConfirmDialogProps> = ({
  show = false,
  onYes = () => {},
}) => {
  const formRef = useRef<FormInstance>();
  const [error, setError] = useState({});
  const [value, setValue] = useState<IValue>({
    message: '',
    token: '',
  });
  const [{ items }] = useStore();

  useEffect(() => {
    setValue({
      ...value,
      message: '',
    });

    setError({});
  }, [show]);

  const save = () => {
    if (!formRef.current?.check()) {
      return;
    }

    update(items, value?.message, value?.token)
      .then(() => onYes(true))
      .catch((e) => {
        setError({
          token: `Error while updating the file: ${e.message}`,
        });
        console.error(e);
      });
  };

  return (
    <ConfirmDialog
      show={show}
      yesProps={{ color: 'green' }}
      onYes={(isYes) => {
        if (isYes) {
          return save();
        }

        onYes(isYes);
      }}
    >
      Saving content to:
      <div className="flex justify-center my-5">
        <a
          target="_blank"
          href={getFilePath()}
          className="bg-gray-500 text-xs p-1 rounded-md mx-1"
          rel="noreferrer"
        >
          {getFilePath()}
        </a>
      </div>
      <Form
        ref={(ref: any) => (formRef.current = ref)}
        model={model}
        autoComplete="off"
        formValue={value}
        formError={error}
        onChange={(value) => setValue(value as IValue)}
        onCheck={setError}
      >
        <FormGroup controlId="token">
          <ControlLabel>Access Key</ControlLabel>
          <FormControl
            name="token"
            type="password"
            autoComplete="off"
            accepter={PasswordComponent}
          />
        </FormGroup>
        <FormGroup controlId="message">
          <ControlLabel>Message</ControlLabel>
          <FormControl
            name="message"
            accepter={Input}
            componentClass="textarea"
            rows={5}
            placeholder="Put your commit message here"
          />
          <HelpBlock>
            The Token can be generated{' '}
            <a
              href="https://github.com/settings/tokens/new"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              from here
            </a>
            . Make sure that the{' '}
            <span className="bg-gray-500 text-xs p-1 rounded-md mx-1">
              public_repo
            </span>{' '}
            scope is checked.
            <img
              className="my-4"
              src="github_token.png"
              alt="Github Token"
            />
          </HelpBlock>
        </FormGroup>
      </Form>
    </ConfirmDialog>
  );
};

export default SaveComponent;
