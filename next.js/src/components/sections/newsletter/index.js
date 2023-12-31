import fetchData from '@/utils/fetchData';
import styles from './styles.module.scss';
import Markdown from '@/components/atoms/Markdown';
import Img from '@/components/atoms/Img';
import Form from './form';

const Newsletter = async () => {
  const { global: {
    newsletter_Heading,
    newsletter_Paragraph,
    newsletter_Img,
  }} = await query();

  return (
    <aside className={styles.wrapper}>
      <div>
        <Markdown.h2>{newsletter_Heading}</Markdown.h2>
        <Markdown className={styles.paragraph}>{newsletter_Paragraph}</Markdown>
        <Form groupID='105369547389797487' />
      </div>
      <Img
        data={newsletter_Img}
        sizes='100vw'
        className={styles.img}
      />
    </aside>
  );
};

const query = async () => {
  const { body: { data } } = await fetchData(`
    query {
      global: Global(id: "global") {
        newsletter_Heading
        newsletter_Paragraph
        newsletter_Img {
          asset {
            altText
            url
            metadata {
              lqip
              dimensions {
                width
                height
              }
            }
          }
        }
      }
    }
  `)
  return data;
}

export default Newsletter;