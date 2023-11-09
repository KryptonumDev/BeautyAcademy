import BlogCard from '@/components/moleculas/BlogCard';
import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';

const BlogEntries = ({ entries, page, scrollToId, showEntries, allEntries }) => {
  return (
    <section>
      <div className={styles.wrapper}>
        {entries.map((entry, i) => (
          <BlogCard
            data={entry}
            withoutGrid={true}
            id={scrollToId === i ? 'pagination' : ''}
            key={i}
          />
        ))}
      </div>
      <div className={styles.pagination}>
        <p>{`${showEntries} из ${allEntries} статей`}</p>
        <div
          className={styles.progress}
          role="progressbar"
          aria-valuemin={0}
          aria-valuenow={showEntries}
          aria-valuemax={allEntries}
        >
          <div style={{ width: `${(showEntries / allEntries)*100}%` }}></div>
        </div>
        {showEntries < allEntries && (
          <Button href={`/blog/?page=${page+1}#pagination`}>Отправить сообщение</Button>
        )}
      </div>
    </section>
  );
};

export default BlogEntries;