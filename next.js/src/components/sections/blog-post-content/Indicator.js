'use client'
import { useRef } from 'react';
import styles from './styles.module.scss';
import { motion, useScroll } from 'framer-motion';

const Indicator = ({ children }) => {
  const wrapper = useRef();
  const { scrollYProgress } = useScroll({
    target: wrapper,
    offset: ['start end', 'end end']
  })

  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.indicator}>
          <motion.div style={{ scaleX: scrollYProgress }}></motion.div>
        </div>
        <div className={styles.column} ref={wrapper}>
          {children}
        </div>
      </section>
    </>
  );
};

export default Indicator;