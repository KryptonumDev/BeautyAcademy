import Link from 'next/link';
import styles from './styles.module.scss';
import Img from '@/utils/Img';
import { prettyfyDate } from '@/utils/functions';
import Button from '@/components/atoms/Button';

const BlogCard = ({
  data: {
    name,
    slug: { current: slug },
    brief,
    thumbnail,
    category: {
      name: categoryName,
      slug: { current: categorySlug }
    },
    _createdAt
  },
  withoutGrid=false,
  ...props
}) => {
  return (
    <div
      className={styles.wrapper}
      data-without-grid={withoutGrid}
      {...props}
    >
      <Link className={styles.link} href={`/blog/${slug}`} tabIndex={-1} aria-label={name}></Link>
      <Img data={thumbnail} className={styles.thumbnail} />
      <div>
        <p className={styles.createdAt}>{prettyfyDate(_createdAt)}</p>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.breif}>{brief}</p>
        <Button href={`/blog/${slug}`} variant='secondary' className={styles.readMore}>читать далее</Button>
      </div>
      <Link className={styles.category} href={`/blog/category/${categorySlug}`}>{categoryName}</Link>
    </div>
  );
};

export default BlogCard;