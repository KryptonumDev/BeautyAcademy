"use client";
import { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y } from "swiper/modules";
import "swiper/css";
import styles from "./styles.module.scss";
import SliderButton from "@/components/atoms/SliderButton";

const Content = ({ list }) => {
  const swiper = useRef();
  const [swiperEdge, setSwiperEdge] = useState(-1);
  const handlePrev = () => swiper.current.swiper.slidePrev();
  const handleNext = () => swiper.current.swiper.slideNext();

  return (
    <div>
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
        onSlideChange={({ isBeginning, isEnd }) =>
          isBeginning
            ? setSwiperEdge(-1)
            : isEnd
            ? setSwiperEdge(1)
            : setSwiperEdge(0)
        }
      >
        {list.map(({ title, text }, i) => (
          <SwiperSlide key={i} className={styles.item}>
            {title}
            {text}
          </SwiperSlide>
        ))}
      </Swiper>
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
    </div>
  );
};

export default Content;
