import PortableTextComponent from './PortableTextComponent';
import { generateTableOfContent } from '@/utils/functions';
import TableOfContent from './TableOfContent';
import Indicator from './Indicator';

const Content = ({ data, author }) => {
  return (
    <Indicator>
      <TableOfContent
        author={author}
        data={generateTableOfContent(data)}
      />
      <PortableTextComponent data={data} />
    </Indicator>
  );
};

export default Content;