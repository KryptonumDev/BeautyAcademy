import styles from './styles.module.scss';
import Link from 'next/link';

const Button = ({ data, theme = 'primary', variant = 'primary', children, href, className, ...props }) => {
  if (data) {
    theme = data.theme;
    href = data.href;
    children = data.text;
  }

  const isExternal = href?.startsWith('https://');

  const commonProps = {
    className: `cta${className ? ` ${className}` : ''}`,
    "data-theme": theme,
    "data-variant": variant,
    ...props,
  };
  const InnerContent = (
    <>
      <span>{children}</span>
      {theme === 'primary' && (
        <>
          <div className={styles.fill}></div>
          <Icon.connector />
          <Icon.arrow />
        </>
      )}
      {theme === 'secondary' && (
        <Icon.border />
      )}
    </>
  );
  const renderButton = (
    <button type="button" {...commonProps}>
      {InnerContent}
    </button>
  );
  const renderLink = (
    <Link href={href} {...commonProps}>
      {InnerContent}
    </Link>
  );
  const renderExternalLink = (
    <a href={href} target="_blank" rel="noreferrer" {...commonProps}>
      {InnerContent}
    </a>
  );
  return (
    <div className={styles.wrapper}>
      {href ? (isExternal ? renderExternalLink : renderLink) : renderButton}
    </div>
  );
};

const Icon = {
  "connector": () => (
    <svg xmlns='http://www.w3.org/2000/svg' width='10' height='27' fill='none' className={styles.connector}>
      <path
        fill='var(--btn-color)'
        d='M.125 26.454V.312c.719 9.844 7.344 8.583 9 3.907v17.625c-4.485-6.479-8.985.032-9 4.61v.046-.046z'
      ></path>
    </svg>
  ),
  "arrow": () => (
    <svg xmlns='http://www.w3.org/2000/svg' width='51' height='53' fill='none' className={styles.arrow}>
      <rect width='51' height='52' y='0.566' fill='var(--btn-color)' rx='25.5'></rect>
      <path
        fill='url(#button-arrow-primary)'
        d='M15.125 22.554v8.292h12.852v5.618l9.898-9.898-9.898-9.897v5.885H15.125z'
      ></path>
      <defs>
        <linearGradient
          id='button-arrow-primary'
          x1='30'
          x2='23.022'
          y1='21.687'
          y2='38.508'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#CFFA5B'></stop>
          <stop offset='0.922' stopColor='#EAFFAF'></stop>
          <stop offset='1' stopColor='#EBFFB6'></stop>
        </linearGradient>
        <linearGradient
          id='button-arrow-primary'
          x1='18.123'
          x2='38.488'
          y1='38.817'
          y2='-3.075'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#E0FD8E'></stop>
          <stop offset='0.922' stopColor='#EAFFAF'></stop>
          <stop offset='1' stopColor='#EBFFB6'></stop>
        </linearGradient>
        <linearGradient
          id='button-arrow-secondary'
          x1='15.594'
          x2='38.344'
          y1='26'
          y2='26'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#14E5D7'></stop>
          <stop offset='1' stopColor='#00C2B5'></stop>
        </linearGradient>
      </defs>
    </svg>
  ),
  "border": () => (
    <svg xmlns='http://www.w3.org/2000/svg' width='132' height='42' fill='none'>
      <rect
        width='131'
        height='41'
        x='0.5'
        y='0.5'
        stroke='var(--neutral-800)'
        rx='20.5'
      ></rect>
    </svg>
  )
}

export default Button;