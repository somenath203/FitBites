import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw';


const MarkdownPreview = ({ mk }) => {
  return (
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {mk}
    </Markdown>
  );
};

export default MarkdownPreview;