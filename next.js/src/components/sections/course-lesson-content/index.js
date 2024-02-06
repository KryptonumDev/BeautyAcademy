import Aside from "@/components/organisms/course-aside";
import Tabs from "./Tabs";
import styles from "./styles.module.scss";

const Content = ({
  author,
  category,
  complexity,
  chapters,
  courseSlug,
  content,
  courseLength
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
        <Tabs chapters={chapters} courseSlug={courseSlug} content={content} />
      </div>
    </section>
  );
};

export default Content;
