'use client';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/css';
import Markdown from '@/utils/Markdown';
import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';
import Img from '@/utils/Img';

const Partners = ({
  data: {
    partners_Heading,
    partners_Paragraph,
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
          <Markdown.h2>{partners_Heading}</Markdown.h2>
          <Markdown className={styles.paragraph}>{partners_Paragraph}</Markdown>
          <div className="cta-wrapper">
            {partners_Cta.map((cta, i) => (
              <Button data={cta} key={i} />
            ))}
          </div>
        </div>
        <div className={styles.controls}>
          <button
            aria-label='Go to the previous partner'
            className={styles.button}
            disabled={swiperEdge === -1}
            onClick={() => handlePrev()}
          ><ArrowLeft /></button>
          <button
            aria-label='Go to the next partner'
            className={styles.button}
            disabled={swiperEdge === 1}
            onClick={() => handleNext()}
          ><ArrowRight /></button>
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

export default Partners;

const ArrowLeft = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='25'
    height='26'
    fill='none'
    viewBox='0 0 25 26'
  >
    <path
      stroke='#53423C'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M14.583 9.002l-4.166 4.167 4.166 4.167'
    ></path>
  </svg>
)

const ArrowRight = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='25'
    height='26'
    fill='none'
    viewBox='0 0 25 26'
  >
    <path
      stroke='#53423C'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M10.417 9.002l4.166 4.167-4.166 4.167'
    ></path>
  </svg>
)