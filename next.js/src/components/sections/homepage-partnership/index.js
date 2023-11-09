'use client'
import { useRef, useState } from 'react';
import Markdown from '@/utils/Markdown';
import styles from './styles.module.scss';
import Button from '@/components/atoms/Button';

const Partnership = ({
  data: {
    partnership_Heading,
    partnership_Paragraph,
    partnership_Cta,
    partnership_Video,
  }
}) => {
  const video = useRef(null);
  const [ isPlaying, setIsPlaying ] = useState(false);

  const toggleVideo = () => {
    if (video.current) {
      if (isPlaying) {
        video.current.pause();
      } else {
        video.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className={styles.wrapper}>
      <header>
        <Markdown.h2>{partnership_Heading}</Markdown.h2>
        <Markdown className={styles.paragraph}>{partnership_Paragraph}</Markdown>
        <div className="cta-wrapper">
          {partnership_Cta.map((cta, i) => (
            <Button data={cta} key={i} />
          ))}
        </div>
      </header>
      <div
        className={`${styles.video}`}
        data-isplaying={isPlaying}
        onClick={() => toggleVideo()}
      >
        {isPlaying ? <Pause /> : <Play />}
        <video ref={video} width='440' height='806'>
          <source src={partnership_Video.asset.url} />
          <p>{partnership_Video.asset.altText}</p>
        </video>
      </div>
    </section>
  );
};

export default Partnership;

const Play = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='113'
    height='113'
    fill='none'
    viewBox='0 0 113 113'
  >
    <g filter='url(#a)'>
      <rect
        width='71.119'
        height='71.119'
        x='20.816'
        y='20.815'
        fill='#fff'
        fillOpacity='0.1'
        rx='35.56'
      ></rect>
      <path
        fill='#F4E9E6'
        d='M70.237 54.85a1.807 1.807 0 010 3.05L48.31 71.827c-1.203.764-2.776-.1-2.776-1.526V42.45c0-1.425 1.573-2.289 2.776-1.525L70.237 54.85z'
      ></path>
      <rect
        width='70.252'
        height='70.252'
        x='21.25'
        y='21.249'
        stroke='#fff'
        strokeOpacity='0.2'
        strokeWidth='0.867'
        rx='35.126'
      ></rect>
    </g>
    <rect
      width='84.129'
      height='84.129'
      x='14.311'
      y='14.311'
      stroke='url(#b)'
      strokeWidth='0.867'
      rx='42.064'
    ></rect>
    <rect
      width='111.015'
      height='111.015'
      x='0.867'
      y='0.867'
      stroke='#F4E9E6'
      strokeWidth='1.735'
      rx='55.508'
    ></rect>
    <defs>
      <linearGradient
        id='b'
        x1='13.877'
        x2='103.496'
        y1='91.819'
        y2='91.819'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F7C479'></stop>
        <stop offset='0.253' stopColor='#DCA855'></stop>
        <stop offset='0.582' stopColor='#C79442'></stop>
        <stop offset='0.764' stopColor='#BC7F1D'></stop>
        <stop offset='1' stopColor='#BA7403'></stop>
      </linearGradient>
      <filter
        id='a'
        width='112.75'
        height='112.75'
        x='0.001'
        y='0'
        colorInterpolationFilters='sRGB'
        filterUnits='userSpaceOnUse'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
        <feGaussianBlur
          in='BackgroundImageFix'
          stdDeviation='10.408'
        ></feGaussianBlur>
        <feComposite
          in2='SourceAlpha'
          operator='in'
          result='effect1_backgroundBlur_1531_11961'
        ></feComposite>
        <feBlend
          in='SourceGraphic'
          in2='effect1_backgroundBlur_1531_11961'
          result='shape'
        ></feBlend>
      </filter>
    </defs>
  </svg>
)

const Pause = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='113'
    height='113'
    fill='none'
    viewBox='0 0 113 113'
  >
    <g filter='url(#a)'>
      <rect
        width='71.119'
        height='71.119'
        x='20.816'
        y='20.815'
        fill='#fff'
        fillOpacity='0.1'
        rx='35.56'
      ></rect>
      <path
        stroke='#2B483C'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='3'
        d='M49.15 45.534v21.682m14.456-21.682v21.682'
      ></path>
      <rect
        width='70.252'
        height='70.252'
        x='21.25'
        y='21.249'
        stroke='#fff'
        strokeOpacity='0.2'
        strokeWidth='0.867'
        rx='35.126'
      ></rect>
    </g>
    <rect
      width='84.129'
      height='84.129'
      x='14.311'
      y='14.311'
      stroke='url(#b)'
      strokeWidth='0.867'
      rx='42.064'
    ></rect>
    <rect
      width='111.015'
      height='111.015'
      x='0.867'
      y='0.867'
      stroke='#2B483C'
      strokeWidth='1.735'
      rx='55.508'
    ></rect>
    <defs>
      <linearGradient
        id='b'
        x1='13.877'
        x2='103.496'
        y1='91.819'
        y2='91.819'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F7C479'></stop>
        <stop offset='0.253' stopColor='#DCA855'></stop>
        <stop offset='0.582' stopColor='#C79442'></stop>
        <stop offset='0.764' stopColor='#BC7F1D'></stop>
        <stop offset='1' stopColor='#BA7403'></stop>
      </linearGradient>
      <filter
        id='a'
        width='112.75'
        height='112.75'
        x='0.001'
        y='0'
        colorInterpolationFilters='sRGB'
        filterUnits='userSpaceOnUse'
      >
        <feFlood floodOpacity='0' result='BackgroundImageFix'></feFlood>
        <feGaussianBlur
          in='BackgroundImageFix'
          stdDeviation='10.408'
        ></feGaussianBlur>
        <feComposite
          in2='SourceAlpha'
          operator='in'
          result='effect1_backgroundBlur_1534_13253'
        ></feComposite>
        <feBlend
          in='SourceGraphic'
          in2='effect1_backgroundBlur_1534_13253'
          result='shape'
        ></feBlend>
      </filter>
    </defs>
  </svg>
)