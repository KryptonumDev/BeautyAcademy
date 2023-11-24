import styles from './styles.module.scss';
import Markdown from '@/components/atoms/Markdown';
import Button from '@/components/atoms/Button';

const Hero = ({
  hero_Heading,
  hero_Paragraph,
  hero_Cta,
}) => {
  return (
    <section className={styles.wrapper}>
      <header>
        <Markdown.h1>{hero_Heading}</Markdown.h1>
        <Markdown className={styles.paragraph}>{hero_Paragraph}</Markdown>
        <Button data={hero_Cta} />
      </header>
    </section>
  );
};

export default Hero;