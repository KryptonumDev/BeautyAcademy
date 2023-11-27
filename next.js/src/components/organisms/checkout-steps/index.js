import React from "react"
import styles from './styles.module.scss'

export default function Steps({ steps, step }) {


  return (
    <aside style={{ '--count': steps.length }} className={styles.wrapper}>
      {steps.map((item, index) => (
        <div key={index} className={`${styles.item} ${step >= (item.id) ? styles.active : ''}`}>
          <span className={styles.number}><span className={styles.numberInner}>{index + 1}</span></span>
          <p>{item.name}</p>
        </div>
      ))}
    </aside>
  )
}