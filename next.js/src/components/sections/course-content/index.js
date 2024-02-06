import Aside from "@/components/organisms/course-aside";
import Tabs from "./Tabs";
import styles from "./styles.module.scss";

const Content = ({
  sections,
  category,
  complexity,
  author,
  courseLength,
  chapters,
  courseSlug,
  isAccepted,
}) => {
  return (
    <section className={styles.wrapper}>
      <Aside
        {...{
          author,
          category,
          complexity,
          courseLength,
        }}
      />
      <div className={styles.content}>
        <Tabs
          sections={sections}
          chapters={chapters}
          courseSlug={courseSlug}
          isAccepted={isAccepted}
          // reviews={reviews}
        />
      </div>
    </section>
  );
};

export default Content;
