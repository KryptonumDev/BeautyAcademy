'use client'
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/css';
import styles from './styles.module.scss';
import SliderButton from '@/components/atoms/SliderButton';
import Card from '@/components/moleculas/product-card';

const Slider = ({ list, children }) => {
  const swiper = useRef();
  const [swiperEdge, setSwiperEdge] = useState(-1);
  const [activeIndex, setActiveIndex] = useState(0);
  const handlePrev = () => swiper.current.swiper.slidePrev();
  const handleNext = () => swiper.current.swiper.slideNext();

  return (
    <>
      <header>
        {children}
        {list.length > 3 && (
          <div className={styles.controls}>
            <SliderButton.prev
              aria-label='Go to the previous item'
              className={styles.button}
              disabled={swiperEdge === -1}
              onClick={() => handlePrev()}
            />
            <SliderButton.next
              aria-label='Go to the next item'
              className={styles.button}
              disabled={swiperEdge === 1}
              onClick={() => handleNext()}
            />
          </div>
        )}
      </header>
      <Swiper
        ref={swiper}
        spaceBetween={24}
        slidesPerView={1.1}
        breakpoints={{
          0: {
            slidesPerView: 1.1,
          },
          600: {
            slidesPerView: 2.1,
          },
          1000: {
            slidesPerView: 3.1,
          },
        }}
        grabCursor={true}
        slideToClickedSlide={true}
        modules={[A11y]}
        className={styles.swiper}
        onReachBeginning={() => setSwiperEdge(-1)}
        onFromEdge={() => setSwiperEdge(0)}
        onReachEnd={() => setSwiperEdge(1)}
        onSlideChange={({ activeIndex, isBeginning, isEnd }) => {
          setActiveIndex(activeIndex);
          isBeginning ? setSwiperEdge(-1) : isEnd ? setSwiperEdge(1) : setSwiperEdge(0);
        }}
      >
        {list.map((product, i) => (
          <SwiperSlide className={styles.item} key={i}>
            <Card data={product} key={i} />
          </SwiperSlide>
        ))}
      </Swiper>
      {list.length > 3 && (
        <div className={styles.indicator}>
          <div style={{ transform: `scaleX(${(activeIndex) / list.length})` }}></div>
        </div>
      )}
    </>
  );
};

export default Slider;