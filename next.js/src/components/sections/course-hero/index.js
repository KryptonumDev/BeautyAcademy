import Img from '@/components/atoms/Img';
import styles from './styles.module.scss';
import Markdown from '@/components/atoms/Markdown';
import AddToCart from '@/components/atoms/add-to-cart';

const Hero = ({
  productId,
  id,
  slug,
  name,
  date,
  onSale,
  price,
  regularPrice,
  salePrice,
  productTags,
  productCategories,
  img,
  rating
}) => {
  return (
    <section className={`${styles.wrapper} sec-wo-margin`}>
      <Img data={img} />
      <Markdown className={styles.price}>{price}</Markdown>
      {price !== regularPrice && (
        <Markdown components={{ p: 's' }} className={styles.regularPrice}>{regularPrice}</Markdown>
      )}
      <AddToCart quantity='1' product={{ productId }}>В корзину</AddToCart>
      {rating && (
        <div className={styles.rating}>
          <Heart />
          <span><strong>{rating}</strong>/5</span>
        </div>
      )}
    </section>
  );
};

export default Hero;

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