import Markdown from "@/components/atoms/Markdown";
import styles from "./styles.module.scss";
import Column from "./content";

const Hero = ({ hero_Heading, content }) => {
  const preformattedList = content.map(({ list, ...props }) => {
    return {
      ...props,
      list: list.map(({ title, description }) => {
        title = <Markdown components={{ p: "span" }}>{title}</Markdown>;
        description = <Markdown>{description}</Markdown>;

        return { title, description };
      }),
    };
  });

  return (
    <section className={styles.wrapper}>
      <header>
        <Markdown.h1>{hero_Heading}</Markdown.h1>
      </header>
      <Column content={preformattedList} />
    </section>
  );
};

export default Hero;
