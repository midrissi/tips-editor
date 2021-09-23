import Markdown from 'markdown-to-jsx';
import { FC } from 'react';
import { Icon } from 'rsuite';

export interface IMdProps {
  value?: string;
}

const MdComponent: FC<IMdProps> = ({ value = '' }) => {
  return (
    <Markdown
      options={{
        overrides: {
          a: {
            component: ({ children, ...props }) => {
              return (
                <a
                  {...props}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {children}
                  <Icon icon="external-link" className="ml-1" />
                </a>
              );
            },
          },
        },
      }}
    >
      {value}
    </Markdown>
  );
};

export default MdComponent;
