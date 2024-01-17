"use client";
import styles from "./styles.module.scss";
import Markdown from "@/components/atoms/Markdown";
import Content from "./content";

const Features = ({
  data: { features_Heading, features_Paragraph, features_Cta, features_List },
}) => {
  const title = <Markdown.h2>{features_Heading}</Markdown.h2>;
  const text = (
    <Markdown className={styles.paragraph}>{features_Paragraph}</Markdown>
  );
  const preformattedList = features_List.map(
    ({ title, description, img }, i) => {
      title = <Markdown.h3 className={styles.title}>{title}</Markdown.h3>;
      description = (
        <Markdown className={styles.description}>{description}</Markdown>
      );

      return { title, description, img };
    }
  );

  return (
    <Content
      title={title}
      text={text}
      list={preformattedList}
      data={{
        features_Cta: features_Cta,
      }}
    />
  );
};

export default Features;
