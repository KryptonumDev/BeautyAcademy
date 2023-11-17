import Markdown from '@/components/atoms/Markdown';
import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';
import Img from '@/components/atoms/Img';

const Hero = ({
  data: {
    hero_Heading,
    hero_Paragraph,
    hero_Cta,
    hero_Images,
    // hero_Videos,
  }
}) => {
  return (
    <section className={styles.wrapper}>
      <header>
        <Markdown.h1>{hero_Heading}</Markdown.h1>
        <Markdown className={styles.paragraph}>{hero_Paragraph}</Markdown>
        <div className="cta-wrapper">
          {hero_Cta.map((cta, i) => (
            <Button data={cta} key={i} />
          ))}
        </div>
      </header>
      {hero_Images.map((img, i) => (
        <Img data={img} key={i} />
      ))}
      {/* {hero_Videos.map(({ asset: { url, altText } }, i) => (
        <video autoPlay loop muted controls key={i}>
          <source src={url} />
          <p>{altText}</p>
        </video>
      ))} */}
    </section>
  );
};

export default Hero;