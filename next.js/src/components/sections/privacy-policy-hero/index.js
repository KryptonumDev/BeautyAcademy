'use client'
import { useState } from 'react';
import Markdown from '@/components/atoms/Markdown';
import styles from './styles.module.scss';
import { motion } from 'framer-motion';

const Hero = ({
  hero_Heading,
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
    <section className={styles.wrapper}>
      <header>
        <Markdown.h1>{hero_Heading}</Markdown.h1>
      </header>
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
                    <Markdown components={{ p: 'span' }}>{title}</Markdown>
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
                    <Markdown>{description}</Markdown>
                  </motion.div>
                </details>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;