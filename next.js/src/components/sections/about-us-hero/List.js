'use client'
import { useTransform } from 'framer-motion';
import { useSpring, useMotionValue, motion } from 'framer-motion';
import { useEffect } from 'react';

const List = ({ children, ...props }) => {
  const mouse = {
    x: useSpring(useMotionValue(.5), { damping: 15 }),
    y: useSpring(useMotionValue(.5), { damping: 15 }),
  }
  const position = {
    x: useTransform(mouse.x, [0, 1], [-34, 34]),
    y: useTransform(mouse.y, [0, 1], [-34, 34]),
  }
  const handleMouseMove = ({ clientX, clientY }) => {
    mouse.x.set(clientX / window.innerWidth);
    mouse.y.set(clientY / window.innerHeight);
  }
  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (mediaQuery.matches) {
      window.addEventListener('mousemove', handleMouseMove);
      return () => window.removeEventListener('mousemove', handleMouseMove);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <motion.div
      {...props}
      style={{
        x: position.x,
        y: position.y 
      }}
    >
      {children}
    </motion.div>
  );
};

export default List;