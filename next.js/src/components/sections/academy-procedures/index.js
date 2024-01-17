import Markdown from "@/components/atoms/Markdown";
import Slider from "./slider";
import styles from './styles.module.scss';

const Procedures = ({ data: { procedures_Heading, procedures_List } }) => {
  const formattedList = procedures_List.map(
    ({ title, description, img }, i) => {
      title = (
        <Markdown.h3 className={`${styles.title} h3`}>{title}</Markdown.h3>
      );
      description = <Markdown>{description}</Markdown>;
      return { title, description, img };
    }
  );
  const title = <Markdown.h2>{procedures_Heading}</Markdown.h2>;

  return <Slider list={formattedList} title={title} />;
};

export default Procedures;
