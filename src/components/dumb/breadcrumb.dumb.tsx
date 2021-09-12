import { FC, useState } from 'react';
import { Breadcrumb } from 'rsuite';
import './breadcrumb.style.css';

interface ArrowProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  active: boolean;
}

const Arrow: FC<ArrowProps> = ({ children, active, ...props }) => {
  return (
    <div className={`rs-item ${active ? 'active' : ''}`} {...props}>
      {children}
    </div>
  );
};

interface BreadcrumbComponentProps {
  path: string;
  className?: string;
  onClick?: (ev: { value: string; index: number }) => void;
}

const BreadcrumbComponent: FC<BreadcrumbComponentProps> = ({
  path = '',
  onClick,
  className = '',
}) => {
  const items = path.split(':');
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  return (
    <Breadcrumb
      separator=""
      className={`${className} font-medium whitespace-nowrap`}
    >
      {items.map((item, index) => {
        const current = items.slice(0, index + 1).join(':');
        return (
          <Breadcrumb.Item
            key={current}
            renderItem={() => (
              <Arrow
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(-1)}
                active={activeIndex >= index}
                onClick={() => {
                  if (onClick) {
                    onClick({
                      value: current,
                      index,
                    });
                  }
                }}
              >
                {item}
              </Arrow>
            )}
          />
        );
      })}
    </Breadcrumb>
  );
};

export default BreadcrumbComponent;
