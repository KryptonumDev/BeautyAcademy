"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./styles.module.scss";
import Button from "@/components/atoms/Button";
import Img from "@/components/atoms/Img";
import { useMediaQuery } from "react-responsive";

const Content = ({ title, text, list, data: { features_Cta } }) => {
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
        {title}
        {text}
        <div className="cta-wrapper">
          {features_Cta.map((cta, i) => (
            <Button data={cta} key={i} />
          ))}
        </div>
      </header>
      <div className={styles.list} ref={wrapper}>
        {list.map(({ title, description, img }, i) => (
          <motion.div
            className={styles.item}
            key={i}
            style={{ transform: "none" }}
            {...(isDesktop && { style: { y: i % 2 === 0 ? odd : even } })}
          >
            <Img data={img} className={styles.img} />
            {title}
            {description}
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Content;
