import styles from './styles.module.scss';
import { ImageRenderer } from '@/components/sections/blog-post-content/PortableTextComponent';

const ImageColumn = ({ list }) => {
  return (
    <div className={styles.wrapper}>
      {list.map((img, i) => (
        <ImageRenderer
          value={img}
          key={i}
          sizes="(max-width: 1099px) 50vw, 33vw"
        />
      ))}
    </div>
  );
};

export default ImageColumn;