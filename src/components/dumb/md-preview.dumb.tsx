import { FC, SyntheticEvent, useState } from 'react';
import { Input, InputProps } from 'rsuite';
import ButtonGroupComponent from './button-group.dumb';
import MdComponent from './md.dumb';

export interface IMdWithPreviewProps extends InputProps {
  onChange?: (value: string, event: SyntheticEvent) => void;
  value?: string;
}

const MdWithPreviewComponent: FC<IMdWithPreviewProps> = ({
  value = '',
  ...props
}) => {
  const [isPreview, setIsPreview] = useState(false);

  return (
    <>
      <ButtonGroupComponent
        data={[
          {
            icon: 'code',
            value: 'code',
          },
          {
            icon: 'eye',
            value: 'preview',
          },
        ]}
        value={isPreview ? 'preview' : 'code'}
        onChange={(v) => setIsPreview(v === 'preview')}
      />
      <br style={{ marginBottom: 10 }} />
      {isPreview ? (
        <MdComponent value={value} />
      ) : (
        <Input
          {...props}
          value={value}
          componentClass="textarea"
          placeholder="Textarea"
        />
      )}
    </>
  );
};

export default MdWithPreviewComponent;
