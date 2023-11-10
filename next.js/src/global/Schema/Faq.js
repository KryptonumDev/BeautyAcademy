import ReactMarkdown from 'react-markdown';
import { renderToPipeableStream } from 'react-dom/server';


const SchemaFaq = ({ data }) => {
  const schama = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.map(({ question, answer }) => {
      const questionStream = renderToPipeableStream(<ReactMarkdown>{question}</ReactMarkdown>).stream;
      const answerStream = renderToPipeableStream(<ReactMarkdown>{answer}</ReactMarkdown>).stream;

      return {
        "@type": "Question",
        "name": questionStream,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": answerStream,
        }
      };
    })
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schama) }}
    />
  );
};

export default SchemaFaq;