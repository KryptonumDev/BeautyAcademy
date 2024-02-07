import React from "react";
import styles from "./styles.module.scss";
import Img from "@/components/atoms/Img";
import { Trash } from "@/components/atoms/Icons";

export default function CartItem({ data, removeItem, updateItemQuantity, index }) {
  if (!data) return null; // TODO: skeleton

  return (
    <div className={styles.wrapper}>
      <Img className={styles["image"]} data={data.image} />
      <div className={styles["title"]}>
        <div>
          <p title={data.name}>{data.name}</p>
          {/* category */}
        </div>
      </div>
      <div
        className={`${styles["quantity"]} ${!index ? styles["row"] : ""}`}
      >
        {!index && <span>Количество</span>}
        <div className={styles["calculator"]}>
          <button
            type="button"
            className={styles["minus"]}
            onClick={() => {
              updateItemQuantity(data._id, Number(data.quantity) - 1);
            }}
          >
            -
          </button>
          <input
            readOnly={true}
            value={data.quantity}
            min="1"
            onChange={(event) => updateItemQuantity(data._id, event.target.value)}
          />
          <button
            type="button"
            className={styles["plus"]}
            onClick={() => {
              updateItemQuantity(data._id, Number(data.quantity) + 1);
            }}
          >
            +
          </button>
        </div>
      </div>
      <div className={`${styles["price"]} ${!index ? styles["row"] : ""}`}>
        {!index && <span>Цена</span>}
        <div>
          <p
            dangerouslySetInnerHTML={{ __html: data.discount || data.price }}
          />
          {data.discount && (
            <p
              className={styles["old-price"]}
              dangerouslySetInnerHTML={{
                __html: data.price,
              }}
            />
          )}
        </div>
      </div>
      <div className={styles["remove"]}>
        <button
          type="button"
          className={styles["remove"]}
          onClick={() => {
            removeItem(data._id);
          }}
        >
          <Trash />
        </button>
      </div>
    </div>
  );
}
