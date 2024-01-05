import Markdown from '@/components/atoms/Markdown';
import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';
import Img from '@/components/atoms/Img';
import Video from '@/components/organisms/Video';

const Hero = ({
  data: {
    hero_Heading,
    hero_Paragraph,
    hero_Cta,
    hero_Images,
    hero_VideoPhone,
    hero_VideoSquare,
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
      <div className={styles.assets}>
        {hero_Images.map((img, i) => (
          <div className={styles.img} key={i}>
            <Img
              data={img}
              priority={true}
              sizes="(max-width: 768px) 160px, 280px"
            />
          </div>
        ))}
        <Video
          asset={hero_VideoPhone.asset}
          className={styles.videoPhone}
          priority={true}
        />
        <Video
          asset={hero_VideoSquare.asset}
          className={styles.videoSquare}
          isSquare={true}
          priority={true}
          muted={true}
          infinite={true}
        />
      </div>
    </section>
  );
};

export default Hero;