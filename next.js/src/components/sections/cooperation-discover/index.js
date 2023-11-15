'use client'
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useMediaQuery } from 'react-responsive';
import styles from './styles.module.scss';
import Markdown from '@/utils/Markdown';
import Img from '@/utils/Img';

const Discover = ({
  data: {
    discover_Heading,
    discover_Paragraph,
    discover_List,
  }
}) => {
  const wrapper = useRef();
  const { scrollYProgress } = useScroll({
    target: wrapper,
    offset: ['start end', 'end start']
  })
  const odd = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const even = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const isDesktop = useMediaQuery({ query: '(min-width: 900px)' });

  return (
    <section className={styles.wrapper}>
      <header>
        <Markdown.h2>{discover_Heading}</Markdown.h2>
        <Markdown>{discover_Paragraph}</Markdown>
      </header>
      <div className={`${styles.list} sec-wo-margin`} ref={wrapper}>
        {discover_List.map(({ title, img }, i) => (
          <motion.div
            className={styles.item}
            key={i}
            style={{ transform: 'none' }}
            {...isDesktop && { style: { y: i % 2 === 0 ? odd : even } }}
          >
            <Img
              data={img}
              sizes="(max-width: 449px) 100vw, (max-width: 899px) 66.6vw, 33vw"
            />
            <Markdown className='h3'>{title}</Markdown>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Discover;