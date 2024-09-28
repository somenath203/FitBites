import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw';


const MarkdownOfAiResponse = ({ mk }) => {
  return (
    <Markdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]}>
        {mk}
    </Markdown>
  );
};

export default MarkdownOfAiResponse;