import Aside from './Aside';
import Tabs from './Tabs';
import styles from './styles.module.scss';

const Content = ({
  sections,
  product: {
    author,
    category,
    advancement,
    duration,
    location,
    certificate,
  },
  chapters,
}) => {
  return (
    <section className={styles.wrapper}>
      <Aside {...{
        author,
        category,
        advancement,
        duration,
        location,
        certificate,
      }} />
      <div className={styles.content}>
        <Tabs
          sections={sections}
          chapters={chapters}
          // reviews={reviews}
        />
      </div>
    </section>
  );
};

export default Content;