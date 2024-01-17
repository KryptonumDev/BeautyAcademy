'use client'
import { useState } from 'react';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';

const Column = ({
  content,
}) => {
  const [ tab, setTab ] = useState(0);
  const [ active, setActive ] = useState(() => content.map(() => ({ id: 0 })));

  const handleClick = (e, tab, index) => {
    e.preventDefault();
    setActive((prevActive) =>
      prevActive.map((item, i) => ({
        id: tab === i ? index : item.id,
      }))
    );
  };

  return (

      <div className={styles.column}>
        <nav>
          {content.map(({ title }, i) => (
            <button
              aria-current={tab === i}
              onClick={() => setTab(i)}
              key={i}
            >{title}</button>
          ))}
        </nav>
        <div>
          {content.map(({ list }, index) => (
            <div
              className={styles.list}
              key={index}
              style={{ display: tab === index ? 'block' : 'none' }}
            >
              {list.map(({ title, description }, subIndex) => (
                <details
                  key={subIndex}
                  open
                  data-opened={active[index].id === subIndex}
                >
                  <summary
                    onClick={(e) => handleClick(e, index, subIndex)}
                  >
                    {title}
                    <div className={styles.indicator} aria-hidden={true}>
                      <span></span>
                      <span></span>
                    </div>
                  </summary>
                  <motion.div
                    key={subIndex}
                    className={styles.answer}
                    initial={subIndex === 0 ? { height: 'auto', marginBottom: '24px' } : { height: 0, marginBottom: 0 }}
                    animate={active[index].id === subIndex ? { height: 'auto', marginBottom: '24px' } : { height: 0, marginBottom: 0 }}
                    exit={{ height: 0, marginBottom: '0' }}
                  >
                    {description}
                  </motion.div>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
  );
};

export default Column;