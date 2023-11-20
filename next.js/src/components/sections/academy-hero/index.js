import Img from '@/components/atoms/Img';
import styles from './styles.module.scss';
import Markdown from '@/components/atoms/Markdown';
import Button from '@/components/atoms/Button';
import Counter from '@/components/atoms/Counter';

const Hero = ({
  data: {
    hero_Heading,
    hero_Paragraph,
    hero_Cta,
    hero_Img,
    hero_Stats,
  }
}) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.hero}>
        <Img
          data={hero_Img}
          className={styles.img}
          priority={true}
          sizes="100vw"
        />
        <header>
          <Markdown.h1>{hero_Heading}</Markdown.h1>
          <Markdown className={`${styles.paragraph} h3`}>{hero_Paragraph}</Markdown>
          <Button data={hero_Cta} />
        </header>
      </div>
      <div className={`${styles.stats} sec-wo-margin`}>
        {hero_Stats.map(({ number, description }, i) => (
          <div className={styles.item} key={i}>
            <Counter className={styles.number}>{number}</Counter>
            <p className={styles.description}>{description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;