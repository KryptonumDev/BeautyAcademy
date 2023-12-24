import Breadcrumbs from "@/components/organisms/Breadcrumbs";
import wpFetchData from "@/utils/wpFetchData";
import { notFound } from "next/navigation";
import Content from "@/components/sections/course-lesson-content";
import Hero from "@/components/sections/course-lesson-hero";
import Seo from "@/global/Seo";

const CourseLessonPage = async ({ params: { courseSlug, lessonSlug } }) => {
  const { product, lesson } = await getCourse(courseSlug, lessonSlug)

  return (
    <>
      <Breadcrumbs data={[
        { name: 'Homepage', path: '/' },
        { name: 'Courses', path: '/courses' },
        { name: product.name, path: `/courses/${courseSlug}` },
        { name: lesson.title, path: `/courses/${courseSlug}/${lessonSlug}` },
      ]} />
      <Hero {...{
        name: lesson.title,
        id: lesson.id,
        courseSlug: courseSlug,
        lessonSlug: lessonSlug,
        chapterLessons: product.productAcf.course.courseAcf.mainInformation.chapters,
        video: lesson.lessonAcf.video,
      }} />
      <Content
        courseSlug={courseSlug}
        data={product}
        chapters={product.productAcf.course.courseAcf.mainInformation.chapters}
        content={lesson.content}
      />
    </>
  )
}


export async function generateMetadata({ params: { courseSlug, lessonSlug } }) {
  const { lesson } = await getSeo(lessonSlug);

  return Seo({
    title: lesson?.seo?.title,
    description: lesson?.seo?.description,
    path: `/courses/${courseSlug}/${lessonSlug}`,
  })
}

const getSeo = async (slug) => {
  try {
    const { body: { data } } = await wpFetchData(`
    query ($slug: ID!) {
      lesson(id:$slug, idType: SLUG) {
        slug
        seo {
          metaDesc
          title
        }
      }
    }
    `, {
      slug
    }, 3600)
    !data.lesson?.slug && notFound();
    return data;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

const getCourse = async (courseSlug, lessonSlug) => {
  try {
    const { body: { data } } = await wpFetchData(`
    query ($courseSlug: ID!, $lessonSlug: ID!) {
      lesson(id: $lessonSlug, idType: SLUG) {
        slug
        id
        title
        content
        lessonAcf {
          video
        }
      }
      product(id:$courseSlug, idType: SLUG) {
        ... on SimpleProduct {
          productId: databaseId
          id
          slug
          name
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
        }
        productAcf {
          course {
            ... on Course {
              id
              courseAcf {
                mainInformation {
                  courseLength
                  chapters {
                    chapterName
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
              }
            }
          }
        }
      }
    }
  `, {
      courseSlug,
      lessonSlug
    }, 3600);

    !data.product?.slug && notFound();
    !data.lesson?.slug && notFound();

    return data;
  } catch (error) {
    console.error(error);
    notFound();
  }
}

export async function generateStaticParams() {
  const { body: { data: { lessons } } } = await wpFetchData(`
    query {
      lessons(first: 100) {
        nodes {
          slug
          lessonAcf {
            course {
              ... on Course {
                slug
              }
            }
          }
        }
      }
    }
  `, {}, 3600);

  return lessons.nodes.map(({ slug, lessonAcf }) => ({
    courseSlug: lessonAcf.course.slug,
    lessonSlug: slug,
  }))
}

export default CourseLessonPage;