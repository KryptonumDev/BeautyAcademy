import { formatBytes } from '@/utils/functions';
import styles from './styles.module.scss';

const documentSize = '3000';

const Hero = () => {
  return (
    <section className={styles.wrapper}>
      <header>
        <h1>Поздравляем! Вы успешно прошли курс</h1>
        <p>Мы гордимся вашим развитием и целеустремленностью! Ниже вы найдете сертификат специально для вас</p>
        {/* <Img data={img} /> */}
        <a href={''} target='_blank' rel="noopener">
          <Download />
          <span className='link'>Скачать регламент ({formatBytes(documentSize)})</span>
        </a>
      </header>
    </section>
  );
};

export default Hero;

const Download = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='29'
    height='28'
    fill='none'
    viewBox='0 0 29 28'
  >
    <path
      stroke='url(#a)'
      strokeLinecap='round'
      strokeLinejoin='round'
      d='M20.336 10.5a2.333 2.333 0 012.333 2.333v9.334a2.333 2.333 0 01-2.333 2.333H8.669a2.333 2.333 0 01-2.333-2.333v-9.334A2.333 2.333 0 018.669 10.5m5.834-7v14m0 0l-3.5-3.34m3.5 3.34l3.5-3.34'
    ></path>
    <defs>
      <linearGradient
        id='a'
        x1='6.336'
        x2='23.558'
        y1='22.757'
        y2='22.757'
        gradientUnits='userSpaceOnUse'
      >
        <stop stopColor='#F7C479'></stop>
        <stop offset='0.253' stopColor='#DCA855'></stop>
        <stop offset='0.582' stopColor='#C79442'></stop>
        <stop offset='0.764' stopColor='#BC7F1D'></stop>
        <stop offset='1' stopColor='#BA7403'></stop>
      </linearGradient>
    </defs>
  </svg>
)