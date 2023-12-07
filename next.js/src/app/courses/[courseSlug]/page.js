import { notFound } from "next/navigation";
import Breadcrumbs from "@/components/organisms/Breadcrumbs";
import wpFetchData from "@/utils/wpFetchData";
import Faq from "@/components/sections/faq";
import UpsellCarousel from "@/components/sections/upsell-carousel";
import Hero from "@/components/sections/course-hero";
import Content from "@/components/sections/course-content";

const data = {
  faq: {
    heading: "Часто задаваемые вопросы",
    list: [
      {
        question: 'Требование предоставления персональных данных',
        answer: "Чтобы ваши участники могли связаться с вами по этому вопросу, мы можем собирать личные данные, такие как: Правовой основой для такой обработки является ст. 6 сек. 1 лит. f Общего регламента по защите данных, что позволяет нам преследовать наши законные интересы, которые в данном случае являются ответом на ваше сообщение, отправленное нам с использованием контактной информации, указанной на веб-сайте."
      },
      {
        question: 'Требование предоставления персональных данных',
        answer: "Чтобы ваши участники могли связаться с вами по этому вопросу, мы можем собирать личные данные, такие как: Правовой основой для такой обработки является ст. 6 сек. 1 лит. f Общего регламента по защите данных, что позволяет нам преследовать наши законные интересы, которые в данном случае являются ответом на ваше сообщение, отправленное нам с использованием контактной информации, указанной на веб-сайте."
      }
    ]
  },
  product: {
    rating: 2,
    author: {
      name: 'Inna Brinkis',
      specialization: 'косметолог',
      img: 'https://cdn.sanity.io/images/zm0qqcml/production/d851a28f8dbcc732fcfc18b33fec7745bfeaa391-208x208.webp?fit=max&w=1200&h=1200',
      socials: {
        instagram: 'https://instagram.com',
        facebook: 'https://facebook.com',
        telegram: 'https://telegram.org',
      }
    },
    category: 'Педикюр и маникюр',
    advancement: 2,
    duration: 'Общая продолжительность курса: 6 часов.',
    location: 'Онлайн-курс',
    certificate: 'сертификат об окончании',
    chapters: [
      {
        name: "Курс косметологии",
        duration: '32 минут',
        lessons: [
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-1'
          },
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-1'
          },
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-1'
          },
        ]
      },
      {
        name: "Курс косметологии",
        duration: '32 минут',
        lessons: [
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-1'
          },
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-1'
          },
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-1'
          },
        ]
      },
      {
        name: "Курс косметологии",
        duration: '32 минут',
        lessons: [
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-1'
          },
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-1'
          },
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-1'
          },
        ]
      },
      {
        name: "Курс косметологии",
        duration: '32 минут',
        lessons: [
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-1'
          },
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-1'
          },
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-1'
          },
        ]
      },
    ],
    reviews: [
      {
        img: 'https://cdn.sanity.io/images/zm0qqcml/production/d851a28f8dbcc732fcfc18b33fec7745bfeaa391-208x208.webp?fit=max&w=1200&h=1200',
        name: "Inna Brinkis",
        content: "Курс был сенсационным. Это внесло большой вклад в мой уход за кожей лица. Теперь я знаю, какие ошибки я совершил. Рекомендую всем, кто интересуется косметологией как профессионально, так и лично.",
        rating: 5,
      },
      {
        img: 'https://cdn.sanity.io/images/zm0qqcml/production/d851a28f8dbcc732fcfc18b33fec7745bfeaa391-208x208.webp?fit=max&w=1200&h=1200',
        name: "Inna Brinkis",
        content: "Курс был сенсационным. Это внесло большой вклад в мой уход за кожей лица. Теперь я знаю, какие ошибки я совершил. Рекомендую всем, кто интересуется косметологией как профессионально, так и лично.",
        rating: 5,
      },
      {
        img: 'https://cdn.sanity.io/images/zm0qqcml/production/d851a28f8dbcc732fcfc18b33fec7745bfeaa391-208x208.webp?fit=max&w=1200&h=1200',
        name: "Inna Brinkis",
        content: "Курс был сенсационным. Это внесло большой вклад в мой уход за кожей лица. Теперь я знаю, какие ошибки я совершил. Рекомендую всем, кто интересуется косметологией как профессионально, так и лично.",
        rating: 5,
      },
    ]
  }
}

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
        rating={data.product.rating}
      />
      <Content
        product={data.product}
        chapters={data.product.chapters}
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