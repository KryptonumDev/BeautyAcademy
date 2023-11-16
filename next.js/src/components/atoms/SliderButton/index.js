import styles from './styles.module.scss';

const SliderButton = ({ direction, className, ...props }) => {
  return (
    <button className={`${styles.button} ${className || ''}`} {...props}>
      {direction === 'prev' ? <ArrowLeft /> : <ArrowRight />}
    </button>
  );
};

SliderButton.prev = (props) => <SliderButton direction="prev" {...props} />;
SliderButton.next = (props) => <SliderButton direction="next" {...props} />;

export default SliderButton;

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