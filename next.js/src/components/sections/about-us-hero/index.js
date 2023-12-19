import Img from '@/components/atoms/Img';
import styles from './styles.module.scss';
import Markdown from '@/components/atoms/Markdown';
import List from './List';

const Hero = ({
  data: {
    hero_Heading,
    hero_Paragraph,
    hero_List,
    hero_Img,
  }
}) => {

  return (
    <section className={styles.wrapper}>
      <Markdown.h1>{hero_Heading}</Markdown.h1>
      <div className={styles.container}>
        <Img
          data={hero_Img}
          className={styles.img}
          priority={true}
          sizes="(max-width: 768px) 390px, 488px"
        />
        <List className={styles.list}>
          {hero_List.map((item, i) => (
            <p className={styles.item} key={i} >
              {item}
            </p>
          ))}
        </List>
      </div>
      <Markdown className={styles.paragraph}>{hero_Paragraph}</Markdown>
    </section>
  );
};

export default Hero;