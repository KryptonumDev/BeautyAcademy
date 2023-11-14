import React from "react"
import styles from "./styles.module.scss"
import NoContent from "@/components/organisms/dashboard-no-content"

const statusMap = {
  'COMPLETED': 'Завершен',
  'CANCELLED': 'Отменен',
  'CHECKOUT_DRAFT': 'Черновик',
  'FAILED': 'Не удался',
  'ON_HOLD': 'В ожидании',
  'PENDING': 'В ожидании',
  'PROCESSING': 'В обработке',
  'REFUNDED': 'Возвращен'
}

export default function Orders({ data }) {
  return (
    <section className={styles.wrapper}>
      <h1>История покупок</h1>
      <p>Здесь вы найдете все ваши предыдущие заказы.</p>
      {data.orders.nodes.length > 0 ? (
        <ul>
          {data.orders.nodes.map((order, index) => {
            const orderDate = new Date(order.date).toLocaleString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })
            return (
              <li key={index}>
                <div />
                <div>
                  <p className={styles.date}>{orderDate}</p>
                  <h3>Номер заказа: {order.orderNumber}</h3>
                  <div className={styles.flex}>
                    <p className={styles.price} dangerouslySetInnerHTML={{ __html: order.total }} />
                    <p className={styles.method}>{order.paymentMethod}</p>
                  </div>
                  <p className={styles.alignRight}>Статус: {statusMap[order.status]}</p>
                </div>
              </li>
            )
          })}
        </ul>
      ) : (
        <NoContent text='Покупок не совершено' li nk={{ url: '/shop', title: 'Академия' }} />
      )}
    </section>
  )
}