import { useMemo } from 'react';
import Aside from './Aside';
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
  const complicity = useMemo(() => productTags.nodes[0].slug, [productTags])
  return (
    <section className={styles.wrapper}>
      <Aside {...{
        author,
        productCategories,
        complicity,
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