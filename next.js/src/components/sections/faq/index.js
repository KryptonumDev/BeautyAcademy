'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import Markdown from '@/components/atoms/Markdown';
import styles from './styles.module.scss';

const Faq = ({
  data: {
    heading,
    list
  }
}) => {
  const [opened, setOpened] = useState(0);

  const handleClick = (e, i) => {
    e.preventDefault();
    setOpened(i);
  }

  return (
    <section className={styles.wrapper}>
      <header>
        <Markdown.h2>{heading}</Markdown.h2>
      </header>
      <div className={styles.list}>
        {list.map(({ question, answer }, i) => (
          <details
            key={i}
            open
            data-opened={opened === i}
          >
            <summary
              onClick={(e) => handleClick(e, i)}
              tabIndex={opened === i ? -1 : 0}
            >
              <Markdown components={{ p: 'span' }} className="h3">{question}</Markdown>
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
            >
              <Markdown>{answer}</Markdown>
            </motion.div>
          </details>
        ))}
      </div>
      {/* <SchemaFaq data={list} /> */}
    </section>
  );
};

export default Faq;