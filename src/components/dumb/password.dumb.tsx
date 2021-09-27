import { FC, useState } from 'react';
import { Icon, Input, InputGroup, InputProps } from 'rsuite';

const PasswordComponent: FC<Omit<InputProps, 'type'>> = (props) => {
  const [visible, setVisible] = useState(false);

  const handleChange = () => {
    setVisible(!visible);
  };
  return (
    <InputGroup inside>
      <Input {...props} type={visible ? 'text' : 'password'} />
      <InputGroup.Button onClick={handleChange}>
        <Icon icon={visible ? 'eye' : 'eye-slash'} />
      </InputGroup.Button>
    </InputGroup>
  );
};

export default PasswordComponent;
