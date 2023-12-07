import styles from './styles.module.scss';
import Markdown from '@/components/atoms/Markdown';
import AddToCart from '@/components/atoms/add-to-cart';
import Slider from './Slider';

const Hero = ({
  data: {
    productId,
    // id,
    // slug,
    name,
    // date,
    // onSale,
    price,
    regularPrice,
    // productTags,
    // productCategories,
    img,
  },
  rating
}) => {
  const gallery = [img]
  return (
    <>
      <section className={`${styles.wrapper} sec-wo-margin`}>
        <Slider list={gallery} rating={rating} />
        <div className={styles.info}>
          <div>
            <Markdown.h3 className={styles.price}>{price}</Markdown.h3>
            {price !== regularPrice && (
              <Markdown components={{ p: 's' }} className={styles.regularPrice}>{regularPrice}</Markdown>
            )}
          </div>
          <AddToCart quantity='1' product={{ productId }}>В корзину</AddToCart>
        </div>
      </section>
      <div className={styles.progress}>
        <div className={styles.indicator}><div style={{ transform: 'scaleX(.2)' }}></div></div>
        <p>20% курса пройдено</p>
        <h1>{name}</h1>
      </div>
    </>
  );
};

export default Hero;