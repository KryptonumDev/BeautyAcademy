import Markdown from '@/components/atoms/Markdown';
import styles from './styles.module.scss';
import Link from 'next/link';

const Hero = ({
  data: {
    hero_Heading,
    hero_Paragraph,
    category_Paragraph
  },
  categories,
  currentCategorySlug,
}) => {
  return (
    <section className={styles.wrapper}>
      <header>
        <Markdown.h1>{hero_Heading}</Markdown.h1>
        <Markdown className={styles.paragraph}>{hero_Paragraph}</Markdown>
      </header>
      {categories.length > 1 && (
        <div className={styles.categories}>
          <h2 className='h3'>{category_Paragraph}</h2>
          <div className={styles.wrapper}>
            {categories.map(({ name, slug: { current: slug } }, i) => (
              <Link
                href={`/blog/category/${slug}`}
                key={i}
                aria-current={currentCategorySlug === slug ? 'page' : undefined}
              >{name}</Link>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Hero;