"use client";
import { useState } from "react";

import Button from "../Button";
import { useCart } from "react-use-cart";

export default function AddToCart({
  alreadyBought,
  children,
  quantity,
  product,
}) {
  const { addItem } = useCart();
  const [showViewCart, setShowViewCart] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAddToCartClick = () => {
    setLoading(true);
    addItem({ id: product._id, price: 0 }, quantity);
    setShowViewCart(true);
  };

  return (
    <>
      {showViewCart ? (
        <Button style={{ position: "relative", zIndex: 3 }} href="/checkout">
          Заказываю
        </Button>
      ) : (
        <Button
          disabled={loading || alreadyBought}
          onClick={handleAddToCartClick}
          style={{ position: "relative", zIndex: 3 }}
        >
          {children}
        </Button>
      )}
    </>
  );
}
