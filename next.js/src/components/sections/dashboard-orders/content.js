import NoContent from "@/components/organisms/dashboard-no-content"
import wpFetchData from "@/utils/wpFetchData";
import styles from "./styles.module.scss"

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

export default async function Content() {
  const { customer } = await getData();

  return (
    <>
      {customer.orders.nodes.length > 0 ? (
        <ul>
          {customer.orders.nodes.map((order, index) => {
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
        <NoContent text='Покупок не совершено' link={{ url: '/courses', title: 'Академия' }} />
      )}
    </>
  )
}

const getData = async () => {
  const { body: { data } } = await wpFetchData(`
    query {
      customer {
        id
        orders {
          nodes {
            total(format: FORMATTED)
            status
            orderKey
            orderNumber
            paymentMethod
            date
          }
        }
      }
    }
  `, {}, 300)
  return data;
}