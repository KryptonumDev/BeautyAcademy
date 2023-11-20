'use client';
import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { A11y } from 'swiper/modules';
import 'swiper/css';
import Img from '@/components/atoms/Img';
import styles from './styles.module.scss';
import Markdown from '@/components/atoms/Markdown';
import Button from '@/components/atoms/Button';
import SliderButton from '@/components/atoms/SliderButton';

const Cooperation = ({
  data: {
    cooperation_Heading,
    cooperation_Cta,
    cooperation_Img,
    cooperation_List,
  }
}) => {
  const swiper = useRef();
  const [swiperEdge, setSwiperEdge] = useState(-1);
  const handlePrev = () => swiper.current.swiper.slidePrev();
  const handleNext = () => swiper.current.swiper.slideNext();

  return (
    <section className={styles.wrapper}>
      <Img
        data={cooperation_Img}
        sizes="(max-width: 599px) 100vw, 33vw"
        className={styles.img}
      />
      <div>
        <header>
          <Markdown.h2>{cooperation_Heading}</Markdown.h2>
          <Button data={cooperation_Cta} />
        </header>
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
            onSlideChange={({ isBeginning, isEnd }) => isBeginning ? setSwiperEdge(-1) : isEnd ? setSwiperEdge(1) : setSwiperEdge(0)}
          >
            {cooperation_List.map(({ title, description }, i) => (
              <SwiperSlide key={i} className={styles.item}>
                <Markdown className={`${styles.title} h3`}>{title}</Markdown>
                <Markdown>{description}</Markdown>
              </SwiperSlide>
            ))}
          </Swiper>
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
        </div>
      </div>
    </section>
  );
};

export default Cooperation;