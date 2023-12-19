'use client'
import { useInView } from "framer-motion";
import { useRef } from "react";

const Item = ({ children, ...props }) => {
  const item = useRef(null);
  const isInView = useInView(item, { once: true, margin: "0px 0px -13px 0px" });
  return (
    <div data-visible={isInView} ref={item} {...props}>
      {children}
    </div>
  );
};

export default Item;