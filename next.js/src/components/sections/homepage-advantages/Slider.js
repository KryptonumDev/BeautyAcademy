'use client'
import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import styles from './styles.module.scss';
import Markdown from '@/components/atoms/Markdown';
import Img from '@/components/atoms/Img';
import 'swiper/css';

const Slider = ({ list }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <>
      <Swiper
        spaceBetween={28}
        slidesPerView={1}
        breakpoints={{
          0: {
            slidesPerView: 1.3,
          },
          900: {
            slidesPerView: 1.5,
          },
          1200: {
            slidesPerView: 1.8,
          },
        }}
        grabCursor={true}
        slideToClickedSlide={true}
        modules={[A11y]}
        className={styles.swiper}
        onSlideChange={({ activeIndex }) => setActiveIndex(activeIndex)}
        onReachEnd={() => setActiveIndex(list.length-1)}
      >
        {list.map(({ title, description, img }, i) => (
          <SwiperSlide className={styles.item} key={i}>
            <Img
              data={img}
              className={styles.img}
              sizes="50vw"
            />
            <Markdown className={styles.title}>{title}</Markdown>
            <Markdown className={styles.description}>{description}</Markdown>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.indicator}>
        <div style={{ transform: `scaleX(${(activeIndex+1) / list.length})` }}></div>
      </div>
    </>
  );
};

export default Slider;