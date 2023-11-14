import Markdown from '@/utils/Markdown';
import styles from './styles.module.scss';
import Img from '@/utils/Img';
import Form from './Form';
import { Social } from '@/components/atoms/Icons';
import fetchData from '@/utils/fetchData';

const Hero = async ({
  hero: {
    hero_Heading,
    hero_Paragraph,
    hero_People,
  },
  form: {
    form_Heading,
    form_Subjects,
    states,
  }
}) => {
  const { socials: {
    instagram,
    facebook,
    telegram
  }} = await query();
  
  const socials = [
    {
      name: 'Instagram',
      icon: <Social.Instagram />,
      url: instagram
    },
    {
      name: 'Facebook',
      icon: <Social.Facebook />,
      url: facebook
    },
    {
      name: 'Telegram',
      icon: <Social.Telegram />,
      url: telegram
    },
  ]

  return (
    <section className={styles.wrapper}>
      <header>
        <Markdown.h1>{hero_Heading}</Markdown.h1>
        <Markdown className={styles.paragraph}>{hero_Paragraph}</Markdown>
        <div className={styles.people}>
          {hero_People.map((img, i) => (
            <Img
              data={img}
              key={i}
              className={styles.img}
            />
          ))}
        </div>
        <ul className={styles.socials}>
          {socials.map(({ url, icon, name }, i) => (
            url && (
              <li key={i}>
                <a href={url} target="_blank" rel="noopener" aria-label={name}>
                  {icon}
                </a>
              </li>
            )
          ))}
        </ul>
      </header>
      <Form data={{
        form_Heading,
        form_Subjects,
        states
      }} />
    </section>
  );
};

const query = async () => {
  const { body: { data } } = await fetchData(`
    query {
      socials: Global(id: "global") {
        instagram
        facebook
        telegram
      }
    }
  `)
  return data;
}

export default Hero;