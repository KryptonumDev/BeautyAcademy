import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/organisms/Breadcrumbs";
// import Faq from "@/components/sections/faq/html";
import UpsellCarousel from "@/components/sections/upsell-carousel";
import Hero from "@/components/sections/course-hero";
import Content from "@/components/sections/course-content";
import Seo from "@/global/Seo";
import fetchData from "@/utils/fetchData";

const CoursePage = async ({ params: { courseSlug } }) => {
  const isAccepted = true; // TODO: add isAccepted

  const {
    page: [
      {
        name,
        complexity,
        _createdAt,
        price,
        discount,
        _id,
        image,
        category,
        slug: { current: slug },
        author,
        chapters,
        courseLength
      },
    ],
  } = await query(courseSlug);

  return (
    <>
      <Breadcrumbs
        data={[
          { name: "Главная", path: "/" },
          { name: "Курсы", path: "/courses" },
          { name: name, path: `/courses/${slug}` },
        ]}
      />
      <Hero
        productId={_id}
        name={name}
        price={price}
        discount={discount}
        image={image}
        isAccepted={isAccepted}
        rating={5} // TODO: add rating
      />
      <Content
        complexity={complexity}
        author={author}
        category={category}
        courseLength={courseLength}
        courseSlug={slug}
        chapters={chapters}
        // sections={product.productAcf.course.courseAcf.about}
        isAccepted={isAccepted}
      />
      {/* <Faq data={product.productAcf.course.courseAcf.faq} /> */}
      <UpsellCarousel slug={slug} />
    </>
  );
};

export async function generateMetadata({ params: { courseSlug } }) {
  const {
    page: [
      {
        seo,
      },
    ],
  } = await query(courseSlug);

  return Seo({
    title: seo?.title,
    description: seo?.description,
    path: `/courses/${courseSlug}`,
  });
}

export async function generateStaticParams() {
  const {
    body: {
      data: { entries },
    },
  } = await fetchData(`
    query {
      entries: allCourse {
        slug {
          current
        }
      }
    }
  `);

  return entries.map(({ slug: { current: slug } }) => ({
    slug,
  }));
}

const query = async (courseSlug) => {
  const {
    body: { data },
  } = await fetchData(
    /* GraphQL */ `
      query ($slug: String!) {
        page: allCourse(where: { slug: { current: { eq: $slug } } }) {
          name
          slug {
            current
          }
          _id
          _createdAt
          price
          discount
          complexity
          courseLength
          chapters{
            chapterName
            lessons{
              name
              lengthInMinutes
              slug{
                current
              }
            }
          }
          author{
            name
            facebook
            instagram
            telegram
            specialization
            img{
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
          }
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
            slug{
              current
            }
          }
          seo {
            title
            description
          }
        }
      }
    `,
    {
      slug: courseSlug,
    }
  );

  !data.page[0]?.slug.current && notFound();
  return data;
};

export default CoursePage;
