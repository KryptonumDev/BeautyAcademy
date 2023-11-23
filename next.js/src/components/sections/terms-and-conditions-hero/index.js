import Markdown from '@/components/atoms/Markdown';
import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';

const formatBytes = bytes => {
  const KB = bytes / 1024;
  const MB = KB / 1024;
  if (MB >= 1) {
    return MB.toFixed(2) + 'MB';
  } else if (KB >= 1) {
    return KB.toFixed(2) + 'KB';
  } else {
    return bytes + 'B';
  }
}

const Hero = ({
  hero_Heading,
  hero_Paragraph,
  hero_Document: {
    asset: {
      size: documentSize,
      url: documentUrl,
    }
  },
  hero_Cta,
}) => {
  return (
    <section className={styles.wrapper}>
      <header>
        <Markdown.h1>{hero_Heading}</Markdown.h1>
        <Markdown className={styles.paragraph}>{hero_Paragraph}</Markdown>
        <a href={documentUrl} target='_blank' rel="noopener" className={`${styles.document}`}>
          <Document />
          <span className='link'>Скачать регламент ({formatBytes(documentSize)})</span>
        </a>
        <div className="cta-wrapper">
          <Button data={hero_Cta} />
        </div>
      </header>
    </section>
  );
};

export default Hero;

const Document = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='39'
    height='39'
    fill='none'
    viewBox='0 0 39 39'
  >
    <path
      stroke='#53423C'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='M29.25 16.25h-6.5A3.25 3.25 0 0119.5 13V6.5m-4.875 21.125h9.75m-9.75-4.875H19.5m9.75-6.779V29.25A3.25 3.25 0 0126 32.5H13a3.25 3.25 0 01-3.25-3.25V9.75A3.25 3.25 0 0113 6.5h6.779a3.25 3.25 0 012.298.952l6.221 6.221c.61.61.952 1.436.952 2.298z'
    ></path>
  </svg>
)