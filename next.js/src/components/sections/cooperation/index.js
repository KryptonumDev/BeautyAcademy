import Img from "@/components/atoms/Img";
import styles from "./styles.module.scss";
import Markdown from "@/components/atoms/Markdown";
import Button from "@/components/atoms/Button";
import Content from "./content";

const Cooperation = ({
  data: {
    cooperation_Heading,
    cooperation_Cta,
    cooperation_Img,
    cooperation_List,
  },
}) => {
  const preformattedList = cooperation_List.map(({ title, description }, i) => {
    title = (
      <Markdown.h3 className={`${styles.title} h3`}>{title}</Markdown.h3>
    );
    const text = <Markdown>{description}</Markdown>;

    return { title, text };
  });

  return (
    <section className={styles.wrapper}>
      <Img
        data={cooperation_Img}
        sizes="(max-width: 599px) 100vw, 40vw"
        className={styles.img}
      />
      <div>
        <header>
          <Markdown.h2>{cooperation_Heading}</Markdown.h2>
          <Button data={cooperation_Cta} />
        </header>

        <Content list={preformattedList} />
      </div>
    </section>
  );
};

export default Cooperation;
