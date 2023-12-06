'use client'
import React from "react"
import styles from "./styles.module.scss"
import { AnimatePresence, motion } from "framer-motion"

export default function Loader({ show }) {

  return (
    <AnimatePresence mode="wait">
      {show && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className={styles.wrapper}>
          <Part />
          <Part />
          <Part />
          <Part />
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const Part = () => (
  <svg width="32" height="27" viewBox="0 0 32 27" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M22.9407 0.80713C20.0641 0.80713 18.2566 2.23884 17.2237 3.49689C16.7371 4.08946 15.4238 4.08936 14.9373 3.49676C13.9045 2.23874 12.0971 0.80713 9.22001 0.807129C4.09027 0.807129 1 5.69769 1 9.72807C0.999999 15.0066 10.21 22.4479 14.2349 25.4479C15.3352 26.2679 16.8256 26.268 17.926 25.4481C21.951 22.4489 31.1607 15.0094 31.1607 9.72928C31.1607 5.69769 28.0729 0.80713 22.9407 0.80713Z" fill="#F1E4E0" stroke="url(#paint0_linear_2467_11588)" strokeLinecap="round" strokeLinejoin="round" />
    <defs>
      <linearGradient id="paint0_linear_2467_11588" x1="0.999999" y1="24.6227" x2="32.8013" y2="24.6227" gradientUnits="userSpaceOnUse">
        <stop stopColor="#F7C479" />
        <stop offset="0.253472" stopColor="#DCA855" />
        <stop offset="0.581597" stopColor="#C79442" />
        <stop offset="0.763889" stopColor="#BC7F1D" />
        <stop offset="1" stopColor="#BA7403" />
      </linearGradient>
    </defs>
  </svg>
)