import { ImageRenderer } from '@/components/sections/blog-post-content/PortableTextComponent';
import styles from './styles.module.scss';
import Markdown from '@/components/atoms/Markdown';

const TextAndImageColumn = ({ img, text }) => {
  return (
    <div className={styles.wrapper}>
      <ImageRenderer value={img} />
      <Markdown className={styles.text}>{text}</Markdown>
    </div>
  );
};

export default TextAndImageColumn;