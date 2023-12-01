import Aside from './Aside';
import Tabs from './Tabs';
import styles from './styles.module.scss';

const Content = ({
  product: {
    author,
    category,
    advancement,
    duration,
    location,
    certificate,
  },
  chapters,
  reviews,
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
          chapters={chapters}
          reviews={reviews}
        />
      </div>
    </section>
  );
};

export default Content;