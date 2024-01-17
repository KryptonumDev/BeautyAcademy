import Content from "./content";
import Markdown from "@/components/atoms/Markdown";

const Discover = ({
  data: { discover_Heading, discover_Paragraph, discover_List },
}) => {
  const heading = <Markdown.h2>{discover_Heading}</Markdown.h2>;
  const text = <Markdown>{discover_Paragraph}</Markdown>;
  const list = discover_List.map(({ title, img }, i) => {
    const markdownTitle = <Markdown className="h3">{title}</Markdown>;
    return { markdownTitle, img };
  });

  return <Content text={text} heading={heading} list={list}></Content>;
};

export default Discover;
