import { FC, SyntheticEvent } from 'react';
import { IconNames } from 'rsuite/lib/Icon';
import {
  IconButton,
  Icon,
  IconButtonProps,
  ButtonGroup,
} from 'rsuite';

export interface IButtonGroupProps extends IconButtonProps {
  onChange?: (value: string, event: SyntheticEvent) => void;
  value?: string;
  data?: {
    value: string;
    icon: IconNames;
  }[];
}

const ButtonGroupComponent: FC<IButtonGroupProps> = ({
  onChange,
  value = '',
  data = [],
  ...props
}) => {
  const change = (v: string, ev: SyntheticEvent) => {
    if (onChange) {
      onChange(v, ev);
    }
  };

  return (
    <ButtonGroup>
      {data.map(({ icon, value: v }) => (
        <IconButton
          {...props}
          icon={icon ? <Icon icon={icon} /> : undefined}
          onClick={(ev) => change(v, ev)}
          appearance={v === value ? 'primary' : 'default'}
        />
      ))}
    </ButtonGroup>
  );
};

export default ButtonGroupComponent;
