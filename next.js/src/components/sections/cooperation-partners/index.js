import Markdown from '@/components/atoms/Markdown';
import Slider from './slider';
import styles from './styles.module.scss';

const Partners = ({
  data: {
    partners_Heading,
    partners_Paragraph,
    partners_Cta,
    partners_List,
  }
}) => {

  const title =<Markdown.h2>{partners_Heading}</Markdown.h2>
  const text = <Markdown className={styles.paragraph}>{partners_Paragraph}</Markdown>

  return <Slider
    title={title}
    text={text}
    data={{
      partners_Cta,
      partners_List,
    }}
  />
};

export default Partners;