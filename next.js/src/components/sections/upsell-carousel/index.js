import wpFetchData from '@/utils/wpFetchData';
import styles from './styles.module.scss';
import Slider from './Slider';

const UpsellCarousel = async ({ slug }) => {
  const { products: { nodes } } = await getProducts();

  const list = (() => {
    if (!nodes) return [];
    if (!slug) return nodes;


    return nodes.filter(({ slug: productSlug }) => productSlug !== slug)
  })();

  if (!list.length) return null;

  return (
    <section className={styles.wrapper}>
      <Slider list={list}>
        <h2>Вас может заинтересовать:</h2>
      </Slider>
    </section>
  );
};

const getProducts = async () => {
  const { body: { data } } = await wpFetchData(`
    query {
      products(where: {categoryIn: "онлайн-курс"}, first: 6) {
        nodes {
          ... on SimpleProduct {
            productId: databaseId
            id
            slug
            name
            date
            onSale
            price(format: FORMATTED)
            regularPrice(format: FORMATTED)
            salePrice(format: FORMATTED)
            productTags {
              nodes {
                name
                id
                slug
              }
            }
            productCategories {
              nodes {
                name
                children {
                  nodes {
                    name
                  }
                }
              }
            }
            featuredImage {
              asset: node {
                altText
                url: mediaItemUrl
                metadata: mediaDetails {
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  `, {}, 3600)
  return data;
}

export default UpsellCarousel;