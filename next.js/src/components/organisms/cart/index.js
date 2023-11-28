import React from "react"
import { useContext, useState } from 'react';
import styles from './styles.module.scss'
import { AppContext } from 'src/context/app-context';
import { GET_CART } from 'src/queries/get-cart';
import { UPDATE_CART } from 'src/mutations/update-cart';
import { useQuery } from 'src/hooks/use-query';
import { useMutation } from 'src/hooks/use-mutation';
import Button from '@/components/atoms/Button';
import CartItem from '@/components/moleculas/cart-item';
import { getUpdatedItems } from '@/utils/getUpdatedItems';
import { v4 } from 'uuid';
import Checkbox from '@/components/moleculas/Checkbox';
import Input from '@/components/moleculas/Input';
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion';
import { Cross, Sygn } from '@/components/atoms/Icons';
import { APPLY_COUPON } from "src/mutations/apply-coupon";
import { REMOVE_COUPON } from "src/mutations/remove-coupon";

export default function Cart({ className, setCartOpened }) {
  const [cart, setCart] = useContext(AppContext)
  const [, setLoading] = useState(false)
  const [showDiscount, setShowDiscount] = useState(false)
  const [couponValue, setCouponValue] = useState('')

  useQuery(GET_CART, {
    variables: {},
    onCompleted: ({ body }) => {
      localStorage.setItem('woo-next-cart', JSON.stringify(body.data.cart))
      setCart(body.data.cart)
    },
    onError: (error) => {
      console.log(error.message)
    }
  })

  const { request: updateCart } = useMutation(UPDATE_CART, {
    onCompleted: ({ body }) => {
      // Update cart in the localStorage.
      localStorage.setItem('woo-next-cart', JSON.stringify(body.data.updateItemQuantities.cart));
      // Update cart data in React Context.
      setCart(body.data.updateItemQuantities.cart);
      setLoading(false)
    },
    onError: (error) => {
      setLoading(false)
      console.log(error.message);
    }
  });

  const { request: applyCoupon } = useMutation(APPLY_COUPON, {
    onCompleted: ({ body }) => {
      // Update cart in the localStorage.
      localStorage.setItem('woo-next-cart', JSON.stringify(body.data.applyCoupon.cart));
      // Update cart data in React Context.
      setCart(body.data.applyCoupon.cart);
      setLoading(false)
    },
    onError: (error) => {
      setLoading(false)
      console.log(error.message);
    }
  });

  const { request: removeCoupons } = useMutation(REMOVE_COUPON, {
    onCompleted: ({ body }) => {
      // Update cart in the localStorage.
      localStorage.setItem('woo-next-cart', JSON.stringify(body.data.removeCoupons.cart));
      // Update cart data in React Context.
      setCart(body.data.removeCoupons.cart);
      setLoading(false)
    },
    onError: (error) => {
      setLoading(false)
      console.log(error.message);
    }
  });

  const handleRemoveProductClick = (event, key, products) => {
    event.stopPropagation();
    if (products.length) {
      setLoading(true)

      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, key);
      // setInnerLoading(true)
      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems
          }
        },
      });
    }
  };

  const handleApplyCoupon = (event, coupon) => {
    event.stopPropagation();
    if (coupon) {
      setLoading(true)
      applyCoupon({
        variables: {
          input: {
            clientMutationId: v4(),
            code: coupon
          }
        },
      });
    }
  }

  const handleRemoveCoupon = (event, coupon) => {
    event.stopPropagation();
    if (coupon) {
      setLoading(true)
      removeCoupons({
        variables: {
          input: {
            clientMutationId: v4(),
            codes: [coupon]
          }
        },
      });
    }
  }

  return (
    <div className={`${className} ${styles.cart} ${cart?.contents?.nodes?.length > 0 ? styles.containsCart : styles.emptyCart}`}>
      <div className={styles.header}>
        <h3>Корзина</h3>
        <Button close={true} variant='secondary' onClick={() => { setCartOpened(false) }}>Закрыть</Button>
      </div>
      {cart?.contents?.nodes?.length > 0 ? (
        <>
          <div data-lenis-prevent className={styles.items}>
            {cart?.contents?.nodes.map((el, index) => (
              <CartItem updateCart={updateCart} key={index} index={index} products={cart?.contents?.nodes} remove={handleRemoveProductClick} data={el} />
            ))}
          </div>
          <div className={styles.footer}>
            <div className={styles.discount}>
              <AnimatePresence initial={false} mode='wait'>
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
              </AnimatePresence>
            </div>
            <div className={styles.total}>
              {cart?.appliedCoupons?.length > 0 && (
                <>
                  <p><span>Сумма</span><span dangerouslySetInnerHTML={{ __html: cart?.subtotal }} /></p>
                  <p><span>Скидка</span><span /></p>
                  {cart?.appliedCoupons?.map((el, index) => (
                    <p key={index} className={styles.coupon}><span><button onClick={(e) => { handleRemoveCoupon(e, el.code) }}><Cross /></button>{el.code}</span><span dangerouslySetInnerHTML={{ __html: el.discountAmount }} /></p>
                  ))}
                </>
              )}
              <p><span>Итого</span><span dangerouslySetInnerHTML={{ __html: cart?.total }} /></p>
              <Button onClick={() => { setCartOpened(false) }} href='/checkout'>Оформить заказ</Button>
            </div>
          </div>
        </>
      ) : (
        <div className={styles.empty}>
          <Sygn />
          <h2>Ваша корзина пуста</h2>
          <Button onClick={() => { setCartOpened(false) }} href="/courses">
            Наши курсы
          </Button>
        </div>
      )}
    </div>
  )
}