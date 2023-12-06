import { Cross } from '../Icons';
import styles from './styles.module.scss';
import Link from 'next/link';

const Button = ({
  data,
  theme = 'primary',
  variant = 'primary',
  children, href,
  className,
  close, prev, next,
  ...props
}) => {
  if (data) {
    theme = data.theme;
    href = data.href;
    children = data.text;
  }

  const commonProps = {
    className: `${styles.wrapper} cta ${className ? className : ''}`,
    'data-option': close ? 'close' : prev ? 'prev' : next ? 'next' : '',
    "data-theme": theme,
    "data-variant": variant,
    ...props,
  };

  const isExternal = href && (href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('tel:'));

  const Element = href ? isExternal ? 'a' : Link : 'button';

  return (
    <Element
      {...href && { href }}
      {...commonProps}
      {...isExternal && { target: '_blank', rel: 'noopener' }}
    >
      {variant === 'secondary' && (
        <div>
          <div>
            {close
              ? <Cross /> :
            prev ? <Prev /> :
            next ? <Next /> :
              <Arrow />}
          </div>
        </div>
      )}
      {children}
    </Element>
  );
};

export default Button;

const Arrow = () => (
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

const Prev = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='25'
    height='26'
    fill='none'
    viewBox='0 0 25 26'
  >
    <path
      stroke='#53423C'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M14.586 8.953l-4.167 4.167 4.167 4.167'
    ></path>
  </svg>
)

const Next = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='26'
    height='26'
    fill='none'
    viewBox='0 0 26 26'
  >
    <path
      stroke='#53423C'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M11.305 8.953l4.166 4.167-4.166 4.167'
    ></path>
  </svg>
)