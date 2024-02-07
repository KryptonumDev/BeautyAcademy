'use client'
import { CartProvider } from "react-use-cart";

export default function Provider ({ children }) {
  return (
    <CartProvider>
      {children}
    </CartProvider>
  )
}