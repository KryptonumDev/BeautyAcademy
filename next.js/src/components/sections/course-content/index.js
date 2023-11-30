import Aside from './Aside';
import styles from './styles.module.scss';

const Content = ({
  product: {
    author,
    category,
    advancement,
    duration,
    location,
    certificate,
  }
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
    </section>
  );
};

export default Content;