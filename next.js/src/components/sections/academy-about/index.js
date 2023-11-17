import Markdown from '@/components/atoms/Markdown';
import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';

const About = ({
  data: {
    about_Heading,
    about_Paragraph,
    about_Standout,
    about_Cta,
  }
}) => {
  return (
    <section className={styles.wrapper}>
      <header>
        <Markdown.h2>{about_Heading}</Markdown.h2>
        <Markdown className={styles.paragraph}>{about_Paragraph}</Markdown>
        {about_Standout && (
          <Markdown className={styles.standout}>{about_Standout}</Markdown>
        )}
        <div className={`cta-wrapper ${styles.cta}`}>
          {about_Cta.map((cta, i) => (
            <Button data={cta} key={i} />
          ))}
        </div>
      </header>
    </section>
  );
};

export default About;