import styles from './styles.module.scss';
import Link from 'next/link';

const Button = ({
  data,
  theme = 'primary',
  variant = 'primary',
  children, href,
  className,
  ...props
}) => {
  if (data) {
    theme = data.theme;
    href = data.href;
    children = data.text;
  }

  const commonProps = {
    className: `${styles.wrapper} cta${className ? ` ${className}` : ''}`,
    "data-theme": theme,
    "data-variant": variant,
    ...props,
  };

  const isExternal = href && (href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:'));

  const Element = href ? isExternal ? 'a' : Link : 'button';

  return (
    <Element
      href={href || ''}
      {...commonProps}
      {...isExternal && { target: '_blank', rel: 'noopener' }}
    >
      {variant === 'secondary' && (
        <div>
          <div>
            <Array />
          </div>
        </div>
      )}
      {children}
    </Element>
  );
};

export default Button;

const Array = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='26'
    height='25'
    fill='none'
    viewBox='0 0 26 25'
  >
    <path
      stroke='#53423C'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M8.581 16.919L17.42 8.08m0 0H9.459m7.961 0v7.7'
    ></path>
  </svg>
)