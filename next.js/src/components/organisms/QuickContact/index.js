import { ImageRenderer } from '@/components/sections/blog-post-content/PortableTextComponent';
import styles from './styles.module.scss';
import Markdown from '@/components/atoms/Markdown';
import Form from './Form';

const QuickContact = ({ heading, paragraph, img }) => {
  return (
    <aside className={styles.wrapper}>
      <ImageRenderer value={img} />
      <div>
        <header>
          <Markdown.h3>{heading}</Markdown.h3>
          {paragraph && (
            <Markdown className={styles.paragraph}>{paragraph}</Markdown>
          )}
        </header>
        <Form />
      </div>
    </aside>
  );
};

export default QuickContact;