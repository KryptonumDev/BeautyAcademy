'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';

const Faq = ({
  data: {
    faqTitle,
    faq
  }
}) => {
  const [opened, setOpened] = useState(0);

  const handleClick = (e, i) => {
    e.preventDefault();
    setOpened(i);
  }

  if (!faq?.length) return null;

  return (
    <section className={styles.wrapper}>
      <header>
        <h2>{faqTitle}</h2>
      </header>
      <div className={styles.list}>
        {faq?.map(({ question, answer }, i) => (
          <details
            key={i}
            open
            data-opened={opened === i}
          >
            <summary
              onClick={(e) => handleClick(e, i)}
              tabIndex={opened === i ? -1 : 0}
            >
              <span className="h3">{question}</span>
              <div className={styles.indicator} aria-hidden={true}>
                <span></span>
                <span></span>
              </div>
            </summary>
            <motion.div
              className={styles.answer}
              initial={i === 0 ? { height: 'auto', marginBottom: '24px' } : { height: 0, marginBottom: 0 }}
              animate={opened === i ? { height: 'auto', marginBottom: '24px' } : { height: 0, marginBottom: 0 }}
              exit={{ height: 0, marginBottom: '0' }}
              dangerouslySetInnerHTML={{ __html: answer }}
            />
          </details>
        ))}
      </div>
      {/* <SchemaFaq data={list} /> */}
    </section>
  );
};

export default Faq;