import styles from "./styles.module.scss";
import Slider from "./Slider";
import fetchData from "@/utils/fetchData";

const UpsellCarousel = async ({ slug }) => {
  const courses = await query();

  const list = (() => {
    if (!courses) return [];
    if (!slug) return courses;

    return courses.filter(({ slug: { current } }) => current !== slug);
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

const query = async () => {
  const {
    body: { data },
  } = await fetchData(/* GraphQL */ `
    query {
      courses: allCourse(limit: 6) {
        name
        slug {
          current
        }
        price
        discount
        image {
          asset {
            altText
            url
            metadata {
              lqip
              dimensions {
                width
                height
              }
            }
          }
        }
        category {
          name
          slug {
            current
          }
        }
      }
    }
  `);

  return data.courses;
};
export default UpsellCarousel;
