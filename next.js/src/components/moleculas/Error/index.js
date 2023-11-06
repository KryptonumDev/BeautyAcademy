'use client'
import styles from './styles.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

const Error = ({ error }) => (
  <AnimatePresence initial='false' mode='wait'>
    {error && (
      <motion.span
        initial={{ height: 0 }}
        animate={{ height: 'auto' }}
        exit={{ height: 0 }}
        className={styles.error}
        role="alert"
      >
        <Icon />
        <span>{error.message || `Правильно заполните форму`}</span>
      </motion.span>
    )}
  </AnimatePresence>
);

export default Error;

const Icon = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='24'
    height='24'
    fill='none'
    viewBox='0 0 29 30'
  >
    <path
      stroke='#CA2020'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='M14.5 10.256v6.041m0 3.021v.604'
    ></path>
    <circle
      cx='14.5'
      cy='15.089'
      r='11.479'
      stroke='#CA2020'
      strokeLinecap='round'
      strokeLinejoin='round'
    ></circle>
  </svg>
)