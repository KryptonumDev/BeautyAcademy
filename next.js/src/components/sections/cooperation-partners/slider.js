'use client';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/css';
import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';
import Img from '@/components/atoms/Img';
import SliderButton from '@/components/atoms/SliderButton';

const Slider = ({
  title, 
  text,
  data: {
    partners_Cta,
    partners_List,
  }
}) => {
  const swiper = useRef();
  const [swiperEdge, setSwiperEdge] = useState(-1);
  const handlePrev = () => swiper.current.swiper.slidePrev();
  const handleNext = () => swiper.current.swiper.slideNext();

  return (
    <section className={styles.wrapper}>
      <header>
        <div>
          {title}
          {text}
          <div className="cta-wrapper">
            {partners_Cta.map((cta, i) => (
              <Button data={cta} key={i} />
            ))}
          </div>
        </div>
        <div className={styles.controls}>
          <SliderButton.prev
            aria-label='Go to the previous partner'
            className={styles.button}
            disabled={swiperEdge === -1}
            onClick={() => handlePrev()}
          />
          <SliderButton.next
            aria-label='Go to the next partner'
            className={styles.button}
            disabled={swiperEdge === 1}
            onClick={() => handleNext()}
          />
        </div>
      </header>
      <Swiper
        ref={swiper}
        className={styles.swiper}
        slidesPerView={1.3}
        breakpoints={{
          0: {
            slidesPerView: 1.3,
          },
          500: {
            slidesPerView: 2.3,
          },
          900: {
            slidesPerView: 3,
          },
        }}
        grabCursor={true}
        slideToClickedSlide={true}
        modules={[A11y]}
        onReachBeginning={() => setSwiperEdge(-1)}
        onFromEdge={() => setSwiperEdge(0)}
        onReachEnd={() => setSwiperEdge(1)}
        onSlideChange={({ isBeginning, isEnd }) => isBeginning ? setSwiperEdge(-1) : isEnd ? setSwiperEdge(1) : setSwiperEdge(0)}
      >
        {partners_List.map(({ name, href, img }, i) => {
          const Wrapper = href ? 'a' : 'div';
          return (
            <SwiperSlide key={i} className={styles.item}>
              <Wrapper
                {...href && {
                  href,
                  "aria-label": name,
                  target: '_blank',
                  rel: 'noopener'
                }}
                className={styles.itemWrapper}
              >
                <Img data={img} className={styles.img} />
              </Wrapper>
            </SwiperSlide>
          )
        })}
      </Swiper>
    </section>
  );
};

export default Slider;