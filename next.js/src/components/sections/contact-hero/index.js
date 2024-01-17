import Markdown from "@/components/atoms/Markdown";
import styles from "./styles.module.scss";
import Img from "@/components/atoms/Img";
import Form from "./Form";
import { Social } from "@/components/atoms/Icons";
import fetchData from "@/utils/fetchData";

const Hero = async ({
  hero: { hero_Heading, hero_Paragraph, hero_People },
  form: {
    success_Heading,
    success_Paragraph,
    error_Heading,
    error_Paragraph,
    heading,
  },
  form
}) => {
  const {
    socials: { instagram, facebook, telegram },
  } = await query();

  const socials = [
    {
      name: "Instagram",
      icon: <Social.Instagram />,
      url: instagram,
    },
    {
      name: "Facebook",
      icon: <Social.Facebook />,
      url: facebook,
    },
    {
      name: "Telegram",
      icon: <Social.Telegram />,
      url: telegram,
    },
  ];
  const successHeading = <Markdown.h3>{success_Heading}</Markdown.h3>;
  const successParagraph = (
    <Markdown className={styles.paragraph}>{success_Paragraph}</Markdown>
  );

  const errorHeading = <Markdown.h3>{error_Heading}</Markdown.h3>;
  const errorParagraph = (
    <Markdown className={error_Paragraph}>{error_Paragraph}</Markdown>
  );

  const formHeading = heading && (
    <Markdown.h2 className="h3">{heading}</Markdown.h2>
  );

  return (
    <section className={styles.wrapper}>
      <header>
        <Markdown.h1>{hero_Heading}</Markdown.h1>
        <Markdown className={styles.paragraph}>{hero_Paragraph}</Markdown>
        <div className={styles.people}>
          {hero_People.map((img, i) => (
            <Img
              data={img}
              sizes="104px"
              priority={true}
              key={i}
              className={styles.img}
            />
          ))}
        </div>
        <ul className={styles.socials}>
          {socials.map(
            ({ url, icon, name }, i) =>
              url && (
                <li key={i}>
                  <a
                    href={url}
                    target="_blank"
                    rel="noopener"
                    aria-label={name}
                  >
                    {icon}
                  </a>
                </li>
              )
          )}
        </ul>
      </header>
      <Form
        successHeading={successHeading}
        successParagraph={successParagraph}
        errorHeading={errorHeading}
        errorParagraph={errorParagraph}
        data={form}
        formHeading={formHeading}
      />
    </section>
  );
};

const query = async () => {
  const {
    body: { data },
  } = await fetchData(`
    query {
      socials: Global(id: "global") {
        instagram
        facebook
        telegram
      }
    }
  `);
  return data;
};

export default Hero;
