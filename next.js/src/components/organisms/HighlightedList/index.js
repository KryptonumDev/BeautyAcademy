import styles from './styles.module.scss';
import Markdown from '@/components/atoms/Markdown';

const HighlightedList = ({ list }) => {
  return (
    <ul className={styles.wrapper}>
      {list.map((item, i) => (
        <li className={styles.item} key={i}>
          <Markdown>{item}</Markdown>
        </li>
      ))}
    </ul>
  );
};

export default HighlightedList;