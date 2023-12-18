import React, { useState } from "react"
import styles from './styles.module.scss'
import Img from "@/components/atoms/Img"
import { getUpdatedItems } from "@/utils/getUpdatedItems";
import { v4 } from "uuid";
import { Trash } from "@/components/atoms/Icons";

export default function CartItem({ setLoading, updateCart, products, remove, data, index }) {
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
        setLoading(true)
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
      <Img
        className={styles['image']}
        height={data.product.node.asset.metadata.height}
        width={data.product.node.asset.metadata.width}
        src={data.product.node.asset.url}
        alt={data.product.node.asset.altText}
      />
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
          <button type="button" className={styles['minus']} onClick={(event) => { handleQtyChange(event, data.key, productCount - 1) }}>-</button>
          <input
            readOnly={true}
            value={productCount}
            min="1"
            onChange={(event) => handleQtyChange(event, data.key)}
          />
          <button type="button" className={styles['plus']} onClick={(event) => { handleQtyChange(event, data.key, productCount + 1) }}>+</button>
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
            <Trash />
          </button>
        )}
      </div>
    </div>
  )
}