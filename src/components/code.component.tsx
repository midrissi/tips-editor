import { FC, useState } from 'react';
import ReactJson from 'react-json-view';
import { Button, Icon, IconButton } from 'rsuite';
import { setFilter } from '~/store/actions.store';
import { useStore } from '~/store/provider.store';
import BreadcrumbComponent from './dumb/breadcrumb.dumb';

const Code: FC = () => {
  const [{ items, filter }, dispatch] = useStore();
  const [showCode, setShowCode] = useState<boolean>(false);

  return (
    <>
      <div className="w-full flex justify-between flex-row my-3">
        <div className="flex justify-center align-middle">
          {filter ? (
            <>
              <BreadcrumbComponent
                path={filter}
                onClick={({ value }) => dispatch(setFilter(value))}
              />
              <Button
                appearance="link"
                onClick={() => dispatch(setFilter(''))}
              >
                Clear
              </Button>
            </>
          ) : null}
        </div>
        <div className="block">
          <IconButton
            appearance={showCode ? 'primary' : 'default'}
            onClick={() => setShowCode(!showCode)}
            className="rounded-full"
            icon={<Icon icon="code" />}
          />
        </div>
      </div>
      {showCode ? (
        <ReactJson
          style={{
            padding: 10,
            borderRadius: 6,
            marginBottom: 12,
            border: '1px dashed gray',
          }}
          src={items}
          theme="solarized"
        />
      ) : null}
    </>
  );
};

export default Code;
