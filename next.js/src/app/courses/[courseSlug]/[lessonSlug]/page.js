import Breadcrumbs from "@/components/organisms/Breadcrumbs";
import wpFetchData from "@/utils/wpFetchData";
import { notFound } from "next/navigation";
import Content from "@/components/sections/course-lesson-content";
import Hero from "@/components/sections/course-lesson-hero";

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
            href: 'lesson-2'
          },
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-3'
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
            href: 'lesson-4'
          },
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-5'
          },
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-6'
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
            href: 'lesson-7'
          },
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-8'
          },
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-9'
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
            href: 'lesson-10'
          },
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-11'
          },
          {
            name: "Основы",
            duration: "8 минут",
            href: 'lesson-12'
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

const CourseLessonPage = async ({ params: { courseSlug, lessonSlug }}) => {
  const {
    // productId,
    // id,
    // slug,
    name: courseName,
    // date,
    // onSale,
    // price,
    // regularPrice,
    // salePrice,
    // productTags,
    // productCategories,
    // img,
  } = await getCourse(courseSlug);
  const lessonName = 'Профессиональный макияж глаз'

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Homepage', path: '/' },
        { name: 'Courses', path: '/courses' },
        { name: courseName, path: `/courses/${courseSlug}` },
        { name: lessonName, path: `/courses/${courseSlug}/${lessonSlug}` },
      ]} />
      <Hero {...{
        name: lessonName,
        chapterLessons: data.product.chapters[0].lessons,
        chapterNumber: 1
      }} />
      <Content
        product={data.product}
        chapters={data.product.chapters}
      />
    </>
  )
}

// export async function generateMetadata({ params: { slug: paramsSlug } }) {
//   const { page: [{
//     seo,
//     slug: { current: slug }
//   }] } = await query(paramsSlug);
//   return Seo({
//     title: seo?.title,
//     description: seo?.description,
//     path: `/courses/${slug}`,
//   })
// }

const getCourse = async (slug) => {
  const { body: { data } } = await wpFetchData(/* GraphQL */`
    query ($slug: [String]!) {
      product: products(where: {slugIn: $slug}){
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
        }
      }
    }
  `, {
    slug
  });
  !data.product.nodes[0]?.slug && notFound();
  return data.product.nodes[0];
}

// export async function generateStaticParams() {
//   const { body: { data: { entries } } } = await fetchData(`
//     query {
//       entries: allBlogEntry {
//         slug {
//           current
//         }
//       }
//     }
//   `);

//   return entries.map(({ slug: { current: slug } }) => ({
//     slug
//   }))
// }

export default CourseLessonPage;