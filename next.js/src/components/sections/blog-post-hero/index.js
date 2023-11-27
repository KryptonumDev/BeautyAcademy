import Img from '@/components/atoms/Img';
import styles from './styles.module.scss';
import Markdown from '@/components/atoms/Markdown';
import { prettyfyDate } from '@/utils/functions';
import readingTime from '@/components/atoms/readingTime';
import Link from 'next/link';

const Hero = ({
  heading,
  brief,
  img,
  _createdAt,
  category: {
    name: categoryName,
    slug: { current: categorySlug }
  },
  contentRaw,
}) => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.hero}>
        <Img
          data={img}
          className={styles.img}
          priority={true}
          sizes="100vw"
        />
        <header>
          <Markdown.h1>{heading}</Markdown.h1>
          <p className={`${styles.paragraph}`}>{brief}</p>
          <div className={styles.wrapper}>
            <Link
              href={`/blog/category/${categorySlug}`}
            >{categoryName}</Link>
            <p className={styles.createdAt}>{prettyfyDate(_createdAt)}</p>
            <p className={styles.readingTime}>{readingTime(contentRaw)}</p>
          </div>
        </header>
      </div>
    </section>
  );
};

export default Hero;