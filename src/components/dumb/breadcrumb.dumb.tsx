import { FC } from 'react';
import { Breadcrumb } from 'rsuite';

const Arrow: FC = ({ children }) => {
  return <div className="rs-item">{children}</div>;
};

const BreadcrumbComponent: FC<{ path: string }> = ({ path = '' }) => {
  const items = path.split(':');
  return (
    <Breadcrumb
      separator=""
      className="mb-0 font-medium whitespace-nowrap"
    >
      {items.map((item, index) => (
        <Breadcrumb.Item
          key={items.slice(0, index + 1).join(':')}
          componentClass={Arrow}
        >
          {item}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
