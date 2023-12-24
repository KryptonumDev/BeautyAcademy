'use client';
import { useEffect, useRef } from 'react';
import styles from './styles.module.scss';
import Markdown from '@/components/atoms/Markdown';
import Img from '@/components/atoms/Img';
import { Preview } from '.';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const PartnershipItem = ({ title, img, ...props }) => {
  const wrapper = useRef(null);
  const position = {
    x: useSpring(useMotionValue(0), { damping: 15 }),
    y: useSpring(useMotionValue(0), { damping: 15 }),
  }

  const handleMouseMove = ({ clientX, clientY }) => {
    const { left, top } = wrapper.current.getBoundingClientRect();
    position.x.set(clientX - left);
    position.y.set(clientY - top);
  }

  useEffect(() => {
    const item = wrapper.current;
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (mediaQuery.matches) {
      item.addEventListener('mousemove', handleMouseMove);
      return () => item.removeEventListener('mousemove', handleMouseMove);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div
      {...props}
      ref={wrapper}
    >
      <Preview />
      <Markdown>{title}</Markdown>
      <motion.div
        style={{
          left: position.x,
          top: position.y,
        }}
        className={styles.img}
      >
        <Img
          data={img}
          sizes="86px"
        />
      </motion.div>
    </div>
  );
};

export default PartnershipItem;