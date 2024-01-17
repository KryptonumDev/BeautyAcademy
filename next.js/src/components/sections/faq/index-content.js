'use client'
import styles from './styles.module.scss';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Content({list}) {
  const [opened, setOpened] = useState(0);
  debugger
  const handleClick = (e, i) => {
    e.preventDefault();
    setOpened(i);
  }
  return (
    <div className={styles.list}>
      {list.map(({ markdownQuestion, markdownAnswer }, i) => (
        <details key={i} open data-opened={opened === i}>
          <summary
            onClick={(e) => handleClick(e, i)}
            tabIndex={opened === i ? -1 : 0}
          >
            {markdownQuestion}
            <div className={styles.indicator} aria-hidden={true}>
              <span></span>
              <span></span>
            </div>
          </summary>
          <motion.div
            className={styles.answer}
            initial={
              i === 0
                ? { height: "auto", marginBottom: "24px" }
                : { height: 0, marginBottom: 0 }
            }
            animate={
              opened === i
                ? { height: "auto", marginBottom: "24px" }
                : { height: 0, marginBottom: 0 }
            }
            exit={{ height: 0, marginBottom: "0" }}
          >
            {markdownAnswer}
          </motion.div>
        </details>
      ))}
    </div>
  );
}