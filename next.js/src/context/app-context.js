'use client'
import React, { useState, useEffect, createContext } from 'react';

export const AppContext = createContext([
  {},
  () => { }
]);

export const AppProvider = (props) => {

  const [cart, setCart] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let cartData = localStorage.getItem('woo-next-cart');
      cartData = null !== cartData ? JSON.parse(cartData) : '';
      setCart(cartData);
    }
  }, []);

  return (
    <AppContext.Provider value={[cart, setCart]}>
      {props.children}
    </AppContext.Provider>
  );
};
