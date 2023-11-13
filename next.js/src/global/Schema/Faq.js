import ReactMarkdown from 'react-markdown';
import { renderToString } from "react-dom/server";

const SchemaFaq = ({ data }) => {
  const schama = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": data.map(({ question, answer }) => {
      const questionStream = renderToString(<ReactMarkdown>{question}</ReactMarkdown>);
      const answerStream = renderToString(<ReactMarkdown>{answer}</ReactMarkdown>);
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