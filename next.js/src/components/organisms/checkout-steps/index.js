import React from "react"
import styles from './styles.module.scss'

export default function Steps({ steps, step }) {
  return (
    <aside style={{ '--count': steps.length, '--radial': (100 / steps.length * (step + 1)) + '%' }} className={styles.wrapper}>
      {steps.map((item, index) => (
        <div key={index} className={`${styles.item} ${step >= item.id ? styles.active : ''} ${step === item.id ? styles.current : ''}`}>
          <span className={styles.number}><span className={styles.numberInner}><span>{index + 1}<small>/{steps.length}</small></span></span></span>
          <p>{item.name}</p>
        </div>
      ))}
    </aside>
  )
}