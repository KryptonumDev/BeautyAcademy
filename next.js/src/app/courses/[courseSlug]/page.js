import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/organisms/Breadcrumbs";
import wpFetchData from "@/utils/wpFetchData";
import Faq from "@/components/sections/faq/html";
import UpsellCarousel from "@/components/sections/upsell-carousel";
import Hero from "@/components/sections/course-hero";
import Content from "@/components/sections/course-content";

const CoursePage = async ({ params: { courseSlug } }) => {
  const { product } = await getProducts(courseSlug);

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Главная', path: '/' },
        { name: 'Курсы', path: '/courses' },
        { name: product.name, path: `/courses/${product.slug}` },
      ]} />
      <Hero
        data={product}
      // rating={data.product.rating}
      />
      <Content
        data={product}
        courseSlug={product.slug}
        chapters={product.productAcf.course.courseAcf.mainInformation.chapters}
        sections={product.productAcf.course.courseAcf.about}
      />
      <Faq data={product.productAcf.course.courseAcf.faq} />
      <UpsellCarousel />
    </>
  )
}

// export async function generateMetadata({ params: { courseSlug } }) {
//   const { page: [{
//     seo,
//     slug: { current: slug }
//   }] } = await query(courseSlug);
//   return Seo({
//     title: seo?.title,
//     description: seo?.description,
//     path: `/courses/${slug}`,
//   })
// }

const getProducts = async (slug) => {
  try {
    const { body: { data } } = await wpFetchData(`
    query ($slug: ID!) {
      product(id:$slug, idType: SLUG) {
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
              slug
              children {
                nodes {
                  name
                }
              }
            }
          }
          img: featuredImage {
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
        productAcf {
          course {
            ... on Course {
              id
              courseAcf {
                mainInformation {
                  courseLength
                  chapters {
                    chapterContent {
                      lesson {
                        ... on Lesson {
                          id
                          slug
                          title
                          lessonAcf {
                            lengthInMinutes
                          }
                        }
                      }
                    }
                    chapterName
                  }
                  author {
                    ... on Author {
                      id
                      authorAcf {
                        profession
                        socialMedia {
                          telegram
                          instagram
                          facebook
                        }
                        avatar {
                          altText
                          url: mediaItemUrl
                        }
                      }
                      title
                    }
                  }
                }
                faq {
                  faqTitle
                  faq {
                    question
                    answer
                  }
                }
                about {
                  ... on Course_Courseacf_About_TextSection {
                    content
                    fieldGroupName
                    video {
                      title: altText
                      url: mediaItemUrl
                    }
                    isReversed
                    isColumn
                    isCentered
                    image {
                      altText
                      url : mediaItemUrl
                      metadata : mediaDetails {
                        width
                        height
                      }
                    }
                    cta {
                      url
                      title
                      target
                    }
                  }
                  ... on Course_Courseacf_About_ListSection {
                    fieldGroupName
                    textUnderList
                    title
                    list {
                      listItemText
                    }
                    linkUnderSection {
                      url
                      title
                      target
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `, {
      slug
    });
    !data.product?.slug && notFound();
    return data;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function generateStaticParams() {
  const { body: { data: { products } } } = await wpFetchData(`
    query {
      products(where: {categoryIn: "онлайн-курс"}, first: 100) {
        nodes {
          slug
        }
      }
    }
  `);

  return products.nodes.map(({ slug }) => ({
    courseSlug: slug
  }))
}

export default CoursePage;