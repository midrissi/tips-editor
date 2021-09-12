import { FC, useState } from 'react';
import ReactJson from 'react-json-view';
import { Icon, IconButton } from 'rsuite';
import { useStore } from '~/store/provider.store';

const Code: FC = () => {
  const [state] = useStore();
  const [showCode, setShowCode] = useState<boolean>(false);

  return (
    <>
      <div className="w-full flex justify-end my-3">
        <IconButton
          appearance={showCode ? 'primary' : 'default'}
          onClick={() => setShowCode(!showCode)}
          className="rounded-full"
          icon={<Icon icon="code" />}
        ></IconButton>
      </div>
      {showCode ? (
        <ReactJson
          style={{
            padding: 10,
            borderRadius: 6,
            marginBottom: 12,
            border: '1px dashed gray',
          }}
          src={state.items}
          theme="solarized"
        />
      ) : null}
    </>
  );
};

export default Code;
