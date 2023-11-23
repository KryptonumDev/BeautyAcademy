import Markdown from '@/components/atoms/Markdown';
import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';
import Img from '@/components/atoms/Img';

const TextSection = ({
  data: {
    isReversed=false,
    heading,
    paragraph,
    standout,
    cta,
    img,
    // video
  }
}) => {
  return (
    <section className={styles.wrapper} data-reversed={isReversed}>
      <header>
        <Markdown.h2>{heading}</Markdown.h2>
        <Markdown className={styles.paragraph}>{paragraph}</Markdown>
        {standout && (
          <Markdown className={styles.standout}>{standout}</Markdown>
        )}
        <div className={`cta-wrapper ${styles.cta}`}>
          {cta.map((cta, i) => (
            <Button data={cta} key={i} />
          ))}
        </div>
      </header>
      <Img data={img} className={styles.img} />
    </section>
  );
};

export default TextSection;