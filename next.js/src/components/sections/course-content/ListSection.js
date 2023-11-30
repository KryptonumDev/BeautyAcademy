import Markdown from '@/components/atoms/Markdown';
import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';

const ListSection = ({
  heading,
  list,
  paragraph,
  cta,
}) => {
  return (
    <div className={styles.listSection}>
      <Markdown.h2 className="h3">{heading}</Markdown.h2>
      <ul>
        {list.map((item, i) => (
          <li className={styles.item} key={i}>
            {item}
          </li>
        ))}
      </ul>
      <Markdown className={styles.paragraph}>{paragraph}</Markdown>
      {cta?.href && (
        <Button data={cta} className={styles.cta} />
      )}
    </div>
  );
};

export default ListSection;