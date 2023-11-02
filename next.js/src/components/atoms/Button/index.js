import styles from './styles.module.scss';
import Link from 'next/link';

const Button = ({ data, theme = 'primary', children, href, className, ...props }) => {
  if (data) {
    theme = data.theme;
    href = data.href;
    children = data.text;
  }

  const commonProps = {
    className: `${styles.wrapper} cta${className ? ` ${className}` : ''}`,
    "data-theme": theme,
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
      {children}
    </Element>
  );
};

export default Button;