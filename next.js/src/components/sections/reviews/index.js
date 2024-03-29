import styles from "./styles.module.scss";
import Button from "@/components/atoms/Button";
import Markdown from "@/components/atoms/Markdown";
import Slider from "./Slider";

const Reviews = ({
  data: { reviews_Heading, reviews_Paragraph, reviews_Cta, reviews_List },
}) => {
  const preformattedList = reviews_List.map(({ content, ...props }, i) => {
    content = <Markdown className={styles.content}>{content}</Markdown>;
    return { content, ...props };
  });

  return (
    <section className={styles.wrapper}>
      <header>
        <Markdown.h2>{reviews_Heading}</Markdown.h2>
        <Markdown className={styles.paragraph}>{reviews_Paragraph}</Markdown>
        <div className="cta-wrapper">
          {reviews_Cta.map((cta, i) => (
            <Button data={cta} key={i} />
          ))}
        </div>
      </header>
      <Slider list={preformattedList} />
    </section>
  );
};

export default Reviews;
