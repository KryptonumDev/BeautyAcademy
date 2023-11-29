import styles from './styles.module.scss';

const Button = ({ isPlaying }) => {
  return (
    <div className={styles.button}>
      <State isPlaying={isPlaying} />
    </div>
  );
};

export default Button;

const State = ({ isPlaying }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='68'
    height='68'
    fill='none'
    viewBox='0 0 51 51'
  >
    <rect
      width='49.261'
      height='49.261'
      x='0.869'
      y='0.489'
      stroke='url(#playGradient)'
      strokeWidth='0.738'
      rx='24.631'
    ></rect>
    <rect
      width='37.631'
      height='37.631'
      x='6.685'
      y='6.305'
      stroke='url(#playGradient)'
      strokeWidth='0.369'
      rx='18.815'
    ></rect>
    {isPlaying ? (
      <path
        stroke='url(#playGradient)'
        strokeLinecap='round'
        strokeLinejoin='round'
        strokeWidth='2'
        d='M22.5 21.38v9m6-9v9'
      ></path>
    ) : (
      <path
        fill='url(#playGradient)'
        d='M31.253 24.487a.75.75 0 010 1.266l-9.1 5.78A.75.75 0 0121 30.9V19.34a.75.75 0 011.152-.633l9.101 5.78z'
      ></path>
    )}
    <defs>
      <linearGradient
        id='playGradient'
        x1='0.5'
        x2='53.22'
        y1='45.97'
        y2='45.97'
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