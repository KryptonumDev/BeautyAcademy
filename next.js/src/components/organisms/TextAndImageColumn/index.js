import { ImageRenderer } from '@/components/sections/blog-post-content/PortableTextComponent';
import styles from './styles.module.scss';
import Markdown from '@/components/atoms/Markdown';

const TextAndImageColumn = ({ img, text }) => {
  return (
    <div className={styles.wrapper}>
      <ImageRenderer
        value={img}
        sizes="(max-width: 499px) 100vw, (max-width: 1099px) 33vw, 25vw"
      />
      <Markdown className={styles.text}>{text}</Markdown>
    </div>
  );
};

export default TextAndImageColumn;