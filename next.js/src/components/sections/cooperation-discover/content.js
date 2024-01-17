"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useMediaQuery } from "react-responsive";
import styles from "./styles.module.scss";
import Img from "@/components/atoms/Img";

const Content = ({
  text,
  heading,
  list
}) => {
  const wrapper = useRef();
  const { scrollYProgress } = useScroll({
    target: wrapper,
    offset: ["start end", "end start"],
  });
  const odd = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const even = useTransform(scrollYProgress, [0, 1], [0, -200]);

  const isDesktop = useMediaQuery({ query: "(min-width: 900px)" });

  return (
    <section className={styles.wrapper}>
      <header>
        {heading}
        {text}
      </header>
      <div className={`${styles.list} sec-wo-margin`} ref={wrapper}>
        {list.map(({ markdownTitle, img }, i) => (
          <motion.div
            className={styles.item}
            key={i}
            style={{ transform: "none" }}
            {...(isDesktop && { style: { y: i % 2 === 0 ? odd : even } })}
          >
            <Img
              data={img}
              sizes="(max-width: 449px) 100vw, (max-width: 899px) 66.6vw, 33vw"
            />
            {markdownTitle}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Content;
