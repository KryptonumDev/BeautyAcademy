import Markdown from "@/components/atoms/Markdown";
import Content from "./content";

const HorizontalShowcase = ({ data: { heading, cta, list } }) => {
  const title = <Markdown.h2>{heading}</Markdown.h2>;
  return <Content title={title} cta={cta} list={list} />;
};

export default HorizontalShowcase;
