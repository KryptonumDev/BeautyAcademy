'use client'
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y, EffectCoverflow } from 'swiper/modules';
import styles from './styles.module.scss';
import Markdown from '@/components/atoms/Markdown';
import Img from '@/components/atoms/Img';
import 'swiper/css';

const Slider = ({ list }) => {
  const swiper = useRef();
  const [ activeIndex, setActiveIndex ] = useState(0);
  const handlePrev = () => swiper.current.swiper.slidePrev();
  const handleNext = () => swiper.current.swiper.slideNext();
  const handleTo = (index) => swiper.current.swiper.slideTo(index);
  
  return (
    <>
      <Swiper
        ref={swiper}
        slidesPerView={1}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          900: {
            slidesPerView: 1.8,
          },
          1200: {
            slidesPerView: 2.3,
          },
        }}
        effect='coverflow'
        coverflowEffect={{
          depth: 0,
          rotate: 0,
          stretch: 200,
          scale: 0.8,
          slideShadows: false,
        }}
        grabCursor={true}
        centeredSlides={true}
        slideToClickedSlide={true}
        modules={[A11y, EffectCoverflow]}
        className={`testimonial-swiper ${styles.swiper}`}
        onSlideChange={({ activeIndex }) => setActiveIndex(activeIndex)}
      >
        {list.map(({ img, name, content, rating }, i) => (
          <SwiperSlide className={styles.item} key={i}>
            <Img data={img} className={styles.img} />
            <p className={styles.name}>{name}</p>
            <Markdown className={styles.content}>{content}</Markdown>
            {rating && (
              <div className={styles.rating}>
                <Heart />
                <span><strong>{rating}</strong>/5</span>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className={styles.controls}>
        <button
          aria-label='Go to the previous review'
          className={styles.button}
          disabled={activeIndex === 0}
          onClick={() => handlePrev()}
        ><ArrowLeft /></button>
        {list.map((_, i) => (
          <button
            key={i}
            aria-label={`Go to review number ${i+1}`}
            className={styles.pagination}
            aria-current={activeIndex === i}
            onClick={() => handleTo(i)}
          ></button>
        ))}
        <button
          aria-label='Go to the next review'
          className={styles.button}
          disabled={activeIndex === list.length - 1}
          onClick={() => handleNext()}
        ><ArrowRight /></button>
      </div>
    </>
  );
};

export default Slider;

const Heart = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox='0 0 39 39' fill="none">
    <path
      fill="url(#heart)"
      d="M26.094 6.419c-2.67 0-4.37 1.298-5.362 2.472-.495.585-1.816.585-2.311 0-.992-1.174-2.692-2.472-5.362-2.472-4.873 0-7.809 4.646-7.809 8.475 0 4.976 8.617 11.977 12.485 14.868 1.1.822 2.583.822 3.683 0 3.868-2.89 12.485-9.889 12.485-14.867 0-3.83-2.934-8.476-7.81-8.476z"
    ></path>
    <defs>
      <linearGradient
        id="heart"
        x1="5.25"
        x2="35.461"
        y1="29.044"
        y2="29.044"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F7C479"></stop>
        <stop offset="0.253" stopColor="#DCA855"></stop>
        <stop offset="0.582" stopColor="#C79442"></stop>
        <stop offset="0.764" stopColor="#BC7F1D"></stop>
        <stop offset="1" stopColor="#BA7403"></stop>
      </linearGradient>
    </defs>
  </svg>
)

const ArrowLeft = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='51' height='51' viewBox='0 0 51 51' fill='none'>
    <path
      stroke='#53423C'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M29.666 16.963l-8.333 8.334 8.333 8.333'
    ></path>
  </svg>
)

const ArrowRight = () => (
  <svg xmlns='http://www.w3.org/2000/svg' width='51' height='51' viewBox='0 0 51 51' fill='none'>
    <path
      stroke='#53423C'
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='2'
      d='M21.334 16.963l8.333 8.334-8.333 8.333'
    ></path>
  </svg>
)