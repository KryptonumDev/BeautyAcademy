import Markdown from "@/components/atoms/Markdown";
import styles from "./styles.module.scss";
import Button from "@/components/atoms/Button";
import Slider from "./Slider";

const Advantages = ({
  data: {
    advantages_Heading,
    advantages_Paragraph,
    advantages_Cta,
    advantages_List,
  },
}) => {
  const preformattedList = advantages_List.map(({ title, description, img }, i) => {
    title = <Markdown className={styles.title}>{title}</Markdown>;
    const text = (
      <Markdown className={styles.description}>{description}</Markdown>
    );

    return { title, text, img };
  });

  return (
    <section className={styles.wrapper}>
      <header>
        <Markdown.h2>{advantages_Heading}</Markdown.h2>
        <Markdown className={styles.paragraph}>{advantages_Paragraph}</Markdown>
        <div className="cta-wrapper">
          {advantages_Cta.map((cta, i) => (
            <Button data={cta} key={i} />
          ))}
        </div>
      </header>
      <Slider list={preformattedList} />
    </section>
  );
};

export default Advantages;
