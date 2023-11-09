import fetchData from '@/utils/fetchData';
import styles from './styles.module.scss';
import Markdown from '@/utils/Markdown';
import Img from '@/utils/Img';
import Form from './form';

const Newsletter = async () => {
  const { global: {
    newsletter_Heading,
    newsletter_Paragraph,
    newsletter_Img,
  }} = await getData();

  return (
    <aside className={styles.wrapper}>
      <div>
        <Markdown.h1>{newsletter_Heading}</Markdown.h1>
        <Markdown className={styles.paragraph}>{newsletter_Paragraph}</Markdown>
        <Form />
      </div>
      <Img data={newsletter_Img} className={styles.img} />
    </aside>
  );
};

const getData = async () => {
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