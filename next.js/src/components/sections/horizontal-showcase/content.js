"use client";
import { useRef, Fragment, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./styles.module.scss";
import Button from "@/components/atoms/Button";
import Img from "@/components/atoms/Img";

const Content = ({ title, cta, list }) => {
  const wrapper = useRef();
  const { scrollYProgress } = useScroll({
    target: wrapper,
    offset: ["75vh end", "end 125%"],
  });
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const { scrollWidth, clientWidth } = wrapper.current;
    setOffset(-scrollWidth + clientWidth);
  }, []);
  const progress = useTransform(scrollYProgress, [0, 1], [0, offset]);

  return (
    <section className={styles.wrapper}>
      <header>
        {title}
        <div className="cta-wrapper">
          {cta.map((cta, i) => (
            <Button data={cta} key={i} />
          ))}
        </div>
      </header>
      <div className={styles.listWrapper} ref={wrapper}>
        <motion.div className={styles.list} style={{ x: progress }}>
          {list.map(
            (img, i) =>
              i % 3 === 0 && (
                <Fragment key={i}>
                  <Img data={img} />
                  {list[i + 1] && list[i + 2] && (
                    <div className={styles.column}>
                      <Img data={list[i + 1]} />
                      <Img data={list[i + 2]} />
                    </div>
                  )}
                </Fragment>
              )
          )}
        </motion.div>
        <div style={{ height: "300vh" }}></div>
      </div>
    </section>
  );
};

export default Content;
