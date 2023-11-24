import React from "react"
import styles from './styles.module.scss'

export default function Steps({ step, delivery, registration }) {

  const steps = [
    'Корзина',
    'Ваши данные',
    delivery ? 'Доставка' : null,
    registration ? 'Авторизация' : null,
    'Способ оплаты',
    'Подтверждение заказа'
  ].filter(item => item)

  return (
    <aside style={{ '--count': steps.length }} className={styles.wrapper}>
      {steps.map((item, index) => (
        <div key={index} className={`${styles.item} ${step >= index ? styles.active : ''}`}>
          <span className={styles.number}><span className={styles.numberInner}>{index + 1}</span></span>
          <p>{item}</p>
        </div>
      ))}
    </aside>
  )
}