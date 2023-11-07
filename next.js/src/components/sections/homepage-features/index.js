'use client';
import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';
import Img from '@/utils/Img';
import Markdown from '@/utils/Markdown';
import { useMediaQuery } from 'react-responsive'

const Features = ({
  data: {
    features_Heading,
    features_Paragraph,
    features_Cta,
    features_List,
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
        <Markdown.h2>{features_Heading}</Markdown.h2>
        <Markdown className={styles.paragraph}>{features_Paragraph}</Markdown>
        <div className="cta-wrapper">
          {features_Cta.map((cta, i) => (
            <Button data={cta} key={i} />
          ))}
        </div>
      </header>
      <div className={styles.list} ref={wrapper}>
        {features_List.map(({ title, description, img }, i) => (
          <motion.div
            {...isDesktop && { style: { y: i % 2 === 0 ? odd : even } }}
            className={styles.item}
            key={i}
          >
            <Img data={img} className={styles.img} />
            <Markdown.h3 className={styles.title}>{title}</Markdown.h3>
            <Markdown className={styles.description}>{description}</Markdown>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Features;