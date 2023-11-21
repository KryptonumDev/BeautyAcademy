'use client'
import { useState, useContext } from "react";
import { v4 } from 'uuid';

import { AppContext } from "src/context/app-context";
import Button from "../Button";
import { useMutation } from "src/hooks/use-mutation";
import { ADD_TO_CART } from "src/mutations/add-to-cart";

export default function AddToCart({ children, quantity, product }) {

  const productQryInput = {
    clientMutationId: v4(),
    productId: product.productId,
    quantity: Number(quantity) || 1,
  };

  const [, setCart] = useContext(AppContext);
  const [showViewCart, setShowViewCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const { request } = useMutation(ADD_TO_CART, {
    variables: {
      input: productQryInput,
    },
    onCompleted: ({ body }) => {
      localStorage.setItem('woo-next-cart', JSON.stringify(body?.data?.addToCart?.cart))
      setCart(body?.data?.addToCart?.cart)
      setShowViewCart(true)
      setLoading(false)
    },
    onError: (error) => {
      setLoading(false)
      console.log(error.message)
    }
  });

  const handleAddToCartClick = () => {
    setLoading(true)
    request();
  };

  return (
    <>
      {showViewCart ? (
        <Button style={{ position: "relative", zIndex: 3 }} href="/koszyk">
          Посмотреть корзину
        </Button>
      ) : (
        <Button
          disabled={loading}
          onClick={handleAddToCartClick}
          style={{ position: "relative", zIndex: 3 }}
        >
          {children}
        </Button>
      )}
    </>
  );
}