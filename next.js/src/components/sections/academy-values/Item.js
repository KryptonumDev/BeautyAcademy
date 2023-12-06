'use client'
import { useRef } from "react";
import { useInView } from "framer-motion";

const Item = ({ children, ...props }) => {
  const item = useRef(null);
  const isInView = useInView(item, { once: true, margin: "0px 0px -34px 0px" });
  return (
    <div data-visible={isInView} {...props} ref={item}>
      {children}
    </div>
  );
};

export default Item;