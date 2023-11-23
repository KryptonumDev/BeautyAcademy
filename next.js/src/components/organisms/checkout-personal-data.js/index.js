import React from "react"
import styles from './styles.module.scss'

export default function PersonalData({ data }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.chose}>
        <h2>Покупаю как</h2>
        <div className={styles.buttons}>
          <button>Физическое лицо</button>
          <button>Юридическое лицо</button>
        </div>
      </div>
    </div>
  )
}