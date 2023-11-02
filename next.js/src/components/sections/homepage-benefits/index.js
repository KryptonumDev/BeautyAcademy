import Markdown from '@/utils/Markdown';
import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';
import Img from '@/utils/Img';

const Benefits = ({
  data: {
    benefits_Heading,
    benefits_Paragraph,
    benefits_List,
    benefits_Paragraph2,
    benefits_Cta,
    benefits_Img,
  }
}) => {
  return (
    <section className={`${styles.wrapper} sec-wo-margin`}>
      <header>
        <Markdown.h1>{benefits_Heading}</Markdown.h1>
        <Markdown className={styles.paragraph}>{benefits_Paragraph}</Markdown>
        <div className={styles.list}>
          {benefits_List.map((item, i) => (
            <Markdown className={styles.item} key={i}>{item}</Markdown>
          ))}
        </div>
        <Markdown className={styles.paragraph2}>{benefits_Paragraph2}</Markdown>
        <div className="cta-wrapper">
          {benefits_Cta.map(( cta, i ) => (
            <Button data={cta} key={i} />
          ))}
        </div>
      </header>
      <Img data={benefits_Img} className={styles.img} />
      <Sygnet className={styles.sygnet} />
    </section>
  );
};

export default Benefits;

const Sygnet = ({ ...props }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='130'
    height='189'
    fill='none'
    viewBox='0 0 130 189'
    {...props}
  >
    <rect
      width='108.661'
      height='166.78'
      x='10.67'
      y='10.806'
      fill='#2B483C'
      rx='54.331'
    ></rect>
    <path
      fill='url(#a)'
      d='M38.17 110.248v-.742l4.452-1.113V60.161l-4.452-1.113v-.742h13.356c2.325 0 4.329.272 6.011.816 1.731.495 3.166 1.212 4.304 2.152 1.138.89 1.978 1.954 2.523 3.19a8.52 8.52 0 01.89 3.86c0 1.087-.173 2.052-.52 2.893a7.034 7.034 0 01-1.26 2.226 9.445 9.445 0 01-1.782 1.633c-.643.445-1.31.816-2.003 1.113-1.633.742-3.488 1.212-5.565 1.41 3.067.296 5.787 1.063 8.162 2.3a16.468 16.468 0 012.968 2.003c.99.742 1.855 1.682 2.597 2.82.792 1.088 1.41 2.375 1.855 3.859.495 1.434.742 3.091.742 4.971 0 2.325-.445 4.502-1.335 6.53-.89 2.028-2.177 3.809-3.859 5.343-1.632 1.484-3.611 2.671-5.936 3.562-2.325.84-4.922 1.261-7.791 1.261H38.17zm10.76-31.907v30.423h2.596c1.682 0 3.24-.322 4.675-.965 1.435-.643 2.672-1.607 3.71-2.894 1.089-1.286 1.93-2.869 2.523-4.749.644-1.88.965-4.08.965-6.604 0-2.523-.322-4.724-.965-6.604-.593-1.88-1.434-3.463-2.523-4.749-1.038-1.286-2.275-2.25-3.71-2.894-1.434-.643-2.992-.964-4.675-.964H48.93zm0-1.484h2.596c2.227-.05 4.007-.767 5.343-2.152 1.385-1.435 2.078-3.562 2.078-6.382s-.693-4.947-2.078-6.381c-1.336-1.435-3.116-2.152-5.343-2.152H48.93v17.066z'
    ></path>
    <path
      fill='url(#b)'
      d='M51.5 129.63c-1.832.417-3.224.43-4.176.037-.952-.392-1.577-.909-1.875-1.552-.347-.631-.558-1.115-.635-1.453-.095-.638.08-1.211.522-1.717a2.655 2.655 0 011.533-.958 1.836 1.836 0 011.078.059c.323.079.544.384.665.914.11.483.018.859-.276 1.129a2.215 2.215 0 01-1.02.536 2.406 2.406 0 01-.9.053l-.468-.046c.297 1.302.977 2.061 2.04 2.275 1.064.215 2.198.185 3.404-.089 1.881-.428 3.69-1.398 5.426-2.909 1.785-1.522 3.54-3.393 5.268-5.612a120.665 120.665 0 005.162-7.415 474.048 474.048 0 015.431-8.237c2.008-2.994 3.997-5.957 5.968-8.892a141.392 141.392 0 015.898-8.19c1.924-2.468 3.768-4.511 5.53-6.13 1.763-1.618 3.44-2.609 5.032-2.97.53-.122.77-.075.717.14-.004.204-.357.437-1.059.698-1.622.673-3.304 1.868-5.044 3.583-1.704 1.656-3.445 3.7-5.225 6.135a155.442 155.442 0 00-5.458 7.787 1038.89 1038.89 0 01-5.56 8.342l-5.263 7.97a109.251 109.251 0 01-5.29 7.52c-1.754 2.327-3.59 4.292-5.508 5.896-1.87 1.592-3.842 2.624-5.916 3.096zm21.545-8.326a5.456 5.456 0 01-.963.447c-.338.077-.462-.022-.372-.296.09-.274.262-.744.516-1.411.291-.726.507-1.561.647-2.506a6.693 6.693 0 00-.03-2.809c-.275-1.206-.804-2.531-1.59-3.976-.748-1.504-1.75-2.899-3.007-4.186-1.208-1.298-2.67-2.259-4.385-2.884-1.677-.683-3.577-.784-5.7-.301-1.399.319-2.528.931-3.387 1.836-.811.895-1.372 1.885-1.683 2.971-.274 1.026-.312 1.973-.115 2.841.428 1.882 1.39 3.54 2.883 4.976 1.542 1.425 3.59 2.404 6.148 2.939 2.545.486 5.53.339 8.956-.44 3.762-.856 6.99-2.275 9.684-4.258 2.695-1.983 4.819-4.242 6.373-6.777 1.554-2.535 2.483-5.03 2.787-7.483.077-.779.215-1.064.414-.856.237.15.377.32.421.513.374 1.64.198 3.431-.528 5.371-.725 1.941-1.936 3.866-3.633 5.774-1.707 1.859-3.789 3.525-6.244 4.997-2.456 1.472-5.251 2.565-8.386 3.278-3.232.735-6.327.958-9.285.667-2.91-.302-5.412-1.153-7.506-2.554-2.046-1.411-3.355-3.371-3.925-5.88-.385-1.688-.036-3.391 1.044-5.108 1.118-1.776 3.052-2.977 5.801-3.603 2.315-.526 4.366-.435 6.15.275 1.834.699 3.408 1.711 4.724 3.035 1.316 1.324 2.367 2.708 3.152 4.153.786 1.445 1.293 2.674 1.524 3.686a13.5 13.5 0 01.323 3.428c-.048 1.127-.158 2.09-.331 2.891-.136.741-.295 1.157-.477 1.25zm-5.969 8.782c.037-.06 2.796-5.448 3.46-6.766.664-1.318 1.535-3.063 2.614-5.236 1.078-2.174 2.3-4.608 3.665-7.303a580.204 580.204 0 014.247-8.424 1457.56 1457.56 0 014.336-8.368 370.889 370.889 0 014.011-7.458c1.26-2.265 2.319-4.079 3.176-5.44.905-1.373 1.521-2.122 1.848-2.247.219-.152.436-.2.65-.148.216.052.206.232-.028.539-.16.189-.655 1.138-1.483 2.849-.84 1.662-1.888 3.854-3.146 6.575a1335.18 1335.18 0 00-4.004 8.826l-4.234 9.486a792.277 792.277 0 00-3.892 8.648 243.42 243.42 0 01-2.833 6.276c-.706 1.581-3.491 7.077-3.54 7.088-.203-.005-.552.024-1.045.085a12.39 12.39 0 00-1.319.224 19.16 19.16 0 00-1.503.418c-.509.218-.835.343-.98.376z'
    ></path>
    <rect
      width='108.661'
      height='166.78'
      x='10.67'
      y='10.806'
      stroke='url(#c)'
      rx='54.331'
    ></rect>
    <rect
      width='128.661'
      height='186.78'
      x='0.67'
      y='0.806'
      stroke='url(#d)'
      rx='64.331'
    ></rect>
    <defs>
      <linearGradient
        id='a'
        x1='38.17'
        x2='98.967'
        y1='124.128'
        y2='124.128'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F7C479'></stop>
        <stop offset='0.253' stopColor='#DCA855'></stop>
        <stop offset='0.582' stopColor='#C79442'></stop>
        <stop offset='0.764' stopColor='#BC7F1D'></stop>
        <stop offset='1' stopColor='#BA7403'></stop>
      </linearGradient>
      <linearGradient
        id='b'
        x1='38.17'
        x2='98.967'
        y1='124.128'
        y2='124.128'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F7C479'></stop>
        <stop offset='0.253' stopColor='#DCA855'></stop>
        <stop offset='0.582' stopColor='#C79442'></stop>
        <stop offset='0.764' stopColor='#BC7F1D'></stop>
        <stop offset='1' stopColor='#BA7403'></stop>
      </linearGradient>
      <linearGradient
        id='c'
        x1='10.17'
        x2='125.796'
        y1='164.16'
        y2='164.16'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F7C479'></stop>
        <stop offset='0.253' stopColor='#DCA855'></stop>
        <stop offset='0.582' stopColor='#C79442'></stop>
        <stop offset='0.764' stopColor='#BC7F1D'></stop>
        <stop offset='1' stopColor='#BA7403'></stop>
      </linearGradient>
      <linearGradient
        id='d'
        x1='0.17'
        x2='136.884'
        y1='172.5'
        y2='172.5'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F7C479'></stop>
        <stop offset='0.253' stopColor='#DCA855'></stop>
        <stop offset='0.582' stopColor='#C79442'></stop>
        <stop offset='0.764' stopColor='#BC7F1D'></stop>
        <stop offset='1' stopColor='#BA7403'></stop>
      </linearGradient>
    </defs>
  </svg>
)