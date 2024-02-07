import React, { Suspense, useEffect } from "react";
import { useState } from "react";
import styles from "./styles.module.scss";
import { GET_CART } from "src/queries/get-cart";
import { UPDATE_CART } from "src/mutations/update-cart";
import { useQuery } from "src/hooks/use-query";
import { useMutation } from "src/hooks/use-mutation";
import Button from "@/components/atoms/Button";
import CartItem from "@/components/moleculas/cart-item";
import { getUpdatedItems } from "@/utils/getUpdatedItems";
import Checkbox from "@/components/moleculas/Checkbox";
import Input from "@/components/moleculas/Input";
import { motion } from "framer-motion";
import { AnimatePresence } from "framer-motion";
import { Cross, Sygn } from "@/components/atoms/Icons";
import { APPLY_COUPON } from "src/mutations/apply-coupon";
import { REMOVE_COUPON } from "src/mutations/remove-coupon";
import Loader from "@/components/moleculas/request-loader";
import { useCart } from "react-use-cart";
import fetchData from "@/utils/fetchData";

export default function Cart({ className, setCartOpened }) {
  const { updateItemQuantity, removeItem, items: rawCart } = useCart();

  const [loading, setLoading] = useState(false);
  const [showDiscount, setShowDiscount] = useState(false);
  const [couponValue, setCouponValue] = useState("");
  const [cart, setCart] = useState(null);
  const [sum, setSum] = useState(null);
  const [fetchedItems, setFetchedItems] = useState(null);

  useEffect(() => {
    setCart(rawCart);
    if (rawCart?.length > 0 && !fetchedItems) {
      fetchData(
        `
          query($id: [ID!]){
            allCourse(where:{_id: {in: $id}}){
              _id
              price
              discount
              name
              slug{
                current
              }
              image{
                asset{
                  altText
                  url
                  metadata {
                    lqip
                    dimensions {
                      width
                      height
                    }
                  }
                }
              }
            }
          }
        `,
        {
          id: rawCart?.map((el) => el.id) || [],
        }
      )
        .then((res) => {
          let newSum = 0;
          const newArr = res.body.data.allCourse
            .filter((el, i) => rawCart[i]?.quantity > 0)
            .map((el, index) => {
              newSum += (el.discount || el.price) * rawCart[index].quantity;
              return {
                ...el,
                quantity: rawCart[index].quantity,
              };
            });
          setFetchedItems(newArr);
          setSum(newSum);
        })
        .catch((err) => {
          // TODO: handle error
        });
    } else if (fetchedItems) {
      // revalidate quantity
      let newSum = 0;
      const newArr = fetchedItems
        .filter((el, i) => rawCart[i]?.quantity > 0)
        .map((el, index) => {
          newSum += (el.discount || el.price) * rawCart[index].quantity;
          return {
            ...el,
            quantity: rawCart[index].quantity,
          };
        });
      setFetchedItems(newArr);
      setSum(newSum);
    }
  }, [rawCart]);

  const applyCoupon = (coupon) => {
    // apply coupon
  };

  const removeCoupons = applyCoupon;

  return (
    <div
      className={`${className} ${styles.cart} ${
        cart?.contents?.nodes?.length > 0
          ? styles.containsCart
          : styles.emptyCart
      }`}
    >
      <Loader show={loading} />
      <div className={styles.header}>
        <h3>Корзина</h3>
        <Button
          close={true}
          variant="secondary"
          onClick={() => {
            setCartOpened(false);
          }}
        >
          Закрыть
        </Button>
      </div>
      {cart?.length > 0 ? (
        <>
          <div data-lenis-prevent className={styles.items}>
            {fetchedItems?.map((el, index) => (
              <CartItem
                updateItemQuantity={updateItemQuantity}
                removeItem={removeItem}
                key={index}
                index={index}
                data={el}
              />
            ))}
          </div>
          <div className={styles.footer}>
            <div className={styles.discount}>
              {/* <AnimatePresence initial={false} mode='wait'>
                {showDiscount ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key='input'>
                    <Input
                      register={{ name: 'coupon' }}
                      label='Введите купон'
                      errors={{}}
                      value={couponValue}
                      onChange={(e) => { setCouponValue(e.target.value) }}
                    />
                    <button type="button" onClick={(e) => { handleApplyCoupon(e, couponValue) }} className='link'>Активировать</button>
                  </motion.div>
                ) : (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} key='checkbox'>
                    <Checkbox
                      register={{ name: 'coupon' }}
                      label='у меня есть скидочный купон'
                      errors={{}}
                      onChange={() => { setShowDiscount(!showDiscount) }}
                    />
                  </motion.div>
                )}
              </AnimatePresence> */}
            </div>
            <div className={styles.total}>
              {/* {cart?.appliedCoupons?.length > 0 && (
                <>
                  <p><span>Сумма</span><span dangerouslySetInnerHTML={{ __html: cart?.subtotal }} /></p>
                  <p><span>Скидка</span><span /></p>
                  {cart?.appliedCoupons?.map((el, index) => (
                    <p key={index} className={styles.coupon}><span><button onClick={(e) => { handleRemoveCoupon(e, el.code) }}><Cross /></button>{el.code}</span><span dangerouslySetInnerHTML={{ __html: el.discountAmount }} /></p>
                  ))}
                </>
              )} */}
              <p>
                <span>Итого</span>
                <span dangerouslySetInnerHTML={{ __html: sum }} />
              </p>
              <Button
                onClick={() => {
                  setCartOpened(false);
                }}
                href="/checkout"
              >
                Оформить заказ
              </Button>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.empty}>
          <Sygn />
          <h2>Ваша корзина пуста</h2>
          <Button
            onClick={() => {
              setCartOpened(false);
            }}
            href="/courses"
          >
            Наши курсы
          </Button>
        </div>
      )}
    </div>
  );
}
