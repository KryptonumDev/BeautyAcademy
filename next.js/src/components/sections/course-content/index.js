import Aside from '@/components/organisms/course-aside';
import Tabs from './Tabs';
import styles from './styles.module.scss';

const Content = ({
  sections,
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
  courseSlug
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
          sections={sections}
          chapters={chapters}
          courseSlug={courseSlug}
        // reviews={reviews}
        />
      </div>
    </section>
  );
};

export default Content;