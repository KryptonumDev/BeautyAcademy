import Markdown from "@/components/atoms/Markdown";
import styles from "./styles.module.scss";
import Content from "./index-content";

const Faq = ({ data: { heading, list } }) => {
  const preformattedList = list.map(({ question, answer }, i) => {
    const markdownQuestion = (
      <Markdown components={{ p: "span" }} className="h3">
        {question}
      </Markdown>
    );
    const markdownAnswer = <Markdown>{answer}</Markdown>;
    return { markdownQuestion, markdownAnswer };
  });

  return (
    <section className={styles.wrapper}>
      <header>
        <Markdown.h2>{heading}</Markdown.h2>
      </header>
      <Content list={preformattedList} />
      {/* <SchemaFaq data={list} /> */}
    </section>
  );
};

export default Faq;
