import Markdown from '@/components/atoms/Markdown';
import styles from './styles.module.scss';
import Item from './Item';

const Benefits = ({
  data: {
    benefits_Heading,
    benefits_List,
  }
}) => {
  return (
    <section className={styles.wrapper}>
      <header>
        <Markdown.h2>{benefits_Heading}</Markdown.h2>
      </header>
      <div className={styles.list}>
        {benefits_List.map((item, i) => (
          <Item className={styles.item} key={i}>
            <Markdown>{item}</Markdown>
          </Item>
        ))}
      </div>
    </section>
  );
};

export default Benefits;