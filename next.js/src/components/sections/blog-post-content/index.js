import PortableTextComponent from './PortableTextComponent';
import { generateTableOfContent } from '@/utils/functions';
import TableOfContent from './TableOfContent';
import Indicator from './Indicator';

const Content = ({ data, author, title, slug }) => {
  return (
    <Indicator>
      <TableOfContent
        author={author}
        data={generateTableOfContent(data)}
      />
      <PortableTextComponent data={data} title={title} slug={slug} />
    </Indicator>
  );
};

export default Content;