import Markdown from "@/components/atoms/Markdown";
import styles from "./styles.module.scss";
import Content from "./content";

const Services = ({ services_Heading, services_Ctas, services_List }) => {
  const title = <Markdown.h2>{services_Heading}</Markdown.h2>;
  const preformattedList = services_List.map(
    ({ title, description, img }, i) => {
      title = <Markdown className={styles.title}>{title}</Markdown>;
      description = <Markdown>{description}</Markdown>;
      return { title, description, img };
    }
  );

  return <Content title={title} list={preformattedList} cta={services_Ctas} />;
};

export default Services;
