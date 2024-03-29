"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import "swiper/css";
import styles from "./styles.module.scss";
import Button from "@/components/atoms/Button";
import SliderButton from "@/components/atoms/SliderButton";
import Img from "@/components/atoms/Img";

const Content = ({ title, cta, list }) => {
  const swiper = useRef();
  const [swiperEdge, setSwiperEdge] = useState(-1);
  const [activeIndex, setActiveIndex] = useState(0);
  const handlePrev = () => swiper.current.swiper.slidePrev();
  const handleNext = () => swiper.current.swiper.slideNext();

  return (
    <section className={styles.wrapper}>
      <header>
        <div className={styles.copy}>
          {title}
          <div className="cta-wrapper">
            {cta.map((cta, i) => (
              <Button data={cta} key={i} />
            ))}
          </div>
        </div>
        <div className={styles.controls}>
          <SliderButton.prev
            aria-label="Go to the previous partner"
            className={styles.button}
            disabled={swiperEdge === -1}
            onClick={() => handlePrev()}
          />
          <SliderButton.next
            aria-label="Go to the next partner"
            className={styles.button}
            disabled={swiperEdge === 1}
            onClick={() => handleNext()}
          />
        </div>
      </header>
      <Swiper
        className={styles.swiper}
        spaceBetween={48}
        ref={swiper}
        slidesPerView={1}
        grabCursor={true}
        slideToClickedSlide={true}
        modules={[A11y]}
        onReachBeginning={() => setSwiperEdge(-1)}
        onFromEdge={() => setSwiperEdge(0)}
        onReachEnd={() => setSwiperEdge(1)}
        onSlideChange={({ activeIndex, isBeginning, isEnd }) => {
          setActiveIndex(activeIndex);
          isBeginning
            ? setSwiperEdge(-1)
            : isEnd
            ? setSwiperEdge(1)
            : setSwiperEdge(0);
        }}
      >
        {list.map(({ title, description, img }, i) => (
          <SwiperSlide key={i} className={styles.item}>
            <Img data={img} className={styles.img} sizes="100vw" />
            <div>
              {title}
              {description}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.indicator}>
        <div
          style={{
            transform: `scaleX(${(activeIndex + 1) / list.length})`,
          }}
        ></div>
      </div>
    </section>
  );
};

export default Content;
