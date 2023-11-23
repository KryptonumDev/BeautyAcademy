import React, { useState } from "react"
import styles from './styles.module.scss'
import Img from "@/components/atoms/Img"
import { getUpdatedItems } from "@/utils/getUpdatedItems";
import { v4 } from "uuid";

export default function CartItem({ updateCart, products, remove, data, index }) {
  const [productCount, setProductCount] = useState(data.quantity);

  const handleQtyChange = (event, cartKey, count) => {

    if (typeof window !== 'undefined') {
      event.stopPropagation();

      const newQty = (event.target.value) ? parseInt(event.target.value) : count;

      if (count < 1) {
        return;
      }

      setProductCount(newQty);

      if (products.length) {
        const updatedItems = getUpdatedItems(products, newQty, cartKey);

        updateCart({
          variables: {
            input: {
              clientMutationId: v4(),
              items: updatedItems
            }
          },
        });
      }
    }
  };

  return (
    <div className={styles.wrapper}>
      <Img className={styles['image']} data={{ asset: data.product.node.asset }} />
      <div className={styles['title']}>
        <div>
          <p title={data.product.node.name}>{data.product.node.name}</p>
          {/* category */}
        </div>
      </div>
      <div className={`${styles['quantity']} ${!index ? styles['row'] : ''}`}>
        {!index && (
          <span>Количество</span>
        )}
        <div className={styles['calculator']}>
          <button type="button" className={styles['minus']} onClick={(e) => { handleQtyChange(event, data.key, productCount - 1) }}>-</button>
          <input
            readOnly={true}
            value={productCount}
            min="1"
            onChange={(event) => handleQtyChange(event, item.key)}
          />
          <button type="button" className={styles['plus']} onClick={(e) => { handleQtyChange(event, data.key, productCount + 1) }}>+</button>
        </div>
      </div>
      <div className={`${styles['price']} ${!index ? styles['row'] : ''}`}>
        {!index && (
          <span>Цена</span>
        )}
        <div>
          <p dangerouslySetInnerHTML={{ __html: data.product.node.price }} />
          {data.product.node.regularPrice !== data.product.node.price && (
            <p className={styles["old-price"]} dangerouslySetInnerHTML={{ __html: data.product.node.regularPrice }} />
          )}
        </div>
      </div>
      <div className={styles['remove']}>
        {remove && (
          <button type="button" className={styles["remove"]} onClick={(e) => { remove(e, data.key, products) }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 5.99998H21M18 5.99998V19C18 20.1046 17.1046 21 16 21H8C6.89543 21 6 20.1046 6 19V5.99998M18 5.99998H6M3 5.99998H6M10 9.49998V17.5M14 9.49998V17.5M8.5 2.99998H15.5" stroke="#53423C" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}