import Aside from '@/components/organisms/course-aside';
import Tabs from './Tabs';
import styles from './styles.module.scss';

const Content = ({
  data: {
    productCategories,
    productTags,
    productAcf: {
      course: {
        courseAcf: {
          mainInformation: {
            author,
            courseLength
          }
        }
      }
    }
  },
  chapters,
  courseSlug,
  content
}) => {
  return (
    <section className={styles.wrapper}>
      <Aside {...{
        author,
        productCategories,
        productTags,
        courseLength,
      }} />
      <div className={styles.content}>
        <Tabs
          chapters={chapters}
          courseSlug={courseSlug}
          content={content}
        />
      </div>
    </section>
  );
};

export default Content;