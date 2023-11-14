'use client'
import { useState, useContext } from "react";
import { v4 } from 'uuid';

import { AppContext } from "src/context/app-context";
import ADD_TO_CART from "../../../mutations/add-to-cart";
import { useMutation } from "@apollo/client";
import Button from "../Button";

export default function AddToCart({ children, chosenAddon, variationId, quantity, product }) {

  const productQryInput = {
    clientMutationId: v4(),
    productId: product.productId,
    quantity: Number(quantity) || 1,
  };

  const [cart, setCart] = useContext(AppContext);
  const [showViewCart, setShowViewCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const { request, data } = useMutation(ADD_TO_CART, {
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
        <Button style={{ position: "relative", zIndex: 3 }} className="link" href="/koszyk">
          Pokaż koszyk
        </Button>
      ) : (
        <Button
          className="link"
          disabled={addToCartLoading}
          onClick={handleAddToCartClick}
          style={{ position: "relative", zIndex: 3 }}
        >
          {addToCartLoading ? 'Dodaje do koszyka...' : children ? children : 'Dodaj do koszyka'}
        </Button>
      )}
    </>
  );
};
