import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';

const ListSection = ({
  title,
  list,
  textUnderList,
  linkUnderSection,
}) => {
  return (
    <div className={styles.listSection}>
      <h2 className="h3">{title}</h2>
      <ul>
        {list.map((item, i) => (
          <li className={styles.item} key={i}>
            {item.listItemText}
          </li>
        ))}
      </ul>
      <p className={styles.paragraph}>{textUnderList}</p>
      {linkUnderSection?.url && (
        <Button className={styles.cta} target={linkUnderSection.target} href={linkUnderSection.url}>{linkUnderSection.title}</Button>
      )}
    </div>
  );
};

export default ListSection;